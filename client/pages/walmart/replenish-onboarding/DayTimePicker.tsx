import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './DayTimePicker.module.css';
import sheetStyles from './ReplenishOnboarding.module.css';

const DAYS = ['Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const TIME_SLOTS = [
  '1pm–2pm',
  '2pm–3pm',
  '3pm–4pm',
  '4pm–5pm',
];

interface DayTimePickerProps {
  initialDay: string;
  initialTime: string;
  onSave: (day: string, time: string) => void;
}

export function DayTimePicker({
  initialDay,
  initialTime,
  onSave,
}: DayTimePickerProps) {
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [selectedTime, setSelectedTime] = useState(initialTime);

  return (
    <div className={sheetStyles.scrim}>
      <div className={sheetStyles.bottomSheet} style={{ maxHeight: '88vh' }}>
        <div className={sheetStyles.bottomSheetBg} />

        <div className={sheetStyles.bottomSheetContent} style={{ paddingBottom: 62 }}>
          <div className={sheetStyles.grabber} />

          <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            {/* Header */}
            <div className={styles.header}>
              <h3 className={styles.headerTitle}>Select your delivery day and time</h3>
            </div>

            {/* Bookslot Content */}
            <div className={styles.bookslotContent}>
              <p className={styles.subhead}>
                This will be your preferred day and time for future orders.
              </p>

              {/* Day carousel */}
              <div className={styles.dayCarousel}>
                {DAYS.map((day) => {
                  const isChecked = selectedDay === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      className={`${styles.daySelector} ${isChecked ? styles.daySelectorChecked : ''}`}
                      onClick={() => setSelectedDay(day)}
                      aria-pressed={isChecked}
                    >
                      <span className={`${styles.dayLabel} ${isChecked ? styles.dayLabelChecked : ''}`}>
                        {day}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              <div role="radiogroup" aria-label="Delivery time" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                {TIME_SLOTS.map((time) => {
                  const isChecked = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      className={`${styles.timeSlot} ${isChecked ? styles.timeSlotChecked : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <div className={styles.timeSlotContent}>
                        <span className={styles.radioCircle}>
                          {isChecked && <span className={styles.radioDot} />}
                        </span>
                        <span className={`${styles.timeLabel} ${isChecked ? styles.timeLabelChecked : ''}`}>
                          {time}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaSection}>
              <div className={styles.ctaButtonWrap}>
                <Button
                  variant="primary"
                  size="medium"
                  isFullWidth
                  onClick={() => onSave(selectedDay, selectedTime)}
                >
                  Save changes
                </Button>
              </div>
              <button type="button" className={styles.viewPrefsLink}>
                View all preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
