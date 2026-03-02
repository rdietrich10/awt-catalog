import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { landingPages } from "@/data/lp";

export const metadata: Metadata = {
  title: "Serving South Florida — Local Therapeutics",
  description:
    "AW Therapeutics serves South Florida with physician-directed medical-grade peptides, GLP-1 therapies, and compounded treatments. Find your local landing page.",
  robots: { index: false, follow: true },
};

export default function LandingPagesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-brand-white">
        Serving South Florida
      </h1>
      <p className="mt-4 text-body text-brand-silver max-w-2xl">
        AW Therapeutics is headquartered in Boynton Beach and serves communities
        across South Florida with physician-directed medical-grade therapeutics.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {landingPages.map((lp) => (
          <Link
            key={lp.slug}
            href={`/lp/${lp.slug}`}
            className="group border border-brand-border p-6 hover:border-brand-gold/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin
                size={14}
                className="text-brand-gold"
                aria-hidden
              />
              <h2 className="font-display text-sm uppercase tracking-wider text-brand-gold">
                {lp.cityName}, {lp.stateAbbr}
              </h2>
            </div>
            <p className="text-body-sm text-brand-silver leading-relaxed">
              {lp.tagline}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
