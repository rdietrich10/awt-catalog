import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AccessibilityContent } from "@/components/accessibility/AccessibilityContent";
import { A11Y_PAGE_TITLE } from "@/data/accessibility";

export const metadata: Metadata = {
  title: A11Y_PAGE_TITLE,
  description:
    "Accessibility statement for AW Therapeutics — our commitment to WCAG 2.1 Level AA conformance, the measures we have taken, and how to report accessibility barriers.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Policies", href: "/policies" },
          { label: A11Y_PAGE_TITLE },
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          {A11Y_PAGE_TITLE}
        </h1>
        <p className="text-body-sm text-brand-silver mb-12">
          How we build for everyone, regardless of ability or assistive technology.
        </p>
        <AccessibilityContent />
      </div>
    </div>
  );
}
