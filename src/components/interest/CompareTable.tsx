"use client";

import Link from "next/link";
import type { Product } from "@/types";

interface CompareTableProps {
  products: Product[];
}

const COMPARE_ROWS = [
  { key: "Category", get: (p: Product) => p.category },
  { key: "Medication Class", get: (p: Product) => p.medicationClass },
  { key: "Indications", get: (p: Product) => p.indications },
  { key: "Description", get: (p: Product) => p.shortDescription },
  { key: "Strengths", get: (p: Product) => p.variants.map((v) => v.strength).join(", ") },
  { key: "Schedule", get: (p: Product) => p.variants[0]?.schedule ?? "—" },
  {
    key: "Reconstitution",
    get: (p: Product) =>
      p.variants[0]?.reconstitutionVolume
        ? `${p.variants[0].reconstitutionVolume} Bacteriostatic Water`
        : "—",
  },
  { key: "Route", get: (p: Product) => p.administrationRoute },
  { key: "Injection Note", get: (p: Product) => p.injectionNote ?? "—" },
  { key: "Benefits", get: (p: Product) => p.keyBenefits.join("; ") },
  { key: "Notes", get: (p: Product) => p.clinicalNotes },
  { key: "Blend", get: (p: Product) => (p.blendComponents ?? []).join(", ") || "—" },
  {
    key: "Included Tests",
    get: (p: Product) => (p.includedTests ?? []).join(", ") || "—",
  },
];

const STICKY_LABEL_CLASS =
  "sticky left-0 z-10 min-w-[8.5rem] w-[8.5rem] border border-brand-border p-3 sm:p-4 text-left bg-brand-black font-display text-label uppercase tracking-widest text-brand-silver";

const PRODUCT_COLUMN_CLASS =
  "min-w-[13rem] border border-brand-border p-3 sm:p-4 text-body-sm text-brand-silver";

const PRODUCT_HEADER_CLASS =
  "min-w-[13rem] border border-brand-border p-3 sm:p-4 text-left";

export function CompareTable({ products }: CompareTableProps) {
  return (
    <div className="overflow-x-auto scroll-touch">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={STICKY_LABEL_CLASS}>—</th>
            {products.map((p) => (
              <th key={p.slug} className={PRODUCT_HEADER_CLASS}>
                <Link
                  href={`/products/${p.slug}`}
                  className="font-display text-sm uppercase text-brand-white hover:opacity-80"
                >
                  {p.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row) => (
            <tr key={row.key}>
              <td className={STICKY_LABEL_CLASS}>{row.key}</td>
              {products.map((p) => (
                <td key={p.slug} className={PRODUCT_COLUMN_CLASS}>
                  {row.get(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
