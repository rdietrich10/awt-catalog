#!/usr/bin/env node
/**
 * Generate a single product "style shot" — a clean glass vial
 * with the product name typeset on the bottom-right of the image.
 *
 * Uses fal.ai Nano Banana 2 (text-to-image).
 *
 * Usage: node --env-file=.env scripts/generate-product-style-shot.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";

const OUTPUT_DIR = "public/images/products";

const PRODUCT = {
  slug: "blend-cjc-ipamorelin",
  displayName: "CJC-1295 / IPAMORELIN",
  subtitle: "2X BLEND · 10MG",
};

const PROMPT = `Commercial product photography of a single clear glass pharmaceutical vial with a silver aluminum flip-off cap and crimp seal. The vial is small, medical-grade, containing a clear liquid. The vial is positioned slightly left of center on a reflective black surface.

Lighting: single dramatic key light from the upper right at 45 degrees. Hard light creates brilliant specular highlights on the glass and chrome cap. Deep shadows fall to the left. A subtle rim light separates the vial from the dark background. The glass refracts light beautifully.

The vial has a minimal, elegant label — small, mostly transparent with thin silver text reading "AW" — barely visible. The focus is on the beauty of the glass form, not the label.

In the BOTTOM-RIGHT corner of the image, overlaid typographic text reads:
"CJC-1295 / IPAMORELIN"
in an elegant, thin, uppercase sans-serif font (like Gotham or Futura Light). The text is in warm amber-gold color (#D4AF37). Below it in smaller text: "2X BLEND · 10MG" in silver-grey.

Background: deep matte black with a very subtle gradient lighter toward the top. The reflective surface shows a mirror reflection of the vial underneath.

Style: ultra-high-end pharmaceutical brand photography. Think Tom Ford fragrance campaign meets clinical precision. Monochromatic scene — black, grey, silver, chrome — with the amber-gold text being the only color accent.

Photography: Hasselblad H6D-400c, HC 120mm Macro, f/8, 1/125s, ISO 100. Focus stacked for maximum sharpness across the entire vial. 8K detail.

ONLY ONE VIAL. No other products, no boxes, no hands, no syringes. Just the single vial and the typography.`;

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
  await mkdir(OUTPUT_DIR, { recursive: true });

  const outputPath = `${OUTPUT_DIR}/${PRODUCT.slug}.png`;
  console.log(`\nGenerating style shot for ${PRODUCT.displayName}...\n`);

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

  console.log("Downloading generated image...");
  const buffer = await downloadImage(images[0].url);

  const stream = createWriteStream(outputPath);
  stream.write(Buffer.from(buffer));
  stream.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`\nSaved: ${outputPath}`);
  console.log("Run: npm run generate:blur-placeholders to update blur hashes.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
