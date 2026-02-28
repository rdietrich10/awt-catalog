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

function MarkerCategory({
  title,
  markers,
  insight,
}: {
  title: string;
  markers: string[];
  insight: string;
}) {
  return (
    <div className="border border-brand-border p-5 mb-4">
      <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-3">
        {title}
      </h4>
      <ul className="list-disc pl-5 space-y-1 mb-3 text-brand-silver text-body-sm">
        {markers.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <p className="text-caption text-brand-silver-dark italic">{insight}</p>
    </div>
  );
}

export function UnderstandingBiomarkersContent() {
  return (
    <div className="text-body-sm text-brand-silver leading-relaxed max-w-none">
      <p className="text-body text-brand-silver-light mb-6">
        When you receive lab results, you see a list of numbers next to reference ranges. Most of us
        glance at the bolded out-of-range values, feel relieved (or worried), and move on. But those
        numbers are not arbitrary &mdash; each one is a window into a specific physiological process.
        Understanding what your biomarkers measure, why they matter, and how they connect to each
        other transforms a confusing lab printout into a meaningful health narrative.
      </p>

      <SectionHeading>What Is a Biomarker?</SectionHeading>

      <p className="mb-4">
        A biomarker is any measurable indicator of a biological state. In the context of blood
        testing, biomarkers are molecules, proteins, hormones, enzymes, cells, or metabolites
        circulating in your bloodstream that reflect how your body&apos;s systems are functioning.
      </p>

      <p className="mb-4">
        Some biomarkers are direct measurements &mdash; like serum iron, which tells you exactly how
        much iron is in your blood. Others are indirect indicators &mdash; like HbA1c, which
        reflects your average blood glucose over the past 90 days by measuring how much hemoglobin
        has been glycated (coated with sugar). Both types are clinically valuable; the key is
        knowing what each one is actually telling you.
      </p>

      <SectionHeading>The Major Biomarker Categories</SectionHeading>

      <p className="mb-6">
        A comprehensive 100+ biomarker panel spans multiple physiological systems. Here is a
        category-by-category breakdown of what gets measured and why it matters.
      </p>

      <MarkerCategory
        title="Metabolic & Glucose Regulation"
        markers={[
          "Fasting Glucose — current blood sugar level after overnight fast",
          "HbA1c — average glucose over 90 days; the gold standard for diabetes monitoring",
          "Fasting Insulin — how hard your pancreas works to maintain glucose; early insulin resistance marker",
          "HOMA-IR — calculated insulin resistance score combining glucose and insulin",
          "Adiponectin — hormone from fat cells; low levels correlate with metabolic syndrome",
          "Uric Acid — linked to gout, kidney stones, and emerging cardiovascular risk",
        ]}
        insight="Metabolic dysfunction develops silently. Fasting insulin and HOMA-IR can be abnormal 5–10 years before glucose or HbA1c cross diabetic thresholds."
      />

      <MarkerCategory
        title="Cardiovascular & Lipid"
        markers={[
          "Total Cholesterol — overall cholesterol (limited predictive value alone)",
          "LDL-C — 'bad' cholesterol; standard but incomplete risk marker",
          "HDL-C — 'good' cholesterol; higher is generally protective",
          "Triglycerides — blood fats driven by carbohydrate intake and metabolic health",
          "ApoB — one particle per atherogenic lipoprotein; the best single predictor of cardiovascular events",
          "Lp(a) — genetically determined; an independent, undertested cardiovascular risk factor",
          "hsCRP — high-sensitivity C-reactive protein; measures vascular inflammation",
          "Homocysteine — amino acid linked to endothelial damage and cardiovascular risk",
        ]}
        insight="Up to 50% of heart attacks occur in patients with 'normal' LDL cholesterol. ApoB and Lp(a) capture the risk that standard lipid panels miss."
      />

      <MarkerCategory
        title="Hormonal & Endocrine"
        markers={[
          "Total Testosterone — primary androgen; regulates energy, muscle, mood, libido",
          "Free Testosterone — the biologically active fraction (2–3% of total)",
          "Estradiol (Sensitive) — primary estrogen; critical in both men and women",
          "DHEA-S — adrenal hormone and precursor; declines with age, marker of biological aging",
          "Cortisol (AM) — stress hormone; morning levels indicate HPA axis function",
          "SHBG — sex hormone binding globulin; determines how much hormone is bioavailable",
          "Progesterone, LH, FSH — reproductive hormones for fertility and cycle assessment",
        ]}
        insight="Hormonal decline is gradual. Without baseline measurements, both patient and provider lack the data to distinguish normal aging from treatable hormonal deficiency."
      />

      <MarkerCategory
        title="Thyroid Function"
        markers={[
          "TSH — thyroid-stimulating hormone; the standard screening test (but insufficient alone)",
          "Free T3 — the active thyroid hormone at the cellular level",
          "Free T4 — the storage form of thyroid hormone, converted to T3 peripherally",
          "Reverse T3 — inactive T3 that competes with Free T3; elevated in stress and illness",
          "TPO Antibodies — autoimmune marker for Hashimoto's thyroiditis",
          "Thyroglobulin Antibodies — additional autoimmune thyroid marker",
        ]}
        insight="A 'normal' TSH with low Free T3 and elevated Reverse T3 explains persistent fatigue, brain fog, and weight gain that standard screening misses."
      />

      <MarkerCategory
        title="Inflammation & Immune"
        markers={[
          "hsCRP — systemic inflammation marker; elevated in cardiovascular disease, infection, autoimmunity",
          "ESR (Sed Rate) — nonspecific inflammation marker; useful in context with hsCRP",
          "Ferritin — iron storage protein and acute phase reactant; elevated in inflammation",
          "CBC with Differential — red cells, white cells, platelets; immune cell populations",
          "IgA, IgG, IgM — immunoglobulin levels reflecting immune competence",
          "ANA Screen — antinuclear antibody; initial screen for autoimmune conditions",
        ]}
        insight="Chronic low-grade inflammation is the 'silent fire' behind cardiovascular disease, neurodegeneration, and accelerated aging. These markers quantify it."
      />

      <MarkerCategory
        title="Micronutrient & Vitamin Status"
        markers={[
          "Vitamin D (25-OH) — deficient in 40%+ of adults; critical for immune, bone, and mood",
          "Vitamin B12 — neurological function and red blood cell production",
          "Methylmalonic Acid — functional B12 marker (serum B12 alone can be misleading)",
          "Folate — essential for DNA synthesis and methylation",
          "Iron Studies (serum iron, TIBC, ferritin, transferrin saturation) — complete iron picture",
          "RBC Magnesium — true intracellular magnesium (serum Mg is often falsely normal)",
          "Zinc and Copper — essential for immune function, wound healing, enzyme activity",
        ]}
        insight="Serum magnesium can read 'normal' while intracellular stores are critically depleted. RBC magnesium captures what serum testing misses."
      />

      <MarkerCategory
        title="Liver & Kidney Function"
        markers={[
          "ALT, AST — hepatic enzymes; elevated in liver stress, fatty liver, medication toxicity",
          "GGT — the most sensitive early marker of hepatobiliary stress",
          "ALP — alkaline phosphatase; elevated in bone or liver pathology",
          "Bilirubin (total, direct) — bile metabolism; elevated in liver dysfunction",
          "BUN, Creatinine — kidney filtration markers",
          "eGFR — estimated glomerular filtration rate; gold standard for kidney function staging",
          "Cystatin C — more accurate GFR than creatinine in patients with variable muscle mass",
        ]}
        insight="The liver and kidneys have enormous functional reserve. Significant damage can accumulate before standard symptoms appear — routine monitoring catches dysfunction while it's still reversible."
      />

      <SectionHeading>Reading Your Results: Beyond &ldquo;Normal&rdquo;</SectionHeading>

      <p className="mb-4">
        Standard lab reference ranges are statistical: they represent the middle 95% of a tested
        population. But &ldquo;normal&rdquo; is not the same as &ldquo;optimal.&rdquo; A Vitamin D
        level of 31 ng/mL is technically within range, but most functional and integrative
        practitioners target 50&ndash;80 ng/mL for optimal health outcomes.
      </p>

      <p className="mb-4">
        This distinction matters. Your Americare Wellness provider interprets your results not
        just against population reference ranges, but within the context of:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6 text-brand-silver">
        <li>Your <strong className="text-brand-white">personal baseline</strong> and year-over-year trends</li>
        <li>Your <strong className="text-brand-white">family history</strong> and genetic risk factors</li>
        <li>Your <strong className="text-brand-white">lifestyle</strong> — diet, exercise, sleep, stress</li>
        <li>Your <strong className="text-brand-white">clinical goals</strong> — performance, longevity, disease prevention</li>
        <li><strong className="text-brand-white">Optimal functional ranges</strong> supported by current clinical evidence</li>
      </ul>

      <SectionHeading>The Interconnected Picture</SectionHeading>

      <p className="mb-4">
        No biomarker exists in isolation. Insulin resistance drives triglycerides up and HDL down.
        Chronic cortisol elevation suppresses thyroid conversion. Low Vitamin D impairs immune
        function and increases inflammatory markers. Iron deficiency causes fatigue that mimics
        hormonal decline.
      </p>

      <p className="mb-4">
        Comprehensive testing reveals these connections. It transforms a list of numbers into a
        systems-level understanding of your health &mdash; and that understanding is what enables
        truly personalized clinical strategy.
      </p>

      <div className="border border-brand-border bg-brand-grey-900/30 p-6 mt-10">
        <p className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
          Disclaimer
        </p>
        <p className="text-caption text-brand-silver-dark leading-relaxed">
          This article is for educational purposes only and does not constitute medical advice.
          Biomarker interpretation should always be performed by a licensed healthcare provider in
          the context of your complete clinical picture. Reference ranges and optimal targets may
          vary based on individual factors. All healthcare decisions should involve your provider.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-brand-border">
        <p className="text-body-sm text-brand-silver mb-4">
          Want to see what your biomarkers reveal? Explore our comprehensive screening panels.
        </p>
        <Link
          href="/categories/blood-testing-analysis"
          className="inline-flex items-center gap-2 font-display tracking-wider uppercase text-brand-gold hover:text-brand-gold-light transition-colors text-body-sm"
        >
          View Screening Panels &rarr;
        </Link>
      </div>
    </div>
  );
}
