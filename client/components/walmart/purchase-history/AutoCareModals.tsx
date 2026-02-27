import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Check, X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Chip } from '@/components/ui/Chip';
import { Scrim } from '@/components/ui/Scrim';
import type { ServiceDetails } from './OrderCard';
import styles from './AutoCareModals.module.css';

export type AutoCareModalType = 'checkIn' | 'reschedule' | 'viewDetails' | null;

const HERO_IMAGE =
  'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F3109be97542e41e484222dde38d7cc4b?format=webp&width=800&height=1200';

const TIMES = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];
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

// ── Reschedule Modal ──────────────────────────────────────────────────────────
function RescheduleModal({
  open, onClose, initialDate,
}: {
  open: boolean; onClose: () => void; initialDate: Date;
}) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useModalEffects(open, onClose);

  if (!open) return null;

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

  const handleDone = () => { setConfirmed(false); setSelectedTime(null); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="reschedule-title">
        {confirmed ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="medium" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: '#fff' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Appointment Rescheduled</h2>
            <p className={styles.confirmedText}>
              Your oil change is now scheduled for <strong>{formattedDate}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="reschedule-title" className={styles.modalTitle}>Schedule Your Appointment</h2>
              <IconButton aria-label="Close" variant="ghost" size="medium" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.modalScrollBody}>
              <img src={HERO_IMAGE} alt="Walmart Auto Care Center" className={styles.heroImage} />
              <div className={styles.modalBody}>
                <p className={styles.sectionLabel}>Select Date</p>
                <AppointmentCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                <p className={styles.sectionLabel}>Select Time</p>
                <div className={styles.timeChips}>
                  {TIMES.map(t => (
                    <Chip
                      key={t}
                      selected={selectedTime === t}
                      onSelectedChange={() => setSelectedTime(t)}
                      size="medium"
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <Button
                variant="primary"
                onClick={() => setConfirmed(true)}
                disabled={!selectedTime}
                UNSAFE_className={styles.fullWidthBtn}
              >
                Continue to service selection
              </Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
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

// ── View Details Modal ────────────────────────────────────────────────────────
function ViewDetailsModal({
  open, onClose, serviceDetails, location, statusHeading, orderTotal,
}: {
  open: boolean; onClose: () => void;
  serviceDetails?: ServiceDetails; location?: string;
  statusHeading: string; orderTotal?: string;
}) {
  useModalEffects(open, onClose);

  if (!open) return null;

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="details-title">
        <div className={styles.modalHeader}>
          <h2 id="details-title" className={styles.modalTitle}>Appointment Details</h2>
          <IconButton aria-label="Close" variant="ghost" size="medium" onClick={onClose}>
            <X style={{ width: 20, height: 20 }} />
          </IconButton>
        </div>
        <div className={styles.detailsBody}>
          <div className={styles.detailRow}>
            <span className={styles.detailRowLabel}>Date & Time</span>
            <span className={styles.detailRowValue}>{statusHeading}</span>
          </div>
          {location && (
            <div className={styles.detailRow}>
              <span className={styles.detailRowLabel}>Location</span>
              <span className={styles.detailRowValue}>{location}</span>
            </div>
          )}
          {serviceDetails && (
            <>
              <div className={styles.detailRow}>
                <span className={styles.detailRowLabel}>Vehicle</span>
                <span className={styles.detailRowValue}>{serviceDetails.vehicle}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailRowLabel}>Services</span>
                <span className={styles.detailRowValue}>{serviceDetails.services.join(', ')}</span>
              </div>
            </>
          )}
          {orderTotal && (
            <div className={[styles.detailRow, styles.detailRowTotal].join(' ')}>
              <span className={styles.detailRowLabel}>Estimated total</span>
              <span className={styles.detailRowValue}>{orderTotal}</span>
            </div>
          )}
        </div>
        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.fullWidthBtn}>
            Close
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
  appointmentDate = new Date(2026, 2, 7),
}: AutoCareModalsProps) {
  return (
    <>
      <RescheduleModal
        open={openModal === 'reschedule'}
        onClose={onClose}
        initialDate={appointmentDate}
      />
      <CheckInModal
        open={openModal === 'checkIn'}
        onClose={onClose}
        serviceDetails={serviceDetails}
        location={location}
        statusHeading={statusHeading}
      />
      <ViewDetailsModal
        open={openModal === 'viewDetails'}
        onClose={onClose}
        serviceDetails={serviceDetails}
        location={location}
        statusHeading={statusHeading}
        orderTotal={orderTotal}
      />
    </>
  );
}
