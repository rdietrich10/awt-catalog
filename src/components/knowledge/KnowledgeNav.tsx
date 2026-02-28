import Link from "next/link";
import { cn } from "@/lib/utils";

interface KnowledgeNavProps {
  activeSection?: "articles" | "faq" | "protocols" | "glossary";
}

const sections = [
  { id: "articles" as const, label: "Articles", href: "/knowledge/articles" },
  { id: "faq" as const, label: "FAQ", href: "/knowledge/faq" },
  { id: "protocols" as const, label: "Protocols", href: "/knowledge/protocols" },
  { id: "glossary" as const, label: "Glossary", href: "/knowledge/glossary" },
];

export function KnowledgeNav({ activeSection }: KnowledgeNavProps) {
  return (
    <nav aria-label="Knowledge sections" className="flex flex-wrap gap-2 mb-10">
      {sections.map((s) => (
        <Link
          key={s.id}
          href={s.href}
          className={cn(
            "px-4 py-2 text-body-sm font-display uppercase tracking-wider border transition-colors",
            s.id === activeSection
              ? "border-brand-white text-brand-white"
              : "border-brand-border text-brand-silver hover:border-brand-grey-500 hover:text-brand-white"
          )}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
