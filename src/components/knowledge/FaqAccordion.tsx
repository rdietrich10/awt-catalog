"use client";

import { useState } from "react";
import type { FAQ } from "@/types";

interface FaqAccordionProps {
  items: FAQ[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-brand-border overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between p-4 text-left font-display text-body-sm uppercase tracking-wider text-brand-white hover:bg-brand-grey-900 transition-colors"
          >
            {item.question}
            <span className="text-brand-silver-dark">{openId === item.id ? "−" : "+"}</span>
          </button>
          {openId === item.id && (
            <div className="px-4 py-4 text-body-sm text-brand-silver border-t border-brand-border">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
