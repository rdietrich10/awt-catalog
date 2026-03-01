/**
 * Terms of Service copy for AW Therapeutics.
 */

import { COMPANY_LEGAL_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_WEBSITE } from "./company";

export const TERMS_PAGE_TITLE = "Terms of Service";

export const TERMS_LAST_UPDATED = "February 28, 2026";

export interface TermsSection {
  id: string;
  title: string;
  content: string[];
}

export const termsSections: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      `By accessing or using the AW Therapeutics website (the "Site"), operated by ${COMPANY_LEGAL_NAME} ("AW," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"), our Privacy Notice, and all applicable laws and regulations. If you do not agree to these Terms, you must not use the Site.`,
      "We reserve the right to update or modify these Terms at any time. Changes become effective upon posting to this page. Your continued use of the Site after any modifications constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: [
      "You must be at least 18 years of age to use this Site. By using the Site, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.",
      "Certain products and services described on this Site require a prescription or order from a licensed healthcare provider and are available only in jurisdictions where such products are legally permitted.",
    ],
  },
  {
    id: "nature-of-services",
    title: "Nature of Services",
    content: [
      "The Site serves as an informational catalog for advanced therapeutics, including compounded medications, peptides, and related healthcare products. The Site does not sell products directly. All product inquiries are subject to physician review and approval before any order can be fulfilled.",
      "No physician-patient relationship is established solely by browsing this Site. A physician-patient relationship may be established when a licensed provider reviews your submitted medical information as part of the inquiry process.",
      "The Site does not provide medical advice. Content on this Site is for informational purposes only and should not be construed as a substitute for professional medical advice, diagnosis, or treatment.",
    ],
  },
  {
    id: "user-conduct",
    title: "User Conduct",
    content: [
      "You agree not to:",
      "• Submit false, misleading, or fraudulent information through any form on this Site.",
      "• Attempt to gain unauthorized access to any portion of the Site, other accounts, or any systems or networks connected to the Site.",
      "• Use the Site for any unlawful purpose or in violation of any applicable law or regulation.",
      "• Interfere with or disrupt the integrity or performance of the Site.",
      "• Use automated systems (bots, scrapers, crawlers) to access the Site in a manner that exceeds reasonable use or circumvents rate limits.",
      "• Reproduce, duplicate, sell, or exploit any portion of the Site without our express written permission.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      `All content on this Site — including text, graphics, logos, images, product descriptions, data compilations, and software — is the property of ${COMPANY_LEGAL_NAME} or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.`,
      `"AW Therapeutics," the AW logo, and related marks are trademarks of ${COMPANY_LEGAL_NAME}. You may not use these marks without our prior written consent.`,
      "You are granted a limited, non-exclusive, non-transferable license to access and use the Site for personal, non-commercial purposes. This license does not include the right to modify, reproduce, distribute, or create derivative works from the Site content.",
    ],
  },
  {
    id: "product-information",
    title: "Product Information & Accuracy",
    content: [
      "We make reasonable efforts to ensure that product descriptions, images, and other information on the Site are accurate. However, we do not warrant that product descriptions, pricing, or other content is complete, current, or error-free.",
      "Product images may differ from actual products. Colors, sizes, and packaging may vary. All product images are for illustrative purposes only.",
      "We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.",
    ],
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    content: [
      'THE SITE AND ALL CONTENT, MATERIALS, AND SERVICES PROVIDED THROUGH THE SITE ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.',
      "TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY.",
      "WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: [
      `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ${COMPANY_LEGAL_NAME.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE.`,
      "OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THE SITE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US, IF ANY, DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.",
      "Some jurisdictions do not allow the exclusion or limitation of certain damages. In such jurisdictions, our liability shall be limited to the greatest extent permitted by law.",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: [
      `You agree to indemnify, defend, and hold harmless ${COMPANY_LEGAL_NAME}, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from or related to: (a) your use of the Site; (b) your violation of these Terms; (c) your violation of any rights of a third party; or (d) any content or information you submit through the Site.`,
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: [
      "The Site may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.",
      "The inclusion of any link does not imply endorsement or affiliation. You access third-party websites at your own risk.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Dispute Resolution",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict-of-law provisions.",
      "Any dispute arising from or relating to these Terms or the Site shall be resolved exclusively in the state or federal courts located in Palm Beach County, Florida. You consent to the personal jurisdiction and venue of such courts.",
      "Any claim or cause of action arising out of or related to the Site must be filed within one (1) year after the claim arose, or it shall be permanently barred.",
    ],
  },
  {
    id: "severability",
    title: "Severability",
    content: [
      "If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.",
    ],
  },
  {
    id: "entire-agreement",
    title: "Entire Agreement",
    content: [
      "These Terms, together with our Privacy Notice, Policies, and any other legal notices published on the Site, constitute the entire agreement between you and AW Therapeutics regarding your use of the Site.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: [
      `If you have questions about these Terms of Service, please contact us at ${COMPANY_EMAIL} or call ${COMPANY_PHONE}.`,
      `${COMPANY_LEGAL_NAME}`,
      "2828 S Seacrest Blvd #213",
      "Boynton Beach, FL 33435",
    ],
  },
];
