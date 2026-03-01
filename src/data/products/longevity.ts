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
];
