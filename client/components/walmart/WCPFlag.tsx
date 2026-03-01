import React from 'react';
import styles from './WCPFlag.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * WCP Flag visual variants.
 *
 * All variants use --wcp-semantic-color-* tokens exclusively, ensuring they
 * are commerce-specific and won't conflict with arbitrary LD brand overrides.
 *
 * Exception: `brand-subtle` intentionally uses LD brand tokens so it tracks
 * brand-theme overrides (e.g. Bodega green, Walmart blue).
 *
 * brand-subtle | member-subtle | savings | savings-outlined
 * confidence-subtle | express-subtle | member | trending
 */
export type WCPFlagVariant =
  | 'brand-subtle'
  | 'member-subtle'
  | 'savings'
  | 'savings-outlined'
  | 'confidence-subtle'
  | 'express-subtle'
  | 'member'
  | 'trending';

export interface WCPFlagProps {
  /** Display label inside the flag */
  label?: string;
  /** Visual color variant */
  variant?: WCPFlagVariant;
  /** Optional leading icon (left side) */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon (right side) */
  trailingIcon?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WCPFlag({
  label = 'Flag name',
  variant = 'brand-subtle',
  leadingIcon,
  trailingIcon,
  className,
}: WCPFlagProps) {
  return (
    <span
      className={[styles.flag, styles[variant], className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      {leadingIcon && (
        <span className={styles.iconWrap}>{leadingIcon}</span>
      )}
      <span className={styles.label}>{label}</span>
      {trailingIcon && (
        <span className={styles.iconWrap}>{trailingIcon}</span>
      )}
    </span>
  );
}

// ─── Variant metadata (useful for docs) ──────────────────────────────────────

export const WCP_FLAG_VARIANTS: Array<{ variant: WCPFlagVariant; label: string; description: string }> = [
  {
    variant: 'brand-subtle',
    label: 'Brand Subtle',
    description: 'White bg, brand-colored border + text — tracks brand theme (LD exception)',
  },
  {
    variant: 'member-subtle',
    label: 'Member Subtle',
    description: 'Warm amber tint — Walmart+ member (subtle)',
  },
  {
    variant: 'savings',
    label: 'Savings',
    description: 'Solid red — promotional savings / clearance',
  },
  {
    variant: 'savings-outlined',
    label: 'Savings Outlined',
    description: 'White bg, red border — savings indicator (outlined)',
  },
  {
    variant: 'confidence-subtle',
    label: 'Confidence Subtle',
    description: 'Light blue tint — confidence / info badge',
  },
  {
    variant: 'express-subtle',
    label: 'Express Subtle',
    description: 'Lavender tint — Walmart+ Express',
  },
  {
    variant: 'member',
    label: 'Member',
    description: 'Spark yellow — Walmart+ member highlight',
  },
  {
    variant: 'trending',
    label: 'Trending',
    description: 'Orange — trending / promotional accent',
  },
];
