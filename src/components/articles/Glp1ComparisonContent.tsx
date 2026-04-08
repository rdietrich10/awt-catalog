import Link from "next/link";
import {
  Microscope,
  TrendingDown,
  Activity,
  AlertCircle,
  Stethoscope,
} from "lucide-react";

const sections = [
  {
    icon: Microscope,
    title: "1. How Each Medication Works",
    body: "All three target the hormones that regulate blood sugar, appetite, and metabolism — but through different receptor combinations. Semaglutide activates only the GLP-1 receptor, signaling fullness, slowing gastric emptying, and stimulating insulin release. Tirzepatide adds GIP receptor activation on top of GLP-1, which enhances insulin sensitivity and changes how your body processes nutrients. Retatrutide introduces a third pathway: glucagon receptor agonism. This addition doesn't just suppress appetite — it may actively increase the calories your body burns at rest. Three mechanisms. Three different physiological footprints.",
  },
  {
    icon: TrendingDown,
    title: "2. Weight Loss Outcomes",
    body: "Clinical trials show a clear progression across the three agents. Semaglutide (Ozempic/Wegovy) produced ~15% average body weight loss in the STEP trials. Tirzepatide (Mounjaro/Zepbound) reached 22–24% in the SURMOUNT trials — a result that surprised even its developers. Retatrutide is the newest and still in trial phases, with early Phase 2 data showing up to ~24% weight loss alongside signs of greater energy expenditure. These are averages — individual outcomes vary based on dose, adherence, diet, activity, and metabolic baseline.",
  },
  {
    icon: Activity,
    title: "3. Metabolic and Blood Sugar Benefits",
    body: "All three medications improve glycemic control, making them clinically relevant for patients with type 2 diabetes or insulin resistance — even independent of weight loss. Tirzepatide, in particular, has shown class-leading HbA1c reductions in head-to-head comparisons. The GLP-1 pathway reduces postprandial glucose spikes. GIP activation improves insulin secretion kinetics. Glucagon receptor engagement (retatrutide) adds hepatic glucose regulation. For patients managing metabolic disease alongside weight, the dual and triple mechanisms offer advantages beyond what a single-receptor agent can achieve.",
  },
  {
    icon: AlertCircle,
    title: "4. Side Effects to Know",
    body: "The shared side effect profile across all three is predominantly gastrointestinal: nausea, diarrhea, constipation, and occasional vomiting — most common during dose escalation and typically self-resolving within weeks. Rare but serious risks include pancreatitis, gallbladder disease, and potential thyroid C-cell concerns (observed in animal models; human incidence has not been established in trials). Retatrutide's long-term safety data is still accumulating — it has not yet completed Phase 3 trials. All three require dose escalation protocols managed by a licensed provider.",
  },
  {
    icon: Stethoscope,
    title: "5. Which Is Right for You",
    body: "The right medication depends on your treatment history, metabolic goals, insurance coverage, and how your body responds. Semaglutide is the most established option with the longest real-world safety record. Tirzepatide offers meaningfully greater average weight loss and is FDA-approved. Retatrutide is for patients who qualify for clinical trial access or are evaluating emerging options. This is not a decision to make based on a comparison chart — it requires a physician who understands your full metabolic picture. That is the starting point.",
  },
] as const;

export function Glp1ComparisonContent() {
  return (
    <div className="space-y-8">
      <div className="border-l-2 border-brand-gold pl-6">
        <p className="text-body-sm text-brand-silver leading-relaxed">
          GLP-1–based medications have fundamentally changed what&apos;s achievable
          in medical weight management. But semaglutide, tirzepatide, and
          retatrutide are not interchangeable — they work through different
          mechanisms and produce different outcomes. Here&apos;s the clinical
          breakdown.
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
          Semaglutide, tirzepatide, and retatrutide represent three generations
          of the same core insight: that weight is regulated by hormones, not
          willpower. Each generation has improved on the last by targeting more
          pathways. The clinical outcomes reflect that progression directly.
        </p>
        <p className="mt-3 text-body-sm text-brand-silver leading-relaxed">
          The best option isn&apos;t the newest one — it&apos;s the one that
          fits your physiology, your goals, and your clinical profile. That
          determination requires a physician.
        </p>
      </div>

      <div className="flex justify-center gap-6 pt-4">
        <Link
          href="/products?category=weight-management"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          View GLP-1 options
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
