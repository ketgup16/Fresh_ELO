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
  /** Avatar size — affects indicator positioning. @default 'medium' */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /** Forwarded to the inner Avatar span. */
  avatarStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export function AXAvatar({
  indicator = 'none',
  clockState = 'active',
  size = 'medium' as 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
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
      {indicator === 'badge' && <BadgeIndicator size={size} />}
      {indicator === 'clock' && <ClockIndicatorDot state={clockState} size={size} />}
    </span>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

AXAvatar.Image = AvatarImage;
AXAvatar.Fallback = AvatarFallback;

// ─── Badge Indicator ──────────────────────────────────────────────────────────

// Badge offset by avatar size, expressed as CSS calc() with primitive scale tokens.
// space-25 = 2px · space-50 = 4px · space-100 = 8px
const BADGE_OFFSET: Record<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge', string> = {
  xsmall: 'calc(-1 * var(--ld-primitive-scale-space-100, 8px))',                                                   // -8px
  small:  'calc(-1 * (var(--ld-primitive-scale-space-50, 4px) + var(--ld-primitive-scale-space-25, 2px)))',        // -6px
  medium: 'calc(-1 * var(--ld-primitive-scale-space-50, 4px))',                                                    // -4px
  large:  'calc(-1 * var(--ld-primitive-scale-space-25, 2px))',                                                    // -2px
  xlarge: 'var(--ld-primitive-scale-space-25, 2px)',                                                               // +2px
};

function BadgeIndicator({ size = 'medium' }: { size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' }) {
  const offset = BADGE_OFFSET[size];
  // Render the Badge directly — no wrapper span — matching the Badges library page.
  // Only layout/positioning styles are applied; no component style overrides.
  return (
    <Badge
      variant="blue"
      size="small"
      value={1}
      aria-label="1 notification"
      style={{
        position: 'absolute',
        top: offset,
        right: offset,
        /* white separator ring — layout concern, not a style override */
        outline: '2px solid var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        outlineOffset: 0,
      }}
    />
  );
}

// ─── Clock Indicator Dot ──────────────────────────────────────────────────────

interface ClockIndicatorDotProps {
  state: AXAvatarClockState;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

function ClockIndicatorDot({ state, size = 'medium' }: ClockIndicatorDotProps) {
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

  // Clock indicator offsets by size — primitive scale tokens where exact match exists
  // space-50 = 4px · space-25 = 2px · no token for 3px (use literal)
  const CLOCK_OFFSET: Record<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge', string | number> = {
    xsmall: 'calc(-1 * var(--ld-primitive-scale-space-50, 4px))',
    small:  'calc(-1 * var(--ld-primitive-scale-space-50, 4px))',
    medium: 'calc(-1 * var(--ld-primitive-scale-space-25, 2px))',
    large:  0,
    xlarge: 'var(--ld-primitive-scale-space-25, 2px)',
  };
  const offset = CLOCK_OFFSET[size];

  return (
    /* 12×12 outer container — provides the white separator ring and hit area */
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: offset as string | number,
        right: offset as string | number,
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
