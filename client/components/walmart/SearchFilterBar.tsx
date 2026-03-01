import { useState } from "react";
import { Filter, SortingArrows, Grid, ChevronDown } from "@/components/icons";
import styles from "./SearchFilterBar.module.css";

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
    <div className={styles.bar}>
      <button className={styles.iconBtn} aria-label="All filters">
        <Filter className="w-4 h-4" />
      </button>
      <button className={styles.sortBtn} aria-label="Sort">
        <SortingArrows className="w-4 h-4" />
        <span>Sort</span>
      </button>
      <button className={styles.iconBtn} aria-label="Grid view">
        <Grid className="w-4 h-4" />
      </button>
      {chips.map((chip) => {
        const isActive = activeFilters.includes(chip);
        return (
          <button
            key={chip}
            onClick={() => toggleFilter(chip)}
            className={[styles.chip, isActive ? styles.chipActive : ''].filter(Boolean).join(' ')}
          >
            <span>{chip}</span>
            <ChevronDown className={styles.chipIcon} />
          </button>
        );
      })}
    </div>
  );
}
