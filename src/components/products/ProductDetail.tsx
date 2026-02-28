"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { InterestButton } from "@/components/interest/InterestButton";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/formatPrice";
import { getVariantPrice } from "@/lib/productPrice";
import type { Product } from "@/types";
import { IFU_DEFAULTS } from "@/types";

interface RelatedProduct {
  slug: string;
  name: string;
  shortDescription: string;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: RelatedProduct[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const variant = product.variants[selectedVariant];
  const related = relatedProducts;

  return (
    <article>
      <div className="flex items-center justify-between gap-4">
        <Breadcrumb
          items={[
            { label: "Catalog", href: "/products" },
            { label: product.category, href: `/categories/${product.categorySlug}` },
            { label: product.name },
          ]}
        />
        <InterestButton product={product} compact />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PlaceholderImage
            src={product.image}
            aspectRatio="16/9"
            label={product.name}
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="mb-6"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={product.isBlend ? "blend" : "default"}>{product.category}</Badge>
          </div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white">
            {product.name}
          </h1>
          {product.genericName !== product.name && (
            <p className="mt-2 text-body-sm text-brand-silver">{product.genericName}</p>
          )}
          <p className="mt-2 text-caption font-display tracking-wider uppercase text-brand-silver-dark">
            {product.medicationClass}
          </p>
          <p className="mt-4 text-body-sm text-brand-silver leading-relaxed">{product.fullDescription}</p>
          <div className="mt-4">
            <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-1">
              Indications
            </h3>
            <p className="text-body-sm text-brand-silver">{product.indications}</p>
          </div>
          <ul className="mt-6 space-y-2">
            {product.keyBenefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-body-sm text-brand-silver">
                <span className="text-brand-silver-dark">—</span> {b}
              </li>
            ))}
          </ul>
          {product.isBlend && product.blendComponents && (
            <div className="mt-6">
              <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
                Blend Components
              </h3>
              <p className="text-body-sm text-brand-silver">
                {product.blendComponents.join(", ")}
              </p>
            </div>
          )}
        </div>
        <div className="space-y-6">
          {(variant.price !== undefined || variant.membershipPrice !== undefined) && (
            <div>
              <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
                Price
              </h3>
              <p className="text-body-sm text-brand-white font-display">
                {typeof variant.price === "number" && typeof variant.membershipPrice === "number" ? (
                  <>
                    <span className="text-brand-silver line-through mr-2">{formatPrice(variant.price)}</span>
                    <span>{formatPrice(variant.membershipPrice)}</span>
                    <span className="ml-1 text-caption text-brand-silver">member</span>
                  </>
                ) : (
                  <>
                    {formatPrice(getVariantPrice(variant) ?? 0)}
                    {variant.membershipPrice !== undefined && (
                      <span className="ml-1 text-caption text-brand-silver">member</span>
                    )}
                  </>
                )}
              </p>
            </div>
          )}
          {product.variants.length > 1 && (
            <div>
              <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
                Strength
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <Button
                    key={i}
                    type="button"
                    onClick={() => setSelectedVariant(i)}
                    variant="toggle"
                    size="md"
                    isSelected={selectedVariant === i}
                    icon={selectedVariant === i ? Check : undefined}
                    iconPosition="left"
                  >
                    {v.strength}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
              Medication Details
            </h3>
            <p className="text-caption text-brand-silver-dark">{variant.vialSize}</p>
            {variant.concentration && variant.concentration !== "N/A" && (
              <p className="mt-1 text-caption text-brand-silver-dark">
                Concentration: {variant.concentration}
              </p>
            )}
            {variant.reconstitutionVolume && variant.reconstitutionVolume !== "N/A" && variant.reconstitutionVolume !== "Consult provider" && (
              <p className="mt-1 text-caption text-brand-silver-dark">
                Bacteriostatic Water {variant.reconstitutionVolume}
              </p>
            )}
          </div>
          <div>
            <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
              Dosing
            </h3>
            <p className="text-body-sm text-brand-silver">{variant.schedule}</p>
          </div>
          <div>
            <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
              Administration
            </h3>
            <p className="text-body-sm text-brand-silver">{product.administrationRoute}</p>
            {product.injectionNote && (
              <p className="mt-2 text-caption text-brand-silver-dark border-l-2 border-brand-silver-dark pl-3">
                {product.injectionNote}
              </p>
            )}
          </div>
          {(product.administrationRoute === "Subcutaneous" || product.administrationRoute === "Intramuscular" || product.administrationRoute?.includes("IV")) && (
            <div>
              <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
                Injection Technique
              </h3>
              <ul className="space-y-1">
                {(product.injectionTechnique ?? IFU_DEFAULTS.injectionTechnique).map((step) => (
                  <li key={step} className="text-caption text-brand-silver-dark flex items-start gap-2">
                    <span className="text-brand-silver-dark shrink-0">•</span> {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.administrationRoute === "Subcutaneous" && (
            <div>
              <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
                Missed Dose
              </h3>
              <ul className="space-y-1">
                {(product.missedDose ?? IFU_DEFAULTS.missedDose).map((item) => (
                  <li key={item} className="text-caption text-brand-silver-dark flex items-start gap-2">
                    <span className="text-brand-silver-dark shrink-0">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
              Storage & Handling
            </h3>
            <p className="text-caption text-brand-silver-dark">{IFU_DEFAULTS.storage}</p>
          </div>
          <div>
            <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
              Notes
            </h3>
            <p className="text-body-sm text-brand-silver">{product.clinicalNotes}</p>
            {product.providerNote && (
              <p className="mt-2 text-caption text-brand-silver-dark">{product.providerNote}</p>
            )}
          </div>
          <div>
            <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-2">
              Disclaimer
            </h3>
            <p className="text-caption text-brand-silver-dark italic">{IFU_DEFAULTS.disclaimer}</p>
          </div>
          <p className="text-caption text-brand-silver-dark">{IFU_DEFAULTS.effectiveDate}</p>
          <InterestButton product={product} className="mt-4" />
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16 pt-16 border-t border-brand-border">
          <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="block border border-brand-border p-4 hover:border-brand-grey-500 transition-colors"
              >
                <p className="font-display text-body-sm uppercase tracking-wider text-brand-white">
                  {p.name}
                </p>
                <p className="mt-1 text-caption text-brand-silver-dark">{p.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
