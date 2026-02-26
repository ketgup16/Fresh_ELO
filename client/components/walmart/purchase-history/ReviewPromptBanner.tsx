import { useState, useRef, useCallback } from 'react';
import { X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Rating } from '@/components/ui/Rating';
import styles from './ReviewPromptBanner.module.css';

export interface ReviewProduct {
  name: string;
  imageSrc: string;
  rating?: number; // 0–5, supports .5
}

interface ReviewPromptBannerProps {
  products: ReviewProduct[];
  ctaIllustration?: string;
}

/* ── Sub-components ── */

function CtaCard({ ctaIllustration }: { ctaIllustration?: string }) {
  return (
    <div className={styles.ctaCard}>
      <div className={styles.ctaText}>
        <p className={styles.ctaHeading}>What&rsquo;d you think?</p>
        <Button variant="secondary" size="small">Review more items</Button>
      </div>
      {ctaIllustration && (
        <img
          src={ctaIllustration}
          alt="Review items illustration"
          className={styles.ctaIllustration}
        />
      )}
    </div>
  );
}

function ProductReviewCard({ product }: { product: ReviewProduct }) {
  return (
    <div className={styles.productCard}>
      <img
        src={product.imageSrc}
        alt={product.name}
        className={styles.productImg}
      />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        {product.rating !== undefined && (
          <Rating value={product.rating} size="small" />
        )}
      </div>
    </div>
  );
}

/* ── Mobile carousel card wrapper ── */

function MobileCard({ product }: { product: ReviewProduct }) {
  return (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardInner}>
        <img
          src={product.imageSrc}
          alt={product.name}
          className={styles.mobileProductImg}
        />
        <div className={styles.mobileProductInfo}>
          <p className={styles.mobileProductName}>{product.name}</p>
          {product.rating !== undefined && (
            <Rating value={product.rating} size="small" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */

export function ReviewPromptBanner({ products, ctaIllustration }: ReviewPromptBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalSlides = products.length;

  const getCardWidth = useCallback(() => {
    if (!carouselRef.current) return 0;
    const el = carouselRef.current;
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return 0;
    return firstCard.offsetWidth + 16; // card width + gap
  }, []);

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const cardWidth = getCardWidth();
    if (!cardWidth) return;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(idx, totalSlides - 1));
  }, [totalSlides, getCardWidth]);

  const scrollToSlide = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = getCardWidth();
    if (!cardWidth) return;
    carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  }, [getCardWidth]);

  if (dismissed) return null;

  return (
    <section className={styles.wrapper}>
      {/* ── Desktop ── */}
      <div className={styles.desktop}>
        <div className={styles.titleRow}>
          <p className={styles.subtitle}>Help other customers by writing a review.</p>
          <IconButton
            aria-label="Dismiss review prompt"
            variant="ghost"
            size="small"
            onClick={() => setDismissed(true)}
          >
            <X />
          </IconButton>
        </div>

        <div className={styles.cardRow}>
          <CtaCard ctaIllustration={ctaIllustration} />
          {products.map((p, i) => (
            <ProductReviewCard key={i} product={p} />
          ))}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className={styles.mobile}>
        <div className={styles.mobileHeader}>
          <h2 className={styles.mobileHeading}>What&rsquo;d you think?</h2>
          <IconButton
            aria-label="Dismiss review prompt"
            variant="ghost"
            size="small"
            onClick={() => setDismissed(true)}
          >
            <X />
          </IconButton>
        </div>

        <div
          className={styles.carousel}
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {products.map((p, i) => (
            <MobileCard key={i} product={p} />
          ))}
        </div>

        {totalSlides > 1 && (
          <div className={styles.dots}>
            {products.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
