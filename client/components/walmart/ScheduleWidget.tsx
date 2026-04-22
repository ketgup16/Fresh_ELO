import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import styles from './ScheduleWidget.module.css';

export interface Shift {
  id: string;
  dateLabel: string;
  role: string;
  lunchTime: string;
  store: string;
  isOffsite?: boolean;
  showReportAbsence?: boolean;
}

interface ScheduleWidgetProps {
  shifts?: Shift[];
  onViewFullSchedule?: () => void;
  onReportAbsence?: () => void;
}

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 14C3 11.2386 5.23858 9 8 9C10.7614 9 13 11.2386 13 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
  </svg>
);

function ShiftItem({ shift, onReportAbsence }: { shift: Shift; onReportAbsence?: () => void }) {
  return (
    <div className={styles.shiftItem}>
      <button type="button" className={styles.shiftRow} aria-label={`View shift details for ${shift.dateLabel}`}>
        <div className={styles.shiftMain}>
          <div className={styles.shiftHeader}>
            <span className={styles.shiftDate}>{shift.dateLabel}</span>
            {shift.isOffsite && (
              <Tag variant="tertiary" color="brand">Offsite</Tag>
            )}
          </div>
          <div className={styles.shiftDetails}>
            <span className={styles.shiftDetail}>
              <UserIcon />
              {shift.role}
            </span>
            <span className={styles.shiftDetail}>
              <LunchIcon />
              {shift.lunchTime}
            </span>
            <span className={styles.shiftDetail}>
              <FacilityIcon />
              {shift.store}
            </span>
          </div>
        </div>
        <span className={styles.chevron}>
          <ChevronRightIcon />
        </span>
      </button>

      {shift.showReportAbsence && (
        <div className={styles.reportAbsenceRow}>
          <Button
            variant="secondary"
            size="medium"
            isFullWidth
            onClick={onReportAbsence}
          >
            Report an absence
          </Button>
        </div>
      )}

      <div className={styles.shiftDivider} role="separator" aria-hidden="true" />
    </div>
  );
}

export function ScheduleWidget({
  shifts = [],
  onViewFullSchedule,
  onReportAbsence,
}: ScheduleWidgetProps) {
  return (
    <div className={styles.widget}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Your schedule</h2>
          <LinkButton size="small" onClick={onViewFullSchedule}>
            View full schedule
          </LinkButton>
        </div>
        <p className={styles.subtitle}>
          Your next 3 shifts are shown. See your full schedule for all upcoming shifts.
        </p>
      </div>

      {/* Shift list */}
      <div className={styles.shiftList}>
        {shifts.map((shift) => (
          <ShiftItem key={shift.id} shift={shift} onReportAbsence={onReportAbsence} />
        ))}
      </div>

      {/* Footer promo card */}
      <div className={styles.promoCard}>
        <p className={styles.promoTitle}>See more of your schedule</p>
        <p className={styles.promoText}>
          See all your shifts, and explore tools that put you in control of your schedule with ease and flexibility.
        </p>
        <Button variant="tertiary" size="small" onClick={onViewFullSchedule}>
          View full schedule
        </Button>
      </div>
    </div>
  );
}
