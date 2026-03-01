"use client";

import { useState, useId } from "react";
import type { FAQ } from "@/types";

interface FaqAccordionProps {
  items: FAQ[];
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQ; isOpen: boolean; onToggle: () => void }) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className="border border-brand-border overflow-hidden">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left font-display text-body-sm uppercase tracking-wider text-brand-white hover:bg-brand-grey-900 transition-colors"
      >
        {item.question}
        <span className="text-brand-silver-dark" aria-hidden="true">
          {isOpen ? "\u2212" : "+"}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        {isOpen && (
          <div className="px-4 py-4 text-body-sm text-brand-silver border-t border-brand-border">
            {item.answer}
          </div>
        )}
      </div>
    </div>
  );
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
