#!/usr/bin/env node

/**
 * Generate unique product images for EVERY product.
 * Each product gets its own image with explicit label prompt.
 * Uses fal.ai Nano Banana Pro edit - base image + label update.
 *
 * Base images by product type:
 * - vial (injectables): sema-glp-1.png
 * - supplement-bottle (capsules): supplement-bottle.png
 * - supplement-liquid: supplement-liquid.png
 * - supplies-bacteriostatic: supplies-bacteriostatic.png (bottle only)
 * - supplies-syringes: insulin-syringes.png (syringes only - already fixed)
 * - kit: kit.png
 * - exosomes: exosomes.png
 *
 * Usage: node --env-file=.env scripts/generate-all-product-images-v2.mjs [startIndex] [count]
 */

import { fal } from "@fal-ai/client";
import { createWriteStream, readFileSync, existsSync } from "fs";
import { mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = `${__dirname}/..`;
const PRODUCTS_DIR = `${ROOT}/public/images/products`;

/** Sleep between API calls to avoid rate limiting (ms) */
const SLEEP_MS = 12000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BASES = {
  vial: `${ROOT}/public/images/products/sema-glp-1.png`,
  supplementBottle: `${ROOT}/public/images/products/supplement-bottle.png`,
  supplementLiquid: `${ROOT}/public/images/products/supplement-liquid.png`,
  suppliesBacteriostatic: `${ROOT}/public/images/products/supplies-bacteriostatic.png`,
  suppliesSyringes: `${ROOT}/public/images/products/insulin-syringes.png`,
  kit: `${ROOT}/public/images/products/kit.png`,
  exosomes: `${ROOT}/public/images/products/exosomes.png`,
};

/** All products with slug, name, genericName, base type, and label info */
export const PRODUCTS = [
  // Peptides - vial base
  { slug: "glp-1-semaglutide", name: "GLP-1 Semaglutide", genericName: "Semaglutide", base: "vial", strengths: "5 mg | 10 mg | 20 mg", indication: "Weight Management", route: "Subcutaneous", dosing: "Once weekly" },
  { slug: "glp-1-tirzepatide", name: "GLP-1 Tirzepatide", genericName: "Tirzepatide", base: "vial", strengths: "10 mg | 30 mg | 40 mg | 60 mg | 75 mg | 120 mg", indication: "Weight Management", route: "Subcutaneous", dosing: "Once weekly" },
  { slug: "glp-1-retatrutide", name: "GLP-1 Retatrutide", genericName: "Retatrutide", base: "vial", strengths: "12 mg | 24 mg | 60 mg", indication: "Weight Management", route: "Subcutaneous", dosing: "Once weekly" },
  { slug: "survodutide", name: "Survodutide", genericName: "Survodutide", base: "vial", strengths: "6 mg", indication: "Weight Management", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "tesofensine", name: "Tesofensine", genericName: "Tesofensine", base: "supplementBottle", strengths: "500 mcg x 30 | 500 mcg x 100", indication: "Appetite suppression, weight management", route: "Oral", dosing: "Consult provider" },
  { slug: "aod-9604", name: "AOD-9604", genericName: "AOD 9604", base: "vial", strengths: "5 mg", indication: "Weight Management", route: "Subcutaneous", dosing: "5 days on/2 off" },
  { slug: "sermorelin", name: "Sermorelin", genericName: "Sermorelin", base: "vial", strengths: "10 mg", indication: "Muscle strength, bone density, GH release", route: "Subcutaneous", dosing: "5 days on/2 off" },
  { slug: "tesamorelin", name: "Tesamorelin", genericName: "Tesamorelin", base: "vial", strengths: "10 mg", indication: "Visceral fat, IGF-1, muscle", route: "Subcutaneous", dosing: "5 days on/2 off" },
  { slug: "ipamorelin", name: "Ipamorelin", genericName: "Ipamorelin", base: "vial", strengths: "10 mg", indication: "Muscle growth, selective GH release", route: "Subcutaneous", dosing: "3x daily before meals" },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 No DAC", genericName: "CJC-1295", base: "vial", strengths: "10 mg", indication: "IGF-1, lean muscle mass", route: "Subcutaneous", dosing: "5 days on/2 off" },
  { slug: "ghrp-2", name: "GHRP-2", genericName: "GHRP-2", base: "vial", strengths: "5 mg | 10 mg", indication: "GH release, muscle growth", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "ghrp-6", name: "GHRP-6", genericName: "GHRP-6", base: "vial", strengths: "5 mg", indication: "GH release, muscle growth", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "hexarelin", name: "Hexarelin", genericName: "Hexarelin", base: "vial", strengths: "5 mg", indication: "GH release", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "igf-1-lr3", name: "IGF-1 LR3", genericName: "IGF-1 LR3", base: "vial", strengths: "1 mg", indication: "Muscle, fat burn, metabolism", route: "Subcutaneous", dosing: "5 days on/2 off" },
  { slug: "mgf", name: "MGF", genericName: "Mechano Growth Factor", base: "vial", strengths: "5 mg", indication: "Muscle growth, repair", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "peg-mgf", name: "PEG MGF", genericName: "PEGylated MGF", base: "vial", strengths: "5 mg", indication: "Muscle growth", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "follistatin-344", name: "Follistatin 344", genericName: "Follistatin 344", base: "vial", strengths: "1 mg", indication: "Muscle growth", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "blend-cjc-ipamorelin", name: "2X Blend CJC-1295 / Ipamorelin", genericName: "CJC-1295 + Ipamorelin", base: "vial", strengths: "10 mg", indication: "Muscle growth, GH support", route: "Subcutaneous", dosing: "Consult provider", blend: "CJC-1295 5mg + Ipamorelin 5mg" },
  { slug: "blend-tesamorelin-ipamorelin-10", name: "2X Blend Tesamorelin / Ipamorelin 10mg", genericName: "Tesamorelin + Ipamorelin", base: "vial", strengths: "10 mg", indication: "Muscle growth, visceral fat", route: "Subcutaneous", dosing: "Consult provider", blend: "Tesamorelin 5mg + Ipamorelin 5mg" },
  { slug: "blend-tesamorelin-ipamorelin-15", name: "2X Blend Tesamorelin / Ipamorelin 15mg", genericName: "Tesamorelin + Ipamorelin", base: "vial", strengths: "15 mg", indication: "Muscle growth, visceral fat", route: "Subcutaneous", dosing: "Consult provider", blend: "Tesamorelin 10mg + Ipamorelin 5mg" },
  { slug: "blend-3x-tesamorelin-ipamorelin-mgf", name: "3X Blend Tesamorelin / Ipamorelin / MGF", genericName: "Tesamorelin + Ipamorelin + MGF", base: "vial", strengths: "8 mg", indication: "Muscle growth", route: "Subcutaneous", dosing: "Consult provider", blend: "Tesamorelin 5mg + Ipamorelin 2.5mg + MGF 500mcg" },
  { slug: "blend-4x-tesamorelin-ipamorelin-ghrp2-mgf", name: "4X Blend Tesamorelin / Ipamorelin / GHRP-2 / MGF", genericName: "Tesamorelin + Ipamorelin + GHRP-2 + MGF", base: "vial", strengths: "13 mg", indication: "Muscle growth", route: "Subcutaneous", dosing: "Consult provider", blend: "Tesamorelin 5mg + Ipamorelin 2.5mg + GHRP-2 5mg + MGF 500mcg" },
  // Healing
  { slug: "bpc-157", name: "BPC-157", genericName: "BPC-157", base: "vial", strengths: "5 mg | 10 mg | 20 mg", indication: "Wound healing, tendon repair, GI protection", route: "Subcutaneous", dosing: "Once daily" },
  { slug: "tb500", name: "TB-500", genericName: "Thymosin Beta-4", base: "vial", strengths: "5 mg | 10 mg", indication: "Wound, joint, muscle repair", route: "Subcutaneous", dosing: "2x/week" },
  { slug: "wolverine-stack", name: "BPC-157 / TB-500 Wolverine Stack", genericName: "BPC-157 + TB-500", base: "vial", strengths: "10/10 mg", indication: "Joint/tendon repair", route: "Subcutaneous", dosing: "20 units daily", blend: "BPC-157 10mg + TB-500 10mg" },
  { slug: "glow-42", name: "GLOW 42", genericName: "GHK-Cu + BPC-157 + TB-500", base: "vial", strengths: "42 mg", indication: "Muscle, tendon, skin, digestive", route: "Subcutaneous", dosing: "Daily", blend: "GHK-Cu 27mg + BPC-157 5mg + TB-500 10mg" },
  { slug: "glow-50", name: "GLOW 50", genericName: "GHK-Cu + BPC-157 + TB-500", base: "vial", strengths: "50 mg", indication: "Tissue healing", route: "Subcutaneous", dosing: "Consult provider", blend: "GHK-Cu 30mg + BPC-157 10mg + TB-500 10mg" },
  { slug: "glow-70", name: "GLOW 70", genericName: "GHK-Cu + BPC-157 + TB-500", base: "vial", strengths: "70 mg", indication: "Tissue healing", route: "Subcutaneous", dosing: "Consult provider", blend: "GHK-Cu 30mg + BPC-157 10mg + TB-500 10mg" },
  { slug: "klow-80", name: "KLOW 80", genericName: "GHK-Cu + KPV + BPC-157 + TB-500", base: "vial", strengths: "80 mg", indication: "Advanced tissue healing", route: "Subcutaneous", dosing: "1 month on/1 off", blend: "GHK-Cu 50mg + KPV 10mg + BPC-157 10mg + TB-500 10mg" },
  { slug: "ghk-cu", name: "GHK-Cu", genericName: "GHK-Cu", base: "vial", strengths: "50 mg | 75 mg | 100 mg", indication: "Skin tightening, hair, wound healing", route: "Subcutaneous", dosing: "28 days on/14 off" },
  { slug: "kpv", name: "KPV", genericName: "Lysine-Proline-Valine", base: "vial", strengths: "10 mg", indication: "Anti-inflammatory, skin", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "cartalax", name: "Cartalax", genericName: "Cartalax", base: "supplementBottle", strengths: "25 mg", indication: "Cartilage, joint support", route: "Oral", dosing: "Consult provider" },
  { slug: "cardiogen", name: "Cardiogen", genericName: "Cardiogen", base: "vial", strengths: "25 mg", indication: "Cardiovascular support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "ll-37", name: "LL-37", genericName: "LL-37", base: "vial", strengths: "5 mg", indication: "Immune support, wound healing", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "ll-37-complex", name: "LL-37 Complex", genericName: "LL-37 Complex", base: "vial", strengths: "5 mg", indication: "Immune support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "curcumin", name: "Curcumin", genericName: "Curcumin", base: "supplementBottle", strengths: "600 mg", indication: "Anti-inflammatory, joint support", route: "Oral", dosing: "Consult provider" },
  { slug: "pnc-28", name: "PNC-28", genericName: "PNC-28", base: "vial", strengths: "20 mg", indication: "Cellular support", route: "Subcutaneous", dosing: "Consult provider" },
  // Reproductive
  { slug: "hcg", name: "HCG", genericName: "Human Chorionic Gonadotropin", base: "vial", strengths: "5000 IU | 10000 IU", indication: "Fertility, testosterone", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "gonadorelin", name: "Gonadorelin", genericName: "Gonadorelin", base: "vial", strengths: "5 mg | 10 mg", indication: "Fertility, hormone support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "kisspeptin", name: "Kisspeptin", genericName: "Kisspeptin", base: "vial", strengths: "5 mg | 10 mg", indication: "Reproductive support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "pt-141", name: "PT-141", genericName: "Bremelanotide", base: "vial", strengths: "5 mg | 10 mg", indication: "Libido, sexual function", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "rx-enclomiphene", name: "RX-Enclomiphene", genericName: "Enclomiphene Citrate", base: "supplementBottle", strengths: "50 mg (8 weeks)", indication: "Testosterone optimization", route: "Oral", dosing: "8 weeks" },
  // Longevity
  { slug: "epitalon", name: "Epitalon", genericName: "Epitalon", base: "vial", strengths: "10 mg | 50 mg", indication: "Longevity, sleep, telomeres", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "mots-c", name: "MOTS-c", genericName: "Mitochondrial-Derived Peptide", base: "vial", strengths: "10 mg", indication: "Mitochondrial, metabolic support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "dsip", name: "DSIP", genericName: "Delta Sleep-Inducing Peptide", base: "vial", strengths: "5 mg", indication: "Sleep, circadian rhythm", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "fox04-dri", name: "FOX04-DRI", genericName: "FOX04-DRI", base: "vial", strengths: "15 mg", indication: "Senolytic, longevity", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "ss-31", name: "SS-31", genericName: "Elamipretide", base: "vial", strengths: "15 mg", indication: "Mitochondrial support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "nad-plus-biofermented", name: "NAD+ Biofermented", genericName: "NAD+", base: "vial", strengths: "1000 mg", indication: "Cellular energy, longevity", route: "IV/Consult provider", dosing: "Consult provider" },
  { slug: "nad-plus-synthetic", name: "NAD+ Synthetic", genericName: "NAD+", base: "vial", strengths: "1000 mg", indication: "Cellular energy, longevity", route: "IV/Consult provider", dosing: "Consult provider" },
  { slug: "ta-1", name: "TA-1 Thymosin Alpha-1", genericName: "Thymosin Alpha-1", base: "vial", strengths: "10 mg", indication: "Immune support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "thymagen", name: "Thymagen", genericName: "Thymagen", base: "vial", strengths: "20 mg", indication: "Immune support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "thymalin", name: "Thymalin", genericName: "Thymalin", base: "vial", strengths: "N/A", indication: "Immune support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "lathmized-nad-maintenance", name: "Lathmized NAD+ Maintenance", genericName: "Lathmized NAD+", base: "supplementBottle", strengths: "3,000 mg - 30 days", indication: "Cellular energy, longevity", route: "Oral", dosing: "30 days" },
  { slug: "lathmized-nad-medical", name: "Lathmized NAD+ (Medical Strength)", genericName: "Lathmized NAD+", base: "supplementBottle", strengths: "15,000 mg", indication: "Cellular energy, longevity", route: "Oral", dosing: "Consult provider" },
  { slug: "exosomes-luvigix", name: "Exosomes (400 Billion) - Luvigix", genericName: "Exosomes", base: "exosomes", strengths: "400 Billion", indication: "Cellular signaling, regenerative support", route: "Consult provider", dosing: "Consult provider" },
  { slug: "bdnf", name: "BDNF", genericName: "Brain-Derived Neurotrophic Factor", base: "vial", strengths: "10 mg", indication: "Neuroplasticity, cognitive", route: "Subcutaneous", dosing: "Consult provider" },
  // Mood & Sleep
  { slug: "oxytocin", name: "Oxytocin", genericName: "Oxytocin", base: "vial", strengths: "10 mg", indication: "Social bonding, stress reduction", route: "Subcutaneous", dosing: "10 units daily" },
  { slug: "selank", name: "Selank", genericName: "Selank", base: "vial", strengths: "5 mg | 10 mg", indication: "Anxiety reduction, cognitive support", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "semax", name: "Semax", genericName: "Semax", base: "vial", strengths: "30 mg", indication: "Cognitive enhancement, neuroprotection", route: "Subcutaneous", dosing: "Consult provider" },
  { slug: "melanotan-2", name: "Melanotan II (MT-II)", genericName: "Melanotan II", base: "vial", strengths: "10 mg", indication: "Tanning support, libido", route: "Subcutaneous", dosing: "Consult provider" },
  // Supplies
  { slug: "bacteriostatic-water", name: "Bacteriostatic Water (BW)", genericName: "Bacteriostatic Water", base: "suppliesBacteriostatic", strengths: "30 mL", indication: "Reconstitution diluent", route: "N/A", dosing: "N/A" },
  { slug: "insulin-syringes", name: "Insulin Syringes 29G 1cc 1/2\"", genericName: "Insulin Syringes", base: "suppliesSyringes", strengths: "10/pack", indication: "Administration", route: "N/A", dosing: "N/A", skip: true },
  // Nutriments - supplement bottle or liquid
  { slug: "li-guard", name: "LI-GUARD (Liquid Iron)", genericName: "Liquid Iron", base: "supplementLiquid", strengths: "8 oz", indication: "Iron support", route: "Oral", dosing: "Consult provider" },
  { slug: "ai-guard", name: "AI-GUARD (Anti-inflammatory Peptide A4)", genericName: "Anti-inflammatory A4", base: "supplementBottle", strengths: "60 caps", indication: "Anti-inflammatory", route: "Oral", dosing: "Consult provider" },
  { slug: "g-guard", name: "G-GUARD - Gut Health", genericName: "Gut Health", base: "supplementBottle", strengths: "60 caps", indication: "Gut health", route: "Oral", dosing: "Consult provider" },
  { slug: "m-guard", name: "M-GUARD - Mental Clarity", genericName: "Mental Clarity", base: "supplementBottle", strengths: "60 caps", indication: "Mental clarity", route: "Oral", dosing: "Consult provider" },
  { slug: "cl-guard", name: "CL-GUARD - Cholesterol Relief", genericName: "Cholesterol Relief", base: "supplementBottle", strengths: "120 caps", indication: "Cholesterol support", route: "Oral", dosing: "Consult provider" },
  { slug: "s-guard", name: "S-GUARD - Sleep Inducer", genericName: "Sleep Inducer", base: "supplementBottle", strengths: "120 caps", indication: "Sleep support", route: "Oral", dosing: "Consult provider" },
  { slug: "d-guard", name: "D-GUARD - Blood Sugar Balancer", genericName: "Blood Sugar Balancer", base: "supplementBottle", strengths: "60 caps", indication: "Blood sugar support", route: "Oral", dosing: "Consult provider" },
  { slug: "cf-circulation-flow", name: "CF - Circulation Flow", genericName: "Circulation Flow", base: "supplementLiquid", strengths: "4 oz", indication: "Circulation support", route: "Oral", dosing: "Consult provider" },
  { slug: "o-guard", name: "O-GUARD - Omega 3, 6, 9", genericName: "Omega 3, 6, 9", base: "supplementBottle", strengths: "60 caps", indication: "Essential fatty acids", route: "Oral", dosing: "Consult provider" },
  { slug: "r-guard", name: "R-GUARD - Arthritis Relief", genericName: "Arthritis Relief", base: "supplementBottle", strengths: "60 caps", indication: "Arthritis, joint support", route: "Oral", dosing: "Consult provider" },
  { slug: "n-guard", name: "N-GUARD - Advanced Digestive Enzyme Complex", genericName: "Digestive Enzyme Complex", base: "supplementBottle", strengths: "120 caps", indication: "Digestive support", route: "Oral", dosing: "Consult provider" },
  { slug: "ag-guard", name: "AG-GUARD - Adrenal Repair", genericName: "Adrenal Repair", base: "supplementBottle", strengths: "120 caps", indication: "Adrenal support", route: "Oral", dosing: "Consult provider" },
  { slug: "dp-guard", name: "DP-GUARD - DHEA w/ Pregnenolone", genericName: "DHEA + Pregnenolone", base: "supplementBottle", strengths: "60 caps", indication: "Hormonal support", route: "Oral", dosing: "Consult provider" },
  { slug: "x-guard", name: "X-GUARD - Anxiety and Depression", genericName: "Anxiety and Depression", base: "supplementBottle", strengths: "60 caps", indication: "Mood support", route: "Oral", dosing: "Consult provider" },
  { slug: "y-guard", name: "Y-GUARD - Youthfulness", genericName: "Youthfulness", base: "supplementBottle", strengths: "90 caps", indication: "Anti-aging", route: "Oral", dosing: "Consult provider" },
  { slug: "c-guard", name: "C-GUARD - Candida Relief", genericName: "Candida Relief", base: "supplementBottle", strengths: "60 caps", indication: "Candida support", route: "Oral", dosing: "Consult provider" },
  { slug: "t-guard", name: "T-GUARD - Total Amino Complex", genericName: "Total Amino Complex", base: "supplementBottle", strengths: "180 caps", indication: "Amino acid support", route: "Oral", dosing: "Consult provider" },
  { slug: "z-guard", name: "Z-GUARD - Zombie Cell Cleanser", genericName: "Zombie Cell Cleanser", base: "supplementBottle", strengths: "90 caps", indication: "Senolytic support", route: "Oral", dosing: "Consult provider" },
  { slug: "bp-guard", name: "BP-GUARD - Blood Pressure Regulator", genericName: "Blood Pressure Regulator", base: "supplementBottle", strengths: "225 caps", indication: "Blood pressure support", route: "Oral", dosing: "Consult provider" },
  { slug: "v-guard", name: "V-GUARD - Immune Support System", genericName: "Immune Support", base: "supplementBottle", strengths: "60 caps", indication: "Immune support", route: "Oral", dosing: "Consult provider" },
  { slug: "b-guard", name: "B-GUARD - Bowel Cleanse Formula", genericName: "Bowel Cleanse", base: "supplementBottle", strengths: "60 caps", indication: "Bowel cleanse", route: "Oral", dosing: "Consult provider" },
  { slug: "l-guard", name: "L-GUARD - Liver Cleanse Formula", genericName: "Liver Cleanse", base: "supplementBottle", strengths: "60 caps", indication: "Liver support", route: "Oral", dosing: "Consult provider" },
  { slug: "u-guard", name: "U-GUARD - Urinary Tract Cleanse Formula", genericName: "Urinary Tract Cleanse", base: "supplementBottle", strengths: "60 caps", indication: "Urinary tract support", route: "Oral", dosing: "Consult provider" },
  { slug: "e-guard", name: "E-GUARD - Male Stimulator", genericName: "Male Stimulator", base: "supplementBottle", strengths: "60 caps", indication: "Male vitality", route: "Oral", dosing: "Consult provider" },
  { slug: "j-guard", name: "J-GUARD - Joint Formula", genericName: "Joint Formula", base: "supplementBottle", strengths: "90 caps", indication: "Joint maintenance, soft tissue repair", route: "Oral", dosing: "Consult provider" },
  { slug: "p-guard", name: "P-GUARD - Prostate Protector", genericName: "Prostate Protector", base: "supplementBottle", strengths: "90 caps", indication: "Prostate support", route: "Oral", dosing: "Consult provider" },
  { slug: "mn-guard", name: "MN Guard", genericName: "Mineral Complex", base: "supplementBottle", strengths: "240 caps", indication: "Mineral support", route: "Oral", dosing: "Consult provider" },
  { slug: "dk-guard", name: "DK-GUARD (Vitamins D3 & K2)", genericName: "Vitamins D3 & K2", base: "supplementBottle", strengths: "30 caps", indication: "Vitamin D3, K2", route: "Oral", dosing: "Consult provider" },
  { slug: "15-day-cleanse-kit", name: "15 Day Cleanse Kit", genericName: "15 Day Cleanse", base: "kit", strengths: "Kit", indication: "Body cleanse", route: "Oral", dosing: "15 days" },
];

function buildLabelBottom(p) {
  const parts = [p.strengths, p.indication, p.route, p.dosing];
  if (p.blend) parts.push(p.blend);
  return parts.join(" • ");
}

function buildPrompt(product) {
  const bottomBand = buildLabelBottom(product);
  return `Update the label only. Replace the current label text with this new product information. Keep everything else identical: same container, same silver/chrome design, same photography, same angle, same lighting. ONLY the product being sold in the shot - no other products.

NEW LABEL:
Top band (silver/chrome or charcoal): AW Therapeutics logo in white
Middle white section: "MEDICAL GRADE" in small grey text, then "${product.name}" in large bold black, "${product.genericName}" in grey below
Bottom band (silver/chrome or charcoal): "${bottomBand}"

Do not change the container shape, cap, lighting, background, or composition. Only update the label text. Silver and chrome accents only — no colors.`;
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download: ${response.status}`);
  return response.arrayBuffer();
}

async function uploadFile(filePath, name) {
  const buffer = readFileSync(filePath);
  return fal.storage.upload(new File([buffer], name, { type: "image/png" }));
}

async function generateForProduct(baseUrl, product) {
  const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: {
      prompt: buildPrompt(product),
      image_urls: [baseUrl],
      num_images: 1,
      resolution: "2K",
      aspect_ratio: "3:4",
      output_format: "png",
    },
  });
  const images = result?.data?.images;
  if (!images?.length || !images[0]?.url) throw new Error(`No image for ${product.slug}`);
  return images[0].url;
}

async function main() {
  const startIndex = parseInt(process.argv[2] || "0", 10);
  const count = parseInt(process.argv[3] || "10", 10);
  const products = PRODUCTS.slice(startIndex, startIndex + count);

  if (products.length === 0) {
    console.log("Usage: node --env-file=.env scripts/generate-all-product-images-v2.mjs [startIndex] [count]");
    process.exit(0);
  }

  const credentials = process.env.FAL_API_KEY || process.env.FAL_KEY;
  if (!credentials) {
    console.error("❌ FAL_API_KEY or FAL_KEY required.");
    process.exit(1);
  }

  fal.config({ credentials });
  await mkdir(PRODUCTS_DIR, { recursive: true });

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const outputPath = `${PRODUCTS_DIR}/${product.slug}.png`;

    if (product.skip) {
      console.log(`[${i + 1}/${products.length}] ⏭️  Skipping ${product.slug} (already have image)`);
      continue;
    }

    if (existsSync(outputPath)) {
      console.log(`[${i + 1}/${products.length}] ⏭️  ${product.slug}.png exists, skipping`);
      continue;
    }

    const basePath = BASES[product.base];
    if (!basePath || !existsSync(basePath)) {
      console.error(`   ❌ Base not found: ${product.base}`);
      continue;
    }

    console.log(`\n[${i + 1}/${products.length}] 🎨 ${product.name}...`);
    try {
      const baseUrl = await uploadFile(basePath, `base-${product.base}.png`);
      const imageUrl = await generateForProduct(baseUrl, product);
      const buffer = await downloadImage(imageUrl);
      const stream = createWriteStream(outputPath);
      stream.write(Buffer.from(buffer));
      stream.end();
      await new Promise((resolve, reject) => { stream.on("finish", resolve); stream.on("error", reject); });
      console.log(`   ✅ ${product.slug}.png`);
      if (i < products.length - 1) {
        console.log(`   ⏳ Sleeping ${SLEEP_MS / 1000}s...`);
        await sleep(SLEEP_MS);
      }
    } catch (err) {
      console.error(`   ❌ ${err.message}`);
      console.log(`   ⏳ Sleeping ${SLEEP_MS / 1000}s before retry...`);
      await sleep(SLEEP_MS);
    }
  }

  console.log("\n✅ Done. Run with different [startIndex] [count] to generate more.");
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main().catch((err) => { console.error(err); process.exit(1); });
}
