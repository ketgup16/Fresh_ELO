import React from 'react';
import { Clock } from '@/components/icons/Clock';
import { useWCPTimer } from '@/hooks/use-wcp-timer';
import type { WCPTimerUrgency } from '@/hooks/use-wcp-timer';
import styles from './WCPTimerView.module.css';

export type WCPTimerVariant = 'default' | 'compact' | 'badge';

export interface WCPTimerViewProps {
  endTime: Date | number | string;
  variant?: WCPTimerVariant;
  label?: string;
  showLabel?: boolean;
  onExpire?: () => void;
  /** Render inline — for docs / static previews */
  inline?: boolean;
  className?: string;
}

// ── Unit block (used in "default" variant) ─────────────────────────────────
function UnitBlock({ value, unit }: { value: number; unit: string }) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className={styles.unitBlock}>
      <span className={styles.unitValue}>{pad(value)}</span>
      <span className={styles.unitLabel}>{unit}</span>
    </div>
  );
}

// ── Urgency → CSS class map ────────────────────────────────────────────────
const URGENCY_CLASS: Record<WCPTimerUrgency, string> = {
  normal: styles.urgencyNormal,
  warning: styles.urgencyWarning,
  critical: styles.urgencyCritical,
};

// ─────────────────────────────────────────────────────────────────────────────
export const WCPTimerView: React.FC<WCPTimerViewProps> = ({
  endTime,
  variant = 'default',
  label = 'Offer ends in',
  showLabel = true,
  onExpire,
  inline: _inline,
  className,
}) => {
  const timer = useWCPTimer(endTime, onExpire);
  const urgencyClass = URGENCY_CLASS[timer.urgency];
  const ariaLabel = timer.isExpired
    ? 'Offer has ended'
    : `${label}: ${timer.hours > 0 ? `${timer.hours} hours ` : ''}${timer.minutes} minutes ${timer.seconds} seconds remaining`;

  // ── badge variant ─────────────────────────────────────────────────────────
  if (variant === 'badge') {
    return (
      <div
        role="timer"
        aria-live="polite"
        aria-label={ariaLabel}
        className={[styles.badge, urgencyClass, className].filter(Boolean).join(' ')}
      >
        <Clock width={12} height={12} className={styles.badgeIcon} aria-hidden="true" />
        <span className={styles.badgeTime}>{timer.formatted}</span>
      </div>
    );
  }

  // ── compact variant ───────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <div
        role="timer"
        aria-live="polite"
        aria-label={ariaLabel}
        className={[styles.compact, urgencyClass, className].filter(Boolean).join(' ')}
      >
        {showLabel && <span className={styles.compactLabel}>{label}</span>}
        <span className={styles.compactTime}>{timer.formatted}</span>
      </div>
    );
  }

  // ── default variant (stacked blocks) ─────────────────────────────────────
  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={ariaLabel}
      className={[styles.root, urgencyClass, className].filter(Boolean).join(' ')}
    >
      {showLabel && <p className={styles.label}>{label}</p>}
      <div className={styles.blocks}>
        {timer.hours > 0 && <UnitBlock value={timer.hours} unit="HRS" />}
        <UnitBlock value={timer.minutes} unit="MIN" />
        <UnitBlock value={timer.seconds} unit="SEC" />
      </div>
    </div>
  );
};

export default WCPTimerView;
