#!/usr/bin/env node

/**
 * Generate RFK Jr. article cover image using fal.ai Nano Banana 2.
 * Uses the edit endpoint with the official HHS portrait as reference input.
 * Demonstrates the "selective color" technique: monochromatic subject,
 * bold red velvet curtain as the sole color accent.
 *
 * Usage: node --env-file=.env scripts/generate-rfk-article-image.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream, readFileSync } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const OUTPUT_PATH = `${ROOT}/public/images/articles/peptide-regulation-2026.png`;
const PORTRAIT_PATH = `${ROOT}/public/images/articles/rfk-jr-hhs-portrait.jpg`;

const PROMPT = `Editorial photograph of this man speaking on a podcast. Use this reference image for his face and likeness — he must be recognizable as the same person.

He is seated behind a podcast desk, speaking into a Shure SM7B dynamic microphone mounted on a boom arm. He wears over-ear studio headphones. His expression is engaged and mid-sentence — authoritative, animated. He is dressed in a dark suit or sport coat.

The entire image is monochromatic — black, charcoal, grey, silver, white — EXCEPT for the background: a rich, deep red velvet curtain that fills the frame behind him. The red velvet is the ONLY color in the image. His skin, clothing, microphone, headphones, desk — all rendered in desaturated silver-toned black and white. The red curtain is saturated and luminous by contrast.

This selective color technique is graphic and intentional — inspired by Milton Glaser and Saul Bass. The red is not subtle; it is a bold, deliberate pop of color that draws the eye and anchors the composition. The red represents the iconic Joe Rogan Experience set.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/4, 1/125s, ISO 200. Key light from camera-right sculpting the face with dramatic chiaroscuro. Rim light from behind for separation against the red curtain. The subject is sharp, the curtain falls to soft focus. Lifted blacks, micro-contrast, recovered highlights. 16:9 composition, subject offset slightly left of center.

Mood: editorial gravitas, political weight, a moment of consequence. No text, no logos, no watermarks.`;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function uploadFile(filePath, name) {
  const buffer = readFileSync(filePath);
  const mimeType = filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")
    ? "image/jpeg"
    : "image/png";
  const file = new File([buffer], name, { type: mimeType });
  return fal.storage.upload(file);
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY environment variable is required.");
    console.error("   Usage: node --env-file=.env scripts/generate-rfk-article-image.mjs");
    process.exit(1);
  }

  fal.config({ credentials });

  console.log("Uploading RFK Jr. portrait to fal storage...");
  const portraitUrl = await uploadFile(PORTRAIT_PATH, "rfk-jr-hhs-portrait.jpg");
  console.log("Portrait uploaded:", portraitUrl);

  console.log("Generating RFK Jr. article image via Nano Banana 2 (edit)...");
  const result = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt: PROMPT,
      image_urls: [portraitUrl],
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "16:9",
      output_format: "png",
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    console.error("No image URL in response:", JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const imageUrl = images[0].url;
  console.log("Downloading generated image from:", imageUrl);

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  const buffer = await downloadImage(imageUrl);
  const stream = createWriteStream(OUTPUT_PATH);
  stream.write(Buffer.from(buffer));
  stream.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log("Saved to:", OUTPUT_PATH);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
