import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ButtonLink } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { CATEGORY_HEADLINE, CATEGORY_SUBHEADLINE } from "@/data/copy";

const displayCategories = categories.filter((c) => c.productCount > 0);

export function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
            {CATEGORY_HEADLINE}
          </h2>
          <p className="mt-3 text-body-sm text-brand-silver max-w-xl mx-auto">
            {CATEGORY_SUBHEADLINE}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group block border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors overflow-hidden"
            >
              <PlaceholderImage
                src={cat.image}
                aspectRatio="16/9"
                label={cat.name}
                context={cat.name}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="p-4">
                <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white group-hover:text-brand-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-caption text-brand-silver line-clamp-2">
                  {cat.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-caption text-brand-silver-dark group-hover:text-brand-gold transition-colors">
                  {cat.productCount} products
                  <ArrowRight className="w-3 h-3" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <ButtonLink href="/categories" variant="secondary" size="md">
            All Categories
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
