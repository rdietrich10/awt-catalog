#!/usr/bin/env node

/**
 * Generate Sema GLP-1 product image using fal.ai Nano Banana Pro.
 * Uses the edit endpoint with AW Therapeutics logo. Silver/chrome accents only.
 * Reads FAL_API_KEY or FAL_KEY from .env (use --env-file=.env).
 *
 * Usage: node --env-file=.env scripts/generate-sema-image.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream, readFileSync } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const OUTPUT_PATH = `${ROOT}/public/images/products/sema-glp-1.png`;
const LOGO_PATH = `${ROOT}/public/images/americare-logo.png`;

const PROMPT = `Create an ultra-premium editorial product photograph of a pharmaceutical vial. Use the AW Therapeutics logo from this image on the vial label.

Reference the label layout: top band with logo, middle white section with product name, bottom band with key details. Apply this structure for Sema GLP-1:

Top band (silver/chrome or charcoal): AW Therapeutics logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "Sema GLP-1" in large bold black, "Semaglutide" in grey below
Bottom band (silver/chrome or charcoal): "10 mg | 20 mg • GLP-1 Receptor Agonist • Weight Management • Subcutaneous • Once weekly"

The vial: clear borosilicate glass 10 mL injection vial. Silver and chrome accents only — no colors. Polished chrome flip-off cap, chrome or silver accent bands on the label, chrome cap band around the neck. Monochromatic palette: white, black, grey, silver, chrome. Sealed with polished aluminum crimp and grey butyl rubber stopper. Really sleek, minimal, high-design aesthetic.

Camera angle: Shoot from a dynamic 3/4 low angle looking up slightly at the vial, or a subtle Dutch angle (5-10 degrees tilt) for editorial interest. Not a flat straight-on shot. The vial should feel dimensional and commanding.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/5.6, 1/125s, ISO 50. Hero key light: Broncolor Para 222 at 60-degrees camera-right, sculpted specular edge highlight on glass. Fill: silver bounce camera-left, 2:1 ratio. Hair/rim light: Profoto strip softbox from behind, razor-thin luminous contour. Gradient spot below for refined reflection.

Set on polished obsidian-black acrylic with mirror reflection. Matte-black-to-charcoal gradient background. Generous negative space. Focus stacked, D65 6500K, lifted blacks, recovered highlights, micro-contrast. No dust, no artifacts.

Mood: pharmaceutical precision meets luxury design. Aesop meets Porsche Design meets Apple. Hyper-clean, aspirational, editorially minimal. No blue, orange, or colored accents — silver and chrome only.`;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function uploadFile(filePath, name) {
  const buffer = readFileSync(filePath);
  const file = new File([buffer], name, { type: "image/png" });
  return fal.storage.upload(file);
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY environment variable is required.");
    console.error("   Usage: node --env-file=.env scripts/generate-sema-image.mjs");
    process.exit(1);
  }

  fal.config({ credentials });

  console.log("📤 Uploading logo to fal storage...");
  const logoUrl = await uploadFile(LOGO_PATH, "americare-logo.png");

  console.log("🎨 Generating Sema GLP-1 image via Nano Banana Pro (edit): logo only, new bottle...");
  const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: {
      prompt: PROMPT,
      image_urls: [logoUrl],
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "3:4",
      output_format: "png",
    },
  });

  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    console.error("❌ No image URL in response:", result);
    process.exit(1);
  }

  const imageUrl = images[0].url;
  console.log("📥 Downloading image from:", imageUrl);

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  const buffer = await downloadImage(imageUrl);
  const stream = createWriteStream(OUTPUT_PATH);
  stream.write(Buffer.from(buffer));
  stream.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log("✅ Saved to:", OUTPUT_PATH);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
