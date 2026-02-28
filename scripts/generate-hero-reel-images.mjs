#!/usr/bin/env node
/**
 * Generate hero reel images — pharmaceutical glass vials with bold organic
 * gold shapes overlaid. Painfully simple, graphic, dominant.
 * Uses fal.ai Nano Banana 2.
 *
 * Usage: node --env-file=.env scripts/generate-hero-reel-images.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";

const OUTPUT_DIR = "public/images/lifestyle";

const STYLE = `

MANDATORY VISUAL STYLE:

BASE PHOTOGRAPHY:
Beautiful, realistic, high-end editorial still-life photography of pharmaceutical glass vials — Hasselblad H6D-400c quality. The vials are CLEAR GLASS with SILVER/CHROME caps. NO LABELS on any vials. No colored liquid — vials are either empty or contain clear/transparent liquid. The photography is STRICTLY MONOCHROMATIC — black, charcoal, grey, silver, white. Completely desaturated. No color in the photography whatsoever.

GOLD GRAPHIC OVERLAY:
Overlaid on the photograph are 1 to 3 BOLD, LARGE, ORGANIC amber-gold (#D4AF37) shapes. These are NOT small annotations, NOT precise marks, NOT boxes or arrows. These are MASSIVE, confident, graphic forms that SMOTHER and DOMINATE the composition:
- Think: Henri Matisse paper cutouts. Ellsworth Kelly organic shapes. A giant thick circle. A sweeping arc. A bold organic blob.
- Each shape should be BIG — covering 30-50% of the image area. They are the graphic event, not decoration.
- The shapes are smooth, organic, and confident — like a graphic designer laid large gold paper cutouts over the photograph.
- 1-3 shapes maximum. SIMPLE. BOLD. Not busy.
- The gold shapes partially overlap/frame/envelop the vials, creating a tension between the precise pharmaceutical subject and the bold graphic gesture.
- Edges are clean and smooth — these are graphic design elements, not paint strokes.

The amber-gold shapes are the ONLY color. Everything in the photograph is monochrome.
No text, no logos, no watermarks, no words, no letters, no numbers. No small marks, no arrows, no brackets, no tick marks.
Mood: luxury pharmaceutical meets bold graphic design. Aesop meets Matisse meets Apple.`;

const IMAGES = [
  {
    slug: "hero-reel-1",
    aspectRatio: "21:9",
    prompt: `Ultra-wide editorial still-life photograph. A single pharmaceutical glass vial with a silver cap, standing upright DEAD CENTER of the frame on a polished black obsidian surface. The vial is clear glass, no label, containing transparent liquid. Dramatic side lighting from camera-left creates a brilliant specular highlight along the glass edge and a long shadow stretching right. Background is a smooth dark gradient, almost black. The composition is minimal and monumental — one vial, vast negative space.

Monochromatic photograph — desaturated, silver-toned.

GOLD OVERLAY: ONE massive organic gold circle — thick, bold, slightly imperfect — positioned so the vial sits just inside its lower edge. The circle is large enough to span about 60% of the image width. It partially frames the vial like a giant halo or spotlight. Simple, singular, dominant.`,
  },
  {
    slug: "hero-reel-2",
    aspectRatio: "21:9",
    prompt: `Ultra-wide editorial still-life photograph. Five identical pharmaceutical glass vials arranged in a precise row, receding from camera-left to camera-right on a polished black surface. Each vial has a silver cap and clear glass, no labels. The first vial is in sharp focus, each subsequent one progressively softer in bokeh. Dramatic strip lighting creates brilliant specular edge highlights on each vial. The composition is rhythmic and architectural.

Monochromatic photograph — desaturated, silver-toned.

GOLD OVERLAY: ONE bold sweeping gold arc — a thick curved band that swoops from the lower-left corner upward and across to the upper-right, passing through/behind the row of vials. The arc is wide (thick like a highway) and smooth. It creates a sense of motion and flow across the static vials. One shape. Bold. Graphic.`,
  },
  {
    slug: "hero-reel-3",
    aspectRatio: "21:9",
    prompt: `Ultra-wide editorial still-life photograph. Extreme close-up macro of two pharmaceutical glass vials touching, shot from slightly below looking up. The glass surfaces fill the frame — we see the curvature, the meniscus of clear liquid inside, specular reflections, and the chrome caps above. The glass is the hero — every refraction and reflection rendered in stunning detail. Background is pure black.

Monochromatic photograph — desaturated, hyper-detailed glass texture.

GOLD OVERLAY: TWO large organic gold shapes — one is a bold thick crescent or half-moon form that wraps around the left vial, the other is a large organic oval that sits behind the right vial. The two shapes frame the glass forms between them. Big, simple, graphic. The gold shapes and the glass create a visual dialogue.`,
  },
  {
    slug: "hero-reel-4",
    aspectRatio: "21:9",
    prompt: `Ultra-wide editorial still-life photograph. An overhead flat-lay composition: three pharmaceutical glass vials laying on their sides on a matte charcoal surface, arranged in a loose triangular grouping. Silver caps catch the light. Clear glass, no labels. The lighting is flat-ish from above with a slight directional shadow bias. The vials are in the center of the frame with generous negative space on all sides. Clean, minimal, precise.

Monochromatic photograph — desaturated, silver-toned.

GOLD OVERLAY: ONE massive organic gold blob shape — an amorphous form (like a Matisse cutout or an Arp sculpture silhouette) that sits beneath/behind the vials, as if the vials are resting on a golden island. The shape is large, covering about 40% of the image. Organic, smooth edges, bold. The contrast between the precise vials and the organic gold form is the entire composition.`,
  },
  {
    slug: "hero-reel-5",
    aspectRatio: "21:9",
    prompt: `Ultra-wide editorial still-life photograph. A single pharmaceutical glass vial lying on its side on a polished obsidian surface, with its reflection visible in the surface below. The vial is positioned slightly left of center. Dramatic raking light from camera-right creates a long specular highlight along the glass barrel. Silver cap catches a point of light. Clear glass, no label. The mood is contemplative and quiet. Lots of black negative space.

Monochromatic photograph — desaturated, silver-toned.

GOLD OVERLAY: TWO bold geometric-organic shapes — a large gold circle in the upper portion of the image and a thick horizontal gold band running across the lower third. The vial sits in the space between them. The shapes create a graphic framework that makes the solitary vial feel monumental. Simple. Bold. Two shapes only.`,
  },
  {
    slug: "hero-reel-6",
    aspectRatio: "21:9",
    prompt: `Ultra-wide editorial still-life photograph. A tight composition of pharmaceutical glass vials seen from above at a 45-degree angle — seven or eight vials clustered together, their silver caps forming a geometric pattern like a honeycomb. The glass bodies refract and reflect each other, creating complex light patterns. The cluster fills the center of the frame. Background is pure matte black.

Monochromatic photograph — desaturated, silver and chrome tones.

GOLD OVERLAY: ONE enormous thick gold ring — a bold donut/torus shape — centered over the cluster of vials. The ring is massive, almost filling the frame width, and the vials sit inside its center opening. Like a giant gold magnifying lens framing the pharmaceutical cluster. One shape. Graphic. Dominant.`,
  },
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function generateAndSave(entry) {
  const fullPrompt = entry.prompt + STYLE;
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

  console.log("\nGenerating 6 hero reel images (vials + bold organic gold)...\n");

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
