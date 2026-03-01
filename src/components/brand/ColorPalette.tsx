interface SwatchProps {
  name: string;
  hex: string;
  textClass?: string;
}

function Swatch({ name, hex, textClass = "text-brand-white" }: SwatchProps) {
  return (
    <div className="border border-brand-border overflow-hidden">
      <div
        className="h-20 sm:h-24"
        style={{ backgroundColor: hex }}
      />
      <div className="px-3 py-2">
        <p className={`text-caption font-display tracking-wider ${textClass}`}>{name}</p>
        <p className="text-caption text-brand-silver-dark font-mono">{hex}</p>
      </div>
    </div>
  );
}

function GradientSwatch({ name, gradient }: { name: string; gradient: string }) {
  return (
    <div className="border border-brand-border overflow-hidden">
      <div
        className="h-20 sm:h-24"
        style={{ background: gradient }}
      />
      <div className="px-3 py-2">
        <p className="text-caption font-display tracking-wider text-brand-white">{name}</p>
        <p className="text-caption text-brand-silver-dark">Gradient</p>
      </div>
    </div>
  );
}

export function ColorPalette() {
  return (
    <section className="border-t border-brand-border pt-16">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
        Color Palette
      </h2>
      <p className="mt-3 text-body-sm text-brand-silver text-center max-w-2xl mx-auto">
        Our palette is rooted in monochrome with gold accents. No arbitrary
        colors — every value is a design token in our system.
      </p>

      <div className="mt-10">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-6">
          Core
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch name="Black" hex="#090D0B" />
          <Swatch name="White" hex="#FAFAFA" textClass="text-brand-black" />
          <Swatch name="Grey 900" hex="#111111" />
          <Swatch name="Grey 500" hex="#333333" />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-6">
          Silver Scale
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch name="Silver Light" hex="#E8E8E8" textClass="text-brand-black" />
          <Swatch name="Silver" hex="#B8B8B8" textClass="text-brand-black" />
          <Swatch name="Silver Dark" hex="#787878" />
          <Swatch name="Silver Dim" hex="#585858" />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-6">
          Gold Accents
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch name="Gold Light" hex="#F4D03F" textClass="text-brand-black" />
          <Swatch name="Gold" hex="#D4AF37" textClass="text-brand-black" />
          <Swatch name="Gold Dark" hex="#B8860B" />
          <Swatch name="Gold Dim" hex="#8B6914" />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-6">
          Gradients
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GradientSwatch
            name="Silver Gradient"
            gradient="linear-gradient(135deg, #e8e8e8 0%, #b8b8b8 35%, #787878 70%, #b8b8b8 100%)"
          />
          <GradientSwatch
            name="Gold Gradient"
            gradient="linear-gradient(135deg, #f4d03f 0%, #d4af37 40%, #b8860b 80%, #d4af37 100%)"
          />
        </div>
      </div>
    </section>
  );
}
