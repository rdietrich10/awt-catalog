import { LogoShowcase } from "./LogoShowcase";
import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { DesignPrinciples } from "./DesignPrinciples";
import { UIPatterns } from "./UIPatterns";
import { BrandVoice } from "./BrandVoice";

export function BrandContent() {
  return (
    <div className="space-y-16 md:space-y-24">
      <div className="border-l-2 border-brand-gold pl-6 max-w-3xl">
        <p className="text-body text-brand-silver leading-relaxed">
          AW Therapeutics is a physician-directed medical practice — not a retail
          peptide company. Our brand communicates clinical legitimacy, precision,
          and trust through a disciplined monochrome aesthetic with gold accents.
        </p>
        <p className="mt-4 text-body text-brand-silver leading-relaxed">
          These guidelines ensure consistency across all touchpoints — from our
          digital catalog to partner communications and marketing materials.
        </p>
      </div>

      <LogoShowcase />
      <ColorPalette />
      <Typography />
      <DesignPrinciples />
      <UIPatterns />
      <BrandVoice />

      <section className="border-t border-brand-border pt-16 pb-8 text-center">
        <p className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
          Questions About Our Brand?
        </p>
        <p className="mt-3 text-body-sm text-brand-silver max-w-lg mx-auto">
          For asset requests, co-branding inquiries, or brand usage questions,
          reach out to our team.
        </p>
        <p className="mt-4 text-body-sm text-brand-gold">
          info@awclinics.com
        </p>
      </section>
    </div>
  );
}
