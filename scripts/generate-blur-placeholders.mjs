#!/usr/bin/env node
/**
 * Generates tiny base64 blur data URLs for all images under public/images/.
 * Output: src/data/blurPlaceholders.ts — a Map from image path to blurDataURL.
 *
 * Usage: node scripts/generate-blur-placeholders.mjs
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const OUTPUT_FILE = path.resolve("src/data/blurPlaceholders.ts");

const SUPPORTED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const BLUR_WIDTH = 8;

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (SUPPORTED_EXT.has(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

async function generateBlurDataURL(filePath) {
  const buffer = await sharp(filePath)
    .resize(BLUR_WIDTH)
    .blur()
    .webp({ quality: 20 })
    .toBuffer();

  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function main() {
  console.log("Scanning images in", IMAGES_DIR);
  const files = walkDir(IMAGES_DIR);
  console.log(`Found ${files.length} images`);

  const entries = [];
  let processed = 0;

  for (const file of files) {
    const relativePath = "/" + path.relative(PUBLIC_DIR, file).replace(/\\/g, "/");
    try {
      const blurDataURL = await generateBlurDataURL(file);
      entries.push([relativePath, blurDataURL]);
      processed++;
      if (processed % 10 === 0) {
        console.log(`  ${processed}/${files.length} processed...`);
      }
    } catch (err) {
      console.warn(`  Skipped ${relativePath}: ${err.message}`);
    }
  }

  const mapEntries = entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `  ["${key}", "${value}"]`)
    .join(",\n");

  const tsContent = `/**
 * Auto-generated blur placeholders — do not edit manually.
 * Regenerate with: npm run generate:blur-placeholders
 */
export const BLUR_DATA: ReadonlyMap<string, string> = new Map([
${mapEntries},
]);
`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, tsContent, "utf-8");
  console.log(`\nWrote ${entries.length} blur placeholders to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
