import Link from "next/link";
import {
  Brain,
  Layers,
  Flame,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    icon: Brain,
    title: "1. Rethinking What Obesity Is",
    body: "Obesity is not a failure of discipline — it is a chronic metabolic condition driven by dysregulated hormones, appetite signaling, and energy balance. The hypothalamus, gut, pancreas, and adipose tissue are all part of a complex feedback system that determines body weight setpoint. When that system is dysregulated, willpower alone cannot override the physiology. This is why behavioral interventions alone produce modest, rarely durable results. Effective treatment requires working with the biology — not against it. The new generation of incretin-based medications does exactly that.",
  },
  {
    icon: Layers,
    title: "2. The Evolution: Single to Triple Action",
    body: "Early GLP-1 medications targeted a single pathway. Semaglutide, approved in 2021 for weight management, demonstrated that pharmaceutical intervention could reliably produce ~15% body weight reduction — a result that hadn't been seen outside of bariatric surgery. Tirzepatide added GIP receptor activation to the GLP-1 mechanism, and the SURMOUNT trials reported 22–24% average weight loss — surpassing what was previously thought possible without surgery. Retatrutide, currently in Phase 3 trials, adds glucagon receptor agonism as a third mechanism, targeting energy expenditure alongside appetite suppression. Each generation did not just improve the number — it added a physiologically distinct pathway.",
  },
  {
    icon: Flame,
    title: "3. Beyond Appetite — Energy Expenditure",
    body: "The addition of glucagon receptor activity in retatrutide represents a meaningful shift in how these medications work. GLP-1 and GIP primarily operate through appetite and insulin. Glucagon receptor agonism introduces a different lever: increasing basal metabolic rate and promoting fat oxidation. Early retatrutide trial data suggests this translates into measurable increases in energy expenditure — not just eating less, but burning more. For patients who have historically plateaued or regained weight despite caloric restriction, this mechanism addresses a component that previous therapies did not reach.",
  },
  {
    icon: ShieldCheck,
    title: "4. Safety Considerations",
    body: "All medications in this class share similar risk considerations. Gastrointestinal side effects — nausea, diarrhea, constipation — are the most common and are managed through gradual dose escalation. Rare but documented risks include pancreatitis and gallbladder disease. Thyroid C-cell tumors were observed in rodent models; incidence in humans has not been established in clinical trials. Retatrutide's long-term safety profile is still accumulating as it completes Phase 3. These medications should be used under active physician supervision, with monitoring for drug interactions in patients taking insulin or sulfonylureas.",
  },
  {
    icon: ArrowRight,
    title: "5. What This Means for Patients",
    body: "The progression from single to triple receptor agonism means that patients who previously had limited options — or who plateaued on an earlier agent — now have biologically distinct alternatives. More importantly, this trajectory signals where the field is going: toward increasingly targeted, patient-specific metabolic therapies rather than one-size interventions. The era of prescribing the same medication to every patient regardless of metabolic phenotype is ending. Choosing among these agents now requires a provider who can evaluate your metabolic profile, treatment history, and clinical goals — not just a prescription.",
  },
] as const;

export function FutureOfWeightLossContent() {
  return (
    <div className="space-y-8">
      <div className="border-l-2 border-brand-gold pl-6">
        <p className="text-body-sm text-brand-silver leading-relaxed">
          For decades, effective medical weight loss was limited to bariatric
          surgery or modest pharmacological aids. That changed in 2021. The new
          generation of incretin-based medications — from semaglutide to
          tirzepatide to retatrutide — represents a genuine paradigm shift in
          how metabolic medicine treats obesity. Here&apos;s how we got here,
          and what it means.
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
          We are in the early stages of a fundamental shift in metabolic
          medicine. The medications available today — and those in late-stage
          trials — are not incremental improvements. They are qualitatively
          different tools, grounded in a better understanding of how the body
          regulates weight.
        </p>
        <p className="mt-3 text-body-sm text-brand-silver leading-relaxed">
          Sustainable, physician-guided weight management is more achievable
          now than at any point in medical history. The science finally caught
          up to the clinical need.
        </p>
      </div>

      <div className="flex justify-center gap-6 pt-4">
        <Link
          href="/products?category=weight-management"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          View weight management options
        </Link>
        <Link
          href="/knowledge/articles/glp-1-comparison"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          Compare the three agents
        </Link>
      </div>
    </div>
  );
}
