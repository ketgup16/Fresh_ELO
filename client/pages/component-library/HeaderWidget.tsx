import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { HeaderWidget } from '@/components/ui/HeaderWidget';
import styles from '@/components/examples/ExamplePage.module.css';

// ── Shared style helpers ──────────────────────────────────────────────────────
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

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HeaderWidgetPage() {
  // Interactive demo controls
  const [navigation, setNavigation] = useState<'None' | 'Chevron' | 'LinkButton'>('None');
  const [type, setType] = useState<'Default' | 'Error'>('Default');
  const [showCount, setShowCount] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showDivider, setShowDivider] = useState(false);

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Widget Header"
      description="Provides a concise title, optional count, optional description, and optional trailing action for a widget (a self-contained card or section within a screen). Use once per widget, positioned at the top."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

        {/* ① Interactive Demo ─────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p style={descStyle}>
            Use the controls below to explore the component's props and variants.
          </p>

          {/* Navigation selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={labelStyle}>Navigation:</span>
            {(['None', 'Chevron', 'LinkButton'] as const).map((n) => (
              <label
                key={n}
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
                  name="navigation"
                  value={n}
                  checked={navigation === n}
                  onChange={() => setNavigation(n)}
                  style={{ accentColor: 'var(--ld-semantic-color-action-fill-primary)', width: '14px', height: '14px', cursor: 'pointer' }}
                />
                {n}
              </label>
            ))}
          </div>

          {/* Type selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={labelStyle}>Type:</span>
            {(['Default', 'Error'] as const).map((t) => (
              <label
                key={t}
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
                  name="type"
                  value={t}
                  checked={type === t}
                  onChange={() => setType(t)}
                  style={{ accentColor: 'var(--ld-semantic-color-action-fill-primary)', width: '14px', height: '14px', cursor: 'pointer' }}
                />
                {t}
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
            <HeaderWidget
              title="Widget title"
              count={showCount ? 5 : null}
              description={showDescription ? 'Description text (optional)' : null}
              navigation={navigation}
              trailingLabel="Button label"
              onTrailingAction={() => {}}
              type={type}
              alertMessage="Failed to load content."
              alertActionLabel="Try again"
              onAlertAction={() => {}}
              showDivider={showDivider}
            />
          </div>
        </div>

        {/* ② Variants ─────────────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Variants</h2>
          <p style={descStyle}>
            Widget Header supports three trailing navigation types: None, Chevron, and LinkButton, plus an Error type.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <VariantCard label="None — no trailing action">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="None"
              />
            </VariantCard>

            <VariantCard label="Chevron">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="Chevron"
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="LinkButton">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="LinkButton"
                trailingLabel="Button label"
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="Error type">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="Chevron"
                type="Error"
                alertMessage="Failed to load content."
                alertActionLabel="Try again"
                onAlertAction={() => {}}
                onTrailingAction={() => {}}
              />
            </VariantCard>

            <VariantCard label="With divider">
              <HeaderWidget
                title="Widget title"
                count={5}
                description="Description text (optional)"
                navigation="None"
                showDivider
              />
            </VariantCard>

            <VariantCard label="Title only">
              <HeaderWidget
                title="Widget title"
                navigation="Chevron"
                onTrailingAction={() => {}}
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
                  ['Title text', 'Optional. heading/large/default (24px / 700). Truncated at 2 lines.'],
                  ['Item count', 'Optional. Displayed as (N) after the title. Uses body/large/default (18px / 400).'],
                  ['Description text', 'Optional. body/medium/default (16px / 400). Truncated at 3 lines.'],
                  ['Action — None', 'No trailing element rendered.'],
                  ['Action — Chevron', '[LD 3.5] Icon button (round, ghost) with ChevronRight icon in the trailing position of the title row.'],
                  ['Action — LinkButton', '[LD 3.5] Link Button (Size=Small) shown in the trailing position of the title row.'],
                  ['Divider', 'Optional decorative horizontal divider rendered at the bottom (16px top padding).'],
                  ['Alert (Error)', 'Warning Alert rendered below content when type="Error" (8px top padding).'],
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
                  ['title', 'string', '—', 'Widget title text. Truncated after 2 lines.'],
                  ['count', 'number | null', 'null', 'Optional item count shown as (N) after the title.'],
                  ['description', 'string | null', 'null', 'Optional body text below the title row. Truncated after 3 lines.'],
                  ['showDivider', 'boolean', 'false', 'Renders a decorative Divider at the bottom (16px top padding).'],
                  ['navigation', "'None' | 'Chevron' | 'LinkButton'", "'None'", 'Trailing action type rendered in the title row.'],
                  ['trailingLabel', 'string', "'Button label'", "Label for the trailing LinkButton (navigation='LinkButton' only)."],
                  ['onTrailingAction', '() => void', '—', 'Callback fired when the Chevron button or LinkButton is activated.'],
                  ['type', "'Default' | 'Error'", "'Default'", "Error renders a Warning Alert below the content."],
                  ['alertMessage', 'string', "'Failed to load content.'", 'Alert body text (type="Error" only).'],
                  ['alertActionLabel', 'string', "'Try again'", 'Alert action button label (type="Error" only).'],
                  ['onAlertAction', '() => void', '—', 'Callback for the alert action button (type="Error" only).'],
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
          }}>{`import { HeaderWidget } from '@/components/ui/HeaderWidget';

// With Chevron navigation and divider
<HeaderWidget
  title="Today's summary"
  count={5}
  description="Outcome metrics for today."
  navigation="Chevron"
  onTrailingAction={() => navigate('/summary')}
  showDivider
/>

// With LinkButton navigation
<HeaderWidget
  title="Track progress"
  count={3}
  navigation="LinkButton"
  trailingLabel="View all"
  onTrailingAction={() => navigate('/progress')}
/>

// Error type
<HeaderWidget
  title="Widget title"
  type="Error"
  alertMessage="Failed to load content."
  alertActionLabel="Try again"
  onAlertAction={handleRetry}
/>

// No trailing action
<HeaderWidget
  title="Widget title"
  description="Description text (optional)"
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
              { type: 'do', text: 'Use once per widget, positioned at the top, to help users quickly understand the purpose and contents of the widget.' },
              { type: 'do', text: 'Keep titles concise; use descriptions only when needed to provide needed context to the title or when giving instruction.' },
              { type: 'do', text: 'Use the Divider component to visually separate the widget header from its content when a distinct boundary is needed.' },
              { type: 'dont', text: "Don't use more than once within an individual widget. Consider using another header type with a different typographic hierarchy." },
              { type: 'dont', text: "Don't use in positions other than the top of a widget's content area." },
              { type: 'dont', text: 'Avoid redundancy with surrounding content. Use the Widget Header to focus the visual.' },
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
