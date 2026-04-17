import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { IntelligentRecommendation } from '@/components/ui/IntelligentRecommendation';
import { Clock } from '@/components/icons/Clock';
import { User } from '@/components/icons/User';
import styles from '@/components/examples/ExamplePage.module.css';

// ── Shared style constants (mirrors AXSearchBarPage conventions) ─────────────
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
  marginBottom: '6px',
  color: 'var(--ld-semantic-color-text-subtle)',
};

// ── Demo content used in multiple places ─────────────────────────────────────
const DEMO_ATTRIBUTES = [
  { icon: <Clock width={16} height={16} />, label: '116h total work across all goals' },
  { icon: <User width={16} height={16} />, label: '112h associate labor available' },
];

const DEMO_SOURCE_LINKS = [
  { label: 'Store sales data', onClick: () => {} },
  { label: 'Inventory report', onClick: () => {} },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function IntelligentRecommendationPage() {
  // Interactive demo controls
  const [showDescription, setShowDescription] = useState(true);
  const [showLightEyebrow, setShowLightEyebrow] = useState(false);
  const [buttonType, setButtonType] = useState<'none' | 'single' | 'dual' | 'triple'>('single');
  const [showSources, setShowSources] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <ComponentPageLayout
      section="AX Components"
      title="Intelligent Recommendation"
      description="AI recommendation card with eyebrow, title, optional attributes, content slot, alert, 0–3 buttons, and a collapsible sources section."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

        {/* ① Interactive Demo ─────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p style={descStyle}>
            Use the toggles below to explore the component's optional sections and button arrangements.
          </p>

          {/* Controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            {(
              [
                { label: 'Description', value: showDescription, set: setShowDescription },
                { label: 'Light eyebrow', value: showLightEyebrow, set: setShowLightEyebrow },
                { label: 'Sources', value: showSources, set: setShowSources },
                { label: 'Alert', value: showAlert, set: setShowAlert },
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

          {/* Button-type selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={labelStyle}>Button type:</span>
            {(['none', 'single', 'dual', 'triple'] as const).map((bt) => (
              <label
                key={bt}
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
                  name="buttonType"
                  value={bt}
                  checked={buttonType === bt}
                  onChange={() => setButtonType(bt)}
                  style={{ accentColor: 'var(--ld-semantic-color-action-fill-primary)', width: '14px', height: '14px', cursor: 'pointer' }}
                />
                {bt}
              </label>
            ))}
          </div>

          {/* Live card */}
          <div style={{ maxWidth: '343px' }}>
            <IntelligentRecommendation
              title="Generate tonight's plan"
              showLightEyebrow={showLightEyebrow}
              lightEyebrowText="Stocking Night"
              showDescription={showDescription}
              description="Sidekick will help you plan stocking work and adjust for your store's unique needs."
              attributes={DEMO_ATTRIBUTES}
              buttonType={buttonType}
              primaryLabel="Plan your team's shift"
              onPrimary={() => {}}
              secondaryLabel="Dismiss"
              onSecondary={() => {}}
              tertiaryLabel="View details"
              onTertiary={() => {}}
              showAlert={showAlert}
              alertMessage="Unable to generate plan. Store data is unavailable."
              alertActionLabel="Retry"
              onAlertAction={() => {}}
              showSources={showSources}
              sourceDescription="This recommendation is based on your store's sales data, inventory, and process guides from yesterday."
              sourceLinks={DEMO_SOURCE_LINKS}
            />
          </div>
        </div>

        {/* ② Button Variants ──────────────────────────────────────────── */}
        <div style={sectionStyle}>
          <h2 className={styles.sectionTitle}>Button Variants</h2>
          <p style={descStyle}>
            The <code style={{ fontFamily: 'monospace', fontSize: '12px' }}>buttonType</code> prop
            controls the button arrangement. Choose the fewest buttons needed to complete the
            recommended action.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 343px))',
            gap: '24px',
          }}>
            {/* 0 buttons */}
            <VariantCard label="0 buttons — none">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="none"
              />
            </VariantCard>

            {/* 1 button */}
            <VariantCard label="1 button — single (Primary)">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="single"
                primaryLabel="Plan your team's shift"
                onPrimary={() => {}}
              />
            </VariantCard>

            {/* 2 buttons */}
            <VariantCard label="2 buttons — dual (Alternate + Primary)">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="dual"
                primaryLabel="Plan shift"
                onPrimary={() => {}}
                secondaryLabel="Dismiss"
                onSecondary={() => {}}
              />
            </VariantCard>

            {/* 3 buttons */}
            <VariantCard label="3 buttons — triple (Alternate + Primary + Tertiary)">
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work."
                buttonType="triple"
                primaryLabel="Plan shift"
                onPrimary={() => {}}
                secondaryLabel="Dismiss"
                onSecondary={() => {}}
                tertiaryLabel="View details"
                onTertiary={() => {}}
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
                  {['#', 'Element', 'Notes'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '8px 12px', fontWeight: 600,
                      color: 'var(--ld-semantic-color-text)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['1', 'Container', 'Brand surface fill (ld-semantic-color-surface-brand), 8px border radius'],
                  ['2', 'Eyebrow', 'MagicFill icon + "Recommendation" bold text — always visible'],
                  ['2a', 'Light eyebrow', 'Optional secondary label, 1-line truncated (showLightEyebrow)'],
                  ['3', 'Title', 'Bold, 2-line truncated (required)'],
                  ['4', 'Description', 'Optional body text below the title (showDescription)'],
                  ['5', 'Attributes', 'Up to 4 rows — icon + label each (attributes prop)'],
                  ['6', 'Action details', 'Customisable content slot in white surface panel (children)'],
                  ['7', 'Alert', 'Conditional error alert below the content slot (showAlert)'],
                  ['8', 'Button(s)', '0–3 buttons determined by buttonType'],
                  ['9', 'Sources', 'Collapsible: Divider + Show/Hide link + description + source links (showSources)'],
                ].map(([num, el, notes]) => (
                  <tr key={num} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600, whiteSpace: 'nowrap' as const }}>{num}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--ld-semantic-color-text)', whiteSpace: 'nowrap' as const }}>{el}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{notes}</td>
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
                  ['title', 'string', 'required', 'Recommendation heading — truncated after 2 lines.'],
                  ['eyebrow', 'string', '"Recommendation"', 'Bold eyebrow label next to the MagicFill icon.'],
                  ['showLightEyebrow', 'boolean', 'false', 'Show the secondary light-weight eyebrow label.'],
                  ['lightEyebrowText', 'string', '—', 'Text for the light eyebrow (requires showLightEyebrow).'],
                  ['showDescription', 'boolean', 'false', 'Show body description text below the title.'],
                  ['description', 'string', '—', 'Body text (requires showDescription).'],
                  ['attributes', 'IntelligentRecommendationAttribute[]', '—', 'Up to 4 icon + label rows.'],
                  ['children', 'ReactNode', '—', 'Content slot rendered inside a white surface panel.'],
                  ['showAlert', 'boolean', 'false', 'Show the error alert below the content slot.'],
                  ['alertMessage', 'string', '—', 'Alert body text.'],
                  ['alertActionLabel', 'string', '—', 'Label for the alert action link.'],
                  ['onAlertAction', '() => void', '—', 'Callback for the alert action link.'],
                  ["buttonType", "'none'|'single'|'dual'|'triple'", "'none'", 'Button arrangement (0–3 buttons).'],
                  ['primaryLabel', 'string', '"Primary"', 'Label for the primary button.'],
                  ['onPrimary', '() => void', '—', 'Callback for the primary button.'],
                  ['secondaryLabel', 'string', '"Alternate"', 'Label for the secondary/Alternate button (dual/triple).'],
                  ['onSecondary', '() => void', '—', 'Callback for the secondary button.'],
                  ['tertiaryLabel', 'string', '"Tertiary"', 'Label for the third button (triple only).'],
                  ['onTertiary', '() => void', '—', 'Callback for the tertiary button.'],
                  ['showSources', 'boolean', 'false', 'Show the collapsible sources section.'],
                  ['sourceDescription', 'string', '—', 'Explanation text shown when sources are expanded.'],
                  ['sourceLinks', 'IntelligentRecommendationSourceLink[]', '—', 'Source link buttons shown after the description.'],
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
          }}>{`import { IntelligentRecommendation } from '@/components/ui/IntelligentRecommendation';
import { Clock } from '@/components/icons/Clock';
import { User } from '@/components/icons/User';

<IntelligentRecommendation
  title="Generate tonight's plan"
  showDescription
  description="Sidekick will help you plan stocking work and adjust for your store's unique needs."
  attributes={[
    { icon: <Clock />, label: '116h total work across all goals' },
    { icon: <User />, label: '112h associate labor available' },
  ]}
  buttonType="single"
  primaryLabel="Plan your team's shift"
  onPrimary={() => {}}
  showSources
  sourceDescription="This recommendation is based on your store's sales data, inventory, and process guides from yesterday."
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
              { type: 'do', text: 'Use to surface AI-driven recommendations at the top of a workflow — the card draws attention and provides context before action buttons.' },
              { type: 'do', text: 'Keep the title concise (2 lines max) and use the description for supporting detail.' },
              { type: 'do', text: "Show sources when the recommendation is derived from store data, so associates can verify the basis." },
              { type: 'dont', text: "Don't use more than one IntelligentRecommendation card in the same visible area — it dilutes the AI signal." },
              { type: 'dont', text: "Don't place the card inside a narrow container that restricts its width — it should fill its parent container." },
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

// ── Helper components ─────────────────────────────────────────────────────────

/** Wrapper card for the Button Variants section. */
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
      {children}
    </div>
  );
}
