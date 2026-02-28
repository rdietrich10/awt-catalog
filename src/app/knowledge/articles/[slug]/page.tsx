import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { articles } from "@/data/articles";
import { articleContentMap } from "@/data/articleContent";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | AW Therapeutics`,
      description: article.excerpt,
      url: `/knowledge/articles/${article.slug}`,
      type: "article",
      images: article.image ? [{ url: article.image }] : undefined,
    },
    alternates: { canonical: `/knowledge/articles/${article.slug}` },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const RichContent = articleContentMap[article.slug];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Knowledge", url: "/knowledge" },
          { name: "Articles", url: "/knowledge/articles" },
          { name: article.title, url: `/knowledge/articles/${article.slug}` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Knowledge", href: "/knowledge" },
          { label: "Articles", href: "/knowledge/articles" },
          { label: article.title },
        ]}
      />
      <PlaceholderImage src={article.image} aspectRatio="16/9" label={article.title} sizes="(max-width: 768px) 100vw, 768px" priority className="mt-6" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mt-8">
        {article.title}
      </h1>
      <p className="mt-4 text-body-sm text-brand-silver">{article.excerpt}</p>

      <div className="mt-8">
        {RichContent ? (
          <RichContent />
        ) : (
          <div className="text-body-sm text-brand-silver leading-relaxed max-w-none [&>p]:mb-4">
            <p>{article.content}</p>
          </div>
        )}
      </div>

      <Link href="/knowledge/articles" className="mt-12 inline-block text-body-sm text-brand-silver hover:text-brand-white">
        &larr; Back to Articles
      </Link>
    </div>
  );
}
