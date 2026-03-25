import React from 'react';
import { AXAvatar, AXAvatarIndicatorType, AXAvatarClockState } from './AXAvatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type { AXAvatarIndicatorType, AXAvatarClockState };

interface AXAvatarButtonProps {
  /** Which indicator overlay to show on the avatar. @default 'none' */
  indicator?: AXAvatarIndicatorType;
  /** State of the clock indicator dot. Only used when indicator="clock". @default 'active' */
  clockState?: AXAvatarClockState;
  /** Avatar size — affects indicator positioning. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Forwarded to the inner Avatar circle element. Use to set custom width/height. */
  avatarStyle?: React.CSSProperties;
  /** Whether the button is disabled. @default false */
  disabled?: boolean;
  /** Called when the button is clicked. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Accessible label for the button (required for icon-only buttons). */
  'aria-label'?: string;
  /** Content rendered inside the avatar circle — AvatarImage and/or AvatarFallback. */
  children?: React.ReactNode;
  /** Additional class name on the button wrapper. */
  className?: string;
  /** Style applied to the button wrapper. */
  style?: React.CSSProperties;
}

const SIZE_PX: Record<'small' | 'medium' | 'large', number> = {
  small: 32,
  medium: 40,
  large: 64,
};

/**
 * AX Avatar Button — an interactive AX Avatar wrapped in a `<button>` element.
 *
 * Inherits all indicator/size props from AXAvatar and adds button-specific
 * behaviour: click handling, disabled state, and focus/hover ring.
 */
export function AXAvatarButton({
  indicator = 'none',
  clockState = 'active',
  size = 'medium',
  avatarStyle,
  disabled = false,
  onClick,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}: AXAvatarButtonProps) {
  const px = SIZE_PX[size];
  const resolvedAvatarStyle = avatarStyle ?? { width: `${px}px`, height: `${px}px` };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={{
        all: 'unset',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        borderRadius: '50%',
        opacity: disabled ? 0.4 : 1,
        transition: 'opacity 0.15s, box-shadow 0.15s',
        /* Focus ring */
        outline: 'none',
        ...style,
      }}
      onFocus={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 0 0 3px var(--ld-semantic-color-border-focus, #0071CE)';
      }}
      onBlur={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.opacity = '0.85';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.opacity = disabled ? '0.4' : '1';
      }}
    >
      <AXAvatar
        indicator={indicator}
        clockState={clockState}
        size={size}
        avatarStyle={resolvedAvatarStyle}
      >
        {children}
      </AXAvatar>
    </button>
  );
}

// Convenience sub-components mirroring AXAvatar API
AXAvatarButton.Image = AvatarImage;
AXAvatarButton.Fallback = AvatarFallback;
