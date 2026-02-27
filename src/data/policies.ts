/**
 * Americare Wellness-approved policies.
 */

export interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

export const policySections: PolicySection[] = [
  {
    id: "regulatory-disclosure",
    title: "Peptides / Advanced Therapeutics – Regulatory Disclosure & Informed Consent",
    content: [
      "You understand and acknowledge that certain products made available through Americare Wellness may include peptides, compounded preparations, nutraceuticals, or other advanced therapeutics that may be off-label and/or not approved by the U.S. Food & Drug Administration (FDA) for certain uses or indications. Some products may be labeled by the manufacturer as \"For Research Use Only\" or \"Not for Human Use.\"",
      "You acknowledge and agree that:",
      "• No guarantees are made regarding results, effectiveness, or safety.",
      "• Risks may include allergic reactions, injection site irritation, infection, inflammation, hormonal or metabolic changes, adverse effects, interactions with medications/conditions, and unknown long-term risks due to limited human data for certain uses.",
      "• You have had the opportunity to ask questions and/or consult with a licensed provider regarding intended use, risks, alternatives, and expected outcomes.",
    ],
  },
  {
    id: "assumption-of-risk",
    title: "Assumption of Risk & Release of Liability",
    content: [
      "You voluntarily assume all risks related to the purchase, possession, storage, handling, administration, and/or use of any products, including peptides or advanced therapeutics.",
      "To the fullest extent permitted by law, you agree to release, indemnify, and hold harmless Americare Wellness LLC, their owners, licensed providers, contractors, staff, affiliates, and agents from any claims, demands, damages, losses, or causes of action arising from or related to these products and/or services, including their use, misuse, or outcomes.",
      "This acknowledgement remains in effect for this transaction and, unless revoked in writing, may apply to future purchases or substantially similar products/services.",
    ],
  },
  {
    id: "refund-cancellation",
    title: "Refund & Cancellation Policy (Products)",
    content: [
      "Due to the sensitive nature of peptide and nutraceutical products, all sales are final and we do not accept returns.",
      "Cancellation requests must be submitted before shipment. Once an order has shipped, it cannot be canceled.",
      "If you receive items that are missing, incorrect, or damaged, you must contact us within 48 hours of delivery at member@americarewellness.com so we may evaluate the issue and provide a resolution in our discretion (which may include replacement or store credit where permitted).",
    ],
  },
  {
    id: "shipping",
    title: "Shipping Policy",
    content: [
      "U.S. Orders: We offer free standard shipping within the USA on orders over $300. Please allow up to 48 hours for processing plus shipping time (typically up to ~7 days depending on method selected). We reserve the right to select the best carrier and shipping method for secure delivery.",
      "International Orders: International orders are placed at the buyer's risk. Americare Wellness assumes no liability for issues outside our control, including customs seizures, shipping delays, or lost packages. International orders are final sale and are not eligible for returns, refunds, exchanges, or reshipment.",
    ],
  },
  {
    id: "confirmation",
    title: "Confirmation",
    content: [
      "By proceeding with enrollment and/or purchase, you confirm that you have read, understood, and voluntarily agree to these Terms & Notes, including the membership disclosure, regulatory disclosure, informed consent, assumption of risk, and release of liability.",
    ],
  },
];
