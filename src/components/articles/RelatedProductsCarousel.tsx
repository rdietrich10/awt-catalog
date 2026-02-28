"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { InfiniteCarousel } from "@/components/ui/InfiniteCarousel";
import type { Product } from "@/types";

interface RelatedProductsCarouselProps {
  products: Product[];
}

export function RelatedProductsCarousel({
  products,
}: RelatedProductsCarouselProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-brand-border">
      <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-6">
        Related Products
      </h2>
      <InfiniteCarousel>
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </InfiniteCarousel>
    </section>
  );
}
