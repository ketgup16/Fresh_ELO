import React, { useState } from 'react';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AXAvatarButton, AXAvatarIndicatorType, AXAvatarClockState } from '@/components/walmart/AXAvatarButton';
import { User } from '@/components/icons/User';

// Avatar dimensions via primitive scale tokens (space-300=24px · space-400=32px · space-500=40px · space-600=48px · space-800=64px)
const AVATAR_DIM = {
  xsmall: { width: 'var(--ld-primitive-scale-space-300, 1.5rem)', height: 'var(--ld-primitive-scale-space-300, 1.5rem)' },
  small:  { width: 'var(--ld-primitive-scale-space-400, 2rem)',   height: 'var(--ld-primitive-scale-space-400, 2rem)' },
  large:  { width: 'var(--ld-primitive-scale-space-600, 3rem)',   height: 'var(--ld-primitive-scale-space-600, 3rem)' },
  xlarge: { width: 'var(--ld-primitive-scale-space-800, 4rem)',   height: 'var(--ld-primitive-scale-space-800, 4rem)' },
} as const;

const HEADING: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '700',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-primary)',
  marginBottom: '16px',
};

const LABEL: React.CSSProperties = {
  fontSize: '12px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-subtle, #74767C)',
  marginTop: '8px',
  textAlign: 'center',
};

const SELECT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '13px',
  fontWeight: 500,
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  background: 'white',
  border: '1px solid var(--ld-semantic-color-separator, #D9DADB)',
  borderRadius: '6px',
  padding: '5px 28px 5px 10px',
  cursor: 'pointer',
  appearance: 'auto',
  outline: 'none',
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

export default function AXAvatarButtonExample() {
  const [indicator, setIndicator] = useState<AXAvatarIndicatorType>('none');
  const [clockState, setClockState] = useState<AXAvatarClockState>('active');
  const [imageType, setImageType] = useState<'image' | 'initials' | 'icon'>('initials');
  const [avatarSize, setAvatarSize] = useState<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [disabled, setDisabled] = useState(false);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const SIZE_STYLE: Record<string, { width: string; height: string } | undefined> = {
    xsmall: AVATAR_DIM.xsmall,
    small:  AVATAR_DIM.small,
    medium: undefined,
    large:  AVATAR_DIM.large,
    xlarge: AVATAR_DIM.xlarge,
  };
  const sizeStyle = SIZE_STYLE[avatarSize];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Interactive demo ── */}
      <div style={CARD}>
        <section>
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

              {/* Size */}
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Size</span>
                <select value={avatarSize} onChange={e => setAvatarSize(e.target.value as 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge')} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                  <option value="xsmall">XSmall · 24px</option>
                  <option value="small">Small · 32px</option>
                  <option value="medium">Medium · 40px</option>
                  <option value="large">Large · 48px</option>
                  <option value="xlarge">XLarge · 64px</option>
                </select>
              </div>

              {/* Badge */}
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Badge</span>
                <select value={indicator} onChange={e => setIndicator(e.target.value as AXAvatarIndicatorType)} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                  <option value="none">None</option>
                  <option value="badge">Badge</option>
                  <option value="clock">Clock indicator</option>
                </select>
              </div>

              {/* Image type */}
              <div style={PROP_ROW}>
                <span style={PROP_LABEL}>Image type</span>
                <select value={imageType} onChange={e => setImageType(e.target.value as 'image' | 'initials' | 'icon')} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                  <option value="initials">Initials</option>
                  <option value="image">Image</option>
                  <option value="icon">Icon</option>
                </select>
              </div>

              {/* Clock status — only when indicator = clock */}
              {indicator === 'clock' && (
                <div style={PROP_ROW}>
                  <span style={PROP_LABEL}>Clock status</span>
                  <select value={clockState} onChange={e => setClockState(e.target.value as AXAvatarClockState)} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                    <option value="active">Clocked in</option>
                    <option value="subtle">Clocked out</option>
                  </select>
                </div>
              )}

              {/* Disabled */}
              <div style={{ ...PROP_ROW, borderBottom: 'none', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={PROP_LABEL}>Disabled</span>
                <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              </div>
            </div>

            {/* Live preview */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ ...LABEL, marginTop: 0 }}>Preview</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <AXAvatarButton
                  indicator={indicator}
                  clockState={clockState}
                  size={avatarSize}
                  avatarStyle={sizeStyle}
                  disabled={disabled}
                  aria-label="User avatar"
                  onClick={() => setLastClicked(`Clicked at ${new Date().toLocaleTimeString()}`)}
                >
                  {imageType === 'image' && (
                    <>
                      <AvatarImage src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg" alt="Person" />
                      <AvatarFallback>AB</AvatarFallback>
                    </>
                  )}
                  {imageType === 'initials' && <AvatarFallback>AB</AvatarFallback>}
                  {imageType === 'icon' && (
                    <AvatarFallback>
                      <User
                        width={avatarSize === 'xsmall' ? 12 : avatarSize === 'small' ? 16 : avatarSize === 'xlarge' ? 32 : 24}
                        height={avatarSize === 'xsmall' ? 12 : avatarSize === 'small' ? 16 : avatarSize === 'xlarge' ? 32 : 24}
                        color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)"
                      />
                    </AvatarFallback>
                  )}
                </AXAvatarButton>
                {lastClicked && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>
                    {lastClicked}
                  </span>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ── Badge types + Clock indicator status ── */}
      <div style={{ display: 'flex', gap: '24px' }}>

        <div style={{ flex: 1, ...CARD }}>
          <section>
            <h3 style={HEADING}>Badge types</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              {[
                { indicator: 'none' as AXAvatarIndicatorType, label: 'None', initials: 'AL' },
                { indicator: 'badge' as AXAvatarIndicatorType, label: 'Badge', initials: 'JD' },
                { indicator: 'clock' as AXAvatarIndicatorType, label: 'Clock indicator', initials: 'MK', clockState: 'active' as AXAvatarClockState },
              ].map(({ indicator: ind, label, initials, clockState: cs }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <AXAvatarButton indicator={ind} clockState={cs} aria-label={label} onClick={() => {}}>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </AXAvatarButton>
                  <span style={LABEL}>{label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div style={{ flex: 1, ...CARD }}>
          <section>
            <h3 style={HEADING}>Clock indicator status</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              {[
                { clockState: 'active' as AXAvatarClockState, label: 'Clocked in', initials: 'MK' },
                { clockState: 'subtle' as AXAvatarClockState, label: 'Clocked out', initials: 'EM' },
              ].map(({ clockState: cs, label, initials }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <AXAvatarButton indicator="clock" clockState={cs} aria-label={label} onClick={() => {}}>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </AXAvatarButton>
                  <span style={LABEL}>{label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>

      {/* ── States ── */}
      <div style={CARD}>
        <section>
          <h3 style={HEADING}>States</h3>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatarButton aria-label="Default" onClick={() => {}}>
                <AvatarFallback>DE</AvatarFallback>
              </AXAvatarButton>
              <span style={LABEL}>Default</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatarButton disabled aria-label="Disabled">
                <AvatarFallback>DS</AvatarFallback>
              </AXAvatarButton>
              <span style={LABEL}>Disabled</span>
            </div>
          </div>
        </section>
      </div>

      {/* ── Image type ── */}
      <div style={CARD}>
        <section>
          <h3 style={HEADING}>Image type</h3>
          <div style={{ display: 'flex', gap: '0', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With image</span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <AXAvatarButton aria-label="User 1" onClick={() => {}}>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </AXAvatarButton>
                <AXAvatarButton aria-label="User 2" onClick={() => {}}>
                  <AvatarImage src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg" alt="Person" />
                  <AvatarFallback>VC</AvatarFallback>
                </AXAvatarButton>
                <AXAvatarButton aria-label="User 3" onClick={() => {}}>
                  <AvatarImage src="https://github.com/react.png" alt="@react" />
                  <AvatarFallback>RC</AvatarFallback>
                </AXAvatarButton>
              </div>
            </div>
            <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)', margin: '0 32px', flexShrink: 0 }} role="separator" aria-orientation="vertical" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With live text initials</span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {['AB', 'CD', 'EF'].map(i => (
                  <AXAvatarButton key={i} aria-label={`User ${i}`} onClick={() => {}}>
                    <AvatarFallback>{i}</AvatarFallback>
                  </AXAvatarButton>
                ))}
              </div>
            </div>
            <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)', margin: '0 32px', flexShrink: 0 }} role="separator" aria-orientation="vertical" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With icon</span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {['U1', 'U2', 'U3'].map(i => (
                  <AXAvatarButton key={i} aria-label={`User ${i}`} onClick={() => {}}>
                    <AvatarFallback>
                      <User width={24} height={24} color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)" />
                    </AvatarFallback>
                  </AXAvatarButton>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Sizes ── */}
      <div style={CARD}>
        <section>
          <h3 style={HEADING}>Sizes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {[
              { label: 'No badge', ind: 'none' as AXAvatarIndicatorType, cs: undefined },
              { label: 'Badge', ind: 'badge' as AXAvatarIndicatorType, cs: undefined },
              { label: 'Clock indicator', ind: 'clock' as AXAvatarIndicatorType, cs: 'active' as AXAvatarClockState },
            ].map(({ label, ind, cs }, idx) => (
              <React.Fragment key={label}>
                {idx > 0 && <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} role="separator" />}
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  {/* Avatar previews column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                    <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '4px' }}>{label}</span>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      {['XSmall · 24px', 'Small · 32px', 'Medium · 40px', 'Large · 48px', 'XLarge · 64px'].map(l => (
                        <span key={l} style={{ ...LABEL, marginTop: 0, minWidth: '80px', textAlign: 'center' }}>{l}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                        <AXAvatarButton indicator={ind} clockState={cs} size="xsmall" aria-label={`${label} xsmall`} onClick={() => {}}>
                          <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)', fontWeight: 'var(--ld-semantic-font-caption-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-caption-family)', lineHeight: 'var(--ld-semantic-font-caption-line-height, 1rem)' }}>XS</AvatarFallback>
                        </AXAvatarButton>
                      </div>
                      <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                        <AXAvatarButton indicator={ind} clockState={cs} size="small" aria-label={`${label} small`} onClick={() => {}}>
                          <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-body-small-family)', lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)' }}>SM</AvatarFallback>
                        </AXAvatarButton>
                      </div>
                      <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                        <AXAvatarButton indicator={ind} clockState={cs} size="medium" aria-label={`${label} medium`} onClick={() => {}}>
                          <AvatarFallback>MD</AvatarFallback>
                        </AXAvatarButton>
                      </div>
                      <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                        <AXAvatarButton indicator={ind} clockState={cs} size="large" aria-label={`${label} large`} onClick={() => {}}>
                          <AvatarFallback>LG</AvatarFallback>
                        </AXAvatarButton>
                      </div>
                      <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                        <AXAvatarButton indicator={ind} clockState={cs} size="xlarge" aria-label={`${label} xlarge`} onClick={() => {}}>
                          <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)', fontFamily: 'var(--ld-semantic-font-heading-large-family)', lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)' }}>XL</AvatarFallback>
                        </AXAvatarButton>
                      </div>
                    </div>
                  </div>

                  {/* Offset table — shown for Badge and Clock indicator rows */}
                  {(ind === 'badge' || ind === 'clock') && (() => {
                    const title = ind === 'badge' ? 'Badge offset values' : 'Clock indicator offset values';
                    const rows: [string, string][] = ind === 'badge'
                      ? [
                          ['XSmall · 24px', '−8px'],
                          ['Small · 32px',  '−6px'],
                          ['Medium · 40px', '−4px'],
                          ['Large · 48px',  '−2px'],
                          ['XLarge · 64px', '+2px'],
                        ]
                      : [
                          ['XSmall · 24px', '−4px'],
                          ['Small · 32px',  '−4px'],
                          ['Medium · 40px', '−2px'],
                          ['Large · 48px',  '0'],
                          ['XLarge · 64px', '+4px'],
                        ];
                    return (
                      <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                        <p style={{ margin: '0 0 6px 0', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>{title}</p>
                        <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '11px' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                              {['Size', 'Offset'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '4px 8px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map(([size, resolved]) => (
                              <tr key={size} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                                <td style={{ padding: '4px 8px', color: 'var(--ld-semantic-color-text)', whiteSpace: 'nowrap' }}>{size}</td>
                                <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontSize: '11px', color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{resolved}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              </React.Fragment>
            ))}

          </div>

        </section>
      </div>

      {/* ── Anatomy ── */}
      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>Anatomy</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                {['Element', 'Description', 'Visibility'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Button wrapper', 'Focusable <button> element wrapping the avatar. Provides click, focus ring, and disabled state.', 'Always'],
                ['Avatar circle', 'Circular container that clips the image or fallback content.', 'Always'],
                ['Avatar image', 'Profile photo rendered inside the circle.', 'When image src is provided and loaded'],
                ['Fallback initials', 'Two-letter initials shown when no image is available.', 'When image is absent or fails to load'],
                ['Fallback icon', 'Icon (e.g. User) shown instead of initials.', 'When icon is passed as fallback child'],
                ['Badge indicator', 'Notification count badge at top-right of the circle.', 'When indicator="badge"'],
                ['Clock indicator dot', 'Status dot: green (clocked in) or grey (clocked out).', 'When indicator="clock"'],
                ['Focus ring', 'Blue outline ring shown on keyboard focus.', 'When button is focused'],
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

      {/* ── Component Props ── */}
      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>Component Props</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map((h, i) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)', whiteSpace: i === 0 || i === 2 ? 'nowrap' : undefined }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['indicator', "'none' | 'badge' | 'clock'", "'none'", 'Which indicator overlay to show on the avatar.'],
                ['clockState', "'active' | 'subtle'", "'active'", 'State of the clock indicator dot. Only used when indicator="clock".'],
                ['size', "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'", "'medium'", 'Avatar size — also controls indicator offset positioning.'],
                ['disabled', 'boolean', 'false', 'Disables the button interaction and reduces opacity to 40%.'],
                ['onClick', '(e: MouseEvent) => void', '—', 'Called when the button is clicked.'],
                ['aria-label', 'string', '—', 'Accessible label for the button. Required when no visible text is present.'],
                ['avatarStyle', 'React.CSSProperties', '—', 'Style forwarded to the inner Avatar circle element.'],
                ['children', 'ReactNode', '—', 'Avatar content — typically AvatarImage and/or AvatarFallback.'],
                ['style', 'React.CSSProperties', '—', 'Style applied to the outer button element.'],
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
