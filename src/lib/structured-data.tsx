import {
  COMPANY_NAME,
  COMPANY_LEGAL_NAME,
  COMPANY_ADDRESS,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_WEBSITE,
} from "@/data/company";
import type { Product, Article, FAQ } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://localhost:3000");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: COMPANY_WEBSITE,
    logo: `${BASE_URL}/images/americare-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2828 S Seacrest Blvd #213",
      addressLocality: "Boynton Beach",
      addressRegion: "FL",
      postalCode: "33435",
      addressCountry: "US",
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.image ? `${BASE_URL}${product.image}` : undefined,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: COMPANY_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateCreated,
    dateModified: article.dateUpdated,
    image: article.image ? `${BASE_URL}${article.image}` : undefined,
    author: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/americare-logo.png`,
      },
    },
  };
}

export function faqPageJsonLd(items: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
