import type { Metadata } from "next";
import { products } from "@/data/products";
import { PHYSICIAN_REVIEW_PRODUCTS_INTRO, PROTOCOL_STATEMENT } from "@/data/copy";
import { FilterableProductGrid } from "@/components/products/FilterableProductGrid";
import { JsonLd, productItemListJsonLd, medicalWebPageJsonLd } from "@/lib/structured-data";
import { getOgImageMetadata } from "@/lib/og";

export const metadata: Metadata = {
  title: "Product Catalog",
  description:
    "Browse AW Therapeutics Medical Grade compounds for weight management, recovery, longevity, and hormonal health. Provider-guided, precision formulated.",
  alternates: { canonical: "/products" },
  ...getOgImageMetadata({
    slug: "products",
    title: "Product Catalog",
    description:
      "Browse AW Therapeutics Medical Grade compounds for weight management, recovery, longevity, and hormonal health. Provider-guided, precision formulated.",
  }),
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={productItemListJsonLd(products)} />
      <JsonLd
        data={medicalWebPageJsonLd({
          name: "Product Catalog",
          description:
            "Browse AW Therapeutics Medical Grade compounds for weight management, recovery, longevity, and hormonal health.",
          url: "/products",
        })}
      />
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
        Product Catalog
      </h1>
      <p className="text-body-sm text-brand-silver mb-4 max-w-2xl">
        {PHYSICIAN_REVIEW_PRODUCTS_INTRO}
      </p>
      <p className="text-body-sm text-brand-silver-dark mb-8 max-w-2xl">
        {PROTOCOL_STATEMENT}
      </p>
      <FilterableProductGrid products={products} />
    </div>
  );
}
