#!/usr/bin/env node
/**
 * Generate showcase reel images for the homepage — symbolic imagery
 * of each therapeutic area in the clinical annotation overlay style.
 * Uses fal.ai Nano Banana 2.
 *
 * Usage: node --env-file=.env scripts/generate-showcase-images.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";

const OUTPUT_DIR = "public/images/lifestyle";

const SHARED_STYLE = `

MANDATORY VISUAL STYLE — CLINICAL ANNOTATION OVERLAY ON PHOTOGRAPHY:
The base image MUST be beautiful, realistic, high-end editorial photography — Hasselblad H6D-400c sensor fidelity, micro-contrast, lifted blacks, recovered highlights, D65 6500K white balance. Photorealistic. NOT illustrated.

The photograph is strictly monochromatic — black, charcoal, grey, silver, white. Completely desaturated.

OVERLAID on the photograph are precise AMBER-GOLD (#D4AF37) clinical annotation marks — as if a lab scientist or medical researcher marked up a printed photograph with a gold felt-tip pen during a review meeting. These marks are:
- GEOMETRIC and INTENTIONAL: rectangles/boxes drawn around areas of interest, straight underlines, bracket marks, corner crop marks, precise arrows pointing to key details, margin tick marks, measurement lines. NOT loose artistic brush strokes — DELIBERATE, SYSTEMATIC annotation marks.
- Multiple annotation elements per image — at least 5-8 distinct gold marks spread across the composition. Thoroughly annotated.
- The marks have the character of a felt-tip marker on glossy photo paper — slightly textured, mostly opaque, with occasional pen-pressure variation.
- This is GRAPHIC DESIGN — structured, purposeful.

The amber-gold annotation marks are the ONLY color. Everything in the photograph is monochrome.
No text, no logos, no watermarks, no words, no letters, no numbers.
Mood: optimistic, aspirational, forward-looking. Clinical precision meets human potential.`;

const IMAGES = [
  {
    slug: "showcase-transformation",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. A fit figure in minimal charcoal athletic wear, captured mid-stride on a sleek modern indoor track. Shot from a low 3/4 angle, we see the legs and torso in powerful forward motion — no full face visible. The environment is architectural: polished concrete, floor-to-ceiling glass, morning light cutting sharp shadow lines across the floor. The figure is offset slightly right of center with dramatic negative space. The posture radiates discipline and momentum.

Monochromatic photograph — desaturated, silver-toned.

GOLD ANNOTATION OVERLAY: A rectangular box around the figure's torso and stride. Corner crop marks at the four image corners. Arrows pointing to the leading foot and trailing leg indicating direction of motion. Bracket marks along the shadow lines on the floor. Tick marks along the bottom edge like a measurement scale. Small circle mark around the knee joint. At least 8 distinct annotation elements — this is a biomechanics review document.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/3.5, 1/250s, ISO 200. Frozen motion. Directional window light camera-right. 16:9.`,
  },
  {
    slug: "showcase-strength",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. A sculpted male torso in 3/4 profile view, dramatically lit from one side. Athletic, lean musculature — visible but natural, not bodybuilder-extreme. Shot against a matte black background. A single hard key light sculpts every contour, creating deep shadows and brilliant highlights on skin. A razor-thin rim light separates the figure from the background. The composition is powerful and direct.

Monochromatic photograph — desaturated, silver-toned. Like a Herb Ritts study of form.

GOLD ANNOTATION OVERLAY: Measurement lines drawn along the shoulder width and arm length. A box around the pectoral and deltoid region. Bracket marks flanking the torso. Arrows pointing to key muscle groups. Corner crop marks at image corners. Tick marks along the bottom. A circle around the shoulder joint. At least 8 annotation elements — this reads like an anatomical review or body composition assessment document.

Photography: Hasselblad H6D-400c, HC 120mm f/4, f/5.6, 1/125s, ISO 50. Single hard key light at 90-degrees. Deep chiaroscuro. 16:9.`,
  },
  {
    slug: "showcase-restoration",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. An athlete's hand gripping a gymnastic ring or pull-up bar — extreme close-up on the grip. Tendons of the forearm visible, muscles engaged, knuckles tight. Shot from below looking up. A single hard light from above creates a dramatic halo effect around the hand and bar. Background is pure black. The image is about tension, strength, and the mechanics of the body under load.

Monochromatic photograph — desaturated, hyper-detailed skin texture.

GOLD ANNOTATION OVERLAY: A box around the grip and knuckles. Arrows pointing to individual tendons in the forearm. Bracket marks around the wrist joint. Measurement lines along the forearm indicating muscle groups. Corner crop marks at image edges. Circle marks around the finger joints. Tick marks along one side. At least 8 annotation elements — like a sports medicine assessment of grip mechanics and tendon health.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/4, 1/250s, ISO 200. Hard key light from directly above. No fill. 16:9.`,
  },
  {
    slug: "showcase-balance",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. An intimate, abstract composition of two hands — one male, one female — gently touching or almost touching, captured in extreme close-up. The gesture is tender but restrained, like Michelangelo's Creation of Adam reinterpreted through modernist photography. Shot against a soft grey-to-black gradient background. Soft, diffused but directional lighting creates gentle shadows between the fingers. The fingertips are in sharp focus, wrists falling to bokeh.

Monochromatic photograph — desaturated, silver-toned. No warm skin tones.

GOLD ANNOTATION OVERLAY: A circle mark drawn around the point where fingertips meet. Bracket marks flanking each hand. Arrows pointing to the contact point from both sides. Corner crop marks at all four image corners. A horizontal measurement line between the two wrists. Small tick marks along the bottom edge. A rectangular box around the central gesture. At least 8 annotation elements — like a clinical study documenting the moment of human connection.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/4, 1/60s, ISO 100. Large softbox above at 45-degrees. 16:9.`,
  },
  {
    slug: "showcase-timelessness",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. A profile view of a distinguished older person (60s, silver hair, strong bone structure) — head and shoulders, dramatically lit. A subtle overlay of geometric patterns — like a DNA helix or molecular lattice — appears as projected white light across their features. The image feels futuristic and dignified. Profile is razor-sharp on the eye and cheekbone, facing right into negative space.

Monochromatic photograph — desaturated, silver-toned. The projected pattern is white/silver light only.

GOLD ANNOTATION OVERLAY: A circle around the eye and cheekbone area. Rectangular box around the projected molecular pattern. Arrows pointing to the DNA helix projection. Corner crop marks at image corners. Bracket marks around the profile silhouette. Measurement lines along the jawline. Tick marks along edges. A small box highlighting the silver hair. At least 8 annotation elements — like a longevity research document analyzing cellular markers.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/4, 1/60s, ISO 100. Key light sculpting from camera-right. Gobo creates geometric pattern from camera-left. Matte black background. 16:9.`,
  },
  {
    slug: "showcase-stillness",
    aspectRatio: "16:9",
    prompt: `Editorial photograph. A figure sits in a minimal, modern concrete space — a window seat or meditation room. Seen from behind, looking out through a large window at an overcast sky. The posture is relaxed and grounded. The space is austere but warm in its simplicity: raw concrete walls, a single grey wool throw, clean lines. Soft, diffused, overcast light fills the room. The figure is centered with generous negative space on all sides.

Monochromatic photograph — desaturated, silver-grey. Not warm.

GOLD ANNOTATION OVERLAY: A rectangular box around the figure. Bracket marks on either side of the window frame. Arrows pointing to the light source (window). Corner crop marks at image corners. A circle around the figure's head/shoulders area. Measurement tick marks along the bottom. A horizontal line under the window sill. Small angle marks in the corners of the room. At least 8 annotation elements — like a wellness study documenting environmental factors in a therapeutic space.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/4, 1/30s, ISO 200. Natural window light. Atmospheric haze. 16:9.`,
  },
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function generateAndSave(entry) {
  const fullPrompt = entry.prompt + SHARED_STYLE;
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

  console.log("\nGenerating 6 showcase reel images...\n");

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
