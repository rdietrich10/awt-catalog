import type { Category } from "@/types";
import { CATEGORY_IMAGES } from "@/data/productImages";

export const categories: Category[] = [
  {
    slug: "weight-management",
    name: "Weight Management",
    description: "GLP-1 receptor agonists and lipolysis compounds for sustainable weight management.",
    image: "/images/categories/weight-management.png",
    productCount: 5,
  },
  {
    slug: "growth-hormone-recomposition",
    name: "Growth Hormone & Recomposition",
    description: "GH secretagogues and IGF-1 for lean muscle, body recomposition, and metabolic support.",
    image: "/images/categories/growth-hormone-recomposition.png",
    productCount: 6,
  },
  {
    slug: "healing-tissue-recovery",
    name: "Healing & Tissue Recovery",
    description: "BPC-157, TB-500, GHK-Cu and healing blends for wound repair, tendon, and joint support.",
    image: "/images/categories/healing-tissue-recovery.png",
    productCount: 7,
  },
  {
    slug: "reproductive-hormonal-health",
    name: "Reproductive & Hormonal Health",
    description: "HCG, Gonadorelin, Kisspeptin for fertility, testosterone, and hormonal balance.",
    image: "/images/categories/reproductive-hormonal-health.png",
    productCount: 4,
  },
  {
    slug: "longevity-anti-aging",
    name: "Longevity & Anti-Aging",
    description: "Epitalon, MOTS-c, DSIP, and Glutathione for cellular longevity, mitochondrial support, and detoxification.",
    image: "/images/categories/longevity-anti-aging.png",
    productCount: 4,
  },
  {
    slug: "wellness-mood",
    name: "Mood & Wellness",
    description: "Compounds for emotional wellbeing, bonding, stress reduction, and mood support.",
    image: "/images/categories/wellness-mood.png",
    productCount: 3,
  },
  {
    slug: "supplies",
    name: "Supplies",
    description: "Bacteriostatic water, insulin syringes and administration supplies.",
    image: CATEGORY_IMAGES.supplies,
    productCount: 2,
  },
  {
    slug: "blood-testing-analysis",
    name: "Blood Testing & Analysis",
    description: "Annual comprehensive biomarker screening panels analyzing 100+ clinically relevant markers for precision-guided, whole-person healthcare.",
    image: CATEGORY_IMAGES.bloodTestingAnalysis,
    productCount: 8,
  },
  {
    slug: "telehealth-services",
    name: "Telehealth & Services",
    description: "Medical reviews, telehealth consultations, and VIP membership for ongoing clinical support and care coordination.",
    image: CATEGORY_IMAGES.telehealthServices,
    productCount: 3,
  },
];
