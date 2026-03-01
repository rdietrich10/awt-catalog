"use client";

import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";

interface FilterSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="font-display text-label uppercase tracking-widest text-brand-silver mb-4">
          Category
        </h3>
        <ul className="space-y-1">
          <li>
            <Button
              type="button"
              onClick={() => onCategoryChange(null)}
              variant="ghost"
              size="md"
              isSelected={!selectedCategory}
              icon={!selectedCategory ? ChevronRight : undefined}
              iconPosition="right"
              className="w-full justify-start"
            >
              All
            </Button>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Button
                type="button"
                onClick={() => onCategoryChange(cat.slug)}
                variant="ghost"
                size="md"
                isSelected={selectedCategory === cat.slug}
                icon={selectedCategory === cat.slug ? ChevronRight : undefined}
                iconPosition="right"
                className="w-full justify-start"
              >
                {cat.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label
          htmlFor="sort-products"
          className="block font-display text-label uppercase tracking-widest text-brand-silver mb-4"
        >
          Sort
        </label>
        <select
          id="sort-products"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white focus:outline-none focus:border-brand-grey-500"
        >
          <option value="name">A–Z</option>
          <option value="category">Category</option>
        </select>
      </div>
    </aside>
  );
}
