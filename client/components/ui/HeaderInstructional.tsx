import * as React from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { cn } from '@/lib/utils';
import styles from './HeaderInstructional.module.css';

// ── Public types ─────────────────────────────────────────────────────────────

export interface HeaderInstructionalProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
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
   * Whether to add bottom padding below the content.
   * @default false
   */
  bottomPadding?: boolean;

  /**
   * Trailing action type.
   * - 'None': no trailing element
   * - 'Chevron': ChevronRight icon button
   * - 'LinkButton': LD 3.5 LinkButton (small)
   * @default 'None'
   */
  navigation?: 'None' | 'Chevron' | 'LinkButton';

  /**
   * Label for the trailing LinkButton (used only when navigation='LinkButton').
   * @default 'Button label'
   */
  trailingLabel?: string;

  /**
   * Callback fired when the trailing Chevron or LinkButton is activated.
   */
  onTrailingAction?: () => void;

  /** Unsafe override for className. Use sparingly. */
  UNSAFE_className?: string;
  /** Unsafe override for style. Use sparingly. */
  UNSAFE_style?: React.CSSProperties;
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * HeaderInstructional — [AX] Instructional Screen Header for Living Design 3.5
 *
 * Provides overall context for a screen and specific directions when needed.
 * Always positioned at the top of a screen's content area (L2 screens).
 *
 * - Single fixed size using heading/large title
 * - Optional item count, description, and trailing navigation action
 * - Navigation: None | Chevron | LinkButton
 *
 * @example
 * ```tsx
 * <HeaderInstructional
 *   title="Review and start an action"
 *   count={5}
 *   description="Your personalized actions are shown below in order of impact."
 *   navigation="Chevron"
 *   onTrailingAction={() => navigate(-1)}
 *   bottomPadding
 * />
 * ```
 */
export const HeaderInstructional = React.forwardRef<HTMLDivElement, HeaderInstructionalProps>(
  (
    {
      title,
      count = null,
      description = null,
      bottomPadding = false,
      navigation = 'None',
      trailingLabel = 'Button label',
      onTrailingAction,
      UNSAFE_className,
      UNSAFE_style,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(styles.root, UNSAFE_className)}
        style={UNSAFE_style}
        {...rest}
      >
        {/* ── Top padding ────────────────────────────────────────── */}
        <div className={styles.topPadding} aria-hidden />

        {/* ── Content ────────────────────────────────────────────── */}
        <div className={styles.content}>
          {/* Title + trailing action row */}
          <div className={styles.titleRow}>
            {/* Title & count */}
            <div className={styles.titleAndCount}>
              <span className={styles.title}>{title}</span>
              {count != null && (
                <span className={styles.countWrapper}>
                  <span className={styles.count}>({count})</span>
                </span>
              )}
            </div>

            {/* Trailing action */}
            {navigation === 'Chevron' && (
              <button
                type="button"
                className={styles.chevronButton}
                onClick={onTrailingAction}
                aria-label="Navigate forward"
              >
                <ChevronRight className={styles.chevronIcon} aria-hidden />
              </button>
            )}

            {navigation === 'LinkButton' && (
              <div className={styles.trailingAction}>
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

        {/* ── Bottom padding ────────────────────────────────────── */}
        {bottomPadding && <div className={styles.bottomPadding} aria-hidden />}
      </div>
    );
  }
);

HeaderInstructional.displayName = 'HeaderInstructional';
