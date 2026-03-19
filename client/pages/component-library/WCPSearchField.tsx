import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPSearchField } from '@/components/walmart/WCPSearchField';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ld-semantic-color-surface)',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '18px',
  fontWeight: 700,
  margin: 0,
  color: 'var(--ld-semantic-color-text)',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--ld-semantic-color-text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '8px',
};

const descStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '14px',
  color: 'var(--ld-semantic-color-text-subtle)',
  margin: 0,
  lineHeight: 1.5,
};

const stateGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
};

const stateCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

export default function WCPSearchFieldPage() {
  const [liveValue, setLiveValue] = useState('');
  const [filledValue, setFilledValue] = useState('Text value');

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Search Field"
      description='An inline search input based on the [AX] Search Bar V2 spec. Supports Enabled, Focused, Disabled, and Read-only states with Unfilled and Filled content variants.'
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Interactive Demo */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Interactive Demo</h2>
          <p style={descStyle}>
            Click to focus. Type to fill. The trailing icons adapt per state — mic and barcode
            icons appear when empty, a clear (✕) button when filled, and a Cancel link while
            focused.
          </p>
          <div style={{ maxWidth: '480px' }}>
            <WCPSearchField
              value={liveValue}
              onChange={setLiveValue}
              onClear={() => setLiveValue('')}
              onCancel={() => setLiveValue('')}
            />
          </div>
          {liveValue && (
            <p style={{ ...descStyle, marginTop: '8px' }}>
              Current value: <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>{liveValue}</code>
            </p>
          )}
        </div>

        {/* States */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>States</h2>
          <p style={descStyle}>
            The search field has four states (Enabled, Focused, Disabled, Read-only) and two
            content modes (Unfilled and Filled).
          </p>

          <div style={stateGridStyle}>
            {/* Enabled / Unfilled */}
            <div style={stateCardStyle}>
              <div style={labelStyle}>Enabled — Unfilled</div>
              <WCPSearchField
                value=""
                onChange={() => {}}
              />
              <p style={descStyle}>
                Default resting state. Trailing: mic and barcode icon buttons.
              </p>
            </div>

            {/* Enabled / Filled */}
            <div style={stateCardStyle}>
              <div style={labelStyle}>Enabled — Filled</div>
              <WCPSearchField
                value={filledValue}
                onChange={setFilledValue}
                onClear={() => setFilledValue('')}
              />
              <p style={descStyle}>
                Value present. Trailing: clear (✕) button replaces mic/barcode.
              </p>
            </div>

            {/* Focused / Unfilled */}
            <div style={stateCardStyle}>
              <div style={labelStyle}>Focused — Unfilled</div>
              <FocusedDemo value="" />
              <p style={descStyle}>
                Blue bottom border (2px). Trailing: Cancel link. Cursor blinks in input.
              </p>
            </div>

            {/* Focused / Filled */}
            <div style={stateCardStyle}>
              <div style={labelStyle}>Focused — Filled</div>
              <FocusedDemo value="Text value" />
              <p style={descStyle}>
                Blue border + value present. Trailing: clear (✕) + Cancel link.
              </p>
            </div>

            {/* Disabled */}
            <div style={stateCardStyle}>
              <div style={labelStyle}>Disabled</div>
              <WCPSearchField
                value=""
                placeholder="Search"
                state="disabled"
              />
              <p style={descStyle}>
                Non-interactive. Muted border, fill, and text.
              </p>
            </div>

            {/* Read-only / Filled */}
            <div style={stateCardStyle}>
              <div style={labelStyle}>Read-only — Filled</div>
              <WCPSearchField
                value="Text value"
                state="readOnly"
              />
              <p style={descStyle}>
                Value shown but cannot be edited or interacted with.
              </p>
            </div>
          </div>
        </div>

        {/* Anatomy */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Anatomy</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                  {['Element', 'Description', 'Visibility'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Search icon', 'Leading icon. Always visible.', 'Always'],
                  ['Placeholder / Value', 'Input text or placeholder hint.', 'Always'],
                  ['Mic icon button', 'Triggers voice search.', 'Enabled, unfilled only'],
                  ['Barcode icon button', 'Triggers camera scan.', 'Enabled, unfilled only'],
                  ['Clear (✕) button', 'Clears field value.', 'When value is present'],
                  ['Cancel link', 'Dismisses focus and reverts value.', 'While focused'],
                  ['Bottom border', 'Semantic field border. Thicker (2px) when focused.', 'Always'],
                ].map(([el, desc, vis]) => (
                  <tr key={el} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--ld-semantic-color-text)' }}>{el}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{vis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Props */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Component Props</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['value', 'string', "''", 'Controlled input value.'],
                  ['placeholder', 'string', "'Search'", 'Placeholder text when empty.'],
                  ['state', "'enabled' | 'disabled' | 'readOnly'", "'enabled'", 'Visual and interaction state.'],
                  ['showMic', 'boolean', 'true', 'Show microphone icon button in unfilled state.'],
                  ['showBarcode', 'boolean', 'true', 'Show barcode icon button in unfilled state.'],
                  ['onChange', '(value: string) => void', '—', 'Called on every keystroke.'],
                  ['onClear', '() => void', '—', 'Called when clear (✕) button is pressed.'],
                  ['onCancel', '() => void', '—', 'Called when Cancel link is pressed.'],
                  ['onMicClick', '() => void', '—', 'Called when microphone button is pressed.'],
                  ['onBarcodeClick', '() => void', '—', 'Called when barcode button is pressed.'],
                  ['className', 'string', '—', 'Optional extra class on the root wrapper.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--ld-semantic-color-text-brand)' }}>{prop}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{type}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{def}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Usage</h2>
          <pre style={{
            margin: 0,
            padding: '20px',
            background: 'var(--ld-semantic-color-background-subtle)',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: 'var(--ld-semantic-color-text)',
            overflowX: 'auto',
            lineHeight: 1.6,
          }}>{`import { WCPSearchField } from '@/components/walmart/WCPSearchField';

function MyPage() {
  const [query, setQuery] = React.useState('');

  return (
    <WCPSearchField
      value={query}
      onChange={setQuery}
      onClear={() => setQuery('')}
      onCancel={() => setQuery('')}
      placeholder="Search"
    />
  );
}`}</pre>
        </div>

        {/* Guidelines */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Guidelines</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { type: 'do', text: 'Use for inline / page-scoped search — filtering a list, table, or catalog within the current view.' },
              { type: 'dont', text: "Don't use in the global header for site-wide search — use the dedicated header search bar for that." },
              { type: 'do', text: 'Provide onClear and onCancel callbacks so users can cleanly exit the search state.' },
              { type: 'dont', text: "Don't stack multiple search fields on the same page. One per content area is recommended." },
            ].map(({ type, text }, i) => (
              <div key={i} style={{
                padding: '16px',
                borderRadius: '6px',
                borderLeft: `3px solid ${type === 'do' ? 'var(--ld-semantic-color-feedback-success-border, #008561)' : 'var(--ld-semantic-color-feedback-error-border, #c40b0b)'}`,
                background: 'var(--ld-semantic-color-background-subtle)',
              }}>
                <div style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '6px',
                  color: type === 'do' ? 'var(--ld-semantic-color-feedback-success-text, #008561)' : 'var(--ld-semantic-color-feedback-error-text, #c40b0b)',
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

/** Demo helper — auto-focuses the input to show the focused state visually */
function FocusedDemo({ value: initialValue }: { value: string }) {
  const [val, setVal] = useState(initialValue);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const input = ref.current?.querySelector('input');
    if (input) input.focus();
  }, []);

  return (
    <div ref={ref}>
      <WCPSearchField
        value={val}
        onChange={setVal}
        onClear={() => setVal('')}
        onCancel={() => setVal('')}
      />
    </div>
  );
}
