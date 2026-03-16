# AW Therapeutics Peptide Catalog

A sophisticated peptide catalog for **AW Therapeutics** (Americare Wellness, LLC). Built with Next.js 14, this catalog showcases medical-grade compounded therapeutics across weight management, longevity, healing, reproductive health, and more.

---

## Features

### Product Catalog

- **40+ products** across 9 categories, sourced from official AW Therapeutics IFU documentation
- **Product detail pages** with variants, pricing, key benefits, administration routes, and dosing
- **Category browsing** with filtered product grids and search
- **Full-text search** across products, articles, glossary, and protocols

### Categories

| Category | Description |
|----------|-------------|
| Weight Management | GLP-1 agonists (Semaglutide, Tirzepatide, Retatrutide), lipolysis compounds |
| Growth Hormone & Recomposition | GH secretagogues, IGF-1, blends for lean muscle and metabolic support |
| Healing & Tissue Recovery | BPC-157, TB-500, GHK-Cu, healing blends |
| Reproductive & Hormonal Health | HCG, Gonadorelin, Kisspeptin |
| Longevity & Anti-Aging | Epitalon, MOTS-c, DSIP, Glutathione, NAD+ |
| Mood & Wellness | Emotional wellbeing, stress reduction compounds |
| Supplies | Bacteriostatic water, insulin syringes |
| Blood Testing & Analysis | Comprehensive biomarker panels (100+ markers) |
| Telehealth & Services | Medical reviews, consultations, VIP membership |

### Knowledge Center

- **Articles** — Educational content on peptides, biomarkers, physician-directed care, and regulation
- **FAQ** — Common questions with structured answers
- **Glossary** — Peptide and medical terminology
- **Protocols** — Dosing and administration guidance

### Forms & Submissions

- **Contact form** — General inquiries with rate limiting
- **Interest list** — Email capture for product interest
- **Inquiry submission** — Product interest with full address and product selection
- **Insurance verification** — Upload insurance card (front/back) for coverage verification

### Other Features

- **Insurance page** — How insurance works, verification flow, biomarker optimization
- **Quality control** — Quality report grid and trust indicators
- **How it works** — Patient journey from browse to physician review
- **Local landing pages** — Location-specific LP pages (e.g., Boynton Beach)
- **Accessibility** — Dedicated accessibility page and WCAG considerations
- **Policies** — Privacy, terms, HIPAA notice, cookie consent

---

## Tech Stack

| Service | Purpose |
|---------|---------|
| **Next.js 14** | React framework, App Router |
| **Vercel** | Hosting, deployment, serverless functions |
| **Supabase** | PostgreSQL database, storage, audit logging |
| **SendGrid** | Transactional email notifications |
| **Fal AI** | AI-powered image generation (build-time) |

---

## How We Use Each Service

### Vercel

- **Hosting** — The catalog is deployed as a Next.js app on Vercel
- **Serverless API routes** — Contact, inquiry, and insurance verification run as serverless functions
- **Edge caching** — Static assets and images use immutable cache headers
- **Preview deployments** — Every branch gets a preview URL via `vercel` CLI

**Deploy commands:**
```bash
npm run deploy:preview   # Preview deployment
npm run deploy          # Production (vercel --prod)
```

---

### Supabase

Supabase provides the backend for form submissions and audit trails.

**Database tables:**
- `contact_submissions` — Contact form data (name, email, subject, message)
- `inquiry_submissions` — Product inquiry data with full address and product selection
- `insurance_verification_requests` — Insurance verification with card image paths
- `audit_log` — Event log for submissions (event_type, ip_address, details)

**Storage bucket:**
- `insurance-cards` — Uploaded insurance card images (front/back) for verification

**Security:**
- Row-Level Security (RLS) — Anon key has INSERT-only (and limited UPDATE) on submission tables
- No SELECT/DELETE from client — Data is only written; read access is via Supabase dashboard
- Server-side only — Supabase client uses `persistSession: false` and is imported only in API routes

---

### SendGrid

SendGrid sends transactional emails when forms are submitted.

**Email types:**
- **Contact notification** — New contact form submission → `info@awclinics.com`
- **Inquiry notification** — Product inquiry with full details and selected products
- **Insurance verification notification** — New verification request with reference ID

All emails use branded HTML templates (`src/lib/email-templates.ts`) with proper escaping of user content.

---

### Fal AI — Image Generation

All catalog imagery is generated using [fal.ai](https://fal.ai) with the **Nano Banana 2** (`fal-ai/nano-banana-2`) and **Nano Banana Pro** (`fal-ai/nano-banana-pro`) models. Image generation runs **at build time via scripts** — there are no runtime API calls. This keeps customer spend predictable and images cached.

#### Two Generation Modes

**1. Text-to-image** — Prompts only, no base image. Used for:
- OG/social sharing images
- Lifestyle images (hero, category, article)
- How-it-works imagery

**2. Image edit** — Base image + prompt. Used for:
- **Product images** — A base vial/bottle image is passed; the model updates only the label text for each product (e.g., "Semaglutide 5 mg", "BPC-157 10 mg")

#### Visual Direction

Lifestyle images follow a cohesive brand aesthetic:
- **Monochromatic photography** — Black, charcoal, grey, silver, white. Editorial, Hasselblad-quality.
- **Clinical gold annotation overlay** — Amber-gold (#D4AF37) marks (boxes, arrows, brackets) overlaid as if a lab scientist annotated the photo. The only color in the image.

#### Scripts

| Script | Purpose |
|--------|---------|
| `npm run generate:og-image` | Single OG image for social sharing |
| `npm run generate:og-images` | Batch OG images for multiple pages |
| `npm run generate:sema-image` | Base Sema GLP-1 product vial |
| `npm run generate:product-images` | All product images (edit base + label per product) |
| `npm run generate:lifestyle-images` | Hero, category, article lifestyle images |
| `npm run generate:blur-placeholders` | Blur hashes for Next.js Image placeholders |
| `npm run generate:rfk-image` | Article-specific image (edit with reference photo) |

**Environment:** `FAL_API_KEY` or `FAL_KEY` in `.env`. See [docs/image-generation.md](docs/image-generation.md) for full details.

---

## Developer Setup

### Prerequisites

- Node.js 18+
- npm

### 1. Clone and install

```bash
git clone <repo-url>
cd catalog-pep
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SENDGRID_API_KEY` | For forms | SendGrid API key (emails won't send without it) |
| `FAL_API_KEY` or `FAL_KEY` | For image scripts | fal.ai API key for image generation |

### 3. Supabase setup

Create a Supabase project at [supabase.com](https://supabase.com). You'll need:

**Tables** (create via SQL or Supabase dashboard):
- `contact_submissions` — `id`, `name`, `email`, `phone`, `subject`, `message`, `email_sent`, `created_at`
- `inquiry_submissions` — `id`, `first_name`, `last_name`, `sex`, `address1`, `address2`, `city`, `state`, `zip`, `phone`, `email`, `products` (JSONB), `email_sent`, `created_at`
- `insurance_verification_requests` — `id`, `first_name`, `last_name`, `date_of_birth`, address fields, `insurance_company`, `policy_number`, `card_front_path`, `card_back_path`, `email_sent`, `created_at`
- `audit_log` — `id`, `event_type`, `table_name`, `record_id`, `actor`, `ip_address`, `details` (JSONB), `created_at`

**Storage bucket:** `insurance-cards` (for insurance card uploads)

**RLS policies:** INSERT-only for anon key on submission tables; INSERT-only on `audit_log`. See `docs/security-audit.md` for details.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** If forms fail, ensure Supabase and SendGrid env vars are set. The app will run without them, but contact/inquiry/insurance endpoints will error.

### 5. (Optional) Generate images

If you have `FAL_API_KEY`:

```bash
npm run generate:og-image
npm run generate:product-images 5   # First 5 products
npm run generate:lifestyle-images 0 3
```

Placeholder images will show if generated images don't exist.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes (contact, inquiry, insurance-verification)
│   ├── products/            # Product listing and detail
│   ├── categories/         # Category pages
│   ├── knowledge/          # Articles, FAQ, glossary, protocols
│   ├── contact/            # Contact form
│   ├── insurance/          # Insurance verification
│   ├── interest-list/      # Interest list / email capture
│   ├── lp/                 # Landing pages
│   └── ...
├── components/             # React components
├── data/                   # Products, categories, articles, glossary, FAQ
├── lib/                    # Utilities, email, Supabase, validations
└── types/                  # TypeScript types

scripts/                    # Build-time scripts (image generation, etc.)
docs/                       # Documentation (image-generation, compliance, etc.)
public/images/              # Generated and static images
```

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to Vercel production |
| `npm run deploy:preview` | Deploy preview |
| `npm run generate:og-image` | Generate OG image |
| `npm run generate:product-images [start] [count]` | Generate product images |
| `npm run generate:lifestyle-images [start] [count]` | Generate lifestyle images |
| `npm run generate:blur-placeholders` | Update blur hashes for images |

---

## Documentation

- [Image Generation](docs/image-generation.md) — Fal AI usage, prompts, visual direction
- [Security Audit](docs/security-audit.md) — Architecture, controls, env vars
- [Compliance Overview](docs/compliance-overview.md) — HIPAA-adjacent considerations

---

## License

Proprietary — Americare Wellness, LLC (d/b/a AW Therapeutics)
