import React from 'react';
import styles from './DaySelector.module.css';

export interface DaySelectorProps {
  /** Array of day labels, e.g. ["Sun", "Mon", "Tue"] */
  days: string[];
  /** Currently selected day(s). Pass a single string for single-select mode. */
  selectedDays: string | string[];
  /** Called with the clicked day string */
  onChange: (day: string) => void;
  /** Makes all buttons non-interactive */
  disabled?: boolean;
  /** Allow selecting multiple days at once */
  multiSelect?: boolean;
}

export function DaySelector({
  days,
  selectedDays,
  onChange,
  disabled = false,
  multiSelect = false,
}: DaySelectorProps) {
  const selected = Array.isArray(selectedDays) ? selectedDays : [selectedDays];

  return (
    <div
      className={styles.row}
      role={multiSelect ? 'group' : 'radiogroup'}
      aria-label="Select day"
    >
      {days.map((day) => {
        const isSelected = selected.includes(day);
        return (
          <button
            key={day}
            type="button"
            role={multiSelect ? 'checkbox' : 'radio'}
            aria-checked={isSelected}
            aria-label={day}
            disabled={disabled}
            className={[
              styles.dayBtn,
              isSelected ? styles.dayBtnSelected : styles.dayBtnUnselected,
              disabled ? styles.dayBtnDisabled : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => !disabled && onChange(day)}
          >
            <span className={styles.dayLabel}>{day}</span>
          </button>
        );
      })}
    </div>
  );
}
