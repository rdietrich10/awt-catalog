import { MapPin, Phone, Navigation } from "lucide-react";
import type { LandingPageData } from "@/data/lp";

interface LpLocalTrustProps {
  localTrust: LandingPageData["localTrust"];
  valueProps: LandingPageData["valueProps"];
}

export function LpLocalTrust({ localTrust, valueProps }: LpLocalTrustProps) {
  const { address } = localTrust;
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;

  return (
    <section className="py-16 md:py-24 border-b border-brand-border">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
          {localTrust.headline}
        </h2>
        <p className="mt-4 text-body text-brand-silver max-w-2xl mx-auto leading-relaxed">
          {localTrust.subheadline}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="border border-brand-border p-8">
          <div className="flex items-start gap-3 mb-6">
            <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">
                Office Location
              </h3>
              <p className="text-body-sm text-brand-silver leading-relaxed">
                {fullAddress}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-1">
                Phone
              </h3>
              <a
                href={`tel:${localTrust.phone.replace(/\D/g, "")}`}
                className="text-body-sm text-brand-silver hover:text-brand-white transition-colors"
              >
                {localTrust.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Navigation className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-2">
                Nearby
              </h3>
              <ul className="space-y-1.5">
                {localTrust.nearbyRoads.map((road) => (
                  <li
                    key={road}
                    className="text-body-sm text-brand-silver-dark leading-relaxed"
                  >
                    {road}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-brand-border p-8">
          <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-4">
            Neighborhoods We Serve
          </h3>
          <div className="flex flex-wrap gap-2">
            {localTrust.neighborhoods.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 border border-brand-border text-body-sm text-brand-silver"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueProps.map(({ title, description }) => (
          <div
            key={title}
            className="border border-brand-border p-6 hover:border-brand-gold/30 transition-colors"
          >
            <h3 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-2">
              {title}
            </h3>
            <p className="text-body-sm text-brand-silver leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
