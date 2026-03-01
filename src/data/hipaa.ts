/**
 * HIPAA Privacy Notice copy for Americare Wellness / AW Therapeutics.
 */

import { COMPANY_LEGAL_NAME, COMPANY_EMAIL, COMPANY_PHONE } from "./company";

export const HIPAA_BANNER_TEXT =
  "By submitting this request, you consent to the use of your health information for medical review and related services.";

export const HIPAA_BANNER_LINK_TEXT = "Notice of Privacy Practices";

export const HIPAA_CONSENT_LABEL =
  "I acknowledge that I have received or had the opportunity to review the Notice of Privacy Practices and consent to the use and disclosure of my Protected Health Information for treatment, payment, healthcare operations, and related services.";

export const HIPAA_PAGE_TITLE = "Notice of Privacy Practices";

export const HIPAA_PAGE_SUBTITLE =
  "Privacy Notice and Consent for Medical Information Use";

export const HIPAA_INTRO = `${COMPANY_LEGAL_NAME} ("AW") and its affiliated services, including AW Therapeutics, are committed to protecting the privacy and security of your health information. When you submit a request for therapeutic products or services through this website, you may be asked to provide personal and health-related information. This information is considered Protected Health Information (PHI) under federal law.`;

export interface HipaaUseSection {
  title: string;
  description: string;
}

export const HIPAA_USES: HipaaUseSection[] = [
  {
    title: "Treatment",
    description:
      "To allow licensed medical providers to review your request and determine clinical appropriateness.",
  },
  {
    title: "Payment",
    description:
      "To process invoices, payments, and related financial transactions.",
  },
  {
    title: "Healthcare Operations",
    description:
      "To operate our clinical, administrative, and fulfillment services.",
  },
  {
    title: "Legal Requirements",
    description: "As required or permitted by federal or state law.",
  },
];

export const HIPAA_SHARING =
  "We may share your information with authorized healthcare professionals, pharmacies, laboratories, payment processors, and service providers who support your care and services. All such parties are required to protect your information.";

export const HIPAA_RIGHTS = [
  "Request access to your records",
  "Request corrections",
  "Request restrictions on certain disclosures",
  "Receive confidential communications",
  "File a privacy complaint without retaliation",
];

export const HIPAA_CONTACT = {
  email: COMPANY_EMAIL,
  phone: COMPANY_PHONE,
};

/* ── Cookie Policy ─────────────────────────────────────────── */

export const COOKIE_POLICY_TITLE = "Cookie Policy";

export interface CookieEntry {
  name: string;
  purpose: string;
  duration: string;
  type: "essential" | "analytics";
}

export const COOKIE_LIST: CookieEntry[] = [
  {
    name: "aw_cookie_consent",
    purpose: "Stores your cookie preferences so we don't ask every visit.",
    duration: "1 year",
    type: "essential",
  },
  {
    name: "_ga / _ga_*",
    purpose:
      "Google Analytics — helps us understand aggregate site usage (anonymized IP, no personal data).",
    duration: "2 years",
    type: "analytics",
  },
];

export const COOKIE_POLICY_INTRO =
  "We use a small number of cookies to operate this website and, with your permission, to understand how visitors interact with it. We never sell cookie data or use cookies for advertising.";

/* ── CCPA / California Privacy Rights ──────────────────────── */

export const CCPA_TITLE = "Your California Privacy Rights";

export const CCPA_SECTIONS = [
  {
    title: "Right to Know",
    description:
      "You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources, the business purpose for collecting it, and the categories of third parties with whom we share it.",
  },
  {
    title: "Right to Delete",
    description:
      "You may request that we delete personal information we have collected from you, subject to certain exceptions (for example, if the information is needed to complete a transaction or comply with a legal obligation).",
  },
  {
    title: "Right to Opt-Out of Sale",
    description: `${COMPANY_LEGAL_NAME} does not sell your personal information to third parties, and we have not done so in the preceding 12 months. If this practice ever changes, we will update this notice and provide a clear opt-out mechanism.`,
  },
  {
    title: "Right to Non-Discrimination",
    description:
      "We will not discriminate against you for exercising any of your California privacy rights. You will not receive different pricing, a different quality of service, or be denied service for making a request.",
  },
  {
    title: "How to Submit a Request",
    description: `To exercise any of the rights described above, contact us at ${COMPANY_EMAIL} or call ${COMPANY_PHONE}. We will verify your identity before processing your request and respond within 45 days as required by law.`,
  },
];

/* ── Data Retention ────────────────────────────────────────── */

export const DATA_RETENTION_TITLE = "Data Retention";

export const DATA_RETENTION_POLICY =
  "We retain contact and inquiry submissions for the duration of any ongoing care relationship plus six (6) years, in accordance with HIPAA record-retention guidance and applicable Florida law. Audit logs are retained for a minimum of six (6) years. You may request deletion of your data at any time by contacting us; we will comply unless a legal obligation requires continued retention.";

export const PRIVACY_LAST_UPDATED = "February 28, 2026";
