import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { AwDifference } from "@/components/home/AwDifference";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { ValueProps } from "@/components/home/ValueProps";
import { CtaSection } from "@/components/home/CtaSection";
import { getOgImageMetadata } from "@/lib/og";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  ...getOgImageMetadata({
    slug: "home",
    title: "AW Therapeutics | Advanced Therapeutics",
    description:
      "AW Therapeutics advanced therapeutics catalog. Medical Grade compounds for weight management, recovery, longevity, and hormonal health. Browse, compare, submit inquiries. Provider-guided, precision formulated.",
  }),
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
