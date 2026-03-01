import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { termsSections, TERMS_PAGE_TITLE, TERMS_LAST_UPDATED } from "@/data/terms";

export const metadata: Metadata = {
  title: TERMS_PAGE_TITLE,
  description:
    "Terms of Service for AW Therapeutics — eligibility, intellectual property, disclaimers, limitation of liability, and governing law.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: TERMS_PAGE_TITLE },
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          {TERMS_PAGE_TITLE}
        </h1>
        <p className="text-body-sm text-brand-silver mb-2">
          Please read these terms carefully before using our website.
        </p>
        <p className="text-caption text-brand-silver-dark mb-12">
          Last updated: {TERMS_LAST_UPDATED}
        </p>

        <div className="space-y-10">
          {termsSections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-4">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, i) => (
                  <p key={i} className="text-body-sm text-brand-silver leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-brand-border flex flex-wrap gap-6">
          <Link
            href="/policies"
            className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            Medical Policies & Disclosures
          </Link>
          <Link
            href="/privacy"
            className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            Privacy Notice
          </Link>
          <Link
            href="/accessibility"
            className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            Accessibility
          </Link>
        </div>
      </div>
    </div>
  );
}
