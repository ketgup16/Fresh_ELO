import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Trash } from '@/components/icons/Trash';
import styles from './QuantityStepper.module.css';

export type QuantityStepperVariant = 'primary' | 'secondary' | 'tertiary';
export type QuantityStepperSize = 'small' | 'medium' | 'large';

export interface QuantityStepperProps {
  /** Visual style variant */
  variant?: QuantityStepperVariant;
  /** Size of the stepper */
  size?: QuantityStepperSize;
  /** Initial quantity count. 0 = show Add button. */
  defaultCount?: number;
  /** Maximum allowed quantity. When reached, increment button is disabled. */
  maxQuantity?: number;
  /** Label text for the "+ Add" button mode. Defaults to "Add" */
  addLabel?: string;
  /** When false, hides the text label in "+ Add" mode, showing only the + icon */
  showAddLabel?: boolean;
  /** When provided, renders as an "Add to cart" text-only button instead of "+ Add" */
  cartLabel?: string;
  /** Label shown after count in stepper mode. Defaults to "added" */
  countLabel?: string;
  /** Disables the entire component */
  disabled?: boolean;
  /**
   * When true, replaces the minus (−) button with a trash icon when count === 1.
   * Clicking the trash removes the item entirely (sets count to 0).
   * Use this in cart/bag contexts where removing the last item deletes it.
   */
  showTrashOnRemove?: boolean;
  /** Called whenever the quantity changes */
  onChange?: (count: number) => void;
}

const ICON_SIZES: Record<QuantityStepperSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
};

function PlusIcon({ size }: { size: number }) {
  if (size === 16) {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M7.5 8.5V13H8.5V8.5H13V7.5H8.5V3H7.5V7.5H3V8.5H7.5Z" fill="currentColor" />
      </svg>
    );
  }
  if (size === 24) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11.25 12.75V19.5H12.75V12.75H19.5V11.25H12.75V4.5H11.25V11.25H4.5V12.75H11.25Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M15 17V26H17V17H26V15H17V6H15V15H6V17H15Z" fill="currentColor" />
    </svg>
  );
}

function MinusIcon({ size }: { size: number }) {
  if (size === 16) {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M13 8.49976H3V7.49976H13V8.49976Z" fill="currentColor" />
      </svg>
    );
  }
  if (size === 24) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19.5 12.7495H4.5V11.2495H19.5V12.7495Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M26 16.9995H6V14.9995H26V16.9995Z" fill="currentColor" />
    </svg>
  );
}

type StepperMode = 'initial' | 'expanded' | 'collapsed';

export const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  (
    {
      variant = 'secondary',
      size = 'medium',
      defaultCount = 0,
      maxQuantity,
      addLabel = 'Add',
      showAddLabel = true,
      cartLabel,
      countLabel = 'added',
      disabled = false,
      showTrashOnRemove = false,
      onChange,
    },
    ref
  ) => {
    const [count, setCount] = useState(defaultCount);
    const initialMode: StepperMode = defaultCount > 0 ? 'expanded' : 'initial';
    const [mode, setMode] = useState<StepperMode>(initialMode);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const iconSize = ICON_SIZES[size];
    const isAtMax = maxQuantity !== undefined && count >= maxQuantity;

    // Clear timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    // Auto-collapse after 5 seconds when expanded
    useEffect(() => {
      if (mode === 'expanded' && count > 0) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setMode('collapsed');
        }, 5000);
      }
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [mode, count]);

    const handleInitialClick = useCallback(() => {
      if (disabled) return;
      setCount(1);
      setMode('expanded');
      onChange?.(1);
    }, [disabled, onChange]);

    const handleIncrement = useCallback(() => {
      if (disabled || isAtMax) return;
      const next = count + 1;
      setCount(next);
      setMode('expanded');
      onChange?.(next);
    }, [disabled, isAtMax, count, onChange]);

    const handleDecrement = useCallback(() => {
      if (disabled) return;
      const next = Math.max(0, count - 1);
      setCount(next);
      if (next === 0) {
        setMode('initial');
      } else {
        setMode('expanded');
      }
      onChange?.(next);
    }, [disabled, count, onChange]);

    const handleCollapsedClick = useCallback(() => {
      if (disabled) return;
      setMode('expanded');
    }, [disabled]);

    // ── Shared style classes ──
    const variantClass = styles[`pill--${variant}`];
    const sizeClass = styles[`pill--${size}`];

    const iconBtnClass = [
      styles.iconBtn,
      styles[`iconBtn--${size}`],
    ].join(' ');

    // ── INITIAL STATE: Add button ──
    if (mode === 'initial') {
      // Cart label mode: text-only button
      if (cartLabel) {
        return (
          <div ref={ref} className={styles.quantityStepper}>
            <button
              className={[styles.pill, variantClass, sizeClass, styles.pillInitial].join(' ')}
              onClick={handleInitialClick}
              disabled={disabled}
              aria-label={cartLabel}
              aria-disabled={disabled || undefined}
            >
              <span className={styles.pillContent}>{cartLabel}</span>
            </button>
          </div>
        );
      }

      // Icon-only mode: just the + icon in a circle
      if (!showAddLabel) {
        return (
          <div ref={ref} className={styles.quantityStepper}>
            <button
              className={[styles.pill, variantClass, sizeClass, styles.pillCircle].join(' ')}
              onClick={handleInitialClick}
              disabled={disabled}
              aria-label={`${addLabel} item`}
              aria-disabled={disabled || undefined}
            >
              <PlusIcon size={iconSize} />
            </button>
          </div>
        );
      }

      // Standard "+ Add" mode
      return (
        <div ref={ref} className={styles.quantityStepper}>
          <button
            className={[styles.pill, variantClass, sizeClass, styles.pillInitial].join(' ')}
            onClick={handleInitialClick}
            disabled={disabled}
            aria-label={`${addLabel} item`}
            aria-disabled={disabled || undefined}
          >
            <span className={styles.pillContent}>
              <PlusIcon size={iconSize} />
              <span className={styles.addText}>{addLabel}</span>
            </span>
          </button>
        </div>
      );
    }

    // ── COLLAPSED STATE: Just the count in a circle ──
    if (mode === 'collapsed') {
      return (
        <div ref={ref} className={styles.quantityStepper}>
          <button
            className={[styles.pill, variantClass, sizeClass, styles.pillCircle, styles.fadeIn].join(' ')}
            onClick={handleCollapsedClick}
            disabled={disabled}
            aria-label={`${count} items, click to edit`}
            aria-disabled={disabled || undefined}
          >
            <span className={styles.countValue}>{count}</span>
          </button>
        </div>
      );
    }

    // ── EXPANDED STATE: Full stepper with −/count/+ ──
    const centerLabel = isAtMax ? (
      <>
        <span>Max</span>
        <span className={styles.countValue}>{count}</span>
      </>
    ) : (
      <>
        <span className={styles.countValue}>{count}</span>
        <span>{countLabel}</span>
      </>
    );

    return (
      <div ref={ref} className={styles.quantityStepper}>
        <div
          className={[styles.pill, variantClass, sizeClass, styles.pillExpanded, styles.expandIn].join(' ')}
          role="group"
          aria-label="Quantity stepper"
          aria-disabled={disabled || undefined}
        >
          {/* Decrement button */}
          <button
            className={[iconBtnClass, styles.fadeIn].join(' ')}
            onClick={handleDecrement}
            disabled={disabled}
            aria-label={showTrashOnRemove && count === 1 ? 'Remove item' : 'Decrease quantity'}
          >
            {showTrashOnRemove && count === 1
              ? <Trash width={iconSize} height={iconSize} aria-hidden="true" />
              : <MinusIcon size={iconSize} />
            }
          </button>

          {/* Count display */}
          <div className={styles.centerSlot}>
            {centerLabel}
          </div>

          {/* Increment button */}
          <button
            className={[iconBtnClass, styles.fadeIn].join(' ')}
            onClick={handleIncrement}
            disabled={disabled || isAtMax}
            aria-label="Increase quantity"
          >
            <PlusIcon size={iconSize} />
          </button>
        </div>
      </div>
    );
  }
);

QuantityStepper.displayName = 'QuantityStepper';
