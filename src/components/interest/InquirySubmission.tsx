"use client";

import type { Product } from "@/types";
import { WHAT_HAPPENS_NEXT, PROTOCOL_STATEMENT } from "@/data/copy";
import { EmailCaptureForm } from "./EmailCaptureForm";
import type { EmailCaptureData } from "./EmailCaptureForm";

interface InquirySubmissionProps {
  items: Product[];
  onSubmit: (data: EmailCaptureData) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

export function InquirySubmission({
  items,
  onSubmit,
  onCancel,
  loading = false,
  error = null,
}: InquirySubmissionProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section>
        <h4 className="text-label font-display tracking-wider uppercase text-brand-silver mb-3">
          Your Order
        </h4>
        <ul className="space-y-2 border-l-2 border-brand-border pl-4">
          {items.map((p) => (
            <li key={p.slug} className="text-body-sm text-brand-white">
              {p.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-label font-display tracking-wider uppercase text-brand-silver mb-3">
          What Happens Next
        </h4>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          {PROTOCOL_STATEMENT}
        </p>
        <p className="mt-2 text-body-sm text-brand-silver-dark leading-relaxed">
          {WHAT_HAPPENS_NEXT}
        </p>
      </section>

      <section>
        <EmailCaptureForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          submitLabel="Submit Inquiry"
          loading={loading}
          error={error}
        />
      </section>
    </div>
  );
}
