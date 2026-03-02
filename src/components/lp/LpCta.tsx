import { ButtonLink } from "@/components/ui/Button";
import type { LandingPageData } from "@/data/lp";

interface LpCtaProps {
  cta: LandingPageData["cta"];
}

export function LpCta({ cta }: LpCtaProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="border border-brand-border p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
            {cta.headline}
          </h2>
          <p className="mt-4 text-body text-brand-silver max-w-2xl mx-auto leading-relaxed">
            {cta.subheadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href={cta.primaryHref} variant="cta" size="lg">
              {cta.primaryLabel}
            </ButtonLink>
            <ButtonLink href={cta.secondaryHref} variant="secondary" size="lg">
              {cta.secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
