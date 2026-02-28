import Link from "next/link";

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
        Knowledge Base
      </h1>
      <p className="text-body-sm text-brand-silver mb-12 max-w-2xl">
        FAQ, educational articles, protocols, and a glossary of therapeutic terms.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link
          href="/knowledge/faq"
          className="block border border-brand-border p-8 hover:border-brand-grey-500 transition-colors"
        >
          <h2 className="font-display text-lg uppercase tracking-wider text-brand-white">FAQ</h2>
          <p className="mt-2 text-body-sm text-brand-silver">
            Common questions about our therapeutics, storage, and protocols.
          </p>
        </Link>
        <Link
          href="/knowledge/articles"
          className="block border border-brand-border p-8 hover:border-brand-grey-500 transition-colors"
        >
          <h2 className="font-display text-lg uppercase tracking-wider text-brand-white">Articles</h2>
          <p className="mt-2 text-body-sm text-brand-silver">
            Educational content on how our therapeutics work and best practices.
          </p>
        </Link>
        <Link
          href="/knowledge/protocols"
          className="block border border-brand-border p-8 hover:border-brand-grey-500 transition-colors"
        >
          <h2 className="font-display text-lg uppercase tracking-wider text-brand-white">Protocols</h2>
          <p className="mt-2 text-body-sm text-brand-silver">
            Reconstitution, storage, and use of therapeutic compounds, nutriments, and Lathmized NAD+.
          </p>
        </Link>
        <Link
          href="/knowledge/glossary"
          className="block border border-brand-border p-8 hover:border-brand-grey-500 transition-colors"
        >
          <h2 className="font-display text-lg uppercase tracking-wider text-brand-white">Glossary</h2>
          <p className="mt-2 text-body-sm text-brand-silver">
            A–Z definitions of therapeutic and medical terms.
          </p>
        </Link>
      </div>
    </div>
  );
}
