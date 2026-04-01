import React from 'react';
import styles from './ProgressIndicator.module.css';

export interface ProgressIndicatorProps {
  /**
   * The current progress value
   * @default 0
   */
  value?: number;
  /**
   * The minimum value for the progress indicator
   * @default 0
   */
  min?: number;
  /**
   * The maximum value for the progress indicator
   * @default 100
   */
  max?: number;
  /**
   * Optional label displayed on the left side (also used as aria-label)
   */
  label?: string;
  /**
   * ID of an external element that labels this progress bar (alternative to label)
   */
  a11yLabelledBy?: string;
  /**
   * Optional value label displayed on the right side
   */
  valueLabel?: string;
  /**
   * Visual variant representing different states
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ProgressIndicator component displays progress with visual feedback.
 * Supports multiple color variants for different states and contexts.
 *
 * @example
 * ```tsx
 * <ProgressIndicator value={75} label="Loading" variant="info" valueLabel="75%" />
 * <ProgressIndicator value={90} label="Upload" variant="success" valueLabel="90%" />
 * <ProgressIndicator value={60} label="Warning" variant="warning" />
 * <ProgressIndicator value={30} label="Error" variant="error" />
 * ```
 */
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value = 0,
  min = 0,
  max = 100,
  label,
  a11yLabelledBy,
  valueLabel,
  variant = 'info',
  className = '',
}) => {
  // Clamp value between min and max
  const clampedValue = Math.min(Math.max(value, min), max);
  const range = max - min;
  const percentage = range > 0 ? ((clampedValue - min) / range) * 100 : 0;

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <div className={styles.label}>{label}</div>}

      <div className={styles.progressWrapper}>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={min}
          aria-valuemax={max}
          {...(a11yLabelledBy
            ? { 'aria-labelledby': a11yLabelledBy }
            : { 'aria-label': label || 'Progress' })}
        >
          <div
            className={`${styles.fill} ${styles[`fill-${variant}`]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {valueLabel && (
        <div className={styles.valueLabel}>{valueLabel}</div>
      )}
    </div>
  );
};

export default ProgressIndicator;
