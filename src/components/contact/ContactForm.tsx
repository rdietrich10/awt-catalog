"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const subjectOptions = [
  "General Inquiry",
  "Product Question",
  "Order Status",
  "Physician Consultation",
  "Partnership Opportunity",
  "Other",
];

const inputStyles =
  "w-full bg-transparent border border-brand-border px-4 py-3 text-body-sm text-brand-white placeholder:text-brand-silver-dim focus:outline-none focus:border-brand-gold transition-colors min-h-[44px]";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "Looks like we lost connection for a sec. Check your internet and give it another go!"
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-brand-border p-8 text-center">
        <CheckCircle className="w-10 h-10 text-brand-gold mx-auto" />
        <h3 className="mt-4 font-display text-lg uppercase tracking-wider text-brand-white">
          Message Received
        </h3>
        <p className="mt-2 text-body-sm text-brand-silver max-w-sm mx-auto">
          Thanks for reaching out! Our team will get back to you within 24 hours.
          In the meantime, feel free to browse our catalog.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setSubmitted(false);
          }}
          className="mt-4 text-body-sm text-brand-silver-dark hover:text-brand-white transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div role="alert" className="flex items-start gap-3 border border-red-500/30 bg-red-500/5 p-4">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-body-sm text-red-300">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5">
            Name <span className="text-brand-gold">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={loading}
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5">
            Email <span className="text-brand-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={loading}
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputStyles}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            disabled={loading}
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5">
            Subject <span className="text-brand-gold">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            disabled={loading}
            value={form.subject}
            onChange={handleChange}
            className={`${inputStyles} appearance-none`}
          >
            <option value="" disabled>Select a topic</option>
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-brand-black">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-caption font-display tracking-wider uppercase text-brand-silver-dark mb-1.5">
          Message <span className="text-brand-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={loading}
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          className={`${inputStyles} resize-y`}
        />
      </div>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        icon={loading ? Loader2 : Send}
        iconPosition="right"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
