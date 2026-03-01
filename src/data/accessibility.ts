/**
 * Accessibility statement copy for AW Therapeutics.
 */

import { COMPANY_LEGAL_NAME, COMPANY_EMAIL, COMPANY_PHONE } from "./company";

export const A11Y_PAGE_TITLE = "Accessibility Statement";

export const A11Y_PAGE_SUBTITLE =
  "Our Commitment to an Inclusive Digital Experience";

export const A11Y_LAST_UPDATED = "February 28, 2026";

export const A11Y_INTRO = `${COMPANY_LEGAL_NAME} (d/b/a AW Therapeutics) is committed to ensuring that our website is accessible to all individuals, including those with disabilities. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, published by the World Wide Web Consortium (W3C). These guidelines are the internationally recognized benchmark for web accessibility.`;

export const A11Y_STANDARD = "WCAG 2.1 Level AA";

export interface A11yMeasure {
  title: string;
  items: string[];
}

export const A11Y_MEASURES: A11yMeasure[] = [
  {
    title: "Perceivable",
    items: [
      "All content images include descriptive alternative text. Decorative images are hidden from assistive technology.",
      "Text meets or exceeds WCAG AA contrast ratios against all background colors throughout the site.",
      "All text uses relative units (rem) and reflows correctly at 200% browser zoom without loss of content or functionality.",
      "Content is structured with semantic HTML headings, lists, and landmarks so that assistive technology can navigate the page efficiently.",
    ],
  },
  {
    title: "Operable",
    items: [
      "A skip-to-content link is provided as the first interactive element on every page, allowing keyboard users to bypass repeated navigation.",
      "All interactive elements — links, buttons, form fields, and controls — are reachable and operable using only a keyboard.",
      "Focus indicators are visible on all interactive elements, using a high-contrast gold outline.",
      "Dialogs and modals trap focus within their boundary and return focus to the trigger element when closed.",
      "Touch targets on mobile devices meet a minimum size of 44 by 44 CSS pixels.",
    ],
  },
  {
    title: "Understandable",
    items: [
      "The page language is declared as English in the document root.",
      "All form inputs have visible labels and are programmatically associated using standard HTML attributes.",
      "Form validation errors are announced to screen readers immediately using ARIA live regions.",
      "Error messages are descriptive and guide users toward corrective action.",
    ],
  },
  {
    title: "Robust",
    items: [
      "The site uses semantic HTML elements — header, nav, main, footer, aside — to define page regions.",
      "Interactive components such as modals, accordions, carousels, and toggle switches use standard ARIA roles, states, and properties.",
      "Navigation menus communicate their expanded or collapsed state to assistive technology.",
      "Dynamic content updates (search results, calculation outputs) are announced to screen readers using ARIA live regions.",
      "The site is compatible with modern assistive technologies including screen readers, voice control, and switch access.",
    ],
  },
];

export const A11Y_KNOWN_LIMITATIONS = [
  "Some animations (hero slideshow, carousel auto-scroll) do not yet pause for users who prefer reduced motion. We are working to implement prefers-reduced-motion support.",
  "Active navigation links do not yet convey the current page to screen readers via aria-current. This is scheduled for an upcoming release.",
  "Manual testing with a full matrix of screen readers (VoiceOver, NVDA, JAWS) is ongoing. If you encounter an issue with a specific assistive technology, please let us know.",
];

export const A11Y_FEEDBACK_INTRO = `We welcome feedback on the accessibility of this website. If you experience any difficulty accessing content or functionality, or if you have suggestions for improvement, please contact us:`;

export const A11Y_CONTACT = {
  email: COMPANY_EMAIL,
  phone: COMPANY_PHONE,
};

export const A11Y_RESPONSE_TIME =
  "We aim to respond to accessibility feedback within five (5) business days and to resolve reported barriers as promptly as possible.";

export const A11Y_ENFORCEMENT =
  "This statement was prepared based on a self-assessment of the website. We are committed to maintaining and improving accessibility on an ongoing basis. If you are not satisfied with our response, you may file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights.";
