import {
  Layers,
  Sparkles,
  Eye,
  Shield,
  Minimize2,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PrincipleProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const principles: PrincipleProps[] = [
  {
    icon: Minimize2,
    title: "Monochrome First",
    description:
      "Our visual foundation is strictly monochromatic — black, white, silver. Gold accents are used sparingly and intentionally to signal importance, CTAs, or trust markers. Never introduce arbitrary color.",
  },
  {
    icon: Sparkles,
    title: "Luxury Pharmaceutical",
    description:
      "The aesthetic bridges clinical precision with high-end consumer design. Think Aesop meets Porsche Design meets Apple. Every surface, shadow, and spacing decision conveys quality and trust.",
  },
  {
    icon: Eye,
    title: "Typography-Led",
    description:
      "Type does the heavy lifting. Headlines use Space Grotesk — geometric, uppercase, tightly tracked. Labels are small, widely tracked, and gold. Body copy in Inter stays neutral and legible.",
  },
  {
    icon: Layers,
    title: "Systematic & Token-Driven",
    description:
      "No hardcoded styles. Every color, font, spacing, and shadow maps to a design token in Tailwind. Components are composable. Consistency is enforced at the config level, not by convention alone.",
  },
  {
    icon: Shield,
    title: "Clinical Legitimacy",
    description:
      "Every visual choice reinforces that this is physician-directed healthcare — not retail e-commerce. Borders are subtle, layouts are generous, and the overall density is intentionally low to convey authority.",
  },
  {
    icon: Zap,
    title: "Performance as Design",
    description:
      "Fast load times, optimized images, and minimal JavaScript are part of the brand experience. A sluggish interface would undermine the precision our brand communicates.",
  },
];

function PrincipleCard({ icon: Icon, title, description }: PrincipleProps) {
  return (
    <div className="border border-brand-border p-6 hover:border-brand-gold/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border">
          <Icon className="w-5 h-5 text-brand-gold" aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg uppercase tracking-wider text-brand-white">
            {title}
          </h3>
          <p className="mt-2 text-body-sm text-brand-silver leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DesignPrinciples() {
  return (
    <section className="border-t border-brand-border pt-16">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
        Design Principles
      </h2>
      <p className="mt-3 text-body-sm text-brand-silver text-center max-w-2xl mx-auto">
        Six guiding principles that shape every design decision across the AW
        Therapeutics brand.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((p) => (
          <PrincipleCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
