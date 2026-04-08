import { describe, it, expect, vi, beforeEach } from "vitest";

// ---- hoisted mocks ----
vi.mock("@/lib/supabase-server", () => ({
  supabase: {
    from: vi.fn(),
  },
  logAuditEvent: vi.fn(),
}));

vi.mock("@/lib/email", () => ({
  sendContactNotification: vi.fn(),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  getRateLimitHeaders: vi.fn().mockReturnValue({}),
}));

// ---- import mocked modules (resolved after vi.mock hoisting) ----
import { supabase, logAuditEvent } from "@/lib/supabase-server";
import { sendContactNotification } from "@/lib/email";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";
import { POST } from "./route";

const mockSupabase = vi.mocked(supabase);
const mockLogAuditEvent = vi.mocked(logAuditEvent);
const mockSendContactNotification = vi.mocked(sendContactNotification);
const mockCheckRateLimit = vi.mocked(checkRateLimit);
const mockGetRateLimitHeaders = vi.mocked(getRateLimitHeaders);

function makeInsertChain(error: unknown = null) {
  return {
    insert: vi.fn().mockResolvedValue({ error }),
    update: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    }),
  };
}

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "555-123-4567",
  subject: "General Inquiry",
  message: "Hello, I have a question.",
};

function makeRequest(body: unknown, ip = "127.0.0.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCheckRateLimit.mockReturnValue({ allowed: true, remaining: 29, resetAt: Date.now() + 900000 });
    mockGetRateLimitHeaders.mockReturnValue({});
    mockSupabase.from.mockReturnValue(makeInsertChain() as never);
    mockSendContactNotification.mockResolvedValue(true);
    mockLogAuditEvent.mockImplementation(() => undefined);
  });

  it("returns 200 with valid payload", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ ...validBody, name: "" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/something's off/i);
  });

  it("returns 400 when email is invalid", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "bad-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when subject is empty", async () => {
    const res = await POST(makeRequest({ ...validBody, subject: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is empty", async () => {
    const res = await POST(makeRequest({ ...validBody, message: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockCheckRateLimit.mockReturnValue({ allowed: false, remaining: 0, resetAt: Date.now() + 900000 });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toMatch(/speedster/i);
  });

  it("returns 500 when database insert fails", async () => {
    mockSupabase.from.mockReturnValue(makeInsertChain(new Error("DB down")) as never);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/database/i);
  });

  it("still returns 200 when email sending fails", async () => {
    mockSendContactNotification.mockResolvedValue(false);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
  });

  it("accepts submission without phone", async () => {
    const { phone: _phone, ...rest } = validBody;
    const res = await POST(makeRequest(rest));
    expect(res.status).toBe(200);
  });

  it("calls supabase insert with correct fields", async () => {
    const chain = makeInsertChain();
    mockSupabase.from.mockReturnValue(chain as never);
    await POST(makeRequest(validBody));
    expect(mockSupabase.from).toHaveBeenCalledWith("contact_submissions");
    expect(chain.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Doe",
        email: "jane@example.com",
        subject: "General Inquiry",
        message: "Hello, I have a question.",
      })
    );
  });

  it("calls logAuditEvent after successful submission", async () => {
    await POST(makeRequest(validBody));
    expect(mockLogAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({ event_type: "contact_submission" })
    );
  });
});
