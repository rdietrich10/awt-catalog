import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LpPageContent } from "@/components/lp/LpPageContent";
import {
  JsonLd,
  localBusinessJsonLd,
  breadcrumbJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/structured-data";
import { getOgImageMetadata } from "@/lib/og";
import {
  getLandingPage,
  getAllLandingPageSlugs,
} from "@/data/lp";
import {
  COMPANY_PHONE,
  COMPANY_EMAIL,
} from "@/data/company";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLandingPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getLandingPage(slug);
  if (!data) return {};

  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: `/lp/${data.slug}` },
    ...getOgImageMetadata({
      slug: `lp-${data.slug}`,
      title: data.meta.title,
      description: data.meta.description,
    }),
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getLandingPage(slug);
  if (!data) notFound();

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: `${data.cityName}, ${data.stateAbbr}`, url: `/lp/${data.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd
        data={localBusinessJsonLd({
          name: `AW Therapeutics — ${data.cityName}`,
          url: `/lp/${data.slug}`,
          telephone: COMPANY_PHONE,
          email: COMPANY_EMAIL,
          address: {
            streetAddress: data.localTrust.address.street,
            addressLocality: data.localTrust.address.city,
            addressRegion: data.localTrust.address.state,
            postalCode: data.localTrust.address.zip,
          },
          geo: data.geo,
          areaServed: data.areaServed,
          services: data.services.items.map((s) => ({
            name: s.title,
            url: s.href,
          })),
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd
        data={medicalWebPageJsonLd({
          name: data.meta.title,
          description: data.meta.description,
          url: `/lp/${data.slug}`,
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: `${data.cityName}, ${data.stateAbbr}` },
        ]}
      />

      <div className="mt-8">
        <LpPageContent data={data} />
      </div>
    </div>
  );
}
