# Compliance Overview

**Entity:** Americare Wellness, LLC (d/b/a AW Therapeutics)
**Last reviewed:** February 28, 2026

This document provides a consolidated view of all regulatory and compliance
domains addressed by the AW Therapeutics website, the current implementation
status, and outstanding action items.

---

## 1. Accessibility (ADA / WCAG 2.1 AA)

**Status:** Substantially compliant. Built to spec, not bolted on.

### What was done

- Skip-to-content link for keyboard navigation
- Full ARIA implementation across Modal (dialog + focus trap), FAQ Accordion
  (expanded/controls/region), Navigation (expanded/controls/labels), Carousel
  (roledescription/slides/live), Search (role=search), Forms (labels, alerts,
  live regions), Cookie Consent (dialog/switch)
- Global `focus-visible` gold outline on all interactive elements
- Color contrast audit: introduced `brand-silver-accessible` (#999999, 5.5:1)
  to replace failing `brand-silver-dim` (#585858, 3.2:1) on meaningful text
- All images have descriptive alt text; decorative images use `alt=""`
- Semantic HTML landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>`
- Document language set (`<html lang="en">`)
- Touch targets meet 44x44px minimum on mobile

### What remains

- `prefers-reduced-motion` media query for animations (hero, carousel, shimmer)
- `aria-current="page"` on active navigation links
- Success state `aria-live` on contact form
- Manual screen reader testing (VoiceOver, NVDA, JAWS)
- Windows High Contrast Mode testing

**Full details:** [accessibility-statement.md](accessibility-statement.md)

---

## 2. HIPAA (Health Insurance Portability and Accountability Act)

**Status:** Foundational controls in place. BAA execution pending.

### What was done

- **Notice of Privacy Practices** published at `/privacy` covering PHI uses
  (treatment, payment, operations, legal), information sharing, patient rights
- **HIPAA consent checkbox** on inquiry form with acknowledgment text
- **Encryption in transit:** TLS 1.2+ enforced via HSTS (2-year max-age)
- **Encryption at rest:** Supabase (AES-256), SendGrid (AES-256), Vercel (AES-256)
- **Minimum necessary standard:** Forms collect only name, email, phone, and
  product selections — no diagnoses, SSNs, or detailed health records
- **Audit logging:** All form submissions logged to `audit_log` table in
  Supabase with event type, IP address, timestamp, and details
- **Row-Level Security:** Supabase tables restrict anon key to INSERT-only;
  no read access to submission data via the public API
- **BAA checklist** documenting required agreements with Supabase, SendGrid,
  Vercel, and Google Analytics
- **Breach notification procedure** documenting the 60-day notification
  timeline, HHS reporting, and internal incident response steps

### What remains

- **Execute BAAs** with Supabase (Team plan required), SendGrid/Twilio, and
  Vercel (Enterprise plan)
- **Designate a Privacy Officer** (referenced in breach procedure but unnamed)
- **Workforce training** documentation (HIPAA requires documented training)
- **Risk assessment** — formal HIPAA Security Risk Assessment (SRA) per 45 CFR
  164.308(a)(1)(ii)(A)
- **Physical safeguards** documentation (server access, device policies)
- **PHI access controls** — if admin dashboard is ever built, implement
  role-based access with MFA

**Full details:** [hipaa-baa-checklist.md](hipaa-baa-checklist.md),
[hipaa-breach-response.md](hipaa-breach-response.md)

---

## 3. CCPA (California Consumer Privacy Act)

**Status:** Compliant for current data practices.

### What was done

- **Right to Know** disclosure on `/privacy#ccpa`
- **Right to Delete** disclosure with contact method
- **Right to Opt-Out of Sale** disclosure (AW does not sell personal data;
  explicitly stated)
- **Right to Non-Discrimination** disclosure
- **How to Submit a Request** with email and phone contact, 45-day response
  commitment
- **"Do Not Sell My Information"** link in the website footer linking to
  `/privacy#ccpa`
- **Cookie consent banner** with opt-in/opt-out for analytics cookies
- **Data retention policy** published: 6 years for submissions and audit logs,
  with deletion available on request

### What remains

- **Privacy policy "last 12 months" data disclosure**: CCPA requires listing
  the categories of personal information collected in the preceding 12 months.
  The current disclosure is general; consider adding a specific table.
- **Authorized agent requests**: Document the process for authorized agents
  making requests on behalf of consumers.
- **Annual review**: CCPA disclosures should be reviewed annually.

---

## 4. Cookie Compliance (ePrivacy / GDPR-adjacent)

**Status:** Compliant.

### What was done

- **Cookie consent banner** with three options: Accept All, Reject
  Non-Essential, Manage Preferences
- **Google Consent Mode v2**: GA loads with `analytics_storage: 'denied'` by
  default; upgraded to `'granted'` only on explicit consent
- **IP anonymization** enabled in GA config (`anonymize_ip: true`)
- **Cookie policy** published at `/privacy#cookies` with a table of all
  cookies: `aw_cookie_consent` (essential, 1 year), `_ga / _ga_*` (analytics,
  2 years)
- **Cookie preferences persist** in a first-party cookie (`aw_cookie_consent`)
  with `SameSite=Lax; Secure`
- **Re-consent mechanism**: "Cookie Settings" button in footer reopens the
  preference manager at any time
- **No marketing cookies** are used; no third-party ad trackers

### What remains

- **Cookie policy for Supabase**: Verify whether the Supabase JS client sets
  any cookies (it uses `persistSession: false`, so it should not).
- **GDPR considerations**: If the site serves EU residents, add explicit GDPR
  language and right-to-erasure process. Current setup meets the spirit but
  does not reference the GDPR by name.

---

## 5. Security

**Status:** Strong baseline. See dedicated report for full details.

### What was done

- Content Security Policy (CSP) with allowlisted origins
- HSTS with 2-year max-age, preload
- X-Frame-Options DENY, X-Content-Type-Options nosniff
- Cross-Origin-Opener-Policy, Cross-Origin-Resource-Policy
- Zod schema validation on all API inputs with max-length enforcement
- HTML escaping (`escapeHtml()`) on all user input in email templates
- Rate limiting: 30 req/15min (contact), 20 req/15min (inquiry) per IP
- Supabase RLS with INSERT-only policies for the public key
- Audit logging of all submissions with IP and event metadata
- Permissions-Policy disabling camera, microphone, geolocation

### What remains

- CSRF token implementation
- Distributed rate limiting (Vercel KV or Upstash Redis)
- CSP nonce to replace `'unsafe-inline'`
- CSP reporting (`report-to` directive)
- npm dependency audit remediation

**Full details:** [security-audit.md](security-audit.md)

---

## 6. SEO & Structured Data

**Status:** Comprehensive.

### What was done

- Canonical URLs on all 18+ pages (static and dynamic)
- Open Graph and Twitter Card metadata on every page with per-page images
- JSON-LD structured data: Organization, WebSite (with SearchAction), Product,
  Article, FAQPage, BreadcrumbList, CollectionPage, ItemList, MedicalWebPage,
  HowTo
- `robots.ts` allowing all crawlers, disallowing `/api/`
- `sitemap.ts` with all static, product, category, and article routes
- `manifest.ts` for PWA support
- `theme-color` meta tag
- `dns-prefetch` and `preconnect` for Google Analytics and Google Fonts

---

## 7. Legal Pages

| Page | Route | Content |
| --- | --- | --- |
| Notice of Privacy Practices | `/privacy` | HIPAA notice, Cookie Policy, CCPA Rights, Data Retention |
| Policies | `/policies` | Telehealth Disclaimer, Compounding Disclosure, Regulatory Disclosure, Assumption of Risk, Refund/Cancellation, Shipping, Confirmation |

---

## Public-Facing Statement Recommendations

The following pages should be created or linked from the website footer:

1. **Accessibility Statement** (`/accessibility`) — Public declaration of
   WCAG 2.1 AA commitment, measures taken, known limitations, and contact
   information for accessibility feedback. Content from
   `docs/accessibility-statement.md`.

2. **Privacy Notice** (`/privacy`) — Already exists. Consolidates HIPAA
   notice, Cookie Policy, CCPA rights, and data retention in one page.

3. **Do Not Sell My Information** — Already linked in footer to
   `/privacy#ccpa`. No separate page needed since the disclosure is on the
   privacy page.

4. **Cookie Policy** — Already included as a section at `/privacy#cookies`.
   No separate page needed unless you prefer a standalone route.

No additional public pages are strictly required. The existing `/privacy` and
`/policies` pages, combined with the footer links and cookie consent banner,
cover the regulatory requirements for HIPAA, CCPA, and cookie compliance.
The only new public page recommended is an Accessibility Statement.
