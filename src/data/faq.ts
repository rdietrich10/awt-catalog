import type { FAQ } from "@/types";
import {
  PHYSICIAN_REVIEW_FAQ_QUESTION,
  PHYSICIAN_REVIEW_FAQ_ANSWER,
} from "@/data/copy";

export const faqItems: FAQ[] = [
  { id: "1", question: "What are advanced therapeutics?", answer: "Advanced therapeutics are Medical Grade compounds that support various bodily functions. Therapeutic medications can support weight management, recovery, hormonal balance, and longevity." },
  { id: "2", question: "How are these medications administered?", answer: "Most AW Therapeutics medications are administered subcutaneously (under the skin) in the abdomen, thigh, or upper arm. Rotate injection sites. Clean site, pinch skin, inject at 90° angle. Dispose of syringe in sharps container." },
  { id: "3", question: "How should I store reconstituted medications?", answer: "Refrigerate after reconstitution at 36°F–46°F (2°C–8°C). Do not freeze. Protect from light. Discard after 90 days." },
  { id: "4", question: "What if I miss a dose?", answer: "For weekly GLP-1 medications: if more than 5 days have passed, skip and resume weekly schedule. Do not double dose. For other medications, take within 5 days if remembered; otherwise skip and resume your regular schedule." },
  { id: "5", question: "How do I reconstitute my medication?", answer: "Each product specifies a Bacteriostatic Water volume (e.g., 2 mL) for reconstitution. Draw the correct amount, inject into the vial, swirl gently. Do not shake." },
  { id: "6", question: "Can I combine medications?", answer: "Some medications work well together (e.g., AOD 9604 with GLP-1). Always consult your provider before combining medications." },
  { id: "7", question: "Are these compounds FDA approved?", answer: "These medications are compounded for use under the supervision of a licensed healthcare provider. Use only as prescribed. Individual results may vary." },
  { id: "8", question: PHYSICIAN_REVIEW_FAQ_QUESTION, answer: PHYSICIAN_REVIEW_FAQ_ANSWER },
  {
    id: "9",
    question: "Are these products subject to sales tax?",
    answer:
      "In most cases, advanced therapeutics — including peptides — dispensed through a licensed healthcare clinic in Florida are not subject to sales tax. Under Florida Statute §212.08, medicines, medical products, supplies, and drugs dispensed pursuant to an individual prescription written by a licensed prescriber are exempt from sales tax. Because AW Therapeutics operates as a physician-directed medical practice with documented prescriptions for every product dispensed, this exemption generally applies to your order.",
  },
];
