import { Activity } from "lucide-react";
import {
  INSURANCE_UNDERSTAND_HEADLINE,
  INSURANCE_UNDERSTAND_DESCRIPTION,
  INSURANCE_BIOMARKER_AREAS,
} from "@/data/insurance";

export function InsuranceBiomarkers() {
  return (
    <section className="py-16 md:py-20 border-b border-brand-border">
      <div className="text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
          {INSURANCE_UNDERSTAND_HEADLINE}
        </h2>
        <p className="mt-3 text-body text-brand-silver max-w-3xl mx-auto leading-relaxed">
          {INSURANCE_UNDERSTAND_DESCRIPTION}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSURANCE_BIOMARKER_AREAS.map(({ title, markers, insight }) => (
          <div
            key={title}
            className="border border-brand-border p-6 hover:border-brand-gold/30 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Activity
                className="w-5 h-5 text-brand-gold shrink-0 group-hover:scale-110 transition-transform"
                aria-hidden
              />
              <h3 className="font-display text-sm uppercase tracking-wider text-brand-white">
                {title}
              </h3>
            </div>
            <p className="text-caption text-brand-silver-dark leading-relaxed mb-3">
              {markers}
            </p>
            <p className="text-body-sm text-brand-silver leading-relaxed">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
