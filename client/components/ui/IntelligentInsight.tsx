import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { SidekickLogoIcon } from '@/components/icons-custom/SidekickLogoIcon';
import { cn } from '@/lib/utils';
import styles from './IntelligentInsight.module.css';

export interface IntelligentInsightProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * The insight text message displayed next to the Sidekick logo.
   */
  label: string;

  /**
   * Whether to show the action button below the insight text.
   * @default false
   */
  showButton?: boolean;

  /**
   * Label text for the action button.
   * @default "Button label"
   */
  buttonLabel?: string;

  /**
   * Callback fired when the action button is clicked.
   */
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Unsafe override for className. Use sparingly.
   */
  UNSAFE_className?: string;

  /**
   * Unsafe override for style. Use sparingly.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * IntelligentInsight — [AX] Insight component for Living Design 3.5
 *
 * A card-shaped surface that pairs the Sidekick AI brand mark with a short
 * insight label and an optional full-width secondary action button.
 *
 * @example
 * ```tsx
 * <IntelligentInsight
 *   label="Data-based intelligence to support action."
 *   showButton
 *   buttonLabel="View details"
 *   onButtonClick={() => navigate('/insights')}
 * />
 * ```
 */
export const IntelligentInsight = React.forwardRef<
  HTMLDivElement,
  IntelligentInsightProps
>(
  (
    {
      label,
      showButton = false,
      buttonLabel = 'Button label',
      onButtonClick,
      UNSAFE_className,
      UNSAFE_style,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(styles.insight, UNSAFE_className)}
        style={UNSAFE_style}
        {...rest}
      >
        {/* Row 1: Sidekick logo + insight label */}
        <div className={styles.iconTextRow}>
          <div className={styles.iconWrapper}>
            <SidekickLogoIcon size="small" alt="Sidekick" />
          </div>
          <p className={styles.label}>{label}</p>
        </div>

        {/* Row 2: Optional action button */}
        {showButton && (
          <div className={styles.buttonContainer}>
            <Button
              variant="secondary"
              size="small"
              isFullWidth
              onClick={onButtonClick}
            >
              {buttonLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

IntelligentInsight.displayName = 'IntelligentInsight';
