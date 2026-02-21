import React, { useState } from 'react';
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
      onChange,
    },
    ref
  ) => {
    const [count, setCount] = useState(defaultCount);
  // Track which animation class to apply to stepper/addButton on transition
  const [stepperAnimClass, setStepperAnimClass] = useState('');
  const [addBtnAnimClass, setAddBtnAnimClass] = useState('');

  const iconSize = ICON_SIZES[size];
  const isAtMax = maxQuantity !== undefined && count >= maxQuantity;
  const isInAddMode = count === 0;

  const handleAdd = () => {
    if (disabled) return;
    // Arm the expand animation — fires when stepper mounts
    setStepperAnimClass(styles[`stepperAnimate--${size}`]);
    setCount(1);
    onChange?.(1);
  };

  const handleIncrement = () => {
    if (disabled || isAtMax) return;
    const next = count + 1;
    setCount(next);
    onChange?.(next);
  };

  const handleDecrement = () => {
    if (disabled) return;
    const next = Math.max(0, count - 1);
    if (next === 0) {
      // Arm the return animation — fires when add button remounts
      setAddBtnAnimClass(styles.addBtnReturn);
    }
    setCount(next);
    onChange?.(next);
  };

    const isIconOnly = !cartLabel && !showAddLabel;
    const addBtnClass = [
      styles.addButton,
      styles[`addButton--${variant}`],
      styles[`addButton--${size}`],
      cartLabel ? styles.cartMode : '',
      isIconOnly ? styles.iconOnly : '',
      addBtnAnimClass,
    ]
      .filter(Boolean)
      .join(' ');

    const stepperClass = [
      styles.stepper,
      styles[`stepper--${variant}`],
      styles[`stepper--${size}`],
      stepperAnimClass,
    ]
      .filter(Boolean)
      .join(' ');

    const iconBtnClass = [
      styles.iconBtn,
      styles[`iconBtn--${variant}`],
      styles[`iconBtn--${size}`],
    ]
      .filter(Boolean)
      .join(' ');

    const centerClass = [
      styles.stepperCenter,
      styles[`stepperCenter--${size}`],
      styles[`stepperCenter--${variant}`],
    ]
      .filter(Boolean)
      .join(' ');

    // Render the Add button (initial state)
    if (isInAddMode) {
      return (
        <div ref={ref} className={styles.quantityStepper}>
          <button
            className={addBtnClass}
            onClick={handleAdd}
            disabled={disabled}
            aria-label={cartLabel ?? `${addLabel} item`}
          >
            {!cartLabel && (
              <PlusIcon size={iconSize} />
            )}
            {cartLabel ? cartLabel : (showAddLabel ? addLabel : null)}
          </button>
        </div>
      );
    }

    // Render the stepper (active state)
    const centerContent = isAtMax ? (
      <>
        <span>Max</span>
        <span key={count} className={styles.countValue}>{count}</span>
      </>
    ) : (
      <>
        <span key={count} className={styles.countValue}>{count}</span>
        <span>{countLabel}</span>
      </>
    );

    return (
      <div ref={ref} className={styles.quantityStepper}>
        <div className={stepperClass} role="group" aria-label="Quantity stepper">
          <button
            className={iconBtnClass}
            onClick={handleDecrement}
            disabled={disabled}
            aria-label="Decrease quantity"
          >
            <MinusIcon size={iconSize} />
          </button>
          <div className={centerClass}>
            {centerContent}
          </div>
          <button
            className={iconBtnClass}
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
