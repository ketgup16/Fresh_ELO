import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/Badge';

export type AXAvatarIndicatorType = 'none' | 'badge' | 'clock';
export type AXAvatarClockState = 'active' | 'subtle';

/** @deprecated Use `indicator` + `clockState` instead */
export type AXAvatarClockIndicator = 'none' | 'active' | 'subtle';

/**
 * AX Avatar — wraps the base Avatar with an optional indicator overlay.
 *
 * Indicator types:
 *  - 'none'   → no indicator (default)
 *  - 'badge'  → LD Badge component, Brand Bold (blue) variant, positioned top-right
 *  - 'clock'  → Clock indicator dot, state controlled by `clockState`:
 *      - 'active' (Clocked in)  → fill + inset stroke: --ld-semantic-color-border-positive (#2A8703)
 *      - 'subtle' (Clocked out) → fill: --ld-semantic-color-background-subtle (#F8F8F8),
 *                                  inset stroke: --ld-semantic-color-border-subtle (#515357)
 *
 * Stroke is always positioned inside the indicator circle (inset box-shadow, 1px).
 */
interface AXAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Which indicator to show. @default 'none' */
  indicator?: AXAvatarIndicatorType;
  /** State of the clock indicator. Only used when indicator === 'clock'. @default 'active' */
  clockState?: AXAvatarClockState;
  /** Forwarded to the inner Avatar span. */
  avatarStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export function AXAvatar({
  indicator = 'none',
  clockState = 'active',
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
      {indicator === 'badge' && <BadgeIndicator />}
      {indicator === 'clock' && <ClockIndicatorDot state={clockState} />}
    </span>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

AXAvatar.Image = AvatarImage;
AXAvatar.Fallback = AvatarFallback;

// ─── Badge Indicator ──────────────────────────────────────────────────────────

function BadgeIndicator() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'inline-flex',
        /* white separator ring */
        boxShadow: '0 0 0 2px var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        borderRadius: '50%',
      }}
    >
      <Badge
        variant="blue"
        size="small"
        aria-label="Status badge"
        style={{ minWidth: '8px', height: '8px', padding: 0 }}
      />
    </span>
  );
}

// ─── Clock Indicator Dot ──────────────────────────────────────────────────────

interface ClockIndicatorDotProps {
  state: AXAvatarClockState;
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
