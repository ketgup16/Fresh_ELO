import React from 'react';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import styles from './WCPAddToCart.module.css';

export interface WCPAddToCartProps {
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

export function WCPAddToCart({
  variant = 'tertiary',
  defaultCount = 0,
  maxQuantity,
  disabled = false,
  onChange,
}: WCPAddToCartProps) {
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
