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
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
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

// Avatar dimensions via primitive scale tokens:
// space-300=24px · space-400=32px · space-500=40px · space-600=48px · space-800=64px
const SIZE_DIM: Record<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge', string> = {
  xsmall: 'var(--ld-primitive-scale-space-300, 1.5rem)',
  small:  'var(--ld-primitive-scale-space-400, 2rem)',
  medium: 'var(--ld-primitive-scale-space-500, 2.5rem)',
  large:  'var(--ld-primitive-scale-space-600, 3rem)',
  xlarge: 'var(--ld-primitive-scale-space-800, 4rem)',
};

/**
 * AX Avatar Button — an interactive AX Avatar wrapped in a `<button>` element.
 *
 * Inherits all indicator/size props from AXAvatar and adds button-specific
 * behaviour: click handling, disabled state, and focus/hover ring.
 */
// Sizes below 48px need an expanded transparent hit slot for iOS/Android a11y minimum touch target.
// Large (48px) and XLarge (64px) already meet the requirement.
const NEEDS_HIT_SLOT = new Set(['xsmall', 'small', 'medium']);
const HIT_SLOT_PX = '48px';

export function AXAvatarButton({
  indicator = 'none',
  clockState = 'active',
  size = 'medium' as 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
  avatarStyle,
  disabled = false,
  onClick,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}: AXAvatarButtonProps) {
  const dim = SIZE_DIM[size];
  const resolvedAvatarStyle = avatarStyle ?? { width: dim, height: dim };

  // Ref to the AXAvatar outer span — used to apply focus ring directly on the
  // avatar circle rather than on the (possibly larger) transparent hit-slot button.
  const avatarRef = React.useRef<HTMLSpanElement>(null);

  const needsHitSlot = NEEDS_HIT_SLOT.has(size);

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
        alignItems: 'center',
        justifyContent: 'center',
        // Expand to 48×48 transparent hit slot for sizes below the a11y minimum
        ...(needsHitSlot ? { minWidth: HIT_SLOT_PX, minHeight: HIT_SLOT_PX } : { borderRadius: '50%' }),
        outline: 'none',
        ...style,
      }}
      onFocus={() => {
        // Apply focus ring to the avatar circle (not the full hit-slot button)
        if (avatarRef.current) {
          avatarRef.current.style.boxShadow = '0 0 0 3px var(--ld-semantic-color-border-focus, #0071CE)';
        }
      }}
      onBlur={() => {
        if (avatarRef.current) {
          avatarRef.current.style.boxShadow = '';
        }
      }}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.opacity = '0.85';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
      }}
    >
      <AXAvatar
        ref={avatarRef}
        indicator={indicator}
        clockState={clockState}
        size={size}
        avatarStyle={resolvedAvatarStyle}
        disabled={disabled}
      >
        {children}
      </AXAvatar>
    </button>
  );
}

// Convenience sub-components mirroring AXAvatar API
AXAvatarButton.Image = AvatarImage;
AXAvatarButton.Fallback = AvatarFallback;
