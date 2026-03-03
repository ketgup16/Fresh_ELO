import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, FlashFill, X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { GetItNowModal } from './purchase-history/GetItNowModal';
import styles from './ActiveCurbsideCard.module.css';

const INITIAL_SECONDS = 57 * 60 + 23; // 57:23

interface ActiveCurbsideCardProps {
  productImage?: string;
  productName?: string;
  productPrice?: string;
  location?: string;
  orderTotal?: string;
}

export function ActiveCurbsideCard({
  productImage = 'https://api.builder.io/api/v1/image/assets/TEMP/73ac8b48f0f8a533bc0a6d04f64984317785bfb1?width=64',
  productName = 'Great Value Whole Vitamin D Milk, Gallon Plastic Jug',
  productPrice = '$3.36',
  location = 'Carrollton Supercenter',
  orderTotal = '$85.00',
}: ActiveCurbsideCardProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showGetItNow, setShowGetItNow] = useState(false);
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    if (dismissed || seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [dismissed, seconds]);

  const formatTime = useCallback((totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, []);

  if (dismissed) return null;

  // Timer urgency: > 30min = blue, 10-30min = yellow, < 10min = red
  const timerVariant =
    seconds > 30 * 60 ? 'blue' : seconds > 10 * 60 ? 'warning' : 'expiring';

  const timerLabel =
    timerVariant === 'blue' ? 'left to edit' : 'left to edit';

  return (
    <>
      <article className={styles.card}>
        <div className={styles.cardContent}>
          {/* Timer row */}
          <div className={styles.timerRow}>
            <div className={`${styles.timerBadge} ${styles[`timerBadge--${timerVariant}`]}`}>
              <span className={styles.timerText}>{formatTime(seconds)}</span>
            </div>
            <span className={styles.timerLabel}>{timerLabel}</span>
            <IconButton
              aria-label="Dismiss"
              variant="ghost"
              size="small"
              onClick={() => setDismissed(true)}
              UNSAFE_className={styles.dismissBtn}
            >
              <X width={16} height={16} />
            </IconButton>
          </div>

          {/* Product row */}
          <div className={styles.productRow}>
            <img
              src={productImage}
              alt={productName}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <span className={styles.productName}>{productName}</span>
            </div>
            <span className={styles.productPrice}>{productPrice}</span>
          </div>

          {/* Actions row */}
          <div className={styles.actionsRow}>
            <Button
              variant="secondary"
              size="small"
              onClick={() => {}}
              UNSAFE_className={styles.actionButton}
            >
              View order
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => setShowGetItNow(true)}
              UNSAFE_className={styles.actionButton}
            >
              <FlashFill width={16} height={16} style={{ color: 'var(--ld-semantic-color-feedback-caution, #F5A623)' }} />
              Get it now
            </Button>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span className={styles.footerLocation}>
              Curbside pickup at {location}
            </span>
            <ChevronRight width={16} height={16} className={styles.footerChevron} />
          </div>
        </div>
      </article>

      <GetItNowModal
        open={showGetItNow}
        onClose={() => setShowGetItNow(false)}
        location={location}
        orderTotal={orderTotal}
      />
    </>
  );
}
