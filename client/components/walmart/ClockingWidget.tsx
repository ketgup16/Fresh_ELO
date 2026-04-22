import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import styles from './ClockingWidget.module.css';

export type ClockState = 'clocked-out' | 'clocked-in';

interface ClockingWidgetProps {
  clockState?: ClockState;
  role?: string;
  shiftTime?: string;
  lunchTime?: string;
  storeNumber?: string;
  walmartWeek?: string;
  illustrationSrc?: string;
  onClockIn?: () => void;
  onViewTimecard?: () => void;
}

const ClockOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ClockInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" fill="currentColor" />
  </svg>
);

const ShiftTimeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LunchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 2V6C5 7.10457 5.89543 8 7 8H9C10.1046 8 11 7.10457 11 6V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FacilityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 14V6L8 2L14 6V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="6" y="9" width="4" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ClockButtonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ClockingWidget({
  clockState = 'clocked-out',
  role = 'Food & Consumables TL',
  shiftTime = 'Today, 7:30am – 4:00pm',
  lunchTime = '12:00pm – 12:30pm',
  storeNumber = 'Store #972',
  walmartWeek = 'WM WK 9',
  illustrationSrc = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fassociates-illustration',
  onClockIn,
  onViewTimecard,
}: ClockingWidgetProps) {
  const isClockedIn = clockState === 'clocked-in';

  return (
    <div className={styles.widget}>
      <div className={styles.inner}>
        {/* Top row: status + info (left) + illustration (right, mobile only) */}
        <div className={styles.topRow}>
          <div className={styles.infoColumn}>
            <div className={styles.statusRow}>
              <span className={styles.statusIcon} data-clocked-in={isClockedIn}>
                {isClockedIn ? <ClockInIcon /> : <ClockOutIcon />}
              </span>
              <span className={styles.statusLabel}>
                {isClockedIn ? 'Clocked in' : 'Clocked out'}
              </span>
            </div>
            <p className={styles.role}>{role}</p>
            <div className={styles.attributes}>
              <span className={styles.attribute}>
                <ShiftTimeIcon />
                {shiftTime}
              </span>
              <span className={styles.attribute}>
                <LunchIcon />
                {lunchTime}
              </span>
              <span className={styles.attribute}>
                <FacilityIcon />
                {storeNumber}
                <span className={styles.separator}>|</span>
                {walmartWeek}
              </span>
            </div>
          </div>
          {/* Illustration — hidden on desktop via CSS */}
          <div className={styles.illustration} aria-hidden="true">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F0166eb2e8ae249b480f893689d9764fb?format=webp&width=800&height=1200"
              alt=""
              className={styles.illustrationImg}
            />
          </div>
        </div>

        {/* Actions row */}
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="medium"
            leading={<ClockButtonIcon />}
            UNSAFE_className={styles.clockButton}
            onClick={onClockIn}
          >
            Clock in
          </Button>
          <LinkButton color="white" size="small" onClick={onViewTimecard}>
            View timecard
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
