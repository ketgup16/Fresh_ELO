import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { WCPHeartView } from "./WCPHeartView";
import { WCPTimerView } from "./WCPTimerView";
import styles from "./ProductCardList.module.css";

export interface ProductCardListProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  wasPrice?: string;
  flag?: string;
  flagVariant?: 'default' | 'red';
  rating: number;
  ratingCount: string;
  pickup?: string;
  stock?: string;
  cue?: string;
  brand?: string;
  unitPrice?: string;
  ebt?: boolean;
  onAddToCart?: () => void;
  /** Optional countdown end time — shows a badge timer over the image */
  timerEndTime?: Date | number | string;
  timerLabel?: string;
}

export function ProductCardList({
  image,
  name,
  price,
  cents,
  wasPrice,
  flag,
  flagVariant = 'default',
  rating,
  ratingCount,
  pickup,
  stock,
  cue,
  unitPrice,
  ebt,
  onAddToCart,
  timerEndTime,
  timerLabel = 'Ends in',
}: ProductCardListProps) {
  return (
    <div className={styles.card}>
      {/* Image column */}
      <div className={styles.imageCol}>
        {flag && (
          <div className={[styles.flag, flagVariant === 'red' ? styles.flagRed : ''].filter(Boolean).join(' ')}>
            {flag}
          </div>
        )}
        <div className={styles.favoriteButton}>
          <WCPHeartView size="small" calloutPosition="right" />
        </div>
        <img src={image} alt={name} className={styles.productImage} />
        {timerEndTime && (
          <div className={styles.timerBadge}>
            <WCPTimerView endTime={timerEndTime} variant="badge" label={timerLabel} showLabel={false} />
          </div>
        )}
      </div>

      {/* Content column */}
      <div className={styles.contentCol}>
        {/* Price — matches WCPItemTile superscript pattern */}
        <div className={[styles.priceRow, wasPrice ? styles.priceRowSavings : ''].filter(Boolean).join(' ')}>
          {wasPrice && (
            <span className={styles.prefix}>Now </span>
          )}
          <span className={styles.dollarSign}>$</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.cents}>{cents}</span>
          {wasPrice && (
            <span className={styles.priceStrike}>{wasPrice}</span>
          )}
        </div>

        {unitPrice && <p className={styles.unitPrice}>{unitPrice}</p>}

        <p className={styles.productName}>{name}</p>

        {cue && <p className={styles.cue}>{cue}</p>}

        <div className={styles.ratingRow}>
          <Rating value={rating} size="small" />
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        {ebt && <span className={styles.ebt}>EBT eligible</span>}

        {pickup && (
          <p className={styles.pickup}>
            Pickup <span className={styles.pickupBold}>{pickup}</span>
          </p>
        )}

        {stock && <p className={styles.stock}>{stock}</p>}

        <div className={styles.addToCart}>
          <Button variant="primary" size="small" onClick={onAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
