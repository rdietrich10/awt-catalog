#!/usr/bin/env node
/**
 * Generate How It Works step images — realistic photography with clinical
 * gold annotation marks (boxes, underlines, arrows, margin notes).
 * Uses fal.ai Nano Banana 2.
 *
 * Usage: node --env-file=.env scripts/generate-how-it-works-images.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";

const OUTPUT_DIR = "public/images/lifestyle";

const ANNOTATION_STYLE = `

MANDATORY VISUAL STYLE — CLINICAL ANNOTATION OVERLAY ON PHOTOGRAPHY:
The base image MUST be beautiful, realistic, high-end editorial photography — Hasselblad H6D-400c quality. Photorealistic. NOT illustrated.

The photograph is strictly monochromatic — black, charcoal, grey, silver, white. Completely desaturated.

OVERLAID on the photograph are precise AMBER-GOLD (#D4AF37) clinical annotation marks — like a lab scientist or medical researcher marked up a printed photograph with a gold felt-tip pen during a review meeting. These marks are:

- GEOMETRIC and INTENTIONAL: rectangles/boxes drawn around areas of interest, straight underlines, bracket marks, corner crop marks, precise arrows pointing to key details, margin tick marks, measurement lines. NOT loose artistic brush strokes — these are DELIBERATE, SYSTEMATIC annotation marks.
- Multiple annotation elements per image — at least 5-8 distinct gold marks (boxes, lines, arrows, brackets, corner marks) spread across the composition. More is better. The image should feel THOROUGHLY annotated.
- Think: a forensic scientist marking evidence on a photograph, a radiologist circling findings on a scan, an engineer red-lining a blueprint — but in gold instead of red.
- The marks have the character of a felt-tip marker on glossy photo paper — slightly textured, mostly opaque, with occasional pen-pressure variation.
- Some marks may have small drips or ink pooling where the pen paused.
- This is GRAPHIC DESIGN — structured, grid-aligned, purposeful. Not artistic expression.

COMPOSITION RULE: The primary subject MUST be DEAD CENTER of the frame — centered both horizontally and vertically. Symmetrical or near-symmetrical composition. The subject occupies the central third of the image.

The amber-gold annotation marks are the ONLY color. Everything in the photograph itself is monochrome.

No text, no logos, no watermarks, no words, no letters, no numbers.
Mood: clinical precision, lab review, methodical analysis meets luxury pharmaceutical design.`;

const IMAGES = [
  {
    slug: "how-step-1-browse",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. CENTERED COMPOSITION: A human hand with an extended index finger points directly at a single pharmaceutical vial on a backlit shelf, positioned DEAD CENTER of the frame. The hand enters from the bottom of the frame pointing upward at the vial. Behind the centered vial, rows of identical vials extend in all directions on clinical white backlit shelving, creating a symmetrical grid pattern. The selected vial is in sharp focus at the exact center; surrounding vials fall to bokeh.

The photograph is entirely monochromatic — desaturated, silver-toned, clinical.

GOLD ANNOTATION OVERLAY: A precise rectangular box drawn in amber-gold around the central selected vial. Corner crop marks in gold at the four corners of the image. A small arrow pointing to the fingertip. Bracket marks along the shelf edges. Tick marks along the bottom edge like a measurement scale. A second smaller rectangle around just the vial cap. Multiple deliberate gold pen marks throughout — this photograph has been THOROUGHLY reviewed and annotated by a clinical researcher. At least 8 distinct gold annotation elements.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/3.5, 1/125s, ISO 100. Subject dead center. Symmetrical backlit grid behind. 16:9.`,
  },
  {
    slug: "how-step-2-review",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. CENTERED COMPOSITION: A physician in a white lab coat holds a single pharmaceutical vial DEAD CENTER of the frame at chest height, presenting it directly to camera. Both black-gloved hands cradle the vial symmetrically. The physician's torso fills the frame — we see the lab coat, stethoscope around the neck, and the centered vial. No face visible — cropped at the chin. The composition is perfectly symmetrical. The vial is at the exact center point of the image.

The photograph is entirely monochromatic — desaturated, silver-toned, clinical.

GOLD ANNOTATION OVERLAY: A precise circular mark drawn in amber-gold around the vial — like a clinical reviewer circled the key finding. Rectangular bracket marks flanking the physician's hands. Corner crop marks at all four corners. Small arrow marks pointing to the stethoscope. A horizontal gold line under the vial like an underline of emphasis. Tick marks along the edges. Multiple deliberate gold pen marks throughout — at least 8 distinct annotation elements. This is a clinical review document, thoroughly marked up.

Photography: Hasselblad H6D-400c, HC 120mm f/4, f/4, 1/125s, ISO 100. Subject dead center. Clean clinical background. 16:9.`,
  },
  {
    slug: "how-step-3-ship",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. CENTERED COMPOSITION: A premium matte-black shipping box sits DEAD CENTER of the frame on a clean modern doorstep, lid open, revealing pharmaceutical vials nestled in black foam inside. Two hands hold the box edges from either side, framing it symmetrically. The box and its contents are the exact focal center of the image. The doorstep is polished concrete. Shot from directly above at a slight angle — the open box is centered and dominant.

The photograph is entirely monochromatic — desaturated, silver-toned, clean.

GOLD ANNOTATION OVERLAY: A bold rectangular box drawn in amber-gold around the entire open package. Smaller rectangles around individual vials inside. Corner crop marks at the image corners. Arrow marks pointing inward toward the box contents. Bracket marks along the box edges. A horizontal gold line beneath the box like a presentation underline. Tick marks and measurement-style lines along the edges. Multiple deliberate gold pen marks — at least 8 distinct annotation elements. The image reads like a quality assurance inspection photograph that has been reviewed and marked for approval.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/4, 1/60s, ISO 200. Subject dead center. Symmetrical hand placement. 16:9.`,
  },
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function generateAndSave(entry) {
  const fullPrompt = entry.prompt + ANNOTATION_STYLE;
  const outputPath = `${OUTPUT_DIR}/${entry.slug}.png`;

  console.log(`  Generating ${entry.slug}...`);

  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt: fullPrompt,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: entry.aspectRatio,
      output_format: "png",
    },
  });

  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    throw new Error(`No image returned for ${entry.slug}`);
  }

  console.log(`  Downloading ${entry.slug}...`);
  const buffer = await downloadImage(images[0].url);

  const stream = createWriteStream(outputPath);
  stream.write(Buffer.from(buffer));
  stream.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`  Saved ${outputPath}`);
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required in .env");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("\nGenerating 3 How It Works images (clinical annotation style)...\n");

  for (const entry of IMAGES) {
    try {
      await generateAndSave(entry);
    } catch (err) {
      console.error(`  FAILED ${entry.slug}: ${err.message}`);
    }
  }

  console.log("\nDone. Run: npm run generate:blur-placeholders");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
