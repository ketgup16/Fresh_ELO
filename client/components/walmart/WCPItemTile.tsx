import { WCPFlag, WCPFlagVariant } from '@/components/walmart/WCPFlag';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import styles from './WCPItemTile.module.css';

export type ItemTileBadgeType = 'bestseller' | 'deal' | 'popular' | 'rollback';

const BADGE_VARIANT_MAP: Record<ItemTileBadgeType, WCPFlagVariant> = {
  bestseller: 'savings-bold',
  deal: 'savings-subtle',
  popular: 'confidence-subtle',
  rollback: 'holiday-restricted',
};

export interface WCPItemTileProps {
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
}

export function WCPItemTile({
  image,
  name,
  price,
  cents,
  originalPrice,
  pricePrefix,
  priceSuffix,
  badge,
}: WCPItemTileProps) {
  const isSavings = !!pricePrefix;

  return (
    <div className={styles.tile}>
      {badge && (
        <div className={styles.flagWrap}>
          <WCPFlag
            label={badge.label}
            variant={BADGE_VARIANT_MAP[badge.type]}
          />
        </div>
      )}
      <div className={styles.heartWrap}>
        <WCPHeartView size="small" calloutPosition="top" />
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
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
