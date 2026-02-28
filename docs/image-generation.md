# Image Generation

All images are generated using [fal.ai](https://fal.ai) with the **Nano Banana 2** (`fal-ai/nano-banana-2`) model (upgraded from Nano Banana Pro).

## OG / Social Sharing Image

The Open Graph image (`public/images/og-image.png`) is used for link previews on social platforms (Facebook, Twitter, LinkedIn, etc.).

To regenerate:

```bash
npm run generate:og-image
```

Requires `FAL_API_KEY` or `FAL_KEY` in `.env`.

---

## Product Image Generation

## Generate Sema GLP-1 Image

To generate the Sema GLP-1 product image:

1. Create a fal.ai account and obtain an API key from [fal.ai/dashboard](https://fal.ai/dashboard).
2. Run:

```bash
FAL_KEY=<your-key> npm run generate:sema-image
```

The script will:
- Call the Nano Banana Pro model with a high-end studio photography prompt
- Download the generated image to `public/images/products/sema-glp-1.png`

## Generate Multiple Product Images

To generate images for multiple products from the base Sema GLP-1 bottle:

```bash
npm run generate:product-images [limit]
```

Example (first 5 products):

```bash
npm run generate:product-images 5
```

The script passes the base bottle image and prompts the model to update only the label text for each product. After generation, update `src/data/products.ts` with the new image paths.

## Adding Images for Other Products

1. Add the product to `PRODUCTS` in `scripts/generate-all-product-images.mjs` if using batch generation.
2. Or run `generate:sema-image` for a one-off custom product.
3. Update the product's `image` field in `src/data/products.ts`.

---

## Lifestyle Image Generation

Lifestyle images (hero, category, article) are generated using the same fal.ai **Nano Banana 2** model in **text-to-image** mode (no base image — unlike product label edits). Article-specific images with reference photos use the **edit** endpoint (`fal-ai/nano-banana-2/edit`).

### Visual Direction

All lifestyle images share a cohesive visual DNA built on two layers: **monochromatic photography** and **clinical gold annotation overlay**.

#### Layer 1 — Base Photography

- **Palette:** Strictly monochromatic — black, charcoal, grey, silver, white. Completely desaturated.
- **Photography style:** Editorial, Hasselblad H6D-400c quality. Photorealistic. Shallow depth of field where appropriate.
- **Lighting:** Dramatic, directional. Sculpted key light with controlled shadows. Rim/hair light for separation.
- **Mood:** Pharmaceutical precision meets luxury design. Aesop meets Porsche Design meets Apple.
- **Humans (when present):** Shot from behind, in profile, or abstracted (torso, hands, silhouette). Never stock-photo smiling.
- **Environments:** Ultra-clean. Concrete, glass, steel, marble. Modern architecture. Minimalist labs.

#### Layer 2 — Clinical Annotation Overlay ("Pops of Color")

Overlaid on the monochromatic photography are precise **amber-gold (#D4AF37)** clinical annotation marks — as if a lab scientist or medical reviewer physically marked up a printed photograph with a gold felt-tip pen. These marks are the **only color** in the image.

**Rules:**

1. Annotations are **geometric and intentional**: rectangles/boxes around areas of interest, straight underlines, bracket marks, corner crop marks, precise arrows, margin tick marks, measurement lines, circle marks. This is **graphic design, not artistic expression** — structured, systematic, deliberate.
2. Multiple annotation elements per image — **at least 5-8 distinct gold marks** spread across the composition. The image should feel thoroughly reviewed and annotated.
3. Marks are drawn around the **conceptual focus** of the image — whatever the subject is, the gold annotations identify, highlight, and call attention to it.
4. The marks have the character of a felt-tip marker on glossy photo paper — slightly textured, mostly opaque, with occasional pen-pressure variation and minor drips where the pen paused.
5. Only amber-gold (#D4AF37). No other colors. Everything in the photography itself remains monochrome.

**Think:** A forensic scientist marking evidence on a photograph. A radiologist circling findings on a scan. An engineer red-lining a blueprint. A lab director reviewing batch documentation — but in gold instead of red.

**Aesthetic references:** Clinical review documents, QA inspection photography, architectural red-lines, forensic annotation — combined with the luxury editorial sensibility of the brand.

**Examples of annotation use:**

| Context | Annotation Focus | What the Marks Highlight |
|---------|-----------------|------------------------|
| Browse & Select | Hand pointing at vial | Gold box around selected vial, arrows to fingertip, corner crops, measurement ticks |
| Physician Review | Vial being examined | Gold circle around vial, brackets on physician's hands, arrows to stethoscope |
| Shipping / Delivery | Open package on doorstep | Gold rectangle around box, individual boxes on each vial, arrows pointing inward |
| Hero | Vial on plinth | Gold accent on the vial liquid — the focal product (hero may use amber liquid as pop instead of annotation marks) |
| Category images | The human subject | Gold annotation marks identifying the area of treatment/focus |
| Article images | The key concept | Gold marks boxing/circling the primary subject of the article |

The hero image is an exception — it uses **amber-gold liquid inside the vial** as the pop of color rather than annotation marks, for maximum cinematic impact at the largest display size.

### Generate Lifestyle Images

```bash
npm run generate:lifestyle-images [startIndex] [count]
```

Examples:

```bash
npm run generate:lifestyle-images 0 5    # first 5 images (hero, value-props, 3 categories)
npm run generate:lifestyle-images 5 5    # next 5 images (3 categories, 2 articles)
npm run generate:lifestyle-images 10 4   # last 4 images (4 articles)
```

The 14 images are generated in this order:

| Index | Slug | Output Directory | Aspect |
|-------|------|-----------------|--------|
| 0 | `hero` | `/public/images/lifestyle/` | 21:9 |
| 1 | `value-props` | `/public/images/lifestyle/` | 16:9 |
| 2 | `weight-management` | `/public/images/categories/` | 16:9 |
| 3 | `growth-hormone-recomposition` | `/public/images/categories/` | 16:9 |
| 4 | `healing-tissue-recovery` | `/public/images/categories/` | 16:9 |
| 5 | `reproductive-hormonal-health` | `/public/images/categories/` | 16:9 |
| 6 | `longevity-anti-aging` | `/public/images/categories/` | 16:9 |
| 7 | `wellness-mood` | `/public/images/categories/` | 16:9 |
| 8 | `intro-peptides` | `/public/images/articles/` | 16:9 |
| 9 | `safety-protocols` | `/public/images/articles/` | 16:9 |
| 10 | `stacking-guide` | `/public/images/articles/` | 16:9 |
| 11 | `glp-1-overview` | `/public/images/articles/` | 16:9 |
| 12 | `healing-peptides` | `/public/images/articles/` | 16:9 |
| 13 | `longevity-protocols` | `/public/images/articles/` | 16:9 |

### Where Images Are Referenced

The image paths are already wired into the codebase:

- **Hero:** `src/components/home/HeroSection.tsx` → `/images/lifestyle/hero.png`
- **Value Props:** `src/components/home/ValueProps.tsx` → `/images/lifestyle/value-props.png`
- **Categories:** `src/data/categories.ts` → `/images/categories/<slug>.png`
  - Used in `CategoryShowcase.tsx`, `/categories`, `/categories/[slug]`
- **Articles:** `src/data/articles.ts` → `/images/articles/<slug>.png`
  - Used in `/knowledge/articles`, `/knowledge/articles/[slug]`

All `PlaceholderImage` components gracefully fall back to the vial silhouette placeholder when images are not yet generated.

---

## Article-Specific Image Generation

Some articles require reference-based image generation (e.g., a real person's likeness). These use the **edit** endpoint with uploaded reference images.

### RFK Jr. — Peptide Regulation 2026

```bash
npm run generate:rfk-image
```

Uses the official HHS portrait (`public/images/articles/rfk-jr-hhs-portrait.jpg`) as a reference input to generate an editorial image of RFK Jr. speaking on the Joe Rogan Experience. Demonstrates the **selective color** technique: monochromatic subject with a bold red velvet curtain as the sole color accent.
