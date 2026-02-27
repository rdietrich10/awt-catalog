import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function QualityControlPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Quality Control" },
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          Quality Control & Chain of Custody
        </h1>
        <p className="text-body-sm text-brand-silver mb-8">
          Americare Wellness partners with third-party laboratories to verify quality, purity, and absence of contamination for our compounded peptides. Chain of custody reports and certificates of analysis will be available here once provided.
        </p>
        <div className="border border-brand-border p-8 text-center">
          <p className="text-body-sm text-brand-silver-dark">
            Chain of custody reports and certificates of analysis will be posted here. Check back soon.
          </p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
