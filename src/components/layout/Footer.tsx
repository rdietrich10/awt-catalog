import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { PROTOCOL_STATEMENT, FOOTER_CTA_HEADLINE, FOOTER_CTA_SUBHEADLINE } from "@/data/copy";
import {
  COMPANY_ADDRESS,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_LICENSES,
} from "@/data/company";
import { CookieSettingsButton } from "./CookieConsent";

const productLinks = [
  { href: "/categories/weight-management", label: "Weight Management" },
  { href: "/categories/healing-tissue-recovery", label: "Healing & Recovery" },
  { href: "/categories/longevity-anti-aging", label: "Longevity" },
  { href: "/categories/growth-hormone-recomposition", label: "Growth Hormone" },
  { href: "/products", label: "Full Catalog" },
];

const resourceLinks = [
  { href: "/knowledge", label: "Knowledge Hub" },
  { href: "/knowledge/faq", label: "FAQ" },
  { href: "/knowledge/protocols", label: "Protocols" },
  { href: "/quality-control", label: "Quality Control" },
  { href: "/knowledge/glossary", label: "Glossary" },
  { href: "/insurance", label: "Insurance Verification" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact Us" },
  { href: "/interest-list", label: "My List" },
];

const localLinks = [
  { href: "/lp/boynton-beach", label: "Boynton Beach" },
];

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/policies", label: "Policies" },
  { href: "/privacy", label: "Privacy Notice" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/privacy#ccpa", label: "Do Not Sell My Information" },
];

function FooterLinkGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={`${title} links`}>
      <h3 className="font-display text-caption tracking-widest uppercase text-brand-silver mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-body-sm text-brand-silver-dark hover:text-brand-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PreFooterCta() {
  return (
    <div className="border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-display text-lg uppercase tracking-wider text-brand-white">
            {FOOTER_CTA_HEADLINE}
          </h3>
          <p className="mt-1 text-body-sm text-brand-silver">
            {FOOTER_CTA_SUBHEADLINE}
          </p>
        </div>
        <ButtonLink
          href="/contact"
          variant="primary"
          size="md"
        >
          Contact Us
        </ButtonLink>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto">
      <PreFooterCta />
      <div className="border-t border-brand-border bg-brand-grey-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div>
              <p className="font-display text-body-sm tracking-wider uppercase text-brand-silver">
                AW Therapeutics
              </p>
              <p className="text-[0.65rem] tracking-wide text-brand-silver-dark">
                By {COMPANY_LEGAL_NAME}
              </p>
              <p className="mt-3 text-body-sm text-brand-silver-dark">
                {COMPANY_ADDRESS}
              </p>
              <a
                href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`}
                className="mt-1 block text-body-sm text-brand-silver-dark hover:text-brand-silver transition-colors"
              >
                {COMPANY_PHONE}
              </a>
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="mt-1 block text-body-sm text-brand-silver-dark hover:text-brand-silver transition-colors"
              >
                {COMPANY_EMAIL}
              </a>

              <ul className="mt-4 space-y-1">
                {COMPANY_LICENSES.map((lic) => (
                  <li key={lic.number} className="text-caption text-brand-silver-dark">
                    <span className="text-brand-silver">{lic.label}</span>{" "}
                    <span className="tracking-wide">#{lic.number}</span>
                  </li>
                ))}
              </ul>
            </div>

            <FooterLinkGroup title="Products" links={productLinks} />
            <FooterLinkGroup title="Resources" links={resourceLinks} />
            <div className="space-y-8">
              <FooterLinkGroup title="Company" links={companyLinks} />
              <FooterLinkGroup title="South Florida" links={localLinks} />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-brand-border">
            <p className="text-caption text-brand-silver-accessible text-center max-w-3xl mx-auto leading-relaxed">
              {PROTOCOL_STATEMENT}
            </p>

            <p className="mt-4 text-caption text-brand-silver-accessible text-center">
              &copy; {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. All rights reserved.
            </p>

            <nav aria-label="Legal links" className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-caption text-brand-silver-accessible">
              {legalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-brand-border">|</span>}
                  <Link
                    href={link.href}
                    className="hover:text-brand-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
              <span aria-hidden="true" className="text-brand-border">|</span>
              <CookieSettingsButton />
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
