"use client";

import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilters({ categories, selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-12 mb-16">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={cn(
            "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-border/50",
            selectedCategory === cat
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
              : "bg-surface-1 text-muted-foreground hover:text-foreground hover:border-primary/50",
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
