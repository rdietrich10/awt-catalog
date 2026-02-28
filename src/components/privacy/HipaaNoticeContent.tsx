import Link from "next/link";
import {
  HIPAA_INTRO,
  HIPAA_USES,
  HIPAA_SHARING,
  HIPAA_RIGHTS,
  HIPAA_CONTACT,
  HIPAA_PAGE_SUBTITLE,
} from "@/data/hipaa";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-4">
      {children}
    </h2>
  );
}

export function HipaaNoticeContent() {
  return (
    <div className="space-y-10">
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
