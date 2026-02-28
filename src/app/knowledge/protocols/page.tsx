import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { protocolSections } from "@/data/protocols";

export default function ProtocolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Knowledge", href: "/knowledge" },
          { label: "Protocols" },
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          Protocols
        </h1>
        <p className="text-body-sm text-brand-silver mb-12">
          Education on the use of therapeutic compounds, nutriments, and Lathmized NAD+. Always follow your provider&apos;s guidance and the product-specific instructions.
        </p>
        <div className="space-y-12">
          {protocolSections.map((section) => (
            <section key={section.id} className="border-b border-brand-border pb-12 last:border-0 last:pb-0">
              <h2 className="font-display text-xl uppercase tracking-wider text-brand-white mb-2">
                {section.title}
              </h2>
              <p className="text-body-sm text-brand-silver mb-6">{section.excerpt}</p>
              <ul className="space-y-4">
                {section.content.map((paragraph, i) => (
                  <li key={i} className="text-body-sm text-brand-silver-dark leading-relaxed flex gap-3">
                    <span className="text-brand-grey-500 shrink-0">•</span>
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <Link
          href="/knowledge"
          className="mt-12 inline-block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          ← Back to Knowledge Base
        </Link>
      </div>
    </div>
  );
}
