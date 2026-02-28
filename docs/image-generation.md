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

All lifestyle images share a cohesive visual DNA:

- **Palette:** Predominantly monochromatic — black, charcoal, grey, silver, white — with optional **selective color accents** (see below).
- **Photography style:** Editorial, Hasselblad H6D-400c quality. Shallow depth of field where appropriate.
- **Lighting:** Dramatic, directional. Sculpted key light with controlled shadows. Rim/hair light for separation.
- **Mood:** Pharmaceutical precision meets luxury design. Aesop meets Porsche Design meets Apple.
- **Humans (when present):** Shot from behind, in profile, or abstracted (torso, hands, silhouette). Never stock-photo smiling.
- **Environments:** Ultra-clean. Concrete, glass, steel, marble. Modern architecture. Minimalist labs.

### Selective Color — "Pops of Color"

Images are predominantly monochromatic (black, charcoal, grey, silver, white), but a **single, deliberate pop of color** is permitted per image to draw the viewer's eye to the conceptual focus of the composition.

**Rules:**

1. The pop of color is always **semantic** — it represents the subject matter, area of study, or emotional focus of the image. Color is information, not decoration.
2. Everything outside the focal element remains desaturated, silver-toned black and white.
3. The color should feel like a carefully placed graphic element against the silver-toned photograph — bold and intentional, never accidental or subtle.
4. Only one color family per image. No rainbow, no multi-color.

**Aesthetic references:** Milton Glaser, Saul Bass — graphical, bold, classic-modern/postmodern. Think iconic poster design applied to editorial photography.

**Examples of semantic color use:**

| Context | Color Accent | What It Represents |
|---------|-------------|-------------------|
| RFK Jr. on Joe Rogan | Deep red velvet curtain | The iconic JRE set — a moment of political consequence |
| Healing / tissue recovery | Warm amber or gold overlay on the body | The site of healing, where biology is at work |
| Growth hormone / recomposition | Cool electric blue contour on musculature | The body as engineered system, cellular precision |
| Longevity / anti-aging | Soft emerald or jade on cellular structures | Renewal, vitality, the living architecture of cells |
| Weight management | Warm coral or terracotta on the figure in motion | Metabolic energy, transformation |
| Wellness / mood | Pale violet or lavender in ambient light | Calm, emotional equilibrium, neurochemistry |

These are guidelines, not rigid rules. The color should always serve the story the image is telling.

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
