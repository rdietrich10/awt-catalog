import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { AwDifference } from "@/components/home/AwDifference";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { ValueProps } from "@/components/home/ValueProps";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorksPreview />
      <AwDifference />
      <FeaturedProducts />
      <CategoryShowcase />
      <ValueProps />
      <CtaSection />
    </>
  );
}
