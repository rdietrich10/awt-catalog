import type { Product } from "@/types";
import { getProductImagePath } from "@/lib/productImage";

const base = (
  o: Partial<Product> &
    Pick<
      Product,
      | "slug"
      | "name"
      | "genericName"
      | "category"
      | "categorySlug"
      | "shortDescription"
      | "fullDescription"
      | "medicationClass"
      | "indications"
      | "variants"
      | "administrationRoute"
      | "keyBenefits"
      | "clinicalNotes"
    >,
): Product => ({
  image: getProductImagePath(o.slug),
  isBlend: false,
  featured: false,
  providerNote:
    "Results are interpreted by your Americare Wellness provider in the context of your full medical history, family history, and clinical goals.",
  ...o,
});

export const bloodTestingProducts: Product[] = [
  base({
    slug: "comprehensive-100-biomarker-panel",
    name: "Comprehensive 100+ Biomarker Panel",
    genericName: "Annual Health Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Full-spectrum annual screening analyzing over 100 clinically relevant blood biomarkers for a complete picture of whole-person health.",
    fullDescription:
      "The Americare Wellness Comprehensive 100+ Biomarker Panel is our flagship annual screening designed to move beyond isolated lab values toward a holistic understanding of your health. This advanced assessment evaluates metabolic function, cardiovascular risk, hormonal balance, thyroid performance, liver and kidney health, immune status, inflammation levels, and nutrient sufficiency — all from a single blood draw. When combined with your medical history, family history, lifestyle factors, and prior clinical data, this panel empowers our providers to identify early risk patterns, monitor physiological trends, and build personalized care strategies for long-term disease prevention. In many cases, medically appropriate laboratory testing may be eligible for coverage through your existing health insurance benefits, subject to plan terms and medical necessity determinations.",
    medicationClass: "Diagnostic Service",
    indications: "Annual health assessment, early risk detection, longitudinal health monitoring",
    administrationRoute: "Blood Draw (Venipuncture)",
    featured: true,
    keyBenefits: [
      "Evaluates 100+ clinically meaningful biomarkers in a single draw",
      "Identifies early risk patterns before symptoms develop",
      "Supports personalized, precision-guided clinical decision-making",
      "Tracks physiological trends year over year for proactive care",
      "May be eligible for insurance coverage based on medical necessity",
    ],
    clinicalNotes:
      "This comprehensive panel spans metabolic, cardiovascular, hormonal, thyroid, hepatic, renal, immune, inflammatory, and nutritional biomarker categories. Results are interpreted within the context of each patient's full clinical picture — not as isolated data points. Annual screening enables longitudinal trend analysis, which is significantly more valuable than single-timepoint lab values.",
    variants: [
      {
        strength: "100+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual",
        price: 599,
      },
    ],
  }),
  base({
    slug: "metabolic-diabetes-panel",
    name: "Metabolic & Diabetes Risk Panel",
    genericName: "Metabolic Health Screening",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Comprehensive metabolic screening evaluating glucose regulation, insulin sensitivity, lipid metabolism, and metabolic syndrome risk factors.",
    fullDescription:
      "The Metabolic & Diabetes Risk Panel provides an in-depth evaluation of your body's metabolic machinery. By measuring fasting glucose, HbA1c, fasting insulin, HOMA-IR, a complete lipid panel with particle sizes, uric acid, and key metabolic syndrome markers, this screening reveals how efficiently your body processes energy and where early dysfunction may be developing. Metabolic imbalances often precede clinical diabetes by years — catching them early creates a window for lifestyle and clinical intervention that can fundamentally alter disease trajectory.",
    medicationClass: "Diagnostic Service",
    indications: "Metabolic syndrome screening, diabetes risk assessment, insulin resistance evaluation",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Detects insulin resistance and pre-diabetic patterns years before clinical onset",
      "Evaluates advanced lipid particle sizes beyond standard cholesterol panels",
      "Measures HbA1c for 90-day glucose trend analysis",
      "Identifies metabolic syndrome risk factors for early intervention",
    ],
    clinicalNotes:
      "Includes fasting glucose, HbA1c, fasting insulin, HOMA-IR calculation, comprehensive lipid panel (LDL-P, sdLDL, VLDL), triglycerides, uric acid, and adiponectin. Optimal when combined with body composition data and family history of metabolic disease.",
    variants: [
      {
        strength: "15+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or Semi-Annual",
      },
    ],
  }),
  base({
    slug: "cardiovascular-health-panel",
    name: "Cardiovascular Health Panel",
    genericName: "Heart & Vascular Risk Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Advanced cardiovascular risk profiling including ApoB, Lp(a), hsCRP, and homocysteine — the markers standard panels miss.",
    fullDescription:
      "Standard cholesterol panels miss up to 50% of cardiovascular risk. The Cardiovascular Health Panel goes deeper with advanced lipid subfractions, apolipoprotein B (the single best predictor of atherosclerotic risk), lipoprotein(a) for genetic cardiovascular risk, high-sensitivity CRP for vascular inflammation, and homocysteine for endothelial function. These markers, when interpreted alongside your clinical history and lifestyle, provide a far more accurate picture of true cardiovascular risk than LDL cholesterol alone.",
    medicationClass: "Diagnostic Service",
    indications: "Cardiovascular risk stratification, advanced lipid analysis, vascular inflammation assessment",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Measures ApoB — the strongest single predictor of atherosclerotic cardiovascular events",
      "Evaluates Lp(a) for inherited cardiovascular risk that standard panels ignore",
      "Assesses vascular inflammation via high-sensitivity CRP",
      "Identifies elevated homocysteine linked to endothelial dysfunction",
    ],
    clinicalNotes:
      "Includes total cholesterol, LDL-C, HDL-C, triglycerides, ApoB, ApoA-1, Lp(a), LDL particle number, sdLDL, hsCRP, homocysteine, and fibrinogen. Lp(a) is genetically determined and should be measured at least once in a lifetime; it is the most under-tested major risk factor in cardiology.",
    variants: [
      {
        strength: "18+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual",
      },
    ],
  }),
  base({
    slug: "hormonal-health-panel",
    name: "Hormonal Health Panel",
    genericName: "Endocrine & Hormone Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Comprehensive hormonal profiling of testosterone, estradiol, DHEA-S, cortisol, SHBG, and reproductive hormones for both men and women.",
    fullDescription:
      "Hormones regulate nearly every physiological process — from energy and mood to body composition and cognitive function. The Hormonal Health Panel evaluates the full endocrine landscape including total and free testosterone, estradiol, DHEA-S, cortisol (AM), SHBG, progesterone, LH, and FSH. For both men and women, hormonal imbalances often develop gradually, producing nonspecific symptoms like fatigue, weight gain, mood changes, and reduced libido that are frequently attributed to aging rather than recognized as treatable clinical patterns.",
    medicationClass: "Diagnostic Service",
    indications: "Hormonal imbalance evaluation, testosterone optimization, reproductive health assessment",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Measures total and free testosterone with SHBG for accurate bioavailable hormone assessment",
      "Evaluates cortisol for adrenal function and chronic stress impact",
      "Assesses DHEA-S as a marker of adrenal reserve and biological aging",
      "Profiles reproductive hormones (LH, FSH, progesterone, estradiol) for fertility and balance",
    ],
    clinicalNotes:
      "Includes total testosterone, free testosterone (calculated), estradiol (sensitive), DHEA-S, cortisol (AM), SHBG, progesterone, LH, FSH, and prolactin. Morning blood draw recommended for accurate cortisol and testosterone values. Results should be interpreted in context of age, sex, symptoms, and clinical goals.",
    variants: [
      {
        strength: "12+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or as clinically indicated",
      },
    ],
  }),
  base({
    slug: "thyroid-complete-panel",
    name: "Thyroid Complete Panel",
    genericName: "Full Thyroid Function Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Complete thyroid evaluation beyond TSH — including Free T3, Free T4, Reverse T3, and thyroid antibodies for subclinical dysfunction detection.",
    fullDescription:
      "Standard thyroid screening (TSH alone) misses a significant percentage of thyroid dysfunction. The Thyroid Complete Panel evaluates the full thyroid axis: TSH, Free T3, Free T4, Reverse T3, and thyroid antibodies (TPO and thyroglobulin). This comprehensive approach detects subclinical hypothyroidism, Hashimoto's thyroiditis, conversion issues (T4 to T3), and reverse T3 dominance — conditions that cause fatigue, weight gain, cognitive fog, hair loss, and temperature dysregulation but are invisible on a standard TSH-only test.",
    medicationClass: "Diagnostic Service",
    indications: "Thyroid dysfunction screening, Hashimoto's detection, subclinical hypothyroidism evaluation",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Detects subclinical thyroid dysfunction missed by TSH-only screening",
      "Identifies Hashimoto's thyroiditis via TPO and thyroglobulin antibodies",
      "Evaluates T4-to-T3 conversion efficiency with Reverse T3 ratio",
      "Guides precise thyroid optimization beyond the standard reference range",
    ],
    clinicalNotes:
      "Includes TSH, Free T3, Free T4, Reverse T3, TPO antibodies, thyroglobulin antibodies, and total T3. Reverse T3 is particularly valuable in patients with normal TSH but persistent hypothyroid symptoms, indicating impaired peripheral conversion.",
    variants: [
      {
        strength: "7 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or Semi-Annual",
      },
    ],
  }),
  base({
    slug: "inflammation-immune-panel",
    name: "Inflammation & Immune Function Panel",
    genericName: "Immune & Inflammatory Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Evaluates systemic inflammation, immune function, and autoimmune markers — the silent drivers behind chronic disease.",
    fullDescription:
      "Chronic low-grade inflammation is now recognized as a root driver of cardiovascular disease, neurodegeneration, metabolic dysfunction, and accelerated aging. The Inflammation & Immune Function Panel measures high-sensitivity CRP, ESR, ferritin, complete blood count with differential, immunoglobulin levels, and key cytokine markers. This panel reveals the inflammatory burden your body carries — even when you feel fine — and helps identify immune dysregulation patterns that may warrant clinical attention before they manifest as disease.",
    medicationClass: "Diagnostic Service",
    indications: "Chronic inflammation assessment, immune function evaluation, autoimmune screening",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Quantifies systemic inflammation via hsCRP and ESR",
      "Evaluates immune cell populations through complete blood count with differential",
      "Assesses immunoglobulin levels for immune competence",
      "Identifies hidden inflammatory patterns driving chronic disease risk",
    ],
    clinicalNotes:
      "Includes hsCRP, ESR, ferritin, CBC with differential, IgA, IgG, IgM, ANA screen, and complement C3/C4. Ferritin serves as both an iron storage marker and an acute-phase reactant; interpretation requires clinical context. Elevated inflammatory markers in the absence of acute illness suggest chronic systemic inflammation warranting further investigation.",
    variants: [
      {
        strength: "15+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual",
      },
    ],
  }),
  base({
    slug: "nutrient-vitamin-panel",
    name: "Nutrient & Vitamin Deficiency Panel",
    genericName: "Micronutrient Status Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Comprehensive micronutrient profiling — Vitamin D, B12, folate, iron studies, magnesium, zinc, and more — to uncover deficiencies driving fatigue and dysfunction.",
    fullDescription:
      "Micronutrient deficiencies are among the most common and most underdiagnosed contributors to fatigue, cognitive decline, immune vulnerability, and poor recovery. The Nutrient & Vitamin Deficiency Panel evaluates Vitamin D (25-OH), Vitamin B12, methylmalonic acid (functional B12 status), folate, complete iron studies (serum iron, TIBC, ferritin, transferrin saturation), RBC magnesium, zinc, and copper. These nutrients are foundational to cellular energy production, neurotransmitter synthesis, immune defense, and tissue repair — yet standard physicals rarely test them comprehensively.",
    medicationClass: "Diagnostic Service",
    indications: "Micronutrient deficiency screening, fatigue evaluation, immune and cognitive support assessment",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Measures Vitamin D — deficient in over 40% of American adults",
      "Evaluates functional B12 status via methylmalonic acid (not just serum B12)",
      "Profiles complete iron studies beyond simple ferritin",
      "Assesses RBC magnesium for true intracellular magnesium status",
    ],
    clinicalNotes:
      "Includes 25-OH Vitamin D, Vitamin B12, methylmalonic acid, folate, serum iron, TIBC, ferritin, transferrin saturation, RBC magnesium, zinc, copper, and Vitamin A. RBC magnesium is preferred over serum magnesium as it reflects true intracellular stores; serum magnesium can be normal even in significant deficiency.",
    variants: [
      {
        strength: "14+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or as clinically indicated",
      },
    ],
  }),
  base({
    slug: "liver-kidney-function-panel",
    name: "Liver & Kidney Function Panel",
    genericName: "Hepatic & Renal Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Comprehensive liver and kidney function evaluation including hepatic enzymes, bilirubin, renal filtration markers, and electrolyte balance.",
    fullDescription:
      "Your liver and kidneys are the body's primary filtration and detoxification systems. The Liver & Kidney Function Panel evaluates hepatic enzyme activity (ALT, AST, ALP, GGT), bilirubin metabolism, albumin synthesis, and renal function markers (BUN, creatinine, eGFR, cystatin C) along with key electrolytes. Early hepatic and renal compromise is often completely asymptomatic — these organs have enormous functional reserve, meaning significant damage can accumulate before standard symptoms appear. Routine monitoring catches dysfunction at a reversible stage.",
    medicationClass: "Diagnostic Service",
    indications: "Liver function monitoring, kidney health assessment, medication safety screening",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Detects early hepatic stress via GGT and ALT ratio analysis",
      "Evaluates renal filtration with eGFR and cystatin C for precision",
      "Monitors albumin as a marker of liver synthetic function and nutritional status",
      "Essential for medication safety monitoring in patients on therapeutic protocols",
    ],
    clinicalNotes:
      "Includes ALT, AST, ALP, GGT, total and direct bilirubin, albumin, total protein, BUN, creatinine, eGFR, cystatin C, sodium, potassium, chloride, and CO2. Cystatin C provides a more accurate GFR estimate than creatinine alone, particularly in patients with high or low muscle mass. GGT is the most sensitive marker for early hepatobiliary stress.",
    variants: [
      {
        strength: "16+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or Semi-Annual",
      },
    ],
  }),
];
