#!/usr/bin/env node

/**
 * Generate black & white logo options for the AW Therapeutics brand page
 * using fal.ai Nano Banana 2 — creative variety batch.
 *
 * Usage: node --env-file=.env scripts/generate-brand-logos.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const OUTPUT_DIR = `${ROOT}/public/images/brand`;

const CORE = `
ABSOLUTE REQUIREMENTS:
- Strictly black and white ONLY. No grey, no color, no gradients, no textures.
- HORIZONTAL layout — everything on ONE LINE. Never stacked, never two rows.
- "AW" on the LEFT, "THERAPEUTICS" to the RIGHT.
- This is a LOGO DESIGN, not plain typed text. It should look like a professional graphic designer created custom letterforms.
- The logo must have PERSONALITY and FLAIR — distinctive, memorable, ownable.
- NO generic Helvetica/Gotham/Arial vibes. This needs to stand out.
- Generous negative space around the logo. Logo centered in frame.
- Suitable for a luxury physician-directed medical therapeutics company.`;

const logos = [
  // 1. Art Deco / Gatsby
  {
    name: "logo-artdeco-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — Art Deco inspired horizontal wordmark on solid black background, white letterforms. Elegant 1920s geometric Art Deco lettering with decorative angular serifs, thin inline details within the strokes, and sophisticated diamond/chevron flourishes integrated into the letterforms. The A has a sharp peaked apex with a decorative crossbar. The W has angular geometric facets. THERAPEUTICS in matching Art Deco style but slightly smaller. Luxurious, ornate yet structured. Like a logo for a high-end Manhattan hotel from the Jazz Age. ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-artdeco-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — Art Deco inspired horizontal wordmark on solid white background, black letterforms. Elegant 1920s geometric Art Deco lettering with decorative angular serifs, thin inline details within the strokes, and sophisticated diamond/chevron flourishes integrated into the letterforms. The A has a sharp peaked apex with a decorative crossbar. The W has angular geometric facets. THERAPEUTICS in matching Art Deco style but slightly smaller. Luxurious, ornate yet structured. Like a logo for a high-end Manhattan hotel from the Jazz Age. ${CORE}`,
    aspect: "21:9",
  },

  // 2. Connected Ligature
  {
    name: "logo-ligature-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — custom lettering horizontal wordmark on solid black background, white letterforms. The A and W are connected through an elegant LIGATURE where the right leg of the A flows seamlessly into the left stroke of the W, sharing a single diagonal stroke. This creates a unique, custom monogram-wordmark hybrid. The connected AW has slightly more presence than THERAPEUTICS which is in a clean complementary sans-serif to the right. The ligature is the hero — fluid, confident, distinctive. Think high-fashion brand identity meets biotech. ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-ligature-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — custom lettering horizontal wordmark on solid white background, black letterforms. The A and W are connected through an elegant LIGATURE where the right leg of the A flows seamlessly into the left stroke of the W, sharing a single diagonal stroke. This creates a unique, custom monogram-wordmark hybrid. The connected AW has slightly more presence than THERAPEUTICS which is in a clean complementary sans-serif to the right. The ligature is the hero — fluid, confident, distinctive. Think high-fashion brand identity meets biotech. ${CORE}`,
    aspect: "21:9",
  },

  // 3. Stencil / Military Precision
  {
    name: "logo-stencil-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — stencil-style horizontal wordmark on solid black background, white letterforms. Bold, authoritative stencil letterforms with characteristic gaps/cuts in the strokes where a physical stencil would need bridges. Uppercase, strong, industrial precision. Think military pharmaceutical grade — authoritative and no-nonsense but with sophisticated proportions. The cuts in the letters add visual rhythm and make it instantly recognizable. Not cheap stencil — refined, high-end stencil with perfect geometry. ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-stencil-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — stencil-style horizontal wordmark on solid white background, black letterforms. Bold, authoritative stencil letterforms with characteristic gaps/cuts in the strokes where a physical stencil would need bridges. Uppercase, strong, industrial precision. Think military pharmaceutical grade — authoritative and no-nonsense but with sophisticated proportions. The cuts in the letters add visual rhythm and make it instantly recognizable. Not cheap stencil — refined, high-end stencil with perfect geometry. ${CORE}`,
    aspect: "21:9",
  },

  // 4. Negative Space / Clever Optical
  {
    name: "logo-negative-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — clever negative-space horizontal wordmark on solid black background, white letterforms. The AW uses negative space cleverly — perhaps the counter of the A forms a hidden arrow pointing up, or the negative space between the A and W creates a hidden geometric shape like a diamond or helix. Smart, optical-illusion style logo design where a second shape or meaning emerges from the white space. THERAPEUTICS in clean sans-serif to the right. The kind of logo where people discover the hidden element and go "oh that's clever." ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-negative-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — clever negative-space horizontal wordmark on solid white background, black letterforms. The AW uses negative space cleverly — perhaps the counter of the A forms a hidden arrow pointing up, or the negative space between the A and W creates a hidden geometric shape like a diamond or helix. Smart, optical-illusion style logo design where a second shape or meaning emerges from the white space. THERAPEUTICS in clean sans-serif to the right. The kind of logo where people discover the hidden element and go "oh that's clever." ${CORE}`,
    aspect: "21:9",
  },

  // 5. Architectural / Brutalist
  {
    name: "logo-architect-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — architectural brutalist horizontal wordmark on solid black background, white letterforms. Custom letterforms inspired by architectural blueprints and brutalist typography. Letters constructed from precise straight lines and sharp 90-degree or 45-degree angles ONLY — no curves whatsoever. Every letter is built like a building floor plan. Hairline precision with medium stroke weight. The A is a perfect triangle structure, the W is zigzag precision. THERAPEUTICS follows in the same angular constructed style. Feels like a renowned architecture firm's identity. ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-architect-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — architectural brutalist horizontal wordmark on solid white background, black letterforms. Custom letterforms inspired by architectural blueprints and brutalist typography. Letters constructed from precise straight lines and sharp 90-degree or 45-degree angles ONLY — no curves whatsoever. Every letter is built like a building floor plan. Hairline precision with medium stroke weight. The A is a perfect triangle structure, the W is zigzag precision. THERAPEUTICS follows in the same angular constructed style. Feels like a renowned architecture firm's identity. ${CORE}`,
    aspect: "21:9",
  },

  // 6. High Contrast Didone / Luxury Serif
  {
    name: "logo-didone-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — luxury high-contrast serif horizontal wordmark on solid black background, white letterforms. Didone / Bodoni-inspired letterforms with dramatic thick-thin stroke contrast. Hairline thin strokes and bold thick strokes within each letter. The A has an ultra-thin crossbar and thick diagonal strokes. The W alternates thick and thin diagonals elegantly. Ball terminals and refined serifs. THERAPEUTICS in a lighter weight matching serif. Vogue magazine masthead energy — high fashion meets medical luxury. ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-didone-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — luxury high-contrast serif horizontal wordmark on solid white background, black letterforms. Didone / Bodoni-inspired letterforms with dramatic thick-thin stroke contrast. Hairline thin strokes and bold thick strokes within each letter. The A has an ultra-thin crossbar and thick diagonal strokes. The W alternates thick and thin diagonals elegantly. Ball terminals and refined serifs. THERAPEUTICS in a lighter weight matching serif. Vogue magazine masthead energy — high fashion meets medical luxury. ${CORE}`,
    aspect: "21:9",
  },

  // 7. Inline / Speed Lines
  {
    name: "logo-inline-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — inline-style horizontal wordmark on solid black background, white letterforms. Bold letterforms with a thin white LINE running through the CENTER of each stroke (inline/engraved style). This creates a distinctive double-outline effect within each letter. The inline detail adds sophistication and makes the logo shimmer with visual texture. Think luxury spirits bottle label or premium car badge engraving. All uppercase, horizontal, perfectly balanced. ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-inline-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — inline-style horizontal wordmark on solid white background, black letterforms. Bold letterforms with a thin black LINE running through the CENTER of each stroke (inline/engraved style). This creates a distinctive double-outline effect within each letter. The inline detail adds sophistication and makes the logo shimmer with visual texture. Think luxury spirits bottle label or premium car badge engraving. All uppercase, horizontal, perfectly balanced. ${CORE}`,
    aspect: "21:9",
  },

  // 8. Monoline / Single Stroke Weight
  {
    name: "logo-monoline-wob",
    prompt: `Logo design for "AW THERAPEUTICS" — monoline horizontal wordmark on solid black background, white letterforms. Every stroke is exactly the same thin line weight — a single consistent stroke draws every letter with no variation in thickness. Elegant, continuous, almost calligraphic in its flow but geometric in its structure. The A and W are drawn with confident single strokes that feel hand-crafted but mathematically precise. Think Paul Rand meets modern Swiss design. THERAPEUTICS in matching monoline style. ${CORE}`,
    aspect: "21:9",
  },
  {
    name: "logo-monoline-bow",
    prompt: `Logo design for "AW THERAPEUTICS" — monoline horizontal wordmark on solid white background, black letterforms. Every stroke is exactly the same thin line weight — a single consistent stroke draws every letter with no variation in thickness. Elegant, continuous, almost calligraphic in its flow but geometric in its structure. The A and W are drawn with confident single strokes that feel hand-crafted but mathematically precise. Think Paul Rand meets modern Swiss design. THERAPEUTICS in matching monoline style. ${CORE}`,
    aspect: "21:9",
  },

  // MONOGRAM OPTIONS
  {
    name: "mono-geometric-wob",
    prompt: `Monogram logo design on solid black background, white letterforms. The letters A and W interlocked into a single geometric mark. The forms overlap and share strokes — the A's legs and the W's peaks merge into one unified symmetric shape. Looks like it could be a luxury fashion house emblem or a coat of arms shield. Bold, confident, geometric, perfectly balanced. No extra text. Just the AW mark. ${CORE}`,
    aspect: "1:1",
  },
  {
    name: "mono-geometric-bow",
    prompt: `Monogram logo design on solid white background, black letterforms. The letters A and W interlocked into a single geometric mark. The forms overlap and share strokes — the A's legs and the W's peaks merge into one unified symmetric shape. Looks like it could be a luxury fashion house emblem or a coat of arms shield. Bold, confident, geometric, perfectly balanced. No extra text. Just the AW mark. ${CORE}`,
    aspect: "1:1",
  },
  {
    name: "mono-circle-wob",
    prompt: `Monogram logo design on solid black background, white letterforms. The letters AW enclosed within a perfect thin circle. The AW inside is custom geometric lettering that fills the circle elegantly — the peak of the A nearly touches the top of the circle, the valleys of the W rest at the bottom. A contained, badge-like mark. Think luxury watch brand caseback or wax seal. Clean, distinctive, iconic. No extra text. ${CORE}`,
    aspect: "1:1",
  },
  {
    name: "mono-circle-bow",
    prompt: `Monogram logo design on solid white background, black letterforms. The letters AW enclosed within a perfect thin circle. The AW inside is custom geometric lettering that fills the circle elegantly — the peak of the A nearly touches the top of the circle, the valleys of the W rest at the bottom. A contained, badge-like mark. Think luxury watch brand caseback or wax seal. Clean, distinctive, iconic. No extra text. ${CORE}`,
    aspect: "1:1",
  },
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function generateLogo({ name, prompt, aspect }) {
  console.log(`\n🎨 Generating: ${name} (${aspect})...`);

  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: aspect,
      output_format: "png",
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs?.map((log) => log.message).forEach(console.log);
      }
    },
  });

  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    console.error(`❌ No image for ${name}:`, result);
    return null;
  }

  const outputPath = `${OUTPUT_DIR}/${name}.png`;
  const buffer = await downloadImage(images[0].url);
  const stream = createWriteStream(outputPath);
  stream.write(Buffer.from(buffer));
  stream.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`✅ Saved: public/images/brand/${name}.png`);
  return outputPath;
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY required.");
    console.error("   Usage: node --env-file=.env scripts/generate-brand-logos.mjs");
    process.exit(1);
  }

  fal.config({ credentials });

  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("🚀 Generating AW Therapeutics brand logos via Nano Banana 2...");
  console.log(`   ${logos.length} variants to generate`);
  console.log(`   Output directory: public/images/brand/\n`);

  for (const logo of logos) {
    await generateLogo(logo);
  }

  console.log("\n🎉 All brand logos generated!");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
