import React from 'react';
import styles from './WCPFlag.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * WCP Flag visual variants — each maps to a distinct WCP semantic token set.
 *
 * Row 1 – Neutral/default family:
 *   neutral | brand-outlined | member-subtle
 *
 * Row 2 – Savings/negative + info family:
 *   savings | savings-outlined | confidence-subtle
 *
 * Row 3 – Express/brand dark family:
 *   express-subtle | brand | brand-bold
 *
 * Row 4 – Warm accent family:
 *   member | dark | trending
 */
export type WCPFlagVariant =
  // Row 1 — neutral defaults
  | 'neutral'
  | 'brand-outlined'
  | 'member-subtle'
  // Row 2 — savings / info
  | 'savings'
  | 'savings-outlined'
  | 'confidence-subtle'
  // Row 3 — brand dark / express
  | 'express-subtle'
  | 'brand'
  | 'brand-bold'
  // Row 4 — warm accents
  | 'member'
  | 'dark'
  | 'trending';

export interface WCPFlagProps {
  /** Display label inside the flag */
  label?: string;
  /** Visual color variant */
  variant?: WCPFlagVariant;
  /** Leading icon/image (left side). Defaults to a placeholder flag image. */
  leadingIcon?: React.ReactNode;
  /** Trailing icon/image (right side). Defaults to a placeholder flag image. */
  trailingIcon?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WCPFlag({
  label = 'Flag name',
  variant = 'neutral',
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
  { variant: 'neutral',            label: 'Neutral',             description: 'Default gray — generic / no semantic meaning' },
  { variant: 'brand-outlined',     label: 'Brand Outlined',      description: 'White bg, navy border — brand call-out' },
  { variant: 'member-subtle',      label: 'Member Subtle',       description: 'Warm amber tint — Walmart+ member (subtle)' },
  { variant: 'savings',            label: 'Savings',             description: 'Solid red — promotional savings / clearance' },
  { variant: 'savings-outlined',   label: 'Savings Outlined',    description: 'Red border — savings indicator (outlined)' },
  { variant: 'confidence-subtle',  label: 'Confidence Subtle',   description: 'Blue tint — confidence / info badge (subtle)' },
  { variant: 'express-subtle',     label: 'Express Subtle',      description: 'Lavender tint — Walmart+ Express (subtle)' },
  { variant: 'brand',              label: 'Brand',               description: 'Dark navy solid — primary brand fill' },
  { variant: 'brand-bold',         label: 'Brand Bold',          description: 'Deep navy solid — bold brand emphasis' },
  { variant: 'member',             label: 'Member',              description: 'Spark yellow — Walmart+ member highlight' },
  { variant: 'dark',               label: 'Dark',                description: 'Near-black — inverse / high contrast' },
  { variant: 'trending',           label: 'Trending',            description: 'Orange — trending / promotional accent' },
];
