"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function AboutCta() {
  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-4">
      <ButtonLink
        href="/products"
        variant="cta"
        size="lg"
        icon={ArrowRight}
        iconPosition="right"
      >
        Start Your Inquiry
      </ButtonLink>
      <ButtonLink href="/contact" variant="secondary" size="lg">
        Contact Us
      </ButtonLink>
    </div>
  );
}
