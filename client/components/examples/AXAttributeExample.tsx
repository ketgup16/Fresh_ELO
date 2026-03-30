import React, { useState } from 'react';
import { AXAttribute, AXAttributeSize, AXAttributeColor } from '@/components/walmart/AXAttribute';
import { Placeholder } from '@/components/icons/Placeholder';

// ── Shared card / heading tokens ────────────────────────────────────────────

const CARD: React.CSSProperties = {
  backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
};

const H2: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '20px',
  fontWeight: 700,
  margin: '0 0 8px',
  color: 'var(--ld-semantic-color-text-primary)',
};

const H3: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '14px',
  fontWeight: 600,
  margin: '0 0 16px',
  color: 'var(--ld-semantic-color-text-subtle)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const DESC: React.CSSProperties = {
  margin: '0 0 24px',
  fontSize: '13px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-subtle)',
};

const CHIP_LABEL: React.CSSProperties = {
  fontSize: '11px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontWeight: 600,
  color: 'var(--ld-semantic-color-text-subtle)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  marginBottom: '8px',
  display: 'block',
};

// ── Color metadata ──────────────────────────────────────────────────────────

const SMALL_COLORS: { color: AXAttributeColor; label: string }[] = [
  { color: 'default',  label: 'Default'  },
  { color: 'brand',    label: 'Brand'    },
  { color: 'negative', label: 'Negative' },
  { color: 'inverse',  label: 'Inverse'  },
  { color: 'highlight', label: 'Highlight' },
];

const LARGE_COLORS: { color: AXAttributeColor; label: string }[] = [
  { color: 'default',  label: 'Default'  },
  { color: 'brand',    label: 'Brand'    },
  { color: 'inverse',  label: 'Inverse'  },
  { color: 'highlight', label: 'Highlight' },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function AXAttributeExample() {
  const [demoSize, setDemoSize] = useState<AXAttributeSize>('small');
  const [demoColor, setDemoColor] = useState<AXAttributeColor>('default');
  const [demoLabel, setDemoLabel] = useState('Label');
  const [demoAdditionalLabel, setDemoAdditionalLabel] = useState(false);

  const availableColors = demoSize === 'small' ? SMALL_COLORS : LARGE_COLORS;

  const handleSizeChange = (size: AXAttributeSize) => {
    setDemoSize(size);
  };

  const codeSnippet = `import { AXAttribute } from '@/components/walmart/AXAttribute';

// Default usage
<AXAttribute label="Label" />

// With size and color
<AXAttribute label="Label" size="${demoSize}" color="${demoColor}" />
${demoAdditionalLabel ? `
// With additional label
<AXAttribute label="Label" size="${demoSize}" color="${demoColor}" additionalLabel />
` : ''}
// Custom icon
import { Star } from '@/components/icons/Star';
<AXAttribute label="Label" size="small" color="brand" icon={<Star width={16} height={16} />} />`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Live Demo ── */}
      <div style={CARD}>
        <h2 style={H2}>Interactive demo</h2>
        <p style={DESC}>
          AX Attribute pairs a leading icon with a text label. Use it to surface metadata, status, or categorisation in compact contexts.
        </p>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'stretch', flexWrap: 'wrap' }}>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '200px', borderRight: '1px solid var(--ld-semantic-color-separator, #E3E4E5)', paddingRight: '32px', gap: '0' }}>
            {/* Size */}
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>Size</span>
              <select
                value={demoSize}
                onChange={e => handleSizeChange(e.target.value as AXAttributeSize)}
                style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '13px', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--ld-semantic-color-separator)', background: 'white', cursor: 'pointer' }}
              >
                <option value="small">Small</option>
                <option value="large">Large</option>
              </select>
            </div>
            {/* Color */}
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>Color</span>
              <select
                value={demoColor}
                onChange={e => setDemoColor(e.target.value as AXAttributeColor)}
                style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '13px', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--ld-semantic-color-separator)', background: 'white', cursor: 'pointer' }}
              >
                {availableColors.map(({ color, label }) => (
                  <option key={color} value={color}>{label}</option>
                ))}
              </select>
            </div>
            {/* Label */}
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>Label</span>
              <input
                type="text"
                value={demoLabel}
                onChange={e => setDemoLabel(e.target.value)}
                style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '13px', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--ld-semantic-color-separator)', outline: 'none' }}
              />
            </div>
            {/* Additional Label */}
            <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>Additional Label</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                <input
                  type="checkbox"
                  checked={demoAdditionalLabel}
                  onChange={e => setDemoAdditionalLabel(e.target.checked)}
                  style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                />
                {demoAdditionalLabel ? 'On' : 'Off'}
              </label>
            </div>
          </div>

          {/* Preview */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
            <AXAttribute label={demoLabel || 'Label'} size={demoSize} color={demoColor} additionalLabel={demoAdditionalLabel} />
          </div>
        </div>
      </div>

      {/* ── Sizes ── */}
      <div style={CARD}>
        <h2 style={H2}>Sizes</h2>
        <p style={DESC}>
          AX Attribute comes in two sizes. Small uses a 16×16px icon with body-small text and a 4px gap. Large uses a 20×20px icon with body-medium text and an 8px gap. Small supports all 5 color variants; Large supports 4 (Default, Brand, Inverse, Highlight).
        </p>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
          {([
            { size: 'small' as AXAttributeSize, desc: 'Small · 16px icon · body-small text · 4px gap' },
            { size: 'large' as AXAttributeSize, desc: 'Large · 20px icon · body-medium text · 8px gap' },
          ]).map(({ size, desc }) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <AXAttribute label="Label" size={size} color="default" />
              <span style={{ fontSize: '11px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Color variants ── */}
      <div style={CARD}>
        <h2 style={H2}>Color variants</h2>
        <p style={DESC}>
          Color communicates semantic meaning. Small supports all 5 variants; Large supports 4 (Default, Brand, Inverse, Highlight).
        </p>

        {/* Small */}
        <h3 style={H3}>Small — 5 variants</h3>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'stretch', marginBottom: '32px' }}>
          {SMALL_COLORS.map(({ color, label }) => (
            <div key={color} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ ...CHIP_LABEL, alignSelf: 'flex-start' }}>{label}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={color === 'inverse' ? { backgroundColor: 'var(--ld-semantic-color-background-inverse)', padding: '6px 10px', borderRadius: '4px', display: 'inline-flex' } : {}}>
                  <AXAttribute label="Label" size="small" color={color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Large */}
        <h3 style={H3}>Large — 4 variants</h3>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {LARGE_COLORS.map(({ color, label }) => (
            <div key={color} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ ...CHIP_LABEL, alignSelf: 'flex-start' }}>{label}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={color === 'inverse' ? { backgroundColor: 'var(--ld-semantic-color-background-inverse)', padding: '6px 10px', borderRadius: '4px', display: 'inline-flex' } : {}}>
                  <AXAttribute label="Label" size="large" color={color} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Properties ── */}
      <div style={CARD}>
        <h2 style={H2}>Properties</h2>
        <p style={DESC}>All props accepted by the AXAttribute component.</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['label',     'string',                                                         '—',         'Required. Text displayed to the right of the icon.'],
                ['size',      "'small' | 'large'",                                              "'small'",   'Controls icon size (16px / 20px), gap (4px / 8px), and text style (body-small / body-medium).'],
                ['color',     "'default' | 'brand' | 'negative' | 'inverse' | 'highlight'",  "'default'",  'Small supports all 5 variants. Large supports 4 (Default, Brand, Inverse, Highlight); Negative is Small only.'],
                ['icon',      'React.ReactNode',                                                'Placeholder','Leading icon. Defaults to the Placeholder icon from the LD icon library. Designer can swap with any LD icon.'],
                ['additionalLabel', 'boolean',                                                  'false',     'When true, renders an ArrowRight icon + “Label 2” to the left of the original label, all separated by a 4px space token.'],
                ['className', 'string',                                                         '—',         'Optional class name forwarded to the root <span> element.'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{prop}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{type}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{def}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Color token reference ── */}
      <div style={CARD}>
        <h2 style={H2}>Color token reference</h2>
        <p style={DESC}>Semantic tokens applied per color variant.</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                {['Variant', 'Icon color', 'Label color', 'Background', 'Label weight', 'Sizes'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['default',  'ld-semantic-color-text',            'ld-semantic-color-text',            '—',                                        '400', 'Small, Large'],
                ['brand',    'ld-semantic-color-text-brand',     'ld-semantic-color-text',            '—',                                        '400', 'Small, Large'],
                ['negative', 'ld-semantic-color-text-critical',  'ld-semantic-color-text',            '—',                                        '400', 'Small'],
                ['inverse',  'ld-semantic-color-text-inverse',   'ld-semantic-color-text-inverse',    'ld-semantic-color-background-inverse',     '400', 'Small, Large'],
                ['highlight','ld-semantic-color-text-brand',     'ld-semantic-color-text-brand',      '—',                                        '700', 'Small, Large'],
              ].map(([variant, iconTok, labelTok, bgTok, weight, sizes]) => (
                <tr key={variant} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <div style={variant === 'inverse' ? { backgroundColor: 'var(--ld-semantic-color-background-inverse)', padding: '4px 8px', borderRadius: '4px', display: 'inline-flex' } : {}}>
                      <AXAttribute label={variant} size="small" color={variant as AXAttributeColor} />
                    </div>
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{iconTok}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{labelTok}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{bgTok}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{weight}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{sizes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Code ── */}
      <div style={CARD}>
        <h2 style={H2}>Code</h2>
        <p style={DESC}>Current demo configuration. Update the controls above to see the snippet change.</p>
        <pre style={{
          margin: 0,
          padding: '20px',
          borderRadius: '6px',
          backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary, #F8F8F8)',
          border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}>
          {codeSnippet}
        </pre>
      </div>

    </div>
  );
}
