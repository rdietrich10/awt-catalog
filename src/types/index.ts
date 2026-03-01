export interface ProductVariant {
  strength: string;
  vialSize: string;
  concentration: string;
  schedule: string;
  /** Bacteriostatic water volume for reconstitution, e.g. "2 mL" */
  reconstitutionVolume?: string;
  /** Price in dollars (e.g. 165) */
  price?: number;
  /** Membership price in dollars */
  membershipPrice?: number;
}

/** Standard IFU content shared across products when not overridden */
export const IFU_DEFAULTS = {
  missedDose: [
    "Take within 5 days if remembered",
    "If more than 5 days, skip and resume weekly schedule",
    "Do not double dose",
  ],
  injectionTechnique: [
    "Inject subcutaneously into abdomen, thigh, or upper arm",
    "Rotate injection sites",
    "Clean site, pinch skin, inject at 90° angle",
    "Dispose of syringe in sharps container",
  ],
  storage: "Refrigerate after reconstitution (36°F–46°F / 2°C–8°C). Do not freeze. Protect from light. Discard after 90 days.",
  disclaimer: "This medication is compounded and provided for use only under the supervision of a licensed healthcare provider. Use only as prescribed. Individual results may vary.",
  effectiveDate: "Version 2.2 | Effective Date: January 31, 2026",
} as const;

export interface Product {
  slug: string;
  name: string;
  genericName: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  /** Default price when no variant-level price */
  price?: number;
  /** Default membership price when no variant-level price */
  membershipPrice?: number;
  /** Medication class from IFU, e.g. "GLP-1 Receptor Agonist" */
  medicationClass: string;
  /** Full indications from IFU */
  indications: string;
  category: string;
  categorySlug: string;
  variants: ProductVariant[];
  administrationRoute: string;
  /** Special injection note, e.g. "Abdomen only" for Wolverine */
  injectionNote?: string;
  /** Missed dose instructions from IFU; omit to use IFU_DEFAULTS.missedDose */
  missedDose?: string[];
  /** Injection technique steps from IFU; omit to use IFU_DEFAULTS.injectionTechnique */
  injectionTechnique?: string[];
  keyBenefits: string[];
  clinicalNotes: string;
  /** Provider consultation note from IFU, e.g. "Consult your prescribing Healthcare Provider for dosing adjustments" */
  providerNote?: string;
  isBlend: boolean;
  blendComponents?: string[];
  featured: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  slug: string;
}
