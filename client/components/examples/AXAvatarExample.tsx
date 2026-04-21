import React, { useState } from 'react';
import { AvatarFallback, AvatarImage } from '@/components/walmart/AXAvatar';
import { User } from '@/components/icons/User';
import { AXAvatar, AXAvatarIndicatorType, AXAvatarClockState } from '@/components/walmart/AXAvatar';
import styles from './ExamplePage.module.css';

// Avatar dimensions via primitive scale tokens
const AVATAR_DIM = {
  xsmall: { width: 'var(--ld-primitive-scale-space-300, 1.5rem)', height: 'var(--ld-primitive-scale-space-300, 1.5rem)' },
  small:  { width: 'var(--ld-primitive-scale-space-400, 2rem)',   height: 'var(--ld-primitive-scale-space-400, 2rem)' },
  large:  { width: 'var(--ld-primitive-scale-space-600, 3rem)',   height: 'var(--ld-primitive-scale-space-600, 3rem)' },
  xlarge: { width: 'var(--ld-primitive-scale-space-800, 4rem)',   height: 'var(--ld-primitive-scale-space-800, 4rem)' },
} as const;


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

export default function AXAvatarExample() {
  const [indicator, setIndicator] = useState<AXAvatarIndicatorType>('none');
  const [clockState, setClockState] = useState<AXAvatarClockState>('active');
  const [imageType, setImageType] = useState<'image' | 'initials' | 'icon'>('initials');
  const [avatarSize, setAvatarSize] = useState<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>('medium');

  const SIZE_STYLE: Record<string, { width: string; height: string } | undefined> = {
    xsmall: AVATAR_DIM.xsmall,
    small:  AVATAR_DIM.small,
    medium: undefined,
    large:  AVATAR_DIM.large,
    xlarge: AVATAR_DIM.xlarge,
  };
  const sizeStyle = SIZE_STYLE[avatarSize];

  const FALLBACK_TEXT_STYLE: Record<string, React.CSSProperties> = {
    xsmall: { fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)', fontWeight: 'var(--ld-semantic-font-caption-weight-default, 400)' as React.CSSProperties['fontWeight'], fontFamily: 'var(--ld-semantic-font-caption-family)', lineHeight: 'var(--ld-semantic-font-caption-line-height, 1rem)' },
    small:  { fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)' as React.CSSProperties['fontWeight'], fontFamily: 'var(--ld-semantic-font-body-small-family)', lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)' },
    medium: {},
    large:  {},
    xlarge: { fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)' as React.CSSProperties['fontWeight'], fontFamily: 'var(--ld-semantic-font-heading-large-family)', lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)' },
  };
  const fallbackTextStyle = FALLBACK_TEXT_STYLE[avatarSize];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

      {/* ── Interactive demo ── */}
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
            <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)', background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Properties
              </span>
            </div>

            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Size</span>
              <select value={avatarSize} onChange={e => setAvatarSize(e.target.value as 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge')} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                <option value="xsmall">XSmall · 24px</option>
                <option value="small">Small · 32px</option>
                <option value="medium">Medium · 40px</option>
                <option value="large">Large · 48px</option>
                <option value="xlarge">XLarge · 64px</option>
              </select>
            </div>

            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Badge</span>
              <select value={indicator} onChange={e => setIndicator(e.target.value as AXAvatarIndicatorType)} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                <option value="none">None</option>
                <option value="badge">Badge</option>
                <option value="clock">Clock indicator</option>
              </select>
            </div>

            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Image type</span>
              <select value={imageType} onChange={e => setImageType(e.target.value as 'image' | 'initials' | 'icon')} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                <option value="initials">Initials</option>
                <option value="image">Image</option>
                <option value="icon">Icon</option>
              </select>
            </div>

            {indicator === 'clock' && (
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Clock status</span>
                <select value={clockState} onChange={e => setClockState(e.target.value as AXAvatarClockState)} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                  <option value="active">Clocked in</option>
                  <option value="subtle">Clocked out</option>
                </select>
              </div>
            )}
          </div>

          {/* Live preview */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ ...LABEL, marginTop: 0 }}>Preview</span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AXAvatar indicator={indicator} clockState={clockState} size={avatarSize} avatarStyle={sizeStyle}>
                {imageType === 'image' && (
                  <>
                    <AvatarImage src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg" alt="Person" />
                    <AvatarFallback>AB</AvatarFallback>
                  </>
                )}
                {imageType === 'initials' && <AvatarFallback style={fallbackTextStyle}>AB</AvatarFallback>}
                {imageType === 'icon' && (
                  <AvatarFallback>
                    <User
                      width={avatarSize === 'xsmall' ? 12 : avatarSize === 'small' ? 16 : avatarSize === 'xlarge' ? 32 : 24}
                      height={avatarSize === 'xsmall' ? 12 : avatarSize === 'small' ? 16 : avatarSize === 'xlarge' ? 32 : 24}
                      color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)"
                    />
                  </AvatarFallback>
                )}
              </AXAvatar>
            </div>
          </div>

        </div>
      </section>

      {/* ── Badge types + Clock indicator status (side by side) ── */}
      <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>

        <section style={{ flex: 1 }}>
          <h2 className={styles.sectionTitle}>Badge types</h2>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator="none"><AvatarFallback>AL</AvatarFallback></AXAvatar>
              <span style={LABEL}>None</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator="badge"><AvatarFallback>JD</AvatarFallback></AXAvatar>
              <span style={LABEL}>Badge</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator="clock" clockState="active"><AvatarFallback>MK</AvatarFallback></AXAvatar>
              <span style={LABEL}>Clock indicator</span>
            </div>
          </div>
        </section>

        <section style={{ flex: 1 }}>
          <h2 className={styles.sectionTitle}>Clock indicator status</h2>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator="clock" clockState="active"><AvatarFallback>MK</AvatarFallback></AXAvatar>
              <span style={LABEL}>Clocked in</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator="clock" clockState="subtle"><AvatarFallback>EM</AvatarFallback></AXAvatar>
              <span style={LABEL}>Clocked out</span>
            </div>
          </div>
        </section>

      </div>

      {/* ── Image type ── */}
      <section>
        <h2 className={styles.sectionTitle}>Image type</h2>
        <div style={{ display: 'flex', gap: '0', alignItems: 'flex-start' }}>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With image</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <AXAvatar indicator="none">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><AvatarFallback>CN</AvatarFallback>
              </AXAvatar>
              <AXAvatar indicator="none">
                <AvatarImage src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg" alt="Person" /><AvatarFallback>VC</AvatarFallback>
              </AXAvatar>
              <AXAvatar indicator="none">
                <AvatarImage src="https://github.com/react.png" alt="@react" /><AvatarFallback>RC</AvatarFallback>
              </AXAvatar>
            </div>
          </div>

          <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)', margin: '0 32px', flexShrink: 0 }} role="separator" aria-orientation="vertical" />

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With live text initials</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <AXAvatar indicator="none"><AvatarFallback>AB</AvatarFallback></AXAvatar>
              <AXAvatar indicator="none"><AvatarFallback>CD</AvatarFallback></AXAvatar>
              <AXAvatar indicator="none"><AvatarFallback>EF</AvatarFallback></AXAvatar>
            </div>
          </div>

          <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)', margin: '0 32px', flexShrink: 0 }} role="separator" aria-orientation="vertical" />

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With icon</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <AXAvatar indicator="none"><AvatarFallback><User width={24} height={24} color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)" /></AvatarFallback></AXAvatar>
              <AXAvatar indicator="none"><AvatarFallback><User width={24} height={24} color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)" /></AvatarFallback></AXAvatar>
              <AXAvatar indicator="none"><AvatarFallback><User width={24} height={24} color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)" /></AvatarFallback></AXAvatar>
            </div>
          </div>

        </div>
      </section>

      {/* ── Sizes ── */}
      <section>
        <h2 className={styles.sectionTitle}>Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* No badge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '4px' }}>No badge</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['XSmall · 24px', 'Small · 32px', 'Medium · 40px', 'Large · 48px', 'XLarge · 64px'].map(l => (
                <span key={l} style={{ ...LABEL, marginTop: 0, minWidth: '80px', textAlign: 'center' }}>{l}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                <AXAvatar indicator="none" size="xsmall" avatarStyle={AVATAR_DIM.xsmall}>
                  <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)', fontWeight: 'var(--ld-semantic-font-caption-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-caption-family)' }}>XS</AvatarFallback>
                </AXAvatar>
              </div>
              <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                <AXAvatar indicator="none" size="small" avatarStyle={AVATAR_DIM.small}>
                  <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontFamily: 'var(--ld-semantic-font-body-small-family)' }}>SM</AvatarFallback>
                </AXAvatar>
              </div>
              <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                <AXAvatar indicator="none"><AvatarFallback>MD</AvatarFallback></AXAvatar>
              </div>
              <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                <AXAvatar indicator="none" size="large" avatarStyle={AVATAR_DIM.large}><AvatarFallback>LG</AvatarFallback></AXAvatar>
              </div>
              <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                <AXAvatar indicator="none" size="xlarge" avatarStyle={AVATAR_DIM.xlarge}>
                  <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontFamily: 'var(--ld-semantic-font-heading-large-family)' }}>XL</AvatarFallback>
                </AXAvatar>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} role="separator" />

          {/* Badge */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '4px' }}>Badge</span>
              <div style={{ display: 'flex', gap: '20px' }}>
                {['XSmall · 24px', 'Small · 32px', 'Medium · 40px', 'Large · 48px', 'XLarge · 64px'].map(l => (
                  <span key={l} style={{ ...LABEL, marginTop: 0, minWidth: '80px', textAlign: 'center' }}>{l}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge" size="xsmall" avatarStyle={AVATAR_DIM.xsmall}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)', fontFamily: 'var(--ld-semantic-font-caption-family)' }}>XS</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge" size="small" avatarStyle={AVATAR_DIM.small}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontFamily: 'var(--ld-semantic-font-body-small-family)' }}>SM</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge"><AvatarFallback>MD</AvatarFallback></AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge" size="large" avatarStyle={AVATAR_DIM.large}><AvatarFallback>LG</AvatarFallback></AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge" size="xlarge" avatarStyle={AVATAR_DIM.xlarge}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontFamily: 'var(--ld-semantic-font-heading-large-family)' }}>XL</AvatarFallback>
                  </AXAvatar>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <p style={{ margin: '0 0 6px 0', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Badge offset values</p>
              <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                    {['Size', 'Offset'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '4px 8px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(['XSmall · 24px', '−8px'], ['Small · 32px', '−6px'], ['Medium · 40px', '−4px'], ['Large · 48px', '−2px'], ['XLarge · 64px', '+2px']).map(([size, offset]) => (
                    <tr key={size} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                      <td style={{ padding: '4px 8px', color: 'var(--ld-semantic-color-text)', whiteSpace: 'nowrap' }}>{size}</td>
                      <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontSize: '11px', color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{offset}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} role="separator" />

          {/* Clock indicator */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '4px' }}>Clock indicator</span>
              <div style={{ display: 'flex', gap: '20px' }}>
                {['XSmall · 24px', 'Small · 32px', 'Medium · 40px', 'Large · 48px', 'XLarge · 64px'].map(l => (
                  <span key={l} style={{ ...LABEL, marginTop: 0, minWidth: '80px', textAlign: 'center' }}>{l}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active" size="xsmall" avatarStyle={AVATAR_DIM.xsmall}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)', fontFamily: 'var(--ld-semantic-font-caption-family)' }}>XS</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active" size="small" avatarStyle={AVATAR_DIM.small}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontFamily: 'var(--ld-semantic-font-body-small-family)' }}>SM</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active"><AvatarFallback>MD</AvatarFallback></AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active" size="large" avatarStyle={AVATAR_DIM.large}><AvatarFallback>LG</AvatarFallback></AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active" size="xlarge" avatarStyle={AVATAR_DIM.xlarge}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontFamily: 'var(--ld-semantic-font-heading-large-family)' }}>XL</AvatarFallback>
                  </AXAvatar>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <p style={{ margin: '0 0 6px 0', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Clock indicator offset values</p>
              <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                    {['Size', 'Offset'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '4px 8px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(['XSmall · 24px', '−4px'], ['Small · 32px', '−4px'], ['Medium · 40px', '−2px'], ['Large · 48px', '0'], ['XLarge · 64px', '+4px']).map(([size, offset]) => (
                    <tr key={size} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                      <td style={{ padding: '4px 8px', color: 'var(--ld-semantic-color-text)', whiteSpace: 'nowrap' }}>{size}</td>
                      <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontSize: '11px', color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{offset}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ── Anatomy ── */}
      <section>
        <h2 className={styles.sectionTitle}>Anatomy</h2>
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
                ['Avatar circle', 'Circular container that clips the image or fallback content.', 'Always'],
                ['Avatar image', 'Profile photo rendered inside the circle.', 'When image src is provided and loaded'],
                ['Fallback initials', 'Two-letter initials shown when no image is available.', 'When image is absent or fails to load'],
                ['Fallback icon', 'Icon (e.g. User) shown instead of initials.', 'When icon is passed as fallback child'],
                ['Badge indicator', 'Notification count badge positioned at the top-right of the circle.', 'When indicator="badge"'],
                ['Clock indicator dot', 'Small status dot indicating clocked-in (green) or clocked-out (grey) state.', 'When indicator="clock"'],
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
      </section>

      {/* ── Component Props ── */}
      <section>
        <h2 className={styles.sectionTitle}>Component Props</h2>
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
                ['clockState', "'active' | 'subtle'", "'active'", 'State of the clock indicator dot. active = clocked in (green), subtle = clocked out (grey). Only used when indicator="clock".'],
                ['size', "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'", "'medium'", 'Avatar size — affects indicator positioning.'],
                ['avatarStyle', 'React.CSSProperties', '—', 'Style forwarded to the inner Avatar circle element. Use to set custom width/height.'],
                ['children', 'ReactNode', '—', 'Content rendered inside the avatar circle — typically AvatarImage and/or AvatarFallback.'],
                ['style', 'React.CSSProperties', '—', 'Style applied to the outer positioning wrapper span.'],
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
      </section>

    </div>
  );
}
