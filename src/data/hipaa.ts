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
