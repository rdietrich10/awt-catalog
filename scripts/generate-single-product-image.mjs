#!/usr/bin/env node
/**
 * Re-generate a single product image with corrected branding.
 * Uses fal.ai Nano Banana Pro edit with the base vial image.
 *
 * Usage: node --env-file=.env scripts/generate-single-product-image.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream, readFileSync } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;
const BASE_PATH = `${ROOT}/public/images/products/sema-glp-1.png`;

const PRODUCT = {
  slug: "blend-cjc-ipamorelin",
  name: "2X Blend CJC-1295 / Ipamorelin",
  genericName: "CJC-1295 + Ipamorelin",
  strengths: "10 mg",
  indication: "Muscle growth, GH support",
  route: "Subcutaneous",
  dosing: "Consult provider",
  blend: "CJC-1295 no DAC 5mg + Ipamorelin 5mg",
};

const bottomBand = [PRODUCT.strengths, PRODUCT.indication, PRODUCT.route, PRODUCT.dosing, PRODUCT.blend].join(" • ");

const PROMPT = `Update the label only. Replace the current label text with this new product information. Keep everything else identical: same container, same silver/chrome design, same photography, same angle, same lighting. ONLY the product being sold in the shot - no other products.

NEW LABEL:
Top band (silver/chrome or charcoal): "AW Therapeutics" logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "${PRODUCT.name}" in large bold black, "${PRODUCT.genericName}" in grey below
Bottom band (silver/chrome or charcoal): "${bottomBand}"

Do not change the container shape, cap, lighting, background, or composition. Only update the label text. Silver and chrome accents only — no colors.`;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function uploadFile(filePath, name) {
  const buffer = readFileSync(filePath);
  return fal.storage.upload(new File([buffer], name, { type: "image/png" }));
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required in .env");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(PRODUCTS_DIR, { recursive: true });

  console.log(`\nUploading base vial image...`);
  const baseUrl = await uploadFile(BASE_PATH, "base-vial.png");

  console.log(`Generating ${PRODUCT.name}...`);
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
  const buffer = await downloadImage(images[0].url);
  const outputPath = `${PRODUCTS_DIR}/${PRODUCT.slug}.png`;
  const stream = createWriteStream(outputPath);
  stream.write(Buffer.from(buffer));
  stream.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`\nSaved: ${outputPath}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
