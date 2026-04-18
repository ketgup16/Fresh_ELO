import * as React from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { Divider } from '@/components/ui/Divider';
import { Alert } from '@/components/ui/Alert';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { cn } from '@/lib/utils';
import styles from './HeaderWidget.module.css';

// ── Public types ─────────────────────────────────────────────────────────────

export interface HeaderWidgetProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * Widget title text. Optional — 2-line clamp.
   */
  title?: string;

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
   * Whether to render a decorative Divider at the bottom.
   * @default false
   */
  showDivider?: boolean;

  /**
   * Trailing action type in the title row.
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

  /**
   * Component type — 'Error' renders a Warning Alert below the content.
   * @default 'Default'
   */
  type?: 'Default' | 'Error';

  /**
   * Alert body text (only used when type='Error').
   * @default 'Failed to load content.'
   */
  alertMessage?: string;

  /**
   * Alert action label (only used when type='Error').
   * @default 'Try again'
   */
  alertActionLabel?: string;

  /**
   * Callback for the alert action (only used when type='Error').
   */
  onAlertAction?: () => void;

  /** Unsafe override for className. Use sparingly. */
  UNSAFE_className?: string;
  /** Unsafe override for style. Use sparingly. */
  UNSAFE_style?: React.CSSProperties;
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * HeaderWidget — [AX] Widget Header for Living Design 3.5
 *
 * Provides a concise title, optional count, optional description, and
 * optional trailing action for a widget (a self-contained card/section
 * within a screen). Use once per widget, positioned at the top.
 *
 * - Optional title, count, description, and trailing navigation action
 * - Navigation: None | Chevron | LinkButton
 * - Optional divider at the bottom
 * - Error type shows a Warning Alert below the content
 *
 * @example
 * ```tsx
 * <HeaderWidget
 *   title="Widget title"
 *   count={5}
 *   description="Description text (optional)"
 *   navigation="Chevron"
 *   onTrailingAction={() => navigate('/detail')}
 *   showDivider
 * />
 * ```
 */
export const HeaderWidget = React.forwardRef<HTMLDivElement, HeaderWidgetProps>(
  (
    {
      title,
      count = null,
      description = null,
      showDivider = false,
      navigation = 'None',
      trailingLabel = 'Button label',
      onTrailingAction,
      type = 'Default',
      alertMessage = 'Failed to load content.',
      alertActionLabel = 'Try again',
      onAlertAction,
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
        {/* ── Content ────────────────────────────────────────────── */}
        <div className={styles.content}>
          {/* Title + trailing action row */}
          <div className={styles.titleRow}>
            {/* Title & count */}
            <div className={styles.titleAndCount}>
              {title && <span className={styles.title}>{title}</span>}
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

        {/* ── Error alert ───────────────────────────────────────── */}
        {type === 'Error' && (
          <div className={styles.alertContainer}>
            <Alert
              variant="warning"
              action={
                onAlertAction && (
                  <button
                    type="button"
                    className={styles.alertAction}
                    onClick={onAlertAction}
                  >
                    {alertActionLabel}
                  </button>
                )
              }
            >
              {alertMessage}
            </Alert>
          </div>
        )}

        {/* ── Divider ───────────────────────────────────────────── */}
        {showDivider && (
          <div className={styles.dividerContainer}>
            <Divider decorative />
          </div>
        )}
      </div>
    );
  }
);

HeaderWidget.displayName = 'HeaderWidget';
