import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LandingPageData } from "@/data/lp";

interface LpServicesProps {
  services: LandingPageData["services"];
}

export function LpServices({ services }: LpServicesProps) {
  return (
    <section className="py-16 md:py-24 border-b border-brand-border">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
          {services.headline}
        </h2>
        <p className="mt-4 text-body text-brand-silver max-w-2xl mx-auto leading-relaxed">
          {services.subheadline}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.items.map(({ title, description, href }) => (
          <Link
            key={title}
            href={href}
            className="group border border-brand-border p-6 hover:border-brand-gold/30 transition-colors"
          >
            <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-3 flex items-center justify-between">
              {title}
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold"
                aria-hidden
              />
            </h3>
            <p className="text-body-sm text-brand-silver leading-relaxed">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
