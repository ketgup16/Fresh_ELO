import { AXFlag, AXFlagVariant } from '@/components/walmart/AXFlag';
import { AXHeartView } from '@/components/walmart/AXHeartView';
import { AXAddToCart } from '@/components/walmart/AXAddToCart';
import styles from './AXItemTile.module.css';

export type ItemTileBadgeType = 'bestseller' | 'deal' | 'popular' | 'rollback' | 'clearance';

const BADGE_VARIANT_MAP: Record<ItemTileBadgeType, AXFlagVariant> = {
  bestseller: 'savings-bold',
  deal: 'savings-subtle',
  popular: 'confidence-subtle',
  rollback: 'holiday-restricted',
  clearance: 'holiday-restricted',
};

export interface AXItemTileProps {
  /** Product image URL */
  image: string;
  /** Product name (truncated to 1 line) */
  name: string;
  /** Dollar portion of price, e.g. "98" */
  price: string;
  /** Cents portion of price, e.g. "00" */
  cents: string;
  /** Strikethrough original price, e.g. "$200.00" */
  originalPrice?: string;
  /** Prefix like "Now" — triggers green savings style */
  pricePrefix?: string;
  /** Suffix like "/mo" */
  priceSuffix?: string;
  /** Optional badge overlay */
  badge?: { label: string; type: ItemTileBadgeType };
  /** When provided, renders a AXAddToCart button at the bottom-right of the image area */
  onAddToCart?: (count: number) => void;
  /** Variant for the add-to-cart button. Defaults to 'primary'. */
  addToCartVariant?: 'primary' | 'tertiary';
}

export function AXItemTile({
  image,
  name,
  price,
  cents,
  originalPrice,
  pricePrefix,
  priceSuffix,
  badge,
  onAddToCart,
  addToCartVariant = 'primary',
}: AXItemTileProps) {
  const isSavings = !!pricePrefix;

  return (
    <div className={styles.tile}>
      {badge && (
        <div className={styles.flagWrap}>
          <AXFlag
            label={badge.label}
            variant={BADGE_VARIANT_MAP[badge.type]}
          />
        </div>
      )}
      <div className={styles.heartWrap}>
        <AXHeartView size="small" calloutPosition="bottom" />
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
        {onAddToCart && (
          <div className={styles.addToCartWrap}>
            <AXAddToCart variant={addToCartVariant} onChange={onAddToCart} />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div
          className={[styles.priceRow, isSavings ? styles.priceRowSavings : '']
            .filter(Boolean)
            .join(' ')}
        >
          {pricePrefix && (
            <span className={styles.prefix}>{pricePrefix} </span>
          )}
          <span className={styles.dollarSign}>$</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.cents}>{cents}</span>
          {priceSuffix && (
            <span className={styles.suffix}>{priceSuffix}</span>
          )}
        </div>
        {originalPrice && (
          <div className={styles.originalPrice}>{originalPrice}</div>
        )}
        <p className={styles.name}>{name}</p>
      </div>
    </div>
  );
}
