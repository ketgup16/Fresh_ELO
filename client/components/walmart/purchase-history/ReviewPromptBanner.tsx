import { useState, useRef } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (dismissed) return null;

  // Total number of cards: 1 CTA + product cards
  const totalCards = 1 + products.length;

  function handleScroll() {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    setActiveIndex(Math.round(scrollLeft / offsetWidth));
  }

  function scrollToCard(index: number) {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({ left: index * carouselRef.current.offsetWidth, behavior: 'smooth' });
  }

  return (
    <div className={styles.banner}>
      {/* Header */}
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

      {/* Desktop: static flex row */}
      <div className={styles.cardsDesktop}>
        {/* Card 1: CTA */}
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaHeading}>What'd you think?</p>
            <Button variant="secondary" size="small">Review more items</Button>
          </div>
          {/* product images stacked visually */}
          <div className={styles.ctaImages}>
            {products.slice(0, 2).map((p, i) => (
              <img
                key={i}
                src={p.imageSrc}
                alt={p.name}
                className={styles.ctaImg}
                style={{ zIndex: products.length - i }}
              />
            ))}
          </div>
        </div>

        {/* Product review cards */}
        {products.map((p, i) => (
          <div key={i} className={styles.productCard}>
            <div className={styles.productRow}>
              <img src={p.imageSrc} alt={p.name} className={styles.productImg} />
              <div className={styles.productInfo}>
                <p className={styles.productName}>{p.name}</p>
                {p.rating !== undefined && <StarRating rating={p.rating} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div
        className={styles.cardsMobile}
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {/* CTA card */}
        <div className={styles.carouselCard}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaHeading}>What'd you think?</p>
            <Button variant="secondary" size="small">Review more items</Button>
          </div>
          <div className={styles.ctaImages}>
            {products.slice(0, 2).map((p, i) => (
              <img key={i} src={p.imageSrc} alt={p.name} className={styles.ctaImg} style={{ zIndex: products.length - i }} />
            ))}
          </div>
        </div>

        {products.map((p, i) => (
          <div key={i} className={`${styles.carouselCard} ${styles.carouselProductCard}`}>
            <div className={styles.productRow}>
              <img src={p.imageSrc} alt={p.name} className={styles.productImg} />
              <div className={styles.productInfo}>
                <p className={styles.productName}>{p.name}</p>
                {p.rating !== undefined && <StarRating rating={p.rating} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile pagination dots */}
      <div className={styles.dots}>
        {Array.from({ length: totalCards }).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
