import * as React from 'react';
import { useState } from 'react';
import {
  ListTeam,
  ListTeamVariant,
  ListTeamState,
  ListTeamIllustration,
  TEAM_ILLUSTRATIONS,
} from '@/components/walmart/ListTeam';
import styles from './ExamplePage.module.css';

// ─── Shared control styles (matches ListAssociateExample pattern) ─────────────

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

// ─── Illustration entries derived from single source of truth ────────────────

const ILLUSTRATION_ENTRIES = Object.entries(TEAM_ILLUSTRATIONS) as [
  ListTeamIllustration,
  { src: string; label: string },
][];

// Apparel is the confirmed illustration from Figma
const APPAREL_SRC = TEAM_ILLUSTRATIONS['apparel'].src;

// ─── Main example component ───────────────────────────────────────────────────

export function ListTeamExample() {
  // Interactive demo state
  const [variant, setVariant] = useState<ListTeamVariant>('navigational');
  const [state, setState] = useState<ListTeamState>('default');
  const [illustration, setIllustration] = useState<ListTeamIllustration>('apparel');
  const [title, setTitle] = useState('Team name / label');
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [subtitle, setSubtitle] = useState('Subtitle');
  const [showTag, setShowTag] = useState(true);
  const [tagLabel, setTagLabel] = useState('Label');
  const [showAttr1, setShowAttr1] = useState(true);
  const [attr1Label, setAttr1Label] = useState('25h (1,190 cases)');
  const [showAttr2, setShowAttr2] = useState(true);
  const [attr2Label, setAttr2Label] = useState('25h (1,190 cases)');

  // When variant changes to navigational, clear `selected` state
  const handleVariantChange = (v: ListTeamVariant) => {
    setVariant(v);
    if (v === 'navigational' && state === 'selected') {
      setState('default');
    }
  };

  const illustrationSrc = TEAM_ILLUSTRATIONS[illustration].src;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

      {/* ── Interactive Demo ─────────────────────────────────────────── */}
      <div>
        <h3 className={styles.sectionTitle}>Interactive demo</h3>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'stretch', flexWrap: 'wrap' }}>

          {/* Properties panel */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
            borderRadius: '8px',
            background: 'var(--ld-semantic-color-surface, #fff)',
            width: '240px', overflow: 'hidden', flexShrink: 0,
          }}>
            {/* Panel heading */}
            <div style={{
              padding: '8px 16px',
              borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
              background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
            }}>
              <span style={{
                fontSize: '11px', fontWeight: 700,
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                color: 'var(--ld-semantic-color-text-subtle, #74767C)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                Properties
              </span>
            </div>

            {/* Variant */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Variant</span>
              <select
                value={variant}
                onChange={e => handleVariantChange(e.target.value as ListTeamVariant)}
                style={SELECT_STYLE}
              >
                <option value="navigational">Navigational</option>
                <option value="selectable">Selectable</option>
              </select>
            </div>

            {/* State */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>State</span>
              <select
                value={state}
                onChange={e => setState(e.target.value as ListTeamState)}
                style={SELECT_STYLE}
              >
                <option value="default">Default</option>
                <option value="pressed">Pressed</option>
                {variant === 'selectable' && (
                  <option value="selected">Selected</option>
                )}
              </select>
            </div>

            {/* Illustration */}
            <div style={PROP_ROW}>
              <span style={PROP_LABEL}>Illustration</span>
              <select
                value={illustration}
                onChange={e => setIllustration(e.target.value as ListTeamIllustration)}
                style={SELECT_STYLE}
              >
                {ILLUSTRATION_ENTRIES.map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
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

            {/* Subtitle toggle */}
            <div style={showSubtitle ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
              <span style={PROP_LABEL}>Subtitle</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showSubtitle}
                  onChange={e => setShowSubtitle(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Show</span>
              </label>
            </div>
            {showSubtitle && (
              <div style={PROP_ROW}>
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
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
                <span style={PROP_LABEL}>Tag label</span>
                <input
                  type="text"
                  value={tagLabel}
                  onChange={e => setTagLabel(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

            {/* Attribute 1 toggle */}
            <div style={showAttr1 ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
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
              <div style={PROP_ROW}>
                <input
                  type="text"
                  value={attr1Label}
                  onChange={e => setAttr1Label(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}

            {/* Attribute 2 toggle */}
            <div style={showAttr2 ? { ...PROP_ROW, borderBottom: 'none' } : PROP_ROW}>
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
                <input
                  type="text"
                  value={attr2Label}
                  onChange={e => setAttr2Label(e.target.value)}
                  style={INPUT_STYLE}
                />
              </div>
            )}
          </div>

          {/* Live preview — phone frame */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '320px' }}>
            <span style={{
              fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text-subtle, #74767C)',
              marginBottom: '12px', alignSelf: 'flex-start',
            }}>
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
              <div style={{
                display: 'flex', flexDirection: 'column',
                height: '640px',
                background: 'var(--ld-semantic-color-surface, #fff)',
                overflow: 'hidden', position: 'relative',
              }}>
                {/* Status bar */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 24px 6px', flexShrink: 0, position: 'relative',
                }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--ld-semantic-font-family-sans)', zIndex: 1 }}>9:41</span>
                  <div style={{
                    position: 'absolute', left: '50%', top: '10px',
                    transform: 'translateX(-50%)',
                    width: '120px', height: '34px',
                    backgroundColor: '#000', borderRadius: '20px', zIndex: 2,
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
                      <rect x="0" y="7" width="3" height="5" rx="0.8" /><rect x="4.5" y="5" width="3" height="7" rx="0.8" /><rect x="9" y="2.5" width="3" height="9.5" rx="0.8" /><rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                    </svg>
                    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
                      <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                {/* Content area */}
                <div style={{
                  flex: 1, overflowY: 'auto', display: 'flex',
                  flexDirection: 'column', justifyContent: 'center',
                  padding: 'var(--ld-primitive-scale-space-200, 16px)',
                }}>
                  <ListTeam
                    variant={variant}
                    state={state}
                    illustrationSrc={illustrationSrc}
                    illustrationAlt={TEAM_ILLUSTRATIONS[illustration].label}
                    title={title || 'Team name / label'}
                    subtitle={showSubtitle ? subtitle : undefined}
                    tagLabel={showTag ? tagLabel : undefined}
                    attribute1={showAttr1 ? attr1Label : undefined}
                    attribute2={showAttr2 ? attr2Label : undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Variant showcase ─────────────────────────────────────────── */}
      <div>
        <h3 className={styles.sectionTitle}>Variant showcase</h3>

        {/* Navigational */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            margin: '0 0 4px',
          }}>
            Navigational variant
          </p>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
            color: 'var(--ld-semantic-color-text-subtle)',
            margin: '0 0 16px',
          }}>
            Displays a trailing ChevronRight icon. Used for navigation/drill-down.
          </p>
          <div style={{
            display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start',
          }}>
            {(['default', 'pressed'] as ListTeamState[]).map(s => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '343px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: 600,
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  color: 'var(--ld-semantic-color-text-subtle)',
                  textTransform: 'capitalize',
                }}>
                  {s === 'default' ? 'Enabled state' : 'Pressed state'}
                </span>
                <div style={{
                  padding: '16px',
                  background: 'var(--ld-semantic-color-surface, #fff)',
                  border: '1px solid var(--ld-semantic-color-border-subtlest, #dcdde0)',
                  borderRadius: '12px',
                }}>
                  <ListTeam
                    variant="navigational"
                    state={s}
                    illustrationSrc={APPAREL_SRC}
                    illustrationAlt="Apparel"
                    title="Team name / label"
                    subtitle="Subtitle"
                    tagLabel="Label"
                    attribute1="25h (1,190 cases)"
                    attribute2="25h (1,190 cases)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selectable */}
        <div>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text)',
            margin: '0 0 4px',
          }}>
            Selectable variant
          </p>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
            color: 'var(--ld-semantic-color-text-subtle)',
            margin: '0 0 16px',
          }}>
            Displays no trailing navigation element. Supports selected state with visible border.
          </p>
          <div style={{
            display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start',
          }}>
            {([
              { s: 'default' as ListTeamState, label: 'Enabled state' },
              { s: 'pressed' as ListTeamState, label: 'Pressed state' },
              { s: 'selected' as ListTeamState, label: 'Selected state' },
            ]).map(({ s, label }) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '343px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: 600,
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  color: 'var(--ld-semantic-color-text-subtle)',
                }}>
                  {label}
                </span>
                <ListTeam
                  variant="selectable"
                  state={s}
                  illustrationSrc={APPAREL_SRC}
                  illustrationAlt="Apparel"
                  title="Team name / label"
                  subtitle="Subtitle"
                  tagLabel="Label"
                  attribute1="25h (1,190 cases)"
                  attribute2="25h (1,190 cases)"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Image options ────────────────────────────────────────────── */}
      <div>
        <h3 className={styles.sectionTitle}>Team illustration options</h3>
        <p style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: '0 0 24px',
        }}>
          The team illustration is supplied via the <code style={{ fontFamily: 'monospace', fontSize: '13px', background: 'var(--ld-semantic-color-fill-subtle)', padding: '1px 5px', borderRadius: '4px' }}>illustrationSrc</code> prop.
          Use <code style={{ fontFamily: 'monospace', fontSize: '13px', background: 'var(--ld-semantic-color-fill-subtle)', padding: '1px 5px', borderRadius: '4px' }}>TEAM_ILLUSTRATION_SRC[key]</code> for known CDN URLs.
          The 23 available illustration types are listed below.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '8px',
        }}>
          {ILLUSTRATION_ENTRIES.map(([key, { src, label }]) => (
            <div key={key} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '8px 12px',
              background: 'var(--ld-semantic-color-surface, #fff)',
              border: '1px solid var(--ld-semantic-color-border-subtlest, #dcdde0)',
              borderRadius: '8px',
            }}>
              {src ? (
                <img
                  src={src}
                  alt={label}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--ld-semantic-color-fill-accent-blue-subtle, #e8f0ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: '12px', fontWeight: 700,
                  color: 'var(--ld-semantic-color-text-onfill-accent-blue-subtle, #002e99)',
                  textTransform: 'uppercase',
                }}>
                  {label.charAt(0)}
                </div>
              )}
              <span style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text)',
                fontWeight: 500,
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Component Props ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 className={styles.sectionTitle}>Component Props</h3>
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
                ['variant', "'navigational' | 'selectable'", "'navigational'", 'Controls trailing element. navigational shows ChevronRight; selectable shows none.'],
                ['state', "'default' | 'pressed' | 'selected'", "'default'", 'Visual interaction state. selected is only valid for selectable variant.'],
                ['illustrationSrc', 'string', 'undefined', 'URL for the 40×40 department illustration image.'],
                ['illustrationAlt', 'string', "''", 'Alt text for the illustration image.'],
                ['title', 'string', '—', 'Required. Primary team name / label.'],
                ['subtitle', 'string', 'undefined', 'Optional subtitle displayed below the title in caption style.'],
                ['attribute1', 'string', 'undefined', 'Optional first attribute shown with a Clock icon.'],
                ['attribute2', 'string', 'undefined', 'Optional second attribute shown with a Clock icon.'],
                ['tagLabel', 'string', 'undefined', 'When provided, renders a tertiary blue Tag in the trailing cluster.'],
                ['starAriaLabel', 'string', "'Save team'", 'Accessible label for the star icon button.'],
                ['onStarPress', '() => void', 'undefined', 'Callback when the star icon button is pressed.'],
                ['onPress', '() => void', 'undefined', 'Callback when the whole item is pressed/clicked.'],
                ['className', 'string', 'undefined', 'Additional CSS class name forwarded to the root element.'],
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
  );
}
