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
    logo: `${BASE_URL}/images/brand/logo-inverse.svg`,
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
        url: `${BASE_URL}/images/brand/logo-inverse.svg`,
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

export function productItemListJsonLd(productList: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Product Catalog",
    numberOfItems: productList.length,
    itemListElement: productList.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${BASE_URL}/products/${p.slug}`,
      image: p.image ? `${BASE_URL}${p.image}` : undefined,
    })),
  };
}

export function articleItemListJsonLd(articleList: Article[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Articles",
    numberOfItems: articleList.length,
    itemListElement: articleList.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: `${BASE_URL}/knowledge/articles/${a.slug}`,
    })),
  };
}

export function collectionPageJsonLd(
  category: { name: string; slug: string; description: string },
  categoryProducts: Product[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `${BASE_URL}/categories/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryProducts.length,
      itemListElement: categoryProducts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${BASE_URL}/products/${p.slug}`,
        image: p.image ? `${BASE_URL}${p.image}` : undefined,
      })),
    },
  };
}

export function medicalWebPageJsonLd(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: page.name,
    description: page.description,
    url: `${BASE_URL}${page.url}`,
    specialty: {
      "@type": "MedicalSpecialty",
      name: "Pharmaceutical Therapeutics",
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
  };
}

export function howToJsonLd(steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Get Started with AW Therapeutics",
    description:
      "Three-step process to access physician-directed advanced therapeutics through AW Therapeutics.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export interface LocalBusinessConfig {
  name: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
  services: { name: string; url: string }[];
}

export function localBusinessJsonLd(config: LocalBusinessConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BASE_URL}/#${config.address.addressLocality.toLowerCase().replace(/\s+/g, "-")}`,
    name: config.name,
    url: `${BASE_URL}${config.url}`,
    telephone: config.telephone,
    email: config.email,
    logo: `${BASE_URL}/images/brand/logo-inverse.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.streetAddress,
      addressLocality: config.address.addressLocality,
      addressRegion: config.address.addressRegion,
      postalCode: config.address.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.geo.latitude,
      longitude: config.geo.longitude,
    },
    areaServed: config.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Therapeutic Products & Services",
      itemListElement: config.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalTherapy",
          name: s.name,
          url: `${BASE_URL}${s.url}`,
        },
      })),
    },
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Pharmaceutical Therapeutics",
    },
    isAcceptingNewPatients: true,
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
