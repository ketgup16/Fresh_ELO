import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft, ChevronRight, Check, X, ArrowLeft,
  Store, UserCircle, CreditCard, Receipt,
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Chip } from '@/components/ui/Chip';
import { Scrim } from '@/components/ui/Scrim';
import type { ServiceDetails } from './OrderCard';
import styles from './AutoCareModals.module.css';

export type AutoCareModalType = 'checkIn' | 'reschedule' | 'viewDetails' | null;
type DetailsStep = 'details' | 'editDate' | 'editTime' | 'booked';

const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ── Scroll lock + Escape key ──────────────────────────────────────────────────
function useModalEffects(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}

// ── Mini Calendar ─────────────────────────────────────────────────────────────
function AppointmentCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date;
  onSelect: (d: Date) => void;
}) {
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isSelected = (d: number) =>
    d === selectedDate.getDate() &&
    viewMonth === selectedDate.getMonth() &&
    viewYear === selectedDate.getFullYear();

  const isPast = (d: number) => new Date(viewYear, viewMonth, d) < today;

  return (
    <div className={styles.calendar}>
      <div className={styles.calNav}>
        <IconButton aria-label="Previous month" variant="ghost" size="small" onClick={prevMonth}>
          <ChevronLeft style={{ width: 20, height: 20 }} />
        </IconButton>
        <span className={styles.calMonthLabel}>{MONTHS_FULL[viewMonth]} {viewYear}</span>
        <IconButton aria-label="Next month" variant="ghost" size="small" onClick={nextMonth}>
          <ChevronRight style={{ width: 20, height: 20 }} />
        </IconButton>
      </div>
      <div className={styles.calGrid}>
        {WEEK_DAYS.map(d => (
          <span key={d} className={styles.calDayHeader}>{d}</span>
        ))}
        {cells.map((d, i) =>
          d === null ? <span key={`e-${i}`} /> : (
            <button
              key={d}
              className={[
                styles.calDay,
                isSelected(d) ? styles.calDaySelected : '',
                isPast(d) ? styles.calDayPast : '',
              ].filter(Boolean).join(' ')}
              onClick={() => !isPast(d) && onSelect(new Date(viewYear, viewMonth, d))}
              disabled={isPast(d)}
              aria-pressed={isSelected(d)}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Check-In Modal ────────────────────────────────────────────────────────────
function CheckInModal({
  open, onClose, serviceDetails, location, statusHeading,
}: {
  open: boolean; onClose: () => void;
  serviceDetails?: ServiceDetails; location?: string; statusHeading: string;
}) {
  const [checkedIn, setCheckedIn] = useState(false);

  useModalEffects(open, onClose);

  if (!open) return null;

  const handleDone = () => { setCheckedIn(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="checkin-title">
        {checkedIn ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="medium" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: '#fff' }} />
            </div>
            <h2 className={styles.confirmedTitle}>You're checked in!</h2>
            <p className={styles.confirmedText}>
              Head inside and let the team know you've arrived. We'll take it from here.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="checkin-title" className={styles.modalTitle}>Check In</h2>
              <IconButton aria-label="Close" variant="ghost" size="medium" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img
                  src="/illustrations/spot-illustration/OilChange.svg"
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{statusHeading}</p>
                  {location && <p className={styles.detailSub}>{location}</p>}
                  {serviceDetails && (
                    <>
                      <p className={styles.detailVehicle}>{serviceDetails.vehicle}</p>
                      <ul className={styles.detailServices}>
                        {serviceDetails.services.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              <p className={styles.checkInNote}>
                Park in any Auto Care bay and a technician will greet you shortly.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>
                Not yet
              </Button>
              <Button variant="primary" onClick={() => setCheckedIn(true)} UNSAFE_className={styles.halfWidthBtn}>
                I'm here, check me in
              </Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Appointment Details Modal (View Details + Reschedule flow) ────────────────
function ViewDetailsModal({
  open, onClose, serviceDetails, location, statusHeading, orderTotal, initialStep,
}: {
  open: boolean; onClose: () => void;
  serviceDetails?: ServiceDetails; location?: string;
  statusHeading: string; orderTotal?: string;
  initialStep: DetailsStep;
}) {
  const [step, setStep] = useState<DetailsStep>(initialStep);
  const [showCallout, setShowCallout] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 2)); // Apr 2
  const [pendingDate, setPendingDate] = useState(new Date(2026, 3, 2));
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [pendingTime, setPendingTime] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(initialStep);
      setShowCallout(true);
    }
  }, [open, initialStep]);

  useModalEffects(open, onClose);

  if (!open) return null;

  const vehicle = serviceDetails?.vehicle ?? '2019 Toyota Camry';
  const serviceName = serviceDetails?.services?.[0] ?? 'Oil change';
  const estTotal = orderTotal ?? '$58.26';
  const storeAddress = location
    ? location.replace('Carrollton Supercenter at ', '')
    : '1213 E Trinity Mills Rd, Carrollton, TX 75006';

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });

  const handleConfirmDate = () => {
    setSelectedDate(pendingDate);
    setStep('details');
  };

  const handleConfirmTime = () => {
    if (pendingTime) setSelectedTime(pendingTime);
    setStep('details');
  };

  // ── Booked success ──
  if (step === 'booked') {
    return createPortal(
      <>
        <Scrim onClick={onClose} style={{ zIndex: 100 }} />
        <div className={styles.modalWrap} role="dialog" aria-modal="true">
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="medium" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: '#fff' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Service booked!</h2>
            <p className={styles.confirmedText}>
              Your <strong>{serviceName}</strong> is booked for <strong>{formattedDate}</strong> at <strong>{selectedTime}</strong>. See you then!
            </p>
            <Button variant="primary" onClick={onClose} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        </div>
      </>,
      document.body
    );
  }

  // ── Edit Date ──
  if (step === 'editDate') {
    return createPortal(
      <>
        <Scrim onClick={onClose} style={{ zIndex: 100 }} />
        <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="edit-date-title">
          <div className={styles.modalHeader}>
            <div className={styles.headerWithBack}>
              <IconButton aria-label="Back" variant="ghost" size="medium" onClick={() => setStep('details')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
              </IconButton>
              <h2 id="edit-date-title" className={styles.modalTitle}>Select Date</h2>
            </div>
            <IconButton aria-label="Close" variant="ghost" size="medium" onClick={onClose}>
              <X style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>
          <div className={styles.editStepBody}>
            <AppointmentCalendar selectedDate={pendingDate} onSelect={setPendingDate} />
          </div>
          <div className={styles.modalFooter}>
            <Button
              variant="primary"
              onClick={handleConfirmDate}
              UNSAFE_className={styles.fullWidthBtn}
            >
              Confirm date
            </Button>
          </div>
        </div>
      </>,
      document.body
    );
  }

  // ── Edit Time ──
  if (step === 'editTime') {
    return createPortal(
      <>
        <Scrim onClick={onClose} style={{ zIndex: 100 }} />
        <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="edit-time-title">
          <div className={styles.modalHeader}>
            <div className={styles.headerWithBack}>
              <IconButton aria-label="Back" variant="ghost" size="medium" onClick={() => setStep('details')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
              </IconButton>
              <h2 id="edit-time-title" className={styles.modalTitle}>Select Time</h2>
            </div>
            <IconButton aria-label="Close" variant="ghost" size="medium" onClick={onClose}>
              <X style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>
          <div className={styles.editStepBody}>
            <p className={styles.editStepHint}>Available time slots for {formattedDate}</p>
            <div className={styles.timeChips}>
              {TIMES.map(t => (
                <Chip
                  key={t}
                  selected={pendingTime === t}
                  onSelectedChange={() => setPendingTime(t)}
                  size="medium"
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button
              variant="primary"
              onClick={handleConfirmTime}
              disabled={!pendingTime}
              UNSAFE_className={styles.fullWidthBtn}
            >
              Confirm time
            </Button>
          </div>
        </div>
      </>,
      document.body
    );
  }

  // ── Main details view ──
  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="appt-details-title">
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 id="appt-details-title" className={styles.modalTitleLarge}>Your Appointment details</h2>
          <IconButton aria-label="Close" variant="ghost" size="medium" onClick={onClose}>
            <X style={{ width: 20, height: 20 }} />
          </IconButton>
        </div>

        {/* Scrollable body */}
        <div className={styles.detailsScrollBody}>
          {/* Service row */}
          <div className={styles.apptServiceRow}>
            <img
              src="/illustrations/spot-illustration/OilChange.svg"
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
              className={styles.apptServiceIcon}
            />
            <div className={styles.apptServiceInfo}>
              <p className={styles.apptServiceName}>{serviceName}</p>
              <p className={styles.apptServiceDesc}>Full-synthetic premium oil - Castrol</p>
              <p className={styles.apptServicePrice}>$54.88 for up to 5 qts.</p>
            </div>
          </div>

          {/* Blue callout */}
          {showCallout && (
            <div className={styles.apptCallout}>
              <div className={styles.apptCalloutTop}>
                <p className={styles.apptCalloutTitle}>Save time at the store!</p>
                <IconButton
                  aria-label="Dismiss"
                  variant="ghost"
                  size="small"
                  onClick={() => setShowCallout(false)}
                >
                  <X style={{ width: 16, height: 16 }} />
                </IconButton>
              </div>
              <p className={styles.apptCalloutText}>Pay now for quick check-in and service.</p>
              <Button variant="secondary" size="small" onClick={onClose}>
                Check in now
              </Button>
            </div>
          )}

          {/* Editable appointment fields */}
          <div className={styles.apptFields}>
            <div className={styles.apptFieldGroup}>
              <span className={styles.apptFieldLabel}>Date</span>
              <button
                className={styles.apptFieldValue}
                onClick={() => { setPendingDate(selectedDate); setStep('editDate'); }}
              >
                <span>{formattedDate}</span>
                <ChevronRight style={{ width: 18, height: 18, color: 'var(--ld-semantic-color-text-subtle, #74767C)', flexShrink: 0 }} />
              </button>
            </div>
            <div className={styles.apptFieldGroup}>
              <span className={styles.apptFieldLabel}>Time</span>
              <button
                className={styles.apptFieldValue}
                onClick={() => { setPendingTime(null); setStep('editTime'); }}
              >
                <span>{selectedTime}</span>
                <ChevronRight style={{ width: 18, height: 18, color: 'var(--ld-semantic-color-text-subtle, #74767C)', flexShrink: 0 }} />
              </button>
            </div>
            <div className={styles.apptFieldGroup}>
              <span className={styles.apptFieldLabel}>Service</span>
              <div className={styles.apptFieldValueStatic}>{serviceName}</div>
            </div>
            <div className={styles.apptFieldGroup}>
              <span className={styles.apptFieldLabel}>Vehicle</span>
              <div className={styles.apptFieldValueStatic}>{vehicle}</div>
            </div>
          </div>

          {/* Info list rows */}
          <div className={styles.apptListRows}>
            <button className={styles.apptListRow}>
              <Store style={{ width: 22, height: 22, flexShrink: 0 }} />
              <div className={styles.apptListRowContent}>
                <span className={styles.apptListRowLabel}>Store location</span>
                <span className={styles.apptListRowValue}>{storeAddress}</span>
              </div>
              <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
            </button>

            <button className={styles.apptListRow}>
              <UserCircle style={{ width: 22, height: 22, flexShrink: 0 }} />
              <div className={styles.apptListRowContent}>
                <span className={styles.apptListRowLabel}>Appointment contact</span>
                <span className={styles.apptListRowValue}>Emilia Garcia</span>
              </div>
              <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
            </button>

            <button className={styles.apptListRow}>
              <CreditCard style={{ width: 22, height: 22, flexShrink: 0 }} />
              <div className={styles.apptListRowContent}>
                <span className={styles.apptListRowLabel}>Pay with</span>
                <span className={styles.apptListRowValue}>ending in 7725</span>
              </div>
              <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
            </button>

            <button className={styles.apptListRow}>
              <Receipt style={{ width: 22, height: 22, flexShrink: 0 }} />
              <div className={styles.apptListRowContent}>
                <span className={styles.apptListRowLabel}>Est. total</span>
                <span className={styles.apptListRowValue}>{estTotal} • Includes taxes and fees.</span>
              </div>
              <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
            </button>
          </div>

          {/* Legal text */}
          <p className={styles.apptLegalText}>
            By placing this order, you agree to our{' '}
            <a href="#" className={styles.apptLegalLink}>Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className={styles.apptLegalLink}>Terms of Use</a>.
          </p>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <Button
            variant="primary"
            onClick={() => setStep('booked')}
            UNSAFE_className={styles.fullWidthBtn}
          >
            Book service {estTotal}
          </Button>
        </div>
      </div>
    </>,
    document.body
  );
}

// ── Exported composite ────────────────────────────────────────────────────────
interface AutoCareModalsProps {
  openModal: AutoCareModalType;
  onClose: () => void;
  serviceDetails?: ServiceDetails;
  location?: string;
  statusHeading: string;
  orderTotal?: string;
  appointmentDate?: Date;
}

export function AutoCareModals({
  openModal, onClose, serviceDetails, location, statusHeading, orderTotal,
}: AutoCareModalsProps) {
  return (
    <>
      <CheckInModal
        open={openModal === 'checkIn'}
        onClose={onClose}
        serviceDetails={serviceDetails}
        location={location}
        statusHeading={statusHeading}
      />
      <ViewDetailsModal
        open={openModal === 'viewDetails' || openModal === 'reschedule'}
        onClose={onClose}
        serviceDetails={serviceDetails}
        location={location}
        statusHeading={statusHeading}
        orderTotal={orderTotal}
        initialStep={openModal === 'reschedule' ? 'editDate' : 'details'}
      />
    </>
  );
}
