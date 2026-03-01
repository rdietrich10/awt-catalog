export function BrandVoice() {
  return (
    <section className="border-t border-brand-border pt-16">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
        Brand Voice
      </h2>
      <p className="mt-3 text-body-sm text-brand-silver text-center max-w-2xl mx-auto">
        How we speak — authoritative, clear, and human. Never salesy, never
        clinical to the point of coldness.
      </p>

      <div className="mt-10 max-w-3xl mx-auto space-y-8">
        <div className="border-l-2 border-brand-gold pl-6">
          <p className="font-display text-xl md:text-2xl text-brand-white uppercase tracking-tight">
            &ldquo;Clinical Legitimacy in a Space Filled with Guesswork&rdquo;
          </p>
          <p className="mt-3 text-body-sm text-brand-silver">
            Our brand tagline. It encapsulates everything: we provide real
            healthcare in an industry dominated by unregulated retail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-brand-border p-6">
            <p className="font-display text-label tracking-widest uppercase text-brand-gold mb-4">
              We Are
            </p>
            <ul className="space-y-2 text-body-sm text-brand-silver">
              <li>Physician-directed, not retail</li>
              <li>Clinical, but accessible</li>
              <li>Authoritative without arrogance</li>
              <li>Precise in language and claims</li>
              <li>Transparent about process</li>
              <li>Confident, never desperate</li>
            </ul>
          </div>
          <div className="border border-brand-border p-6">
            <p className="font-display text-label tracking-widest uppercase text-brand-gold mb-4">
              We Are Not
            </p>
            <ul className="space-y-2 text-body-sm text-brand-silver">
              <li>A peptide shop or supplement store</li>
              <li>Hype-driven or trend-chasing</li>
              <li>Overly technical or jargon-heavy</li>
              <li>Casual or careless with medical language</li>
              <li>Aggressive in sales tactics</li>
              <li>Vague about oversight or compliance</li>
            </ul>
          </div>
        </div>

        <div className="border border-brand-border bg-brand-grey-900/30 p-6 sm:p-8">
          <p className="font-display text-label tracking-widest uppercase text-brand-gold mb-4">
            Key Messaging Pillars
          </p>
          <div className="space-y-4 text-body-sm text-brand-silver">
            <div>
              <p className="text-brand-white font-display tracking-wider mb-1">
                Physician-Directed Model
              </p>
              <p>
                Every therapy request is reviewed by a licensed physician.
                Provider approval is required before anything is dispensed.
              </p>
            </div>
            <div className="border-t border-brand-border pt-4">
              <p className="text-brand-white font-display tracking-wider mb-1">
                Medical-Grade Quality
              </p>
              <p>
                503A/503B compounded. COA-verified purity and potency.
                FDA-registered pharmacy partners.
              </p>
            </div>
            <div className="border-t border-brand-border pt-4">
              <p className="text-brand-white font-display tracking-wider mb-1">
                Continuity of Care
              </p>
              <p>
                Not a one-time transaction. Follow-up monitoring, therapy
                adjustments, and ongoing provider oversight included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
