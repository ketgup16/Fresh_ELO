import React from 'react';
import styles from './WCPFloatingButton.module.css';

/**
 * [WCP] Floating Button
 *
 * A circular elevated icon button used for carousel controls and floating
 * action scenarios. Based on the LD 3.5 secondary action token family but
 * with an added box-shadow to communicate elevation ("floating").
 *
 * Sizes: xsmall | small | medium | large
 * States: enabled, hovered, focused, pressed, disabled
 *
 * Tags: Carousel Controls, Floating Buttons
 * Figma: [WCP] Floating Button
 */

export type WCPFloatingButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

export interface WCPFloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  /**
   * The icon to render inside the button.
   */
  children: React.ReactNode;

  /**
   * Size of the button. Controls the overall diameter and icon size.
   * @default 'medium'
   */
  size?: WCPFloatingButtonSize;

  /**
   * Accessible label — required for all icon-only buttons.
   */
  'aria-label': string;

  /**
   * Escape hatch for host-specific overrides (use sparingly).
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for host-specific overrides (use sparingly).
   */
  UNSAFE_style?: React.CSSProperties;
}

export function WCPFloatingButton({
  children,
  size = 'medium',
  disabled = false,
  'aria-label': ariaLabel,
  UNSAFE_className,
  UNSAFE_style,
  ...rest
}: WCPFloatingButtonProps) {
  const className = [
    styles.floatingButton,
    styles[`size--${size}`],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      style={UNSAFE_style}
      aria-label={ariaLabel}
      disabled={disabled}
      {...rest}
    >
      <span className={styles.iconWrap}>{children}</span>
    </button>
  );
}
