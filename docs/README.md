# AW Therapeutics Documentation

Documentation for the AW Therapeutics peptide catalog and related products.

## Structure

| Folder | Description | Source |
|--------|-------------|--------|
| [americare-ifu](./americare-ifu/) | Peptide Instructions for Use (IFU) | Internal |
| [alphabiomed-mixing](./alphabiomed-mixing/) | AlphaBioMed peptide mixing/reconstitution instructions | [Google Drive](https://drive.google.com/file/d/1S1qX3AnGRL1n3XwRPn96v5WbWBDcQ9j3/view?usp=sharing) |
| [americare-lnad](./americare-lnad/) | AW Therapeutics Lathmized NAD+ (LNAD) protocol | [Google Drive](https://drive.google.com/file/d/1Xe8J1BUQpLFFDqxotEPiHPVyQsmZmXqM/view?usp=sharing) |
| [nutriments](./nutriments/) | Nutriments marketing & sales sheets (PlanetOne) | [Google Drive Folder](https://drive.google.com/drive/folders/107Ko2gfe7uGjVJLdWbp4fl8JGHcQupl1?usp=sharing) |

## Extracting PDF Content

The Google Drive PDFs require authentication. See [SCRAPING_GUIDE.md](./SCRAPING_GUIDE.md) for how to extract content into the markdown files.

## Adding to Catalog

Once documentation is complete, products can be added to the full catalog via:

- `src/data/products.ts` — Product definitions
- `src/data/categories.ts` — Category assignments
- `src/data/protocols.ts` — Protocol education content
