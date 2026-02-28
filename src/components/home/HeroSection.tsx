"use client";

import { ArrowRight, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "@/components/home/HeroBackground";
import {
  HERO_HEADLINE,
  HERO_SUBHEADLINE,
  HERO_CTA_PRIMARY,
  HERO_CTA_SECONDARY,
  TRUST_MICRO,
} from "@/data/copy";

function TrustMicroBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10">
      {TRUST_MICRO.map((item, i) => (
        <span key={item} className="flex items-center gap-2 text-caption tracking-wider uppercase text-brand-silver-dark">
          {i > 0 && (
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-brand-gold" aria-hidden />
          )}
          {item}
        </span>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-brand-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-brand-white uppercase whitespace-pre-line leading-[1.1]">
            {HERO_HEADLINE}
          </h1>
          <p className="mt-6 text-body text-brand-silver max-w-lg">
            {HERO_SUBHEADLINE}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <ButtonLink
              href="/products"
              variant="cta"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              {HERO_CTA_PRIMARY}
            </ButtonLink>
            <ButtonLink
              href="/about"
              variant="secondary"
              size="lg"
              icon={PlayCircle}
              iconPosition="left"
            >
              {HERO_CTA_SECONDARY}
            </ButtonLink>
          </div>
          <TrustMicroBar />
        </div>
      </div>
    </section>
  );
}
