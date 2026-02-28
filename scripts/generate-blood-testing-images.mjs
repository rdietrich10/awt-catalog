#!/usr/bin/env node

/**
 * Generate all Blood Testing & Analysis images via fal.ai:
 *   1. Base vacutainer tube (text-to-image)
 *   2. 8 product images (label-swap via edit endpoint)
 *   3. 1 category image (text-to-image, clinical annotation style)
 *   4. 3 article images (text-to-image, editorial style)
 *
 * Usage: node --env-file=.env scripts/generate-blood-testing-images.mjs [--force]
 */

import { fal } from "@fal-ai/client";
import { createWriteStream, readFileSync, existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;
const CATEGORIES_DIR = `${ROOT}/public/images/categories`;
const ARTICLES_DIR = `${ROOT}/public/images/articles`;
const BASE_VACUTAINER_PATH = `${PRODUCTS_DIR}/base-vacutainer.png`;

const SHARED_MONO_STYLE = `
IMPORTANT GLOBAL STYLE CONSTRAINTS — apply to the entire image:
Strictly monochromatic palette: black, charcoal, grey, silver, white ONLY.
Absolutely no color — no blue, no teal, no orange, no green, no red, no purple.
Photography quality: Hasselblad H6D-400c sensor fidelity, micro-contrast, lifted blacks, recovered highlights.
Mood: pharmaceutical precision meets luxury design. Aesop meets Porsche Design meets Apple.`;

const ANNOTATION_STYLE = `
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

const PRODUCTS = [
  {
    slug: "comprehensive-100-biomarker-panel",
    name: "Comprehensive 100+ Biomarker Panel",
    genericName: "Annual Health Assessment",
    strengths: "100+ Markers",
    indication: "Annual screening, early risk detection",
    route: "Blood Draw",
    dosing: "Annual",
  },
  {
    slug: "metabolic-diabetes-panel",
    name: "Metabolic & Diabetes Risk Panel",
    genericName: "Metabolic Health Screening",
    strengths: "15+ Markers",
    indication: "Insulin resistance, metabolic syndrome",
    route: "Blood Draw",
    dosing: "Annual",
  },
  {
    slug: "cardiovascular-health-panel",
    name: "Cardiovascular Health Panel",
    genericName: "Heart & Vascular Risk Assessment",
    strengths: "18+ Markers",
    indication: "Cardiovascular risk stratification",
    route: "Blood Draw",
    dosing: "Annual",
  },
  {
    slug: "hormonal-health-panel",
    name: "Hormonal Health Panel",
    genericName: "Endocrine & Hormone Assessment",
    strengths: "12+ Markers",
    indication: "Hormonal balance, optimization",
    route: "Blood Draw",
    dosing: "Annual",
  },
  {
    slug: "thyroid-complete-panel",
    name: "Thyroid Complete Panel",
    genericName: "Full Thyroid Function Assessment",
    strengths: "7 Markers",
    indication: "Thyroid dysfunction screening",
    route: "Blood Draw",
    dosing: "Annual",
  },
  {
    slug: "inflammation-immune-panel",
    name: "Inflammation & Immune Function Panel",
    genericName: "Immune & Inflammatory Assessment",
    strengths: "15+ Markers",
    indication: "Chronic inflammation, immune function",
    route: "Blood Draw",
    dosing: "Annual",
  },
  {
    slug: "nutrient-vitamin-panel",
    name: "Nutrient & Vitamin Deficiency Panel",
    genericName: "Micronutrient Status Assessment",
    strengths: "14+ Markers",
    indication: "Vitamin/mineral deficiency screening",
    route: "Blood Draw",
    dosing: "Annual",
  },
  {
    slug: "liver-kidney-function-panel",
    name: "Liver & Kidney Function Panel",
    genericName: "Hepatic & Renal Assessment",
    strengths: "16+ Markers",
    indication: "Organ function monitoring",
    route: "Blood Draw",
    dosing: "Annual",
  },
];

const CATEGORY_IMAGE = {
  slug: "blood-testing-analysis",
  prompt: `Editorial photograph of a modern clinical laboratory scene. Close-up of a gloved hand carefully holding a single blood collection vacutainer tube, examining it against diffused overhead light. Behind, a precision tube rack holds a row of organized blood collection tubes in soft focus. The environment is clean, modern, and clinical — polished surfaces, soft overhead lighting, architectural precision. A centrifuge or analytical instrument is partially visible in the background.

Monochromatic photograph — desaturated, silver-toned, black and white.

GOLD ANNOTATION OVERLAY: A rectangular box drawn around the vacutainer tube in the foreground hand. Corner crop marks at all four image corners. Arrows pointing to the tube rack and the analytical instrument. Bracket marks flanking the hand. Measurement tick marks along the bottom edge. A circle around the tube cap. Horizontal measurement lines along the rack. At least 8 distinct annotation elements — this reads like a quality control review document in a clinical laboratory.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/4, 1/125s, ISO 200. Key light from above, soft and diffused. 16:9 composition.`,
};

const ARTICLE_IMAGES = [
  {
    slug: "why-annual-biomarker-screening-matters",
    prompt: `Editorial photograph of a clinical laboratory workstation. Multiple blood collection vacutainer tubes arranged in a precision centrifuge, viewed from a 3/4 overhead angle. The centrifuge is open, revealing the organized tubes. Behind it, a modern automated blood analyzer with digital readouts. The workspace is immaculate — stainless steel, glass, polished surfaces. Diffused morning light from a nearby window. The mood is precision and purpose.

Monochromatic photograph — desaturated, silver-toned, completely black and white.

GOLD ANNOTATION OVERLAY: A box around the centrifuge rotor. Arrows pointing to individual tubes. Bracket marks around the blood analyzer. Corner crop marks at all four edges. Tick marks along the bottom. A circle around the analyzer readout. Measurement lines connecting the centrifuge to the analyzer. At least 8 annotation elements — like a lab validation document.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/5.6, 1/60s, ISO 200. Overhead soft light. 16:9.`,
  },
  {
    slug: "understanding-blood-biomarkers",
    prompt: `Editorial photograph of a modern clinical display screen showing health data visualization — abstract waveforms, bar charts, and data plots representing biomarker levels and physiological measurements. The screen is large and mounted in a dark, minimal clinical environment. A hand in a white coat sleeve points toward a data cluster on the screen. The data visualization is monochromatic — white and silver graphs on a dark display. The composition is graphic and intentional.

Monochromatic photograph — desaturated, silver-toned, completely black and white.

GOLD ANNOTATION OVERLAY: Rectangular boxes around key data clusters on the screen. Arrows pointing to specific peaks and valleys in the waveforms. Bracket marks flanking the display. Corner crop marks at image edges. Tick marks along the bottom. Circle marks around individual data points. Measurement lines across the graph. At least 8 annotation elements — like a clinical data review session.

Photography: Hasselblad H6D-400c, HC 80mm f/2.8, f/2.8, 1/60s, ISO 400. Screen glow as primary light, soft fill from above. 16:9.`,
  },
  {
    slug: "precision-blood-testing-healthcare",
    prompt: `Editorial photograph of a clinical consultation scene. A provider in a white coat and a patient sit across from each other at a modern, minimal desk in a bright, architectural clinical space. Between them, a tablet or slim display shows health data. The provider's hand gestures toward the screen. The interaction is professional and collaborative. Floor-to-ceiling windows behind, diffused natural light. Both figures are slightly abstract — no clear faces, focus on the interaction and the data between them.

Monochromatic photograph — desaturated, silver-toned, completely black and white.

GOLD ANNOTATION OVERLAY: A box around the tablet/screen between them. Arrows pointing to the data on screen and the provider's gesture. Bracket marks around the two figures. Corner crop marks at image corners. Measurement lines from the screen to each person. Tick marks along the bottom. A circle around the gesture point. At least 8 annotation elements — like a patient engagement study document.

Photography: Hasselblad H6D-400c, HC 35mm f/3.5, f/4, 1/60s, ISO 200. Large window light from behind, soft fill. 16:9.`,
  },
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  return response.arrayBuffer();
}

async function uploadFile(filePath, name) {
  const buffer = readFileSync(filePath);
  return fal.storage.upload(new File([buffer], name, { type: "image/png" }));
}

async function generateTextToImage(prompt, aspectRatio, outputPath) {
  const result = await fal.subscribe("fal-ai/nano-banana-2", {
    input: {
      prompt,
      num_images: 1,
      resolution: "2K",
      aspect_ratio: aspectRatio,
      output_format: "png",
    },
  });
  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) throw new Error("No image returned");
  const buffer = await downloadImage(images[0].url);
  await writeFile(outputPath, Buffer.from(buffer));
  return outputPath;
}

async function generateLabelSwap(baseUrl, product, outputPath) {
  const bottomBand = [product.strengths, product.indication, product.route, product.dosing].join(" • ");
  const prompt = `Update the label only. Replace the current label text with this new product information. Keep everything else identical: same container, same silver/chrome design, same photography, same angle, same lighting. ONLY the product being sold in the shot - no other products.

NEW LABEL:
Top band (silver/chrome or charcoal): AW Therapeutics logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "${product.name}" in large bold black, "${product.genericName}" in grey below
Bottom band (silver/chrome or charcoal): "${bottomBand}"

Do not change the container shape, cap, lighting, background, or composition. Only update the label text. Silver and chrome accents only — no colors.`;

  const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: {
      prompt,
      image_urls: [baseUrl],
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "3:4",
      output_format: "png",
    },
  });
  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) throw new Error(`No image for ${product.slug}`);
  const buffer = await downloadImage(images[0].url);
  await writeFile(outputPath, Buffer.from(buffer));
  return outputPath;
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");

  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("FAL_API_KEY or FAL_KEY required in .env");
    process.exit(1);
  }

  fal.config({ credentials });

  await mkdir(PRODUCTS_DIR, { recursive: true });
  await mkdir(CATEGORIES_DIR, { recursive: true });
  await mkdir(ARTICLES_DIR, { recursive: true });

  // Step 1: Generate base vacutainer tube
  if (force || !existsSync(BASE_VACUTAINER_PATH)) {
    console.log("\n1/4  Generating base vacutainer tube image...\n");
    const basePrompt = `Product photography of a single blood collection vacutainer tube on a polished obsidian-black reflective surface. The tube is made of clear glass with a silver/chrome screw cap. It sits at a slight angle, catching specular highlights. The tube has a professional pharmaceutical label with three bands:
- Top band: silver/chrome strip with "AW Therapeutics" in white text
- Middle section: white background with "MEDICAL GRADE" in small grey text, then "Biomarker Panel" in large bold black text, "Blood Analysis" in grey below
- Bottom band: silver/chrome strip with small text

The tube is elegant, clinical, and premium. The lighting is a single key light from camera-right with soft fill, creating dramatic shadows and brilliant glass reflections. Background is a smooth gradient from dark charcoal to pure black. A soft reflection of the tube appears on the polished surface below.

${SHARED_MONO_STYLE}

Photography: Hasselblad H6D-400c, HC 120mm f/4 Macro, f/5.6, 1/125s, ISO 100. 3:4 portrait aspect ratio.`;

    await generateTextToImage(basePrompt, "3:4", BASE_VACUTAINER_PATH);
    console.log("  Base vacutainer saved.");
  } else {
    console.log("\n1/4  Base vacutainer exists, skipping (use --force to overwrite).\n");
  }

  // Step 2: Generate product images via label-swap
  console.log("\n2/4  Generating product images via label-swap...\n");
  console.log("  Uploading base vacutainer...");
  const baseUrl = await uploadFile(BASE_VACUTAINER_PATH, "base-vacutainer.png");
  console.log("  Base uploaded.\n");

  const productResults = await Promise.allSettled(
    PRODUCTS.map(async (product, i) => {
      const outputPath = `${PRODUCTS_DIR}/${product.slug}.png`;
      if (!force && existsSync(outputPath)) {
        console.log(`  [${i + 1}/${PRODUCTS.length}] ${product.slug} exists, skipping.`);
        return { slug: product.slug, skipped: true };
      }
      console.log(`  [${i + 1}/${PRODUCTS.length}] Generating ${product.name}...`);
      await generateLabelSwap(baseUrl, product, outputPath);
      console.log(`  [${i + 1}/${PRODUCTS.length}] ${product.slug}.png saved.`);
      return { slug: product.slug, success: true };
    })
  );

  const prodSucceeded = productResults.filter(
    (r) => r.status === "fulfilled" && (r.value.success || r.value.skipped)
  ).length;
  console.log(`\n  Products: ${prodSucceeded}/${PRODUCTS.length} complete.\n`);

  // Step 3: Generate category image
  console.log("3/4  Generating category image...\n");
  const categoryPath = `${CATEGORIES_DIR}/${CATEGORY_IMAGE.slug}.png`;
  if (force || !existsSync(categoryPath)) {
    const fullPrompt = CATEGORY_IMAGE.prompt + ANNOTATION_STYLE;
    await generateTextToImage(fullPrompt, "16:9", categoryPath);
    console.log(`  Category image saved: ${CATEGORY_IMAGE.slug}.png\n`);
  } else {
    console.log(`  Category image exists, skipping.\n`);
  }

  // Step 4: Generate article images
  console.log("4/4  Generating article images...\n");
  const articleResults = await Promise.allSettled(
    ARTICLE_IMAGES.map(async (article) => {
      const outputPath = `${ARTICLES_DIR}/${article.slug}.png`;
      if (!force && existsSync(outputPath)) {
        console.log(`  ${article.slug} exists, skipping.`);
        return { slug: article.slug, skipped: true };
      }
      console.log(`  Generating ${article.slug}...`);
      const fullPrompt = article.prompt + ANNOTATION_STYLE;
      await generateTextToImage(fullPrompt, "16:9", outputPath);
      console.log(`  ${article.slug}.png saved.`);
      return { slug: article.slug, success: true };
    })
  );

  const artSucceeded = articleResults.filter(
    (r) => r.status === "fulfilled" && (r.value.success || r.value.skipped)
  ).length;
  console.log(`\n  Articles: ${artSucceeded}/${ARTICLE_IMAGES.length} complete.\n`);

  // Summary
  console.log("=".repeat(50));
  console.log("Image generation complete.");
  console.log("Next: run `node scripts/generate-blur-placeholders.mjs` to update blur hashes.");
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
