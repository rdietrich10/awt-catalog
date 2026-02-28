import { memo } from "react";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { InterestButton } from "@/components/interest/InterestButton";
import { formatPrice, formatPriceRange } from "@/lib/formatPrice";
import { getProductPrices } from "@/lib/productPrice";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Preload above-the-fold images for faster LCP */
  priority?: boolean;
}

export const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const prices = getProductPrices(product);
  const hasMembership = product.variants.some((v) => typeof v.membershipPrice === "number")
    || typeof product.membershipPrice === "number";

  return (
    <div className="group border border-brand-border bg-brand-black hover:border-brand-grey-500 transition-colors flex flex-col">
      <Link href={`/products/${product.slug}`} className="block flex-1">
        <div className="relative">
          <PlaceholderImage
            src={product.image}
            aspectRatio="1/1"
            label={product.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
          />
          <Badge
            variant={product.isBlend ? "blend" : "default"}
            className="absolute top-2 left-2 text-[10px] font-bold bg-brand-black/70 backdrop-blur-sm"
          >
            {product.category}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white group-hover:opacity-80">
            {product.name}
          </h3>
          <p className="mt-1 text-caption text-brand-silver line-clamp-2">{product.shortDescription}</p>
          {prices.length > 0 && (
            <p className="mt-2 text-body-sm text-brand-white font-display tracking-wider">
              {formatPriceRange(prices)}
              {hasMembership && (
                <span className="ml-1 text-brand-silver text-caption">member</span>
              )}
            </p>
          )}
        </div>
      </Link>
      <div className="p-4 pt-0">
        <InterestButton product={product} />
      </div>
    </div>
  );
});
