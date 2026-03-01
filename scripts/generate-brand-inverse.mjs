#!/usr/bin/env node

/**
 * Generate the inverse (black on white) version of the chosen AW Therapeutics
 * ligature logo using fal.ai Nano Banana 2, referencing the original as input.
 *
 * Usage: node --env-file=.env scripts/generate-brand-inverse.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream, readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const OUTPUT_DIR = `${ROOT}/public/images/brand`;
const REF_IMAGE = `${OUTPUT_DIR}/logo-ligature-wob.png`;
const OUTPUT_PATH = `${OUTPUT_DIR}/logo-ligature-bow.png`;

const PROMPT = `Logo design for "AW THERAPEUTICS" — custom lettering horizontal wordmark on a solid pure white background, black letterforms. The A and W are connected through an elegant LIGATURE where the right leg of the A flows seamlessly into the left stroke of the W, sharing a single diagonal stroke. This creates a unique, custom monogram-wordmark hybrid. The connected AW has slightly more presence than THERAPEUTICS which is in a clean complementary sans-serif to the right. The ligature is the hero — fluid, confident, distinctive. Think high-fashion brand identity meets biotech.

ABSOLUTE REQUIREMENTS:
- Solid pure WHITE background (#FFFFFF). BLACK letterforms (#000000).
- This is the INVERSE color version of the same logo — identical design, swapped colors.
- Strictly black and white ONLY. No grey, no color, no gradients, no textures.
- HORIZONTAL layout — everything on ONE LINE. Never stacked.
- "AW" on the LEFT connected via ligature, "THERAPEUTICS" to the RIGHT.
- Professional logo design with personality and flair. Not generic typed text.
- Generous negative space around the logo. Logo centered in frame.`;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY required.");
    process.exit(1);
  }

  fal.config({ credentials });

  const refBase64 = readFileSync(REF_IMAGE).toString("base64");
  const refDataUri = `data:image/png;base64,${refBase64}`;

  console.log("🎨 Generating inverse (black on white) logo via Nano Banana 2...");

  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt: PROMPT,
      image_url: refDataUri,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "21:9",
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
    console.error("❌ No image in response:", result);
    process.exit(1);
  }

  const buffer = await downloadImage(images[0].url);
  const stream = createWriteStream(OUTPUT_PATH);
  stream.write(Buffer.from(buffer));
  stream.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log("✅ Saved: public/images/brand/logo-ligature-bow.png");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
