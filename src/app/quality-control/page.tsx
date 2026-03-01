import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { QualityReportGrid } from "@/components/quality/QualityReportGrid";
import { getOgImageMetadata } from "@/lib/og";

export const metadata: Metadata = {
  title: "Quality Control",
  description:
    "Third-party Certificates of Analysis and Exotoxin Test Reports verifying the quality, purity, potency, and sterility of AW Therapeutics compounds.",
  alternates: { canonical: "/quality-control" },
  ...getOgImageMetadata({
    slug: "quality-control",
    title: "Quality Control",
    description:
      "Third-party Certificates of Analysis and Exotoxin Test Reports verifying the quality, purity, potency, and sterility of AW Therapeutics compounds.",
  }),
};

const coaReports = [
  { src: "/images/quality/coa/COA_Sermorelin-10.webp", label: "Sermorelin 10mg" },
  { src: "/images/quality/coa/COA_Sema-20mg.webp", label: "Semaglutide 20mg" },
  { src: "/images/quality/coa/COA_Retatrutide.webp", label: "Retatrutide" },
  { src: "/images/quality/coa/COA_CJC-NoDac-10.webp", label: "CJC-1295 No DAC 10mg" },
  { src: "/images/quality/coa/COA_Tirzepatide-60mg.webp", label: "Tirzepatide 60mg" },
  { src: "/images/quality/coa/COA_Tirzepatide-30mg.webp", label: "Tirzepatide 30mg" },
  { src: "/images/quality/coa/COA_Ipamorelin-10mg.webp", label: "Ipamorelin 10mg" },
  { src: "/images/quality/coa/COA_Tesamorelin-10mg.webp", label: "Tesamorelin 10mg" },
];

const exotoxinReports = [
  { src: "/images/quality/exotoxin/ET_Ipamorelin-10mg.webp", label: "Ipamorelin 10mg" },
  { src: "/images/quality/exotoxin/ET_Sermorelin-10mg.webp", label: "Sermorelin 10mg" },
  { src: "/images/quality/exotoxin/ET_Tirz-60.webp", label: "Tirzepatide 60mg" },
];

export default function QualityControlPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Quality Control" },
        ]}
      />

      <div className="mt-8">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          Quality Control & Chain of Custody
        </h1>
        <p className="text-body-sm text-brand-silver mb-12 max-w-3xl">
          AW Therapeutics partners with independent, third-party laboratories
          to verify the quality, purity, potency, and sterility of every
          compounded medication we offer. Below you will find Certificates of
          Analysis (COA) and Exotoxin Test Reports that document our commitment
          to safety and transparency.
        </p>

        <section className="mb-16">
          <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-2">
            Certificates of Analysis (COA)
          </h2>
          <p className="text-body-sm text-brand-silver mb-6 max-w-2xl">
            Each COA confirms the identity, purity, and potency of the active
            ingredient as tested by an accredited laboratory.
          </p>
          <QualityReportGrid reports={coaReports} />
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-2">
            Exotoxin Test Reports
          </h2>
          <p className="text-body-sm text-brand-silver mb-6 max-w-2xl">
            Exotoxin testing verifies the absence of harmful bacterial
            endotoxins, ensuring each product meets strict safety standards
            before distribution.
          </p>
          <QualityReportGrid reports={exotoxinReports} />
        </section>

        <Link
          href="/"
          className="mt-12 inline-block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
