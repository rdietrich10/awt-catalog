import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  return (
    <Link
      href={`/knowledge/articles/${article.slug}`}
      className="block border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors overflow-hidden h-full"
    >
      <PlaceholderImage
        src={article.image}
        aspectRatio="4/3"
        label={article.title}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
      />
      <div className="p-4">
        <time
          dateTime={article.dateUpdated}
          className="block text-caption text-brand-silver-dim mb-2"
        >
          {article.dateUpdated !== article.dateCreated ? "Updated " : ""}
          {new Date(article.dateUpdated + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
          {article.title}
        </h3>
        <p className="mt-2 text-caption text-brand-silver-dark line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
