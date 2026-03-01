import Link from "next/link";
import {
  HIPAA_INTRO,
  HIPAA_USES,
  HIPAA_SHARING,
  HIPAA_RIGHTS,
  HIPAA_CONTACT,
  HIPAA_PAGE_SUBTITLE,
  COOKIE_POLICY_TITLE,
  COOKIE_POLICY_INTRO,
  COOKIE_LIST,
  CCPA_TITLE,
  CCPA_SECTIONS,
  CCPA_CATEGORIES_COLLECTED,
  DATA_RETENTION_TITLE,
  DATA_RETENTION_POLICY,
  GDPR_TITLE,
  GDPR_INTRO,
  GDPR_SECTIONS,
  PRIVACY_LAST_UPDATED,
} from "@/data/hipaa";

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-lg uppercase tracking-wider text-brand-white mb-4">
      {children}
    </h2>
  );
}

export function HipaaNoticeContent() {
  return (
    <div className="space-y-10">
      <p className="text-caption text-brand-silver-dark">
        Last updated: {PRIVACY_LAST_UPDATED}
      </p>

      <section>
        <SectionHeading>{HIPAA_PAGE_SUBTITLE}</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          {HIPAA_INTRO}
        </p>
      </section>

      <section>
        <SectionHeading>
          How Your Information May Be Used or Disclosed
        </SectionHeading>
        <ul className="space-y-4">
          {HIPAA_USES.map((use) => (
            <li key={use.title}>
              <p className="text-body-sm text-brand-white font-semibold">
                {use.title}
              </p>
              <p className="text-body-sm text-brand-silver leading-relaxed mt-1">
                {use.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>Information Sharing</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          {HIPAA_SHARING}
        </p>
      </section>

      <section>
        <SectionHeading>Your Rights</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed mb-4">
          You have rights regarding your health information, including the right
          to:
        </p>
        <ul className="space-y-2 border-l-2 border-brand-border pl-4">
          {HIPAA_RIGHTS.map((right) => (
            <li
              key={right}
              className="text-body-sm text-brand-silver leading-relaxed"
            >
              {right}
            </li>
          ))}
        </ul>
      </section>

      <section id="cookies">
        <SectionHeading id="cookies">{COOKIE_POLICY_TITLE}</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed mb-4">
          {COOKIE_POLICY_INTRO}
        </p>
        <div className="border border-brand-border overflow-hidden">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th scope="col" className="px-4 py-3 font-display text-caption uppercase tracking-wider text-brand-silver-dark">Cookie</th>
                <th scope="col" className="px-4 py-3 font-display text-caption uppercase tracking-wider text-brand-silver-dark">Purpose</th>
                <th scope="col" className="px-4 py-3 font-display text-caption uppercase tracking-wider text-brand-silver-dark">Duration</th>
                <th scope="col" className="px-4 py-3 font-display text-caption uppercase tracking-wider text-brand-silver-dark">Type</th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_LIST.map((c) => (
                <tr key={c.name} className="border-b border-brand-border last:border-b-0">
                  <td className="px-4 py-3 text-brand-white font-mono text-caption">{c.name}</td>
                  <td className="px-4 py-3 text-brand-silver">{c.purpose}</td>
                  <td className="px-4 py-3 text-brand-silver whitespace-nowrap">{c.duration}</td>
                  <td className="px-4 py-3">
                    <span className={`text-caption uppercase tracking-wider ${c.type === "essential" ? "text-brand-silver" : "text-brand-gold"}`}>
                      {c.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="ccpa">
        <SectionHeading id="ccpa">{CCPA_TITLE}</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed mb-4">
          If you are a California resident, the California Consumer Privacy Act (CCPA)
          grants you additional rights regarding your personal information.
        </p>

        <h3 className="text-body-sm text-brand-white font-semibold mb-3 mt-6">
          Categories of Personal Information Collected (Preceding 12 Months)
        </h3>
        <div className="border border-brand-border overflow-hidden mb-6">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th scope="col" className="px-4 py-3 font-display text-caption uppercase tracking-wider text-brand-silver-dark">Category</th>
                <th scope="col" className="px-4 py-3 font-display text-caption uppercase tracking-wider text-brand-silver-dark">Examples</th>
                <th scope="col" className="px-4 py-3 font-display text-caption uppercase tracking-wider text-brand-silver-dark">Collected</th>
              </tr>
            </thead>
            <tbody>
              {CCPA_CATEGORIES_COLLECTED.map((c) => (
                <tr key={c.category} className="border-b border-brand-border last:border-b-0">
                  <td className="px-4 py-3 text-brand-white">{c.category}</td>
                  <td className="px-4 py-3 text-brand-silver">{c.examples}</td>
                  <td className="px-4 py-3">
                    <span className={c.collected ? "text-brand-gold" : "text-brand-silver-dark"}>
                      {c.collected ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="space-y-4">
          {CCPA_SECTIONS.map((s) => (
            <li key={s.title}>
              <p className="text-body-sm text-brand-white font-semibold">
                {s.title}
              </p>
              <p className="text-body-sm text-brand-silver leading-relaxed mt-1">
                {s.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>{DATA_RETENTION_TITLE}</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          {DATA_RETENTION_POLICY}
        </p>
      </section>

      <section id="gdpr">
        <SectionHeading id="gdpr">{GDPR_TITLE}</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed mb-4">
          {GDPR_INTRO}
        </p>
        <ul className="space-y-4">
          {GDPR_SECTIONS.map((s) => (
            <li key={s.title}>
              <p className="text-body-sm text-brand-white font-semibold">
                {s.title}
              </p>
              <p className="text-body-sm text-brand-silver leading-relaxed mt-1">
                {s.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>Questions or Requests</SectionHeading>
        <p className="text-body-sm text-brand-silver leading-relaxed">
          You may request a copy of this notice or exercise any of the rights
          described above by contacting our office:
        </p>
        <div className="mt-4 space-y-1">
          <a
            href={`mailto:${HIPAA_CONTACT.email}`}
            className="block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            {HIPAA_CONTACT.email}
          </a>
          <a
            href={`tel:${HIPAA_CONTACT.phone.replace(/\D/g, "")}`}
            className="block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
          >
            {HIPAA_CONTACT.phone}
          </a>
        </div>
      </section>

      <div className="pt-8 border-t border-brand-border">
        <Link
          href="/policies"
          className="text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          View all policies
        </Link>
      </div>
    </div>
  );
}
