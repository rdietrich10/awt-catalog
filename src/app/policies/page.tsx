import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { policySections } from "@/data/policies";

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Policies" },
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          Policies
        </h1>
        <p className="text-body-sm text-brand-silver mb-12">
          Terms, refunds, shipping, and regulatory disclosures for Americare Wellness products and services.
        </p>
        <div className="space-y-10">
          {policySections.map((section) => (
            <section key={section.id}>
              <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-4">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, i) => (
                  <p key={i} className="text-body-sm text-brand-silver leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <section className="mt-10 pt-8 border-t border-brand-border">
          <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-2">
            Privacy Policy
          </h2>
          <p className="text-body-sm text-brand-silver-dark">
            How we collect, use, and protect your information. Content pending Americare Wellness approval.
          </p>
        </section>
        <Link
          href="/"
          className="mt-12 inline-block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
