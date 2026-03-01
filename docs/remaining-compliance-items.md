# Remaining Compliance Items

**Last reviewed:** February 28, 2026

Prioritized backlog of compliance work that has not yet been completed. Items
are grouped by urgency and regulatory domain.

---

## Tier 1 — Should Complete Before Launch / Next Audit

### HIPAA

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 1 | **Execute BAA with Supabase** | Admin | Requires Supabase Team or Enterprise plan |
| 2 | **Execute BAA with SendGrid/Twilio** | Admin | Available through Twilio's HIPAA portal |
| 3 | **Execute BAA with Vercel** | Admin | Requires Vercel Enterprise plan; evaluate risk acceptance if not on Enterprise |
| 4 | **Designate a Privacy Officer** | Admin | Update `docs/hipaa-breach-response.md` and privacy page with name/title |
| 5 | **Conduct formal HIPAA Security Risk Assessment (SRA)** | 1–2 days | Required by 45 CFR 164.308(a)(1)(ii)(A); document findings and remediation plan |

### Accessibility

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 6 | **Add `prefers-reduced-motion` support** | 2 hours | Disable hero Ken Burns, carousel auto-scroll, and gold shimmer animations when the user prefers reduced motion. Add a `@media (prefers-reduced-motion: reduce)` block in `globals.css` |
| 7 | **Add `aria-current="page"` to active nav links** | 1 hour | Compare current pathname to link `href` in Navbar and set `aria-current="page"` |
| 8 | **Add `aria-live` to contact form success state** | 30 min | Wrap the "Message Received" success message in `<div aria-live="polite">` |

### Security

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 9 | **Distributed rate limiting** | 2–3 hours | Replace in-memory Map with Vercel KV or Upstash Redis so limits persist across serverless instances |
| 10 | **Add CSRF protection** | 2–3 hours | Generate a CSRF token on page load, include in form submissions, validate server-side. Or use `SameSite=Strict` on a session cookie approach |

---

## Tier 2 — Should Complete Within 30 Days

### Accessibility

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 11 | **Manual screen reader testing** | 4–6 hours | Test with VoiceOver (macOS/iOS), NVDA (Windows), and JAWS. Document findings |
| 12 | **Windows High Contrast Mode testing** | 1–2 hours | Test with `forced-colors` media query; verify all interactive elements remain visible |
| 13 | **Modal aria-label fallback** | 30 min | When `title` prop is absent, pass an `aria-label` to the dialog |
| 14 | **Filter sidebar `aria-pressed`** | 30 min | Add `aria-pressed={isSelected}` to category filter buttons |
| 15 | **Cookie table `<th scope="col">`** | 15 min | Add `scope="col"` to cookie policy table header cells |

### Security

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 16 | **Add `base-uri` and `form-action` to CSP** | 15 min | `base-uri 'self'; form-action 'self'` |
| 17 | **Add CSP reporting** | 1 hour | Add `report-to` directive and configure a reporting endpoint (e.g., Report URI, Sentry) |
| 18 | **Run `npm audit fix`** | 1 hour | Address the 26 known vulnerabilities in transitive dependencies |

### CCPA

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 19 | **Add "categories collected" table** | 1 hour | CCPA requires listing categories of personal information collected in the preceding 12 months. Add a table to `/privacy#ccpa` |
| 20 | **Document authorized agent process** | 30 min | Add a section for how authorized agents can submit requests on behalf of consumers |

---

## Tier 3 — Ongoing / As-Needed

### HIPAA

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 21 | **Workforce training documentation** | Ongoing | HIPAA requires documented training for all workforce members who handle PHI |
| 22 | **Physical safeguards policy** | Document | If any physical devices store PHI, document access controls and disposal procedures |
| 23 | **Annual HIPAA review** | Annual | Review privacy practices, BAAs, breach log, and training records annually |

### GDPR (if serving EU residents)

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 24 | **Add GDPR language to privacy page** | 2 hours | Reference GDPR by name, add lawful basis for processing, right to erasure, data portability, DPO contact |
| 25 | **Data Processing Agreement (DPA)** | Admin | Ensure DPAs are in place with Supabase, SendGrid, and Vercel |

### Cookie Compliance

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 26 | **Verify Supabase client cookies** | 15 min | Confirm `persistSession: false` prevents any cookie creation |
| 27 | **Annual cookie audit** | Annual | Review all cookies when new third-party integrations are added |

### Accessibility

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| 28 | **Carousel keyboard arrows** | 1 hour | Add Left/Right arrow key navigation to InfiniteCarousel |
| 29 | **Automated accessibility testing in CI** | 2 hours | Add axe-core or pa11y to the build pipeline for regression testing |

---

## Summary by Status

| Domain | Implemented | Remaining (Tier 1) | Remaining (Tier 2+) |
| --- | --- | --- | --- |
| Accessibility (WCAG 2.1 AA) | 25+ controls | 3 items | 7 items |
| HIPAA | 10 controls | 5 items (admin) | 3 items |
| CCPA | 7 controls | 0 items | 2 items |
| Cookie Compliance | 6 controls | 0 items | 2 items |
| Security | 12 controls | 2 items | 3 items |
| SEO | 10 controls | 0 items | 0 items |
