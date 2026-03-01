#!/usr/bin/env node

/**
 * Generate the Medical Review product image via fal.ai Nano Banana 2.
 * Follows the AW Therapeutics monochromatic + gold annotation style.
 *
 * Usage: node --env-file=.env scripts/generate-medical-review-image.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;

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
Mood: authoritative, clinical precision, physician oversight, medical legitimacy.`;

const PROMPT = `Editorial photograph of a physician's clinical review workspace. Close-up of a doctor's hands in a white coat reviewing medical documents and lab results on a polished dark desk. A stethoscope rests nearby. Organized clinical paperwork with charts and diagnostic data visible. A tablet or laptop screen in soft focus displays patient health metrics. The physician's hand holds a pen, poised over the documents in an act of deliberate clinical assessment. The environment is modern, minimal, and professional — dark wood or black surface, architectural lighting from above, clean lines.

Monochromatic photograph — completely desaturated, silver-toned, black and white. No color except the gold annotations.

GOLD ANNOTATION OVERLAY: A rectangular box drawn around the physician's hands and the documents. Corner crop marks at all four image corners. An arrow pointing to the pen tip touching the paperwork. Bracket marks flanking the tablet screen. A circle around the stethoscope. Measurement tick marks along the bottom edge. Horizontal lines connecting the documents to the screen. At least 8 distinct annotation elements — this reads like a clinical oversight quality assurance document.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/4, 1/125s, ISO 200. Key light from above, soft and diffused. 3:4 portrait composition.

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
    console.error("Usage: node --env-file=.env scripts/generate-medical-review-image.mjs");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(PRODUCTS_DIR, { recursive: true });

  console.log("\nGenerating Medical Review product image...\n");

  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt: PROMPT,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "3:4",
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

  const outputPath = `${PRODUCTS_DIR}/medical-review.png`;
  const buffer = await downloadImage(images[0].url);
  const stream = createWriteStream(outputPath);
  stream.write(Buffer.from(buffer));
  stream.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`\nSaved: public/images/products/medical-review.png`);
  console.log("Next: run `node scripts/generate-image-manifest.mjs` to update the manifest.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
