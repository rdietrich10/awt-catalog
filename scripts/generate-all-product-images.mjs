#!/usr/bin/env node

/**
 * Generate product images from the base Sema GLP-1 bottle.
 * Passes only the base bottle image; prompt updates label info for each product.
 * Reads FAL_API_KEY or FAL_KEY from .env.
 *
 * Usage: node --env-file=.env scripts/generate-all-product-images.mjs [startIndex] [count]
 * Example: node --env-file=.env scripts/generate-all-product-images.mjs 0 5   # first 5
 * Example: node --env-file=.env scripts/generate-all-product-images.mjs 5 5   # next 5
 * Example: node --env-file=.env scripts/generate-all-product-images.mjs 10 5  # next 5
 */

import { fal } from "@fal-ai/client";
import { createWriteStream, readFileSync } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const BASE_BOTTLE_PATH = `${ROOT}/public/images/products/sema-glp-1.png`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;

const PRODUCTS = [
  { slug: "sema-glp-1", name: "Sema GLP-1", genericName: "Semaglutide", medicationClass: "GLP-1 Receptor Agonist", indications: "Weight Management", variants: [{ strength: "10 mg" }, { strength: "20 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Once weekly", labelIndication: "Weight Management" },
  { slug: "tirz-glp-2", name: "Tirz GLP-2", genericName: "Tirzepatide", medicationClass: "Dual GIP/GLP-1 Receptor Agonist", indications: "Weight Management", variants: [{ strength: "30 mg" }, { strength: "40 mg" }, { strength: "60 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Once weekly", labelIndication: "Weight Management" },
  { slug: "reta-glp-3", name: "Reta GLP-3", genericName: "Retatrutide", medicationClass: "Triple Receptor Agonist (GLP-1/GIP/Glucagon)", indications: "Weight Management", variants: [{ strength: "12 mg" }, { strength: "24 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Once weekly", labelIndication: "Weight Management" },
  { slug: "aod-9604", name: "AOD 9604", genericName: "AOD 9604", medicationClass: "Lipolysis peptide", indications: "Weight Management", variants: [{ strength: "5 mg" }], administrationRoute: "Subcutaneous", dosingNote: "5 days on/2 off", labelIndication: "Weight Management" },
  { slug: "sermorelin", name: "Sermorelin", genericName: "Sermorelin", medicationClass: "Growth hormone releasing hormone", indications: "Muscle strength, bone density, GH release", variants: [{ strength: "10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "5 days on/2 off", labelIndication: "Muscle strength, bone density, GH release" },
  { slug: "tesamorelin", name: "Tesamorelin", genericName: "Tesamorelin", medicationClass: "Growth hormone releasing hormone", indications: "Visceral fat, IGF-1, muscle", variants: [{ strength: "5 mg" }], administrationRoute: "Subcutaneous", dosingNote: "5 days on/2 off", labelIndication: "Visceral fat, IGF-1, muscle" },
  { slug: "ipamorelin", name: "Ipamorelin", genericName: "Ipamorelin", medicationClass: "Growth hormone releasing peptide", indications: "Muscle growth, selective GH release", variants: [{ strength: "5 mg" }], administrationRoute: "Subcutaneous", dosingNote: "3x daily before meals", labelIndication: "Muscle growth, selective GH release" },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 no DAC", genericName: "CJC-1295", medicationClass: "Growth hormone releasing peptide", indications: "IGF-1, lean muscle mass", variants: [{ strength: "10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "5 days on/2 off", labelIndication: "IGF-1, lean muscle mass" },
  { slug: "igf-1-lr3", name: "IGF-1 LR3", genericName: "IGF-1 LR3", medicationClass: "Insulin Like Growth Factor", indications: "Muscle, fat burn, metabolism", variants: [{ strength: "1 mg" }], administrationRoute: "Subcutaneous", dosingNote: "5 days on/2 off", labelIndication: "Muscle, fat burn, metabolism" },
  { slug: "bpc-157", name: "BPC-157", genericName: "BPC-157", medicationClass: "Body Protection Compound-157", indications: "Wound healing, tendon repair, GI protection", variants: [{ strength: "10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Once daily", labelIndication: "Wound healing, tendon repair, GI protection" },
  { slug: "tb500", name: "TB500", genericName: "Thymosin Beta-4", medicationClass: "Regenerative Repair Peptide", indications: "Wound, joint, muscle repair", variants: [{ strength: "10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "2x/week", labelIndication: "Wound, joint, muscle repair" },
  { slug: "wolverine-blend", name: "Wolverine Blend", genericName: "BPC-157 + TB500", medicationClass: "Injury Recovery and performance", indications: "Joint/tendon repair, abdomen only", variants: [{ strength: "10/10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Daily 10 days", labelIndication: "Joint/tendon repair", blendComponents: "BPC-157 10mg + TB500 10mg" },
  { slug: "glow-42", name: "GLOW 42", genericName: "GHK-Cu + BPC-157 + TB500", medicationClass: "Skin and tissue healing", indications: "Muscle, tendon, ligament, skin, digestive", variants: [{ strength: "42 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Daily", labelIndication: "Muscle, tendon, skin, digestive", blendComponents: "GHK-Cu 27mg + BPC-157 5mg + TB500 10mg" },
  { slug: "klow-80", name: "KLOW 80", genericName: "GHK-Cu + KPV + BPC-157 + TB500", medicationClass: "Skin and tissue healing", indications: "Advanced tissue healing", variants: [{ strength: "80 mg" }], administrationRoute: "Subcutaneous", dosingNote: "1 month on/1 off", labelIndication: "Advanced tissue healing", blendComponents: "GHK-Cu 50mg + KPV 10mg + BPC-157 10mg + TB500 10mg" },
  { slug: "ghk-cu", name: "GHK-Cu", genericName: "GHK-Cu", medicationClass: "Copper Peptide", indications: "Skin tightening, hair, wound healing", variants: [{ strength: "100 mg" }], administrationRoute: "Subcutaneous", dosingNote: "28 days on/14 off", labelIndication: "Skin tightening, hair, wound healing" },
  { slug: "hcg", name: "HCG", genericName: "Human Chorionic Gonadotropin", medicationClass: "Reproductive Health", indications: "Men: testosterone/sperm; Women: ovulation", variants: [{ strength: "5000 IU" }], administrationRoute: "Subcutaneous", dosingNote: "2x/week", labelIndication: "Testosterone, sperm, ovulation" },
  { slug: "gonadorelin", name: "Gonadorelin", genericName: "Gonadorelin", medicationClass: "Gonadotropin releasing peptide", indications: "LH/FSH, secondary hypogonadism", variants: [{ strength: "10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "60 days on/30 off", labelIndication: "LH/FSH, secondary hypogonadism" },
  { slug: "kisspeptin", name: "Kisspeptin", genericName: "Kisspeptin", medicationClass: "Reproductive and hormonal regulation", indications: "Women: PCOS, ovulation; Men: testosterone", variants: [{ strength: "5 mg" }], administrationRoute: "Subcutaneous", dosingNote: "One month on/one off", labelIndication: "PCOS, ovulation, testosterone" },
  { slug: "epithalon", name: "Epithalon", genericName: "Epithalon", medicationClass: "Anti-aging and Longevity", indications: "Longevity, anti-aging", variants: [{ strength: "50 mg" }], administrationRoute: "Subcutaneous", dosingNote: "20 days, 3x/year", labelIndication: "Longevity, anti-aging" },
  { slug: "mot-c", name: "MOT-C", genericName: "MOT-C", medicationClass: "Mitochondrial derived peptide", indications: "Metabolic health, obesity, longevity", variants: [{ strength: "10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Every 5 days, 3x/year", labelIndication: "Metabolic health, longevity" },
  { slug: "dsip", name: "DSIP", genericName: "Delta Sleep-Inducing Peptide", medicationClass: "Sleep and detox peptide", indications: "Circadian reset, sleep, withdrawal support", variants: [{ strength: "5 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Before bed as needed", labelIndication: "Circadian reset, sleep, withdrawal" },
  { slug: "oxytocin", name: "Oxytocin", genericName: "Oxytocin", medicationClass: "Stress & anxiety mood peptide", indications: "Social bonding, emotional wellbeing, stress", variants: [{ strength: "10 mg" }], administrationRoute: "Subcutaneous", dosingNote: "Daily", labelIndication: "Social bonding, stress, anxiety" },
];

function buildLabelBottom(product) {
  const strengths = product.variants.map((v) => v.strength).join(" | ");
  const indication = product.labelIndication || product.indications;
  const parts = [strengths, product.medicationClass, indication, product.administrationRoute, product.dosingNote];
  if (product.blendComponents) {
    parts.push(product.blendComponents);
  }
  return parts.join(" • ");
}

function buildPrompt(product) {
  const bottomBand = buildLabelBottom(product);
  return `Update the vial label only. Replace the current label text with this new product information. Keep everything else identical: same bottle, same silver/chrome design, same photography, same angle, same lighting.

NEW LABEL:
Top band (silver/chrome or charcoal): Americare Wellness logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "${product.name}" in large bold black, "${product.genericName}" in grey below
Bottom band (silver/chrome or charcoal): "${bottomBand}"

Do not change the bottle shape, cap, lighting, background, or composition. Only update the label text and layout to match this product. Silver and chrome accents only — no colors.`;
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function uploadFile(filePath, name) {
  const buffer = readFileSync(filePath);
  const file = new File([buffer], name, { type: "image/png" });
  return fal.storage.upload(file);
}

async function generateForProduct(bottleUrl, product) {
  const prompt = buildPrompt(product);
  const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: {
      prompt,
      image_urls: [bottleUrl],
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "3:4",
      output_format: "png",
    },
  });
  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) {
    throw new Error(`No image in response for ${product.slug}`);
  }
  return images[0].url;
}

async function main() {
  const startIndex = parseInt(process.argv[2] || "0", 10);
  const count = parseInt(process.argv[3] || "5", 10);
  const products = PRODUCTS.slice(startIndex, startIndex + count);

  if (products.length === 0) {
    console.log("No products to generate. Usage: node script.mjs [startIndex] [count]");
    process.exit(0);
  }

  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY required.");
    process.exit(1);
  }

  fal.config({ credentials });

  console.log("📤 Uploading base bottle image...");
  const bottleUrl = await uploadFile(BASE_BOTTLE_PATH, "base-bottle.png");

  await mkdir(PRODUCTS_DIR, { recursive: true });

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const outputPath = `${PRODUCTS_DIR}/${product.slug}.png`;
    console.log(`\n[${i + 1}/${products.length}] 🎨 Generating ${product.name}...`);
    try {
      const imageUrl = await generateForProduct(bottleUrl, product);
      console.log(`   📥 Downloading...`);
      const buffer = await downloadImage(imageUrl);
      const stream = createWriteStream(outputPath);
      stream.write(Buffer.from(buffer));
      stream.end();
      await new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
      });
      console.log(`   ✅ Saved ${product.slug}.png`);
    } catch (err) {
      console.error(`   ❌ ${product.slug}: ${err.message}`);
    }
  }

  console.log("\n✅ Done.");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
