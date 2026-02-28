import Link from "next/link";
import {
  Stethoscope,
  FileText,
  Monitor,
  HeartPulse,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

const sections = [
  {
    icon: Stethoscope,
    title: "1. Physician-Directed Medical Model vs. Retail Transaction Model",
    body: "At AW Therapeutics, every therapeutic request undergoes clinical review by a licensed physician or advanced practitioner. Telehealth consultation may be required when medically indicated, and provider approval is required before any product is dispensed or shipped. Typical online peptide companies operate a direct-to-consumer checkout with little or no clinical review, often marketing products as \"research use only\" with no formal medical decision-making process. AW operates as healthcare delivery — not e-commerce.",
  },
  {
    icon: FileText,
    title: "2. Medical Record Creation & Documentation",
    body: "We maintain a formal patient medical record for each individual. Provider notes document patient history review, clinical decision-making, approval rationale, and follow-up recommendations. Records are retained consistent with healthcare compliance standards. Most online vendors maintain no medical record, no documentation of medical necessity, and no continuity of care. This establishes legitimacy, liability protection, and continuity — critical for compliance and payer integration.",
  },
  {
    icon: Monitor,
    title: "3. Insurance-Compatible Telehealth Services",
    body: "Our telehealth encounters may be eligible for coverage through your health insurance. You receive legitimate medical services, not just products, and our care model integrates with conventional healthcare systems. Typical online vendors operate as cash-only retail transactions with no billable clinical encounter and no payer relationship. This blended healthcare and consumer model increases accessibility and credibility.",
  },
  {
    icon: HeartPulse,
    title: "4. Medical-Grade Therapeutics with Clinical Oversight",
    body: "Therapeutics are provided within a medical treatment framework. Dosing guidance, monitoring, and follow-up are included, with ongoing provider oversight available. Other vendors ship products without monitoring, with no clinician involvement in dosing decisions and no follow-up protocols. This means risk reduction, improved outcomes, and higher patient safety for AW patients.",
  },
  {
    icon: ShieldCheck,
    title: "5. Regulatory Positioning & Compliance Infrastructure",
    body: "AW Therapeutics operates within healthcare regulatory structures: licensed clinic, medical supervision, HIPAA privacy compliance, provider documentation, and telehealth standards. This creates a defensible compliance posture. Many online peptide vendors operate in regulatory gray zones with limited clinical governance and higher legal exposure. Our institutional-grade compliance increases confidence and scalability.",
  },
  {
    icon: RefreshCw,
    title: "6. Continuity of Care & Longitudinal Management",
    body: "Follow-up monitoring is available. We can adjust therapy based on response and integrate with broader health optimization strategies. Typical vendors operate a one-time transaction model with no longitudinal care. This transforms an episodic purchase into an ongoing healthcare relationship.",
  },
] as const;

export function PhysicianDirectedModelContent() {
  return (
    <div className="space-y-8">
      <div className="border-l-2 border-brand-gold pl-6">
        <p className="text-body-sm text-brand-silver leading-relaxed">
          The peptide and advanced therapeutics space is growing rapidly — and so
          is the number of online vendors selling products with little or no
          medical oversight. For consumers, the differences between a legitimate
          healthcare provider and a retail peptide shop can be hard to spot. This
          article breaks down what sets a physician-directed model apart, and why
          it matters for your safety, outcomes, and peace of mind.
        </p>
      </div>

      {sections.map(({ icon: Icon, title, body }) => (
        <div key={title}>
          <div className="flex items-start gap-3 mb-3">
            <Icon className="w-5 h-5 text-brand-gold shrink-0 mt-1" aria-hidden />
            <h2 className="font-display text-lg uppercase tracking-wider text-brand-white">
              {title}
            </h2>
          </div>
          <p className="text-body-sm text-brand-silver leading-relaxed pl-8">
            {body}
          </p>
        </div>
      ))}

      <div className="border border-brand-border bg-brand-grey-900/30 p-6 mt-8">
        <h2 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-3">
          The Bottom Line
        </h2>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          AW Therapeutics is not a retail peptide company. We are a
          physician-directed medical practice delivering advanced therapeutics
          through a structured clinical process. Every therapy request is reviewed
          by a licensed medical provider, with telehealth consultation when
          clinically appropriate. Patients receive medical-grade therapeutics with
          professional oversight, documented medical records, and ongoing
          follow-up support.
        </p>
        <p className="mt-3 text-body-sm text-brand-silver leading-relaxed">
          This approach ensures safety, accountability, and continuity of care —
          combining the convenience of online access with the standards of modern
          healthcare.
        </p>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/about"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          Learn more about our medical model
        </Link>
      </div>
    </div>
  );
}
