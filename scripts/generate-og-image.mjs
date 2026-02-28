#!/usr/bin/env node

/**
 * Generate OG (Open Graph) image for AW Therapeutics Peptide Catalog using fal.ai Nano Banana Pro.
 * Output: 1200x630 equivalent for social sharing (og:image, twitter:image).
 * Reads FAL_API_KEY or FAL_KEY from .env.
 *
 * Usage: node --env-file=.env scripts/generate-og-image.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const OUTPUT_DIR = `${ROOT}/public/images`;
const OUTPUT_PATH = `${OUTPUT_DIR}/og-image.png`;

// OG standard: 1200x630. Fal supports 16:9 (1.78:1) — works well for social cards
const ASPECT_RATIO = "16:9";

const SHARED_DIRECTION = `
IMPORTANT GLOBAL STYLE CONSTRAINTS — apply to the entire image:
Strictly monochromatic palette: black, charcoal, grey, silver, white ONLY.
Absolutely no color — no blue, no teal, no orange, no green.
Photography quality: Hasselblad H6D-400c sensor fidelity, micro-contrast, lifted blacks, recovered highlights.
Mood: pharmaceutical precision meets luxury design. Aesop meets Porsche Design meets Apple.`;

const PROMPT = `Editorial Open Graph / social sharing image for AW Therapeutics Peptide Catalog.

BACKGROUND: Ultra-wide editorial photograph. A minimalist composition: three pharmaceutical vials arranged in a precise diagonal line on a polished obsidian-black surface, receding into soft bokeh. The lead vial is in sharp focus with brilliant specular highlights on the glass. Silver and chrome caps. In the background, a vast architectural space — floor-to-ceiling glass, polished concrete, diffused morning light. A lone silhouetted figure stands in the distance. The space is monumental and serene. Strictly monochromatic: black, charcoal, grey, silver, white only.

TEXT OVERLAY — CRITICAL: Add a subtle dark gradient overlay (40% black) across the center for readability. Then render this exact text prominently in the center of the image:

HEADLINE (large, bold, white, sans-serif, uppercase, centered):
"PRECISION PEPTIDES. ELEVATED OUTCOMES."

HELPER TEXT (smaller, light grey/silver, sans-serif, centered, directly below the headline):
"Medical Grade compounds for weight management, recovery, longevity, and beyond."

The text must be perfectly legible, clean typography, no artifacts. The composition should mirror a hero section: vials and architecture as background, headline and helper text as the focal action. This is a social share card — the message must read instantly.`;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY required.");
    console.error("   Usage: node --env-file=.env scripts/generate-og-image.mjs");
    process.exit(1);
  }

  fal.config({ credentials });

  console.log("🎨 Generating OG image via Nano Banana Pro...");
  console.log(`   Aspect ratio: ${ASPECT_RATIO}\n`);

  const fullPrompt = PROMPT + SHARED_DIRECTION;

  const result = await fal.subscribe("fal-ai/nano-banana-pro", {
    input: {
      prompt: fullPrompt,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: ASPECT_RATIO,
      output_format: "png",
    },
  });

  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    console.error("❌ No image in response:", result);
    process.exit(1);
  }

  const imageUrl = images[0].url;
  console.log("📥 Downloading...");

  await mkdir(OUTPUT_DIR, { recursive: true });
  const buffer = await downloadImage(imageUrl);
  const stream = createWriteStream(OUTPUT_PATH);
  stream.write(Buffer.from(buffer));
  stream.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log("✅ Saved to public/images/og-image.png");
  console.log("   Add to layout.tsx metadata: openGraph.images, twitter.images");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
