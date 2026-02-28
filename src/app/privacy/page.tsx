import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { HipaaNoticeContent } from "@/components/privacy/HipaaNoticeContent";
import { HIPAA_PAGE_TITLE } from "@/data/hipaa";

export const metadata: Metadata = {
  title: HIPAA_PAGE_TITLE,
  description:
    "HIPAA Notice of Privacy Practices for Americare Wellness and AW Therapeutics — how we collect, use, and protect your health information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Policies", href: "/policies" },
          { label: HIPAA_PAGE_TITLE },
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          {HIPAA_PAGE_TITLE}
        </h1>
        <p className="text-body-sm text-brand-silver mb-12">
          How we collect, use, and protect your health information under HIPAA.
        </p>
        <HipaaNoticeContent />
      </div>
    </div>
  );
}
