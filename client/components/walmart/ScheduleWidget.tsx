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
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 1H3.5V4.84424C3.5 4.90845 3.51172 4.96973 3.5332 5.02612C3.56836 5.2522 3.62891 5.47485 3.71484 5.68799L4.08984 6.62866C4.36914 7.32324 4.48633 7.72729 4.4375 8.47388L4.13086 13.071C4.09766 13.5737 4.49609 14 5 14C5.50391 14 5.90234 13.5737 5.86914 13.071L5.5625 8.47388C5.51367 7.72729 5.63086 7.32324 5.91016 6.62866L6.28516 5.68799C6.37109 5.47485 6.42969 5.25366 6.46484 5.02759C6.48633 4.9707 6.5 4.90894 6.5 4.84424V1H7.5V4.57397C7.5 5.08276 7.40234 5.58691 7.21484 6.05957L6.83789 7C6.61523 7.55566 6.52148 7.81006 6.56055 8.40723L6.86719 13.0044C6.93945 14.0845 6.08203 15 5 15C4.46875 15 3.99219 14.7793 3.65234 14.4268C3.29883 14.0613 3.0957 13.5542 3.13281 13.0044L3.43945 8.40723C3.47852 7.81006 3.38477 7.55566 3.16211 7L2.78516 6.05957C2.59766 5.58691 2.5 5.08276 2.5 4.57397V1Z" fill="currentColor"/>
    <path d="M3.84961 1V4.5C3.84961 4.77614 4.07347 5 4.34961 5C4.62575 5 4.84961 4.77614 4.84961 4.5V1H3.84961Z" fill="currentColor"/>
    <path d="M8.5 3.5C8.5 2.11929 9.61929 1 11 1C12.3807 1 13.5 2.11929 13.5 3.5V4.46001C13.5 5.14394 13.3408 5.81847 13.0349 6.4302C12.6846 7.13072 12.5275 7.91195 12.5796 8.69343L12.867 13.0044C12.939 14.0844 12.0824 15 11 15C9.91763 15 9.06104 14.0844 9.13304 13.0044L9.42044 8.69343C9.47254 7.91195 9.31536 7.13072 8.9651 6.4302C8.65924 5.81847 8.5 5.14394 8.5 4.46001V3.5ZM10.1308 13.0709C10.0973 13.5737 10.4961 14 11 14C11.5039 14 11.9027 13.5737 11.8692 13.0709L11.5818 8.75995C11.5179 7.80109 11.7107 6.84252 12.1405 5.98298C12.3769 5.51011 12.5 4.98869 12.5 4.46001V3.5C12.5 2.67157 11.8284 2 11 2C10.1716 2 9.5 2.67157 9.5 3.5V4.46001C9.5 4.98869 9.62309 5.51011 9.85952 5.98298C10.2893 6.84252 10.4821 7.80109 10.4182 8.75995L10.1308 13.0709Z" fill="currentColor"/>
    <path d="M5.15039 4.5V1H6.15039V4.5C6.15039 4.77614 5.92653 5 5.65039 5C5.37425 5 5.15039 4.77614 5.15039 4.5Z" fill="currentColor"/>
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
