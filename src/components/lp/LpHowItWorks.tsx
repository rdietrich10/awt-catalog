import { HOW_IT_WORKS_STEPS } from "@/data/copy";

export function LpHowItWorks() {
  return (
    <section className="py-16 md:py-24 border-b border-brand-border">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
          How It Works
        </h2>
        <p className="mt-4 text-body text-brand-silver max-w-2xl mx-auto leading-relaxed">
          Three steps from browsing to delivery — with a licensed physician
          reviewing every request.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <div key={step.title} className="relative text-center">
            <span className="inline-flex items-center justify-center w-10 h-10 border border-brand-gold/40 font-display text-sm text-brand-gold mb-4">
              {i + 1}
            </span>
            <h3 className="font-display text-sm uppercase tracking-wider text-brand-white mb-2">
              {step.title}
            </h3>
            <p className="text-body-sm text-brand-silver leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
