import React from 'react';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import styles from './AXAddToCart.module.css';

export interface AXAddToCartProps {
  /** Visual variant — primary (solid blue) or tertiary (bordered, transparent) */
  variant?: 'primary' | 'tertiary';
  /** Current quantity count. 0 = show icon-only add button. */
  defaultCount?: number;
  /** Maximum allowed quantity */
  maxQuantity?: number;
  /** Disables the entire component */
  disabled?: boolean;
  /** Called whenever the quantity changes */
  onChange?: (count: number) => void;
}

export function AXAddToCart({
  variant = 'tertiary',
  defaultCount = 0,
  maxQuantity,
  disabled = false,
  onChange,
}: AXAddToCartProps) {
  return (
    <div className={styles.hitArea}>
      <QuantityStepper
        variant={variant}
        size="xsmall"
        showAddLabel={false}
        showTrashOnRemove
        defaultCount={defaultCount}
        maxQuantity={maxQuantity}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
