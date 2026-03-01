import { useState } from "react";
import { Heart, HeartFill } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
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
}: ProductCardListProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className={styles.card}>
      {/* Image column */}
      <div className={styles.imageCol}>
        {flag && (
          <div className={[styles.flag, flagVariant === 'red' ? styles.flagRed : ''].filter(Boolean).join(' ')}>
            {flag}
          </div>
        )}
        <button
          className={styles.favoriteButton}
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorited ? (
            <HeartFill className={styles.heartFilled} />
          ) : (
            <Heart className={styles.heartEmpty} />
          )}
        </button>
        <img src={image} alt={name} className={styles.productImage} />
      </div>

      {/* Content column */}
      <div className={styles.contentCol}>
        {/* Price */}
        <div className={styles.priceRow}>
          {wasPrice ? (
            <>
              <span className={`${styles.priceSup} ${styles.priceAccent}`}>Now $</span>
              <span className={styles.priceAccent}>{price}</span>
              <span className={`${styles.priceSup} ${styles.priceAccent}`}>{cents}</span>
              {' '}
              <span className={styles.priceStrike}>{wasPrice}</span>
            </>
          ) : (
            <>
              <span className={styles.priceSup}>$</span>
              {price}
              <span className={styles.priceSup}>{cents}</span>
            </>
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
