import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Educational articles on advanced therapeutics — GLP-1 medications, healing compounds, longevity protocols, safety best practices, and stacking guides.",
  alternates: { canonical: "/knowledge/articles" },
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        Articles
      </h1>
      <KnowledgeNav activeSection="articles" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/knowledge/articles/${a.slug}`}
            className="block border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors overflow-hidden"
          >
            <PlaceholderImage src={a.image} aspectRatio="4/3" label={a.title} />
            <div className="p-4">
              <h2 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
                {a.title}
              </h2>
              <p className="mt-2 text-caption text-brand-silver-dark line-clamp-2">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
