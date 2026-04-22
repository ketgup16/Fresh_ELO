import * as React from 'react';
import { useRadioGroupContext } from '@/components/ui/radio-group';
import { Divider } from '@/components/ui/Divider';
import styles from './AXRadio.module.css';

export interface AXRadioProps {
  /** The value for this radio option. */
  value: string;
  /** Main label text. */
  label: string;
  /** Size variant. @default 'small' */
  size?: 'large' | 'small';
  /** Optional eyebrow text shown above the label. */
  eyebrow?: string;
  /** Optional caption text shown below the label. */
  caption?: string;
  /** Whether to show a bottom divider. @default true */
  showDivider?: boolean;
  /** Whether the radio is disabled. */
  disabled?: boolean;
  /** Escape hatch for additional CSS classes. */
  UNSAFE_className?: string;
  /** Escape hatch for inline styles. */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * AX Radio — WCP-level radio pattern with optional eyebrow, label, and caption.
 * Must be used inside a `<RadioGroup>` container.
 */
export const AXRadio = React.forwardRef<HTMLLabelElement, AXRadioProps>(
  (
    {
      value,
      label,
      size = 'small',
      eyebrow,
      caption,
      showDivider = true,
      disabled: disabledProp = false,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    const ctx = useRadioGroupContext();
    const isChecked = ctx ? ctx.value === value : false;
    const isDisabled = disabledProp || (ctx?.disabled ?? false);
    const id = React.useId();

    const handleChange = () => {
      if (isDisabled) return;
      ctx?.onValueChange(value);
    };

    const rowClassName = [
      styles.row,
      size === 'large' ? styles['row--large'] : styles['row--small'],
      isDisabled && styles['row--disabled'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    const controlClassName = [
      styles.control,
      size === 'large' ? styles['control--large'] : styles['control--small'],
    ]
      .filter(Boolean)
      .join(' ');

    const eyebrowClassName = [
      styles.eyebrow,
      isDisabled && styles['eyebrow--disabled'],
    ]
      .filter(Boolean)
      .join(' ');

    const labelClassName = [
      styles.label,
      size === 'large' ? styles['label--large'] : styles['label--small'],
      isChecked && !isDisabled && styles['label--selected'],
      isDisabled && styles['label--disabled'],
    ]
      .filter(Boolean)
      .join(' ');

    const captionClassName = [
      styles.caption,
      size === 'large' ? styles['caption--large'] : styles['caption--small'],
      isDisabled && styles['caption--disabled'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <label
          ref={ref}
          htmlFor={id}
          className={rowClassName}
          style={UNSAFE_style}
          aria-disabled={isDisabled || undefined}
        >
          {/* Radio control */}
          <span className={controlClassName}>
            <button
              id={id}
              type="button"
              role="radio"
              aria-checked={isChecked}
              aria-disabled={isDisabled || undefined}
              disabled={isDisabled}
              tabIndex={isChecked ? 0 : -1}
              className={styles.radioButton}
              onClick={handleChange}
            >
              {isChecked && <span className={styles.radioIndicator} />}
            </button>
          </span>

          {/* Label column */}
          <span className={styles.labelCol}>
            {eyebrow && (
              <span className={eyebrowClassName}>{eyebrow}</span>
            )}
            <span className={labelClassName}>{label}</span>
            {caption && (
              <span className={captionClassName}>{caption}</span>
            )}
          </span>
        </label>

        {showDivider && <Divider />}
      </div>
    );
  },
);

AXRadio.displayName = 'AXRadio';
