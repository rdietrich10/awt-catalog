# Guide: Extracting Content from Google Drive PDFs

## Automated Workflow

### Step 1: Download PDFs

```bash
npm run download:pdfs
```

This downloads all PDFs from Google Drive (files must be shared with "Anyone with the link can view").

### Step 2: Extract Content

```bash
npm run extract:pdfs
```

This extracts text from each PDF and writes/updates the corresponding markdown files in `docs/`.

**Note:** AlphaBioMed mixing instructions and Americare Wellness LNAD Protocol may fail with "Invalid PDF structure"—re-download those manually or copy-paste content if needed.

**Manual download (if automated download fails):**

1. **Nutriments folder:** [Open folder](https://drive.google.com/drive/folders/107Ko2gfe7uGjVJLdWbp4fl8JGHcQupl1) → Right-click folder → Download (gets a zip)
2. **AlphaBioMed:** [Download](https://drive.google.com/file/d/1S1qX3AnGRL1n3XwRPn96v5WbWBDcQ9j3/view?usp=sharing)
3. **LNAD Protocol:** [Download](https://drive.google.com/file/d/1Xe8J1BUQpLFFDqxotEPiHPVyQsmZmXqM/view?usp=sharing)

Place all PDFs in `docs/downloads/` and rename to match the expected filenames (see `scripts/pdf-sources.json`).

### Expected Filenames

| Source | Filename in docs/downloads/ |
|--------|-----------------------------|
| AlphaBioMed mixing | `AlphaBioMed_mixing_instructions.pdf` |
| Americare LNAD | `Americare_LNAD_Protocol.pdf` |
| Price List | `NUTRIMENTS_PlanetOne_2025_Price_List.pdf` |
| 15 Day Cleanse Sales | `15_Day_Total_Body_Cleanse_Sales.pdf` |
| 15 Day Cleanse FAQ | `15_Day_Total_Body_Cleanse_FAQ.pdf` |
| A Guard | `A_Guard.pdf` |
| ... | See `scripts/pdf-sources.json` for full list |

### After Extracting from Zip

If you downloaded the Nutriments folder as a zip:

1. Unzip it
2. Copy PDFs into `docs/downloads/`
3. Rename to match (e.g., `A Guard Sales Sheet.pdf` → `A_Guard.pdf`)

You can add a rename mapping in the script if the zip filenames differ.
