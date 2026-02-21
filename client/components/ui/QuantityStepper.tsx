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
    const isIconOnly = !cartLabel && !showAddLabel;

    // For icon-only mode: controls whether the stepper is expanded or collapsed to a circle.
    // For non-icon-only: stepper is always expanded when count > 0.
    const [isOpen, setIsOpen] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const plusBtnRef = useRef<HTMLButtonElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);

    const isExpanded = isIconOnly ? (isOpen && count > 0) : (count > 0);
    const iconSize = ICON_SIZES[size];
    const isAtMax = maxQuantity !== undefined && count >= maxQuantity;

    // Cleanup close timer on unmount
    useEffect(() => {
      return () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      };
    }, []);

    const handleAdd = useCallback(() => {
      if (disabled) return;
      setCount(1);
      setIsOpen(true);
      onChange?.(1);
      // A11y: When "Add" is pressed, move focus to the + button
      requestAnimationFrame(() => {
        plusBtnRef.current?.focus();
      });
    }, [disabled, onChange]);

    const handleIncrement = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || isAtMax) return;
      const next = count + 1;
      setCount(next);
      onChange?.(next);
    }, [disabled, isAtMax, count, onChange]);

    const handleDecrement = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      const next = Math.max(0, count - 1);
      setCount(next);
      onChange?.(next);
      if (next === 0) {
        setIsOpen(false);
        // A11y: When count reaches 0, move focus back to the add/pill trigger
        requestAnimationFrame(() => {
          pillRef.current?.focus();
        });
      }
    }, [disabled, count, onChange]);

    // Click on the pill container when collapsed
    const handlePillClick = useCallback(() => {
      if (disabled || isExpanded) return;
      if (count === 0) {
        handleAdd();
      } else {
        // Icon-only mode, count > 0, collapsed → expand
        setIsOpen(true);
      }
    }, [disabled, isExpanded, count, handleAdd]);

    // Auto-collapse for icon-only mode
    const handleMouseEnter = useCallback(() => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = undefined;
      }
      if (isIconOnly && count > 0 && !isOpen) {
        setIsOpen(true);
      }
    }, [isIconOnly, count, isOpen]);

    const handleMouseLeave = useCallback(() => {
      if (!isIconOnly || !isOpen) return;
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }, [isIconOnly, isOpen]);

    // Keyboard support for collapsed pill
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (isExpanded) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePillClick();
      }
    }, [isExpanded, handlePillClick]);

    // Blur handling for icon-only auto-collapse
    const handleBlur = useCallback((e: React.FocusEvent) => {
      if (!isIconOnly || !isOpen) return;
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        closeTimerRef.current = setTimeout(() => {
          setIsOpen(false);
        }, 300);
      }
    }, [isIconOnly, isOpen]);

    const handleFocus = useCallback(() => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = undefined;
      }
    }, []);

    // ── Build class names ──

    const shouldBeCircle = isIconOnly && !isExpanded;

    const pillClass = [
      styles.pill,
      styles[`pill--${variant}`],
      styles[`pill--${size}`],
      isExpanded ? styles.pillExpanded : '',
      shouldBeCircle ? styles.pillCircle : '',
    ].filter(Boolean).join(' ');

    const sideSlotClass = [
      styles.slotSide,
      styles[`slotSide--${size}`],
    ].filter(Boolean).join(' ');

    const iconBtnClass = [
      styles.iconBtn,
      styles[`iconBtn--${size}`],
    ].filter(Boolean).join(' ');

    const centerSlotClass = [
      styles.slotCenter,
      styles[`slotCenter--${size}`],
    ].filter(Boolean).join(' ');

    // ── Center content ──

    let centerContent: React.ReactNode;

    if (count === 0) {
      if (cartLabel) {
        centerContent = <span>{cartLabel}</span>;
      } else {
        centerContent = (
          <>
            <PlusIcon size={iconSize} />
            {showAddLabel && <span className={styles.addText}>{addLabel}</span>}
          </>
        );
      }
    } else if (isAtMax) {
      centerContent = (
        <>
          <span className={styles.labelText}>Max</span>
          <span className={styles.countValue}>{count}</span>
        </>
      );
    } else {
      centerContent = (
        <>
          <span className={styles.countValue}>{count}</span>
          <span className={styles.labelText}>{countLabel}</span>
        </>
      );
    }

    return (
      <div ref={ref} className={styles.quantityStepper}>
        <div
          ref={pillRef}
          className={pillClass}
          onClick={!isExpanded ? handlePillClick : undefined}
          onMouseEnter={isIconOnly ? handleMouseEnter : undefined}
          onMouseLeave={isIconOnly ? handleMouseLeave : undefined}
          onBlur={isIconOnly ? handleBlur : undefined}
          onFocus={isIconOnly ? handleFocus : undefined}
          onKeyDown={!isExpanded ? handleKeyDown : undefined}
          role={isExpanded ? 'group' : 'button'}
          tabIndex={isExpanded ? undefined : 0}
          aria-label={
            isExpanded
              ? 'Quantity stepper'
              : count === 0
                ? cartLabel ?? `${addLabel} item`
                : `${count} items, click to edit`
          }
          aria-disabled={disabled || undefined}
        >
          {/* Left slot: trash or minus button */}
          <div className={sideSlotClass}>
            <button
              className={iconBtnClass}
              onClick={handleDecrement}
              disabled={disabled}
              aria-label={showTrashOnRemove && count === 1 ? 'Remove item' : 'Decrease quantity'}
              tabIndex={isExpanded ? 0 : -1}
            >
              {showTrashOnRemove && count === 1
                ? <Trash width={iconSize} height={iconSize} aria-hidden="true" />
                : <MinusIcon size={iconSize} />
              }
            </button>
          </div>

          {/* Center content */}
          <div className={centerSlotClass}>
            {centerContent}
          </div>

          {/* Right slot: plus button */}
          <div className={sideSlotClass}>
            <button
              className={iconBtnClass}
              ref={plusBtnRef}
              onClick={handleIncrement}
              disabled={disabled || isAtMax}
              aria-label="Increase quantity"
              tabIndex={isExpanded ? 0 : -1}
            >
              <PlusIcon size={iconSize} />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

QuantityStepper.displayName = 'QuantityStepper';
