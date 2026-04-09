import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { NewPatientCallout } from "@/components/ui/NewPatientCallout";
import { categories } from "@/data/categories";
import { getOgImageMetadata } from "@/lib/og";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore advanced therapeutics by category: weight management, growth hormone, healing, reproductive health, longevity, mood, sleep, and more.",
  alternates: { canonical: "/categories" },
  ...getOgImageMetadata({
    slug: "categories",
    title: "Categories",
    description:
      "Explore advanced therapeutics by category: weight management, growth hormone, healing, reproductive health, longevity, mood, sleep, and more.",
  }),
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
        Categories
      </h1>
      <p className="text-body-sm text-brand-silver mb-6 max-w-2xl">
        Explore our catalog by therapeutic area.
      </p>
      <div className="mb-10 max-w-2xl">
        <NewPatientCallout />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group block border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors overflow-hidden"
          >
            <PlaceholderImage src={cat.image} aspectRatio="16/9" label={cat.name} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <div className="p-6">
              <h2 className="font-display text-lg uppercase tracking-wider text-brand-white group-hover:opacity-80">
                {cat.name}
              </h2>
              <p className="mt-2 text-body-sm text-brand-silver line-clamp-2">
                {cat.description}
              </p>
              <span className="mt-4 inline-block text-body-sm text-brand-silver underline underline-offset-2">
                View {cat.productCount} products →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
