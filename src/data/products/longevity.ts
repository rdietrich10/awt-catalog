import type { Product } from "@/types";
import { getProductImagePath } from "@/lib/productImage";

const base = (o: Partial<Product> & Pick<Product, "slug" | "name" | "genericName" | "category" | "categorySlug" | "shortDescription" | "fullDescription" | "medicationClass" | "indications" | "variants" | "administrationRoute" | "keyBenefits" | "clinicalNotes">): Product => ({
  image: getProductImagePath(o.slug),
  isBlend: false,
  featured: false,
  providerNote: "Consult your prescribing Healthcare Provider for dosing adjustments.",
  ...o,
});

export const longevityProducts: Product[] = [
  base({
    slug: "epitalon",
    name: "Epitalon",
    genericName: "Epitalon",
    category: "Longevity & Anti-Aging",
    categorySlug: "longevity-anti-aging",
    shortDescription: "Telomere support, sleep, longevity.",
    fullDescription: "Epitalon supports telomere health, sleep quality, and longevity.",
    medicationClass: "Telomere Support Compound",
    indications: "Longevity, sleep, telomeres",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Telomere support", "Sleep quality", "Longevity"],
    clinicalNotes: "Consult provider for dosing.",
    variants: [
      { strength: "50 mg", vialSize: "50 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 230 },
    ],
  }),
  base({
    slug: "mots-c",
    name: "MOTS-c",
    genericName: "Mitochondrial-Derived Compound",
    category: "Longevity & Anti-Aging",
    categorySlug: "longevity-anti-aging",
    shortDescription: "Mitochondrial support, metabolic health.",
    fullDescription: "MOTS-c supports mitochondrial function and metabolic health.",
    medicationClass: "Mitochondrial Compound",
    indications: "Mitochondrial, metabolic support",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Mitochondrial support", "Metabolic health"],
    clinicalNotes: "Consult provider for dosing.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 90 },
    ],
  }),
  base({
    slug: "dsip",
    name: "DSIP",
    genericName: "Delta Sleep-Inducing Compound",
    category: "Longevity & Anti-Aging",
    categorySlug: "longevity-anti-aging",
    shortDescription: "Sleep support, circadian rhythm.",
    fullDescription: "DSIP supports sleep quality and circadian rhythm regulation.",
    medicationClass: "Sleep Compound",
    indications: "Sleep, circadian rhythm",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Sleep support", "Circadian rhythm"],
    clinicalNotes: "Consult provider for dosing.",
    variants: [
      { strength: "5 mg", vialSize: "5 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 90 },
    ],
  }),
  base({
    slug: "glutathione",
    name: "Glutathione",
    genericName: "L-Glutathione (Reduced)",
    category: "Longevity & Anti-Aging",
    categorySlug: "longevity-anti-aging",
    shortDescription:
      "The body's master antioxidant — injectable L-Glutathione for detoxification, immune defense, liver support, and cellular protection with superior bioavailability.",
    fullDescription:
      "Glutathione (GSH) is a tripeptide composed of L-glutamic acid, L-cysteine, and glycine — the most abundant endogenous antioxidant in every cell of the body. It plays a central role in Phase II hepatic detoxification, neutralization of reactive oxygen species, immune cell function, and recycling of other antioxidants such as vitamins C and E. Injectable glutathione at 200 mg/mL bypasses gastrointestinal degradation, delivering the reduced (bioactive) form directly into circulation for significantly greater bioavailability than oral supplementation. Compounded under 503A/503B pharmacy standards with COA-verified purity.",
    medicationClass: "Tripeptide Antioxidant",
    indications:
      "Oxidative stress reduction, hepatic detoxification support, immune modulation, skin health and radiance, neurological protection, adjunct to chelation and environmental toxin exposure",
    administrationRoute: "Subcutaneous / Intramuscular",
    keyBenefits: [
      "Master antioxidant — neutralizes free radicals and reactive oxygen species",
      "Phase II liver detoxification support",
      "Immune cell activation and modulation",
      "Skin brightening and radiance",
      "Neuroprotective properties",
      "Recycles vitamins C and E for sustained antioxidant defense",
      "Superior bioavailability vs. oral glutathione",
    ],
    clinicalNotes:
      "200 mg/mL concentration, 30 mL vial. SC dosing: typically 100 mg (0.5 mL) up to 5x weekly. IM dosing: typically 200 mg (1 mL) 1–3x weekly. Store refrigerated (36°F–46°F). Protect from light. Consult provider for individualized dosing.",
    variants: [
      {
        strength: "200 mg/mL",
        vialSize: "30 mL",
        concentration: "200 mg/mL",
        schedule: "1–5x weekly (consult provider)",
        price: 175,
      },
    ],
  }),
  base({
    slug: "lathmized-nad-medical",
    name: "LathMized NAD+ Load Up (7-Day Dose)",
    genericName: "LathMized NAD+",
    category: "Longevity & Anti-Aging",
    categorySlug: "longevity-anti-aging",
    shortDescription:
      "Intensive 7-day stabilized NAD+ powder protocol — clinically shown to increase intracellular NAD+ by 53% and spinal cord NAD+ by 25% within hours.",
    fullDescription:
      "LathMized NAD+ Load Up is a high-potency, 7-day intensive oral powder formulated with intraMITOcell's proprietary LathMized stabilization technology. Unlike conventional NAD+ supplements that degrade in as little as 5 days at room temperature, LNAD+ is specifically stabilized both outside and inside the body, ensuring the molecule remains bioactive where it matters most. In clinical studies, LNAD+ increased intracellular NAD+ levels by 53% within 5 days and produced a 25% increase in NAD+ levels within just 4 hours in the spinal cord — outcomes no other oral NAD+ product has demonstrated. This intensive protocol is designed for individuals seeking rapid NAD+ restoration, including those managing neurological conditions, chronic fatigue, or age-related NAD+ decline. Up to 90% more affordable than clinic-based IV NAD+ infusions without sacrificing effectiveness.",
    medicationClass: "Stabilized NAD+ Compound",
    indications:
      "Rapid NAD+ restoration, cellular energy optimization, neurological support, fatigue reduction, inflammation management, age-related NAD+ decline, adjunct for MS, cerebral palsy, and Lyme disease support",
    administrationRoute: "Oral (Powder)",
    keyBenefits: [
      "53% increase in intracellular NAD+ levels within 5 days",
      "25% increase in spinal cord NAD+ within 4 hours",
      "Proprietary LathMized stabilization — effective inside and outside the body",
      "Up to 90% more affordable than IV NAD+ infusions",
      "Supports neurological health, mobility, and cognition",
      "Promotes sleep quality and overall quality of life",
      "No injection required — oral powder format",
    ],
    clinicalNotes:
      "15,000 mg total over 7-day intensive protocol. Mix powder as directed. Store at room temperature in sealed packaging — LathMized stabilization prevents degradation. Consult provider for individualized dosing and follow-up maintenance protocol.",
    variants: [
      {
        strength: "15,000 mg",
        vialSize: "7-day supply",
        concentration: "~2,143 mg/day",
        schedule: "Daily for 7 days",
        price: 1995,
      },
    ],
  }),
  base({
    slug: "lathmized-nad-maintenance",
    name: "LathMized NAD+ Monthly Maintenance",
    genericName: "LathMized NAD+",
    category: "Longevity & Anti-Aging",
    categorySlug: "longevity-anti-aging",
    shortDescription:
      "Daily stabilized NAD+ lozenges for sustained cellular energy, longevity support, and ongoing maintenance of optimal NAD+ levels.",
    fullDescription:
      "LathMized NAD+ Monthly Maintenance delivers a 30-day supply of stabilized NAD+ lozenges using intraMITOcell's proprietary LathMized technology. Designed as a follow-up to the intensive Load Up protocol or as a standalone daily regimen, these lozenges provide consistent NAD+ support for cellular energy production, immune function, and longevity. Unlike over-the-counter NAD+ supplements that may degrade in as few as 5 days at room temperature, LNAD+ lozenges remain stable and bioactive throughout the entire supply. Clinical studies backing the LathMized formulation demonstrated a 53% increase in intracellular NAD+ and a 25% increase in spinal cord NAD+ — results that support improvements in sleep, neurological health, mobility, cognition, and overall quality of life, even in healthy individuals.",
    medicationClass: "Stabilized NAD+ Compound",
    indications:
      "Daily NAD+ maintenance, cellular energy support, longevity, sleep improvement, cognitive support, mood balance, anti-aging",
    administrationRoute: "Oral (Lozenge)",
    keyBenefits: [
      "Sustained daily NAD+ support with LathMized stabilization",
      "Maintains elevated NAD+ levels after Load Up protocol",
      "Supports cellular energy production and mitochondrial function",
      "Improves sleep quality and circadian rhythm",
      "Enhances cognitive clarity and mood balance",
      "Convenient sublingual lozenge — no injections or IV required",
      "Stable at room temperature unlike conventional NAD+ supplements",
    ],
    clinicalNotes:
      "3,000 mg total, 30-day supply (100 mg/day). Dissolve lozenge sublingually as directed. Store at room temperature. Ideal as ongoing maintenance following the 7-day Load Up protocol. Consult provider for individualized regimen.",
    variants: [
      {
        strength: "3,000 mg",
        vialSize: "30-day supply",
        concentration: "100 mg/day",
        schedule: "Daily (ongoing)",
        price: 250,
      },
    ],
  }),
];
