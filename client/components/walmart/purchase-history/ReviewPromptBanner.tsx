import { useState } from 'react';
import { X, Star, StarFill, StarHalf } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import styles from './ReviewPromptBanner.module.css';

interface ReviewProduct {
  name: string;
  imageSrc: string;
  rating?: number; // 0–5, supports .5
}

interface ReviewPromptBannerProps {
  products: ReviewProduct[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) return <StarFill key={i} className={styles.starFilled} />;
        if (rating >= i - 0.5) return <StarHalf key={i} className={styles.starFilled} />;
        return <Star key={i} className={styles.starEmpty} />;
      })}
    </div>
  );
}

export function ReviewPromptBanner({ products }: ReviewPromptBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.header}>
        <p className={styles.prompt}>Help other customers by writing a review.</p>
        <IconButton
          aria-label="Dismiss review prompt"
          variant="ghost"
          size="small"
          onClick={() => setDismissed(true)}
        >
          <X />
        </IconButton>
      </div>

      <div className={styles.products}>
        {/* CTA card */}
        <div className={styles.ctaCard}>
          <div className={styles.ctaImages}>
            {products.slice(0, 2).map((p, i) => (
              <img key={i} src={p.imageSrc} alt={p.name} className={styles.ctaImg} />
            ))}
          </div>
          <Button variant="secondary" size="small">Review more items</Button>
        </div>

        {/* Individual review product cards */}
        {products.map((p, i) => (
          <div key={i} className={styles.productCard}>
            <img src={p.imageSrc} alt={p.name} className={styles.productImg} />
            <p className={styles.productName}>{p.name}</p>
            {p.rating !== undefined && <StarRating rating={p.rating} />}
          </div>
        ))}
      </div>
    </div>
  );
}
