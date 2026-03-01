import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { WCPFlag, WCP_FLAG_VARIANTS, type WCPFlagVariant } from '@/components/walmart/WCPFlag';
import {
  Star,
  Spark,
  Dollar,
  Coupon,
  ShieldCheck,
  Rocket,
  ArrowUp,
} from '@/components/icons';

// ─── Icon size shared across all flag examples ────────────────────────────────

const ICON_SIZE = { width: 16, height: 16 } as const;

// ─── Per-variant icon map ─────────────────────────────────────────────────────

const VARIANT_ICONS: Record<WCPFlagVariant, React.ReactNode> = {
  'brand-subtle':      <Star          {...ICON_SIZE} />,
  'member-subtle':     <Spark         {...ICON_SIZE} />,
  'savings':           <Dollar        {...ICON_SIZE} />,
  'savings-outlined':  <Coupon        {...ICON_SIZE} />,
  'confidence-subtle': <ShieldCheck   {...ICON_SIZE} />,
  'express-subtle':    <Rocket        {...ICON_SIZE} />,
  'member':            <Spark         {...ICON_SIZE} />,
  'trending':          <ArrowUp       {...ICON_SIZE} />,
};

// ─── Grid layout ─────────────────────────────────────────────────────────────

const GRID: Array<{ row: string; variants: WCPFlagVariant[] }> = [
  {
    row: 'Brand / Member',
    variants: ['brand-subtle', 'member-subtle', 'member'],
  },
  {
    row: 'Savings / Confidence',
    variants: ['savings', 'savings-outlined', 'confidence-subtle'],
  },
  {
    row: 'Express / Trending',
    variants: ['express-subtle', 'trending'],
  },
];

// ─── Token reference data ─────────────────────────────────────────────────────

const BG_TOKENS: Record<WCPFlagVariant, string> = {
  'brand-subtle':      '--ld-semantic-color-fill-surface-primary *',
  'member-subtle':     '--wcp-semantic-color-fill-member-subtle',
  'savings':           '--wcp-semantic-color-fill-savings-bold',
  'savings-outlined':  '--wcp-semantic-color-input-background',
  'confidence-subtle': '--wcp-semantic-color-fill-confidence-subtle',
  'express-subtle':    '--wcp-semantic-color-fill-express-subtle',
  'member':            '--wcp-semantic-color-fill-member',
  'trending':          '--wcp-semantic-color-fill-trending',
};

const TEXT_TOKENS: Record<WCPFlagVariant, string> = {
  'brand-subtle':      '--ld-semantic-color-text-brand-bold *',
  'member-subtle':     '--wcp-semantic-color-text-member',
  'savings':           '--wcp-semantic-color-text-onFill-savings',
  'savings-outlined':  '--wcp-semantic-color-text-savings',
  'confidence-subtle': '--wcp-semantic-color-text-confidence',
  'express-subtle':    '--wcp-semantic-color-text-express',
  'member':            '--wcp-semantic-color-action-text-primary-alt',
  'trending':          '--wcp-semantic-color-text-trending',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WCPFlagPage() {
  return (
    <div>
      <PageHeader
        section="WCP Patterns"
        title="WCP Flag"
        description="Contextual labels for promotions, membership tiers, confidence badges, and more. All variants use WCP semantic tokens and are fully theme-responsive."
      />

      <div style={{ padding: '0 48px 64px' }}>

        {/* ── Variant grid ── */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
            marginBottom: '24px',
          }}>
            All Variants
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}>
            {GRID.flatMap(row => row.variants).map(variant => (
              <div
                key={variant}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '20px 16px',
                  background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
                  borderRadius: '8px',
                  border: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)',
                }}
              >
                <WCPFlag variant={variant} label="Flag name" leadingIcon={VARIANT_ICONS[variant]} />
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                  textAlign: 'center',
                }}>
                  {variant}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Token reference table ── */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
            marginBottom: '8px',
          }}>
            Token Reference
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtle, #74767c)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            marginBottom: '8px',
          }}>
            All variants use <code style={{ fontFamily: 'monospace' }}>--wcp-semantic-color-*</code> tokens so colors are commerce-specific and theme-stable. <strong>brand-subtle</strong> <span style={{ opacity: 0.7 }}>(*)</span> is the lone exception — it intentionally uses LD brand tokens so it tracks brand-theme overrides (Bodega green, etc.).
          </p>

          <div style={{
            background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)',
            overflow: 'hidden',
            marginTop: '16px',
          }}>
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '140px minmax(0,1.2fr) minmax(0,1.4fr) minmax(0,1.4fr)',
              padding: '10px 16px',
              background: 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)',
              borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)',
            }}>
              {['Preview', 'Variant', 'Background token', 'Text token'].map(h => (
                <span key={h} style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Data rows */}
            {WCP_FLAG_VARIANTS.map((meta, i) => (
              <div
                key={meta.variant}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px minmax(0,1.2fr) minmax(0,1.4fr) minmax(0,1.4fr)',
                  padding: '12px 16px',
                  alignItems: 'center',
                  borderBottom: i < WCP_FLAG_VARIANTS.length - 1
                    ? '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)'
                    : 'none',
                }}
              >
                {/* Preview — no icons, color only */}
                <div>
                  <WCPFlag variant={meta.variant} label="Flag name" />
                </div>

                {/* Variant name */}
                <div>
                  <code style={{
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
                  }}>
                    {meta.variant}
                  </code>
                  <span style={{
                    display: 'block',
                    fontSize: '11px',
                    color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                    marginTop: '2px',
                    fontFamily: 'var(--ld-semantic-font-family-sans)',
                  }}>
                    {meta.description}
                  </span>
                </div>

                {/* BG token */}
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ld-semantic-color-text-secondary, #74767c)', paddingRight: '8px' }}>
                  {BG_TOKENS[meta.variant]}
                </div>

                {/* Text token */}
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ld-semantic-color-text-secondary, #74767c)' }}>
                  {TEXT_TOKENS[meta.variant]}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '12px',
            color: 'var(--ld-semantic-color-text-subtle, #74767c)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            marginTop: '10px',
          }}>
            * brand-subtle uses LD brand tokens by design — it responds to brand-theme overrides.
          </p>
        </section>

        {/* ── In Context ── */}
        <section>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
            marginBottom: '8px',
          }}>
            In Context
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-subtle, #74767c)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            marginBottom: '24px',
          }}>
            Flags are inline elements that size to their content and sit naturally alongside text or within list items.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '24px',
            background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)',
          }}>
            {WCP_FLAG_VARIANTS.map(m => (
              <WCPFlag key={m.variant} variant={m.variant} label={m.label} leadingIcon={VARIANT_ICONS[m.variant]} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
