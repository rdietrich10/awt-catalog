import type { Metadata } from "next";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { FaqAccordion } from "@/components/knowledge/FaqAccordion";
import { faqItems } from "@/data/faq";
import { JsonLd, faqPageJsonLd } from "@/lib/structured-data";
import { getOgImageMetadata } from "@/lib/og";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about advanced therapeutics, medication administration, reconstitution, storage, dosing, and provider review at AW Therapeutics.",
  alternates: { canonical: "/knowledge/faq" },
  ...getOgImageMetadata({
    slug: "faq",
    title: "FAQ",
    description:
      "Frequently asked questions about advanced therapeutics, medication administration, reconstitution, storage, dosing, and provider review at AW Therapeutics.",
  }),
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={faqPageJsonLd(faqItems)} />
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        FAQ
      </h1>
      <KnowledgeNav activeSection="faq" />
      <FaqAccordion items={faqItems} />
    </div>
  );
}
