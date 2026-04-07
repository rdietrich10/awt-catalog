import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

// Mock lucide-react icons to avoid SVG rendering complexity
vi.mock("lucide-react", () => ({
  Send: () => null,
  CheckCircle: () => null,
  AlertTriangle: () => null,
  Loader2: () => null,
}));

// Stub the Button component to a plain <button> for simplicity
vi.mock("@/components/ui/Button", () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: unknown; iconPosition?: string; variant?: string; size?: string }) => (
    <button {...props}>{children}</button>
  ),
}));

async function fillForm(user: ReturnType<typeof userEvent.setup>, overrides: Partial<Record<string, string>> = {}) {
  const values = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-123-4567",
    subject: "General Inquiry",
    message: "Hello, I have a question.",
    ...overrides,
  };

  if (values.name !== undefined) {
    await user.type(screen.getByLabelText(/name/i), values.name);
  }
  if (values.email !== undefined) {
    await user.type(screen.getByLabelText(/email/i), values.email);
  }
  if (values.phone !== undefined) {
    await user.type(screen.getByLabelText(/phone/i), values.phone);
  }
  if (values.subject) {
    await user.selectOptions(screen.getByLabelText(/subject/i), values.subject);
  }
  if (values.message !== undefined) {
    await user.type(screen.getByLabelText(/message/i), values.message);
  }
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("renders all subject options", () => {
    render(<ContactForm />);
    const select = screen.getByLabelText(/subject/i);
    const options = Array.from((select as HTMLSelectElement).options).map((o) => o.text);
    expect(options).toContain("General Inquiry");
    expect(options).toContain("Product Question");
    expect(options).toContain("Order Status");
    expect(options).toContain("Physician Consultation");
    expect(options).toContain("Partnership Opportunity");
    expect(options).toContain("Other");
  });

  it("updates field values as user types", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    expect(screen.getByLabelText(/name/i)).toHaveValue("Jane Doe");

    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    expect(screen.getByLabelText(/email/i)).toHaveValue("jane@example.com");

    await user.type(screen.getByLabelText(/message/i), "Hello!");
    expect(screen.getByLabelText(/message/i)).toHaveValue("Hello!");
  });

  it("shows success state after a successful submission", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }));

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message received/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/thanks for reaching out/i)).toBeInTheDocument();
  });

  it("shows error message when API returns an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Something went wrong on the server." }),
    }));

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong on the server.");
  });

  it("shows network error message when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    expect(screen.getByRole("alert")).toHaveTextContent(/lost connection/i);
  });

  it("disables all fields and button while submitting", async () => {
    let resolveSubmit!: (v: unknown) => void;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(
      () => new Promise((res) => { resolveSubmit = res; })
    ));

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);

    const button = screen.getByRole("button", { name: /send message/i });
    user.click(button); // intentionally not awaited — submission is pending

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeDisabled();
    });

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/message/i)).toBeDisabled();
    expect(button).toBeDisabled();

    // resolve the pending fetch
    resolveSubmit({ ok: true, json: async () => ({ success: true }) });
  });

  it("clears error when user starts typing after an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Server error" }),
    }));

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());

    await user.type(screen.getByLabelText(/name/i), " Jr.");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("allows submitting another message after success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }));

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => screen.getByText(/message received/i));

    await user.click(screen.getByRole("button", { name: /send another message/i }));
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue("");
  });

  it("sends correct JSON payload to /api/contact", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => screen.getByText(/message received/i));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("jane@example.com"),
      })
    );

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.name).toBe("Jane Doe");
    expect(body.email).toBe("jane@example.com");
    expect(body.subject).toBe("General Inquiry");
    expect(body.message).toBe("Hello, I have a question.");
  });
});
