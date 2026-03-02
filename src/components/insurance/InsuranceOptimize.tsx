import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  INSURANCE_OPTIMIZE_HEADLINE,
  INSURANCE_OPTIMIZE_DESCRIPTION,
  INSURANCE_OPTIMIZE_PILLARS,
} from "@/data/insurance";

export function InsuranceOptimize() {
  return (
    <section className="py-16 md:py-20 border-b border-brand-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
            {INSURANCE_OPTIMIZE_HEADLINE}
          </h2>
          <p className="mt-4 text-body text-brand-silver leading-relaxed">
            {INSURANCE_OPTIMIZE_DESCRIPTION}
          </p>
        </div>

        <div className="space-y-6">
          {INSURANCE_OPTIMIZE_PILLARS.map(({ title, description }, i) => (
            <div
              key={title}
              className="flex items-start gap-4 border border-brand-border p-6 sm:p-8 hover:border-brand-gold/30 transition-colors"
            >
              <span className="shrink-0 flex h-10 w-10 items-center justify-center border border-brand-gold/40 font-display text-body-sm text-brand-gold">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg uppercase tracking-wider text-brand-white">
                  {title}
                </h3>
                <p className="mt-2 text-body-sm text-brand-silver leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-brand-border bg-brand-grey-900/30 p-6 sm:p-8 text-center">
          <p className="text-body text-brand-silver leading-relaxed">
            Your blood work is the foundation. Our advanced therapeutic catalog —
            from peptide therapies and hormone optimization to metabolic support
            and longevity protocols — is the next step.
          </p>
          <Link
            href="/categories"
            className="mt-4 inline-flex items-center gap-2 text-body-sm text-brand-gold hover:text-brand-gold-light font-display tracking-wider uppercase transition-colors"
          >
            Explore Our Catalog
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
