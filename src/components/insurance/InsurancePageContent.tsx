import { InsurancePageHero } from "./InsurancePageHero";
import { InsuranceHowItWorks } from "./InsuranceHowItWorks";
import { InsuranceBiomarkers } from "./InsuranceBiomarkers";
import { InsuranceOptimize } from "./InsuranceOptimize";
import { InsuranceFormSection } from "./InsuranceFormSection";

const FORM_SECTION_ID = "verify-coverage";

export function InsurancePageContent() {
  return (
    <>
      <InsurancePageHero formAnchor={FORM_SECTION_ID} />
      <InsuranceHowItWorks />
      <InsuranceBiomarkers />
      <InsuranceOptimize />
      <InsuranceFormSection id={FORM_SECTION_ID} />

      <section className="py-12 text-center">
        <p className="text-body-sm text-brand-silver-dark max-w-2xl mx-auto leading-relaxed">
          Have questions about insurance coverage or our blood testing panels?{" "}
          <a
            href="/contact"
            className="text-brand-gold hover:underline transition-colors"
          >
            Contact our team
          </a>{" "}
          — we typically respond within 24 hours.
        </p>
      </section>
    </>
  );
}
