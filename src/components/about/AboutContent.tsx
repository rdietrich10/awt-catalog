import {
  Stethoscope,
  FileText,
  Monitor,
  HeartPulse,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { AboutCta } from "./AboutCta";

const differentiators = [
  {
    icon: Stethoscope,
    title: "Physician-Directed Medical Model",
    description:
      "Every therapeutic request undergoes clinical review by a licensed physician or advanced practitioner. Telehealth consultation may be required when medically indicated. Provider approval is required before any product is dispensed or shipped.",
    advantage: "AW operates as healthcare delivery — not e-commerce.",
  },
  {
    icon: FileText,
    title: "Medical Record Creation & Documentation",
    description:
      "We maintain a formal patient medical record for each individual. Provider notes document patient history review, clinical decision-making, approval rationale, and follow-up recommendations — retained consistent with healthcare compliance standards.",
    advantage:
      "This establishes legitimacy, liability protection, and continuity — critical for compliance and payer integration.",
  },
  {
    icon: Monitor,
    title: "Insurance-Compatible Telehealth Services",
    description:
      "Telehealth encounters may be eligible for coverage through your health insurance. You receive legitimate medical services, not just products. Our care model integrates with conventional healthcare systems.",
    advantage:
      "A blended healthcare and consumer model that increases accessibility and credibility.",
  },
  {
    icon: HeartPulse,
    title: "Medical-Grade Therapeutics with Clinical Oversight",
    description:
      "Therapeutics are provided within a medical treatment framework. Dosing guidance, monitoring, and follow-up are included. Ongoing provider oversight is available throughout your course of therapy.",
    advantage:
      "Risk reduction, improved outcomes, and higher patient safety.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Positioning & Compliance Infrastructure",
    description:
      "We operate within healthcare regulatory structures: licensed clinic, medical supervision, HIPAA privacy compliance, provider documentation, and telehealth standards. This creates a defensible compliance posture.",
    advantage:
      "Institutional-grade compliance that increases confidence and scalability.",
  },
  {
    icon: RefreshCw,
    title: "Continuity of Care & Longitudinal Management",
    description:
      "Follow-up monitoring is available. We can adjust therapy based on your response. Your care integrates with broader health optimization strategies — transforming an episodic purchase into an ongoing healthcare relationship.",
    advantage:
      "Your health is a journey, not a transaction.",
  },
] as const;

const complianceItems = [
  "Physician-patient relationship requirements",
  "Telehealth standards of care",
  "Medical record retention laws",
  "Healthcare privacy regulations (HIPAA)",
  "Clinical decision documentation requirements",
  "FDA-registered 503A/503B compounding standards",
] as const;

function DifferentiatorSection() {
  return (
    <div className="mt-16">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
        Our Medical Model
      </h2>
      <p className="mt-3 text-body-sm text-brand-silver text-center max-w-2xl mx-auto">
        Six pillars that separate physician-directed care from retail peptide sales.
      </p>

      <div className="mt-12 space-y-8">
        {differentiators.map(({ icon: Icon, title, description, advantage }) => (
          <div
            key={title}
            className="border border-brand-border p-6 sm:p-8 hover:border-brand-gold/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-brand-border">
                <Icon className="w-6 h-6 text-brand-gold" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg uppercase tracking-wider text-brand-white">
                  {title}
                </h3>
                <p className="mt-3 text-body-sm text-brand-silver leading-relaxed">
                  {description}
                </p>
                <p className="mt-3 text-body-sm text-brand-gold/80 font-display tracking-wide">
                  {advantage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceSection() {
  return (
    <div className="mt-16 border border-brand-border bg-brand-grey-900/30 p-6 sm:p-10">
      <h2 className="font-display text-xl uppercase tracking-wider text-brand-white mb-4">
        Compliance & Standards
      </h2>
      <p className="text-body-sm text-brand-silver mb-6">
        Our model aligns with the regulatory and clinical standards that define
        legitimate healthcare delivery:
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {complianceItems.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-body-sm text-brand-silver"
          >
            <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-caption text-brand-silver-dark">
        This significantly separates AW from non-medical peptide distributors.
      </p>
    </div>
  );
}

function TaglineBanner() {
  return (
    <div className="mt-16 py-12 border-y border-brand-border text-center">
      <p className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
        Medical Oversight.<br />Not Retail Shortcuts.
      </p>
      <p className="mt-4 text-body text-brand-silver max-w-lg mx-auto">
        Advanced therapeutics delivered through real healthcare. Where
        physician-guided care meets modern convenience.
      </p>
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="border-l-2 border-brand-gold pl-6">
        <p className="text-body text-brand-silver leading-relaxed">
          AW Therapeutics is not a retail peptide company. We are a
          physician-directed medical practice delivering advanced therapeutics
          through a structured clinical process.
        </p>
        <p className="mt-4 text-body text-brand-silver leading-relaxed">
          Every therapy request is reviewed by a licensed medical provider, with
          telehealth consultation when clinically appropriate. Patients receive
          medical-grade therapeutics with professional oversight, documented
          medical records, and ongoing follow-up support.
        </p>
        <p className="mt-4 text-body text-brand-silver leading-relaxed">
          This approach ensures safety, accountability, and continuity of care —
          combining the convenience of online access with the standards of modern
          healthcare.
        </p>
      </div>

      <DifferentiatorSection />
      <ComplianceSection />
      <TaglineBanner />

      <AboutCta />
    </div>
  );
}
