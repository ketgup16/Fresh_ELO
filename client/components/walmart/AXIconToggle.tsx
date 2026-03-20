import * as React from 'react';
import styles from './AXIconSelector.module.css';

export type AXIconToggleSize = 'small' | 'medium' | 'large';
export type AXIconToggleShape = 'circle' | 'rounded';
export type AXIconToggleColor = 'default' | 'white';

export interface AXIconToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'checked' | 'className' | 'style'> {
  /**
   * Icon to show in the OFF (unchecked) state.
   * Should be an outline / stroke-style icon.
   */
  uncheckedIcon: React.ReactNode;
  /**
   * Icon to show in the ON (checked) state.
   * Should be a filled variant of the same icon.
   */
  checkedIcon: React.ReactNode;
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled initial checked state. @default false */
  defaultChecked?: boolean;
  /** Fired when the toggle state changes */
  onChange?: (checked: boolean) => void;
  /**
   * Button size.
   * small  → 24 × 24 (mobile) / 32 × 32 (desktop)
   * medium → 32 × 32 (mobile) / 40 × 40 (desktop)
   * large  → 40 × 40 (mobile) / 48 × 48 (desktop)
   * @default 'medium'
   */
  size?: AXIconToggleSize;
  /**
   * Container shape.
   * circle  → fully rounded (pill)
   * rounded → softly rounded square
   * @default 'rounded'
   */
  shape?: AXIconToggleShape;
  /**
   * Color theme.
   * default → for use on light backgrounds (transparent bg, primary text)
   * white   → for use on dark/colored backgrounds (white icon)
   * @default 'default'
   */
  color?: AXIconToggleColor;
  /** Disables the button */
  disabled?: boolean;
  /** Accessible label (required) */
  'aria-label': string;
  /** Additional class for the outer button */
  UNSAFE_className?: string;
}

/**
 * AX Icon Toggle
 *
 * A toggleable icon button used across the Walmart.com consumer experience.
 * Shows an **outline** icon when unchecked and a **filled** icon when checked.
 *
 * Supports 3 sizes × 2 shapes × 2 color themes, all powered by LD semantic tokens.
 * Absorbs the former `AXIconSelector` — import from here for new code.
 *
 * @example
 * ```tsx
 * <AXIconToggle
 *   uncheckedIcon={<Heart />}
 *   checkedIcon={<HeartFill />}
 *   aria-label="Save to favorites"
 *   shape="circle"
 *   size="medium"
 * />
 * ```
 */
export const AXIconToggle = React.forwardRef<HTMLButtonElement, AXIconToggleProps>(
  (props, ref) => {
    const {
      uncheckedIcon,
      checkedIcon,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      size = 'medium',
      shape = 'rounded',
      color = 'default',
      disabled = false,
      'aria-label': ariaLabel,
      UNSAFE_className,
      onClick,
      ...rest
    } = props;

    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = !checked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
      onClick?.(e);
    };

    const className = [
      styles.selector,
      styles[`selector--${size}`],
      styles[`selector--${shape}`],
      styles[`selector--${color}`],
      checked && styles['selector--checked'],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleClick}
        className={className}
        {...rest}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          {checked ? checkedIcon : uncheckedIcon}
        </span>
      </button>
    );
  },
);

AXIconToggle.displayName = 'AXIconToggle';

// ─── Backward-compatibility shim ─────────────────────────────────────────────
// AXIconSelector is kept as a thin alias so existing imports continue to work.
// Migrate new code to AXIconToggle.

export type AXIconSelectorSize = AXIconToggleSize;
export type AXIconSelectorShape = AXIconToggleShape;
export type AXIconSelectorColor = AXIconToggleColor;

export interface AXIconSelectorProps
  extends Omit<AXIconToggleProps, 'uncheckedIcon' | 'checkedIcon'> {
  /** @deprecated Use `uncheckedIcon` */
  outlineIcon: React.ReactNode;
  /** @deprecated Use `checkedIcon` */
  filledIcon: React.ReactNode;
}

/**
 * @deprecated Use `AXIconToggle` instead. This alias will be removed in a future release.
 */
export const AXIconSelector = React.forwardRef<HTMLButtonElement, AXIconSelectorProps>(
  ({ outlineIcon, filledIcon, ...rest }, ref) => (
    <AXIconToggle
      ref={ref}
      uncheckedIcon={outlineIcon}
      checkedIcon={filledIcon}
      {...rest}
    />
  ),
);

AXIconSelector.displayName = 'AXIconSelector';
