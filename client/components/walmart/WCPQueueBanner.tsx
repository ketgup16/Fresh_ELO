import React from 'react';
import { Clock } from '@/components/icons/Clock';
import { X } from '@/components/icons/X';
import { Button } from '@/components/ui/Button';
import { WCPTimerView } from './WCPTimerView';
import { useWCPTimer } from '@/hooks/use-wcp-timer';
import styles from './WCPQueueBanner.module.css';

export interface WCPQueueBannerProps {
  endTime: Date | number | string;
  title?: string;
  message?: string;
  ctaLabel?: string;
  onCta?: () => void;
  onDismiss?: () => void;
  showDismiss?: boolean;
  /** 'top' = sticky fixed below nav; 'inline' = in-flow */
  position?: 'top' | 'inline';
  onExpire?: () => void;
  /** Render without fixed positioning — for docs/demo */
  inline?: boolean;
}

export const WCPQueueBanner: React.FC<WCPQueueBannerProps> = ({
  endTime,
  title = 'Your cart is reserved',
  message = 'Complete checkout before time runs out',
  ctaLabel = 'Checkout now',
  onCta,
  onDismiss,
  showDismiss = true,
  position = 'top',
  onExpire,
  inline: isInline = false,
}) => {
  const timer = useWCPTimer(endTime, onExpire);

  const bannerClass = [
    styles.banner,
    styles[timer.urgency],
    position === 'top' && !isInline ? styles.sticky : styles.inFlow,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={bannerClass}
      role="banner"
      aria-label={`Queue reservation banner: ${title}`}
    >
      {/* Leading icon */}
      <div className={styles.iconWrap} aria-hidden="true">
        <Clock width={20} height={20} className={styles.leadIcon} />
      </div>

      {/* Text */}
      <div className={styles.textWrap}>
        <span className={styles.title}>{title}</span>
        <span className={styles.message}>{message}</span>
      </div>

      {/* Timer */}
      <div className={styles.timerWrap}>
        <WCPTimerView
          endTime={endTime}
          variant="compact"
          label="Ends in"
          showLabel
          className={styles.timer}
        />
      </div>

      {/* CTA */}
      {ctaLabel && (
        <div className={styles.ctaWrap}>
          <Button
            variant="primary"
            size="small"
            onClick={onCta}
          >
            {ctaLabel}
          </Button>
        </div>
      )}

      {/* Dismiss */}
      {showDismiss && onDismiss && (
        <button
          type="button"
          className={styles.dismissBtn}
          onClick={onDismiss}
          aria-label="Dismiss queue banner"
        >
          <X width={16} height={16} className={styles.dismissIcon} />
        </button>
      )}
    </div>
  );
};

export default WCPQueueBanner;
