/**
 * AW Therapeutics-approved policies.
 */

export interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

export const policySections: PolicySection[] = [
  {
    id: "telehealth-disclaimer",
    title: "Telehealth & Medical Services Disclaimer",
    content: [
      "Medical services described on this website are provided through telehealth by licensed healthcare professionals affiliated with Americare Wellness, LLC (d/b/a AW Therapeutics), a Florida-licensed healthcare clinic. Telehealth services are conducted in accordance with applicable Florida law, including Florida Statute §456.47.",
      "By submitting a request for products or services, you acknowledge and agree that: a licensed healthcare provider will review your submitted medical information; submission of an order does not guarantee medical approval; additional medical information may be required; certain therapies may not be available in all jurisdictions; telehealth services have inherent limitations compared to in-person evaluations.",
      "If a therapy is approved, fulfillment may occur through legally authorized dispensing channels, including clinic dispensing, pharmacy partners, or other compliant fulfillment mechanisms as permitted by law.",
      "This platform does not provide emergency medical services. If you are experiencing a medical emergency, call 911 or seek immediate in-person medical care.",
    ],
  },
  {
    id: "compounding-disclosure",
    title: "Compounding Pharmacy Disclosure",
    content: [
      "Certain medications or therapeutic products available through our services may be prepared by a licensed compounding pharmacy pursuant to a prescription issued by a licensed healthcare provider affiliated with Americare Wellness, LLC (d/b/a AW Therapeutics).",
      "Compounded medications are not approved by the U.S. Food and Drug Administration (FDA) and have not undergone the same FDA review for safety, effectiveness, or quality as commercially manufactured drugs. They are prepared pursuant to a valid patient-specific prescription or under applicable federal compounding regulations. However, compounding pharmacies are regulated by state boards of pharmacy and, where applicable, federal standards.",
      "If prescribed, medications may be dispensed through a state-licensed compounding pharmacy (503A), an FDA-registered outsourcing facility (503B), or clinic dispensing where permitted by law.",
      "As with all medical treatments, compounded medications carry potential risks including side effects, allergic responses, contamination risk, variability in potency, and unknown long-term effects. Contact your healthcare provider immediately if you experience concerning symptoms.",
      "Compounded medications are frequently not covered by insurance and are considered elective or cash-pay therapies. Patients are responsible for all associated costs unless otherwise stated.",
    ],
  },
  {
    id: "regulatory-disclosure",
    title: "Advanced Therapeutics – Regulatory Disclosure & Informed Consent",
    content: [
      "You understand and acknowledge that certain products made available through AW Therapeutics may include compounded preparations, nutraceuticals, or other advanced therapeutics that may be off-label and/or not approved by the U.S. Food & Drug Administration (FDA) for certain uses or indications. Some products may be labeled by the manufacturer as \"For Research Use Only\" or \"Not for Human Use.\"",
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
      "You voluntarily assume all risks related to the purchase, possession, storage, handling, administration, and/or use of any products, including advanced therapeutics.",
      "To the fullest extent permitted by law, you agree to release, indemnify, and hold harmless Americare Wellness, LLC (d/b/a AW Therapeutics), its owners, licensed providers, contractors, staff, affiliates, and agents from any claims, demands, damages, losses, or causes of action arising from or related to these products and/or services, including their use, misuse, or outcomes.",
      "This acknowledgement remains in effect for this transaction and, unless revoked in writing, may apply to future purchases or substantially similar products/services.",
    ],
  },
  {
    id: "refund-cancellation",
    title: "Refund & Cancellation Policy (Products)",
    content: [
      "Due to the sensitive nature of compounded and nutraceutical products, all sales are final and we do not accept returns.",
      "Cancellation requests must be submitted before shipment. Once an order has shipped, it cannot be canceled.",
      "If you receive items that are missing, incorrect, or damaged, you must contact us within 48 hours of delivery at info@awclinics.com so we may evaluate the issue and provide a resolution in our discretion (which may include replacement or store credit where permitted).",
    ],
  },
  {
    id: "shipping",
    title: "Shipping Policy",
    content: [
      "U.S. Orders: We offer free standard shipping within the USA on orders over $300. Please allow up to 48 hours for processing plus shipping time (typically up to ~7 days depending on method selected). We reserve the right to select the best carrier and shipping method for secure delivery.",
      "International Orders: International orders are placed at the buyer's risk. AW Therapeutics assumes no liability for issues outside our control, including customs seizures, shipping delays, or lost packages. International orders are final sale and are not eligible for returns, refunds, exchanges, or reshipment.",
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
