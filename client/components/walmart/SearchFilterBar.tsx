import { useState } from "react";
import { Filter, SortingArrows, Grid, ChevronDown } from "@/components/icons";

interface SearchFilterBarProps {
  chips: readonly string[];
}

export function SearchFilterBar({ chips }: SearchFilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-border overflow-x-auto scrollbar-hide">
      <button
        className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center"
        aria-label="All filters"
      >
        <Filter className="w-4 h-4" />
      </button>
      <button
        className="flex-shrink-0 h-8 px-3 rounded-full border border-border flex items-center gap-1"
        aria-label="Sort"
      >
        <SortingArrows className="w-4 h-4" />
        <span className="text-[14px]">Sort</span>
      </button>
      <button
        className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center"
        aria-label="Grid view"
      >
        <Grid className="w-4 h-4" />
      </button>
      {chips.map((chip) => {
        const isActive = activeFilters.includes(chip);
        return (
          <button
            key={chip}
            onClick={() => toggleFilter(chip)}
            className={`flex-shrink-0 h-8 px-3 rounded-full flex items-center gap-1 ${
              isActive
                ? "bg-foreground text-white border border-foreground"
                : "border border-border"
            }`}
          >
            <span className="text-[14px]">{chip}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        );
      })}
    </div>
  );
}
