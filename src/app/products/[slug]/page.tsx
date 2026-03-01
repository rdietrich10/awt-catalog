import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getArticlesForProduct } from "@/data/articleProductMap";
import { ProductDetail } from "@/components/products/ProductDetail";
import { RelatedArticles } from "@/components/products/RelatedArticles";
import { JsonLd, productJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { getOgImageMetadata } from "@/lib/og";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    ...getOgImageMetadata({
      slug: "products-detail",
      title: product.name,
      description: product.shortDescription,
    }),
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  const relatedArticles = getArticlesForProduct(product);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Catalog", url: "/products" },
          { name: product.category, url: `/categories/${product.categorySlug}` },
          { name: product.name, url: `/products/${product.slug}` },
        ])}
      />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <RelatedArticles articles={relatedArticles} />
    </div>
  );
}
