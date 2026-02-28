import type { Category } from "@/types";
import { CATEGORY_IMAGES } from "@/data/productImages";

export const categories: Category[] = [
  {
    slug: "weight-management",
    name: "Weight Management",
    description: "GLP-1 receptor agonists and lipolysis compounds for sustainable weight management.",
    image: "/images/categories/weight-management.png",
    productCount: 6,
  },
  {
    slug: "growth-hormone-recomposition",
    name: "Growth Hormone & Recomposition",
    description: "GH secretagogues and IGF-1 for lean muscle, body recomposition, and metabolic support.",
    image: "/images/categories/growth-hormone-recomposition.png",
    productCount: 16,
  },
  {
    slug: "healing-tissue-recovery",
    name: "Healing & Tissue Recovery",
    description: "BPC-157, TB-500, GHK-Cu and healing blends for wound repair, tendon, and joint support.",
    image: "/images/categories/healing-tissue-recovery.png",
    productCount: 15,
  },
  {
    slug: "reproductive-hormonal-health",
    name: "Reproductive & Hormonal Health",
    description: "HCG, Gonadorelin, Kisspeptin for fertility, testosterone, and hormonal balance.",
    image: "/images/categories/reproductive-hormonal-health.png",
    productCount: 5,
  },
  {
    slug: "longevity-anti-aging",
    name: "Longevity & Anti-Aging",
    description: "Epitalon, MOTS-c, NAD+, Lathmized NAD+ and exosomes for cellular longevity and mitochondrial support.",
    image: "/images/categories/longevity-anti-aging.png",
    productCount: 14,
  },
  {
    slug: "wellness-mood",
    name: "Mood & Wellness",
    description: "Compounds for emotional wellbeing, bonding, stress reduction, and mood support.",
    image: "/images/categories/wellness-mood.png",
    productCount: 3,
  },
  {
    slug: "sleep-detox",
    name: "Sleep & Detox",
    description: "DSIP, Melanotan, Glutathione for sleep support, circadian reset, and detoxification.",
    image: CATEGORY_IMAGES.sleepDetox,
    productCount: 1,
  },
  {
    slug: "supplies",
    name: "Supplies",
    description: "Bacteriostatic water, insulin syringes and administration supplies.",
    image: CATEGORY_IMAGES.supplies,
    productCount: 2,
  },
  {
    slug: "nutriments",
    name: "Nutriments",
    description: "Guard supplements and nutraceuticals for targeted health support.",
    image: CATEGORY_IMAGES.nutriments,
    productCount: 29,
  },
  {
    slug: "cognitive-health",
    name: "Cognitive Health",
    description: "Products and services for cognitive support and brain health.",
    image: CATEGORY_IMAGES.cognitiveHealth,
    productCount: 0,
  },
  {
    slug: "blood-testing-analysis",
    name: "Blood Testing & Analysis",
    description: "Annual comprehensive biomarker screening panels analyzing 100+ clinically relevant markers for precision-guided, whole-person healthcare.",
    image: CATEGORY_IMAGES.bloodTestingAnalysis,
    productCount: 8,
  },
];
