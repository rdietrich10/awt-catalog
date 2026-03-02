import Link from "next/link";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl md:text-2xl uppercase tracking-tight text-brand-white mt-12 mb-4">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-body uppercase tracking-wider text-brand-white mt-8 mb-3">
      {children}
    </h3>
  );
}

function ComparisonRow({
  aspect,
  routine,
  precision,
}: {
  aspect: string;
  routine: string;
  precision: string;
}) {
  return (
    <tr className="border-b border-brand-border">
      <td className="py-3 pr-4 text-body-sm text-brand-white font-display tracking-wider uppercase align-top whitespace-nowrap">
        {aspect}
      </td>
      <td className="py-3 pr-4 text-body-sm text-brand-silver-dark align-top">{routine}</td>
      <td className="py-3 text-body-sm text-brand-silver align-top">{precision}</td>
    </tr>
  );
}

export function PrecisionBloodTestingContent() {
  return (
    <div className="text-body-sm text-brand-silver leading-relaxed max-w-none">
      <p className="text-body text-brand-silver-light mb-6">
        For most of modern medicine, blood testing has served a single purpose: confirming or ruling
        out disease. You feel sick, your doctor orders labs, the results either explain your symptoms
        or they do not. This reactive model has saved countless lives &mdash; but it has a
        fundamental limitation. By the time a standard lab test catches a problem, the problem has
        often been developing for years.
      </p>
      <p className="mb-6">
        Precision blood testing represents a paradigm shift. Instead of waiting for disease to
        declare itself, comprehensive biomarker analysis identifies the physiological patterns that
        precede disease &mdash; creating a window for intervention that reactive medicine cannot
        offer.
      </p>

      <SectionHeading>The Reactive Model: Where Standard Labs Fall Short</SectionHeading>

      <p className="mb-4">
        Standard laboratory medicine is built around diagnostic thresholds. Your fasting glucose is
        either diabetic (&ge;126 mg/dL) or it is not. Your TSH is either &ldquo;abnormal&rdquo; or
        &ldquo;within range.&rdquo; These binary distinctions are clinically necessary &mdash; but
        they create a blind spot: the vast gray zone between optimal health and diagnosable disease.
      </p>

      <p className="mb-4">
        Consider this timeline of Type 2 diabetes progression:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="text-left py-3 pr-4 font-display text-caption tracking-wider uppercase text-brand-white">
                Stage
              </th>
              <th className="text-left py-3 pr-4 font-display text-caption tracking-wider uppercase text-brand-white">
                What Standard Labs Show
              </th>
              <th className="text-left py-3 font-display text-caption tracking-wider uppercase text-brand-white">
                What Comprehensive Testing Reveals
              </th>
            </tr>
          </thead>
          <tbody>
            <ComparisonRow
              aspect="Year 0–3"
              routine="All values 'normal'"
              precision="Rising fasting insulin, HOMA-IR trending upward, early triglyceride elevation"
            />
            <ComparisonRow
              aspect="Year 3–7"
              routine="Glucose 'high-normal' (99 mg/dL)"
              precision="Insulin resistance confirmed, HbA1c trending from 5.2 → 5.5, ApoB elevated, inflammatory markers rising"
            />
            <ComparisonRow
              aspect="Year 7–10"
              routine="Pre-diabetes diagnosed (HbA1c 5.7–6.4)"
              precision="Pattern established years earlier; intervention window may have already narrowed"
            />
            <ComparisonRow
              aspect="Year 10+"
              routine="Type 2 Diabetes diagnosed"
              precision="Disease now requires pharmacological management that earlier intervention may have prevented"
            />
          </tbody>
        </table>
      </div>

      <p className="mb-4">
        The patient in this example was &ldquo;healthy&rdquo; by standard criteria for the first
        seven years. Comprehensive biomarker testing would have flagged metabolic dysfunction at
        year one.
      </p>

      <SectionHeading>The Precision Approach: Data + Context = Strategy</SectionHeading>

      <p className="mb-4">
        Precision blood testing is not just about running more tests. It is about building a
        clinical framework where data is interpreted in context and used to drive proactive
        decision-making.
      </p>

      <SubHeading>1. Comprehensive Data Collection</SubHeading>
      <p className="mb-4">
        A 100+ biomarker panel evaluates metabolic, cardiovascular, hormonal, thyroid, immune,
        inflammatory, hepatic, renal, and nutritional markers in a single blood draw. This creates
        a multi-system snapshot of physiological function &mdash; not a narrow view through one
        diagnostic lens.
      </p>

      <SubHeading>2. Clinical Context Integration</SubHeading>
      <p className="mb-4">
        Raw numbers without context are meaningless. A testosterone level of 400 ng/dL in a
        25-year-old athlete tells a very different story than the same value in a 55-year-old with
        fatigue and muscle loss. Precision testing integrates biomarker data with medical history,
        family history, lifestyle factors, and clinical goals to build a complete picture.
      </p>

      <SubHeading>3. Longitudinal Trend Analysis</SubHeading>
      <p className="mb-4">
        A single lab result is a snapshot. Annual comprehensive testing creates a longitudinal
        dataset &mdash; your personal physiological trendline. This is where the real clinical
        power emerges. Trends in inflammatory markers, hormonal levels, metabolic indicators, and
        organ function over time reveal trajectories that single-point values cannot.
      </p>

      <SubHeading>4. Personalized Intervention Strategy</SubHeading>
      <p className="mb-4">
        With comprehensive data, clinical context, and trend analysis, providers can design
        interventions tailored to your specific physiology &mdash; not population averages. This
        might mean targeted supplementation for a specific deficiency, hormonal optimization based
        on your individual decline pattern, or lifestyle modifications guided by your metabolic
        data.
      </p>

      <SectionHeading>What Precision Testing Looks Like in Practice</SectionHeading>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="text-left py-3 pr-4 font-display text-caption tracking-wider uppercase text-brand-white">
                Dimension
              </th>
              <th className="text-left py-3 pr-4 font-display text-caption tracking-wider uppercase text-brand-white">
                Routine Labs
              </th>
              <th className="text-left py-3 font-display text-caption tracking-wider uppercase text-brand-white">
                Precision Biomarker Testing
              </th>
            </tr>
          </thead>
          <tbody>
            <ComparisonRow
              aspect="Scope"
              routine="15–20 markers"
              precision="100+ markers across 8 physiological systems"
            />
            <ComparisonRow
              aspect="Purpose"
              routine="Disease detection"
              precision="Risk identification + disease prevention"
            />
            <ComparisonRow
              aspect="Interpretation"
              routine="In-range vs. out-of-range"
              precision="Optimal ranges, trend analysis, clinical context"
            />
            <ComparisonRow
              aspect="Frequency"
              routine="When symptomatic or annual minimum"
              precision="Annual baseline with targeted follow-up"
            />
            <ComparisonRow
              aspect="Outcome"
              routine="Diagnosis or reassurance"
              precision="Personalized health strategy and early intervention"
            />
          </tbody>
        </table>
      </div>

      <SectionHeading>The Insurance Question</SectionHeading>

      <p className="mb-4">
        Comprehensive biomarker testing has historically been positioned as &ldquo;premium&rdquo;
        or &ldquo;out-of-pocket.&rdquo; This perception is changing.
      </p>

      <p className="mb-4">
        In many cases, medically appropriate laboratory testing is eligible for coverage through a
        patient&apos;s existing health insurance benefits. When tests are ordered by a licensed
        provider based on clinical indications &mdash; risk factors, family history, symptoms,
        monitoring of existing conditions &mdash; insurance coverage applies according to plan terms
        and medical necessity criteria.
      </p>

      <p className="mb-4">
        The economics are compelling from a payer perspective as well: preventing a single
        cardiovascular event or catching diabetes five years earlier saves orders of magnitude more
        than the cost of annual comprehensive labs. The healthcare system is slowly catching up to
        this math.
      </p>

      <SectionHeading>The Americare Wellness Model</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Whole-Person Assessment
          </h4>
          <p className="text-body-sm text-brand-silver">
            We do not treat biomarkers in isolation. Every result is interpreted within the context
            of your complete health picture &mdash; history, genetics, lifestyle, goals.
          </p>
        </div>
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Provider-Guided Interpretation
          </h4>
          <p className="text-body-sm text-brand-silver">
            Your results are reviewed by an Americare Wellness provider who builds a personalized
            care strategy &mdash; not a generic report with reference ranges.
          </p>
        </div>
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Annual Continuity
          </h4>
          <p className="text-body-sm text-brand-silver">
            Each annual screening builds on the last, creating a longitudinal health record that
            becomes more powerful and predictive over time.
          </p>
        </div>
      </div>

      <blockquote className="border-l-2 border-brand-gold pl-4 my-6 text-brand-silver italic">
        <p className="mb-3">
          &ldquo;Precision health is not about running every test available. It is about running
          the right tests, interpreting them in context, and using the data to make decisions that
          change outcomes.&rdquo;
        </p>
      </blockquote>

      <p className="mb-4">
        The biomarker revolution is not a future possibility &mdash; it is happening now. The
        question is not whether comprehensive blood testing will become the standard of care, but
        how soon.
      </p>

      <div className="border border-brand-border bg-brand-grey-900/30 p-6 mt-10">
        <p className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
          Disclaimer
        </p>
        <p className="text-caption text-brand-silver-dark leading-relaxed">
          This article is for informational purposes only and does not constitute medical advice.
          Laboratory testing should be ordered and interpreted by a licensed healthcare provider.
          Insurance coverage for laboratory testing varies by plan and is subject to medical
          necessity determinations. This content does not guarantee insurance coverage for any
          specific test or panel.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-brand-border">
        <p className="text-body-sm text-brand-silver mb-4">
          Ready to move beyond routine labs? Explore precision biomarker screening.
        </p>
        <Link
          href="/products/annual-comprehensive-wellness-screen"
          className="inline-flex items-center gap-2 font-display tracking-wider uppercase text-brand-gold hover:text-brand-gold-light transition-colors text-body-sm"
        >
          View the Annual Comprehensive Wellness Screen &rarr;
        </Link>
      </div>
    </div>
  );
}
