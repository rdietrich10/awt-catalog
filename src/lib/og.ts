import type { Metadata } from "next";

interface OgImageConfig {
  slug: string;
  title: string;
  description: string;
}

const OG_BASE_PATH = "/images/og";
const FALLBACK_IMAGE = "/images/og-image.png";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const PAGE_OG_MAP: Record<string, string> = {
  home: "og-home.png",
  products: "og-products.png",
  about: "og-about.png",
  "how-it-works": "og-how-it-works.png",
  knowledge: "og-knowledge.png",
  contact: "og-contact.png",
  "quality-control": "og-quality.png",
  categories: "og-categories.png",
  privacy: "og-privacy.png",
  faq: "og-faq.png",
  "lp-boynton-beach": "og-lp-boynton-beach.png",
};

/**
 * Parent slug fallback map for dynamic pages.
 * product detail -> products, category detail -> categories, article -> knowledge
 */
const PARENT_FALLBACK: Record<string, string> = {
  "products-detail": "products",
  "categories-detail": "categories",
  "articles-detail": "knowledge",
};

function resolveOgImageUrl(slug: string): string {
  const direct = PAGE_OG_MAP[slug];
  if (direct) return `${OG_BASE_PATH}/${direct}`;

  const parent = PARENT_FALLBACK[slug];
  if (parent) {
    const parentFile = PAGE_OG_MAP[parent];
    if (parentFile) return `${OG_BASE_PATH}/${parentFile}`;
  }

  return FALLBACK_IMAGE;
}

export function getOgImageMetadata({ slug, title, description }: OgImageConfig): Pick<Metadata, "openGraph" | "twitter"> {
  const imageUrl = resolveOgImageUrl(slug);

  return {
    openGraph: {
      images: [
        {
          url: imageUrl,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl],
    },
  };
}
