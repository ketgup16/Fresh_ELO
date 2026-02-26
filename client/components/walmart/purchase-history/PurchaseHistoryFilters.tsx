import { useState } from 'react';
import { FilterChip } from '@/components/ui/FilterChip';
import { Search } from '@/components/icons';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/Popover';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import styles from './PurchaseHistoryFilters.module.css';

export interface FilterState {
  search: string;
  /** '' | 'last3m' | 'last6m' | '2026' | '2025' | '2024' | '2023' */
  date: string;
  /** 'in-progress' | 'completed' */
  status: string[];
  returnsOnly: boolean;
  inStoreOnly: boolean;
  onlineOnly: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  search: '',
  date: '',
  status: [],
  returnsOnly: false,
  inStoreOnly: false,
  onlineOnly: false,
};

interface PurchaseHistoryFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const DATE_OPTIONS = [
  { value: 'last3m', label: 'Last 3 months' },
  { value: 'last6m', label: 'Last 6 months' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
];

export function PurchaseHistoryFilters({ filters, onFiltersChange }: PurchaseHistoryFiltersProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  // Pending state — applied only when "View results" is clicked
  const [pendingDate, setPendingDate] = useState('');
  const [pendingStatus, setPendingStatus] = useState<string[]>([]);

  const update = (partial: Partial<FilterState>) =>
    onFiltersChange({ ...filters, ...partial });

  /* ── By Date handlers ── */
  const handleDateOpen = (open: boolean) => {
    if (open) setPendingDate(filters.date);
    setDateOpen(open);
  };
  const applyDate = () => { update({ date: pendingDate }); setDateOpen(false); };
  const clearDate = () => { setPendingDate(''); update({ date: '' }); setDateOpen(false); };

  /* ── By Status handlers ── */
  const handleStatusOpen = (open: boolean) => {
    if (open) setPendingStatus([...filters.status]);
    setStatusOpen(open);
  };
  const togglePendingStatus = (val: string, checked: boolean) =>
    setPendingStatus(prev => checked ? [...prev, val] : prev.filter(v => v !== val));
  const applyStatus = () => { update({ status: pendingStatus }); setStatusOpen(false); };
  const clearStatus = () => { setPendingStatus([]); update({ status: [] }); setStatusOpen(false); };

  const activeCount = [
    !!filters.date,
    filters.status.length > 0,
    filters.returnsOnly,
    filters.inStoreOnly,
    filters.onlineOnly,
  ].filter(Boolean).length;

  return (
    <div className={styles.wrapper}>
      {/* Search */}
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} aria-hidden="true" width={16} height={16} />
          <input
            type="search"
            placeholder="Search your orders"
            className={styles.searchInput}
            aria-label="Search your purchases"
            value={filters.search}
            onChange={e => update({ search: e.target.value })}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className={styles.filterRow}>
        {/* All filters */}
        <FilterChip isAllFilters selected={activeCount > 0} aria-label="All filters">
          All filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </FilterChip>

        {/* By date — radio popover */}
        <Popover open={dateOpen} onOpenChange={handleDateOpen}>
          <PopoverAnchor className={styles.chipAnchor}>
            <FilterChip
              isMultiSelect
              isOpen={dateOpen}
              selected={!!filters.date}
              onClick={() => handleDateOpen(!dateOpen)}
            >
              By date
            </FilterChip>
          </PopoverAnchor>
          <PopoverContent align="start" showArrow className={styles.filterPanel}>
            <RadioGroup
              value={pendingDate}
              onValueChange={setPendingDate}
              className={styles.optionList}
            >
              {DATE_OPTIONS.map(opt => (
                <Radio key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </RadioGroup>
            <div className={styles.panelFooter}>
              <Link
                href="#"
                variant="subtle"
                onClick={e => { e.preventDefault(); clearDate(); }}
              >
                Clear
              </Link>
              <Button variant="secondary" size="small" isFullWidth onClick={applyDate}>
                View results
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Returns */}
        <FilterChip
          selected={filters.returnsOnly}
          onSelectedChange={v => update({ returnsOnly: v })}
        >
          Returns
        </FilterChip>

        {/* In store */}
        <FilterChip
          selected={filters.inStoreOnly}
          onSelectedChange={v => update({ inStoreOnly: v })}
        >
          In store
        </FilterChip>

        {/* Online */}
        <FilterChip
          selected={filters.onlineOnly}
          onSelectedChange={v => update({ onlineOnly: v })}
        >
          Online
        </FilterChip>

        {/* By status — checkbox popover */}
        <Popover open={statusOpen} onOpenChange={handleStatusOpen}>
          <PopoverAnchor className={styles.chipAnchor}>
            <FilterChip
              isMultiSelect
              isOpen={statusOpen}
              selected={filters.status.length > 0}
              onClick={() => handleStatusOpen(!statusOpen)}
            >
              By status
            </FilterChip>
          </PopoverAnchor>
          <PopoverContent align="start" showArrow className={styles.filterPanel}>
            <div className={styles.optionList}>
              <Checkbox
                checked={pendingStatus.includes('in-progress')}
                label="In progress"
                onCheckedChange={checked => togglePendingStatus('in-progress', !!checked)}
              />
              <Checkbox
                checked={pendingStatus.includes('completed')}
                label="Completed"
                onCheckedChange={checked => togglePendingStatus('completed', !!checked)}
              />
            </div>
            <div className={styles.panelFooter}>
              <Link
                href="#"
                variant="subtle"
                onClick={e => { e.preventDefault(); clearStatus(); }}
              >
                Clear
              </Link>
              <Button variant="secondary" size="small" isFullWidth onClick={applyStatus}>
                View results
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
