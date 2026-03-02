import * as React from 'react';
import styles from './WCPRating.module.css';

export type WCPRatingSize = 'small' | 'medium';

export interface WCPRatingProps {
  /** Controlled value (0–5). 0 = unrated. */
  value?: number;
  /** Uncontrolled initial value. @default 0 */
  defaultValue?: number;
  /** Called when the user selects a rating. */
  onChange?: (value: number) => void;
  /**
   * Size variant — affects star dimensions and gap, responsive across 900px breakpoint.
   * small  → 20px mobile / 24px desktop
   * medium → 28px mobile / 32px desktop
   * @default 'medium'
   */
  size?: WCPRatingSize;
  /** Disables all interaction. @default false */
  disabled?: boolean;
  /** Accessible label for the radiogroup. */
  'aria-label'?: string;
  /** Additional class for the wrapper. */
  className?: string;
}

const LABELS: Record<number, string> = {
  0: 'Unrated',
  1: 'Very poor',
  2: 'Poor',
  3: 'Fair',
  4: 'Good',
  5: 'Excellent',
};

/** Full (filled) star path — 20×20 viewBox */
function StarFillPath() {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.3546 0.0883354C10.5059 0.168053 10.6286 0.29664 10.7048 0.455086L13.4008 6.06688L19.3303 7.01797C19.7611 7.08706 20.0568 7.50874 19.9908 7.95981C19.9652 8.13514 19.8863 8.29717 19.7659 8.42195L15.5027 12.8413L16.7615 19.0006C16.8527 19.4469 16.5812 19.886 16.1551 19.9815C15.9824 20.0202 15.8022 19.9971 15.6436 19.9159L9.99994 17.0282L4.35633 19.9159C3.96482 20.1163 3.49235 19.9463 3.30106 19.5363C3.22352 19.3701 3.20147 19.1815 3.23843 19.0006L4.4972 12.8413L0.233942 8.42195C-0.0757466 8.10092 -0.078292 7.57776 0.228257 7.25344C0.347406 7.12739 0.502127 7.04483 0.669543 7.01797L6.59906 6.06688L9.29513 0.455086C9.49097 0.0474376 9.96529 -0.116762 10.3546 0.0883354Z"
      fill="var(--ld-semantic-color-rating-fill)"
    />
  );
}

/** Outline border stroke on top of fill (used for hover preview state) */
function StarBorderPath() {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4368 7.35907L9.99994 2.28692L7.56314 7.35907L2.04708 8.24385L6.0474 12.3907L4.89361 18.0363L9.99994 15.4234L15.1063 18.0363L13.9525 12.3907L17.9528 8.24385L12.4368 7.35907ZM13.4008 6.06688L10.7048 0.455085C10.6286 0.29664 10.5059 0.168053 10.3546 0.0883354C9.9653 -0.116762 9.49097 0.0474376 9.29513 0.455085L6.59906 6.06688L0.669543 7.01797C0.502127 7.04483 0.347406 7.12739 0.228256 7.25344C-0.078292 7.57776 -0.0757466 8.10092 0.233942 8.42195L4.4972 12.8413L3.23843 19.0006C3.20147 19.1815 3.22352 19.3701 3.30106 19.5363C3.49235 19.9463 3.96482 20.1163 4.35633 19.9159L9.99994 17.0282L15.6436 19.9159C15.8022 19.9971 15.9824 20.0202 16.1551 19.9815C16.5812 19.886 16.8527 19.4469 16.7615 19.0006L15.5027 12.8413L19.7659 8.42195C19.8863 8.29717 19.9652 8.13514 19.9908 7.95981C20.0568 7.50874 19.7611 7.08706 19.3303 7.01797L13.4008 6.06688Z"
      fill="var(--ld-semantic-color-rating-border)"
    />
  );
}

/** Empty (outline-only) star */
function StarEmptyPath() {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5974 7.1437L9.99994 1.73711L7.40246 7.1437L1.55913 8.08098L5.78903 12.4658L4.56117 18.4738L9.99994 15.6909L15.4387 18.4738L14.2109 12.4658L18.4408 8.08098L12.5974 7.1437ZM13.4008 6.06688L10.7048 0.455085C10.6286 0.29664 10.5059 0.168053 10.3546 0.0883354C9.9653 -0.116762 9.49097 0.0474376 9.29513 0.455085L6.59906 6.06688L0.669543 7.01797C0.502127 7.04483 0.347406 7.12739 0.228256 7.25344C-0.078292 7.57776 -0.0757466 8.10092 0.233942 8.42195L4.4972 12.8413L3.23843 19.0006C3.20147 19.1815 3.22352 19.3701 3.30106 19.5363C3.49235 19.9463 3.96482 20.1163 4.35633 19.9159L9.99994 17.0282L15.6436 19.9159C15.8022 19.9971 15.9824 20.0202 16.1551 19.9815C16.5812 19.886 16.8527 19.4469 16.7615 19.0006L15.5027 12.8413L19.7659 8.42195C19.8863 8.29717 19.9652 8.13514 19.9908 7.95981C20.0568 7.50874 19.7611 7.08706 19.3303 7.01797L13.4008 6.06688Z"
      fill="var(--ld-semantic-color-rating-border)"
    />
  );
}

interface StarIconProps {
  /** Whether this position is filled (value ≥ position) */
  filled: boolean;
  /** Whether this position is in the hover-preview zone */
  hovered: boolean;
}

function StarIcon({ filled, hovered }: StarIconProps) {
  const isHighlighted = filled || hovered;

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.starSvg}
    >
      {isHighlighted ? (
        <>
          <StarFillPath />
          <StarBorderPath />
        </>
      ) : (
        <StarEmptyPath />
      )}
    </svg>
  );
}

/**
 * WCP Rating — Interactive star rating component
 *
 * Allows users to select a rating from 1–5 stars (or 0 = unrated).
 * Supports hover preview, controlled/uncontrolled modes, two size variants,
 * and full keyboard + screen-reader accessibility.
 *
 * @example
 * ```tsx
 * <WCPRating size="medium" onChange={(v) => console.log(v)} />
 * <WCPRating size="small" value={3} />
 * ```
 */
export const WCPRating = React.forwardRef<HTMLDivElement, WCPRatingProps>(
  (props, ref) => {
    const {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      size = 'medium',
      disabled = false,
      'aria-label': ariaLabel = 'Star rating',
      className,
    } = props;

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const value = isControlled ? controlledValue! : internalValue;

    const [hoverValue, setHoverValue] = React.useState(0);

    const displayValue = hoverValue > 0 ? hoverValue : value;

    const handleClick = (star: number) => {
      if (disabled) return;
      // Clicking the same star again clears the rating back to 0
      const next = star === value ? 0 : star;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const handleMouseEnter = (star: number) => {
      if (!disabled) setHoverValue(star);
    };

    const handleMouseLeave = () => {
      setHoverValue(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent, star: number) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(star);
      }
    };

    const wrapperClass = [
      styles.rating,
      styles[`rating--${size}`],
      disabled && styles['rating--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={wrapperClass}
        onMouseLeave={handleMouseLeave}
      >
        <div
          role="radiogroup"
          aria-label={ariaLabel}
          aria-disabled={disabled}
          className={styles.stars}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const star = i + 1;
            const filled = star <= value;
            const hovered = hoverValue > 0 && star <= hoverValue;
            const isSelected = star === value;

            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                disabled={disabled}
                onClick={() => handleClick(star)}
                onMouseEnter={() => handleMouseEnter(star)}
                onKeyDown={(e) => handleKeyDown(e, star)}
                className={styles.starBtn}
              >
                <StarIcon filled={filled} hovered={hovered} />
              </button>
            );
          })}
        </div>

        <span className={styles.label} aria-live="polite" aria-atomic="true">
          {LABELS[displayValue] ?? LABELS[0]}
        </span>
      </div>
    );
  }
);

WCPRating.displayName = 'WCPRating';
