"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  HIPAA_BANNER_TEXT,
  HIPAA_BANNER_LINK_TEXT,
  HIPAA_CONSENT_LABEL,
} from "@/data/hipaa";

export interface EmailCaptureData {
  name: string;
  email: string;
  phone: string;
}

interface EmailCaptureFormProps {
  onSubmit: (data: EmailCaptureData) => void;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
  error?: string | null;
}

const inputBase =
  "w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white placeholder:text-brand-silver-dark focus:outline-none focus:border-brand-silver-dark transition-colors";

export function EmailCaptureForm({
  onSubmit,
  onCancel,
  submitLabel = "Submit Inquiry",
  loading = false,
  error = null,
}: EmailCaptureFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hipaaConsent, setHipaaConsent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/5 p-3">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-body-sm text-red-300">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="capture-name" className="block text-label font-display tracking-wider uppercase text-brand-silver mb-1">
          Name
        </label>
        <input
          id="capture-name"
          type="text"
          required
          disabled={loading}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="capture-email" className="block text-label font-display tracking-wider uppercase text-brand-silver mb-1">
          Email
        </label>
        <input
          id="capture-email"
          type="email"
          required
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="capture-phone" className="block text-label font-display tracking-wider uppercase text-brand-silver mb-1">
          Phone <span className="text-brand-silver-dark">(optional)</span>
        </label>
        <input
          id="capture-phone"
          type="tel"
          disabled={loading}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          className={inputBase}
        />
      </div>
      <div className="pt-4 border-t border-brand-border space-y-3">
        <p className="text-caption text-brand-silver-dark leading-relaxed">
          {HIPAA_BANNER_TEXT}{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="underline text-brand-silver hover:text-brand-white transition-colors"
          >
            {HIPAA_BANNER_LINK_TEXT}
          </Link>
        </p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={hipaaConsent}
            onChange={(e) => setHipaaConsent(e.target.checked)}
            disabled={loading}
            className="mt-0.5 shrink-0 accent-brand-gold w-4 h-4"
            required
          />
          <span className="text-caption text-brand-silver-dark leading-relaxed group-hover:text-brand-silver transition-colors">
            {HIPAA_CONSENT_LABEL}
          </span>
        </label>
      </div>

      <div className="pt-4 space-y-4">
        <Button
          type="submit"
          variant="cta"
          size="lg"
          icon={loading ? Loader2 : Send}
          iconPosition="right"
          className="w-full"
          disabled={loading || !hipaaConsent}
        >
          {loading ? "Submitting..." : submitLabel}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="block w-full text-center text-caption text-brand-silver-dark hover:text-brand-silver transition-colors py-2 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
