# Future Features

Deferred items from the Feb 28, 2026 meeting transcript between Kent McNeal and Chris Johnston. These are not blocking launch but should be implemented as the platform matures.

---

## 1. Stock Status / Out-of-Stock Functionality

**Context:** Kent mentioned needing the ability to "mark something as out of stock" when suppliers run out, ideally on a daily basis by whoever manages the back end.

**Implementation:**
- Add `inStock?: boolean` to the `Product` type in `src/types/index.ts` (default `true`)
- Show an "Out of Stock" badge on `ProductCard` and `ProductDetail` when `false`
- Disable the "Add to List" / interest button for out-of-stock products
- Eventually: build a simple admin interface or back-end toggle for Kent's team

---

## 2. Special Request / Custom Compounding Messaging

**Context:** Kent said "if somebody's surfing our site and they're looking for something that we don't have listed, we can always get something compounded custom made. So, that would be a special request."

**Implementation:**
- Add a FAQ entry: "What if I need a product that's not listed?" with messaging about custom compounding requests
- Add "Special/Custom Request" as a subject option in the contact form (`src/components/contact/ContactForm.tsx`)
- Optionally add a small banner or note on the products page mentioning custom compounding availability

---

## 3. Blood Test-to-Product Linking

**Context:** Kent discussed recommending specific blood monitoring panels alongside certain peptide products (e.g., a testosterone/sexual health panel for kisspeptin users). "We can have ongoing monitoring panels where we recommend if you're taking this peptide, you should get this blood panel run four times a year."

**Implementation:**
- Add `recommendedBloodPanels?: string[]` to the `Product` type, referencing blood test slugs
- Create a "Recommended Monitoring" section on `ProductDetail` that shows linked blood panels
- Kent will determine which panels link to which products and name/price the specialty panels
- Eventually: create a "Sexual Health Monitoring Panel" and other targeted panels as Kent defines them

---

## 4. Regenerate exports/products.tsv

**Context:** Chris mentioned creating a Google Sheet with the master product list for Kent to review and edit. The current `exports/products.tsv` is stale (105 rows from the pre-pruning catalog).

**Implementation:**
- Create a script (`scripts/export-products.mjs`) that reads product data and generates a fresh TSV
- Include: slug, name, category, SKU (if added), variant strengths, prices
- Run after any product data changes to keep the export in sync
- Share as Google Sheet for Kent's team to review prices and manage inventory
