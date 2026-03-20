import { AXFlag } from '@/components/walmart/AXFlag';
import { AXHeartView } from '@/components/walmart/AXHeartView';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { useCart } from '@/contexts/CartContext';
import { ItemTileBadgeType } from '@/components/walmart/AXItemTile';
import styles from './FlashDealsItemTile.module.css';

const BADGE_VARIANT_MAP: Record<ItemTileBadgeType, import('@/components/walmart/AXFlag').AXFlagVariant> = {
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
          <QuantityStepper
            variant="secondary"
            size="small"
            showTrashOnRemove
            onChange={(qty) => setItemQuantity(idx, qty)}
          />
        ) : (
          <Button variant="secondary" size="small" onClick={() => {}}>
            Options
          </Button>
        )}
      </div>
    </div>
  );
}
