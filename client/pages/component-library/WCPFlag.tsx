import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { WCPFlag, WCP_FLAG_VARIANTS, type WCPFlagVariant } from '@/components/walmart/WCPFlag';
import {
  Gift,
  Star,
  Hourglass,
  Dollar,
  Tag,
  ShieldCheck,
  CheckCircle,
  Check,
  Lock,
  Spark,
  UsersFill,
  Flash,
} from '@/components/icons';

// ─── Icon size shared across all flag examples ────────────────────────────────

const ICON_SIZE = { width: 16, height: 16 } as const;

// ─── Per-variant icon map ─────────────────────────────────────────────────────

const VARIANT_ICONS: Record<WCPFlagVariant, React.ReactNode> = {
  'holiday-restricted': <Lock        {...ICON_SIZE} />,
  'brand-subtle':       <Star        {...ICON_SIZE} />,
  'scarcity':           <Hourglass   {...ICON_SIZE} />,
  'savings-bold':       <Dollar      {...ICON_SIZE} />,
  'savings-subtle':     <Tag         {...ICON_SIZE} />,
  'confidence-subtle':  <ShieldCheck {...ICON_SIZE} />,
  'confidence-bold':    <ShieldCheck {...ICON_SIZE} />,
  'confidence-alt':     <Check       {...ICON_SIZE} />,
  'confidence':         <CheckCircle {...ICON_SIZE} />,
  'holiday-member':     <Gift        {...ICON_SIZE} />,
  'social':             <UsersFill   {...ICON_SIZE} />,
  'urgent':             <Flash       {...ICON_SIZE} />,
};

// ─── Token reference data ─────────────────────────────────────────────────────

const BG_TOKENS: Record<WCPFlagVariant, string> = {
  'holiday-restricted': '--wcp-semantic-color-fill-holiday-restricted (gray-10)',
  'brand-subtle':       '--ld-semantic-color-fill-brand-subtle *',
  'scarcity':           '--wcp-semantic-color-fill-scarcity (spark-10)',
  'savings-bold':       '--wcp-semantic-color-fill-savings-bold (red-100)',
  'savings-subtle':     '--wcp-semantic-color-fill-savings-subtle (white)',
  'confidence-subtle':  '--wcp-semantic-color-fill-confidence-subtle (blue-10)',
  'confidence-bold':    '--wcp-semantic-color-fill-confidence-bold (blue-180)',
  'confidence-alt':     '--wcp-semantic-color-fill-confidence-alt (blue-160)',
  'confidence':         '--wcp-semantic-color-fill-confidence (blue-160)',
  'holiday-member':     '--wcp-semantic-color-fill-holiday-member (spark-100)',
  'social':             '--wcp-semantic-color-fill-social (white)',
  'urgent':             '--wcp-semantic-color-fill-urgent (yellow-100)',
};

const TEXT_TOKENS: Record<WCPFlagVariant, string> = {
  'holiday-restricted': '--wcp-semantic-color-text-onFill-holiday-restricted (gray-130)',
  'brand-subtle':       '--ld-semantic-color-text-on-fill-brand-subtle *',
  'scarcity':           '--wcp-semantic-color-text-onFill-scarcity (spark-160)',
  'savings-bold':       '--wcp-semantic-color-text-onFill-savings (white)',
  'savings-subtle':     '--wcp-semantic-color-text-onFill-savings-subtle (red-130)',
  'confidence-subtle':  '--wcp-semantic-color-text-onFill-confidence-subtle (blue-130)',
  'confidence-bold':    '--wcp-semantic-color-text-onFill-confidence-bold (white)',
  'confidence-alt':     '--wcp-text-onFill-confidence-alt (white) / icon: icon-onFill-confidence-alt (spark-100)',
  'confidence':         '--wcp-semantic-color-text-onFill-confidence (white)',
  'holiday-member':     '--wcp-semantic-color-text-onFill-holiday-member (blue-180)',
  'social':             '--wcp-semantic-color-text-onFill-social (blue-100)',
  'urgent':             '--wcp-semantic-color-text-onFill-urgent (gray-160)',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WCPFlagPage() {
  return (
    <div>
      <PageHeader
        section="WCP Components"
        title="Flag"
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
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}>
            {WCP_FLAG_VARIANTS.map(({ variant, label }) => (
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
                  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                }}
              >
                <WCPFlag variant={variant} label={label} leadingIcon={VARIANT_ICONS[variant]} />
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
            All variants use <code style={{ fontFamily: 'monospace' }}>--wcp-semantic-color-fill-*</code> for background
            and <code style={{ fontFamily: 'monospace' }}>--wcp-semantic-color-text-onFill-*</code> for text — proper semantic pairs.{' '}
            <strong>brand-subtle</strong> <span style={{ opacity: 0.7 }}>(*)</span> is the lone exception — it uses LD brand tokens
            so it tracks brand-theme overrides (Bodega green, etc.).
          </p>

          <div style={{
            background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            overflow: 'hidden',
            marginTop: '16px',
          }}>
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '130px minmax(0,1fr) minmax(0,1.6fr) minmax(0,1.6fr)',
              padding: '10px 16px',
              background: 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)',
              borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}>
              {['Preview', 'Variant', 'Fill token (bg)', 'Text-onFill token'].map(h => (
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
                  gridTemplateColumns: '130px minmax(0,1fr) minmax(0,1.6fr) minmax(0,1.6fr)',
                  padding: '12px 16px',
                  alignItems: 'center',
                  borderBottom: i < WCP_FLAG_VARIANTS.length - 1
                    ? '1px solid var(--ld-semantic-color-separator, #e3e4e5)'
                    : 'none',
                }}
              >
                {/* Preview — color swatch only, no icons */}
                <div>
                  <WCPFlag variant={meta.variant} label="Flag name" />
                </div>

                {/* Variant name + description */}
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

                {/* Fill (bg) token */}
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ld-semantic-color-text-secondary, #74767c)', paddingRight: '8px' }}>
                  {BG_TOKENS[meta.variant]}
                </div>

                {/* Text-onFill token */}
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
            * brand-subtle uses LD brand tokens by design — it responds to brand-theme overrides (Bodega: green).
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
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
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
