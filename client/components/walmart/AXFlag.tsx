import React from 'react';
import styles from './AXFlag.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * AX Flag visual variants (12 total).
 *
 * Token strategy:
 *   - All variants use --wcp-semantic-color-fill-* for background
 *   - All variants use --wcp-semantic-color-text-onFill-* for text/icon color
 *   - Exception: `brand-subtle` intentionally uses LD brand tokens so it
 *     tracks brand-theme overrides (e.g. Bodega green, Walmart blue)
 */
export type AXFlagVariant =
  | 'holiday-restricted'
  | 'brand-subtle'
  | 'scarcity'
  | 'savings-bold'
  | 'savings-subtle'
  | 'confidence-subtle'
  | 'confidence-bold'
  | 'confidence-alt'
  | 'confidence'
  | 'holiday-member'
  | 'social'
  | 'urgent';

export interface AXFlagProps {
  /** Display label inside the flag */
  label?: string;
  /** Visual color variant */
  variant?: AXFlagVariant;
  /** Optional leading icon (left side) */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon (right side) */
  trailingIcon?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AXFlag({
  label = 'Flag name',
  variant = 'brand-subtle',
  leadingIcon,
  trailingIcon,
  className,
}: AXFlagProps) {
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

export const AX_FLAG_VARIANTS: Array<{ variant: AXFlagVariant; label: string; description: string }> = [
  {
    variant: 'holiday-restricted',
    label: 'Holiday Restricted',
    description: 'Dark charcoal — items unavailable or restricted during holiday period',
  },
  {
    variant: 'brand-subtle',
    label: 'Brand Subtle',
    description: 'Subtle brand tint — tracks brand theme (LD exception: blue → Bodega green)',
  },
  {
    variant: 'scarcity',
    label: 'Scarcity',
    description: 'Orange — low stock / limited availability indicator',
  },
  {
    variant: 'savings-bold',
    label: 'Savings Bold',
    description: 'Solid red — promotional savings / clearance (high emphasis)',
  },
  {
    variant: 'savings-subtle',
    label: 'Savings Subtle',
    description: 'Light red tint, red text — savings indicator (low emphasis)',
  },
  {
    variant: 'confidence-subtle',
    label: 'Confidence Subtle',
    description: 'Light blue tint — soft confidence / info badge',
  },
  {
    variant: 'confidence-bold',
    label: 'Confidence Bold',
    description: 'Solid blue — confidence badge (standard emphasis)',
  },
  {
    variant: 'confidence-alt',
    label: 'Confidence Alt',
    description: 'White fill, blue border — outlined confidence badge (alternative style)',
  },
  {
    variant: 'confidence',
    label: 'Confidence',
    description: 'Navy blue — confidence badge (high emphasis / deep)',
  },
  {
    variant: 'holiday-member',
    label: 'Holiday Member',
    description: 'Green — Walmart+ member during holiday season',
  },
  {
    variant: 'social',
    label: 'Social',
    description: 'Cyan — social proof indicator (views, interest, popularity)',
  },
  {
    variant: 'urgent',
    label: 'Urgent',
    description: 'Dark red — urgency / time-sensitive / critical action needed',
  },
];
