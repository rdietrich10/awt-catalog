# HIPAA Breach Notification Procedure

**Entity:** Americare Wellness, LLC (d/b/a AW Therapeutics)
**Last reviewed:** 2026-02-28

## Definitions

A **breach** is the acquisition, access, use, or disclosure of Protected Health
Information (PHI) in a manner not permitted by the HIPAA Privacy Rule that
compromises the security or privacy of the PHI.

## Breach Risk Assessment

When a potential breach is identified, perform a four-factor risk assessment:

1. **Nature and extent of PHI involved** — types of identifiers, likelihood of
   re-identification
2. **Unauthorized person** — who accessed or received the PHI
3. **Whether PHI was actually acquired or viewed** — versus a theoretical exposure
4. **Extent of risk mitigation** — steps already taken to reduce harm

## Notification Requirements

### Individual Notification (within 60 days of discovery)

- Written notice to each affected individual
- Sent via first-class mail or email (if individual has agreed to electronic notice)
- Must include:
  - Description of the breach
  - Types of information involved
  - Steps individuals should take to protect themselves
  - What the entity is doing to investigate and mitigate
  - Contact information for questions

### HHS Notification

- **500+ individuals affected:** Notify HHS within 60 days of discovery
- **Fewer than 500:** May log and submit annually (within 60 days of end of calendar year)
- Submit via HHS Breach Reporting Portal: https://ocrportal.hhs.gov/ocr/breach/wizard_breach.jsf

### Media Notification (500+ individuals in a state or jurisdiction)

- Notify prominent media outlets in the affected area within 60 days

## Incident Response Steps

1. **Contain** — Immediately stop the unauthorized access or disclosure
2. **Document** — Record the date of discovery, nature of breach, PHI involved,
   individuals affected, and remediation steps
3. **Assess** — Perform the four-factor risk assessment above
4. **Notify** — Issue required notifications per the timeline above
5. **Remediate** — Implement corrective actions to prevent recurrence
6. **Log** — Maintain a breach log for a minimum of 6 years

## Internal Breach Log

All incidents (including near-misses) should be recorded in the `audit_log`
table in Supabase with `event_type = 'security_incident'`.

## Contact

- **Privacy Officer:** [Designate a privacy officer]
- **Email:** info@awclinics.com
- **Phone:** (561) 536-3166
