import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BrandContent } from "@/components/brand/BrandContent";

export const metadata: Metadata = {
  title: "Brand Guidelines — AW Therapeutics",
  description:
    "Official brand guidelines for AW Therapeutics. Logo assets, color palette, typography, and design principles for partners and collaborators.",
  alternates: { canonical: "/brand" },
};

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Brand Guidelines" },
        ]}
      />
      <div className="mt-8">
        <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-white mb-6">
          Brand Guidelines
        </h1>
        <p className="font-display text-caption tracking-widest uppercase text-brand-gold mb-8">
          Identity, Assets & Design System
        </p>
        <BrandContent />
      </div>
    </div>
  );
}
