import { INSURANCE_HOW_IT_WORKS_STEPS } from "@/data/insurance";

export function InsuranceHowItWorks() {
  return (
    <section className="py-16 md:py-20 border-b border-brand-border">
      <div className="text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
          How Insurance Verification Works
        </h2>
        <p className="mt-3 text-body-sm text-brand-silver max-w-2xl mx-auto">
          Three simple steps. No phone calls, no paperwork, no obligation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INSURANCE_HOW_IT_WORKS_STEPS.map(({ number, title, description }) => (
          <div key={number} className="relative">
            <div className="flex items-start gap-4">
              <span className="shrink-0 flex h-12 w-12 items-center justify-center border border-brand-gold/40 font-display text-lg text-brand-gold">
                {number}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg uppercase tracking-wider text-brand-white">
                  {title}
                </h3>
                <p className="mt-3 text-body-sm text-brand-silver leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
