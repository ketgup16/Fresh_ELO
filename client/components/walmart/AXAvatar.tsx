import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type AXAvatarClockIndicator = 'none' | 'active' | 'subtle';

/**
 * AX Avatar — wraps the base Avatar with an optional Clock Indicator badge.
 *
 * Clock Indicator states:
 *  - 'active'  → fill + inset stroke both use --ld-semantic-color-border-positive (#2A8703)
 *  - 'subtle'  → fill uses --ld-semantic-color-background-subtle (#F8F8F8),
 *                inset stroke uses --ld-semantic-color-border-subtle (#515357)
 *  - 'none'    → no indicator (default)
 *
 * Stroke is always positioned inside the indicator circle (inset box-shadow, 1px).
 */

interface AXAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show/hide and set the state of the clock indicator dot. @default 'none' */
  clockIndicator?: AXAvatarClockIndicator;
  /** Forwarded to the inner Avatar span. */
  avatarStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export function AXAvatar({
  clockIndicator = 'none',
  style,
  avatarStyle,
  children,
  ...props
}: AXAvatarProps) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <Avatar style={avatarStyle} {...props}>
        {children}
      </Avatar>
      {clockIndicator !== 'none' && (
        <ClockIndicatorDot state={clockIndicator} />
      )}
    </span>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

AXAvatar.Image = AvatarImage;
AXAvatar.Fallback = AvatarFallback;

// ─── Clock Indicator Dot ──────────────────────────────────────────────────────

interface ClockIndicatorDotProps {
  state: 'active' | 'subtle';
}

function ClockIndicatorDot({ state }: ClockIndicatorDotProps) {
  const isActive = state === 'active';

  const background = isActive
    ? 'var(--ld-semantic-color-border-positive, #2A8703)'
    : 'var(--ld-semantic-color-background-subtle, #F8F8F8)';

  /* inset stroke (border-width = ld.primitive.scale.borderWidth.100 = 1px) */
  const insetStroke = isActive
    ? 'inset 0 0 0 var(--ld-primitive-scale-border-width-100, 1px) var(--ld-semantic-color-border-positive, #2A8703)'
    : 'inset 0 0 0 var(--ld-primitive-scale-border-width-100, 1px) var(--ld-semantic-color-border-subtle, #515357)';

  /* white separator ring so the dot is visually lifted off the avatar */
  const separator = '0 0 0 2px var(--ld-semantic-color-fill-surface-primary, #ffffff)';

  return (
    /* 12×12 outer container — provides the white separator ring and hit area */
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* white separator ring */
        boxShadow: separator,
        background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        flexShrink: 0,
      }}
    >
      {/* 8×8 inner circle — carries the fill and inset stroke */}
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background,
          boxShadow: insetStroke,
          flexShrink: 0,
        }}
      />
    </span>
  );
}
