"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { search } from "@/lib/search";
import type { SearchResult } from "@/lib/search";
import { Badge } from "@/components/ui/Badge";

function SearchResultsInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [results, setResults] = useState<SearchResult | null>(null);

  useEffect(() => {
    setResults(search(q));
  }, [q]);

  if (!q) {
    return (
      <div className="py-16 text-center text-body-sm text-brand-silver">
        <p>Enter a search term to find products, articles, and glossary terms.</p>
      </div>
    );
  }

  if (!results) return null;

  const hasResults =
    results.products.length > 0 ||
    results.articles.length > 0 ||
    results.glossary.length > 0;

  if (!hasResults) {
    return (
      <div className="py-16 text-center text-body-sm text-brand-silver">
        <p>No results for &quot;{q}&quot;.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {results.products.length > 0 && (
        <section>
          <h2 className="font-display text-body-sm uppercase tracking-widest text-brand-silver mb-4">
            Products ({results.products.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="block border border-brand-border p-4 hover:border-brand-grey-500 transition-colors"
              >
                <Badge className="mb-2">{p.category}</Badge>
                <h3 className="font-display text-body-sm uppercase text-brand-white">{p.name}</h3>
                <p className="mt-1 text-caption text-brand-silver-dark line-clamp-2">{p.shortDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {results.articles.length > 0 && (
        <section>
          <h2 className="font-display text-body-sm uppercase tracking-widest text-brand-silver mb-4">
            Articles ({results.articles.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.articles.map((a) => (
              <Link
                key={a.slug}
                href={`/knowledge/articles/${a.slug}`}
                className="block border border-brand-border p-4 hover:border-brand-grey-500 transition-colors"
              >
                <h3 className="font-display text-body-sm uppercase text-brand-white">{a.title}</h3>
                <p className="mt-1 text-caption text-brand-silver-dark line-clamp-2">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {results.glossary.length > 0 && (
        <section>
          <h2 className="font-display text-body-sm uppercase tracking-widest text-brand-silver mb-4">
            Glossary ({results.glossary.length})
          </h2>
          <ul className="space-y-3">
            {results.glossary.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/knowledge/glossary#${g.slug}`}
                  className="block border border-brand-border p-4 hover:border-brand-grey-500 transition-colors"
                >
                  <span className="font-display text-body-sm uppercase text-brand-white">{g.term}</span>
                  <p className="mt-1 text-caption text-brand-silver-dark">{g.definition}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        Search
      </h1>
      <Suspense fallback={<div className="text-body-sm text-brand-silver">Loading...</div>}>
        <SearchResultsInner />
      </Suspense>
    </div>
  );
}
