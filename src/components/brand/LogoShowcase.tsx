import { Download } from "lucide-react";

interface SvgCardProps {
  src: string;
  label: string;
  variant: "dark" | "light";
}

function SvgCard({ src, label, variant }: SvgCardProps) {
  const bgClass = variant === "dark" ? "bg-brand-black" : "bg-white";

  return (
    <div className="group border border-brand-border hover:border-brand-gold/30 transition-colors">
      <div className={`${bgClass} py-8 px-10 flex items-center justify-center overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`AW Therapeutics logo — ${label}`}
          className="h-10 md:h-14 w-auto"
        />
      </div>
      <div className="px-4 py-3 flex items-center justify-between border-t border-brand-border">
        <span className="text-caption text-brand-silver">{label}</span>
        <a
          href={src}
          download
          className="text-brand-silver-dark hover:text-brand-gold transition-colors"
          title={`Download ${label}`}
        >
          <Download className="w-4 h-4" aria-hidden />
          <span className="sr-only">Download {label}</span>
        </a>
      </div>
    </div>
  );
}

export function LogoShowcase() {
  return (
    <section>
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
        Logo
      </h2>
      <p className="mt-3 text-body-sm text-brand-silver text-center max-w-2xl mx-auto">
        The AW Therapeutics wordmark features a custom ligature where the A and W
        share a stroke — creating a distinctive, ownable mark. Transparent
        background, outline only. Available in two colorways.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <SvgCard
          src="/images/brand/logo-primary.svg"
          label="Primary — White (for dark backgrounds)"
          variant="dark"
        />
        <SvgCard
          src="/images/brand/logo-inverse.svg"
          label="Inverse — Black (for light backgrounds)"
          variant="light"
        />
      </div>

      <div className="mt-10 border border-brand-border bg-brand-grey-900/30 p-6 sm:p-8">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-4">
          Usage Rules
        </h3>
        <ul className="space-y-3 text-body-sm text-brand-silver">
          <li className="flex items-start gap-3">
            <span className="text-brand-gold shrink-0 mt-0.5">01</span>
            Always use the SVG. Transparent background, outline only — no
            baked-in backgrounds.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold shrink-0 mt-0.5">02</span>
            Always maintain generous clear space around the logo — at minimum the
            height of the &ldquo;A&rdquo; on all sides.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold shrink-0 mt-0.5">03</span>
            Never alter the ligature connection between A and W. The shared
            stroke is the defining feature.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold shrink-0 mt-0.5">04</span>
            Do not rotate, stretch, add effects, or place the logo on busy
            backgrounds without sufficient contrast.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold shrink-0 mt-0.5">05</span>
            Only use the two approved colorways: white (primary) and
            black (inverse). No other color combinations.
          </li>
        </ul>
      </div>
    </section>
  );
}
