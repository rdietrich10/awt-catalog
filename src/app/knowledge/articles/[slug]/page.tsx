import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedProductsCarousel } from "@/components/articles/RelatedProductsCarousel";
import { articles } from "@/data/articles";
import { articleContentMap } from "@/data/articleContent";
import { getProductsForArticle } from "@/data/articleProductMap";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { getOgImageMetadata } from "@/lib/og";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/knowledge/articles/${article.slug}` },
    ...getOgImageMetadata({
      slug: "articles-detail",
      title: article.title,
      description: article.excerpt,
    }),
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const RichContent = articleContentMap[article.slug];
  const relatedProducts = getProductsForArticle(article.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Knowledge", url: "/knowledge" },
          { name: "Articles", url: "/knowledge/articles" },
          { name: article.title, url: `/knowledge/articles/${article.slug}` },
        ])}
      />

      <div className="mx-auto max-w-3xl">
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
        <div className="mt-3 flex flex-wrap gap-x-4 text-caption text-brand-silver-accessible">
          <time dateTime={article.dateCreated}>
            Published{" "}
            {new Date(article.dateCreated + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {article.dateUpdated !== article.dateCreated && (
            <time dateTime={article.dateUpdated}>
              Updated{" "}
              {new Date(article.dateUpdated + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
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
      </div>

      <RelatedProductsCarousel products={relatedProducts} />

      <div className="mx-auto max-w-3xl">
        <Link href="/knowledge/articles" className="mt-12 inline-block text-body-sm text-brand-silver hover:text-brand-white">
          &larr; Back to Articles
        </Link>
      </div>
    </div>
  );
}
