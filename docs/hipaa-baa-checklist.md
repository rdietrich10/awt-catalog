# Business Associate Agreement (BAA) Checklist

**Entity:** Americare Wellness, LLC (d/b/a AW Therapeutics)
**Last reviewed:** 2026-02-28

## Required BAAs

A Business Associate Agreement is required with every third-party vendor that
creates, receives, maintains, or transmits Protected Health Information (PHI)
on behalf of the covered entity.

| Vendor | Service | PHI handled | BAA status |
| --- | --- | --- | --- |
| **Supabase** | Database (contact + inquiry submissions) | Name, email, phone | Required — Supabase offers a BAA on Team plan and above |
| **SendGrid (Twilio)** | Transactional email | Name, email, phone, product selections | Required — Twilio offers a HIPAA-eligible environment and BAA |
| **Vercel** | Hosting / CDN | Passes requests containing PHI to API routes | Required — Vercel offers a BAA on Enterprise plan |
| **Google Analytics** | Web analytics | IP address (pseudonymized), browsing behavior | Evaluate — GA4 IP anonymization may exempt this, but consent is required regardless |

## BAA Provisions Checklist

Each BAA must address:

- [ ] Permitted uses and disclosures of PHI
- [ ] Obligation to safeguard PHI (administrative, technical, physical)
- [ ] Obligation to report breaches of unsecured PHI
- [ ] Requirement to ensure subcontractors agree to the same restrictions
- [ ] Availability of PHI for access requests
- [ ] Return or destruction of PHI on termination
- [ ] Availability of internal practices, records for HHS audit

## Encryption Standards

| Layer | Method | Notes |
| --- | --- | --- |
| In transit | TLS 1.2+ (HTTPS) | Enforced via HSTS header with 2-year max-age, includeSubDomains, preload |
| At rest (Supabase) | AES-256 | Supabase encrypts all data at rest by default |
| At rest (SendGrid) | AES-256 | Twilio encrypts stored data at rest |
| At rest (Vercel) | AES-256 | Vercel encrypts at rest on all plans |

## Action Items

1. Confirm Supabase plan supports BAA and execute agreement
2. Execute Twilio/SendGrid BAA via their HIPAA compliance portal
3. Evaluate Vercel Enterprise BAA or document risk acceptance
4. Ensure Google Analytics consent mode is implemented (no PHI in GA)
