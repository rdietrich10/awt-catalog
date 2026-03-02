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
    slug: "annual-comprehensive-wellness-screen",
    name: "Annual Comprehensive Wellness Screen",
    genericName: "Annual Health Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "Our most complete evaluation, this advanced screening analyzes a broad range of biomarkers across metabolism, hormones, cardiovascular health, inflammation, immune activity, nutrient status, and organ function to provide a full picture of your current health.",
    fullDescription:
      "The Annual Comprehensive Wellness Screen is the Americare Wellness flagship panel — designed for individuals who want a deep, proactive assessment of their health status. By evaluating over 50 clinically relevant biomarkers spanning metabolic function, hormonal balance, cardiovascular risk, immune and inflammatory activity, nutrient levels, organ function, and environmental exposure markers, this single blood draw provides your provider with the data needed to identify hidden risks early, monitor physiological trends, and build a personalized care strategy for long-term wellness planning.",
    medicationClass: "Diagnostic Service",
    indications: "Annual health assessment, early risk detection, longitudinal health monitoring",
    administrationRoute: "Blood Draw (Venipuncture)",
    featured: true,
    keyBenefits: [
      "Ideal for individuals who want a deep, proactive assessment of their health status",
      "Identifies hidden risks early across multiple body systems",
      "Establishes a personalized baseline for long-term wellness planning",
      "Covers metabolism, hormones, cardiovascular, immune, nutrient, and organ function in a single draw",
    ],
    clinicalNotes:
      "This comprehensive panel spans metabolic, cardiovascular, hormonal, thyroid, hepatic, renal, immune, inflammatory, nutritional, and environmental biomarker categories. Results are interpreted within the context of each patient's full clinical picture — not as isolated data points. Annual screening enables longitudinal trend analysis, which is significantly more valuable than single-timepoint lab values.",
    includedTests: [
      "ABO Group & RH Type",
      "CBC with Automated Diff",
      "Comprehensive Metabolic Panel",
      "Bilirubin, Direct",
      "GGT",
      "LDH",
      "Magnesium",
      "Phosphorus",
      "Uric Acid",
      "Lipid Panel",
      "C-Reactive Protein High Sensitivity (hs-CRP)",
      "Homocysteine, Serum",
      "Hemoglobin A1C",
      "Ferritin",
      "Iron + TIBC + UIBC + Saturation",
      "Thyroglobulin",
      "Thyroid Peroxidase (TPO) Antibodies",
      "TSH 3rd Generation",
      "Free T3",
      "Free T4",
      "Cortisol",
      "DHEA, EIA, Serum",
      "DHEA-Sulfate",
      "Estradiol",
      "Estrogens, Total",
      "Estrone (E1)",
      "FSH",
      "LH",
      "Insulin",
      "Insulin Growth Factor I",
      "Progesterone",
      "Testosterone Free & Total",
      "ANA, reflex to IFA ENAs",
      "Immunoglobulin E, Serum",
      "Aspergillus Fumigatus, IgE",
      "Aureobasidium Pullulans",
      "Blomia Tropicalis, IgE",
      "Candida Albicans, IgE",
      "Cat Dander, IgE",
      "Cladosporium Herbarum, IgE",
      "D. Farinae, IgE",
      "D. Pteronyssinus, IgE",
      "Dog Dander, IgE",
      "Mucor Racemosus, IgE",
      "Phoma Betae, IgE",
      "Celiac Serology Panel",
      "GI Bacterial Panel",
      "GI Parasite Panel",
      "GI Viral Panel",
      "Clostridium difficile",
      "Vitamin K1",
      "Vitamin A",
      "Vitamin B12",
      "Folate",
      "Vitamin D 25-OH",
      "Vitamin E",
      "Zinc, ICP-MS",
      "Blood Lead, ICP-MS",
      "Blood Mercury, ICP-MS",
      "Cadmium, Blood, ICP-MS",
      "Free and Total PSA (males)",
    ],
    variants: [
      {
        strength: "60+ Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual",
        price: 599,
      },
    ],
  }),

  base({
    slug: "metabolic-diabetes-panel",
    name: "Metabolic and Diabetes Risk Panel",
    genericName: "Metabolic Health Screening",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "This panel evaluates how your body regulates blood sugar, insulin, and metabolic function to detect early signs of insulin resistance, prediabetes, and metabolic syndrome before symptoms develop.",
    fullDescription:
      "The Metabolic and Diabetes Risk Panel provides an in-depth evaluation of your body's metabolic machinery. By measuring fasting glucose, HbA1c, fasting insulin, a complete lipid panel, ferritin, and key metabolic markers, this screening reveals how efficiently your body processes energy and where early dysfunction may be developing. Metabolic imbalances often precede clinical diabetes by years — catching them early creates a window for lifestyle and clinical intervention that can fundamentally alter disease trajectory.",
    medicationClass: "Diagnostic Service",
    indications: "Metabolic syndrome screening, diabetes risk assessment, insulin resistance evaluation",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Recommended for individuals with weight changes, fatigue, or family history of diabetes",
      "Detects early signs of insulin resistance and prediabetes",
      "Helps prevent metabolic disease and optimize energy and longevity",
      "Evaluates blood sugar regulation, insulin sensitivity, and lipid metabolism",
    ],
    clinicalNotes:
      "Includes CBC with Automated Diff, Comprehensive Metabolic Panel, Hemoglobin A1C, Insulin, Lipid Panel, Ferritin, Magnesium, Phosphorus, Uric Acid, Homocysteine, IGF-1, and Cortisol. Optimal when combined with body composition data and family history of metabolic disease.",
    includedTests: [
      "CBC with Automated Diff",
      "Comprehensive Metabolic Panel",
      "Hemoglobin A1C",
      "Insulin",
      "Lipid Panel",
      "Ferritin",
      "Magnesium",
      "Phosphorus",
      "Uric Acid",
      "Homocysteine",
      "IGF-1",
      "Cortisol",
    ],
    variants: [
      {
        strength: "12 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or Semi-Annual",
        price: 199,
      },
    ],
  }),

  base({
    slug: "cardiovascular-risk-panel",
    name: "Cardiovascular Risk Panel",
    genericName: "Heart & Vascular Risk Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "A comprehensive cardiovascular assessment measuring cholesterol balance, inflammation, metabolic health, and vascular risk markers associated with heart disease and stroke.",
    fullDescription:
      "Standard cholesterol panels miss a significant portion of cardiovascular risk. The Cardiovascular Risk Panel goes deeper with a full lipid panel, high-sensitivity CRP for vascular inflammation, homocysteine for endothelial function, ferritin, insulin, hemoglobin A1C, and key metabolic markers. These biomarkers, when interpreted alongside your clinical history and lifestyle, provide a far more accurate picture of true cardiovascular risk than LDL cholesterol alone.",
    medicationClass: "Diagnostic Service",
    indications: "Cardiovascular risk stratification, advanced lipid analysis, vascular inflammation assessment",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Appropriate for adults with family history of heart disease, high blood pressure, or elevated cholesterol",
      "Measures cholesterol balance alongside inflammation and metabolic markers",
      "Supports early detection to reduce long-term cardiovascular risk",
      "Goes beyond standard panels with hs-CRP, homocysteine, and insulin",
    ],
    clinicalNotes:
      "Includes Lipid Panel, hs-CRP, Homocysteine, Comprehensive Metabolic Panel, Magnesium, Ferritin, Insulin, Hemoglobin A1C, Uric Acid, Testosterone Free & Total, Estradiol, and Cortisol. Comprehensive cardiovascular risk assessment benefits from interpretation alongside blood pressure, family history, and lifestyle factors.",
    includedTests: [
      "Lipid Panel",
      "hs-CRP",
      "Homocysteine",
      "Comprehensive Metabolic Panel",
      "Magnesium",
      "Ferritin",
      "Insulin",
      "Hemoglobin A1C",
      "Uric Acid",
      "Testosterone Free & Total",
      "Estradiol",
      "Cortisol",
    ],
    variants: [
      {
        strength: "12 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual",
        price: 199,
      },
    ],
  }),

  base({
    slug: "hormone-health-panel",
    name: "Hormone Health Panel",
    genericName: "Endocrine & Hormone Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "This panel evaluates key hormones that influence energy, mood, metabolism, sleep, libido, and overall vitality, providing insight into endocrine balance for both men and women.",
    fullDescription:
      "Hormones regulate nearly every physiological process — from energy and mood to body composition and cognitive function. The Hormone Health Panel evaluates the full endocrine landscape including testosterone, estradiol, estrone, progesterone, FSH, LH, DHEA-S, pregnenolone, cortisol, IGF-1, and thyroid markers. For both men and women, hormonal imbalances often develop gradually, producing nonspecific symptoms like fatigue, weight gain, mood changes, and reduced libido that are frequently attributed to aging rather than recognized as treatable clinical patterns.",
    medicationClass: "Diagnostic Service",
    indications: "Hormonal imbalance evaluation, testosterone optimization, reproductive health assessment",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Helpful for symptoms such as fatigue, weight gain, low libido, or mood changes",
      "Provides insight into endocrine balance for both men and women",
      "Supports optimization of performance, aging, and wellness goals",
      "Evaluates reproductive hormones alongside stress and metabolic hormones",
    ],
    clinicalNotes:
      "Includes CBC with Automated Diff, Comprehensive Metabolic Panel, Testosterone Free & Total, Estradiol, Estrone (E1), Progesterone, FSH, LH, DHEA-S, Pregnenolone, Cortisol, IGF-1, TSH, Free T3, and Free T4. Morning blood draw recommended for accurate cortisol and testosterone values.",
    includedTests: [
      "CBC with Automated Diff",
      "Comprehensive Metabolic Panel",
      "Testosterone Free & Total",
      "Estradiol",
      "Estrone (E1)",
      "Progesterone",
      "FSH",
      "LH",
      "DHEA-S",
      "Pregnenolone",
      "Cortisol",
      "IGF-1",
      "TSH",
      "Free T3",
      "Free T4",
    ],
    variants: [
      {
        strength: "15 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or as clinically indicated",
        price: 379,
      },
    ],
  }),

  base({
    slug: "thyroid-health-panel",
    name: "Thyroid Health Panel",
    genericName: "Thyroid Function Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "A focused evaluation of thyroid function and thyroid-related immune activity to detect underactive or overactive thyroid conditions that may affect metabolism, energy, and weight.",
    fullDescription:
      "Standard thyroid screening (TSH alone) misses a significant percentage of thyroid dysfunction. The Thyroid Health Panel evaluates the full thyroid axis: TSH, Free T3, Free T4, thyroid peroxidase (TPO) antibodies, and thyroglobulin — along with a CBC and Comprehensive Metabolic Panel for broader context. This approach detects subclinical hypothyroidism, Hashimoto's thyroiditis, and conversion issues that cause fatigue, weight gain, cognitive fog, hair loss, and temperature dysregulation but are invisible on a standard TSH-only test.",
    medicationClass: "Diagnostic Service",
    indications: "Thyroid dysfunction screening, Hashimoto's detection, subclinical hypothyroidism evaluation",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Recommended for fatigue, hair loss, weight changes, brain fog, or temperature sensitivity",
      "Detects thyroid dysfunction missed by TSH-only screening",
      "Identifies autoimmune thyroid activity via TPO antibodies and thyroglobulin",
      "Appropriate for those with family history of thyroid disease",
    ],
    clinicalNotes:
      "Includes CBC with Automated Diff, TSH, Free T3, Free T4, Thyroid Peroxidase (TPO) Antibodies, Thyroglobulin, and Comprehensive Metabolic Panel. TPO antibodies are elevated years before clinical hypothyroidism develops in Hashimoto's thyroiditis.",
    includedTests: [
      "CBC with Automated Diff",
      "TSH",
      "Free T3",
      "Free T4",
      "Thyroid Peroxidase (TPO) Antibodies",
      "Thyroglobulin",
      "Comprehensive Metabolic Panel",
    ],
    variants: [
      {
        strength: "7 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or Semi-Annual",
        price: 149,
      },
    ],
  }),

  base({
    slug: "inflammation-immune-assessment-panel",
    name: "Inflammation and Immune Assessment Panel",
    genericName: "Immune & Inflammatory Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "This panel measures markers associated with inflammation, immune activation, and autoimmune processes that may contribute to chronic symptoms or disease risk.",
    fullDescription:
      "Chronic low-grade inflammation is now recognized as a root driver of cardiovascular disease, neurodegeneration, metabolic dysfunction, and accelerated aging. The Inflammation and Immune Assessment Panel measures hs-CRP, ferritin, ANA with reflex, cortisol, homocysteine, Vitamin D, LDH, and key immune markers. This panel reveals the inflammatory burden your body carries — even when you feel fine — and helps identify immune dysregulation patterns that may warrant clinical attention before they manifest as disease.",
    medicationClass: "Diagnostic Service",
    indications: "Chronic inflammation assessment, immune function evaluation, autoimmune screening",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Beneficial for unexplained fatigue, joint pain, or chronic illness symptoms",
      "Identifies underlying inflammatory drivers of health conditions",
      "Screens for autoimmune activity with ANA and IgE",
      "Evaluates immune cell populations and inflammatory burden",
    ],
    clinicalNotes:
      "Includes CBC with Differential, hs-CRP, Ferritin, Immunoglobulin E (IgE), ANA with reflex to ENA, Cortisol, Homocysteine, Vitamin D 25-OH, and LDH. Elevated inflammatory markers in the absence of acute illness suggest chronic systemic inflammation warranting further investigation.",
    includedTests: [
      "CBC with Differential",
      "hs-CRP",
      "Ferritin",
      "Immunoglobulin E (IgE)",
      "ANA with reflex to ENA",
      "Cortisol",
      "Homocysteine",
      "Vitamin D 25-OH",
      "LDH",
    ],
    variants: [
      {
        strength: "9 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual",
        price: 249,
      },
    ],
  }),

  base({
    slug: "vitamin-mineral-panel",
    name: "Vitamin and Mineral Panel",
    genericName: "Micronutrient Status Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "A comprehensive nutrient assessment evaluating essential vitamins and minerals required for energy production, immune function, brain health, and cellular repair.",
    fullDescription:
      "Micronutrient deficiencies are among the most common and most underdiagnosed contributors to fatigue, cognitive decline, immune vulnerability, and poor recovery. The Vitamin and Mineral Panel evaluates Vitamin D, B12, Folate, Vitamin A, Vitamin E, Vitamin K1, Magnesium, Zinc, Iron with TIBC and Saturation, Ferritin, and Phosphorus. These nutrients are foundational to cellular energy production, neurotransmitter synthesis, immune defense, and tissue repair — yet standard physicals rarely test them comprehensively.",
    medicationClass: "Diagnostic Service",
    indications: "Micronutrient deficiency screening, fatigue evaluation, immune and cognitive support assessment",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Ideal for individuals with fatigue, dietary restrictions, poor recovery, or frequent illness",
      "Evaluates essential vitamins and minerals in a single panel",
      "Supports optimization of nutrition and performance",
      "Identifies deficiencies driving fatigue, immune weakness, and cognitive decline",
    ],
    clinicalNotes:
      "Includes Vitamin D 25-OH, Vitamin B12, Folate, Vitamin A, Vitamin E, Vitamin K1, Magnesium, Zinc, Iron + TIBC + Saturation, Ferritin, and Phosphorus. Vitamin D deficiency is present in over 40% of American adults. Iron studies beyond simple ferritin provide a more complete picture of iron metabolism.",
    includedTests: [
      "Vitamin D 25-OH",
      "Vitamin B12",
      "Folate",
      "Vitamin A",
      "Vitamin E",
      "Vitamin K1",
      "Magnesium",
      "Zinc",
      "Iron + TIBC + Saturation",
      "Ferritin",
      "Phosphorus",
    ],
    variants: [
      {
        strength: "11 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or as clinically indicated",
        price: 299,
      },
    ],
  }),

  base({
    slug: "liver-kidney-function-panel",
    name: "Liver and Kidney Function Panel",
    genericName: "Hepatic & Renal Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "This panel evaluates organ function responsible for detoxification, metabolism, and waste elimination to ensure the liver and kidneys are functioning efficiently.",
    fullDescription:
      "Your liver and kidneys are the body's primary filtration and detoxification systems. The Liver and Kidney Function Panel evaluates hepatic enzyme activity, bilirubin metabolism, renal function markers, and key electrolytes through a CBC with Differential, Comprehensive Metabolic Panel, GGT, Bilirubin Direct, LDH, Uric Acid, Magnesium, Phosphorus, and Ferritin. Early hepatic and renal compromise is often completely asymptomatic — these organs have enormous functional reserve, meaning significant damage can accumulate before standard symptoms appear. Routine monitoring catches dysfunction at a reversible stage.",
    medicationClass: "Diagnostic Service",
    indications: "Liver function monitoring, kidney health assessment, medication safety screening",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Recommended for medication monitoring, metabolic health evaluation, or lifestyle optimization",
      "Detects early hepatic and renal stress before symptoms appear",
      "Provides reassurance of healthy organ function",
      "Essential for patients on therapeutic protocols requiring organ safety monitoring",
    ],
    clinicalNotes:
      "Includes CBC with Differential, Comprehensive Metabolic Panel, GGT, Bilirubin Direct, LDH, Uric Acid, Magnesium, Phosphorus, and Ferritin. GGT is the most sensitive marker for early hepatobiliary stress. Early detection of organ compromise is critical as symptoms typically appear only after significant functional loss.",
    includedTests: [
      "CBC with Differential",
      "Comprehensive Metabolic Panel",
      "GGT",
      "Bilirubin Direct",
      "LDH",
      "Uric Acid",
      "Magnesium",
      "Phosphorus",
      "Ferritin",
    ],
    variants: [
      {
        strength: "9 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Annual or Semi-Annual",
        price: 169,
      },
    ],
  }),

  base({
    slug: "gastrointestinal-distress-panel",
    name: "Gastrointestinal Distress Panel",
    genericName: "GI Health Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "A targeted evaluation assessing potential infections, digestive issues, immune reactions, and nutrient absorption factors that may contribute to gastrointestinal symptoms.",
    fullDescription:
      "Chronic gastrointestinal symptoms often have multifactorial origins — from bacterial and parasitic infections to immune-mediated food sensitivities and celiac disease. The Gastrointestinal Distress Panel combines a Comprehensive Metabolic Panel, CBC, GI bacterial, parasite, and viral panels, celiac serology, Immunoglobulin E, Ferritin, Vitamin B12, and Folate to provide a thorough assessment of potential GI drivers. This panel is designed to move beyond symptom management toward identifying root causes of digestive distress.",
    medicationClass: "Diagnostic Service",
    indications: "GI symptom evaluation, infection screening, celiac and food sensitivity assessment",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Helpful for bloating, abdominal discomfort, irregular bowel habits, or food sensitivities",
      "Screens for bacterial, parasitic, and viral GI infections",
      "Evaluates celiac disease and immune-mediated digestive reactions",
      "Assesses nutrient absorption through B12, Folate, and Ferritin",
    ],
    clinicalNotes:
      "Includes CBC with Differential, Comprehensive Metabolic Panel, GI Bacterial Panel, GI Parasite Panel, GI Viral Panel, Celiac Serology Panel, Immunoglobulin E (IgE), Ferritin, Vitamin B12, and Folate. Nutrient deficiencies (B12, folate, iron) often indicate malabsorption and can guide further workup.",
    includedTests: [
      "CBC with Differential",
      "Comprehensive Metabolic Panel",
      "GI Bacterial Panel",
      "GI Parasite Panel",
      "GI Viral Panel",
      "Celiac Serology Panel",
      "Immunoglobulin E (IgE)",
      "Ferritin",
      "Vitamin B12",
      "Folate",
    ],
    variants: [
      {
        strength: "10 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "As clinically indicated",
        price: 399,
      },
    ],
  }),

  base({
    slug: "trt-panel",
    name: "TRT Panel",
    genericName: "Testosterone Replacement Therapy Assessment",
    category: "Blood Testing & Analysis",
    categorySlug: "blood-testing-analysis",
    shortDescription:
      "A specialized hormone evaluation designed to assess testosterone levels and related biomarkers that influence strength, energy, metabolism, mood, and sexual health.",
    fullDescription:
      "The TRT Panel is designed for men considering, initiating, or currently on testosterone replacement therapy. By evaluating Testosterone Free & Total, Estradiol, LH, CBC with Differential, and a Comprehensive Metabolic Panel, this panel provides the essential biomarkers needed to assess hormonal status, monitor therapy response, and ensure safety. Testosterone decline is associated with fatigue, reduced libido, decreased performance, muscle loss, and mood changes — and proper monitoring is critical for optimizing outcomes while minimizing risks.",
    medicationClass: "Diagnostic Service",
    indications: "TRT candidacy assessment, testosterone monitoring, hormonal decline evaluation",
    administrationRoute: "Blood Draw (Venipuncture)",
    keyBenefits: [
      "Recommended for men experiencing low energy, reduced libido, or decreased performance",
      "Assesses testosterone levels alongside key related biomarkers",
      "Supports monitoring of testosterone replacement therapy",
      "Evaluates hormonal decline symptoms including muscle loss and mood changes",
    ],
    clinicalNotes:
      "Includes Testosterone Free & Total, Estradiol, LH, CBC with Differential, and Comprehensive Metabolic Panel. Morning blood draw is recommended for accurate testosterone measurement. Estradiol monitoring is essential during TRT to manage aromatization.",
    includedTests: [
      "Testosterone Free & Total",
      "Estradiol",
      "LH",
      "CBC with Differential",
      "Comprehensive Metabolic Panel",
    ],
    variants: [
      {
        strength: "5 Markers",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Quarterly or as clinically indicated",
        price: 119,
      },
    ],
  }),
];
