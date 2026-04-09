"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CTA_SECTION_HEADLINE, CTA_SECTION_SUBHEADLINE } from "@/data/copy";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-brand-border bg-brand-grey-900/30 p-8 sm:p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-gold/5 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-2xl md:text-4xl font-medium tracking-tight text-brand-white uppercase">
              {CTA_SECTION_HEADLINE}
            </h2>
            <p className="mt-4 text-body text-brand-silver max-w-lg mx-auto">
              {CTA_SECTION_SUBHEADLINE}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink
                href="/products"
                variant="cta"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Browse Products
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
              >
                Contact Us
              </ButtonLink>
            </div>
            <p className="mt-6 text-body-sm text-brand-silver-dark">
              New to peptide therapy?{" "}
              <Link
                href="/contact"
                className="text-brand-silver underline underline-offset-2 hover:text-brand-white transition-colors"
              >
                Our team will walk you through everything — no prior knowledge required.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
