import { ShieldCheck } from "lucide-react";
import { InsuranceVerificationForm } from "./InsuranceVerificationForm";
import {
  INSURANCE_CTA_HEADLINE,
  INSURANCE_CTA_DESCRIPTION,
} from "@/data/insurance";

interface InsuranceFormSectionProps {
  id: string;
}

export function InsuranceFormSection({ id }: InsuranceFormSectionProps) {
  return (
    <section
      id={id}
      className="relative py-16 md:py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* Full-bleed gold ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-brand-gold/[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-brand-gold/[0.08] blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-gold/[0.06] blur-[100px]" />
      </div>

      {/* Top/bottom gold border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" aria-hidden />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" aria-hidden />

      <div className="relative text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-brand-gold/60 bg-brand-gold/[0.08] mb-6">
          <ShieldCheck className="w-7 h-7 text-brand-gold" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
          {INSURANCE_CTA_HEADLINE}
        </h2>
        <p className="mt-3 text-body text-brand-silver max-w-xl mx-auto">
          {INSURANCE_CTA_DESCRIPTION}
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto border border-brand-gold/30 bg-brand-black/80 backdrop-blur-sm p-6 md:p-10 shadow-[0_0_60px_-12px_rgba(212,175,55,0.15)]">
        <InsuranceVerificationForm />
      </div>
    </section>
  );
}
