"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { InterestButton } from "@/components/interest/InterestButton";
import { ButtonLink } from "@/components/ui/Button";
import { products } from "@/data/products";
import { FEATURED_HEADLINE, FEATURED_SUBHEADLINE } from "@/data/copy";
import type { Product } from "@/types";

const featured = products.filter((p) => p.featured);

function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <div className="group flex-shrink-0 w-64 border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors">
      <Link href={`/products/${product.slug}`} className="block">
        <PlaceholderImage
          src={product.image}
          aspectRatio="1/1"
          label={product.name}
          sizes="256px"
          priority={priority}
          unoptimized
        />
        <div className="p-4">
          <Badge className="mb-2">{product.category}</Badge>
          <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white group-hover:opacity-80">
            {product.name}
          </h3>
          <p className="mt-1 text-caption text-brand-silver line-clamp-2">{product.shortDescription}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <InterestButton product={product} size="sm" />
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
            {FEATURED_HEADLINE}
          </h2>
          <p className="mt-3 text-body-sm text-brand-silver max-w-xl mx-auto">
            {FEATURED_SUBHEADLINE}
          </p>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <ButtonLink
            href="/products"
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
          >
            View Full Catalog
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
