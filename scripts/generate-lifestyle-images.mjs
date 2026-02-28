#!/usr/bin/env node

/**
 * Generate lifestyle images for AW Therapeutics catalog using fal.ai Nano Banana Pro.
 * Text-to-image generation (no base image needed — unlike product label edits).
 * Reads FAL_API_KEY or FAL_KEY from .env.
 *
 * Usage: node --env-file=.env scripts/generate-lifestyle-images.mjs [startIndex] [count]
 * Example: node --env-file=.env scripts/generate-lifestyle-images.mjs 0 5   # first 5
 * Example: node --env-file=.env scripts/generate-lifestyle-images.mjs 5 5   # next 5
 * Example: node --env-file=.env scripts/generate-lifestyle-images.mjs 10 4  # last 4
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;

// ---------------------------------------------------------------------------
// Shared visual direction (appended to every prompt for cohesion)
// ---------------------------------------------------------------------------
const SHARED_DIRECTION = `\n\nIMPORTANT GLOBAL STYLE CONSTRAINTS — apply to the entire image:
Strictly monochromatic palette: black, charcoal, grey, silver, white ONLY.
Absolutely no color — no blue, no teal, no orange, no green, no warm skin tones.
The image should feel desaturated and silver-toned throughout.
No text, no logos, no watermarks, no UI elements.
Photography quality: Hasselblad H6D-400c sensor fidelity, micro-contrast, lifted blacks, recovered highlights, D65 6500K white balance.
Mood: pharmaceutical precision meets luxury design. Aesop meets Porsche Design meets Apple.`;

// ---------------------------------------------------------------------------
// All 14 lifestyle images
// ---------------------------------------------------------------------------
const LIFESTYLE_IMAGES = [
  // ── HOME PAGE ──────────────────────────────────────────────────────────
  {
    slug: "hero",
    outputDir: `${ROOT}/public/images/lifestyle`,
    aspectRatio: "21:9",
    prompt: `Ultra-wide cinematic editorial photograph. A lone figure stands in a vast, ultra-modern architectural space — floor-to-ceiling glass walls, polished concrete floors, and clean geometric lines. The figure is seen from behind at mid-distance, silhouetted against diffused morning light streaming through the glass. They wear minimal athletic clothing in charcoal grey. The space is monumental and serene — think Tadao Ando meets Apple Park. A single pharmaceutical vial sits on a sleek black plinth in the foreground, slightly out of focus, catching a razor-thin specular highlight.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. No blue, no warm tones.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/4, 1/60s, ISO 100. Natural key light from glass wall camera-right. Gentle fill from polished concrete floor. Atmospheric haze for depth. Lifted blacks, matte film tone, micro-contrast. Ultra-wide 21:9 composition with generous negative space. Cinematic, aspirational, editorially minimal. Aesop meets Porsche Design meets Apple.`,
  },
  {
    slug: "value-props",
    outputDir: `${ROOT}/public/images/lifestyle`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph of a pristine pharmaceutical compounding environment. Extreme close-up of gloved hands (nitrile, grey or black gloves) precisely handling a clear glass pharmaceutical vial under dramatic directional lighting. The hands are steady and purposeful — the gesture conveys clinical precision. Behind them, out of focus, are rows of identical vials on polished stainless steel shelving. The environment is ultra-clean: white surfaces, stainless steel, controlled lighting.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. No blue, no teal, no warm tones.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/2.8, 1/125s, ISO 100. Key light: single Profoto beauty dish at 45-degrees camera-left, creating sculpted shadows on the gloves and vial. Fill: subtle silver bounce. Background falls to soft bokeh. Lifted blacks, recovered highlights, clinical sharpness on the hands and vial. 16:9 composition. Mood: clinical trust, pharmaceutical precision, quiet confidence. No logos, no text.`,
  },

  // ── CATEGORIES ─────────────────────────────────────────────────────────
  {
    slug: "weight-management",
    outputDir: `${ROOT}/public/images/categories`,
    aspectRatio: "16:9",
    prompt: `Editorial lifestyle photograph. A fit figure in minimal charcoal athletic wear, captured mid-stride on a sleek indoor track or modern gym corridor. Shot from a low 3/4 angle. The figure is partially cropped — we see torso and legs in motion, no full face. The environment is architectural: polished concrete, floor-to-ceiling glass, matte black equipment. Morning light cuts through at a sharp angle creating dramatic shadow lines across the floor.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/3.5, 1/250s, ISO 200. Motion is frozen but the environment has a sense of dynamic energy. Directional key light from windows camera-right. Deep shadows, lifted blacks, film-grade tonal range. 16:9 composition with the figure offset to the right third. Mood: discipline, transformation, forward momentum. Equinox editorial meets architectural photography.`,
  },
  {
    slug: "growth-hormone-recomposition",
    outputDir: `${ROOT}/public/images/categories`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph of human musculature and form. A sculpted male torso in 3/4 profile view, dramatically lit from one side. The subject has athletic, lean musculature — visible but not bodybuilder-extreme. Shot against a matte black background. The lighting sculpts every contour with a single hard key light, creating deep shadows and brilliant highlights on skin. A razor-thin rim light separates the figure from the background.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. The image should feel like a Mapplethorpe or Herb Ritts study of form.

Photography: Hasselblad H6D-400c, HC 120mm f/4, f/5.6, 1/125s, ISO 50. Single Broncolor Para 222 at 90-degrees camera-right as hard key. Profoto strip box behind for rim. No fill — deep, dramatic chiaroscuro. Skin has a matte, almost metallic quality. Micro-contrast, focus-stacked on the musculature. 16:9 composition, subject offset left with negative space right. Mood: raw power, precision engineering of the human body.`,
  },
  {
    slug: "healing-tissue-recovery",
    outputDir: `${ROOT}/public/images/categories`,
    aspectRatio: "16:9",
    prompt: `Editorial macro photograph of the human body in recovery. An extreme close-up of a runner's knee or an athlete's shoulder — the focus is on skin texture, the subtle topography of tendons and musculature beneath the surface. A single hand gently rests on the area. The skin is clean and healthy. Dramatic side lighting reveals every texture and contour. The image is clinical yet intimate.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. No bandages, no blood, no injury visible — this is about the elegance of healing, not trauma.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/4, 1/125s, ISO 100. Single directional key light at 80-degrees creating a raking light across skin texture. Minimal fill. Background falls to pure black. Hyper-detailed skin texture. 16:9 composition. Mood: the body as architecture, quiet restoration, clinical beauty. Think: Apple Watch health campaign meets medical journal cover.`,
  },
  {
    slug: "reproductive-hormonal-health",
    outputDir: `${ROOT}/public/images/categories`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph. An intimate, abstract composition of two hands — one male, one female — gently touching or almost touching, captured in extreme close-up. The gesture is tender but restrained, like a Michelangelo Creation of Adam reinterpreted through modernist photography. Shot against a soft grey-to-black gradient background. The lighting is soft and diffused but still directional, creating gentle shadows between the fingers.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. No skin-tone warmth — the image should feel desaturated and silver-toned.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/4, 1/60s, ISO 100. Large softbox key light from above at 45-degrees for gentle, wrapping light. Silver bounce below for subtle fill. Shallow depth of field — fingertips in focus, wrists falling to bokeh. 16:9 composition, centered. Mood: connection, balance, biological harmony. Elegant and understated.`,
  },
  {
    slug: "longevity-anti-aging",
    outputDir: `${ROOT}/public/images/categories`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph with a futuristic, biometric quality. A profile view of a distinguished older person (60s, silver hair, strong bone structure) — only the face in profile, dramatically lit. A subtle overlay or reflection of geometric patterns — like a DNA helix or molecular structure — appears as a projected light pattern across their features. The overall image feels like it is from a near-future documentary about human optimization.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. The projected pattern is white/silver light only.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/4, 1/60s, ISO 100. Key light sculpting the profile from camera-right. A gobo or projector creates the geometric light pattern from camera-left. Background pure matte black. Focus razor-sharp on the eye and cheekbone. 16:9 composition, subject on left third facing right into negative space. Mood: timelessness, wisdom, the intersection of biology and technology. Porsche Design meets National Geographic.`,
  },
  {
    slug: "wellness-mood",
    outputDir: `${ROOT}/public/images/categories`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph of serene contemplation. A figure sits in a minimal, modern space — perhaps a concrete meditation room or a window seat in a brutalist apartment. They are seen from behind or in deep profile, looking out through a large window at an overcast sky. The posture is relaxed, grounded. The space is austere but warm in its simplicity: raw concrete walls, a single wool throw in grey, clean lines. Soft, diffused, overcast light fills the room.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. The overcast light should feel silver-grey, not warm.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/4, 1/30s, ISO 200. Natural window light as primary source — soft, directionless, contemplative. No artificial lighting. Slight atmospheric haze. Lifted blacks, muted contrast, film-grain texture. 16:9 composition with generous negative space. Mood: inner calm, emotional equilibrium, mindful presence. Aesop retail space meets Japanese wabi-sabi.`,
  },

  // ── ARTICLES ───────────────────────────────────────────────────────────
  {
    slug: "intro-peptides",
    outputDir: `${ROOT}/public/images/articles`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph of a modern pharmaceutical research aesthetic. A row of five identical clear glass pharmaceutical vials arranged in a precise line on a polished black surface, receding into soft bokeh. The first vial is in sharp focus, each subsequent one progressively softer. Dramatic side lighting creates long shadows and brilliant specular highlights on the glass. The composition is geometric and rhythmic.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. Silver/chrome caps on the vials.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/2.8, 1/125s, ISO 50. Single strip softbox at 90-degrees camera-left for hard specular edge lighting. Background matte black gradient. Polished obsidian surface for mirror reflections. Focus on the leading vial. 16:9 composition. Mood: the building blocks of a new science, precision, elegance of pharmaceutical form. Minimal, editorial, luxurious.`,
  },
  {
    slug: "safety-protocols",
    outputDir: `${ROOT}/public/images/articles`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph of clinical precision tools. An overhead (flat-lay) composition on a matte charcoal surface: a single pharmaceutical vial, a precision syringe with silver barrel, a pair of black nitrile gloves folded neatly, and a small stainless steel tray — all arranged with obsessive geometric precision. Each item is perfectly spaced, aligned to an invisible grid. The lighting is flat but with a slight directional bias from the top-left creating subtle shadows.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. No blue gloves — black or grey only.

Photography: Hasselblad H6D-400c, HC 120mm f/4, f/8, 1/60s, ISO 100. Large overhead softbox for even illumination with slight directional shadow. Focus stacked for edge-to-edge sharpness. Matte charcoal surface texture. 16:9 composition, items centered with generous margin. Mood: protocol, order, clinical confidence. Kinfolk magazine meets surgical precision.`,
  },
  {
    slug: "stacking-guide",
    outputDir: `${ROOT}/public/images/articles`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph. Three pharmaceutical vials arranged in a triangular composition on a polished black surface, each at a slightly different angle — creating an editorial still-life grouping. They appear to be in conversation with each other. Dramatic lighting creates distinct shadows and reflections for each vial. The composition suggests intentional combination and synergy.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. Chrome/silver caps.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/5.6, 1/125s, ISO 50. Key light: Broncolor Para at 60-degrees camera-right. Accent strip light from behind for rim separation on each vial. Polished obsidian surface with mirror reflections. Focus stacked. 16:9 composition with vials grouped in the center-left, negative space right. Mood: strategic combination, curated regimen, editorial sophistication.`,
  },
  {
    slug: "glp-1-overview",
    outputDir: `${ROOT}/public/images/articles`,
    aspectRatio: "16:9",
    prompt: `Editorial lifestyle photograph. A figure on a modern digital body composition scale in a minimal, spa-like bathroom environment — polished concrete floor, frameless glass, matte black fixtures. Shot from a low angle focusing on bare feet on the sleek scale, with the figure's legs and lower body rising into soft focus. The scale has a minimal digital display. Morning light enters from a frosted window.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. The bathroom fixtures, scale, and environment are all in the black/grey/white palette.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/3.5, 1/60s, ISO 200. Natural diffused light from frosted window. Supplemental silver bounce fill. Shallow depth of field — feet and scale sharp, everything above the knees in bokeh. 16:9 composition. Mood: measurable transformation, quiet discipline, modern wellness ritual. Equinox spa meets Dieter Rams design.`,
  },
  {
    slug: "healing-peptides",
    outputDir: `${ROOT}/public/images/articles`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph. An athlete's hand gripping a gymnastic ring or pull-up bar — extreme close-up on the grip. The tendons of the forearm are visible, muscles engaged, knuckles tight. Shot from below looking up. A single hard light source from above creates a dramatic halo effect around the hand and bar. The background is pure black. The image is about strength, tension, and the mechanics of the body under load.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. The bar/ring should be matte silver or chrome.

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/4, 1/250s, ISO 200. Hard key light from directly above (Profoto Magnum reflector). No fill — deep, contrasty shadows. Hyper-sharp detail on tendons and skin texture. 16:9 composition. Mood: raw functional strength, the architecture of repair and resilience. Gritty elegance.`,
  },
  {
    slug: "longevity-protocols",
    outputDir: `${ROOT}/public/images/articles`,
    aspectRatio: "16:9",
    prompt: `Editorial photograph with a laboratory-meets-luxury aesthetic. A clean, modern lab bench with a single microscope, a petri dish, and two pharmaceutical vials arranged with deliberate minimalism. The bench surface is white Corian or marble. Behind, a large monitor displays an abstract visualization of cellular structures (rendered as silver/white geometric forms on black). The depth of field isolates the vial in the foreground with the screen as a luminous bokeh backdrop.

Strictly monochromatic: black, charcoal, grey, silver, white only. No color. The screen visualization is silver/white graphics on black only.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/2.8, 1/60s, ISO 100. Key light from above-left (large softbox) illuminating the bench. The monitor provides backlight and ambient glow. Shallow depth of field — foreground vial sharp, microscope and screen soft. 16:9 composition. Mood: the frontier of cellular science, precision research as luxury endeavor. Science journal meets Wallpaper magazine.`,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function generateImage(entry) {
  const fullPrompt = entry.prompt + SHARED_DIRECTION;

  const result = await fal.subscribe("fal-ai/nano-banana-pro", {
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
    throw new Error(`No image in response for ${entry.slug}`);
  }
  return images[0].url;
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

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const startIndex = parseInt(process.argv[2] || "0", 10);
  const count = parseInt(process.argv[3] || "5", 10);
  const images = LIFESTYLE_IMAGES.slice(startIndex, startIndex + count);

  if (images.length === 0) {
    console.log("No images to generate.");
    console.log(`Usage: node script.mjs [startIndex] [count]`);
    console.log(`Total lifestyle images: ${LIFESTYLE_IMAGES.length}`);
    process.exit(0);
  }

  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY required.");
    console.error("   Usage: node --env-file=.env scripts/generate-lifestyle-images.mjs");
    process.exit(1);
  }

  fal.config({ credentials });

  console.log(`\n🎨 Generating ${images.length} lifestyle image(s) [${startIndex}..${startIndex + images.length - 1}] of ${LIFESTYLE_IMAGES.length} total\n`);

  for (let i = 0; i < images.length; i++) {
    const entry = images[i];
    const outputPath = `${entry.outputDir}/${entry.slug}.png`;

    console.log(`[${i + 1}/${images.length}] 🖼️  ${entry.slug} (${entry.aspectRatio})...`);

    try {
      await mkdir(entry.outputDir, { recursive: true });
      const imageUrl = await generateImage(entry);
      console.log(`   📥 Downloading...`);
      await saveImage(imageUrl, outputPath);
      console.log(`   ✅ Saved ${outputPath.replace(ROOT, "")}`);
    } catch (err) {
      console.error(`   ❌ ${entry.slug}: ${err.message}`);
    }
  }

  console.log("\n✅ Done. Update data files to reference the new images.");
  console.log("   Lifestyle: /images/lifestyle/<slug>.png");
  console.log("   Categories: /images/categories/<slug>.png");
  console.log("   Articles: /images/articles/<slug>.png");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
