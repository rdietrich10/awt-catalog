import type { Metadata } from "next";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { glossaryTerms } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "A–Z definitions of therapeutic and medical terms including BPC-157, GLP-1, GHRH, reconstitution, subcutaneous injection, and more.",
  alternates: { canonical: "/knowledge/glossary" },
};

export default function GlossaryPage() {
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        Glossary
      </h1>
      <KnowledgeNav activeSection="glossary" />
      <ul className="space-y-6">
        {sorted.map((term) => (
          <li key={term.slug} id={term.slug} className="border-b border-brand-border pb-6">
            <h2 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
              {term.term}
            </h2>
            <p className="mt-2 text-body-sm text-brand-silver">{term.definition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
