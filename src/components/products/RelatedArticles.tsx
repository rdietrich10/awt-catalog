import { ArticleCard } from "@/components/articles/ArticleCard";
import type { Article } from "@/types";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-brand-border">
      <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-6">
        From the Knowledge Base
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
