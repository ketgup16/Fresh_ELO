import React from 'react';
import { useWCPTimer } from '@/hooks/use-wcp-timer';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import styles from './WCPQueueCard.module.css';

// ── Variant types ─────────────────────────────────────────────────────────────
/** `waiting`  → light-blue badge, "estimated wait" label
 *  `warning`  → yellow badge, "left to buy" label
 *  `expiring` → red badge, "left to buy" label */
export type WCPQueueCardVariant = 'waiting' | 'warning' | 'expiring';

// ── Props ─────────────────────────────────────────────────────────────────────
export interface WCPQueueCardProps {
  /** Controls badge colour and default label text */
  variant?: WCPQueueCardVariant;
  /** End time for the live countdown. When omitted, `displayTime` is shown. */
  endTime?: Date | number | string;
  /** Static time string shown when `endTime` is not provided (e.g. "57mins") */
  displayTime?: string;
  /** Override the default label next to the timer badge */
  timerLabel?: string;
  /** 40×40 product thumbnail URL */
  productImage?: string;
  productImageAlt?: string;
  productName: string;
  /** Primary price, e.g. "$499.90" */
  price: string;
  /** Strikethrough / was-price, e.g. "$600.00" */
  wasPrice?: string;
  onLeaveQueue?: () => void;
  onView?: () => void;
  /** Label for the leave queue link */
  leaveLabel?: string;
  /** Label for the view CTA button */
  viewLabel?: string;
}

// ── Default labels ────────────────────────────────────────────────────────────
const DEFAULT_LABELS: Record<WCPQueueCardVariant, string> = {
  waiting: 'estimated wait',
  warning: 'left to buy',
  expiring: 'left to buy',
};

// ── Timer pill (live or static) ───────────────────────────────────────────────
interface TimerPillProps {
  endTime?: Date | number | string;
  displayTime?: string;
  variant: WCPQueueCardVariant;
}

function TimerPill({ endTime, displayTime, variant }: TimerPillProps) {
  const pillClass = [styles.timerPill, styles[`timerPill--${variant}`]].join(' ');

  if (endTime) {
    return <LiveTimerPill endTime={endTime} variant={variant} pillClass={pillClass} />;
  }

  return (
    <div className={pillClass}>
      <span className={styles.timerTime}>{displayTime ?? '—'}</span>
    </div>
  );
}

function LiveTimerPill({
  endTime,
  pillClass,
}: {
  endTime: Date | number | string;
  variant: WCPQueueCardVariant;
  pillClass: string;
}) {
  const timer = useWCPTimer(endTime);
  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`${timer.formatted} remaining`}
      className={pillClass}
    >
      <span className={styles.timerTime}>{timer.formatted}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export const WCPQueueCard: React.FC<WCPQueueCardProps> = ({
  variant = 'waiting',
  endTime,
  displayTime,
  timerLabel,
  productImage,
  productImageAlt = '',
  productName,
  price,
  wasPrice,
  onLeaveQueue,
  onView,
  leaveLabel = 'Leave the line',
  viewLabel = 'View',
}) => {
  const label = timerLabel ?? DEFAULT_LABELS[variant];

  return (
    <div className={styles.card}>
      {/* ── Content ─────────────────────────────────────────────── */}
      <div className={styles.content}>
        {/* Timer row */}
        <div className={styles.timerRow}>
          <TimerPill endTime={endTime} displayTime={displayTime} variant={variant} />
          <span className={styles.timerLabel}>{label}</span>
        </div>

        {/* Product row */}
        <div className={styles.productRow}>
          <div className={styles.productImage} aria-hidden={!productImageAlt}>
            {productImage ? (
              <img src={productImage} alt={productImageAlt} className={styles.productImg} />
            ) : (
              <div className={styles.productImgPlaceholder} aria-hidden="true" />
            )}
          </div>

          <span className={styles.productName}>{productName}</span>

          <div className={styles.pricing}>
            <span className={styles.price}>{price}</span>
            {wasPrice && <span className={styles.wasPrice}>{wasPrice}</span>}
          </div>
        </div>
      </div>

      {/* ── Actions ─────────────────────────────────────────────── */}
      <div className={styles.actions}>
        <Link href="#" onClick={(e) => { e.preventDefault(); onLeaveQueue?.(); }} variant="default">
          {leaveLabel}
        </Link>
        <Button variant="secondary" size="medium" onClick={onView}>
          {viewLabel}
        </Button>
      </div>
    </div>
  );
};

export default WCPQueueCard;
