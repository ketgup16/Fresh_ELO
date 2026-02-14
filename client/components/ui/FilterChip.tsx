import * as React from 'react';
import styles from './FilterChip.module.css';
import { Sliders } from '@/components/icons';

export interface FilterChipProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'style'
  > {
  /**
   * Whether the filter chip is in selected/pressed state.
   * @default false
   */
  selected?: boolean;

  /**
   * Callback when filter chip selection changes.
   */
  onSelectedChange?: (selected: boolean) => void;

  /**
   * Optional leading icon/content (rendered before the label).
   * Note: If `isAllFilters` is true, this will be ignored and Sliders icon will be used.
   */
  iconLeading?: React.ReactNode;

  /**
   * Optional trailing icon/content (rendered after the label).
   */
  iconTrailing?: React.ReactNode;

  /**
   * Whether the filter chip is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Enable "All Filters" variant with Sliders icon.
   * When true, always shows Sliders icon and allows optional label/count.
   * @default false
   */
  isAllFilters?: boolean;

  /**
   * Show text label in All Filters variant.
   * Only applies when `isAllFilters` is true.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Active filter count to display in All Filters variant.
   * When provided, shows count in parentheses. Only applies when `isAllFilters` is true.
   * @example "All Filters (2)"
   */
  count?: number;

  /**
   * Escape hatch for additional CSS classes.
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for inline styles.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * FilterChip (Toggle) component — Living Design 3.5
 *
 * Interactive, selectable pill-shaped toggle buttons specifically designed for filtering.
 * FilterChips are toggle buttons that expose their selected state via `aria-pressed`.
 * They use the FILTER semantic token family and have fully rounded corners (pill shape).
 *
 * **Single Size:** Fixed at 32px height (no size variants)
 * **Single Variant:** Toggle (same styling for all filter chips)
 *
 * **Tokens Used:**
 * - Unselected: `filter-fill` (white), `filter-border` (gray-160, 1px), `filter-text-on-fill` (gray-160)
 * - Selected: `filter-fill-activated` (blue-10), `filter-border-activated` (blue-100, 2px)
 * - All states include `-hovered`, `-focused`, `-pressed`, and `-disabled` variants
 *
 * @example
 * Basic filter chip (Toggle)
 * ```tsx
 * <FilterChip selected={isActive} onSelectedChange={setIsActive}>
 *   Open
 * </FilterChip>
 * ```
 *
 * @example
 * All Filters variant with label and count
 * ```tsx
 * <FilterChip isAllFilters selected count={3}>
 *   All Filters
 * </FilterChip>
 * ```
 *
 * @example
 * All Filters variant - icon only
 * ```tsx
 * <FilterChip isAllFilters selected showLabel={false} />
 * ```
 *
 * @example
 * All Filters variant - icon + count (no label)
 * ```tsx
 * <FilterChip isAllFilters selected showLabel={false} count={5} />
 * ```
 */
export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      selected = false,
      onSelectedChange,
      iconLeading,
      iconTrailing,
      disabled = false,
      children,
      onClick,
      isAllFilters = false,
      showLabel = true,
      count,
      UNSAFE_className,
      UNSAFE_style,
      ...restProps
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onSelectedChange?.(!selected);
      }
      onClick?.(e);
    };

    const className = [
      styles.filterChip,
      selected && styles['filterChip--selected'],
      isAllFilters && styles['filterChip--allFilters'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    // All Filters variant: always show Sliders icon, optional label and count
    if (isAllFilters) {
      const labelText = showLabel ? (children || 'All Filters') : null;
      const countText = typeof count === 'number' && count > 0 ? ` (${count})` : '';

      return (
        <button
          ref={ref}
          type="button"
          className={className}
          style={UNSAFE_style}
          disabled={disabled}
          aria-pressed={selected}
          onClick={handleClick}
          {...restProps}
        >
          <span className={styles.filterChip__iconLeading}>
            <Sliders />
          </span>
          {(labelText || countText) && (
            <span className={styles.filterChip__label}>
              {labelText}{countText}
            </span>
          )}
        </button>
      );
    }

    // Standard variant
    return (
      <button
        ref={ref}
        type="button"
        className={className}
        style={UNSAFE_style}
        disabled={disabled}
        aria-pressed={selected}
        onClick={handleClick}
        {...restProps}
      >
        {iconLeading && (
          <span className={styles.filterChip__iconLeading}>{iconLeading}</span>
        )}
        <span className={styles.filterChip__label}>{children}</span>
        {iconTrailing && (
          <span className={styles.filterChip__iconTrailing}>{iconTrailing}</span>
        )}
      </button>
    );
  },
);

FilterChip.displayName = 'FilterChip';
