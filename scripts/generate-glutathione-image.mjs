#!/usr/bin/env node

/**
 * Generate the Glutathione product image via fal.ai label-swap.
 * Uses the same base vial + label edit approach as all other injectable products.
 *
 * Usage: node --env-file=.env scripts/generate-glutathione-image.mjs
 */

import { fal } from "@fal-ai/client";
import { readFileSync } from "fs";
import { writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;
const BASE_PATH = `${PRODUCTS_DIR}/sema-glp-1.png`;

const product = {
  name: "Glutathione",
  genericName: "L-Glutathione (Reduced)",
  strengths: "200 mg/mL",
  indication: "Detoxification, immune support, antioxidant",
  route: "Subcutaneous / IM",
  dosing: "Consult provider",
};

const bottomBand = [product.strengths, product.indication, product.route, product.dosing].join(" • ");

const PROMPT = `Update the label only. Replace the current label text with this new product information. Keep everything else identical: same container, same silver/chrome design, same photography, same angle, same lighting. ONLY the product being sold in the shot - no other products.

NEW LABEL:
Top band (silver/chrome or charcoal): AW Therapeutics logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "${product.name}" in large bold black, "${product.genericName}" in grey below
Bottom band (silver/chrome or charcoal): "${bottomBand}"

Do not change the container shape, cap, lighting, background, or composition. Only update the label text. Silver and chrome accents only — no colors.`;

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
  await mkdir(PRODUCTS_DIR, { recursive: true });

  console.log("\nUploading base vial image...");
  const buffer = readFileSync(BASE_PATH);
  const baseUrl = await fal.storage.upload(new File([buffer], "base-vial.png", { type: "image/png" }));

  console.log("Generating Glutathione label...");
  const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: {
      prompt: PROMPT,
      image_urls: [baseUrl],
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "3:4",
      output_format: "png",
    },
  });

  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    throw new Error("No image returned from fal.ai");
  }

  console.log("Downloading...");
  const imgBuffer = await downloadImage(images[0].url);
  const outputPath = `${PRODUCTS_DIR}/glutathione.png`;
  await writeFile(outputPath, Buffer.from(imgBuffer));
  console.log(`\nSaved: public/images/products/glutathione.png`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
