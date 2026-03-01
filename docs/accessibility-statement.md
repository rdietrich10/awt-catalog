# Accessibility Statement

**Entity:** Americare Wellness, LLC (d/b/a AW Therapeutics)
**Standard:** WCAG 2.1 Level AA
**Last audited:** February 28, 2026
**Contact:** info@awclinics.com | (561) 536-3166

---

## Commitment

AW Therapeutics is committed to providing a website that is accessible to the
widest possible audience, regardless of technology or ability. We aim to conform
to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. This
statement describes the measures we have taken and the areas we are continuing
to improve.

---

## Measures Implemented

### 1. Perceivable

#### Text Alternatives (1.1)

- **Images**: All content images use `next/image` with descriptive `alt` text
  derived from the product name, article title, or category label. The
  `PlaceholderImage` component applies both `role="img"` and `aria-label` on its
  container, plus `alt` on the underlying `<Image>`.
- **Decorative images**: Hero slideshow and lifestyle carousel images use
  `alt=""` with `aria-hidden={!active}` on inactive slides. Decorative SVG icons
  use `aria-hidden="true"`.
- **SVG fallback**: The vial placeholder SVG carries `aria-hidden` to prevent
  screen readers from announcing decorative markup.

#### Color Contrast (1.4.3 / 1.4.6)

- **Primary text**: `#FAFAFA` on `#090d0b` = **17.7:1** (passes AAA).
- **Body silver text**: `#B8B8B8` on `#090d0b` = **9.9:1** (passes AAA).
- **Accessible secondary text**: Introduced `brand-silver-accessible` at
  `#999999` on `#090d0b` = **5.5:1** (passes AA). Applied to dates, captions,
  footer legal text, and article metadata that was previously using
  `brand-silver-dim` (`#585858`, ~3.2:1, failing AA).
- **Gold accent on black**: `#D4AF37` on `#090d0b` = **7.7:1** (passes AA).
- **Remaining caveat**: `brand-silver-dark` (`#787878`) at 4.4:1 is used only
  for large text and UI elements where the 3:1 threshold applies.
- **Placeholder text**: `brand-silver-dim` is retained for `placeholder:`
  attributes only, which are exempt from WCAG contrast requirements per the
  spec (placeholders are not considered labels).

#### Text Resize (1.4.4)

- All font sizes use `rem` units via Tailwind's type scale. The root `<html>`
  font-size is set to `100%`, respecting user browser settings.
- Layouts use CSS Grid and Flexbox, reflowing gracefully up to 200% zoom.

### 2. Operable

#### Keyboard Navigation (2.1)

- **Skip link**: A "Skip to main content" link is the first focusable element in
  the DOM. It is visually hidden until focused, then appears at `top-4 left-4`
  with a gold background. Links to `<main id="main-content">`.
- **Focus indicators**: A global `*:focus-visible` rule applies a 2px solid
  `brand-gold` outline with 2px offset to all interactive elements. Form inputs
  receive a gold border instead of an outline for a cleaner look.
- **Tab order**: All interactive elements follow natural document order. No
  positive `tabindex` values are used anywhere in the codebase.
- **Escape closes overlays**: Both the Modal and Cookie Consent dialog close on
  Escape key.

#### Focus Trapping (2.1.2)

- **Modal component**: Implements a full focus trap. Tab cycles from the last
  focusable element back to the first. Shift+Tab from the first goes to the
  last. On open, focus moves to the dialog container. On close, focus returns
  to the element that triggered the modal.
- **Cookie consent**: Functions as a non-modal dialog (does not block page
  interaction), so focus trapping is intentionally omitted.

#### Touch Targets (2.5.5)

- Mobile hamburger menu button: `min-h-[44px] min-w-[44px]` with
  `touch-manipulation`.
- Form inputs: `min-h-[44px]` via input styles.

### 3. Understandable

#### Language (3.1.1)

- `<html lang="en">` is set on the root element.

#### Form Labels and Errors (3.3)

- **Contact form**: Every input (`name`, `email`, `phone`, `subject`,
  `message`) has an explicit `<label htmlFor="...">` with matching `id`.
  Required fields display a gold asterisk. Error messages use `role="alert"`
  and are announced immediately by screen readers.
- **Inquiry form (EmailCaptureForm)**: Name, email, phone, and HIPAA consent
  checkbox all have associated labels.
- **BMI Calculator**: All inputs have `<label htmlFor="...">` associations.
  Results are announced via `aria-live="polite"` and `aria-atomic="true"`.
- **Search**: Both desktop and mobile search inputs carry
  `aria-label="Search products"`, and the forms use `role="search"`.
- **Filter sidebar**: Sort `<select>` has an explicit `<label htmlFor="sort-products">`.

#### Error Messaging

- API error messages are descriptive and lighthearted, guiding users back into
  the experience. Example: "Hmm, something's off with your form — Name is
  required. Double-check and give it another go!"
- Rate limit errors: "Whoa there, speedster! You've sent a lot of messages
  recently. Take a breather and try again in a few minutes."

### 4. Robust

#### ARIA Landmarks and Roles

| Component | ARIA Implementation |
| --- | --- |
| **Layout** | `<html lang="en">`, `<main id="main-content">`, `<header>` (sticky nav), `<footer>` |
| **Navigation** | Desktop: `<nav aria-label="Main navigation">`. Mobile: `<nav id="mobile-nav-menu" aria-label="Mobile navigation">` |
| **Footer** | Each link group: `<nav aria-label="{Title} links">` |
| **Search** | `<form role="search">`, `<input aria-label="Search products">` |
| **Modal** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (linked to title `h3` via `useId()`), `tabIndex={-1}` |
| **Cookie consent** | `role="dialog"`, `aria-modal="true"`, `aria-label="Cookie preferences"` |
| **FAQ accordion** | Button: `aria-expanded`, `aria-controls`. Panel: `role="region"`, `aria-labelledby`, `hidden` attribute |
| **Carousel** | Container: `role="region"`, `aria-roledescription="carousel"`, `aria-label`. Track: `aria-live="polite"`. Slides: `role="group"`, `aria-roledescription="slide"`, `aria-label="Slide N of M"` |
| **Mobile menu toggle** | `aria-expanded={isOpen}`, `aria-controls="mobile-nav-menu"`, `aria-label="Toggle menu"` |
| **Toggle switch** | `role="switch"`, `aria-checked`, `aria-label` |
| **BMI result** | `aria-live="polite"`, `aria-atomic="true"` |
| **Search results** | `aria-live="polite"` on results container |
| **Form errors** | `role="alert"` on error container |
| **Decorative icons** | `aria-hidden="true"` on all Lucide icons that do not convey meaning |

#### Structured Data

- Organization, WebSite (with SearchAction), Product, Article, FAQPage,
  BreadcrumbList, CollectionPage, ItemList, MedicalWebPage, and HowTo schemas
  are output as JSON-LD on appropriate pages.

---

## Known Limitations and Remaining Work

### Priority 1 (Should address)

1. **`prefers-reduced-motion` support**: The hero Ken Burns animation, gold
   shimmer, and carousel auto-scroll do not currently pause for users who
   prefer reduced motion. A `@media (prefers-reduced-motion: reduce)` rule
   should disable or simplify these animations.
2. **Cookie consent focus management**: The cookie banner does not trap focus.
   While it is non-modal by design (users can still interact with the page),
   adding initial focus placement into the banner on first appearance would
   improve the keyboard experience.
3. **`aria-current="page"`**: Active navigation links do not indicate the
   current page. Adding `aria-current="page"` to the matching `<Link>` in both
   desktop and mobile nav would benefit screen reader users.
4. **Contact form success announcement**: The success state ("Message
   Received") is not wrapped in an `aria-live` region. Screen readers may not
   announce the state change.

### Priority 2 (Nice to have)

5. **Modal without title**: If a Modal is opened without a `title` prop, it
   lacks an accessible name. An `aria-label` fallback should be provided.
6. **Carousel keyboard arrows**: The InfiniteCarousel supports prev/next
   buttons but does not respond to Arrow Left / Arrow Right keys natively.
7. **Filter sidebar `aria-pressed`**: Category filter buttons do not use
   `aria-pressed` or `aria-current` to indicate the selected state to screen
   readers.
8. **Cookie policy table `scope`**: The cookie table in the privacy page does
   not use `<th scope="col">` on header cells.

### Priority 3 (Enhancements)

9. **High contrast mode testing**: The site has not been tested in Windows
   High Contrast Mode or with forced-colors media queries.
10. **Screen reader testing matrix**: Testing has been implementation-based.
    Manual testing with VoiceOver (macOS/iOS), NVDA, and JAWS is recommended
    before claiming full conformance.

---

## Testing Methodology

- Implementation audit of all ARIA attributes, roles, and patterns
- Tailwind class analysis for color contrast ratios
- Keyboard navigation flow verified in code (skip link, focus trap, tab order)
- Automated linting via ESLint with `eslint-config-next` (includes jsx-a11y)

---

## Feedback

We welcome feedback on the accessibility of this website. If you encounter
any barriers, please contact us:

- **Email:** info@awclinics.com
- **Phone:** (561) 536-3166
- **Response time:** We aim to respond within 5 business days.
