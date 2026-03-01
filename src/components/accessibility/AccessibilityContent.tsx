import Link from "next/link";
import {
  A11Y_INTRO,
  A11Y_STANDARD,
  A11Y_MEASURES,
  A11Y_KNOWN_LIMITATIONS,
  A11Y_FEEDBACK_INTRO,
  A11Y_CONTACT,
  A11Y_RESPONSE_TIME,
  A11Y_ENFORCEMENT,
  A11Y_LAST_UPDATED,
  A11Y_PAGE_SUBTITLE,
} from "@/data/accessibility";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-4">
      {children}
    </h2>
  );
}

export function AccessibilityContent() {
  return (
    <div className="space-y-10">
      <p className="text-caption text-brand-silver-dark">
        Last updated: {A11Y_LAST_UPDATED}
      </p>

      <section>
        <SectionHeading>{A11Y_PAGE_SUBTITLE}</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          {A11Y_INTRO}
        </p>
        <p className="mt-4 text-body-sm text-brand-silver leading-relaxed">
          Our target standard is{" "}
          <span className="text-brand-white font-semibold">{A11Y_STANDARD}</span>.
        </p>
      </section>

      <section>
        <SectionHeading>Measures We Have Taken</SectionHeading>
        <div className="space-y-8">
          {A11Y_MEASURES.map((group) => (
            <div key={group.title}>
              <h3 className="text-body-sm text-brand-white font-semibold mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2 border-l-2 border-brand-border pl-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-body-sm text-brand-silver leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>Known Limitations</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed mb-4">
          While we strive for full conformance, we are aware of the following
          areas where improvements are in progress:
        </p>
        <ul className="space-y-2 border-l-2 border-brand-gold/30 pl-4">
          {A11Y_KNOWN_LIMITATIONS.map((limitation) => (
            <li
              key={limitation}
              className="text-body-sm text-brand-silver leading-relaxed"
            >
              {limitation}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>Feedback</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          {A11Y_FEEDBACK_INTRO}
        </p>
        <div className="mt-4 space-y-1">
          <a
            href={`mailto:${A11Y_CONTACT.email}`}
            className="block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            {A11Y_CONTACT.email}
          </a>
          <a
            href={`tel:${A11Y_CONTACT.phone.replace(/\D/g, "")}`}
            className="block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            {A11Y_CONTACT.phone}
          </a>
        </div>
        <p className="mt-4 text-body-sm text-brand-silver leading-relaxed">
          {A11Y_RESPONSE_TIME}
        </p>
      </section>

      <section>
        <SectionHeading>Enforcement</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          {A11Y_ENFORCEMENT}
        </p>
      </section>

      <div className="pt-8 border-t border-brand-border flex gap-6">
        <Link
          href="/privacy"
          className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          Privacy Notice
        </Link>
        <Link
          href="/policies"
          className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          All Policies
        </Link>
      </div>
    </div>
  );
}
