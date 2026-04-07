import { describe, it, expect } from "vitest";
import { contactSchema } from "./validations";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "555-123-4567",
  subject: "General Inquiry",
  message: "Hello, I have a question.",
};

describe("contactSchema", () => {
  it("accepts a fully valid payload", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts a payload without phone (optional field)", () => {
    const { phone: _phone, ...rest } = validPayload;
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("accepts an empty string for phone", () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: "" });
    expect(result.success).toBe(true);
  });

  it("trims whitespace from name", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "  Jane  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Jane");
  });

  it("lowercases email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "JANE@EXAMPLE.COM" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("jane@example.com");
  });

  // name validations
  it("rejects empty name", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects name longer than 100 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  // email validations
  it("rejects invalid email format", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects email longer than 254 characters", () => {
    // 249 chars local-part + "@x.com" (6) = 255 total > 254 limit
    const localPart = "a".repeat(249);
    const result = contactSchema.safeParse({ ...validPayload, email: `${localPart}@x.com` });
    expect(result.success).toBe(false);
  });

  // phone validations
  it("rejects phone longer than 20 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: "1".repeat(21) });
    expect(result.success).toBe(false);
  });

  // subject validations
  it("rejects empty subject", () => {
    const result = contactSchema.safeParse({ ...validPayload, subject: "" });
    expect(result.success).toBe(false);
  });

  it("rejects subject longer than 100 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, subject: "S".repeat(101) });
    expect(result.success).toBe(false);
  });

  // message validations
  it("rejects empty message", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "" });
    expect(result.success).toBe(false);
  });

  it("rejects message longer than 5000 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "M".repeat(5001) });
    expect(result.success).toBe(false);
  });

  it("accepts message exactly at 5000 character limit", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "M".repeat(5000) });
    expect(result.success).toBe(true);
  });
});
