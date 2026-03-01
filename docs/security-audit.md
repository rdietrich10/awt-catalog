# Security Audit Report

**Entity:** Americare Wellness, LLC (d/b/a AW Therapeutics)
**Last audited:** February 28, 2026
**Classification:** Semi-sensitive (PHI-adjacent health information)

---

## Architecture Overview

- **Framework:** Next.js 14.2 (App Router) deployed on Vercel
- **Database:** Supabase (PostgreSQL) — stores contact and inquiry submissions
- **Email:** SendGrid — sends internal notification emails
- **Analytics:** Google Analytics 4 with Consent Mode v2
- **Image generation:** fal.ai (build-time scripts only, no runtime API calls)
- **Authentication:** None (no user accounts; catalog-only site)

---

## Security Controls Implemented

### 1. Transport Security

| Control | Implementation |
| --- | --- |
| HTTPS | Enforced via Vercel; HSTS header with `max-age=63072000; includeSubDomains; preload` |
| TLS version | Vercel enforces TLS 1.2+ |
| Certificate | Managed by Vercel (auto-renewal) |

### 2. HTTP Security Headers

All headers are set in `next.config.js` and apply to every route:

| Header | Value | Purpose |
| --- | --- | --- |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.supabase.co https://*.fal.ai; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'none'` | Restricts resource origins |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables device APIs |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents cross-origin embedding |

### 3. Input Validation

- **Library:** Zod (schema-based validation)
- **Contact form** (`/api/contact`): `name` (1-100 chars), `email` (valid format, max 254), `phone` (optional, max 20), `subject` (1-100), `message` (1-5000). All strings trimmed; email lowercased.
- **Inquiry form** (`/api/inquiry`): Same personal fields plus `products` array (1-50 items), each with `name` (max 200), `slug` (max 200), `category` (max 100).
- **Validation errors** return the first Zod issue message in a user-friendly wrapper. No internal details are exposed.

### 4. XSS Prevention

- **Email templates**: All user-provided values (`name`, `email`, `phone`, `subject`, `message`, product `name`, product `category`) are passed through `escapeHtml()` before interpolation into HTML email bodies.
- **`escapeHtml()`** replaces `&`, `<`, `>`, `"`, `'` with their HTML entity equivalents.
- **Front-end**: React's JSX escaping handles all user-visible rendering. No `dangerouslySetInnerHTML` is used on user content (only on `JSON.stringify` of structured data authored by developers).

### 5. Rate Limiting

- **Implementation**: In-memory rate limiter (`src/lib/rate-limit.ts`) using a `Map` keyed by `{route}:{ip}`.
- **Contact route**: 30 requests per 15-minute window per IP.
- **Inquiry route**: 20 requests per 15-minute window per IP.
- **Cleanup**: Expired entries are purged every 60 seconds.
- **Response**: 429 status with `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers.
- **Limitation**: In-memory store does not persist across Vercel serverless function instances. Under high load, a single IP could exceed limits by hitting different instances. See "Remaining Work" for mitigation.

### 6. Database Security (Supabase)

- **Row-Level Security (RLS)**: Enabled on `contact_submissions`, `inquiry_submissions`, and `audit_log`.
- **Anon key policies**:
  - `contact_submissions`: INSERT only, UPDATE for `email_sent` flag
  - `inquiry_submissions`: INSERT only, UPDATE for `email_sent` flag
  - `audit_log`: INSERT only
- **No SELECT/DELETE** via anon key; data is not readable from the client.
- **Server-side only**: The Supabase client (`supabase-server.ts`) uses `persistSession: false` and is imported only in API routes, never in client components.
- **Anon key exposure**: `SUPABASE_ANON_KEY` is not prefixed with `NEXT_PUBLIC_` and is only available in server-side code.

### 7. Audit Logging

- **Table**: `audit_log` in Supabase with columns: `id`, `event_type`, `table_name`, `record_id`, `actor`, `ip_address`, `details` (JSONB), `created_at`.
- **Events logged**: `contact_submission` (with subject, email_sent status), `inquiry_submission` (with product_count, email_sent status).
- **IP capture**: Extracted from `x-forwarded-for` header.
- **Indexes**: `idx_audit_log_event_type`, `idx_audit_log_created_at`.

### 8. Environment Variables

| Variable | Exposure | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (URL only, no key) | Supabase project URL |
| `SUPABASE_ANON_KEY` | Server-only | Supabase anon key for API routes |
| `SENDGRID_API_KEY` | Server-only | SendGrid email delivery |
| `FAL_API_KEY` | Build-time scripts only | fal.ai image generation |

- `.env` is listed in `.gitignore`.
- `.env.example` documents required variables without values.

### 9. Caching

- Static assets (`/images/*`, `/_next/static/*`): `Cache-Control: public, max-age=31536000, immutable`.
- API routes: No caching headers (dynamic server functions).

---

## Remaining Work

### Critical

1. **CSRF protection**: API routes do not verify a CSRF token. While the site
   has no auth and submissions are low-risk (contact form, inquiry list), a
   CSRF token or `SameSite=Strict` cookie approach would harden the forms.
2. **Distributed rate limiting**: Replace the in-memory rate limiter with
   Vercel KV or Upstash Redis to persist limits across serverless instances.

### Important

3. **CSP nonce**: Replace `'unsafe-inline'` in `script-src` with nonce-based
   CSP once Next.js supports it in the App Router (track next.js#48256).
4. **CSP reporting**: Add `report-uri` or `report-to` directive for monitoring
   CSP violations in production.
5. **`base-uri` and `form-action`**: Add `base-uri 'self'` and
   `form-action 'self'` to the CSP to prevent base tag injection and form
   hijacking.

### Optional

6. **Dependency audit**: Run `npm audit` and address the 26 reported
   vulnerabilities (12 moderate, 13 high, 1 critical — mostly in transitive
   dependencies).
7. **Subresource integrity**: Consider adding SRI hashes to third-party scripts
   (GA) if loading from CDN.
