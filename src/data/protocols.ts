/**
 * Protocol education content for Therapeutic Compounds.
 * Factual, evidence-based information for consumer education.
 */

export interface ProtocolSection {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
}

export const protocolSections: ProtocolSection[] = [
  {
    id: "peptides",
    title: "Therapeutic Compound Protocols",
    excerpt: "Reconstitution, storage, injection technique, and disposal for therapeutic compounds.",
    content: [
      "Reconstitution: Use bacteriostatic water (never tap or sterile water for multi-dose vials). Draw the volume specified on the product label (e.g., 2 mL), inject into the vial, and swirl gently. Do not shake—agitation can damage the compound.",
      "Storage: Refrigerate reconstituted compounds at 36°F–46°F (2°C–8°C). Do not freeze. Protect from light. Most compounds are stable for 90 days after reconstitution when stored properly. Check product-specific IFU for exact shelf life.",
      "Injection sites: Rotate between abdomen, thigh, and upper arm. Use a clean site each time. Pinch skin, inject subcutaneously at a 90° angle. Dispose of syringes in a sharps container—never in household trash.",
      "Timing: Many compounds are dosed before bed or upon waking. GHRH/GHRP compounds are often taken 2 hours before the first meal or before bed to avoid blunting by food. Follow your product-specific schedule.",
      "Cycling: Some compounds use cycles (e.g., 5 days on/2 off, or 60 days on/30 off) to support natural hormone rhythms. Your provider will recommend the appropriate protocol.",
    ],
  },
];
