#!/usr/bin/env node
/**
 * Generate missing article images for the AW Therapeutics catalog.
 * Covers the 4 articles that are missing images:
 *   - glp-1-comparison
 *   - future-of-weight-loss
 *   - starting-glp-1-medication
 *   - why-we-dont-sell-nutraceuticals
 *
 * Usage: FAL_KEY=<key> node scripts/generate-glp1-blog-images.mjs
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const OUTPUT_DIR = `${ROOT}/public/images/articles`;

const SHARED_DIRECTION = `\n\nIMPORTANT GLOBAL STYLE CONSTRAINTS — apply to the entire image:

BASE PHOTOGRAPHY:
The base image MUST be beautiful, realistic, high-end editorial photography — Hasselblad H6D-400c sensor fidelity, micro-contrast, lifted blacks, recovered highlights, D65 6500K white balance. Photorealistic. NOT illustrated, NOT posterized, NOT halftone, NOT graphic art.
The photograph is strictly monochromatic — black, charcoal, grey, silver, white. Completely desaturated and silver-toned throughout. No color in the photography itself.

BRAND RULE — "Clinical Annotation Overlay":
OVERLAID on top of the photograph are precise AMBER-GOLD (#D4AF37) clinical annotation marks — as if a lab scientist, medical researcher, or clinical reviewer physically marked up a printed photograph with a gold felt-tip pen during a review session. These annotation marks are:
- GEOMETRIC and INTENTIONAL: rectangles/boxes drawn around areas of interest, straight underlines, bracket marks [ ], corner crop marks ⌐ ⌐, precise arrows pointing to key details, margin tick marks, measurement lines, circle marks around focal elements. These are DELIBERATE, SYSTEMATIC annotation marks — graphic design, not artistic expression.
- Multiple annotation elements per image — at least 5-8 distinct gold marks (boxes, lines, arrows, brackets, corner marks) spread across the composition. The image should feel THOROUGHLY annotated and reviewed.
- Think: a forensic scientist marking evidence, a radiologist circling findings on a scan, an engineer red-lining a blueprint, a lab director reviewing batch documentation — but in gold instead of red.
- The marks have the character of a felt-tip marker on glossy photo paper — slightly textured, mostly opaque, with occasional pen-pressure variation. Some marks may have small drips or ink pooling where the pen paused.
- The annotation marks should circle, box, underline, or point to the conceptual focus of each image — whatever element the prompt identifies as the subject or focal point.
- The amber-gold annotation marks are the ONLY color in the image. Everything in the photograph itself remains monochrome.

No text, no logos, no watermarks, no UI elements, no words or letters.
Mood: pharmaceutical precision meets luxury editorial meets clinical review. Aesop meets Porsche Design meets Apple.`;

const IMAGES = [
  {
    slug: "glp-1-comparison",
    aspectRatio: "16:9",
    prompt: `Editorial pharmaceutical still-life. Three identical clear glass pharmaceutical vials arranged in a precise horizontal row on a polished matte-black surface, evenly spaced with mathematical precision — the spacing between them suggests comparison, selection, and differentiation. Each vial has a polished silver cap and is filled with clear liquid. Dramatic raking light from camera-left casts long parallel shadows to the right, one shadow per vial. Each vial creates a clean mirror reflection on the obsidian surface below.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. Silver/chrome caps.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/5.6, 1/125s, ISO 50. Single Broncolor Para key light at 45-degrees camera-left. Rim strip light from behind-right for vial separation. Polished obsidian surface with perfect mirror reflections under each vial. Focus stacked — all three vials razor sharp. 16:9 composition, vials centered with controlled negative space above and below. Mood: comparative clinical analysis, three distinct options, pharmaceutical precision and selection.`,
  },
  {
    slug: "future-of-weight-loss",
    aspectRatio: "16:9",
    prompt: `Editorial architectural photograph. A lone figure walks through a monumental open doorway or archway in a modernist concrete building — viewed from behind at mid-distance, mid-stride, crossing a threshold. The doorway is backlit by diffused daylight from a vast open courtyard beyond, creating a luminous threshold of light. The figure is partially silhouetted — we read the posture as purposeful, forward-moving. The architecture is austere and geometric: raw concrete, precise right angles, monumental scale. The floor is polished concrete with reflected light.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. No warm tones — the daylight beyond reads as cool silver.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/5.6, 1/250s, ISO 100. Camera exposure balanced toward the bright threshold — figure rendered as a dark silhouette against the luminous opening. Atmospheric haze visible in the mid-ground. Lifted blacks, silver-tone grade. 16:9 composition, figure at center-left walking right into the light. Mood: entering a new era, transformation, crossing into a new paradigm — aspirational, minimal, forward.`,
  },
  {
    slug: "starting-glp-1-medication",
    aspectRatio: "16:9",
    prompt: `Editorial macro photograph of clinical preparation. An extreme close-up of gloved hands — black nitrile gloves — drawing medication from a clear glass pharmaceutical vial with a precision syringe. One hand holds the inverted vial steady; the other draws the syringe plunger with controlled precision. The stainless steel syringe barrel catches a brilliant specular highlight. The needle pierces the rubber stopper at a perfect angle. This is the defining gesture of clinical protocol — the moment before administration. Background falls to pure black.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. Black gloves, silver syringe barrel, clear glass vial.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/4, 1/250s, ISO 50. Single strip softbox at 90-degrees camera-left creating hard specular edge on the syringe and vial. No fill — deep shadow on the gloves. Background pure matte black. Focus on the needle-to-stopper contact point, syringe barrel and vial glass in sharp focus. 16:9 composition, hands centered in frame. Mood: precision, protocol, the controlled beginning of a clinical process.`,
  },
  {
    slug: "why-we-dont-sell-nutraceuticals",
    aspectRatio: "16:9",
    prompt: `Editorial pharmaceutical still-life with a strong contrast narrative. In sharp foreground focus: a single pristine clear glass pharmaceutical vial on a polished black surface — clinical, precise, authoritative. Behind it, deliberately out of focus and receding into soft bokeh: a cluster of generic supplement capsules and tablets scattered loosely on the same surface — their informal arrangement contrasting with the vial's precision. The composition is intentional — one clear subject, one dismissed background. Dramatic side lighting from camera-left illuminates the vial with clinical brilliance while the capsules remain in soft shadow.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. The capsules and tablets read as grey/charcoal shapes in soft bokeh.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/2.8, 1/125s, ISO 50. Single Broncolor strip at 90-degrees camera-left. Shallow depth of field — vial tack-sharp, capsules fully dissolved into background bokeh. Polished obsidian surface. 16:9 composition, vial at center-left, capsule scatter receding right. Mood: the choice between pharmaceutical precision and supplement ambiguity — clinical authority over noise.`,
  },
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function saveImage(url, outputPath) {
  const buffer = await downloadImage(url);
  const stream = createWriteStream(outputPath);
  stream.write(Buffer.from(buffer));
  stream.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required.");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log(`\nGenerating ${IMAGES.length} article images...\n`);

  for (let i = 0; i < IMAGES.length; i++) {
    const entry = IMAGES[i];
    const outputPath = `${OUTPUT_DIR}/${entry.slug}.png`;
    console.log(`[${i + 1}/${IMAGES.length}] ${entry.slug}...`);

    try {
      const result = await fal.subscribe("fal-ai/nano-banana-2", {
        input: {
          prompt: entry.prompt + SHARED_DIRECTION,
          num_images: 1,
          resolution: "2K",
          aspect_ratio: entry.aspectRatio,
          output_format: "png",
        },
      });

      const imageUrl = result?.data?.images?.[0]?.url;
      if (!imageUrl) throw new Error("No image URL in response");

      await saveImage(imageUrl, outputPath);
      console.log(`   Saved /public/images/articles/${entry.slug}.png`);
    } catch (err) {
      console.error(`   FAILED ${entry.slug}: ${err.message}`);
    }
  }

  console.log("\nDone. Commit the generated images and push.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
