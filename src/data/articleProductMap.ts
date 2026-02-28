import { products } from "@/data/products";
import { articles } from "@/data/articles";
import type { Product, Article } from "@/types";

/**
 * Maps each article slug to the category slugs (and optionally specific
 * product slugs) it is related to.  When `categorySlugs` contains "*",
 * the article is treated as relevant to every injectable/peptide category.
 */
interface ArticleMapping {
  categorySlugs: string[];
  productSlugs?: string[];
}

const INJECTABLE_CATEGORIES = [
  "weight-management",
  "growth-hormone-recomposition",
  "healing-tissue-recovery",
  "reproductive-hormonal-health",
  "longevity-anti-aging",
  "wellness-mood",
  "sleep-detox",
];

const articleProductMap: Record<string, ArticleMapping> = {
  "peptide-regulation-2026": {
    categorySlugs: INJECTABLE_CATEGORIES,
  },
  "intro-peptides": {
    categorySlugs: INJECTABLE_CATEGORIES,
  },
  "safety-protocols": {
    categorySlugs: INJECTABLE_CATEGORIES,
  },
  "stacking-guide": {
    categorySlugs: [
      "growth-hormone-recomposition",
      "healing-tissue-recovery",
      "longevity-anti-aging",
    ],
  },
  "glp-1-overview": {
    categorySlugs: ["weight-management"],
    productSlugs: [
      "glp-1-semaglutide",
      "glp-1-tirzepatide",
      "glp-1-retatrutide",
    ],
  },
  "healing-peptides": {
    categorySlugs: ["healing-tissue-recovery"],
    productSlugs: ["bpc-157", "tb-500", "wolverine"],
  },
  "longevity-protocols": {
    categorySlugs: ["longevity-anti-aging"],
    productSlugs: ["epithalon", "mots-c", "dsip"],
  },
  "why-annual-biomarker-screening-matters": {
    categorySlugs: ["blood-testing-analysis"],
  },
  "understanding-blood-biomarkers": {
    categorySlugs: ["blood-testing-analysis"],
  },
  "precision-blood-testing-healthcare": {
    categorySlugs: ["blood-testing-analysis"],
    productSlugs: ["comprehensive-100-biomarker-panel"],
  },
};

const MAX_PRODUCTS = 20;
const MAX_ARTICLES = 6;

export function getProductsForArticle(articleSlug: string): Product[] {
  const mapping = articleProductMap[articleSlug];
  if (!mapping) return [];

  const matched = new Map<string, Product>();

  if (mapping.productSlugs) {
    for (const slug of mapping.productSlugs) {
      const p = products.find((prod) => prod.slug === slug);
      if (p) matched.set(p.slug, p);
    }
  }

  for (const catSlug of mapping.categorySlugs) {
    for (const p of products) {
      if (p.categorySlug === catSlug && !matched.has(p.slug)) {
        matched.set(p.slug, p);
      }
    }
  }

  return Array.from(matched.values()).slice(0, MAX_PRODUCTS);
}

export function getArticlesForProduct(product: Product): Article[] {
  const result: Article[] = [];

  for (const article of articles) {
    const mapping = articleProductMap[article.slug];
    if (!mapping) continue;

    const byProduct =
      mapping.productSlugs?.includes(product.slug) ?? false;
    const byCategory = mapping.categorySlugs.includes(product.categorySlug);

    if (byProduct || byCategory) {
      result.push(article);
    }
  }

  return result.slice(0, MAX_ARTICLES);
}
