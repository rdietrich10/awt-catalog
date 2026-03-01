export function Typography() {
  return (
    <section className="border-t border-brand-border pt-16">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
        Typography
      </h2>
      <p className="mt-3 text-body-sm text-brand-silver text-center max-w-2xl mx-auto">
        Two typefaces — one for display, one for body. Clean, geometric, and
        legible at every scale.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-brand-border p-6 sm:p-8">
          <p className="text-caption tracking-widest uppercase text-brand-gold mb-4">
            Display
          </p>
          <p className="font-display text-4xl md:text-5xl tracking-tight text-brand-white mb-4">
            Space Grotesk
          </p>
          <p className="font-display text-body-sm text-brand-silver leading-relaxed">
            Used for headlines, section titles, navigation, and labels.
            Geometric sans-serif with a technical, modern feel. Tracked tight
            for headlines, wide for labels.
          </p>
          <div className="mt-6 border-t border-brand-border pt-4">
            <p className="font-display text-3xl text-brand-white uppercase tracking-tight">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
            <p className="font-display text-xl text-brand-silver mt-2">
              abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
          </div>
        </div>

        <div className="border border-brand-border p-6 sm:p-8">
          <p className="text-caption tracking-widest uppercase text-brand-gold mb-4">
            Body
          </p>
          <p className="font-body text-4xl md:text-5xl tracking-tight text-brand-white mb-4">
            Inter
          </p>
          <p className="font-body text-body-sm text-brand-silver leading-relaxed">
            Used for body copy, descriptions, supporting text, and UI elements.
            Highly legible at small sizes with a neutral, professional tone that
            lets content breathe.
          </p>
          <div className="mt-6 border-t border-brand-border pt-4">
            <p className="font-body text-2xl text-brand-white">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
            <p className="font-body text-lg text-brand-silver mt-2">
              abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-brand-border p-6 sm:p-8">
        <p className="text-caption tracking-widest uppercase text-brand-gold mb-6">
          Type Scale
        </p>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-brand-border pb-4">
            <span className="text-caption text-brand-silver-dark font-mono shrink-0 w-28">body — 1rem</span>
            <p className="text-body text-brand-white">
              Advanced therapeutics through physician-directed care.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-brand-border pb-4">
            <span className="text-caption text-brand-silver-dark font-mono shrink-0 w-28">body-sm</span>
            <p className="text-body-sm text-brand-white">
              Advanced therapeutics through physician-directed care.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-brand-border pb-4">
            <span className="text-caption text-brand-silver-dark font-mono shrink-0 w-28">label</span>
            <p className="text-label text-brand-white">
              Advanced therapeutics through physician-directed care.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <span className="text-caption text-brand-silver-dark font-mono shrink-0 w-28">caption</span>
            <p className="text-caption text-brand-white">
              Advanced therapeutics through physician-directed care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
