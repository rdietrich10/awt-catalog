#!/usr/bin/env node

/**
 * Generate the 3 remaining product images that are missing:
 *   1. l-carnitine       — vial label-swap (like all other injectables)
 *   2. telemedicine      — editorial service image (monochrome + gold annotations)
 *   3. vip-membership    — editorial service image (monochrome + gold annotations)
 *
 * Usage: node --env-file=.env scripts/generate-missing-product-images.mjs
 */

import { fal } from "@fal-ai/client";
import { readFileSync, existsSync } from "fs";
import { writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;
const BASE_VIAL = `${PRODUCTS_DIR}/sema-glp-1.png`;

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

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function generateLabelSwap(baseUrl, product) {
  const bottomBand = [product.strengths, product.indication, product.route, product.dosing].join(" • ");
  const prompt = `Update the label only. Replace the current label text with this new product information. Keep everything else identical: same container, same silver/chrome design, same photography, same angle, same lighting. ONLY the product being sold in the shot - no other products.

NEW LABEL:
Top band (silver/chrome or charcoal): AW Therapeutics logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "${product.name}" in large bold black, "${product.genericName}" in grey below
Bottom band (silver/chrome or charcoal): "${bottomBand}"

Do not change the container shape, cap, lighting, background, or composition. Only update the label text. Silver and chrome accents only — no colors.`;

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
  if (!images?.length || !images[0]?.url) throw new Error(`No image for ${product.slug}`);
  return images[0].url;
}

async function generateTextToImage(prompt, aspectRatio) {
  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: aspectRatio,
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
  if (!images?.length || !images[0]?.url) throw new Error("No image returned");
  return images[0].url;
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required in .env");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(PRODUCTS_DIR, { recursive: true });

  // ── 1. L-Carnitine (vial label-swap) ──────────────────────────
  console.log("\n[1/3] Generating L-Carnitine (vial label-swap)...");
  const vialBuffer = readFileSync(BASE_VIAL);
  const baseUrl = await fal.storage.upload(new File([vialBuffer], "base-vial.png", { type: "image/png" }));

  const carnitineUrl = await generateLabelSwap(baseUrl, {
    slug: "l-carnitine",
    name: "L-Carnitine",
    genericName: "L-Carnitine",
    strengths: "500 mg/mL",
    indication: "Fat metabolism, energy production",
    route: "Subcutaneous",
    dosing: "Consult provider",
  });
  const carnitineBuffer = await downloadImage(carnitineUrl);
  await writeFile(`${PRODUCTS_DIR}/l-carnitine.png`, Buffer.from(carnitineBuffer));
  console.log("  ✅ l-carnitine.png saved");

  // ── 2. Telemedicine (editorial service image) ─────────────────
  console.log("\n[2/3] Generating Telemedicine (editorial service image)...");
  const telemedPrompt = `Editorial photograph of a modern telehealth consultation in progress. A physician in a white coat sits at a clean, minimal desk, facing a large monitor that shows a video call interface with a patient visible on screen. The physician's hands gesture naturally while speaking. The workspace is modern and clinical — a slim laptop, a digital tablet with patient data, and a high-end webcam visible. The environment has architectural lighting from above, clean lines, a dark background. The mood is professional, personal, and accessible — healthcare delivered through technology.

Monochromatic photograph — completely desaturated, silver-toned, black and white. No color except the gold annotations.

GOLD ANNOTATION OVERLAY: A rectangular box drawn around the monitor screen showing the patient. An arrow pointing from the physician's gesture toward the screen. Bracket marks flanking the webcam. Corner crop marks at all four image corners. A circle around the tablet with patient data. Measurement tick marks along the bottom edge. Horizontal connection lines between the physician and the screen. At least 8 distinct annotation elements — this reads like a telehealth quality assurance document.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/4, 1/60s, ISO 200. Soft overhead light with monitor glow as secondary fill. 3:4 portrait composition.

${ANNOTATION_STYLE}
Mood: professional, accessible, connected. Healthcare without barriers.`;

  const telemedUrl = await generateTextToImage(telemedPrompt, "3:4");
  const telemedBuffer = await downloadImage(telemedUrl);
  await writeFile(`${PRODUCTS_DIR}/telemedicine.png`, Buffer.from(telemedBuffer));
  console.log("  ✅ telemedicine.png saved");

  // ── 3. VIP Membership (editorial service image) ───────────────
  console.log("\n[3/3] Generating VIP Membership (editorial service image)...");
  const vipPrompt = `Editorial photograph of a premium concierge medical experience. Close-up of an elegant black membership card with embossed metallic silver details resting on a polished dark surface. Beside the card, a physician's stethoscope with chrome finish and a sleek pen rest on the surface. In the soft background, a modern clinical consultation room is visible — leather seating, warm architectural lighting, floor-to-ceiling glass. The scene conveys exclusivity, priority access, and premium care. Every element is intentional and luxurious.

Monochromatic photograph — completely desaturated, silver-toned, black and white. No color except the gold annotations.

GOLD ANNOTATION OVERLAY: A rectangular box drawn around the membership card. Corner crop marks at all four image corners. An arrow pointing to the embossed details on the card. Bracket marks flanking the stethoscope. A circle around the pen. Measurement tick marks along the bottom edge. Horizontal lines connecting the card to the consultation room in the background. A second box framing the consultation room. At least 8 distinct annotation elements — this reads like a VIP program onboarding document.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/2.8, 1/125s, ISO 200. Key light from above-right, soft fill. 3:4 portrait composition.

${ANNOTATION_STYLE}
Mood: exclusive, premium, aspirational. VIP access to physician-directed healthcare.`;

  const vipUrl = await generateTextToImage(vipPrompt, "3:4");
  const vipBuffer = await downloadImage(vipUrl);
  await writeFile(`${PRODUCTS_DIR}/vip-membership.png`, Buffer.from(vipBuffer));
  console.log("  ✅ vip-membership.png saved");

  console.log("\n🎉 All 3 missing product images generated!");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
