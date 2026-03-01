import type { Product } from "@/types";
import { getProductImagePath } from "@/lib/productImage";

const base = (o: Partial<Product> & Pick<Product, "slug" | "name" | "genericName" | "category" | "categorySlug" | "shortDescription" | "fullDescription" | "medicationClass" | "indications" | "variants" | "administrationRoute" | "keyBenefits" | "clinicalNotes">): Product => ({
  image: getProductImagePath(o.slug),
  isBlend: false,
  featured: false,
  providerNote: "Consult your prescribing Healthcare Provider for dosing adjustments.",
  ...o,
});

export const suppliesProducts: Product[] = [
  base({
    slug: "bacteriostatic-water",
    name: "Bacteriostatic Water (BW)",
    genericName: "Bacteriostatic Water",
    category: "Supplies",
    categorySlug: "supplies",
    shortDescription: "Reconstitution diluent for injectable medications.",
    fullDescription: "Bacteriostatic Water is used to reconstitute medication vials.",
    medicationClass: "Diluent",
    indications: "Reconstitution",
    administrationRoute: "N/A",
    keyBenefits: ["Reconstitution diluent"],
    clinicalNotes: "Use for medication reconstitution.",
    variants: [
      { strength: "30 mL", vialSize: "30 mL", concentration: "N/A", schedule: "N/A", price: 33 },
    ],
  }),
  base({
    slug: "insulin-syringes",
    name: "Insulin Syringes 31G 1cc 5/16\"",
    genericName: "Insulin Syringes",
    category: "Supplies",
    categorySlug: "supplies",
    shortDescription: "31G 1cc 5/16\" insulin syringes, 10/pack.",
    fullDescription: "Insulin syringes 31G 1cc 5/16\" for subcutaneous administration. 10 per pack.",
    medicationClass: "Supply",
    indications: "Administration",
    administrationRoute: "N/A",
    keyBenefits: ["Subcutaneous administration"],
    clinicalNotes: "10 per pack.",
    variants: [
      { strength: "10/pack", vialSize: "N/A", concentration: "N/A", schedule: "N/A", price: 10 },
    ],
  }),
];
