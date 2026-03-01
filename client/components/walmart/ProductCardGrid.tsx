import { useState } from "react";
import { Heart, HeartFill } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import styles from "./ProductCardGrid.module.css";

export interface ProductCardGridProps {
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
  onAddToCart?: () => void;
}

export function ProductCardGrid({
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
  onAddToCart,
}: ProductCardGridProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className={styles.card}>
      {/* Image area */}
      <div className={styles.imageArea}>
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

      {/* Content */}
      <div className={styles.content}>
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

        <p className={styles.productName}>{name}</p>

        <div className={styles.ratingRow}>
          <Rating value={rating} size="small" />
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        {pickup && (
          <p className={styles.pickup}>
            Pickup <span className={styles.pickupBold}>{pickup}</span>
          </p>
        )}

        <div className={styles.addToCart}>
          <Button
            variant="primary"
            size="small"
            isFullWidth
            onClick={onAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
