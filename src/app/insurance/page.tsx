import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { InsurancePageContent } from "@/components/insurance/InsurancePageContent";
import { JsonLd, medicalWebPageJsonLd } from "@/lib/structured-data";
import { getOgImageMetadata } from "@/lib/og";

const PAGE_TITLE = "Insurance Verification — Blood Testing Coverage";
const PAGE_DESCRIPTION =
  "Check if your health insurance covers comprehensive blood testing and biomarker screening. Our team verifies your benefits at no cost or obligation — so you can understand your body and optimize your health with precision-guided therapeutics.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/insurance" },
  ...getOgImageMetadata({
    slug: "insurance",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  }),
};

export default function InsurancePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd
        data={medicalWebPageJsonLd({
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          url: "/insurance",
        })}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Insurance Verification" },
        ]}
      />
      <div className="mt-8">
        <InsurancePageContent />
      </div>
    </div>
  );
}
