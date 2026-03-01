import type { Metadata } from "next";
import { KnowledgeNav } from "@/components/knowledge/KnowledgeNav";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/data/articles";
import { JsonLd, articleItemListJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Educational articles on advanced therapeutics — GLP-1 medications, healing compounds, longevity protocols, safety best practices, and stacking guides.",
  alternates: { canonical: "/knowledge/articles" },
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={articleItemListJsonLd(articles)} />
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
        Articles
      </h1>
      <KnowledgeNav activeSection="articles" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
