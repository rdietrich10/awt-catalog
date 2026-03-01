#!/usr/bin/env node

/**
 * Generate per-page OG (Open Graph) images for AW Therapeutics using fal.ai.
 * Each page gets a unique image matching the brand's monochromatic luxury aesthetic.
 *
 * Output: public/images/og/og-{slug}.png (1200x630, 16:9)
 * Reads FAL_API_KEY or FAL_KEY from .env.
 *
 * Usage:
 *   node --env-file=.env scripts/generate-og-images.mjs           # generate all
 *   node --env-file=.env scripts/generate-og-images.mjs home about # generate specific pages
 */

import { fal } from "@fal-ai/client";
import { createWriteStream } from "fs";
import { mkdir, access } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const OUTPUT_DIR = `${ROOT}/public/images/og`;

const ASPECT_RATIO = "16:9";

const SHARED_DIRECTION = `
IMPORTANT GLOBAL STYLE CONSTRAINTS — apply to the entire image:
Strictly monochromatic palette: black, charcoal, grey, silver, white ONLY.
Absolutely no color — no blue, no teal, no orange, no green, no red, no purple.
Photography quality: Hasselblad H6D-400c sensor fidelity, micro-contrast, lifted blacks, recovered highlights.
Mood: pharmaceutical precision meets luxury design. Aesop meets Porsche Design meets Apple.
The image should feel like a luxury fashion editorial crossed with a pharmaceutical brand campaign.
Resolution: Ultra-high detail, sharp edges, no artifacts.`;

const PAGE_PROMPTS = {
  home: {
    file: "og-home.png",
    prompt: `Editorial Open Graph image for AW Therapeutics homepage.
Ultra-wide editorial photograph. Three pharmaceutical vials arranged in a precise diagonal line on a polished obsidian-black surface, receding into soft bokeh. The lead vial is in sharp focus with brilliant specular highlights on the glass. Silver and chrome caps. In the background, a vast architectural space — floor-to-ceiling glass, polished concrete, diffused morning light. A lone silhouetted figure stands in the distance. The space is monumental and serene. Strictly monochromatic.
TEXT OVERLAY: Dark gradient overlay for readability. Large bold white sans-serif uppercase centered headline: "PRECISION THERAPEUTICS. ELEVATED OUTCOMES." Smaller light grey helper text below: "Medical-grade compounds for weight management, recovery, longevity, and beyond."`,
  },

  products: {
    file: "og-products.png",
    prompt: `Editorial Open Graph image for a pharmaceutical product catalog page.
Overhead flat-lay grid of pharmaceutical vials arranged in a precise 4x3 matrix on a matte black surface. Each vial has a silver or chrome cap catching different light angles. Clinical precision in the arrangement — equal spacing, perfect alignment. Minimalist product catalog aesthetic. One vial slightly askew for visual interest. Soft shadows cast by directional lighting from the upper left. Monochromatic: black, grey, silver, white only.
TEXT OVERLAY: Dark gradient overlay. Large bold white sans-serif uppercase centered headline: "ADVANCED THERAPEUTICS CATALOG." Smaller light grey text below: "Browse, compare, and submit for physician review."`,
  },

  about: {
    file: "og-about.png",
    prompt: `Editorial Open Graph image for a medical practice about page.
A lone physician silhouette standing in a monumental glass-and-concrete atrium. Morning light streaming through floor-to-ceiling windows, creating dramatic long shadows on polished concrete floors. The figure stands with quiet authority, slightly off-center. The architecture is brutalist-meets-modern — vast, clean, intentional. Dust motes visible in the light beams. Strictly monochromatic: black, charcoal, grey, silver, white.
TEXT OVERLAY: Dark gradient overlay on the left third. Large bold white sans-serif uppercase headline: "PHYSICIAN-DIRECTED. NOT RETAIL." Smaller grey text: "Clinical legitimacy in a space filled with guesswork."`,
  },

  "how-it-works": {
    file: "og-how-it-works.png",
    prompt: `Editorial Open Graph image for a medical process page.
Cinematic wide shot showing three distinct zones in one frame separated by soft vertical light columns: (1) a hand on a sleek laptop screen showing a catalog grid, (2) a physician in a white coat reviewing a tablet chart, (3) a premium pharmaceutical shipping box being sealed. Each zone represents a step in a clinical workflow. Monochromatic: black, charcoal, grey, silver, white. Clean, editorial, magazine-quality.
TEXT OVERLAY: Dark gradient. Large bold white sans-serif uppercase centered headline: "THREE STEPS TO CLINICAL CARE." Smaller grey text: "Browse. Physician review. Delivered to your door."`,
  },

  knowledge: {
    file: "og-knowledge.png",
    prompt: `Editorial Open Graph image for a medical knowledge hub page.
An open medical reference book on a dark mahogany desk, pages fanned slightly. Behind it in soft bokeh: pharmaceutical vials and a stethoscope. A reading lamp casts warm-toned (silver, not yellow) light. The composition is scholarly, clinical, authoritative. A single pair of rimless glasses rests on the book. Strictly monochromatic: black, charcoal, grey, silver, white.
TEXT OVERLAY: Dark gradient overlay. Large bold white sans-serif uppercase centered headline: "THE KNOWLEDGE HUB." Smaller grey text: "Articles, protocols, and clinical education."`,
  },

  contact: {
    file: "og-contact.png",
    prompt: `Editorial Open Graph image for a medical contact page.
A sleek black desk surface with a single silver fountain pen, a pharmaceutical vial as a paperweight, and soft diffused light from a floor-to-ceiling window on the right. The composition is minimal and inviting — a place for conversation. Shallow depth of field. A subtle reflection of the window on the polished desk surface. Strictly monochromatic: black, charcoal, grey, silver, white.
TEXT OVERLAY: Dark gradient overlay on the left half. Large bold white sans-serif uppercase headline: "LET'S CONNECT." Smaller grey text: "Questions? Our clinical team is here for you."`,
  },

  "quality-control": {
    file: "og-quality.png",
    prompt: `Editorial Open Graph image for a quality control page.
Extreme close-up macro of a pharmaceutical vial's glass surface with visible etched markings and a silver cap. In the background, slightly blurred: Certificate of Analysis paperwork and a laboratory testing instrument. The glass catches dramatic side light, revealing surface detail. Inspection and precision mood. Monochromatic: black, charcoal, grey, silver, white.
TEXT OVERLAY: Dark gradient overlay. Large bold white sans-serif uppercase centered headline: "THIRD-PARTY TESTED. COA VERIFIED." Smaller grey text: "Every batch. Every time."`,
  },

  categories: {
    file: "og-categories.png",
    prompt: `Editorial Open Graph image for a therapeutics category page.
Abstract composition: five pharmaceutical vials of different heights and widths arranged by ascending height like a bar chart on a reflective black surface. Each represents a different therapy category. The tallest vial in the center. Minimal, geometric, architectural. Each vial has a different cap style (silver, chrome, matte). Strong single light source from above creating clean shadows. Monochromatic: black, charcoal, grey, silver, white.
TEXT OVERLAY: Dark gradient. Large bold white sans-serif uppercase centered headline: "BROWSE BY CATEGORY." Smaller grey text: "Weight management, longevity, recovery, and more."`,
  },

  privacy: {
    file: "og-privacy.png",
    prompt: `Editorial Open Graph image for a HIPAA privacy page.
A heavy-duty stainless steel vault door slightly ajar with a thin line of soft white light escaping from inside. The vault surface has a brushed metal texture. A pharmaceutical vial sits on a shelf visible through the crack. The composition conveys security, protection, and trust. Dark, moody lighting. Monochromatic: black, charcoal, grey, silver, white.
TEXT OVERLAY: Dark gradient overlay. Large bold white sans-serif uppercase centered headline: "YOUR DATA. PROTECTED." Smaller grey text: "HIPAA-compliant privacy practices."`,
  },

  faq: {
    file: "og-faq.png",
    prompt: `Editorial Open Graph image for a FAQ page.
A single illuminated question mark shape formed by light reflection and refraction on a dark glass surface. The question mark is created by carefully placed pharmaceutical vials and their shadows — an optical illusion. Minimal and elegant. The rest of the frame is near-black with subtle texture. Monochromatic: black, charcoal, grey, silver, white.
TEXT OVERLAY: Dark gradient overlay. Large bold white sans-serif uppercase centered headline: "QUESTIONS? ANSWERED." Smaller grey text: "Everything you need to know about our therapeutics."`,
  },
};

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function generateImage(slug, config) {
  const outputPath = `${OUTPUT_DIR}/${config.file}`;

  try {
    await access(outputPath);
    console.log(`  ⏭  ${config.file} already exists, skipping (delete to regenerate)`);
    return true;
  } catch {
    // File doesn't exist, proceed
  }

  const fullPrompt = config.prompt + SHARED_DIRECTION;

  console.log(`  🎨 Generating ${config.file}...`);

  const result = await fal.subscribe("fal-ai/nano-banana-pro", {
    input: {
      prompt: fullPrompt,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: ASPECT_RATIO,
      output_format: "png",
    },
  });

  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    console.error(`  ❌ No image returned for ${slug}`);
    return false;
  }

  const buffer = await downloadImage(images[0].url);
  const stream = createWriteStream(outputPath);
  stream.write(Buffer.from(buffer));
  stream.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`  ✅ Saved ${config.file}`);
  return true;
}

async function main() {
  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY required.");
    console.error("   Usage: node --env-file=.env scripts/generate-og-images.mjs");
    process.exit(1);
  }

  fal.config({ credentials });

  await mkdir(OUTPUT_DIR, { recursive: true });

  const requestedSlugs = process.argv.slice(2);
  const slugs =
    requestedSlugs.length > 0
      ? requestedSlugs.filter((s) => PAGE_PROMPTS[s])
      : Object.keys(PAGE_PROMPTS);

  if (requestedSlugs.length > 0) {
    const invalid = requestedSlugs.filter((s) => !PAGE_PROMPTS[s]);
    if (invalid.length) {
      console.warn(`⚠️  Unknown page slugs: ${invalid.join(", ")}`);
      console.warn(`   Available: ${Object.keys(PAGE_PROMPTS).join(", ")}`);
    }
  }

  console.log(`\n🖼  Generating ${slugs.length} OG images...\n`);

  let success = 0;
  let failed = 0;

  for (const slug of slugs) {
    try {
      const ok = await generateImage(slug, PAGE_PROMPTS[slug]);
      if (ok) success++;
      else failed++;
    } catch (err) {
      console.error(`  ❌ Error generating ${slug}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Done: ${success} generated, ${failed} failed.`);
  console.log(`   Output: public/images/og/\n`);
}

main().catch((err) => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});
