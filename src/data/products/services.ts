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
    "Contact our team for more information about this service.",
  ...o,
});

export const servicesProducts: Product[] = [
  base({
    slug: "medical-review",
    name: "Medical Review",
    genericName: "Physician Exam Reading & Clinical Case Review",
    category: "Telehealth & Services",
    categorySlug: "telehealth-services",
    shortDescription:
      "Board-certified physician review of your labs, medical records, and therapeutic plan — with documented clinical notes and personalized guidance.",
    fullDescription:
      "A board-certified physician or advanced practitioner conducts a thorough review of your submitted medical information — including lab results, prior medical records, imaging reports, and current therapeutic protocols. Each review results in formal clinical documentation with provider notes, clinical decision-making rationale, and personalized recommendations for your care plan. This service is the clinical backbone of the AW Therapeutics physician-directed model, ensuring every product request and therapeutic adjustment is medically appropriate and individually tailored.",
    medicationClass: "Clinical Service",
    indications:
      "Clinical case evaluation, lab interpretation, therapeutic protocol review, new patient intake assessment, ongoing care plan adjustment",
    administrationRoute: "Chart Review",
    keyBenefits: [
      "Board-certified physician or advanced practitioner review",
      "Formal medical record documentation with clinical notes",
      "Personalized therapeutic recommendations",
      "Lab result interpretation and risk stratification",
      "Protocol adjustment guidance based on clinical evidence",
      "Foundation for physician-directed product dispensing",
    ],
    clinicalNotes:
      "Each medical review generates a formal clinical note documenting the provider's assessment, plan, and rationale. Reviews are conducted within 24 hours of submission. Complex cases may be escalated to a specialist consultation.",
    providerNote:
      "This service is included with every product inquiry. Additional standalone reviews are available for patients seeking ongoing clinical oversight outside of product requests.",
    variants: [
      {
        strength: "Standard Review",
        vialSize: "Chart Review",
        concentration: "1 Provider",
        schedule: "Within 24 hours of submission",
        price: 50,
      },
    ],
  }),
  base({
    slug: "telemedicine",
    name: "Telemedicine Consultation",
    genericName: "Telehealth Visit",
    category: "Telehealth & Services",
    categorySlug: "telehealth-services",
    shortDescription: "Live telehealth consultation with a licensed provider.",
    fullDescription:
      "A live telehealth consultation with a licensed healthcare provider affiliated with AW Therapeutics. Discuss your health goals, review lab results, adjust therapeutic protocols, or address clinical questions — all from the convenience of your home. Telehealth encounters may be eligible for coverage through your health insurance.",
    medicationClass: "Clinical Service",
    indications: "Clinical consultation, protocol adjustment, health optimization",
    administrationRoute: "N/A",
    keyBenefits: [
      "Live provider consultation",
      "Protocol adjustments",
      "May be insurance-eligible",
      "Convenient telehealth format",
    ],
    clinicalNotes: "Telehealth visit conducted per Florida Statute §456.47.",
    variants: [
      {
        strength: "Single Visit",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "As needed",
        price: 75,
      },
    ],
  }),
  base({
    slug: "vip-membership",
    name: "VIP Medical Wellness Membership",
    genericName: "Annual Membership",
    category: "Telehealth & Services",
    categorySlug: "telehealth-services",
    shortDescription: "Annual VIP membership with exclusive pricing and priority access.",
    fullDescription:
      "The VIP Medical Wellness Membership provides annual access to member-exclusive pricing on all therapeutics, priority scheduling for telehealth consultations, and dedicated support from the AW Therapeutics clinical team. Membership includes ongoing care coordination and access to new product offerings before general availability.",
    medicationClass: "Membership Service",
    indications: "Ongoing care, member pricing, priority access",
    administrationRoute: "N/A",
    keyBenefits: [
      "Exclusive member pricing",
      "Priority telehealth scheduling",
      "Dedicated clinical support",
      "Early access to new offerings",
    ],
    clinicalNotes: "Annual dues. Membership renews yearly.",
    variants: [
      {
        strength: "Annual",
        vialSize: "N/A",
        concentration: "N/A",
        schedule: "Yearly",
        price: 399,
      },
    ],
  }),
];
