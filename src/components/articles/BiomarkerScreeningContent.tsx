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

function StatCard({ stat, label, detail }: { stat: string; label: string; detail: string }) {
  return (
    <div className="border border-brand-border p-5">
      <p className="font-display text-2xl md:text-3xl text-brand-gold mb-1">{stat}</p>
      <h4 className="font-display text-caption tracking-widest uppercase text-brand-white mb-2">
        {label}
      </h4>
      <p className="text-body-sm text-brand-silver">{detail}</p>
    </div>
  );
}

export function BiomarkerScreeningContent() {
  return (
    <div className="text-body-sm text-brand-silver leading-relaxed max-w-none">
      <p className="text-body text-brand-silver-light mb-6">
        The annual physical is a ritual most of us go through &mdash; a blood pressure check, a basic
        metabolic panel, maybe a lipid screen if your doctor remembers to order one. You get a handful
        of numbers, a &ldquo;looks good&rdquo; or a referral, and you go about your year. But what if
        those 8&ndash;12 data points are only scratching the surface?
      </p>
      <p className="mb-6">
        The truth is, they are. A standard annual lab panel evaluates a fraction of the biomarkers
        that modern clinical science can measure &mdash; and an even smaller fraction of the ones that
        actually predict disease years before symptoms appear. Comprehensive biomarker screening
        changes that equation.
      </p>

      <SectionHeading>The Problem with Standard Lab Panels</SectionHeading>

      <p className="mb-4">
        Traditional annual bloodwork was designed for one purpose: detecting disease that already
        exists. A fasting glucose of 130 mg/dL tells your doctor you have diabetes &mdash; but it
        says nothing about the ten years of rising insulin resistance that preceded it.
      </p>

      <p className="mb-4">
        Standard panels typically include a basic metabolic panel (8 markers), a CBC (5&ndash;7
        markers), and maybe a lipid panel (4 markers). That is roughly 20 data points from a system
        with thousands of measurable analytes. It is the equivalent of diagnosing a car engine by
        checking the oil level and tire pressure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <StatCard
          stat="~20"
          label="Standard Panel Markers"
          detail="A typical annual physical evaluates roughly 20 biomarkers — the minimum for disease detection."
        />
        <StatCard
          stat="100+"
          label="Comprehensive Panel Markers"
          detail="A full biomarker screening evaluates over 100 markers — revealing risk patterns years earlier."
        />
        <StatCard
          stat="5–10 yrs"
          label="Early Detection Window"
          detail="Many chronic diseases show biomarker changes 5–10 years before clinical symptoms develop."
        />
      </div>

      <SectionHeading>What 100+ Biomarkers Actually Tell You</SectionHeading>

      <p className="mb-4">
        A comprehensive biomarker panel does not just test more markers for the sake of volume. It
        evaluates interconnected physiological systems that standard panels ignore entirely:
      </p>

      <SubHeading>Metabolic Health</SubHeading>
      <p className="mb-4">
        Beyond glucose and HbA1c, advanced metabolic panels measure fasting insulin, HOMA-IR
        (a direct calculation of insulin resistance), adiponectin, and uric acid. These markers
        detect metabolic syndrome and pre-diabetes at a stage where lifestyle intervention can
        reverse trajectory &mdash; not just manage it.
      </p>

      <SubHeading>Cardiovascular Risk — Beyond Cholesterol</SubHeading>
      <p className="mb-4">
        LDL cholesterol alone is a poor predictor of cardiovascular events. Up to 50% of heart
        attacks occur in people with &ldquo;normal&rdquo; LDL. Advanced panels add ApoB
        (apolipoprotein B), lipoprotein(a), LDL particle number, high-sensitivity CRP, and
        homocysteine &mdash; a fundamentally more accurate risk profile.
      </p>

      <SubHeading>Hormonal Balance</SubHeading>
      <p className="mb-4">
        Hormones regulate energy, mood, body composition, sleep, and cognitive function. A full
        hormonal panel evaluates testosterone (total and free), estradiol, DHEA-S, cortisol, SHBG,
        and reproductive hormones. Hormonal decline is treatable &mdash; but only if measured.
      </p>

      <SubHeading>Thyroid Function — The Full Axis</SubHeading>
      <p className="mb-4">
        TSH alone misses a significant percentage of thyroid dysfunction. The complete thyroid
        panel adds Free T3, Free T4, Reverse T3, and thyroid antibodies (TPO and thyroglobulin)
        to detect subclinical hypothyroidism, Hashimoto&apos;s, and conversion issues.
      </p>

      <SubHeading>Inflammation and Immune Function</SubHeading>
      <p className="mb-4">
        Chronic low-grade inflammation is now recognized as a root driver of cardiovascular disease,
        neurodegeneration, and metabolic dysfunction. Markers like hsCRP, ESR, ferritin patterns,
        and immunoglobulin levels quantify your body&apos;s inflammatory burden.
      </p>

      <SubHeading>Micronutrient Status</SubHeading>
      <p className="mb-4">
        Vitamin D deficiency affects over 40% of American adults. B12 deficiency causes neurological
        symptoms that mimic aging. Magnesium deficiency drives muscle cramps, anxiety, and poor
        sleep. Standard physicals rarely test any of these comprehensively.
      </p>

      <SectionHeading>The Power of Longitudinal Data</SectionHeading>

      <p className="mb-4">
        A single blood test is a snapshot. Annual comprehensive screening creates a
        <strong className="text-brand-white"> longitudinal dataset</strong> &mdash; your own personal
        health trajectory. This is where the real clinical value emerges.
      </p>

      <p className="mb-4">
        A fasting insulin of 12 &micro;IU/mL might be &ldquo;within range.&rdquo; But if it was 6
        two years ago and 9 last year, the trend line tells a story the single value cannot: insulin
        resistance is developing. Intervention now &mdash; before glucose rises, before HbA1c
        crosses the diabetic threshold &mdash; changes outcomes dramatically.
      </p>

      <blockquote className="border-l-2 border-brand-gold pl-4 my-6 text-brand-silver italic">
        <p className="mb-3">
          &ldquo;The most powerful diagnostic tool in medicine is not any single test &mdash; it is
          the trend line across multiple tests over time.&rdquo;
        </p>
      </blockquote>

      <p className="mb-4">
        This principle applies across every biomarker category: thyroid function, liver enzymes,
        inflammatory markers, hormonal levels. Trends reveal what snapshots hide.
      </p>

      <SectionHeading>Insurance Coverage and Accessibility</SectionHeading>

      <p className="mb-4">
        One of the most common barriers to comprehensive testing is the assumption that insurance
        will not cover it. In many cases, this is incorrect.
      </p>

      <p className="mb-4">
        Medically appropriate laboratory testing may be eligible for coverage through your existing
        health insurance benefits, depending on your individual plan and medical necessity criteria.
        When a licensed provider orders tests based on clinical indications &mdash; family history,
        symptoms, risk factors, or monitoring of existing conditions &mdash; many insurers cover the
        associated laboratory costs.
      </p>

      <p className="mb-4">
        Americare Wellness works within these frameworks to ensure that comprehensive testing is
        accessible, not exclusive. Precision health should not be a luxury &mdash; it should be
        the standard of care.
      </p>

      <SectionHeading>The Americare Wellness Approach</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Data-Driven
          </h4>
          <p className="text-body-sm text-brand-silver">
            100+ biomarkers analyzed per screening, creating a comprehensive dataset
            that grows more valuable with each annual assessment.
          </p>
        </div>
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Clinically Integrated
          </h4>
          <p className="text-body-sm text-brand-silver">
            Results interpreted within the full context of your medical history,
            family history, lifestyle, and clinical goals &mdash; never as isolated numbers.
          </p>
        </div>
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Proactive, Not Reactive
          </h4>
          <p className="text-body-sm text-brand-silver">
            Designed to identify risk patterns and guide intervention before disease
            develops &mdash; transforming routine labs into precision healthcare.
          </p>
        </div>
      </div>

      <p className="mb-4">
        Your health is more than a single lab result. It is a dynamic, evolving picture influenced
        by genetics, environment, lifestyle, and physiology. Comprehensive biomarker screening is
        the lens that brings that picture into focus.
      </p>

      <div className="border border-brand-border bg-brand-grey-900/30 p-6 mt-10">
        <p className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
          Disclaimer
        </p>
        <p className="text-caption text-brand-silver-dark leading-relaxed">
          This article is for informational purposes only and does not constitute medical advice.
          Laboratory testing should be ordered by a licensed healthcare provider based on individual
          clinical need. Insurance coverage varies by plan and is subject to medical necessity
          determinations. All clinical decisions should be made in consultation with your provider.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-brand-border">
        <p className="text-body-sm text-brand-silver mb-4">
          Ready to see what comprehensive biomarker screening can reveal about your health?
        </p>
        <Link
          href="/categories/blood-testing-analysis"
          className="inline-flex items-center gap-2 font-display tracking-wider uppercase text-brand-gold hover:text-brand-gold-light transition-colors text-body-sm"
        >
          Explore Our Screening Panels &rarr;
        </Link>
      </div>
    </div>
  );
}
