import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About — Physician-Directed Care",
  description:
    "AW Therapeutics is a physician-directed medical practice delivering advanced therapeutics through a structured clinical process with medical oversight, documented records, and continuity of care.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <div className="mt-8">
        <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-white mb-6">
          About AW Therapeutics
        </h1>
        <p className="font-display text-caption tracking-widest uppercase text-brand-gold mb-8">
          Physician-Directed Healthcare — Not a Peptide Shop
        </p>
        <AboutContent />
      </div>
    </div>
  );
}
