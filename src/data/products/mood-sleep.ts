import type { Product } from "@/types";
import { getProductImagePath } from "@/lib/productImage";

const base = (o: Partial<Product> & Pick<Product, "slug" | "name" | "genericName" | "category" | "categorySlug" | "shortDescription" | "fullDescription" | "medicationClass" | "indications" | "variants" | "administrationRoute" | "keyBenefits" | "clinicalNotes">): Product => ({
  image: getProductImagePath(o.slug),
  isBlend: false,
  featured: false,
  providerNote: "Consult your prescribing Healthcare Provider for dosing adjustments.",
  ...o,
});

export const moodSleepProducts: Product[] = [
  base({
    slug: "oxytocin",
    name: "Oxytocin",
    genericName: "Oxytocin",
    category: "Mood & Wellness",
    categorySlug: "wellness-mood",
    shortDescription: "Social bonding, emotional wellbeing, stress reduction.",
    fullDescription: "Oxytocin increases social bonding and emotional wellbeing. Helps reduce stress and anxiety.",
    medicationClass: "Stress & anxiety mood compound",
    indications: "Social bonding, emotional wellbeing, stress reduction",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Social bonding", "Emotional wellbeing", "Stress reduction", "Anxiety support"],
    clinicalNotes: "Social bonding, emotional wellbeing, stress reduction.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "0.05 mg/unit", schedule: "10 units daily", reconstitutionVolume: "2 mL", price: 110 },
    ],
  }),
  base({
    slug: "selank",
    name: "Selank",
    genericName: "Selank",
    category: "Mood & Wellness",
    categorySlug: "wellness-mood",
    shortDescription: "Nootropic compound; anxiety reduction, cognitive support.",
    fullDescription: "Selank is a nootropic compound that may support anxiety reduction, cognitive function, and emotional balance.",
    medicationClass: "Nootropic compound",
    indications: "Anxiety reduction, cognitive support",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Anxiety support", "Cognitive function", "Emotional balance"],
    clinicalNotes: "Nootropic compound for anxiety and cognition.",
    variants: [
      { strength: "5 mg", vialSize: "5 mg", concentration: "0.025 mg/unit", schedule: "Consult provider", reconstitutionVolume: "2 mL", price: 90 },
    ],
  }),
  base({
    slug: "semax",
    name: "Semax",
    genericName: "Semax",
    category: "Mood & Wellness",
    categorySlug: "wellness-mood",
    shortDescription: "Nootropic compound; cognitive enhancement, neuroprotection.",
    fullDescription: "Semax is a nootropic compound that may support cognitive enhancement, memory, and neuroprotection.",
    medicationClass: "Nootropic compound",
    indications: "Cognitive enhancement, neuroprotection",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Cognitive enhancement", "Memory support", "Neuroprotection"],
    clinicalNotes: "Nootropic compound for cognition.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 120 },
    ],
  }),
];
