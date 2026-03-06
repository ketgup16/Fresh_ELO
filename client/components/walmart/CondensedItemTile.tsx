import React from 'react';
import { WCPAddToCart } from './WCPAddToCart';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { Minus, Plus } from '@/components/icons';
import styles from './CondensedItemTile.module.css';

export interface CondensedItemTileProps {
  /** Product image URL */
  image: string;
  /** Dollar portion of the price, e.g. "3" */
  price: string;
  /** Cents portion of the price, e.g. "25" */
  cents: string;
  /** Optional size/options tag text, e.g. "5 oz" */
  tag?: string;
  /** Tile variant: 'primary' (solid), 'tertiary' (bordered), or 'edit' (large edit mode) */
  variant?: 'primary' | 'tertiary' | 'edit';
  /** When true, renders the tile at reduced opacity with no interaction */
  loading?: boolean;
  /** Callback fired when add-to-cart quantity changes */
  onAddToCart?: (count: number) => void;
  /** Product name — shown in edit variant */
  name?: string;
  /** Current quantity — shown in edit variant */
  quantity?: number;
  /** Callback when quantity changes in edit mode */
  onQuantityChange?: (q: number) => void;
  /** Whether item is checked/selected in edit mode */
  isChecked?: boolean;
  /** Toggle check state in edit mode */
  onCheckChange?: (checked: boolean) => void;
  /** Index for staggered animation delay */
  itemIndex?: number;
  /** Animation class name to apply */
  animationClass?: string;
}

export function CondensedItemTile({
  image,
  price,
  cents,
  tag,
  variant = 'primary',
  loading = false,
  onAddToCart,
  name,
  quantity = 2,
  onQuantityChange,
  isChecked = true,
  onCheckChange,
  itemIndex = 0,
  animationClass,
}: CondensedItemTileProps) {
  const isEdit = variant === 'edit';

  // Unified tile that renders both states — CSS handles the transition
  return (
    <div
      className={[
        styles.tile,
        isEdit ? styles.tileEdit : '',
        loading ? styles.tileLoading : '',
        animationClass,
      ].filter(Boolean).join(' ')}
      style={{ '--item-delay': `${itemIndex * 41}ms` } as React.CSSProperties}
    >
      {/* Image area — grows from 96px to fill grid column in edit mode */}
      <div className={[styles.imageArea, isEdit ? styles.imageAreaEdit : ''].filter(Boolean).join(' ')}>
        <img
          src={image}
          alt={name || 'Product'}
          className={[styles.image, isEdit ? styles.imageEdit : ''].filter(Boolean).join(' ')}
        />

        {/* Checkmark — edit mode only, animated enter */}
        <button
          className={[styles.checkIcon, isEdit ? styles.checkIconVisible : ''].filter(Boolean).join(' ')}
          onClick={() => onCheckChange?.(!isChecked)}
          aria-label={isChecked ? 'Deselect item' : 'Select item'}
          tabIndex={isEdit ? 0 : -1}
        >
          <CheckCircleFill
            className={isChecked ? styles.checkSvg : styles.checkSvgUnchecked}
          />
        </button>

        {/* Quantity badge — default mode only, animated exit */}
        {!isEdit && onAddToCart && (
          <div className={styles.addToCartWrap}>
            <WCPAddToCart variant={variant} onChange={onAddToCart} />
          </div>
        )}
      </div>

      {/* Price row + tag */}
      <div className={styles.priceRow}>
        <div className={styles.priceInner}>
          <span className={styles.dollarSign}>$</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.cents}>{cents}</span>
        </div>
        {tag && (
          <div className={styles.tag}>
            <span className={styles.tagText}>{tag}</span>
          </div>
        )}
      </div>

      {/* Edit-only details: name + quantity stepper — animated expand/collapse */}
      <div className={[styles.editDetails, isEdit ? styles.editDetailsVisible : ''].filter(Boolean).join(' ')}>
        {name && <div className={styles.editName}>{name}</div>}

        <div className={styles.quantityStepper}>
          <button
            className={styles.stepperBtn}
            onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
            tabIndex={isEdit ? 0 : -1}
          >
            <Minus className={styles.stepperBtnIcon} />
          </button>
          <span className={styles.stepperCount}>{quantity}</span>
          <button
            className={styles.stepperBtn}
            onClick={() => onQuantityChange?.(quantity + 1)}
            aria-label="Increase quantity"
            tabIndex={isEdit ? 0 : -1}
          >
            <Plus className={styles.stepperBtnIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
