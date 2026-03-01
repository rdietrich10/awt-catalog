import { ButtonLink } from "@/components/ui/Button";

export function UIPatterns() {
  return (
    <section className="border-t border-brand-border pt-16">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
        UI Components
      </h2>
      <p className="mt-3 text-body-sm text-brand-silver text-center max-w-2xl mx-auto">
        Core interaction patterns and component styles used throughout the
        experience.
      </p>

      <div className="mt-10">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-6">
          Buttons
        </h3>
        <div className="border border-brand-border p-6 sm:p-8">
          <div className="flex flex-wrap gap-4 items-center">
            <ButtonLink href="#" variant="primary">Primary (Silver Border)</ButtonLink>
            <ButtonLink href="#" variant="cta">CTA (Gold Border)</ButtonLink>
            <ButtonLink href="#" variant="secondary">Secondary (Ghost)</ButtonLink>
          </div>
          <p className="mt-6 text-body-sm text-brand-silver">
            Buttons use gradient borders rather than solid fills. Silver borders
            for standard actions, gold for primary CTAs. Ghost variants for
            tertiary actions. All buttons include a{" "}
            <span className="font-mono text-caption text-brand-silver-dark">150ms</span>{" "}
            transition.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-6">
          Cards & Containers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-brand-border p-6 hover:border-brand-gold/30 transition-colors">
            <p className="font-display text-lg uppercase tracking-wider text-brand-white mb-2">
              Default Card
            </p>
            <p className="text-body-sm text-brand-silver">
              Subtle border with gold hover state. Used for content blocks,
              product cards, and informational units.
            </p>
          </div>
          <div className="border border-brand-border bg-brand-grey-900/30 p-6">
            <p className="font-display text-lg uppercase tracking-wider text-brand-white mb-2">
              Elevated Card
            </p>
            <p className="text-body-sm text-brand-silver">
              Slight background tint for visual hierarchy. Used for callouts,
              compliance sections, and highlighted content.
            </p>
          </div>
          <div className="border-l-2 border-brand-gold pl-6 py-4">
            <p className="font-display text-lg uppercase tracking-wider text-brand-white mb-2">
              Accent Border
            </p>
            <p className="text-body-sm text-brand-silver">
              Left gold border for emphasis. Used for key statements, pull
              quotes, and introductory paragraphs.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-label tracking-widest uppercase text-brand-gold mb-6">
          Spacing & Layout
        </h3>
        <div className="border border-brand-border p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-body-sm text-brand-silver">
            <div>
              <p className="font-display text-label tracking-wider text-brand-white mb-2">
                Content Width
              </p>
              <p>
                <span className="font-mono text-caption text-brand-silver-dark">max-w-7xl</span>{" "}
                (80rem) for page containers.{" "}
                <span className="font-mono text-caption text-brand-silver-dark">max-w-3xl</span>{" "}
                for long-form reading.
              </p>
            </div>
            <div>
              <p className="font-display text-label tracking-wider text-brand-white mb-2">
                Section Spacing
              </p>
              <p>
                <span className="font-mono text-caption text-brand-silver-dark">py-16 md:py-24</span>{" "}
                between major sections. Consistent vertical rhythm throughout.
              </p>
            </div>
            <div>
              <p className="font-display text-label tracking-wider text-brand-white mb-2">
                Responsive Padding
              </p>
              <p>
                <span className="font-mono text-caption text-brand-silver-dark">px-4 sm:px-6 lg:px-8</span>{" "}
                for progressive horizontal padding across breakpoints.
              </p>
            </div>
            <div>
              <p className="font-display text-label tracking-wider text-brand-white mb-2">
                Border Style
              </p>
              <p>
                <span className="font-mono text-caption text-brand-silver-dark">border-brand-border</span>{" "}
                (white at 12% opacity) for all dividers and card edges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
