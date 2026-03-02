#!/usr/bin/env node

/**
 * Generate the Telehealth & Services category image via fal.ai Nano Banana 2.
 * Follows the AW Therapeutics monochromatic + gold annotation style.
 *
 * Usage: node --env-file=.env scripts/generate-telehealth-category-image.mjs
 */

import { fal } from "@fal-ai/client";
import { writeFile, mkdir } from "fs/promises";

const CATEGORIES_DIR = "public/images/categories";
const OUTPUT_PATH = `${CATEGORIES_DIR}/telehealth-services.png`;

const ANNOTATION_STYLE = `
MANDATORY VISUAL STYLE — CLINICAL ANNOTATION OVERLAY ON PHOTOGRAPHY:
The base image MUST be beautiful, realistic, high-end editorial photography — Hasselblad H6D-400c sensor fidelity, micro-contrast, lifted blacks, recovered highlights, D65 6500K white balance. Photorealistic. NOT illustrated.

The photograph is strictly monochromatic — black, charcoal, grey, silver, white. Completely desaturated.

OVERLAID on the photograph are precise AMBER-GOLD (#D4AF37) clinical annotation marks — as if a physician or medical reviewer marked up a printed photograph with a gold felt-tip pen during a clinical review session. These marks are:
- GEOMETRIC and INTENTIONAL: rectangles/boxes drawn around areas of interest, straight underlines, bracket marks, corner crop marks, precise arrows pointing to key details, margin tick marks, measurement lines. NOT loose artistic brush strokes — DELIBERATE, SYSTEMATIC annotation marks.
- Multiple annotation elements per image — at least 5-8 distinct gold marks spread across the composition. Thoroughly annotated.
- The marks have the character of a felt-tip marker on glossy photo paper — slightly textured, mostly opaque, with occasional pen-pressure variation.
- This is GRAPHIC DESIGN — structured, purposeful.

The amber-gold annotation marks are the ONLY color. Everything in the photograph is monochrome.
No text, no logos, no watermarks, no words, no letters, no numbers.
Mood: professional, accessible, connected. Clinical precision meets digital healthcare.`;

const PROMPT = `Editorial photograph of a modern telehealth command center. A sleek, minimal workspace viewed from a wide angle — a large curved ultrawide monitor displays a mosaic of patient video consultation windows (abstract, no identifiable faces). A physician's white coat hangs over the back of a premium ergonomic chair. On the polished black desk surface: a high-end webcam on a small tripod, a digital stethoscope, and a slim tablet propped at an angle. The environment is architectural — floor-to-ceiling glass on one side, diffused morning light cutting sharp lines across the desk. The space is monumental, serene, and technologically sophisticated. A single overhead pendant light creates a focused pool of illumination on the workspace.

Monochromatic photograph — completely desaturated, silver-toned, black and white. No color except the gold annotations.

GOLD ANNOTATION OVERLAY: A rectangular box drawn around the monitor showing the consultation mosaic. Corner crop marks at all four image corners. An arrow pointing from the webcam toward the monitor. Bracket marks flanking the digital stethoscope. A circle around the tablet. Measurement tick marks along the bottom edge. Horizontal connection lines between the webcam, the desk instruments, and the monitor. A second rectangular box around the white coat on the chair. At least 8 distinct annotation elements — this reads like a telehealth infrastructure assessment document.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/4, 1/60s, ISO 200. Soft overhead pendant light with diffused window light as secondary fill. 16:9 wide composition.

${ANNOTATION_STYLE}`;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required in .env");
    console.error("Usage: node --env-file=.env scripts/generate-telehealth-category-image.mjs");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(CATEGORIES_DIR, { recursive: true });

  console.log("\nGenerating Telehealth & Services category image...\n");

  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt: PROMPT,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "16:9",
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
    console.error("No image returned:", result);
    process.exit(1);
  }

  console.log("Downloading...");
  const buffer = await downloadImage(images[0].url);
  await writeFile(OUTPUT_PATH, Buffer.from(buffer));

  console.log(`\nSaved: ${OUTPUT_PATH}`);
  console.log("Next: run `node scripts/generate-blur-placeholders.mjs` to update blur hashes.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
