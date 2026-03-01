import type { Product } from "@/types";
import { getProductImagePath } from "@/lib/productImage";

const base = (o: Partial<Product> & Pick<Product, "slug" | "name" | "genericName" | "category" | "categorySlug" | "shortDescription" | "fullDescription" | "medicationClass" | "indications" | "variants" | "administrationRoute" | "keyBenefits" | "clinicalNotes">): Product => ({
  image: getProductImagePath(o.slug),
  isBlend: false,
  featured: false,
  providerNote: "Consult your prescribing Healthcare Provider for dosing adjustments.",
  ...o,
});

export const reproductiveProducts: Product[] = [
  base({
    slug: "hcg",
    name: "HCG",
    genericName: "Human Chorionic Gonadotropin",
    category: "Reproductive & Hormonal Health",
    categorySlug: "reproductive-hormonal-health",
    shortDescription: "Fertility support, testosterone optimization.",
    fullDescription: "HCG supports fertility and testosterone optimization.",
    medicationClass: "Gonadotropin",
    indications: "Fertility, testosterone",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Fertility support", "Testosterone optimization"],
    clinicalNotes: "Consult provider for dosing.",
    variants: [
      { strength: "5000 IU", vialSize: "5000 IU", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 120 },
    ],
  }),
  base({
    slug: "gonadorelin",
    name: "Gonadorelin",
    genericName: "Gonadorelin",
    category: "Reproductive & Hormonal Health",
    categorySlug: "reproductive-hormonal-health",
    shortDescription: "GnRH analog for fertility and hormone support.",
    fullDescription: "Gonadorelin supports fertility and hormone balance.",
    medicationClass: "GnRH Analog",
    indications: "Fertility, hormone support",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Fertility support", "Hormone balance"],
    clinicalNotes: "Consult provider for dosing.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 250 },
    ],
  }),
  base({
    slug: "kisspeptin",
    name: "Kisspeptin",
    genericName: "Kisspeptin",
    category: "Reproductive & Hormonal Health",
    categorySlug: "reproductive-hormonal-health",
    shortDescription: "Reproductive hormone support.",
    fullDescription: "Kisspeptin supports reproductive hormone function.",
    medicationClass: "Reproductive Compound",
    indications: "Reproductive support",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Reproductive support"],
    clinicalNotes: "Consult provider for dosing.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 150 },
    ],
  }),
  base({
    slug: "pt-141",
    name: "PT-141",
    genericName: "Bremelanotide",
    category: "Reproductive & Hormonal Health",
    categorySlug: "reproductive-hormonal-health",
    shortDescription: "Libido and sexual function support.",
    fullDescription: "PT-141 (Bremelanotide) supports libido and sexual function.",
    medicationClass: "Melanocortin Receptor Agonist",
    indications: "Libido, sexual function",
    administrationRoute: "Subcutaneous",
    keyBenefits: ["Libido support", "Sexual function"],
    clinicalNotes: "Consult provider for dosing.",
    variants: [
      { strength: "10 mg", vialSize: "10 mg", concentration: "Consult provider", schedule: "Consult provider", reconstitutionVolume: "Consult provider", price: 110 },
    ],
  }),
];
