import { useState } from 'react';
import { FilterChip } from '@/components/ui/FilterChip';
import { Search } from '@/components/icons';
import styles from './PurchaseHistoryFilters.module.css';

export function PurchaseHistoryFilters() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Search */}
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search your orders"
            className={styles.searchInput}
            aria-label="Search your orders"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className={styles.filterRow}>
        <FilterChip
          isAllFilters
          aria-label="All filters"
          selected={false}
        >
          All filters
        </FilterChip>

        <FilterChip
          isMultiSelect
          selected={activeFilters.has('date')}
          onSelectedChange={() => toggleFilter('date')}
        >
          By date
        </FilterChip>

        <FilterChip
          selected={activeFilters.has('returns')}
          onSelectedChange={() => toggleFilter('returns')}
        >
          Returns
        </FilterChip>

        <FilterChip
          selected={activeFilters.has('instore')}
          onSelectedChange={() => toggleFilter('instore')}
        >
          In store
        </FilterChip>

        <FilterChip
          selected={activeFilters.has('online')}
          onSelectedChange={() => toggleFilter('online')}
        >
          Online
        </FilterChip>

        <FilterChip
          isMultiSelect
          selected={activeFilters.has('status')}
          onSelectedChange={() => toggleFilter('status')}
        >
          By status
        </FilterChip>
      </div>
    </div>
  );
}
