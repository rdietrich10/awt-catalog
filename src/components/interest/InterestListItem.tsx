"use client";

import Link from "next/link";
import { Trash2, ChevronRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface InterestListItemProps {
  product: Product;
  onRemove: () => void;
  className?: string;
}

export function InterestListItem({ product, onRemove, className }: InterestListItemProps) {
  const primaryVariant = product.variants[0];
  const variantSummary =
    product.variants.length > 1
      ? `${product.variants.length} strengths available`
      : primaryVariant.strength;

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      className={cn(
        "group flex flex-col sm:flex-row gap-4 border border-brand-border p-4 hover:border-brand-grey-500 transition-colors relative",
        className
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 min-w-0 gap-4 sm:items-start no-underline"
      >
        <div className="w-24 h-24 flex-shrink-0">
          <PlaceholderImage
            src={product.image}
            aspectRatio="1/1"
            label={product.name}
            sizes="96px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant={product.isBlend ? "blend" : "default"}>
              {product.category}
            </Badge>
            <span className="text-caption text-brand-silver-dark font-display uppercase tracking-wider">
              {product.medicationClass}
            </span>
          </div>
          <h2 className="font-display text-base uppercase tracking-tight text-brand-white group-hover:text-brand-gold transition-colors">
            {product.name}
          </h2>
          {product.genericName !== product.name && (
            <p className="mt-0.5 text-body-sm text-brand-silver">
              {product.genericName}
            </p>
          )}
          <p className="mt-2 text-body-sm text-brand-silver">
            {product.shortDescription}
          </p>
          <p className="mt-1 text-caption text-brand-silver-dark">{product.indications}</p>
          {product.keyBenefits.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-caption text-brand-silver">
              {product.keyBenefits.slice(0, 4).map((b) => (
                <li key={b} className="flex items-center gap-1">
                  <span className="text-brand-silver-dark shrink-0">•</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2 flex items-center gap-1 text-caption text-brand-silver-dark">
            <span>{variantSummary}</span>
            <span>•</span>
            <span>{product.administrationRoute}</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-caption text-brand-gold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            View full details
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
      <Button
        type="button"
        onClick={handleRemoveClick}
        variant="ghost"
        size="sm"
        icon={Trash2}
        iconPosition="left"
        className="self-start sm:self-center text-caption underline decoration-brand-silver-dark hover:decoration-brand-gold shrink-0"
      >
        Remove
      </Button>
    </div>
  );
}
