#!/usr/bin/env node
/**
 * Regenerate the insulin-syringes product image.
 * - AW Therapeutics branding
 * - 10 syringes in the pack
 *
 * Uses fal.ai Nano Banana 2 (text-to-image) since we need to control
 * the actual product content, not just edit a label.
 *
 * Usage: node --env-file=.env scripts/generate-syringes-image.mjs
 */

import { fal } from "@fal-ai/client";
import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";

const OUTPUT = "public/images/products/insulin-syringes.png";

const PROMPT = `Commercial product photography of a clear plastic blister pack containing exactly 10 individually sealed insulin syringes arranged neatly in two rows of 5. The syringes are 29-gauge, 1cc, with half-inch needles — thin, medical-grade, with orange or clear caps and graduated markings on each barrel.

The blister pack has a small white product label in the center that reads:
"AW Therapeutics" in bold at the top
"Insulin Syringes 29G 1cc" in large bold text below
"10/Pack Sterile" in smaller grey text at the bottom

The pack sits on a reflective black surface. Single dramatic key light from upper right at 45 degrees. Hard light creates specular highlights on the clear plastic packaging and the syringe barrels. Deep shadows fall to the left. Background: deep matte black.

Style: ultra-high-end pharmaceutical product photography. Monochromatic — black, grey, silver, chrome, clear plastic. Clinical precision.

Photography: Hasselblad H6D-400c, HC 120mm Macro, f/8, 1/125s, ISO 100. Sharp across entire pack.

EXACTLY 10 syringes. No more, no less. No other products, no hands, no vials.`;

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

  console.log("Generating insulin syringes image (10-pack, AW Therapeutics)...");

  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt: PROMPT,
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
  await writeFile(OUTPUT, Buffer.from(buffer));
  console.log(`Saved: ${OUTPUT}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
