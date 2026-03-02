import { boyntonBeach } from "./boynton-beach";

export interface LpAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface LpServiceItem {
  title: string;
  description: string;
  href: string;
}

export interface LandingPageData {
  slug: string;
  cityName: string;
  stateAbbr: string;
  tagline: string;

  meta: {
    title: string;
    description: string;
  };

  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
  };

  localTrust: {
    headline: string;
    subheadline: string;
    address: LpAddress;
    phone: string;
    nearbyRoads: string[];
    neighborhoods: string[];
  };

  services: {
    headline: string;
    subheadline: string;
    items: LpServiceItem[];
  };

  valueProps: {
    title: string;
    description: string;
  }[];

  cta: {
    headline: string;
    subheadline: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };

  geo: {
    latitude: number;
    longitude: number;
  };

  areaServed: string[];
}

const landingPages: LandingPageData[] = [boyntonBeach];

export function getLandingPage(slug: string): LandingPageData | undefined {
  return landingPages.find((lp) => lp.slug === slug);
}

export function getAllLandingPageSlugs(): string[] {
  return landingPages.map((lp) => lp.slug);
}

export { landingPages };
