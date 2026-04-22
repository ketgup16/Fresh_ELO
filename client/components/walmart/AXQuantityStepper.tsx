import React, { useState } from 'react';
import styles from './AXQuantityStepper.module.css';

export type AXQuantityLabelStyle = 'duration' | 'amount' | 'percent';

export interface AXQuantityStepperProps {
  /** Label style variant. @default 'duration' */
  labelStyle?: AXQuantityLabelStyle;
  /** For duration: total minutes (current). Computed to hours + mins on render. */
  totalMinutes?: number;
  /** For duration: target total minutes shown in "of X" part. */
  targetMinutes?: number;
  /** For amount: current count. */
  count?: number;
  /** For amount: target/total count shown in "of X". */
  totalCount?: number;
  /** For percent: current percentage value (0–100). */
  percent?: number;
  /** Show the "of [target]" second label. @default true */
  showSecondLabel?: boolean;
  /** Step for minutes in duration mode. @default 15 */
  minuteStep?: number;
  /** Step for amount/percent increment. @default 1 */
  step?: number;
  /** Minimum allowed value (total minutes for duration, count or percent otherwise). @default 0 */
  min?: number;
  /** Maximum allowed value (optional). */
  max?: number;
  /** Disable the entire control. */
  disabled?: boolean;
  /** Called when + or − is pressed (passes new internal value). */
  onChange?: (value: number) => void;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/** Pad a number to at least 2 digits */
function pad(n: number) {
  return String(Math.floor(n)).padStart(2, '0');
}

/**
 * AX Quantity Stepper — WCP-level pill stepper with rich labeled center content.
 * Supports Duration (hh mm), Amount (ea), and Percent (%) label styles.
 * Always rendered in expanded mode (− [label] +).
 */
export function AXQuantityStepper({
  labelStyle = 'duration',
  totalMinutes: totalMinutesProp,
  targetMinutes = 0,
  count: countProp,
  totalCount = 0,
  percent: percentProp,
  showSecondLabel = true,
  minuteStep = 15,
  step = 1,
  min = 0,
  max,
  disabled = false,
  onChange,
  UNSAFE_className,
  UNSAFE_style,
}: AXQuantityStepperProps) {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState<number>(() => {
    if (labelStyle === 'duration') return totalMinutesProp ?? 0;
    if (labelStyle === 'amount') return countProp ?? 0;
    return percentProp ?? 0;
  });

  // Resolve the current value (controlled if prop provided, else internal)
  const resolvedValue = (() => {
    if (labelStyle === 'duration') return totalMinutesProp ?? internalValue;
    if (labelStyle === 'amount') return countProp ?? internalValue;
    return percentProp ?? internalValue;
  })();

  const increment = labelStyle === 'duration' ? minuteStep : step;
  const effectiveMax = max ?? (labelStyle === 'percent' ? 100 : undefined);

  const canDecrement = resolvedValue - increment >= min;
  const canIncrement = effectiveMax === undefined || resolvedValue + increment <= effectiveMax;

  function handleDecrement() {
    if (disabled || !canDecrement) return;
    const next = Math.max(min, resolvedValue - increment);
    setInternalValue(next);
    onChange?.(next);
  }

  function handleIncrement() {
    if (disabled || !canIncrement) return;
    const next = effectiveMax !== undefined
      ? Math.min(effectiveMax, resolvedValue + increment)
      : resolvedValue + increment;
    setInternalValue(next);
    onChange?.(next);
  }

  // ── Render center label ──────────────────────────────────────────
  function renderLabel() {
    if (labelStyle === 'duration') {
      const h = Math.floor(resolvedValue / 60);
      const m = resolvedValue % 60;
      const th = Math.floor(targetMinutes / 60);
      const tm = targetMinutes % 60;
      return (
        <div className={styles.quantityLabels}>
          {/* Current: bold */}
          <div className={styles.labelGroup}>
            <span className={styles.valueBold}>{pad(h)}</span>
            <span className={styles.unitBold}>h</span>
            <span className={styles.valueBold}>{pad(m)}</span>
            <span className={styles.unitBold}>m</span>
          </div>
          {/* "of target": regular */}
          {showSecondLabel && (
            <div className={styles.labelGroup}>
              <span className={styles.ofSeparator}>of</span>
              <div className={styles.labelGroup}>
                <span className={styles.valueRegular}>{pad(th)}</span>
                <span className={styles.unitRegular}>h</span>
                <span className={styles.valueRegular}>{pad(tm)}</span>
                <span className={styles.unitRegular}>m</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (labelStyle === 'amount') {
      return (
        <div className={styles.quantityLabels}>
          <div className={styles.labelGroup}>
            <span className={styles.valueBold}>{pad(resolvedValue)}</span>
            <span className={styles.unitBold}>ea</span>
          </div>
          {showSecondLabel && (
            <div className={styles.labelGroup}>
              <span className={styles.ofSeparator}>of</span>
              <div className={styles.labelGroup}>
                <span className={styles.valueRegular}>{pad(totalCount)}</span>
                <span className={styles.unitRegular}>ea</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    // percent
    return (
      <div className={styles.quantityLabels}>
        <div className={styles.labelGroup}>
          <span className={styles.valueBold}>{pad(resolvedValue)}</span>
          <span className={styles.unitBold}>%</span>
        </div>
      </div>
    );
  }

  const rootClass = [
    styles.stepper,
    disabled && styles.stepperDisabled,
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={UNSAFE_style}
      role="group"
      aria-label={`Quantity stepper — ${labelStyle}`}
    >
      {/* Decrement — same icon as LD QuantityStepper medium */}
      <button
        type="button"
        className={styles.iconBtn}
        aria-label="Decrease"
        disabled={disabled || !canDecrement}
        onClick={handleDecrement}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19.5 12.7495H4.5V11.2495H19.5V12.7495Z" fill="currentColor" />
        </svg>
      </button>

      {/* Center label */}
      <div className={styles.centerLabel}>
        {renderLabel()}
      </div>

      {/* Increment — same icon as LD QuantityStepper medium */}
      <button
        type="button"
        className={styles.iconBtn}
        aria-label="Increase"
        disabled={disabled || !canIncrement}
        onClick={handleIncrement}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M11.25 12.75V19.5H12.75V12.75H19.5V11.25H12.75V4.5H11.25V11.25H4.5V12.75H11.25Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
