import React from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { Warning } from '@/components/icons/Warning';
import { X } from '@/components/icons/X';
import { WCPTimerView } from './WCPTimerView';
import { useWCPTimer } from '@/hooks/use-wcp-timer';
import styles from './WCPQueueBanner.module.css';

export type WCPQueueBannerVariant = 'lineJoined' | 'checkout' | 'error';

export interface WCPQueueBannerProps {
  endTime: Date | number | string;
  /** Banner variant matching Figma states */
  variant?: WCPQueueBannerVariant;

  /* ── Line-joined variant props ─────────────────────────────── */
  /** Product thumbnail URL (32×32) */
  productImage?: string;
  /** Alt text for product image */
  productImageAlt?: string;
  /** Text next to the timer badge on the white card */
  reservationText?: string;
  /** "View" link label */
  viewLabel?: string;
  /** Called when View is clicked */
  onView?: () => void;
  /** "Leave" link label */
  leaveLabel?: string;
  /** Called when Leave is clicked */
  onLeave?: () => void;
  /** Link row text below the card */
  linkText?: string;
  /** Called when the link row is clicked */
  onLink?: () => void;
  /** Whether to show the link row */
  showLinkRow?: boolean;

  /* ── Checkout variant props ────────────────────────────────── */
  /** Message displayed next to the timer (checkout variant) */
  queueMessage?: string;
  /** Called when close/dismiss button is clicked */
  onDismiss?: () => void;
  /** Whether to show the dismiss X button (checkout variant) */
  showDismiss?: boolean;

  /* ── Error variant props ───────────────────────────────────── */
  /** Error/loading message text */
  errorMessage?: string;

  /* ── Positioning ───────────────────────────────────────────── */
  /** 'top' = sticky; 'bottom' = fixed above bottom nav; 'inline' = in-flow */
  position?: 'top' | 'bottom' | 'inline';
  onExpire?: () => void;
  /** Force in-flow rendering (for docs/demos) */
  inline?: boolean;

  /* ── Legacy props (backward compat) ────────────────────────── */
  /** @deprecated Use reservationText */
  title?: string;
  /** @deprecated Use queueMessage */
  message?: string;
  /** @deprecated Use viewLabel + onView */
  ctaLabel?: string;
  /** @deprecated Use onView */
  onCta?: () => void;
}

export const WCPQueueBanner: React.FC<WCPQueueBannerProps> = ({
  endTime,
  variant = 'lineJoined',
  productImage,
  productImageAlt = '',
  reservationText,
  viewLabel = 'View',
  onView,
  leaveLabel = 'Leave',
  onLeave,
  linkText = 'Placeholder link text',
  onLink,
  showLinkRow = true,
  queueMessage,
  onDismiss,
  showDismiss = true,
  errorMessage = "Hang on, we\u2019re getting you in line. Please don\u2019t refresh or leave the line.",
  position = 'top',
  onExpire,
  inline: isInline = false,
  // Legacy
  title,
  message,
  ctaLabel,
  onCta,
}) => {
  const timer = useWCPTimer(endTime, onExpire);

  // Backward compat: map old props to new
  const resolvedReservationText = reservationText ?? title ?? 'reservation text';
  const resolvedQueueMessage = queueMessage ?? message ?? 'queue messaging';
  const resolvedOnView = onView ?? onCta;

  const positionClass = isInline
    ? styles.inFlow
    : position === 'top'
    ? styles.sticky
    : position === 'bottom'
    ? styles.bottomFixed
    : styles.inFlow;

  // Timer badge color based on urgency
  const badgeColor =
    timer.urgency === 'critical'
      ? 'negative'
      : timer.urgency === 'warning'
      ? 'spark'
      : 'blue';

  if (variant === 'error') {
    return (
      <div className={`${styles.containerWrap} ${positionClass}`}>
        <div
          className={styles.errorContainer}
          role="alert"
          aria-label="Queue error message"
        >
          <Warning className={styles.errorIcon} />
          <span className={styles.errorText}>{errorMessage}</span>
        </div>
      </div>
    );
  }

  if (variant === 'checkout') {
    return (
      <div className={`${styles.containerWrap} ${positionClass}`}>
        <div
          className={styles.checkoutContainer}
          role="banner"
          aria-label="Queue checkout banner"
        >
          <div className={styles.checkoutContent}>
            <div className={styles.checkoutLeft}>
              <WCPTimerView
                endTime={endTime}
                variant="badge"
                badgeColor={badgeColor}
                className={styles.timerBadge}
              />
              <span className={styles.checkoutMessage}>{resolvedQueueMessage}</span>
            </div>
            {showDismiss && onDismiss && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={onDismiss}
                aria-label="Dismiss queue banner"
              >
                <X width={16} height={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default: lineJoined variant
  return (
    <div className={`${styles.containerWrap} ${positionClass}`}>
    <div
      className={styles.outerContainer}
      role="banner"
      aria-label={`Queue banner: ${resolvedReservationText}`}
    >
      {/* White inner card */}
      <div className={styles.card}>
        <div className={styles.barRow}>
          {/* Left group: image + timer + text */}
          <div className={styles.barLeft}>
            {/* Product image placeholder */}
            {productImage ? (
              <img
                src={productImage}
                alt={productImageAlt}
                className={styles.productImg}
              />
            ) : (
              <div className={styles.productImgPlaceholder} aria-hidden="true" />
            )}

            {/* Timer badge */}
            <WCPTimerView
              endTime={endTime}
              variant="badge"
              badgeColor={badgeColor}
              className={styles.timerBadge}
            />

            {/* Reservation text */}
            <span className={styles.reservationText}>{resolvedReservationText}</span>
          </div>

          {/* Right group: View | Leave links */}
          <div className={styles.linkButtons}>
            {resolvedOnView && (
              <LinkButton color="default" size="small" onClick={resolvedOnView}>
                {ctaLabel || viewLabel}
              </LinkButton>
            )}
            {onLeave && (
              <>
                <div className={styles.linkDivider} aria-hidden="true" />
                <LinkButton color="default" size="small" onClick={onLeave}>
                  {leaveLabel}
                </LinkButton>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Link row below the card */}
      {showLinkRow && (
        <button
          type="button"
          className={styles.linkRow}
          onClick={onLink}
        >
          <span className={styles.linkRowText}>{linkText}</span>
          <span className={styles.linkRowChevron}>
            <ChevronRight width={16} height={16} />
          </span>
        </button>
      )}
    </div>
    </div>
  );
};

export default WCPQueueBanner;
