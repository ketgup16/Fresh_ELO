import * as React from 'react';
import { useState } from 'react';
import { List, ListItem, ListItemLeading, ListItemTrailing } from '@/components/ui/List';

// ─── Shared style constants (matches AXAvatarButtonExample) ──────────────────

const HEADING: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '700',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-primary)',
  marginBottom: '16px',
};

const CARD: React.CSSProperties = {
  backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
};

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

// ─── Main component ───────────────────────────────────────────────────────────

export function ListExample() {
  // ── Interactive demo state ──
  const [leading, setLeading] = useState<ListItemLeading>('empty');
  const [trailing, setTrailing] = useState<ListItemTrailing>('empty');
  const [title, setTitle] = useState('Action title');
  const [showText, setShowText] = useState(true);
  const [itemText, setItemText] = useState('Action description (optional).');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Interactive Demo ─────────────────────────────────────────── */}
      <div style={CARD}>
        <h3 style={HEADING}>Interactive demo</h3>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'stretch' }}>

          {/* Properties panel */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
            borderRadius: '8px',
            background: 'var(--ld-semantic-color-surface, #fff)',
            width: '240px', overflow: 'hidden', flexShrink: 0,
          }}>
            {/* Panel heading */}
            <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)', background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Properties
              </span>
            </div>

            {/* Leading */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Leading</span>
              <select value={leading} onChange={e => setLeading(e.target.value as ListItemLeading)} style={SELECT_STYLE}>
                <option value="empty">Empty</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Trailing */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Trailing</span>
              <select value={trailing} onChange={e => setTrailing(e.target.value as ListItemTrailing)} style={SELECT_STYLE}>
                <option value="empty">Empty</option>
                <option value="icon">Icon</option>
                <option value="link">Link</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Title */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Title</span>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={INPUT_STYLE}
              />
            </div>

            {/* Show description toggle */}
            <div style={{ ...PROP_ROW }}>
              <span style={PROP_LABEL}>Action description</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showText}
                  onChange={e => setShowText(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>

            {/* Description text — only when showText */}
            {showText && (
              <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
                <span style={PROP_LABEL}>Action description text</span>
                <input
                  type="text"
                  value={itemText}
                  onChange={e => setItemText(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}
            {!showText && <div style={{ flex: 1 }} />}
          </div>

          {/* Live preview */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '12px' }}>
              Preview
            </span>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
              borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
              background: 'var(--ld-semantic-color-surface, #fff)',
              padding: '24px',
            }}>
              <List aria-label="Interactive demo" style={{ width: '100%' }}>
                <ListItem
                  title={title || 'ListItem title'}
                  text={showText ? itemText : undefined}
                  leading={leading}
                  leadingContent={leading === 'custom' ? <CustomSlotPlaceholder /> : undefined}
                  trailing={trailing}
                  trailingLink={trailing === 'link' ? { text: 'Trailing link', href: '#' } : undefined}
                  trailingContent={trailing === 'custom' ? <CustomSlotPlaceholder /> : undefined}
                />
              </List>
            </div>
          </div>

        </div>
      </div>

      {/* ── Leading: Empty ───────────────────────────────────────────── */}
      <div style={CARD}>
        <h3 style={{ ...HEADING, marginBottom: '4px' }}>Leading: Empty</h3>
        <p style={{ fontSize: '14px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 24px' }}>
          No leading content — text-only list items with all four trailing variants.
        </p>
        <div style={{
          padding: '24px',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
          backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
        }}>
          <List aria-label="Empty leading demo" style={{ gap: '16px', width: '100%' }}>
            <ListItem title="Action title" text="Action description (optional)." />
            <ListItem
              title="Action title"
              text="Action description (optional)."
              trailing="icon"
            />
            <ListItem
              title="Action title"
              text="Action description (optional)."
              trailing="link"
              trailingLink={{ text: 'Trailing link', href: '#' }}
            />
            <ListItem
              title="Action title"
              text="Action description (optional)."
              trailing="custom"
              trailingContent={<CustomSlotPlaceholder />}
            />
          </List>
        </div>
      </div>

      {/* ── Leading: Custom ──────────────────────────────────────────── */}
      <div style={CARD}>
        <h3 style={{ ...HEADING, marginBottom: '4px' }}>Leading: Custom</h3>
        <p style={{ fontSize: '14px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 24px' }}>
          Arbitrary custom content in the leading slot (e.g. images, avatars, charts).
        </p>
        <div style={{
          padding: '24px',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
          backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
        }}>
          <List aria-label="Custom leading demo" style={{ gap: '16px', width: '100%' }}>
            <ListItem
              title="Action title"
              text="Action description (optional)."
              leading="custom"
              leadingContent={<CustomSlotPlaceholder />}
            />
            <ListItem
              title="Action title"
              text="Action description (optional)."
              leading="custom"
              leadingContent={<CustomSlotPlaceholder />}
              trailing="icon"
            />
            <ListItem
              title="Action title"
              text="Action description (optional)."
              leading="custom"
              leadingContent={<CustomSlotPlaceholder />}
              trailing="link"
              trailingLink={{ text: 'Trailing link', href: '#' }}
            />
            <ListItem
              title="Action title"
              text="Action description (optional)."
              leading="custom"
              leadingContent={<CustomSlotPlaceholder />}
              trailing="custom"
              trailingContent={<CustomSlotPlaceholder />}
            />
          </List>
        </div>
      </div>

      {/* ── Component Props ──────────────────────────────────────────── */}
      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
          Component Props
        </h2>

        {/* List props */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--ld-semantic-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            List
          </h3>
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
                  ['children', 'ReactNode', '—', 'One or more ListItem elements.'],
                  ['aria-label', 'string', '—', 'Accessible label for the list.'],
                  ['style', 'React.CSSProperties', '—', 'Additional styles, e.g. custom gap between items.'],
                  ['className', 'string', '—', 'Additional CSS class names.'],
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

        <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />

        {/* ListItem props */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--ld-semantic-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ListItem
          </h3>
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
                  ['title',           'string',                                     '—',        'Required. Primary label using body-large bold token.'],
                  ['text',            'string',                                     'undefined', 'Optional secondary text below the title using body-medium default token.'],
                  ['leading',         "'empty' | 'custom'",                         "'empty'",  'Leading slot variant. "empty" renders no leading content. "custom" renders the leadingContent node.'],
                  ['leadingContent',  'ReactNode',                                  'undefined', 'Custom content for leading="custom". Any node — image, avatar, chart, etc.'],
                  ['trailing',        "'empty' | 'icon' | 'link' | 'custom'",       "'empty'",  'Trailing slot variant. "icon" shows a chevron (or custom icon). "link" shows an anchor/button. "custom" renders trailingContent.'],
                  ['trailingIcon',    'ReactNode',                                  'ChevronRight', 'Custom icon node for trailing="icon". Defaults to a 16×16 ChevronRight SVG.'],
                  ['trailingLink',    '{ text: string; href?: string; onClick?: () => void }', 'undefined', 'Link config for trailing="link". Renders an <a> if href is provided, otherwise a <button>.'],
                  ['trailingContent', 'ReactNode',                                  'undefined', 'Custom content for trailing="custom".'],
                  ['className',       'string',                                     'undefined', 'Additional CSS class names forwarded to the <li> element.'],
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
      </div>

    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CustomSlotPlaceholder() {
  return (
    <div
      style={{
        display: 'flex',
        width: 80,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px dashed var(--ld-semantic-color-border-subtle, #ccc)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-50, 4px)',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle, #f5f5f5)',
        fontSize: '11px',
        color: 'var(--ld-semantic-color-text-subtle)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        textAlign: 'center',
        padding: '4px',
      }}
    >
      Custom
    </div>
  );
}
