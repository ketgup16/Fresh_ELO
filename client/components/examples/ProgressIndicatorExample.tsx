import React, { useState } from 'react';
import { ProgressIndicator } from '../ui/ProgressIndicator';
import styles from './ExamplePage.module.css';

// ─── Shared style constants ───────────────────────────────────────────────────

const PROP_ROW: React.CSSProperties = {
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
};

const PROP_LABEL: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text, #2E2F32)',
};

const SELECT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '13px',
  fontWeight: 500,
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  background: 'white',
  border: '1px solid var(--ld-semantic-color-separator, #D9DADB)',
  borderRadius: '6px',
  padding: '4px 6px',
  cursor: 'pointer',
  appearance: 'auto',
  outline: 'none',
  width: '100%',
};

const INPUT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '13px',
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  background: 'white',
  border: '1px solid var(--ld-semantic-color-separator, #D9DADB)',
  borderRadius: '6px',
  padding: '4px 8px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const RANGE_STYLE: React.CSSProperties = {
  width: '100%',
  cursor: 'pointer',
  accentColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
};

// ─── Props table ──────────────────────────────────────────────────────────────

const PROPS: { name: string; type: string; default: string; desc: string }[] = [
  { name: 'value', type: 'number', default: '0', desc: 'Current progress value.' },
  { name: 'min', type: 'number', default: '0', desc: 'Minimum value.' },
  { name: 'max', type: 'number', default: '100', desc: 'Maximum value.' },
  { name: 'label', type: 'string', default: '—', desc: 'Label on the left; doubles as aria-label.' },
  { name: 'a11yLabelledBy', type: 'string', default: '—', desc: 'ID of external element that labels the bar (alternative to label).' },
  { name: 'valueLabel', type: 'string', default: '—', desc: 'Custom label on the right (e.g. "750 MB / 1 GB").' },
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", desc: 'Visual variant for different states.' },
  { name: 'className', type: 'string', default: '—', desc: 'Additional CSS class on the container.' },
];

// ─── Variant showcase data ────────────────────────────────────────────────────

const VARIANTS: { variant: 'info' | 'success' | 'warning' | 'error'; label: string; valueLabel: string }[] = [
  { variant: 'info', label: 'Info', valueLabel: '75%' },
  { variant: 'success', label: 'Success', valueLabel: '75%' },
  { variant: 'warning', label: 'Warning', valueLabel: '75%' },
  { variant: 'error', label: 'Error', valueLabel: '75%' },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function ProgressIndicatorExample() {
  const [value, setValue] = useState(65);
  const [max, setMax] = useState(100);
  const [label, setLabel] = useState('Upload Progress');
  const [valueLabel, setValueLabel] = useState('65%');
  const [variant, setVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

      {/* ── Interactive demo ──────────────────────────────────────────────── */}
      <section>
        <h2 className={styles.sectionTitle}>Interactive demo</h2>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'stretch' }}>

          {/* Properties panel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
            borderRadius: '8px',
            background: 'var(--ld-semantic-color-surface, #fff)',
            width: '240px',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            {/* Panel header */}
            <div style={{
              padding: '8px 16px',
              borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
              background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Properties
              </span>
            </div>

            {/* Value slider */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Value — {value}</span>
              <input
                type="range"
                min={0}
                max={max}
                value={value}
                onChange={e => setValue(Number(e.target.value))}
                style={RANGE_STYLE}
              />
            </div>

            {/* Max */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Max</span>
              <input
                type="number"
                value={max}
                min={1}
                onChange={e => setMax(Number(e.target.value))}
                style={INPUT_STYLE}
              />
            </div>

            {/* Label */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Label</span>
              <input
                type="text"
                value={label}
                onChange={e => setLabel(e.target.value)}
                style={INPUT_STYLE}
              />
            </div>

            {/* Value label */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Value label</span>
              <input
                type="text"
                value={valueLabel}
                onChange={e => setValueLabel(e.target.value)}
                style={INPUT_STYLE}
              />
            </div>

            {/* Variant */}
            <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
              <span style={PROP_LABEL}>Variant</span>
              <select
                value={variant}
                onChange={e => setVariant(e.target.value as typeof variant)}
                style={SELECT_STYLE}
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          {/* Preview area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '16px', textAlign: 'center' }}>
              Preview
            </span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
              <ProgressIndicator
                value={value}
                max={max}
                label={label || undefined}
                valueLabel={valueLabel || undefined}
                variant={variant}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Variant showcase ──────────────────────────────────────────────── */}
      <section>
        <h2 className={styles.sectionTitle}>Variants</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '560px' }}>
          {VARIANTS.map(v => (
            <ProgressIndicator
              key={v.variant}
              value={75}
              label={v.label}
              variant={v.variant}
              valueLabel={v.valueLabel}
            />
          ))}
        </div>
      </section>

      {/* ── Without labels ────────────────────────────────────────────────── */}
      <section>
        <h2 className={styles.sectionTitle}>Without labels</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '560px' }}>
          <ProgressIndicator value={45} variant="info" />
          <ProgressIndicator value={70} variant="success" />
          <ProgressIndicator value={55} variant="warning" />
          <ProgressIndicator value={25} variant="error" />
        </div>
      </section>

      {/* ── Custom value labels ───────────────────────────────────────────── */}
      <section>
        <h2 className={styles.sectionTitle}>Custom value labels</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '560px' }}>
          <ProgressIndicator value={75} label="File Upload" variant="info" valueLabel="750 MB / 1 GB" />
          <ProgressIndicator value={40} label="Tasks Complete" variant="info" valueLabel="4 of 10" />
          <ProgressIndicator value={68} label="Storage Usage" variant="warning" valueLabel="68 GB / 100 GB" />
          <ProgressIndicator value={92} label="Disk Space Critical" variant="error" valueLabel="92%" />
        </div>
      </section>

      {/* ── Custom range (min/max) ────────────────────────────────────────── */}
      <section>
        <h2 className={styles.sectionTitle}>Custom range (min / max)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '560px' }}>
          <ProgressIndicator value={3} min={0} max={5} label="Step 3 of 5" variant="info" valueLabel="3 / 5" />
          <ProgressIndicator value={1200} min={500} max={2000} label="Points" variant="success" valueLabel="1 200 / 2 000" />
        </div>
      </section>

      {/* ── Props reference ───────────────────────────────────────────────── */}
      <section>
        <h2 className={styles.sectionTitle}>Props</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROPS.map(p => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)', whiteSpace: 'nowrap' }}>{p.name}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{p.type}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{p.default}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default ProgressIndicatorExample;
