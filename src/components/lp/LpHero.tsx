import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { LandingPageData } from "@/data/lp";

interface LpHeroProps {
  hero: LandingPageData["hero"];
}

export function LpHero({ hero }: LpHeroProps) {
  return (
    <section className="relative border-b border-brand-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="flex flex-col justify-center py-16 md:py-24 lg:pr-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-brand-gold/30 bg-brand-gold/[0.05] w-fit mb-8">
            <MapPin className="w-4 h-4 text-brand-gold" aria-hidden />
            <span className="text-caption font-display tracking-widest uppercase text-brand-gold">
              {hero.badge}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-brand-white leading-tight whitespace-pre-line">
            {hero.headline}
          </h1>

          <p className="mt-6 text-body text-brand-silver max-w-xl leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="mt-8">
            <ButtonLink href={hero.ctaHref} variant="cta" size="lg">
              {hero.ctaLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="hidden lg:block relative min-h-[400px]">
          <PlaceholderImage
            src={hero.image}
            aspectRatio="full"
            label="Downtown"
            context="City"
            sizes="50vw"
            priority
            className="h-full border-0 rounded-none"
          />
        </div>
      </div>
    </section>
  );
}
