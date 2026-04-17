import * as React from 'react';
import { Divider } from '@/components/ui/Divider';
import { LinkButton } from '@/components/ui/LinkButton';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { ChevronUp } from '@/components/icons/ChevronUp';
import { cn } from '@/lib/utils';
import styles from './HeaderSection.module.css';

// ── Public types ─────────────────────────────────────────────────────────────

export interface HeaderSectionProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * Size variant. Medium uses heading/medium + LinkButton trailing action;
   * Small uses heading/small + chevron toggle trailing action.
   * @default 'medium'
   */
  size?: 'medium' | 'small';

  /**
   * Title text (required). Truncated after 2 lines.
   */
  title: string;

  /**
   * Optional item count displayed as `(N)` after the title.
   * Pass `null` or omit to hide.
   * @default null
   */
  count?: number | null;

  /**
   * Optional description text displayed below the title.
   * Truncated after 3 lines.
   * @default null
   */
  description?: string | null;

  /**
   * Label for the trailing LinkButton (Medium size only).
   * @default 'Button label'
   */
  trailingLabel?: string;

  /**
   * Callback fired when the trailing action is triggered.
   * For Medium: fires on LinkButton click.
   * For Small: fires on chevron icon click (overrides internal toggle).
   */
  onTrailingAction?: () => void;

  /**
   * Whether to render a Divider at the bottom of the component.
   * @default true
   */
  showDivider?: boolean;

  /**
   * Whether to add left and right padding to the content area.
   * The Divider (if shown) stays full-width.
   * @default false
   */
  contentInset?: boolean;

  /** Unsafe override for className. Use sparingly. */
  UNSAFE_className?: string;
  /** Unsafe override for style. Use sparingly. */
  UNSAFE_style?: React.CSSProperties;
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * HeaderSection — [AX] Section Header for Living Design 3.5
 *
 * Defines screen sections and creates typographic hierarchy within a screen.
 *
 * - **Medium**: heading/medium title + optional count + LinkButton trailing action
 * - **Small**: heading/small title + optional count + chevron expand/collapse toggle
 *
 * @example
 * ```tsx
 * <HeaderSection
 *   size="medium"
 *   title="Today's Plan"
 *   count={5}
 *   trailingLabel="See all"
 *   onTrailingAction={() => navigate('/plan')}
 *   description="Review and start an action"
 *   showDivider
 *   contentInset
 * />
 * ```
 */
export const HeaderSection = React.forwardRef<HTMLDivElement, HeaderSectionProps>(
  (
    {
      size = 'medium',
      title,
      count = null,
      description = null,
      trailingLabel = 'Button label',
      onTrailingAction,
      showDivider = true,
      contentInset = false,
      UNSAFE_className,
      UNSAFE_style,
      ...rest
    },
    ref
  ) => {
    // Small size: internal expand/collapse state when no external handler provided
    const [expanded, setExpanded] = React.useState(true);

    const handleSmallToggle = () => {
      if (onTrailingAction) {
        onTrailingAction();
      } else {
        setExpanded((prev) => !prev);
      }
    };

    const isSmall = size === 'small';

    return (
      <div
        ref={ref}
        className={cn(styles.root, UNSAFE_className)}
        style={UNSAFE_style}
        {...rest}
      >
        {/* ── Main content area ─────────────────────────────────── */}
        <div className={styles.content}>
          {contentInset && <div className={styles.paddingLeft} aria-hidden />}

          <div className={styles.inner}>
            {/* Title + trailing action row */}
            <div className={cn(styles.titleRow, isSmall ? styles.titleRowSmall : styles.titleRowMedium)}>
              {/* Title & count */}
              <div className={styles.titleAndCount}>
                <span className={isSmall ? styles.titleSmall : styles.titleMedium}>
                  {title}
                </span>
                {count != null && (
                  <span className={styles.countWrapper}>
                    <span className={styles.count}>({count})</span>
                  </span>
                )}
              </div>

              {/* Trailing action */}
              {isSmall ? (
                <button
                  type="button"
                  className={styles.chevronButton}
                  onClick={handleSmallToggle}
                  aria-expanded={expanded}
                  aria-label={expanded ? 'Collapse section' : 'Expand section'}
                >
                  {expanded ? (
                    <ChevronUp className={styles.chevronIcon} aria-hidden />
                  ) : (
                    <ChevronDown className={styles.chevronIcon} aria-hidden />
                  )}
                </button>
              ) : (
                <div className={styles.trailingActionMedium}>
                  <LinkButton size="small" onClick={onTrailingAction}>
                    {trailingLabel}
                  </LinkButton>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>

          {contentInset && <div className={styles.paddingRight} aria-hidden />}
        </div>

        {/* ── Bottom padding ────────────────────────────────────── */}
        <div className={styles.bottomPadding} aria-hidden />

        {/* ── Divider ───────────────────────────────────────────── */}
        {showDivider && <Divider decorative />}
      </div>
    );
  }
);

HeaderSection.displayName = 'HeaderSection';
