import Link from "next/link";
import {
  Clock,
  TrendingUp,
  BarChart2,
  Pill,
  AlertTriangle,
} from "lucide-react";

const sections = [
  {
    icon: Clock,
    title: "1. Weeks 1–4: The Adjustment Phase",
    body: "GLP-1 protocols begin intentionally low. The starting dose is sub-therapeutic — meaning it won't produce significant weight loss yet. This is by design: the slow escalation allows your gastrointestinal system to adapt before the medication reaches its clinically active dose. During this phase, you may notice: reduced appetite or feeling full faster than usual, occasional nausea (particularly in the hour after eating), and early changes in food preferences or cravings. These are signs the medication is interacting with your hunger signaling — not signs that something is wrong. Nausea during week one or two is common and typically self-resolves.",
  },
  {
    icon: TrendingUp,
    title: "2. Months 2–3: Building Momentum",
    body: "As your dose escalates toward the therapeutic range, the effects become more pronounced and consistent. Appetite suppression deepens. Cravings — particularly for high-calorie, ultra-processed foods — typically diminish significantly. Energy levels often stabilize once the GI adjustment period passes. Measurable weight loss usually becomes visible to patients during this phase, though the rate varies based on diet, activity, dose timing, and individual metabolic response. This is also the phase where consistency matters most: patients who stay on protocol during dose escalation see the strongest downstream outcomes.",
  },
  {
    icon: BarChart2,
    title: "3. Long-Term Outcomes",
    body: "Clinical trials establish the benchmarks. The STEP trials for semaglutide reported ~15% average body weight loss at 68 weeks. SURMOUNT trials for tirzepatide reported 22–24% at 72 weeks. Individual results vary — some patients exceed these averages, others respond more modestly. What the data consistently shows is that outcomes correlate with adherence to dosing protocol, lifestyle integration (nutrition and activity), and ongoing medical supervision. These medications are not a permanent solution administered in isolation — they work best within a structured clinical framework that continues beyond the initial prescription.",
  },
  {
    icon: Pill,
    title: "4. Managing Side Effects",
    body: "The most common side effects are gastrointestinal and peak during dose escalation. Practical strategies that clinical experience has validated: eat smaller, more frequent meals rather than large ones; avoid high-fat, fried, or very rich foods in the first weeks; stay hydrated, particularly if experiencing diarrhea; do not skip doses to avoid side effects — this disrupts the escalation schedule. If nausea is significant, your provider can pause escalation at the current dose until tolerance improves. Most patients find GI side effects substantially diminish by month 2.",
  },
  {
    icon: AlertTriangle,
    title: "5. When to Contact Your Provider",
    body: "Most side effects are manageable and expected. However, certain symptoms require prompt medical attention: severe or persistent abdominal pain (particularly radiating to the back — a potential sign of pancreatitis); signs of dehydration such as dizziness, dark urine, or inability to keep fluids down; yellowing of the skin or whites of the eyes (jaundice, which may indicate gallbladder involvement); any signs of an allergic reaction including difficulty breathing, swelling of the face or throat. These events are rare, but the medication should not be resumed without provider clearance if any of these symptoms occur.",
  },
] as const;

export function StartingGlp1MedicationContent() {
  return (
    <div className="space-y-8">
      <div className="border-l-2 border-brand-gold pl-6">
        <p className="text-body-sm text-brand-silver leading-relaxed">
          Starting a GLP-1 medication is a clinical process, not a quick
          fix. The protocol is structured deliberately — low doses, gradual
          escalation, consistent timing — and the outcomes reflect that
          structure. Here&apos;s what to expect at each phase, and what it
          means when the medication is working as intended.
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
          Starting a GLP-1 medication is not a standalone intervention — it
          is the beginning of a structured clinical protocol. The medication
          creates the physiological conditions for weight loss; the protocol,
          lifestyle integration, and physician oversight determine how
          durable and meaningful those results become.
        </p>
        <p className="mt-3 text-body-sm text-brand-silver leading-relaxed">
          Communicate with your provider throughout. Adjustment is part of
          the process — not a sign the medication isn&apos;t working.
        </p>
      </div>

      <div className="flex justify-center gap-6 pt-4">
        <Link
          href="/knowledge/articles/glp-1-comparison"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          Compare GLP-1 medications
        </Link>
        <Link
          href="/interest-list"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          Start an inquiry
        </Link>
      </div>
    </div>
  );
}
