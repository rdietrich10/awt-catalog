import { LpHero } from "./LpHero";
import { LpLocalTrust } from "./LpLocalTrust";
import { LpServices } from "./LpServices";
import { LpHowItWorks } from "./LpHowItWorks";
import { LpCta } from "./LpCta";
import type { LandingPageData } from "@/data/lp";

interface LpPageContentProps {
  data: LandingPageData;
}

export function LpPageContent({ data }: LpPageContentProps) {
  return (
    <>
      <LpHero hero={data.hero} />
      <LpLocalTrust localTrust={data.localTrust} valueProps={data.valueProps} />
      <LpServices services={data.services} />
      <LpHowItWorks />
      <LpCta cta={data.cta} />
    </>
  );
}
