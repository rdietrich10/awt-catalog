import Link from "next/link";
import {
  FlaskConical,
  SearchX,
  ShieldAlert,
  Award,
  Syringe,
} from "lucide-react";

const sections = [
  {
    icon: FlaskConical,
    title: "1. The Oral Bioavailability Problem",
    body: "Most therapeutic compounds — particularly peptides — are proteins or peptide chains that cannot survive the digestive process. Stomach acid and digestive enzymes break them down into inactive fragments before they ever reach the bloodstream. Oral supplements claiming to deliver peptide-level benefits through a capsule are, in most cases, making claims the chemistry simply does not support. There is one notable exception: BPC-157, a compound that naturally originates within the gastrointestinal tract and can survive the enzymatic environment of the stomach. This is why we carry injectable BPC-157 — because the mechanism of action is real and verifiable. For nearly every other compound, oral delivery is not a viable route.",
  },
  {
    icon: SearchX,
    title: "2. Lack of Meaningful Clinical Evidence",
    body: "Many nutraceutical products are formulated from herbal extracts, plant roots, and proprietary blends marketed with broad health claims. While individual ingredients may have preliminary in-vitro or animal-model data, the clinical evidence supporting their efficacy at marketed doses in humans is, in most cases, weak or nonexistent. We hold every product in our catalog to a higher standard: a verifiable mechanism of action, peer-reviewed data supporting its intended use, and real-world clinical outcomes observed by practicing providers. If a product does not meet that bar, we do not carry it — regardless of margin or market demand.",
  },
  {
    icon: ShieldAlert,
    title: "3. The Quality and Standardization Gap",
    body: "Every medication we dispense is compounded in FDA-registered 503A or 503B pharmacies with Certificate of Analysis (COA) verification for purity, potency, and sterility. These are the same standards applied to prescription medications. Nutraceutical products, by contrast, fall under the Dietary Supplement Health and Education Act (DSHEA), which does not require pre-market approval, clinical trials, or standardized potency testing. Third-party testing organizations like USP and NSF exist, but participation is voluntary. The result is a marketplace where label claims frequently do not match actual contents — a risk we are unwilling to pass along to our patients.",
  },
  {
    icon: Award,
    title: "4. Our Standard: Medical Grade Only",
    body: "AW Therapeutics operates as a physician-directed medical practice, not a supplement retailer. Every product in our catalog has a defined pharmacological mechanism, is manufactured under pharmacy-grade conditions, and is dispensed only after clinical review by a licensed provider. This standard eliminates the guesswork that plagues the supplement industry. When you receive a product from us, you know exactly what is in it, exactly how it works, and exactly how to use it — because a physician has reviewed it in the context of your health.",
  },
  {
    icon: Syringe,
    title: "5. What We Offer Instead",
    body: "Rather than padding our catalog with low-confidence products, we focus on injectable therapeutics with established mechanisms: GLP-1 receptor agonists for weight management, growth hormone secretagogues for recomposition, healing compounds like BPC-157 and TB-500, reproductive health peptides, and longevity-focused therapies like Epitalon and MOTS-c. Each product is pharmacy-compounded, COA-verified, and delivered within a structured clinical framework that includes dosing guidance, monitoring protocols, and ongoing provider oversight. We would rather offer 30 products that work than 300 that might.",
  },
] as const;

export function NutraceuticalsExclusionContent() {
  return (
    <div className="space-y-8">
      <div className="border-l-2 border-brand-gold pl-6">
        <p className="text-body-sm text-brand-silver leading-relaxed">
          We get asked why we don&apos;t carry supplements and nutraceuticals.
          The short answer: we could, but we choose not to. The longer answer
          is rooted in science, quality standards, and a commitment to only
          offering products we genuinely believe in. This article explains our
          reasoning.
        </p>
      </div>

      {sections.map(({ icon: Icon, title, body }) => (
        <div key={title}>
          <div className="flex items-start gap-3 mb-3">
            <Icon className="w-5 h-5 text-brand-gold shrink-0 mt-1" aria-hidden />
            <h2 className="font-display text-lg uppercase tracking-wider text-brand-white">
              {title}
            </h2>
          </div>
          <p className="text-body-sm text-brand-silver leading-relaxed pl-8">
            {body}
          </p>
        </div>
      ))}

      <div className="border border-brand-border bg-brand-grey-900/30 p-6 mt-8">
        <h2 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-3">
          The Bottom Line
        </h2>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          We&apos;d rather sell fewer products that work than a full catalog
          padded with items we don&apos;t believe in. Every product in our
          catalog has a verified mechanism of action, pharmacy-grade
          manufacturing, and physician oversight. That&apos;s the standard we
          hold ourselves to — and the standard our patients deserve.
        </p>
        <p className="mt-3 text-body-sm text-brand-silver leading-relaxed">
          If a product doesn&apos;t meet that bar, it doesn&apos;t make the
          cut. No exceptions, no compromises, no matter the margin.
        </p>
      </div>

      <div className="flex justify-center gap-6 pt-4">
        <Link
          href="/products"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          Browse our catalog
        </Link>
        <Link
          href="/contact"
          className="text-body-sm text-brand-silver hover:text-brand-gold transition-colors underline"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
