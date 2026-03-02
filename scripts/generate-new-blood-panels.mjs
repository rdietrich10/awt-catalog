#!/usr/bin/env node

/**
 * Generate images for the two new blood test panels using an existing
 * blood panel image as the label-swap reference.
 *
 * Usage: node --env-file=.env scripts/generate-new-blood-panels.mjs
 */

import { fal } from "@fal-ai/client";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;

const REFERENCE_IMAGE = `${PRODUCTS_DIR}/metabolic-diabetes-panel.png`;

const NEW_PANELS = [
  {
    slug: "gastrointestinal-distress-panel",
    name: "Gastrointestinal Distress Panel",
    genericName: "GI Health Assessment",
    strengths: "10 Markers",
    indication: "GI symptom evaluation, infection screening",
    route: "Blood Draw",
    dosing: "As indicated",
  },
  {
    slug: "trt-panel",
    name: "TRT Panel",
    genericName: "Testosterone Replacement Therapy Assessment",
    strengths: "5 Markers",
    indication: "TRT candidacy, testosterone monitoring",
    route: "Blood Draw",
    dosing: "Quarterly",
  },
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required in .env");
    process.exit(1);
  }
  fal.config({ credentials });

  console.log("Uploading reference image (metabolic-diabetes-panel.png)...");
  const buffer = readFileSync(REFERENCE_IMAGE);
  const baseUrl = await fal.storage.upload(
    new File([buffer], "metabolic-diabetes-panel.png", { type: "image/png" })
  );
  console.log("Reference uploaded.\n");

  for (const panel of NEW_PANELS) {
    const outputPath = `${PRODUCTS_DIR}/${panel.slug}.png`;
    const bottomBand = [panel.strengths, panel.indication, panel.route, panel.dosing].join(" • ");

    const prompt = `Update the label only. Replace the current label text with this new product information. Keep everything else identical: same container, same silver/chrome design, same photography, same angle, same lighting. ONLY the product being sold in the shot - no other products.

NEW LABEL:
Top band (silver/chrome or charcoal): AW Therapeutics logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "${panel.name}" in large bold black, "${panel.genericName}" in grey below
Bottom band (silver/chrome or charcoal): "${bottomBand}"

Do not change the container shape, cap, lighting, background, or composition. Only update the label text. Silver and chrome accents only — no colors.`;

    console.log(`Generating ${panel.name}...`);
    const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: {
        prompt,
        image_urls: [baseUrl],
        num_images: 1,
        resolution: "2K",
        aspect_ratio: "3:4",
        output_format: "png",
      },
    });

    const images = result?.data?.images;
    if (!images?.length || !images[0]?.url) {
      console.error(`  No image returned for ${panel.slug}`);
      continue;
    }

    const imgBuffer = await downloadImage(images[0].url);
    await writeFile(outputPath, Buffer.from(imgBuffer));
    console.log(`  ${panel.slug}.png saved.\n`);
  }

  console.log("Done. Run `node scripts/generate-blur-placeholders.mjs` to update blur hashes.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
