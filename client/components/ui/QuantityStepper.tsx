import React, { useState, useRef, useEffect, useCallback } from 'react';
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

function TrashIcon({ size }: { size: number }) {
  if (size === 16) {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6.5 1.5h3a.5.5 0 0 1 .5.5v.5H6V2a.5.5 0 0 1 .5-.5ZM5 2.5V2a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 11 2v.5h2a.5.5 0 0 1 0 1h-.541l-.5 9A1.5 1.5 0 0 1 10.463 14H5.537A1.5 1.5 0 0 1 4.04 12.5l-.5-9H3a.5.5 0 0 1 0-1h2Zm1 0h4v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.5Zm-1.96 1 .494 8.917A.5.5 0 0 0 5.537 13h4.926a.5.5 0 0 0 .499-.583L11.46 3.5H4.54Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
      </svg>
    );
  }
  if (size === 24) {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9.75 2.25h4.5a1.5 1.5 0 0 1 1.5 1.5V4.5H21a.75.75 0 0 1 0 1.5h-.81l-.72 13.5A1.5 1.5 0 0 1 17.973 21H6.027A1.5 1.5 0 0 1 4.53 19.5L3.81 6H3a.75.75 0 0 1 0-1.5h5.25V3.75a1.5 1.5 0 0 1 1.5-1.5Zm0 1.5v.75h4.5V3.75h-4.5Zm-4.428 2.25.712 13.333A.001.001 0 0 0 6.027 19.5h11.946l.713-13.5H5.322Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
      </svg>
    );
  }
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M13 3h6a2 2 0 0 1 2 2v1h5a1 1 0 1 1 0 2h-1.073l-.954 17.938A2 2 0 0 1 22 28H10a2 2 0 0 1-1.973-2.062L7.073 8H6a1 1 0 0 1 0-2h5V5a2 2 0 0 1 2-2Zm0 3h6V5h-6v1ZM9.08 8l.947 17.813A.001.001 0 0 0 10 26h12a.001.001 0 0 0 .973-.938L23.919 8H9.081Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
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
          <span key={count} className={styles.countValue}>{count}</span>
        </>
      );
    } else {
      centerContent = (
        <>
          <span key={count} className={styles.countValue}>{count}</span>
          <span className={styles.labelText}>{countLabel}</span>
        </>
      );
    }

    return (
      <div ref={ref} className={styles.quantityStepper}>
        <div
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
              className={`${iconBtnClass}${showTrashOnRemove && count === 1 ? ` ${styles.iconBtnTrash}` : ''}`}
              onClick={handleDecrement}
              disabled={disabled}
              aria-label={showTrashOnRemove && count === 1 ? 'Remove item' : 'Decrease quantity'}
              tabIndex={isExpanded ? 0 : -1}
            >
              {showTrashOnRemove && count === 1
                ? <TrashIcon size={iconSize} />
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
