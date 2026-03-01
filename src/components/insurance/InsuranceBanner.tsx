"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp, Check } from "lucide-react";
import { InsuranceVerificationForm } from "./InsuranceVerificationForm";
import {
  INSURANCE_BANNER_HEADLINE,
  INSURANCE_BANNER_SUBHEADLINE,
  INSURANCE_BANNER_BULLETS,
} from "@/data/insurance";

export function InsuranceBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border border-brand-gold/30 bg-brand-gold/[0.03] mb-12">
      {/* Banner header - always visible */}
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 border border-brand-gold/40 shrink-0">
            <ShieldCheck className="w-6 h-6 text-brand-gold" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl md:text-2xl uppercase tracking-wider text-brand-gold">
              {INSURANCE_BANNER_HEADLINE}
            </h2>
            <p className="mt-2 text-body-sm text-brand-silver max-w-3xl leading-relaxed">
              {INSURANCE_BANNER_SUBHEADLINE}
            </p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {INSURANCE_BANNER_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-body-sm text-brand-silver"
                >
                  <Check
                    size={16}
                    className="text-brand-gold shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 border border-brand-gold text-brand-gold font-display text-body-sm tracking-wider uppercase hover:bg-brand-gold hover:text-brand-black transition-colors"
              aria-expanded={expanded}
              aria-controls="insurance-form-panel"
            >
              {expanded ? "Hide Form" : "Check My Coverage"}
              {expanded ? (
                <ChevronUp size={16} aria-hidden />
              ) : (
                <ChevronDown size={16} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable form section */}
      <div
        id="insurance-form-panel"
        role="region"
        aria-label="Insurance verification form"
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-brand-gold/20 p-6 md:p-8">
          <InsuranceVerificationForm />
        </div>
      </div>
    </section>
  );
}
