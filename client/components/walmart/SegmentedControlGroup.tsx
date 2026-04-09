import React from 'react';
import styles from './SegmentedControlGroup.module.css';

export interface SegmentedControlGroupSegment {
  /** Visible label text */
  label: string;
  /** Optional leading icon (16px). When used, ALL segments in the group must include an icon. */
  icon?: React.ReactNode;
  /** Whether this segment is disabled and non-interactive */
  disabled?: boolean;
  /** Accessible label override for this specific segment */
  ariaLabel?: string;
}

export interface SegmentedControlGroupProps {
  /** Array of 2–3 segment definitions */
  segments: SegmentedControlGroupSegment[];
  /** Index (0-based) of the currently active segment */
  activeIndex: number;
  /** Called with the new index when an inactive segment is pressed */
  onChange: (index: number) => void;
  /** Optional additional CSS class applied to the group container */
  className?: string;
  /** Accessible label for the overall group */
  'aria-label'?: string;
}

/**
 * AX Pattern — Segmented Control Group
 *
 * A horizontal row of 2–3 mutually exclusive segment buttons used to switch between
 * related views or filter content. Supports optional leading icons and disabled states.
 *
 * @example
 * <SegmentedControlGroup
 *   segments={[{ label: 'View by work' }, { label: 'View by associate' }]}
 *   activeIndex={0}
 *   onChange={(i) => setActive(i)}
 *   aria-label="View switcher"
 * />
 */
export const SegmentedControlGroup: React.FC<SegmentedControlGroupProps> = ({
  segments,
  activeIndex,
  onChange,
  className = '',
  'aria-label': ariaLabel,
}) => {
  if (import.meta.env.DEV) {
    if (segments.length < 2 || segments.length > 3) {
      console.warn(
        `[SegmentedControlGroup] Expected 2–3 segments, received ${segments.length}. ` +
          'Please pass an array with 2 or 3 segment definitions.'
      );
    }
  }

  const segmentCount = Math.min(Math.max(segments.length, 2), 3);
  const items = segments.slice(0, segmentCount);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`${styles.group} ${className}`}
    >
      {items.map((segment, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isSelected = index === activeIndex;

        const classNames = [
          styles.segment,
          isFirst ? styles['segment--first'] : '',
          isLast ? styles['segment--last'] : '',
          !isFirst && !isLast ? styles['segment--middle'] : '',
          isSelected ? styles['segment--selected'] : '',
          segment.disabled ? styles['segment--disabled'] : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={index}
            type="button"
            className={classNames}
            disabled={segment.disabled}
            aria-pressed={isSelected}
            aria-label={segment.ariaLabel}
            onClick={() => {
              if (!isSelected && !segment.disabled) {
                onChange(index);
              }
            }}
          >
            {segment.icon && (
              <span className={styles.icon} aria-hidden="true">
                {segment.icon}
              </span>
            )}
            <span className={styles.label}>{segment.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControlGroup;
