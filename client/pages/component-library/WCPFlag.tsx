import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { WCPFlag, WCP_FLAG_VARIANTS, type WCPFlagVariant } from '@/components/walmart/WCPFlag';

// ─── Grid layout ─────────────────────────────────────────────────────────────

const GRID: Array<{ row: string; variants: WCPFlagVariant[] }> = [
  {
    row: 'Neutral / Default',
    variants: ['neutral', 'brand-outlined', 'member-subtle'],
  },
  {
    row: 'Savings / Confidence',
    variants: ['savings', 'savings-outlined', 'confidence-subtle'],
  },
  {
    row: 'Express / Brand Dark',
    variants: ['express-subtle', 'brand', 'brand-bold'],
  },
  {
    row: 'Warm Accents',
    variants: ['member', 'dark', 'trending'],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WCPFlagPage() {
  return (
    <div>
      <PageHeader
        section="WCP Patterns"
        title="WCP Flag"
        description="The WCP Flag component surfaces contextual labels — promotions, membership tiers, confidence badges, and more. All 12 variants are fully theme-responsive via WCP and LD semantic tokens."
      />

      <div style={{ padding: '0 48px 64px' }}>

        {/* ── 3 × 4 variant grid ── */}
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
                <WCPFlag variant={variant} label="Flag name" />
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
            marginBottom: '24px',
          }}>
            Each variant maps its background, text, and border to WCP or LD semantic tokens so colors update automatically when the active theme changes.
          </p>

          <div style={{
            background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)',
            overflow: 'hidden',
          }}>
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 1fr 1fr',
              gap: '0',
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
                  gridTemplateColumns: '120px 1fr 1fr 1fr',
                  gap: '0',
                  padding: '12px 16px',
                  alignItems: 'center',
                  borderBottom: i < WCP_FLAG_VARIANTS.length - 1
                    ? '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)'
                    : 'none',
                }}
              >
                {/* Preview */}
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
        </section>

        {/* ── Contextual sizing demo ── */}
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
              <WCPFlag key={m.variant} variant={m.variant} label={m.label} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// ─── Token display helpers ────────────────────────────────────────────────────

const BG_TOKENS: Record<WCPFlagVariant, string> = {
  'neutral':            '--ld-semantic-color-fill-subtle',
  'brand-outlined':     '--ld-semantic-color-fill-surface-primary',
  'member-subtle':      '--wcp-semantic-color-fill-member-subtle',
  'savings':            '--wcp-semantic-color-fill-savings-bold',
  'savings-outlined':   '--ld-semantic-color-fill-surface-primary',
  'confidence-subtle':  '--wcp-semantic-color-fill-confidence-subtle',
  'express-subtle':     '--wcp-semantic-color-fill-express-subtle',
  'brand':              '--ld-semantic-color-border-brand-bold',
  'brand-bold':         '--ld-semantic-color-background-inverse',
  'member':             '--wcp-semantic-color-fill-member',
  'dark':               '--ld-semantic-color-background-inverse',
  'trending':           '--wcp-semantic-color-fill-trending',
};

const TEXT_TOKENS: Record<WCPFlagVariant, string> = {
  'neutral':            '--ld-semantic-color-text',
  'brand-outlined':     '--ld-semantic-color-text-brand-bold',
  'member-subtle':      '--wcp-semantic-color-text-member',
  'savings':            '--wcp-semantic-color-text-onFill-savings',
  'savings-outlined':   '--wcp-semantic-color-text-savings',
  'confidence-subtle':  '--ld-semantic-color-text-brand',
  'express-subtle':     '--wcp-semantic-color-text-express',
  'brand':              '--ld-semantic-color-text-inverse',
  'brand-bold':         '--ld-semantic-color-text-inverse',
  'member':             '--wcp-semantic-color-action-text-primary-alt',
  'dark':               '--ld-semantic-color-text-inverse',
  'trending':           '--ld-semantic-color-text',
};
