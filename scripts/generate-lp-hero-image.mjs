#!/usr/bin/env node

/**
 * Generate a landing page hero image via fal.ai Nano Banana 2 (edit).
 * Takes a reference photo of a city and transforms it into the AW Therapeutics
 * monochromatic + gold annotation style.
 *
 * Usage:
 *   node --env-file=.env scripts/generate-lp-hero-image.mjs [slug]
 *
 * Example:
 *   node --env-file=.env scripts/generate-lp-hero-image.mjs boynton-beach
 *
 * Expects a reference image at public/images/lp/<slug>-reference.jpg
 * Outputs to public/images/lp/<slug>.png
 */

import { fal } from "@fal-ai/client";
import { readFileSync } from "fs";
import { writeFile, mkdir } from "fs/promises";
import { dirname } from "path";

const slug = process.argv[2] || "boynton-beach";
const LP_DIR = "public/images/lp";
const REFERENCE_PATH = `${LP_DIR}/${slug}-reference.jpg`;
const OUTPUT_PATH = `${LP_DIR}/${slug}.png`;

const CITY_PROMPTS = {
  "boynton-beach": `Editorial photograph of the Boynton Beach Inlet waterfront — a South Florida coastal scene with a marina, boats docked along the waterway, palm trees lining the shore, and the distinctive low-rise waterfront architecture of Boynton Beach visible in the background. The Intracoastal Waterway stretches into the distance under a wide sky. The scene conveys a thriving, sun-drenched coastal community — affluent but unpretentious, real but aspirational.

Monochromatic photograph — completely desaturated, silver-toned, black and white. No color except the gold annotations.

GOLD ANNOTATION OVERLAY: A rectangular box drawn around the marina and docked boats. Corner crop marks at all four image corners. An arrow pointing from the waterfront toward the horizon. Bracket marks flanking the palm tree line. A circle around the main architectural feature. Measurement tick marks along the bottom edge. Horizontal connection lines between the boats, the shore, and the buildings. A second rectangular box around the sky area. At least 8 distinct annotation elements — this reads like a clinical site assessment document.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/5.6, 1/125s, ISO 100. Golden-hour light raking across the scene. 16:9 wide composition.`,
};

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
No text, no logos, no watermarks, no words, no letters, no numbers.`;

const PROMPT = (CITY_PROMPTS[slug] || CITY_PROMPTS["boynton-beach"]) + "\n\n" + ANNOTATION_STYLE;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function uploadFile(filePath, name) {
  const buffer = readFileSync(filePath);
  const mimeType = filePath.endsWith(".png") ? "image/png" : "image/jpeg";
  const file = new File([buffer], name, { type: mimeType });
  return fal.storage.upload(file);
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required in .env");
    console.error("Usage: node --env-file=.env scripts/generate-lp-hero-image.mjs [slug]");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });

  console.log(`\nUploading reference image: ${REFERENCE_PATH}...`);
  const referenceUrl = await uploadFile(REFERENCE_PATH, `${slug}-reference.jpg`);
  console.log("Uploaded:", referenceUrl);

  console.log(`\nGenerating hero image for "${slug}" via Nano Banana 2 (edit)...\n`);

  const result = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt: PROMPT,
      image_urls: [referenceUrl],
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
