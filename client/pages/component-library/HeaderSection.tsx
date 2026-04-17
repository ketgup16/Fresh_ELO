import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { HeaderSection } from '@/components/ui/HeaderSection';
import styles from '@/components/examples/ExamplePage.module.css';

// ── Shared style helpers ──────────────────────────────────────────────────────
const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const descStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '14px',
  color: 'var(--ld-semantic-color-text-subtle)',
  margin: 0,
  lineHeight: 1.5,
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  color: 'var(--ld-semantic-color-text-subtle)',
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HeaderSectionPage() {
  // Interactive demo controls
  const [size, setSize] = useState<'medium' | 'small'>('medium');
  const [showCount, setShowCount] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showDivider, setShowDivider] = useState(true);
  const [contentInset, setContentInset] = useState(true);

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Section Header"
      description="Defines screen sections and creates typographic hierarchy within a screen. Supports Medium and Small sizes with optional count, description, and trailing action."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

        {/* ① Interactive Demo ─────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p style={descStyle}>
            Use the controls below to explore the component's props and variants.
          </p>

          {/* Size selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={labelStyle}>Size:</span>
            {(['medium', 'small'] as const).map((s) => (
              <label
                key={s}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: '13px',
                  color: 'var(--ld-semantic-color-text)',
                  userSelect: 'none',
                }}
              >
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={size === s}
                  onChange={() => setSize(s)}
                  style={{ accentColor: 'var(--ld-semantic-color-action-fill-primary)', width: '14px', height: '14px', cursor: 'pointer' }}
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            {(
              [
                { label: 'Count', value: showCount, set: setShowCount },
                { label: 'Description', value: showDescription, set: setShowDescription },
                { label: 'Divider', value: showDivider, set: setShowDivider },
                { label: 'Content inset', value: contentInset, set: setContentInset },
              ] as const
            ).map(({ label, value, set }) => (
              <label
                key={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: '13px',
                  color: 'var(--ld-semantic-color-text)',
                  userSelect: 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => set((v: boolean) => !v)}
                  style={{ accentColor: 'var(--ld-semantic-color-action-fill-primary)', width: '14px', height: '14px', cursor: 'pointer' }}
                />
                {label}
              </label>
            ))}
          </div>

          {/* Live preview */}
          <div style={{ maxWidth: '375px' }}>
            <HeaderSection
              size={size}
              title="Title/instruction"
              count={showCount ? 5 : null}
              description={showDescription ? 'Description text for this section providing context to the user.' : null}
              trailingLabel="Button label"
              onTrailingAction={() => {}}
              showDivider={showDivider}
              contentInset={contentInset}
            />
          </div>
        </div>

        {/* ② Variants ─────────────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Variants</h2>
          <p style={descStyle}>
            Section Header ships in two sizes. Medium uses a LinkButton trailing action;
            Small uses a chevron icon to expand/collapse.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <VariantCard label="Medium">
              <HeaderSection
                size="medium"
                title="Title/instruction"
                count={5}
                description="Description text"
                trailingLabel="Button label"
                onTrailingAction={() => {}}
                showDivider
                contentInset
              />
            </VariantCard>

            <VariantCard label="Small">
              <HeaderSection
                size="small"
                title="Title/instruction"
                count={5}
                description="Description text"
                showDivider
                contentInset
              />
            </VariantCard>

            <VariantCard label="Medium — no count, no description">
              <HeaderSection
                size="medium"
                title="Title/instruction"
                trailingLabel="See all"
                onTrailingAction={() => {}}
                showDivider
              />
            </VariantCard>

            <VariantCard label="Medium — no divider, with inset">
              <HeaderSection
                size="medium"
                title="Today's Plan"
                count={12}
                description="Review and start an action below"
                trailingLabel="See all"
                onTrailingAction={() => {}}
                showDivider={false}
                contentInset
              />
            </VariantCard>
          </div>
        </div>

        {/* ③ Anatomy ──────────────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Anatomy</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                  {['Element', 'Description'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '8px 12px', fontWeight: 600,
                      color: 'var(--ld-semantic-color-text)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Title text', 'Required. heading/medium/default (20px 700) for Medium; heading/small/default (18px 700) for Small. Truncated at 2 lines.'],
                  ['Item count', 'Optional. Displayed as (N) after the title. Uses heading/small/alt (18px 400).'],
                  ['Description text', 'Optional. body/medium/default (16px 400). Truncated at 3 lines.'],
                  ['Divider', 'Optional separator rendered full-width at the bottom (showDivider prop).'],
                  ['Action — Medium', '[LD 3.5] Link Button (Size=Small) shown in the trailing position of the title row.'],
                  ['Action — Small', '[LD 3.5] Icon button with ChevronUp / ChevronDown that toggles expand/collapse state.'],
                ].map(([el, desc]) => (
                  <tr key={el} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--ld-semantic-color-text)', whiteSpace: 'nowrap' as const }}>{el}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ④ Component Props ──────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Component Props</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '8px 12px', fontWeight: 600,
                      color: 'var(--ld-semantic-color-text)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['size', "'medium' | 'small'", "'medium'", 'Controls typography scale and trailing action type.'],
                  ['title', 'string', 'required', 'Section heading text — truncated after 2 lines.'],
                  ['count', 'number | null', 'null', 'Optional item count shown as (N) after the title.'],
                  ['description', 'string | null', 'null', 'Optional body text below the title — truncated after 3 lines.'],
                  ['trailingLabel', 'string', "'Button label'", 'Label for the trailing LinkButton (Medium only).'],
                  ['onTrailingAction', '() => void', '—', 'Callback for the trailing action. For Small, overrides the internal chevron toggle.'],
                  ['showDivider', 'boolean', 'true', 'Whether to render a Divider at the bottom.'],
                  ['contentInset', 'boolean', 'false', 'Adds left/right padding to the content area; Divider stays full-width.'],
                  ['UNSAFE_className', 'string', '—', 'Escape hatch for adding a custom class to the root element.'],
                  ['UNSAFE_style', 'React.CSSProperties', '—', 'Escape hatch for adding inline styles to the root element.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' as const }}>{prop}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{type}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' as const }}>{def}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⑤ Usage ────────────────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <pre style={{
            margin: 0, padding: '20px',
            background: 'var(--ld-semantic-color-background-subtle)',
            borderRadius: '6px', fontFamily: 'monospace', fontSize: '13px',
            color: 'var(--ld-semantic-color-text)', overflowX: 'auto', lineHeight: 1.6,
          }}>{`import { HeaderSection } from '@/components/ui/HeaderSection';

// Medium — with LinkButton trailing action
<HeaderSection
  size="medium"
  title="Today's Plan"
  count={5}
  description="Review and start an action for your team."
  trailingLabel="See all"
  onTrailingAction={() => navigate('/plan')}
  showDivider
  contentInset
/>

// Small — with chevron expand/collapse
<HeaderSection
  size="small"
  title="Goal Details"
  count={3}
  showDivider
  contentInset
/>`}</pre>
        </div>

        {/* ⑥ Guidelines ───────────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {[
              { type: 'do', text: 'Use Section Header as the top-level label for each discrete section within a screen to provide clear typographic hierarchy.' },
              { type: 'do', text: 'Use the description slot only when readers need context about the title or its contents. Avoid redundancy with the title.' },
              { type: 'do', text: 'Use Medium size for primary sections and Small size for subsections or collapsible areas within a screen.' },
              { type: 'dont', text: "Don't split content into separate individual widgets — always try to use Section Header with a Divider to contain related content below." },
              { type: 'dont', text: "Don't use more than one inline text entry within the description. For longer content use a separate body element instead." },
            ].map(({ type, text }, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: '6px',
                borderLeft: `3px solid ${type === 'do'
                  ? 'var(--ld-semantic-color-feedback-success-border, #008561)'
                  : 'var(--ld-semantic-color-feedback-error-border, #c40b0b)'}`,
                background: 'var(--ld-semantic-color-background-subtle)',
              }}>
                <div style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const,
                  letterSpacing: '0.06em', marginBottom: '6px',
                  color: type === 'do'
                    ? 'var(--ld-semantic-color-feedback-success-text, #008561)'
                    : 'var(--ld-semantic-color-feedback-error-text, #c40b0b)',
                }}>
                  {type === 'do' ? 'Do' : "Don't"}
                </div>
                <p style={{ ...descStyle, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}

// ── Helper ────────────────────────────────────────────────────────────────────
function VariantCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        color: 'var(--ld-semantic-color-text-subtle)',
      }}>
        {label}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
