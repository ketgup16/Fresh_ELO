import * as React from 'react';
import styles from './WCPIconSelector.module.css';

export type WCPIconSelectorSize = 'small' | 'medium' | 'large';
export type WCPIconSelectorShape = 'circle' | 'rounded';
export type WCPIconSelectorColor = 'default' | 'white';

export interface WCPIconSelectorProps {
  /**
   * Icon to show in the OFF (unchecked) state.
   * Should be an outline / stroke-style icon.
   */
  outlineIcon: React.ReactNode;
  /**
   * Icon to show in the ON (checked) state.
   * Should be a filled variant of the same icon.
   */
  filledIcon: React.ReactNode;
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
  size?: WCPIconSelectorSize;
  /**
   * Container shape.
   * circle  → fully rounded (pill)
   * rounded → softly rounded square
   * @default 'rounded'
   */
  shape?: WCPIconSelectorShape;
  /**
   * Color theme.
   * default → for use on light backgrounds (transparent → brand-blue when on)
   * white   → for use on dark/colored backgrounds (white bg, blue icon when on)
   * @default 'default'
   */
  color?: WCPIconSelectorColor;
  /** Disables the button */
  disabled?: boolean;
  /** Accessible label (required) */
  'aria-label': string;
  /** Additional class for the outer button */
  UNSAFE_className?: string;
}

/**
 * WCP Icon Selector
 *
 * A toggleable icon button used across the Walmart.com consumer experience.
 * Shows an **outline** icon when unchecked and a **filled** icon when checked.
 *
 * Supports 3 sizes × 2 shapes × 2 color themes, all powered by LD semantic tokens.
 *
 * @example
 * ```tsx
 * <WCPIconSelector
 *   outlineIcon={<Heart />}
 *   filledIcon={<HeartFill />}
 *   aria-label="Save to favorites"
 *   shape="circle"
 *   size="medium"
 *   color="default"
 * />
 * ```
 */
export const WCPIconSelector = React.forwardRef<
  HTMLButtonElement,
  WCPIconSelectorProps
>((props, ref) => {
  const {
    outlineIcon,
    filledIcon,
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    size = 'medium',
    shape = 'rounded',
    color = 'default',
    disabled = false,
    'aria-label': ariaLabel,
    UNSAFE_className,
  } = props;

  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleClick = () => {
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
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
    >
      <span className={styles.iconWrap} aria-hidden="true">
        {checked ? filledIcon : outlineIcon}
      </span>
    </button>
  );
});

WCPIconSelector.displayName = 'WCPIconSelector';
