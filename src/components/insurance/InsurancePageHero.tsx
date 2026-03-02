import { ShieldCheck, ArrowDown } from "lucide-react";
import {
  INSURANCE_PAGE_HEADLINE,
  INSURANCE_PAGE_SUBHEADLINE,
  INSURANCE_PAGE_VALUE_PROPS,
} from "@/data/insurance";

interface InsurancePageHeroProps {
  formAnchor: string;
}

export function InsurancePageHero({ formAnchor }: InsurancePageHeroProps) {
  return (
    <section className="relative py-16 md:py-24 border-b border-brand-border overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[600px] h-[600px] md:w-[900px] md:h-[700px] rounded-full bg-brand-gold/[0.06] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[300px] h-[300px] md:w-[500px] md:h-[400px] rounded-full bg-brand-gold/[0.08] blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-brand-gold/30 bg-brand-gold/[0.05] mb-8">
          <ShieldCheck className="w-4 h-4 text-brand-gold" aria-hidden />
          <span className="text-caption font-display tracking-widest uppercase text-brand-gold">
            Insurance Verification
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-brand-white leading-tight">
          {INSURANCE_PAGE_HEADLINE}
        </h1>

        <p className="mt-6 text-body text-brand-silver max-w-2xl mx-auto leading-relaxed">
          {INSURANCE_PAGE_SUBHEADLINE}
        </p>

        <a
          href={`#${formAnchor}`}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 btn-gold-full text-brand-black font-display text-body-sm tracking-widest uppercase hover:shadow-gold-glow-strong transition-all duration-button"
        >
          Check My Coverage
          <ArrowDown size={16} aria-hidden />
        </a>
      </div>

      <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {INSURANCE_PAGE_VALUE_PROPS.map(({ title, description }) => (
          <div
            key={title}
            className="border border-brand-border bg-brand-black/60 backdrop-blur-sm p-6 hover:border-brand-gold/30 transition-colors"
          >
            <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-2">
              {title}
            </h3>
            <p className="text-body-sm text-brand-silver leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
