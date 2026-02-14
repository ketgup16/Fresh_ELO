import * as React from 'react';
import styles from './FilterChip.module.css';

export type FilterChipSize = 'small' | 'medium' | 'large';
export type FilterChipVariant = 'default' | 'primary';

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
   * The size of the filter chip.
   * @default 'medium'
   */
  size?: FilterChipSize;

  /**
   * The visual variant of the filter chip.
   * - `default`: Dark fill when selected (uses INPUT tokens).
   * - `primary`: Walmart blue fill when selected (uses ACTION tokens).
   * @default 'default'
   */
  variant?: FilterChipVariant;

  /**
   * Optional leading icon/content (rendered before the label).
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
   * Escape hatch for additional CSS classes.
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for inline styles.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * FilterChip component — Living Design 3.5
 *
 * Interactive, selectable pill-shaped buttons specifically designed for filtering.
 * FilterChips are toggle buttons that expose their selected state via `aria-pressed`.
 * They use the INPUT token family and have fully rounded corners (pill shape).
 *
 * @example
 * ```tsx
 * <FilterChip selected={isActive} onSelectedChange={setIsActive}>
 *   Open
 * </FilterChip>
 * ```
 */
export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      selected = false,
      onSelectedChange,
      size = 'medium',
      variant = 'default',
      iconLeading,
      iconTrailing,
      disabled = false,
      children,
      onClick,
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
      styles[`filterChip--size-${size}`],
      styles[`filterChip--variant-${variant}`],
      selected && styles['filterChip--selected'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

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
