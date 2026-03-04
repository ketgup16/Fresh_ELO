import { WCPFlag } from '@/components/walmart/WCPFlag';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { ItemTileBadgeType } from '@/components/walmart/WCPItemTile';
import styles from './FlashDealsItemTile.module.css';

const BADGE_VARIANT_MAP: Record<ItemTileBadgeType, import('@/components/walmart/WCPFlag').WCPFlagVariant> = {
  bestseller: 'savings-bold',
  deal: 'savings-subtle',
  popular: 'confidence-subtle',
  rollback: 'holiday-restricted',
  clearance: 'urgent',
};

export interface FlashDealsItemTileProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  originalPrice?: string;
  pricePrefix?: string;
  badge?: { label: string; type: ItemTileBadgeType };
  optionsText?: string;
  actionType: 'add' | 'options';
  idx: number;
}

export function FlashDealsItemTile({
  image,
  name,
  price,
  cents,
  originalPrice,
  pricePrefix,
  badge,
  optionsText,
  actionType,
  idx,
}: FlashDealsItemTileProps) {
  const { setItemQuantity } = useCart();
  const isSavings = !!pricePrefix;

  const handleAdd = () => {
    setItemQuantity(idx, 1);
  };

  return (
    <div className={styles.card}>
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
        </div>
        {originalPrice && (
          <div className={styles.originalPrice}>{originalPrice}</div>
        )}
        {optionsText && (
          <p className={styles.optionsText}>{optionsText}</p>
        )}
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.footer}>
        {actionType === 'add' ? (
          <Button variant="secondary" size="small" onClick={handleAdd}>
            + Add
          </Button>
        ) : (
          <Button variant="secondary" size="small" onClick={() => {}}>
            Options
          </Button>
        )}
      </div>
    </div>
  );
}
