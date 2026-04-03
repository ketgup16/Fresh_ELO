import * as React from 'react';
import { useState } from 'react';
import { AXAvatar } from '@/components/walmart/AXAvatar';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { List, ListItem, ListItemTrailing, ListItemTagPreset, ListItemTagCustom } from '@/components/ui/ListAssociate';
import { TagVariant, TagColor } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Alert } from '@/components/ui/Alert';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import styles from './ExamplePage.module.css';

// ─── Shared style constants (matches AXAvatarButtonExample) ──────────────────


const CARD: React.CSSProperties = {};

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

export function ListAssociateExample() {
  // ── Interactive demo state ──
  const [trailing, setTrailing] = useState<ListItemTrailing>('icon');
  const [showEyebrow, setShowEyebrow] = useState(true);
  const [eyebrow, setEyebrow] = useState('Goal name');
  const [title, setTitle] = useState('Associate Name');
  const [showText, setShowText] = useState(true);
  const [itemText, setItemText] = useState('Role or position');
  const [showAttr1, setShowAttr1] = useState(true);
  const [attr1Label, setAttr1Label] = useState('Attribute 1');
  const [showAttr2, setShowAttr2] = useState(false);
  const [attr2Label, setAttr2Label] = useState('Attribute 2');
  const [showAttr3, setShowAttr3] = useState(false);
  const [attr3Label, setAttr3Label] = useState('Attribute 3');
  const [showAlert, setShowAlert] = useState(false);
  const [showDivider, setShowDivider] = useState(true);
  const [linkLabel, setLinkLabel] = useState('Link');
  const [selectChecked, setSelectChecked] = useState(false);
  const [showTag, setShowTag] = useState(false);
  type TagOption = ListItemTagPreset | 'custom';
  const [tagPreset, setTagPreset] = useState<TagOption>('absent');
  const [tagCustomVariant, setTagCustomVariant] = useState<TagVariant>('secondary');
  const [tagCustomColor, setTagCustomColor] = useState<TagColor>('brand');
  const [tagCustomLabel, setTagCustomLabel] = useState('Custom');
  const [showMonitoring, setShowMonitoring] = useState(true);
  const [showGoals, setShowGoals] = useState(true);
  const [monitoringLabel, setMonitoringLabel] = useState('Progress status');
  const [monitoringValue, setMonitoringValue] = useState(65);
  const [monitoringVariant, setMonitoringVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [showFooterAction, setShowFooterAction] = useState(true);
  type FooterActionType =
    | 'button-primary'
    | 'button-secondary'
    | 'inline-primary-secondary'
    | 'inline-primary-tertiary'
    | 'inline-secondary-tertiary'
    | 'inline-tertiary-tertiary'
    | 'stacked-primary-secondary'
    | 'stacked-primary-tertiary'
    | 'stacked-secondary-tertiary'
    | 'stacked-3options';
  const [footerAction, setFooterAction] = useState<FooterActionType>('button-primary');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

      {/* ── Interactive Demo ─────────────────────────────────────────── */}
      <div style={CARD}>
        <h3 className={styles.sectionTitle}>Interactive demo</h3>
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

            {/* Tag toggle */}
            <div style={showTag ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
              <span style={PROP_LABEL}>Tag</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showTag}
                  onChange={e => setShowTag(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>
            {showTag && (
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Tag preset</span>
                <select value={tagPreset} onChange={e => setTagPreset(e.target.value as TagOption)} style={SELECT_STYLE}>
                  <option value="absent">Absent</option>
                  <option value="tardy">Tardy</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="removed">Removed</option>
                  <option value="do-not-disturb">Do not disturb</option>
                  <option value="meal">Meal</option>
                  <option value="ppto">PPTO</option>
                  <option value="not-scheduled">Not scheduled</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            )}
            {showTag && tagPreset === 'custom' && (
              <>
                <div style={PROP_ROW}>
                  <span style={PROP_LABEL}>Variant</span>
                  <select value={tagCustomVariant} onChange={e => setTagCustomVariant(e.target.value as TagVariant)} style={SELECT_STYLE}>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tertiary">Tertiary</option>
                    <option value="info">Info</option>
                    <option value="neutral">Neutral</option>
                    <option value="success">Success</option>
                  </select>
                </div>
                <div style={PROP_ROW}>
                  <span style={PROP_LABEL}>Color</span>
                  <select value={tagCustomColor} onChange={e => setTagCustomColor(e.target.value as TagColor)} style={SELECT_STYLE}>
                    {(['brand','positive','negative','warning','info','edited','blue','spark','green','red','purple','gray','cyan','orange','pink','yellow','teal'] as TagColor[]).map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div style={PROP_ROW}>
                  <span style={PROP_LABEL}>Label</span>
                  <input
                    type="text"
                    value={tagCustomLabel}
                    onChange={e => setTagCustomLabel(e.target.value)}
                    style={INPUT_STYLE}
                  />
                </div>
              </>
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
                <span style={PROP_LABEL}>Subtitle</span>
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

            {/* Monitoring toggle */}
            <div style={showMonitoring ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
              <span style={PROP_LABEL}>Monitoring</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showMonitoring}
                  onChange={e => setShowMonitoring(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>
            {showMonitoring && (
              <>
                <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
                  <span style={PROP_LABEL}>Progress label</span>
                  <input
                    type="text"
                    value={monitoringLabel}
                    onChange={e => setMonitoringLabel(e.target.value)}
                    style={INPUT_STYLE}
                  />
                </div>
                <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
                  <span style={PROP_LABEL}>Progress value — {monitoringValue}</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={monitoringValue}
                    onChange={e => setMonitoringValue(Number(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)' }}
                  />
                </div>
                <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
                  <span style={PROP_LABEL}>Variant</span>
                  <select value={monitoringVariant} onChange={e => setMonitoringVariant(e.target.value as typeof monitoringVariant)} style={SELECT_STYLE}>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div style={PROP_ROW}>
                  <span style={PROP_LABEL}>Assigned goals</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={showGoals}
                      onChange={e => setShowGoals(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
                  </label>
                </div>
              </>
            )}

            {/* Alert toggle */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Alert</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showAlert}
                  onChange={e => setShowAlert(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>

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
                <select value={footerAction} onChange={e => setFooterAction(e.target.value as FooterActionType)} style={SELECT_STYLE}>
                  <option value="button-primary">Primary button</option>
                  <option value="button-secondary">Secondary button</option>
                  <optgroup label="Inline (full width)">
                    <option value="inline-primary-secondary">Primary / Secondary</option>
                    <option value="inline-primary-tertiary">Primary / Tertiary</option>
                    <option value="inline-secondary-tertiary">Secondary / Tertiary</option>
                    <option value="inline-tertiary-tertiary">Tertiary / Tertiary</option>
                  </optgroup>
                  <optgroup label="Stacked">
                    <option value="stacked-primary-secondary">Primary / Secondary</option>
                    <option value="stacked-primary-tertiary">Primary / Tertiary</option>
                    <option value="stacked-secondary-tertiary">Secondary / Tertiary</option>
                    <option value="stacked-3options">3 Options</option>
                  </optgroup>
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

          {/* Live preview — phone frame */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '12px', alignSelf: 'flex-start' }}>
              Preview
            </span>
            {/* Phone shell */}
            <div style={{
              width: '375px',
              borderRadius: '40px',
              border: '8px solid var(--ld-semantic-color-text, #2e2f32)',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.12)',
              flexShrink: 0,
            }}>
              {/* Screen */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '812px',
                background: 'var(--ld-semantic-color-surface, #fff)',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {/* Status bar + dynamic island */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 24px 6px',
                  flexShrink: 0,
                  position: 'relative',
                }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--ld-semantic-font-family-sans)', zIndex: 1 }}>9:41</span>
                  {/* Dynamic island */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '10px',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '34px',
                    backgroundColor: '#000',
                    borderRadius: '20px',
                    zIndex: 2,
                  }} />
                  {/* Battery / signal icons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
                      <rect x="0" y="7" width="3" height="5" rx="0.8" /><rect x="4.5" y="5" width="3" height="7" rx="0.8" /><rect x="9" y="2.5" width="3" height="9.5" rx="0.8" /><rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                    </svg>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                      <path d="M8 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="currentColor"/>
                      <path d="M3.3 5.8A6.7 6.7 0 0 1 8 3.8c1.8 0 3.5.74 4.7 1.98l1.15-1.15A8.35 8.35 0 0 0 8 2.2c-2.3 0-4.38.94-5.88 2.44L3.3 5.8z" fill="currentColor"/>
                    </svg>
                    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
                      <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                {/* Scrollable content area */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: 'var(--ld-primitive-scale-space-200, 16px)',
                  }}>
                  <List aria-label="Interactive demo" style={{ width: '100%' }}>
                    <ListItem
                      eyebrow={showEyebrow ? eyebrow : undefined}
                      title={title || 'Action title'}
                      text={showText ? itemText : undefined}
                      leading="custom"
                      leadingContent={<CustomSlotPlaceholder />}
                      trailing={trailing}
                      trailingLink={trailing === 'link' ? { text: linkLabel || 'Link' } : undefined}
                      trailingChecked={trailing === 'select' ? selectChecked : undefined}
                      onTrailingCheckedChange={trailing === 'select' ? (v) => setSelectChecked(v === true) : undefined}
                      attributes={[
                        ...(showAttr1 ? [{ label: attr1Label }] : []),
                        ...(showAttr2 ? [{ label: attr2Label }] : []),
                        ...(showAttr3 ? [{ label: attr3Label }] : []),
                      ].filter(Boolean) as { label: string }[]}
                      tag={showTag
                        ? tagPreset === 'custom'
                          ? { variant: tagCustomVariant, color: tagCustomColor, label: tagCustomLabel } satisfies ListItemTagCustom
                          : tagPreset
                        : undefined
                      }
                      divider={showDivider}
                      monitoring={showMonitoring ? (
                        <ProgressIndicator
                          value={monitoringValue}
                          variant={monitoringVariant}
                          valueLabel={`${monitoringValue}%`}
                        />
                      ) : undefined}
                      monitoringLabel={monitoringLabel}
                      monitoringGoals={showMonitoring && showGoals ? [
                        { title: 'Goal name', actions: '[Action], [Action], [Action]' },
                        { title: 'Goal name', actions: '[Action], [Action], [Action]' },
                      ] : undefined}
                      alert={showAlert ? (
                        <Alert variant="error">Something went wrong. Please try again.</Alert>
                      ) : undefined}
                      footerAction={
                        !showFooterAction ? undefined :
                        footerAction === 'button-primary' ? (
                          <Button variant="primary" size="medium" isFullWidth>Action</Button>
                        ) : footerAction === 'button-secondary' ? (
                          <Button variant="secondary" size="medium" isFullWidth>Action</Button>
                        ) : footerAction === 'inline-primary-secondary' ? (
                          <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%' }}>
                            <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
                            <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
                          </div>
                        ) : footerAction === 'inline-primary-tertiary' ? (
                          <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%', alignItems: 'center' }}>
                            <LinkButton size="medium">Alternate</LinkButton>
                            <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
                          </div>
                        ) : footerAction === 'inline-secondary-tertiary' ? (
                          <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%', alignItems: 'center' }}>
                            <LinkButton size="medium">Alternate</LinkButton>
                            <Button variant="secondary" size="medium" isFullWidth>Preferred</Button>
                          </div>
                        ) : footerAction === 'inline-tertiary-tertiary' ? (
                          <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%' }}>
                            <LinkButton size="medium" UNSAFE_style={{ flex: 1, justifyContent: 'center' }}>Alternate</LinkButton>
                            <LinkButton size="medium" UNSAFE_style={{ flex: 1, justifyContent: 'center' }}>Preferred</LinkButton>
                          </div>
                        ) : footerAction === 'stacked-primary-secondary' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%' }}>
                            <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
                            <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
                          </div>
                        ) : footerAction === 'stacked-primary-tertiary' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%', alignItems: 'center' }}>
                            <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
                            <LinkButton size="medium">Alternate</LinkButton>
                          </div>
                        ) : footerAction === 'stacked-secondary-tertiary' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%', alignItems: 'center' }}>
                            <Button variant="secondary" size="medium" isFullWidth>Preferred</Button>
                            <LinkButton size="medium">Alternate</LinkButton>
                          </div>
                        ) : footerAction === 'stacked-3options' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: 'var(--ld-primitive-scale-space-100, 8px)', width: '100%' }}>
                              <Button variant="secondary" size="medium" isFullWidth>Alternate</Button>
                              <Button variant="primary" size="medium" isFullWidth>Preferred</Button>
                            </div>
                            <LinkButton size="medium">Alternate</LinkButton>
                          </div>
                        ) : undefined
                      }
                    />
                  </List>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Trailing options ─────────────────────────────────────────── */}
      <div style={CARD}>
        <h3 className={styles.sectionTitle} style={{ marginBottom: '4px' }}>Trailing options</h3>
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
                <ListItem key="1" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="empty" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={65} variant="info" valueLabel="65%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="2" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="empty" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={40} variant="warning" valueLabel="40%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="3" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="empty" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={90} variant="success" valueLabel="90%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} />,
              ],
            },
            {
              prop: 'trailing="icon"',
              title: 'Icon',
              desc: 'A 24×24 ChevronRight from the icon library. Signals navigation or drill-down.',
              items: [
                <ListItem key="1" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="icon" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={65} variant="info" valueLabel="65%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="2" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="icon" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={40} variant="warning" valueLabel="40%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="3" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="icon" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={90} variant="success" valueLabel="90%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} />,
              ],
            },
            {
              prop: 'trailing="link"',
              title: 'Link',
              desc: 'A LinkButton (small) for secondary in-row actions such as "Edit" or "Change".',
              items: [
                <ListItem key="1" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="link" trailingLink={{ text: 'Action' }} attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={65} variant="info" valueLabel="65%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="2" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="link" trailingLink={{ text: 'Action' }} attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={40} variant="warning" valueLabel="40%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="3" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="link" trailingLink={{ text: 'Action' }} attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={90} variant="success" valueLabel="90%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} />,
              ],
            },
            {
              prop: 'trailing="select"',
              title: 'Select',
              desc: 'A Checkbox component. Use for multi-select list patterns.',
              items: [
                <ListItem key="1" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="select" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={65} variant="info" valueLabel="65%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="2" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="select" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={40} variant="warning" valueLabel="40%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} divider />,
                <ListItem key="3" eyebrow="Goal name" title="Associate Name" text="Role or position" leading="custom" leadingContent={<CustomSlotPlaceholder />} trailing="select" attributes={[{ label: 'Attribute 1' }]} monitoring={<ProgressIndicator value={90} variant="success" valueLabel="90%" />} monitoringLabel="Progress status" monitoringGoals={[{ title: 'Goal name', actions: '[Action], [Action], [Action]' }, { title: 'Goal name', actions: '[Action], [Action], [Action]' }]} footerAction={<Button variant="primary" size="medium" isFullWidth>Action</Button>} />,
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
        <h2 className={styles.sectionTitle}>
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
    <AXAvatar size="medium" indicator="clock" clockState="active">
      <AvatarImage
        src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg"
        alt="Associate"
      />
      <AvatarFallback>AS</AvatarFallback>
    </AXAvatar>
  );
}
