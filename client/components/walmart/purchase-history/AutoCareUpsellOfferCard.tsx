import { Button } from '@/components/ui/Button';
import { Car } from '@/components/icons/Car';
import styles from './AutoCareUpsellOfferCard.module.css';

export interface AutoCareUpsellOfferCardProps {
  /** Customer's vehicle */
  vehicle: string;
  /** e.g. "Last serviced 3,000 miles ago" */
  vehicleSub?: string;
  /** Service being offered */
  serviceName: string;
  /** 0–100, shown as "X% OFF" */
  discountPct: number;
  /** e.g. "$14.88" */
  regularPrice: string;
  /** e.g. "$11.90" */
  memberPrice: string;
  /** Dollar savings, e.g. "$2.98" */
  savings: string;
  /** Days until offer expires */
  expiresInDays: number;
  /** Fine print / terms */
  terms?: string;
  onBook?: () => void;
  onDismiss?: () => void;
}

const SPARK_SRC =
  'https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg';

export function AutoCareUpsellOfferCard({
  vehicle,
  vehicleSub,
  serviceName,
  discountPct,
  regularPrice,
  memberPrice,
  savings,
  expiresInDays,
  terms,
  onBook,
  onDismiss,
}: AutoCareUpsellOfferCardProps) {
  const expiryLabel =
    expiresInDays === 0
      ? 'Expires today'
      : expiresInDays === 1
      ? 'Expires tomorrow'
      : `Expires in ${expiresInDays} days`;

  return (
    <article className={styles.card}>
      {/* ── Left: offer badge panel ── */}
      <div className={styles.offerPanel}>
        {/* Walmart+ badge */}
        <div className={styles.memberBadge}>
          <img src={SPARK_SRC} alt="" aria-hidden="true" className={styles.sparkIcon} />
          <span className={styles.memberBadgeText}>Walmart+ Exclusive</span>
        </div>

        {/* Discount */}
        <div className={styles.discountBlock}>
          <div className={styles.discountPct}>{discountPct}%</div>
          <div className={styles.discountOff}>OFF</div>
          <div className={styles.discountService}>{serviceName}</div>
        </div>

        {/* Countdown */}
        <div className={styles.countdown}>
          <span className={styles.countdownDot} aria-hidden="true" />
          <span className={styles.countdownText}>{expiryLabel}</span>
        </div>
      </div>

      {/* ── Right: details panel ── */}
      <div className={styles.detailPanel}>
        <div>
          <p className={styles.detailEyebrow}>Exclusive offer for you</p>
          <h3 className={styles.detailHeading}>{serviceName}</h3>
        </div>

        {/* Vehicle */}
        <div className={styles.vehicleRow}>
          <Car className={styles.vehicleIcon} aria-hidden="true" />
          <div className={styles.vehicleInfo}>
            <span className={styles.vehicleName}>{vehicle}</span>
            {vehicleSub && <span className={styles.vehicleSub}>{vehicleSub}</span>}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <div className={styles.priceRow}>
            <span className={styles.priceNew}>{memberPrice}</span>
            <span className={styles.priceOld}>{regularPrice}</span>
            <span className={styles.priceSaving}>Save {savings}</span>
          </div>
          {terms && <p className={styles.finePrint}>{terms}</p>}
        </div>

        {/* CTAs */}
        <div className={styles.actions}>
          <Button variant="primary" size="small" onClick={onBook}>
            Claim offer &amp; book
          </Button>
          {onDismiss && (
            <Button variant="tertiary" size="small" onClick={onDismiss}>
              Remind me later
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
