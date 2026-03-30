import * as React from 'react';
import { useState } from 'react';
import { List, ListItem, ListItemLeading, ListItemTrailing } from '@/components/ui/List';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';

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
  const [trailing, setTrailing] = useState<ListItemTrailing>('icon');
  const [showEyebrow, setShowEyebrow] = useState(true);
  const [eyebrow, setEyebrow] = useState('Goal name');
  const [title, setTitle] = useState('Action title');
  const [showText, setShowText] = useState(true);
  const [itemText, setItemText] = useState('Action description (optional).');
  const [showAttr1, setShowAttr1] = useState(false);
  const [attr1Label, setAttr1Label] = useState('Attribute 1');
  const [showAttr2, setShowAttr2] = useState(false);
  const [attr2Label, setAttr2Label] = useState('Attribute 2');
  const [showAttr3, setShowAttr3] = useState(false);
  const [attr3Label, setAttr3Label] = useState('Attribute 3');
  const [showDivider, setShowDivider] = useState(true);
  const [linkLabel, setLinkLabel] = useState('Link');
  const [selectChecked, setSelectChecked] = useState(false);
  const [showFooterAction, setShowFooterAction] = useState(false);
  const [footerAction, setFooterAction] = useState<'button-secondary' | 'group-primary-secondary' | 'group-primary-tertiary'>('button-secondary');

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
                <option value="select">Select</option>
              </select>
            </div>

            {/* Link label — only when trailing=link */}
            {trailing === 'link' && (
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Link label</span>
                <input
                  type="text"
                  value={linkLabel}
                  onChange={e => setLinkLabel(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

            {/* Eyebrow toggle */}
            <div style={showEyebrow ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
              <span style={PROP_LABEL}>Eyebrow</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showEyebrow}
                  onChange={e => setShowEyebrow(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>

            {/* Eyebrow text — only when showEyebrow */}
            {showEyebrow && (
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Eyebrow text</span>
                <input
                  type="text"
                  value={eyebrow}
                  onChange={e => setEyebrow(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

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
            <div style={showText ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
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
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Action description text</span>
                <input
                  type="text"
                  value={itemText}
                  onChange={e => setItemText(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

            {/* Attribute 1 */}
            <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
              <span style={PROP_LABEL}>Attribute 1</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showAttr1}
                  onChange={e => setShowAttr1(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>
            {showAttr1 && (
              <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
                <span style={PROP_LABEL}>Attribute 1 label</span>
                <input
                  type="text"
                  value={attr1Label}
                  onChange={e => setAttr1Label(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

            {/* Attribute 2 */}
            <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
              <span style={PROP_LABEL}>Attribute 2</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showAttr2}
                  onChange={e => setShowAttr2(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>
            {showAttr2 && (
              <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
                <span style={PROP_LABEL}>Attribute 2 label</span>
                <input
                  type="text"
                  value={attr2Label}
                  onChange={e => setAttr2Label(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

            {/* Attribute 3 */}
            <div style={showAttr3 ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
              <span style={PROP_LABEL}>Attribute 3</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showAttr3}
                  onChange={e => setShowAttr3(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>
            {showAttr3 && (
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Attribute 3 label</span>
                <input
                  type="text"
                  value={attr3Label}
                  onChange={e => setAttr3Label(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

            {/* Button options toggle */}
            <div style={showFooterAction ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
              <span style={PROP_LABEL}>Button</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showFooterAction}
                  onChange={e => setShowFooterAction(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>

            {/* Button type — only when showFooterAction */}
            {showFooterAction && (
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Button type</span>
                <select value={footerAction} onChange={e => setFooterAction(e.target.value as typeof footerAction)} style={SELECT_STYLE}>
                  <option value="button-secondary">Secondary button</option>
                  <option value="group-primary-secondary">Button group: Primary / Secondary</option>
                  <option value="group-primary-tertiary">Button group: Primary / Tertiary</option>
                </select>
              </div>
            )}

            {/* Divider */}
            <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
              <span style={PROP_LABEL}>Divider</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showDivider}
                  onChange={e => setShowDivider(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>
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
                  eyebrow={showEyebrow ? eyebrow : undefined}
                  title={title || 'Action title'}
                  text={showText ? itemText : undefined}
                  leading={leading}
                  leadingContent={leading === 'custom' ? <CustomSlotPlaceholder /> : undefined}
                  trailing={trailing}
                  trailingLink={trailing === 'link' ? { text: linkLabel || 'Link' } : undefined}
                  trailingChecked={trailing === 'select' ? selectChecked : undefined}
                  onTrailingCheckedChange={trailing === 'select' ? (v) => setSelectChecked(v === true) : undefined}
                  attributes={[
                    ...(showAttr1 ? [{ label: attr1Label }] : []),
                    ...(showAttr2 ? [{ label: attr2Label }] : []),
                    ...(showAttr3 ? [{ label: attr3Label }] : []),
                  ].filter(Boolean) as { label: string }[]}
                  divider={showDivider}
                  footerAction={
                    !showFooterAction ? undefined :
                    footerAction === 'button-secondary' ? (
                      <Button variant="secondary" size="medium" isFullWidth>Action</Button>
                    ) : footerAction === 'group-primary-secondary' ? (
                      <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%' }}>
                        <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
                        <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
                      </div>
                    ) : footerAction === 'group-primary-tertiary' ? (
                      <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%', alignItems: 'center' }}>
                        <LinkButton size="medium">Alternate</LinkButton>
                        <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
                      </div>
                    ) : undefined
                  }
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
          </List>
        </div>
      </div>

      {/* ── Trailing options ─────────────────────────────────────────── */}
      <div style={CARD}>
        <h3 style={{ ...HEADING, marginBottom: '4px' }}>Trailing options</h3>
        <p style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: '0 0 24px',
        }}>
          The trailing slot anchors to the top-right of the list item and supports four variants.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {([
            {
              prop: 'trailing="empty"',
              title: 'Empty',
              desc: 'The trailing slot is omitted. Use when no trailing action or indicator is needed.',
              items: [
                <ListItem key="1" title="Action title" text="Action description (optional)." trailing="empty" divider />,
                <ListItem key="2" title="Action title" text="Action description (optional)." trailing="empty" divider />,
                <ListItem key="3" title="Action title" text="Action description (optional)." trailing="empty" />,
              ],
            },
            {
              prop: 'trailing="icon"',
              title: 'Icon',
              desc: 'A 24×24 ChevronRight from the icon library. Signals navigation or drill-down.',
              items: [
                <ListItem key="1" title="Action title" text="Action description (optional)." trailing="icon" divider />,
                <ListItem key="2" title="Action title" text="Action description (optional)." trailing="icon" divider />,
                <ListItem key="3" title="Action title" text="Action description (optional)." trailing="icon" />,
              ],
            },
            {
              prop: 'trailing="link"',
              title: 'Link',
              desc: 'A LinkButton (small) for secondary in-row actions such as "Edit" or "Change".',
              items: [
                <ListItem key="1" title="Action title" text="Action description (optional)." trailing="link" trailingLink={{ text: 'Action' }} divider />,
                <ListItem key="2" title="Action title" text="Action description (optional)." trailing="link" trailingLink={{ text: 'Action' }} divider />,
                <ListItem key="3" title="Action title" text="Action description (optional)." trailing="link" trailingLink={{ text: 'Action' }} />,
              ],
            },
            {
              prop: 'trailing="select"',
              title: 'Select',
              desc: 'A Checkbox component. Use for multi-select list patterns.',
              items: [
                <ListItem key="1" title="Action title" text="Action description (optional)." trailing="select" divider />,
                <ListItem key="2" title="Action title" text="Action description (optional)." trailing="select" divider />,
                <ListItem key="3" title="Action title" text="Action description (optional)." trailing="select" />,
              ],
            },
          ]).map(({ prop, title, desc, items }, i, arr) => (
            <div
              key={prop}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--ld-primitive-scale-space-400, 2rem)',
                alignItems: 'start',
                padding: 'var(--ld-primitive-scale-space-300, 1.5rem) 0',
                borderBottom: i < arr.length - 1
                  ? '1px solid var(--ld-semantic-color-separator, #E3E4E5)'
                  : 'none',
              }}
            >
              {/* Left: annotation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-50, 4px)' }}>
                <code style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)',
                  color: 'var(--ld-semantic-color-text-brand)',
                  background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  width: 'fit-content',
                }}>
                  {prop}
                </code>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
                  fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)',
                  lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)',
                  color: 'var(--ld-semantic-color-text-subtle)',
                }}>
                  <strong style={{ fontWeight: 700, color: 'var(--ld-semantic-color-text)' }}>{title}. </strong>
                  {desc}
                </p>
              </div>

              {/* Right: live variant — 3 items, dividers on first two */}
              <div style={{
                padding: 'var(--ld-primitive-scale-space-200, 1rem)',
                borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
                border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)',
                backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
              }}>
                <List aria-label={`${title} trailing demo`} style={{ gap: 'var(--ld-primitive-scale-space-200, 16px)' }}>
                  {items}
                </List>
              </div>
            </div>
          ))}
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
                  ['eyebrow',         'string',                                     'undefined', 'Optional text displayed above the title. Uses caption/default text style and text-subtle color.'],
                  ['title',           'string',                                     '—',        'Required. Primary label using body-large bold token.'],
                  ['text',            'string',                                     'undefined', 'Optional secondary text below the title using body-medium default token.'],
                  ['leading',         "'empty' | 'custom'",                         "'empty'",  'Leading slot variant. "empty" renders no leading content. "custom" renders the leadingContent node.'],
                  ['leadingContent',  'ReactNode',                                  'undefined', 'Custom content for leading="custom". Any node — image, avatar, chart, etc.'],
                  ['trailing',        "'empty' | 'icon' | 'link' | 'select'", "'empty'", 'Trailing slot variant. "icon" shows a 24px ChevronRight. "link" shows a LinkButton. "select" shows a Checkbox.'],
                  ['trailingIcon',    'ReactNode',                                  'ChevronRight', 'Custom icon node for trailing="icon". Defaults to a 24×24 ChevronRight from the icon library.'],
                  ['trailingLink',    '{ text: string; onClick?: () => void }', 'undefined', 'Link config for trailing="link". Renders a LinkButton (small).'],
                  ['attributes',      'Array<{ label: string; icon?: ReactNode }>', 'undefined', 'Optional AXAttribute Small items shown below the description (up to 3). Separated by 4px; container offset from description by 8px.'],
                  ['divider',         'boolean',                                    'undefined', 'When true, renders a horizontal Divider at the bottom of the list item with a 16px top margin.'],
                  ['footerAction',    'ReactNode',                                  'undefined', 'Optional full-width action below the description/attributes. Does not overlap the trailing slot. Accepts a Button or any button-group wrapper.'],
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
