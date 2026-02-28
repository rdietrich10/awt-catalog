import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BMICalculator } from "@/components/weight/BMICalculator";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} | AW Therapeutics`,
      description: category.description,
      url: `/categories/${category.slug}`,
    },
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.categorySlug === params.slug);
  const isWeightManagement = params.slug === "weight-management";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Categories", url: "/categories" },
          { name: category.name, url: `/categories/${category.slug}` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />
      {isWeightManagement && <BMICalculator />}
      <div className={isWeightManagement ? undefined : "mt-6"}>
        <PlaceholderImage src={category.image} aspectRatio="16/9" label={category.name} sizes="(max-width: 1280px) 100vw, 1280px" priority />
      </div>
      <div className="mt-8">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white">
          {category.name}
        </h1>
        <p className="mt-4 text-body-sm text-brand-silver max-w-2xl">{category.description}</p>
      </div>
      <div className="mt-12">
        <ProductGrid products={categoryProducts} />
      </div>
    </div>
  );
}
