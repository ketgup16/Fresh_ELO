import { useState } from 'react';
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
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="8" fill="#F8F8F8" />
    <circle cx="8" cy="8" r="5.5" fill="#F8F8F8" stroke="#74767C" />
  </svg>
);

const ClockInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="8" fill="#F8F8F8" />
    <circle cx="8" cy="8" r="5.5" fill="#6DD400" stroke="#1D5F02" />
  </svg>
);

const ShiftTimeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={styles.widget}>
      <div className={styles.inner}>
        {/* Top row: status + info (left) + illustration (right, mobile only) */}
        <div className={styles.topRow}>
          <div className={styles.infoColumn}>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>
                {isClockedIn ? 'Clocked in' : 'Clocked out'}
              </span>
              <span className={styles.statusIcon} data-clocked-in={isClockedIn}>
                {isClockedIn ? <ClockInIcon /> : <ClockOutIcon />}
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
          {/* Illustration — hidden on desktop via CSS, hidden entirely if image fails */}
          {!imgFailed && (
            <div className={styles.illustration} aria-hidden="true">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/02297b1ff48d4a2f8e4d9ed415c47ecf/031d65b9663f48959e6a5988fb84a308"
                alt=""
                className={styles.illustrationImg}
                onError={() => setImgFailed(true)}
              />
            </div>
          )}
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
