import {
  Stethoscope,
  FileText,
  Monitor,
  HeartPulse,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import {
  AW_DIFFERENCE_HEADLINE,
  AW_DIFFERENCE_SUBHEADLINE,
  AW_DIFFERENCE_ITEMS,
} from "@/data/copy";

const icons = [Stethoscope, FileText, Monitor, HeartPulse, ShieldCheck, RefreshCw] as const;

function DifferentiatorCard({ index }: { index: number }) {
  const item = AW_DIFFERENCE_ITEMS[index];
  const Icon = icons[index];

  return (
    <div className="group relative border border-brand-border rounded-sm p-6 hover:border-brand-gold/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border group-hover:border-brand-gold/40 transition-colors">
          <Icon className="w-5 h-5 text-brand-gold" aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
            {item.title}
          </h3>
          <p className="mt-2 text-body-sm text-brand-silver leading-relaxed">
            {item.aw}
          </p>
          <p className="mt-2 text-caption text-brand-silver-dark italic">
            {item.contrast}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AwDifference() {
  return (
    <section className="py-16 md:py-24 border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-display text-caption tracking-widest uppercase text-brand-gold mb-4">
            The AW Difference
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase">
            {AW_DIFFERENCE_HEADLINE}
          </h2>
          <p className="mt-4 text-body text-brand-silver">
            {AW_DIFFERENCE_SUBHEADLINE}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AW_DIFFERENCE_ITEMS.map((_, i) => (
            <DifferentiatorCard key={i} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-body-sm text-brand-silver max-w-2xl mx-auto border-t border-brand-border pt-8">
            &ldquo;AW Therapeutics is not a retail peptide company. We are a
            physician-directed medical practice delivering advanced therapeutics
            through a structured clinical process.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
