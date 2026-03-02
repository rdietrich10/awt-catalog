import type { LandingPageData } from "./index";

export const boyntonBeach: LandingPageData = {
  slug: "boynton-beach",
  cityName: "Boynton Beach",
  stateAbbr: "FL",
  tagline: "Your Neighbor in Advanced Therapeutics",

  meta: {
    title:
      "Medical-Grade Peptide Therapy & Therapeutics in Boynton Beach, FL",
    description:
      "AW Therapeutics is a physician-directed medical practice headquartered in Boynton Beach, FL delivering medical-grade peptides, GLP-1s, and compounded therapeutics. Local office on Seacrest Blvd — not for research, for real patients under real medical oversight.",
  },

  hero: {
    badge: "Boynton Beach, FL — Home Base",
    headline: "Medical-Grade Therapeutics.\nHeadquartered in Boynton Beach.",
    subheadline:
      "AW Therapeutics isn't a faceless online shop. We're a physician-directed medical practice with our home office right here in Boynton Beach — delivering advanced peptides, GLP-1 therapies, and compounded treatments with the clinical oversight your health deserves.",
    ctaLabel: "Browse Our Catalog",
    ctaHref: "/products",
    image: "/images/lp/boynton-beach.png",
  },

  localTrust: {
    headline: "A Real Office. Real Physicians. Real Neighbors.",
    subheadline:
      "While most online therapeutics companies operate from a P.O. box, our clinical team works out of Boynton Beach. You can reach us by phone, email, or stop by.",
    address: {
      street: "2828 S Seacrest Blvd #213",
      city: "Boynton Beach",
      state: "FL",
      zip: "33435",
    },
    phone: "(561) 536-3166",
    nearbyRoads: [
      "Just off Seacrest Blvd & SE 28th Ave",
      "Minutes from Boynton Beach Blvd (SR-804) & Federal Highway (US-1)",
      "Near Congress Ave & Gateway Blvd corridor",
      "Easy access from I-95 via Woolbright Rd or Boynton Beach Blvd",
    ],
    neighborhoods: [
      "Seacrest Estates",
      "Heart of Boynton",
      "Renaissance Commons",
      "Boynton Harbor Marina",
      "Congress Ave Corridor",
      "Colonial Club",
    ],
  },

  services: {
    headline: "What We Offer in Boynton Beach",
    subheadline:
      "Every product is compounded in FDA-registered 503A and 503B pharmacies and requires physician review before dispensing. Medical-grade — not \"for research purposes only.\"",
    items: [
      {
        title: "Weight Management",
        description:
          "GLP-1 receptor agonists including Semaglutide and Tirzepatide for physician-supervised weight loss.",
        href: "/categories/weight-management",
      },
      {
        title: "Healing & Recovery",
        description:
          "BPC-157, TB-500, and GHK-Cu peptide protocols for tissue repair, joint support, and accelerated recovery.",
        href: "/categories/healing-tissue-recovery",
      },
      {
        title: "Growth Hormone & Recomposition",
        description:
          "GH secretagogues and IGF-1 for lean muscle development, body recomposition, and metabolic support.",
        href: "/categories/growth-hormone-recomposition",
      },
      {
        title: "Longevity & Anti-Aging",
        description:
          "Epitalon, MOTS-c, Glutathione, and NAD+ therapies for cellular repair, mitochondrial health, and detoxification.",
        href: "/categories/longevity-anti-aging",
      },
      {
        title: "Hormonal Health",
        description:
          "HCG, Gonadorelin, and Kisspeptin for fertility, testosterone optimization, and hormonal balance.",
        href: "/categories/reproductive-hormonal-health",
      },
      {
        title: "Blood Testing & Analysis",
        description:
          "Comprehensive biomarker panels analyzing 100+ markers — with insurance verification available at no cost.",
        href: "/categories/blood-testing-analysis",
      },
    ],
  },

  valueProps: [
    {
      title: "Physician-Directed",
      description:
        "Every order reviewed by a licensed physician. Provider approval required before anything is dispensed.",
    },
    {
      title: "Medical-Grade Products",
      description:
        "Compounded in FDA-registered 503A/503B pharmacies with COA-verified purity. Not \"for research only.\"",
    },
    {
      title: "Local Presence",
      description:
        "Headquartered right here on Seacrest Blvd in Boynton Beach. A real office with a real team you can reach.",
    },
    {
      title: "Insurance-Eligible Testing",
      description:
        "Blood testing panels that may be covered by your insurance. We verify your benefits at no cost to you.",
    },
  ],

  cta: {
    headline: "Ready to Get Started?",
    subheadline:
      "Browse our full catalog, add products to your list, and submit an inquiry. A licensed physician will review your selections within 24 hours — no commitment required.",
    primaryLabel: "Browse the Catalog",
    primaryHref: "/products",
    secondaryLabel: "How It Works",
    secondaryHref: "/how-it-works",
  },

  geo: {
    latitude: 26.5253,
    longitude: -80.0711,
  },

  areaServed: [
    "Boynton Beach",
    "Delray Beach",
    "Boca Raton",
    "Lake Worth",
    "Lantana",
    "West Palm Beach",
    "Deerfield Beach",
    "Pompano Beach",
  ],
};
