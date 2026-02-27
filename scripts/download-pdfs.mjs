#!/usr/bin/env node
/**
 * Download PDFs from Google Drive.
 * Files must be shared with "Anyone with the link can view" for this to work.
 * If download fails (403), manually download from Drive and place in docs/downloads/
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "pdf-sources.json"), "utf8")
);

const downloadDir = path.join(rootDir, config.downloadDir);

async function downloadFile(id, filename) {
  const url = `https://drive.google.com/uc?export=download&id=${id}`;
  const res = await fetch(url, { redirect: "follow" });

  // Handle virus scan warning for large files
  if (res.url && res.url.includes("virus_scan_warning")) {
    const confirmMatch = res.url.match(/confirm=([^&]+)/);
    if (confirmMatch) {
      const confirmUrl = `https://drive.google.com/uc?export=download&id=${id}&confirm=${confirmMatch[1]}`;
      const retryRes = await fetch(confirmUrl, { redirect: "follow" });
      if (!retryRes.ok) throw new Error(`HTTP ${retryRes.status}`);
      return Buffer.from(await retryRes.arrayBuffer());
    }
  }

  // Check if we got HTML (auth required) instead of PDF
  const contentType = res.headers.get("content-type") || "";
  const buffer = Buffer.from(await res.arrayBuffer());
  if (contentType.includes("text/html") || buffer.slice(0, 5).toString() === "%PDF" === false && buffer.length < 1000) {
    const preview = buffer.toString("utf8", 0, 200);
    if (preview.includes("Sign in") || preview.includes("Google Drive") || preview.includes("Access denied")) {
      throw new Error("AUTH_REQUIRED");
    }
  }

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return buffer;
}

async function main() {
  fs.mkdirSync(downloadDir, { recursive: true });

  let successCount = 0;
  let authRequired = false;

  for (const source of config.sources) {
    const outPath = path.join(downloadDir, source.filename);
    process.stdout.write(`Downloading ${source.filename}... `);

    try {
      const buffer = await downloadFile(source.id, source.filename);
      if (buffer.length < 500 && buffer.toString("utf8").includes("Sign in")) {
        throw new Error("AUTH_REQUIRED");
      }
      fs.writeFileSync(outPath, buffer);
      console.log("OK");
      successCount++;
    } catch (err) {
      if (err.message === "AUTH_REQUIRED") {
        authRequired = true;
        console.log("SKIP (auth required)");
      } else {
        console.log(`FAIL: ${err.message}`);
      }
    }
  }

  console.log(`\nDownloaded ${successCount}/${config.sources.length} files.`);

  if (authRequired || successCount === 0) {
    console.log(`
Google Drive requires sign-in for these files. Manual download:

1. Open: https://drive.google.com/drive/folders/107Ko2gfe7uGjVJLdWbp4fl8JGHcQupl1 (Nutriments)
2. Open: https://drive.google.com/file/d/1S1qX3AnGRL1n3XwRPn96v5WbWBDcQ9j3 (AlphaBioMed)
3. Open: https://drive.google.com/file/d/1Xe8J1BUQpLFFDqxotEPiHPVyQsmZmXqM (LNAD)
4. Download each (or right-click Nutriments folder → Download)
5. Place PDFs in: ${path.relative(rootDir, downloadDir)}/
6. Rename to match: AlphaBioMed_mixing_instructions.pdf, Americare_LNAD_Protocol.pdf, etc.
   (See scripts/pdf-sources.json for exact filenames)
7. Run: npm run extract:pdfs
`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
