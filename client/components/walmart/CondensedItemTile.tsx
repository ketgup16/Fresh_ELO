import React from 'react';
import { WCPAddToCart } from './WCPAddToCart';
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
  /** Add-to-cart button variant: 'primary' (solid) or 'tertiary' (bordered) */
  variant?: 'primary' | 'tertiary';
  /** When true, renders the tile at reduced opacity with no interaction */
  loading?: boolean;
  /** Callback fired when add-to-cart quantity changes */
  onAddToCart?: (count: number) => void;
}

export function CondensedItemTile({
  image,
  price,
  cents,
  tag,
  variant = 'primary',
  loading = false,
  onAddToCart,
}: CondensedItemTileProps) {
  return (
    <div className={`${styles.tile} ${loading ? styles.tileLoading : ''}`}>
      <div className={styles.imageArea}>
        <img src={image} alt="Product" className={styles.image} />
        {onAddToCart && (
          <div className={styles.addToCartWrap}>
            <WCPAddToCart variant={variant} onChange={onAddToCart} />
          </div>
        )}
      </div>
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
    </div>
  );
}
