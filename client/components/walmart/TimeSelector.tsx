import React from 'react';
import styles from './TimeSelector.module.css';

export interface TimeSelectorProps {
  /** Array of time slot strings, e.g. ["1pm–2pm", "2pm–3pm"] */
  timeSlots: string[];
  /** Currently selected slot. Pass null for nothing selected. */
  selectedSlot: string | null;
  /** Called with the newly selected slot string */
  onChange: (slot: string) => void;
  /** Makes all options non-interactive */
  disabled?: boolean;
}

export function TimeSelector({
  timeSlots,
  selectedSlot,
  onChange,
  disabled = false,
}: TimeSelectorProps) {
  return (
    <div className={styles.list} role="radiogroup">
      {timeSlots.map((slot) => {
        const checked = slot === selectedSlot;
        return (
          <button
            key={slot}
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={disabled}
            className={[
              styles.row,
              checked ? styles.rowChecked : styles.rowUnchecked,
              disabled ? styles.rowDisabled : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => !disabled && onChange(slot)}
          >
            {/* Radio indicator */}
            <span className={styles.radio} aria-hidden="true">
              <span className={styles.radioOuter}>
                {checked && <span className={styles.radioDot} />}
              </span>
            </span>

            {/* Time label */}
            <span className={[styles.label, checked ? styles.labelChecked : ''].filter(Boolean).join(' ')}>
              {slot}
            </span>
          </button>
        );
      })}
    </div>
  );
}
