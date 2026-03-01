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

/* ── CCPA Categories Collected ──────────────────────────────── */

export interface CcpaCategory {
  category: string;
  examples: string;
  collected: boolean;
}

export const CCPA_CATEGORIES_COLLECTED: CcpaCategory[] = [
  {
    category: "Identifiers",
    examples: "Name, email address, phone number",
    collected: true,
  },
  {
    category: "Commercial Information",
    examples: "Products or services requested via inquiry forms",
    collected: true,
  },
  {
    category: "Internet or Network Activity",
    examples: "Browsing history, pages visited (via Google Analytics, with consent)",
    collected: true,
  },
  {
    category: "Geolocation Data",
    examples: "Approximate location derived from IP address",
    collected: false,
  },
  {
    category: "Professional or Employment Information",
    examples: "N/A",
    collected: false,
  },
  {
    category: "Education Information",
    examples: "N/A",
    collected: false,
  },
  {
    category: "Biometric Information",
    examples: "N/A",
    collected: false,
  },
  {
    category: "Sensory Data",
    examples: "N/A",
    collected: false,
  },
];

/* ── GDPR / International Privacy Rights ───────────────────── */

export const GDPR_TITLE = "International Privacy Rights (GDPR)";

export const GDPR_INTRO = `Although ${COMPANY_LEGAL_NAME} is based in the United States and primarily serves U.S. residents, we respect the privacy rights of individuals worldwide. If you are located in the European Economic Area (EEA), United Kingdom, or another jurisdiction with similar data protection laws, the following additional rights and disclosures apply to you.`;

export interface GdprSection {
  title: string;
  description: string;
}

export const GDPR_SECTIONS: GdprSection[] = [
  {
    title: "Lawful Basis for Processing",
    description:
      "We process your personal data on the following legal bases: (a) your explicit consent, given when you submit a contact or inquiry form; (b) performance of a contract or steps taken at your request prior to entering into a contract; and (c) our legitimate interests in operating our healthcare services, provided those interests are not overridden by your fundamental rights and freedoms.",
  },
  {
    title: "Right of Access",
    description:
      "You may request a copy of the personal data we hold about you, along with information about how it is processed.",
  },
  {
    title: "Right to Rectification",
    description:
      "You may request that we correct inaccurate or incomplete personal data.",
  },
  {
    title: "Right to Erasure",
    description:
      "You may request that we delete your personal data, subject to our legal obligations to retain certain records (for example, HIPAA record-retention requirements).",
  },
  {
    title: "Right to Restrict Processing",
    description:
      "You may request that we limit the processing of your personal data under certain circumstances, such as when you contest its accuracy.",
  },
  {
    title: "Right to Data Portability",
    description:
      "You may request that we provide your personal data in a structured, commonly used, machine-readable format so that you can transfer it to another controller.",
  },
  {
    title: "Right to Object",
    description:
      "You may object to the processing of your personal data based on our legitimate interests. We will cease processing unless we can demonstrate compelling legitimate grounds.",
  },
  {
    title: "Right to Withdraw Consent",
    description:
      "Where processing is based on consent, you may withdraw your consent at any time. This will not affect the lawfulness of processing carried out before the withdrawal.",
  },
  {
    title: "International Transfers",
    description: `Your personal data is processed and stored in the United States. By submitting your information, you acknowledge that your data will be transferred to and processed in the United States, which may have different data protection standards than your country of residence. We protect your data using the technical and organizational safeguards described in this notice.`,
  },
  {
    title: "How to Exercise Your Rights",
    description: `To exercise any of the rights described above, contact us at ${COMPANY_EMAIL} or call ${COMPANY_PHONE}. We will respond within 30 days as required by applicable law. If you believe your rights have been violated, you have the right to lodge a complaint with your local data protection supervisory authority.`,
  },
];

export const PRIVACY_LAST_UPDATED = "February 28, 2026";
