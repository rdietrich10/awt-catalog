import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { NEW_PATIENT_CALLOUT } from "@/data/copy";

export function NewPatientCallout() {
  return (
    <div className="border border-brand-border bg-brand-grey-900/20 p-4 sm:p-5 flex items-start gap-3">
      <MessageCircle className="shrink-0 h-4 w-4 text-brand-gold mt-0.5" aria-hidden="true" />
      <p className="text-body-sm text-brand-silver">
        {NEW_PATIENT_CALLOUT}{" "}
        <Link
          href="/contact"
          className="text-brand-gold underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Reach out — we&apos;re happy to help.
        </Link>
      </p>
    </div>
  );
}
