import React, { useState } from 'react';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/components/icons/User';
import { AXAvatar, AXAvatarIndicatorType, AXAvatarClockState } from '@/components/walmart/AXAvatar';

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

export default function AXAvatarExample() {
  const [indicator, setIndicator] = useState<AXAvatarIndicatorType>('none');
  const [clockState, setClockState] = useState<AXAvatarClockState>('active');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Interactive demo — own card ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <section>
          <h3 style={HEADING}>Interactive demo</h3>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

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
              {/* Panel heading */}
              <div style={{
                padding: '8px 16px',
                borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
                background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  color: 'var(--ld-semantic-color-text-subtle, #74767C)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  Properties
                </span>
              </div>

              {/* Badge property row */}
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
                  Badge
                </span>
                <select
                  value={indicator}
                  onChange={e => setIndicator(e.target.value as AXAvatarIndicatorType)}
                  style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}
                >
                  <option value="none">None</option>
                  <option value="badge">Badge</option>
                  <option value="clock">Clock indicator</option>
                </select>
              </div>

              {/* Clock status property row */}
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
                  Clock status
                </span>
                <select
                  value={clockState}
                  onChange={e => setClockState(e.target.value as AXAvatarClockState)}
                  style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}
                >
                  <option value="active">Clocked in</option>
                  <option value="subtle">Clocked out</option>
                </select>
              </div>
            </div>

            {/* Live preview */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator={indicator} clockState={clockState}>
                <AvatarFallback>AB</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>Preview</span>
            </div>

          </div>
        </section>
      </div>

      {/* ── Badge types + Clock indicator status (same row) ── */}
      <div style={{ display: 'flex', gap: '24px' }}>

        {/* Badge types */}
        <div style={{ flex: 1, backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
          <section>
            <h3 style={HEADING}>Badge types</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <AXAvatar indicator="none">
                  <AvatarFallback>AL</AvatarFallback>
                </AXAvatar>
                <span style={LABEL}>None</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <AXAvatar indicator="badge">
                  <AvatarFallback>JD</AvatarFallback>
                </AXAvatar>
                <span style={LABEL}>Badge</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <AXAvatar indicator="clock" clockState="active">
                  <AvatarFallback>MK</AvatarFallback>
                </AXAvatar>
                <span style={LABEL}>Clock indicator</span>
              </div>
            </div>
          </section>
        </div>

        {/* Clock indicator status */}
        <div style={{ flex: 1, backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
          <section>
            <h3 style={HEADING}>Clock indicator status</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <AXAvatar indicator="clock" clockState="active">
                  <AvatarFallback>MK</AvatarFallback>
                </AXAvatar>
                <span style={LABEL}>Clocked in</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <AXAvatar indicator="clock" clockState="subtle">
                  <AvatarFallback>EM</AvatarFallback>
                </AXAvatar>
                <span style={LABEL}>Clocked out</span>
              </div>
            </div>
          </section>
        </div>

      </div>

      {/* ── Image type ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <section>
          <h3 style={HEADING}>Image type</h3>
          <div style={{ display: 'flex', gap: '0', alignItems: 'flex-start' }}>

            {/* With image */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With image</span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </AXAvatar>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarImage src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg" alt="Person" />
                  <AvatarFallback>VC</AvatarFallback>
                </AXAvatar>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarImage src="https://github.com/react.png" alt="@react" />
                  <AvatarFallback>RC</AvatarFallback>
                </AXAvatar>
              </div>
            </div>

            {/* Vertical divider */}
            <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)', margin: '0 32px', flexShrink: 0 }} role="separator" aria-orientation="vertical" />

            {/* With live text initials */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With live text initials</span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarFallback>AB</AvatarFallback>
                </AXAvatar>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarFallback>CD</AvatarFallback>
                </AXAvatar>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarFallback>EF</AvatarFallback>
                </AXAvatar>
              </div>
            </div>

            {/* Vertical divider */}
            <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)', margin: '0 32px', flexShrink: 0 }} role="separator" aria-orientation="vertical" />

            {/* With icon */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '12px' }}>With icon</span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarFallback>
                    <User width={24} height={24} color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)" />
                  </AvatarFallback>
                </AXAvatar>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarFallback>
                    <User width={24} height={24} color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)" />
                  </AvatarFallback>
                </AXAvatar>
                <AXAvatar indicator={indicator} clockState={clockState}>
                  <AvatarFallback>
                    <User width={24} height={24} color="var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)" />
                  </AvatarFallback>
                </AXAvatar>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ── Sizes ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <section>
          <h3 style={HEADING}>Sizes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* No badge */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '4px' }}>No badge</span>
              {/* Labels row — all aligned */}
              <div style={{ display: 'flex', gap: '20px' }}>
                {['Small · 32px', 'Medium · 40px', 'Large · 64px'].map(l => (
                  <span key={l} style={{ ...LABEL, marginTop: 0, minWidth: '80px', textAlign: 'center' }}>{l}</span>
                ))}
              </div>
              {/* Avatars row — vertically centered */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="none" avatarStyle={{ width: '32px', height: '32px' }}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-body-small-family)', lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)' }}>SM</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="none">
                    <AvatarFallback>MD</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="none" avatarStyle={{ width: '64px', height: '64px' }}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)', fontFamily: 'var(--ld-semantic-font-heading-large-family)', lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)' }}>LG</AvatarFallback>
                  </AXAvatar>
                </div>
              </div>
            </div>

            {/* Horizontal divider */}
            <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} role="separator" />

            {/* Badge */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '4px' }}>Badge</span>
              <div style={{ display: 'flex', gap: '20px' }}>
                {['Small · 32px', 'Medium · 40px', 'Large · 64px'].map(l => (
                  <span key={l} style={{ ...LABEL, marginTop: 0, minWidth: '80px', textAlign: 'center' }}>{l}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge" size="small" avatarStyle={{ width: '32px', height: '32px' }}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-body-small-family)', lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)' }}>SM</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge">
                    <AvatarFallback>MD</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="badge" size="large" avatarStyle={{ width: '64px', height: '64px' }}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)', fontFamily: 'var(--ld-semantic-font-heading-large-family)', lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)' }}>LG</AvatarFallback>
                  </AXAvatar>
                </div>
              </div>
            </div>

            {/* Horizontal divider */}
            <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} role="separator" />

            {/* Clock indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', display: 'block', marginBottom: '4px' }}>Clock indicator</span>
              <div style={{ display: 'flex', gap: '20px' }}>
                {['Small · 32px', 'Medium · 40px', 'Large · 64px'].map(l => (
                  <span key={l} style={{ ...LABEL, marginTop: 0, minWidth: '80px', textAlign: 'center' }}>{l}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active" size="small" avatarStyle={{ width: '32px', height: '32px' }}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-body-small-family)', lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)' }}>SM</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active">
                    <AvatarFallback>MD</AvatarFallback>
                  </AXAvatar>
                </div>
                <div style={{ minWidth: '80px', display: 'flex', justifyContent: 'center' }}>
                  <AXAvatar indicator="clock" clockState="active" size="large" avatarStyle={{ width: '64px', height: '64px' }}>
                    <AvatarFallback style={{ fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)', fontFamily: 'var(--ld-semantic-font-heading-large-family)', lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)' }}>LG</AvatarFallback>
                  </AXAvatar>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ── Anatomy ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
      </div>

      {/* ── Component Props ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>Component Props</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map((h, i) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)', whiteSpace: i === 2 ? 'nowrap' : undefined }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['indicator', "'none' | 'badge' | 'clock'", "'none'", 'Which indicator overlay to show on the avatar.'],
                ['clockState', "'active' | 'subtle'", "'active'", 'State of the clock indicator dot. active = clocked in (green), subtle = clocked out (grey). Only used when indicator="clock".'],
                ['size', "'small' | 'medium' | 'large'", "'medium'", 'Avatar size — affects indicator positioning. Small offsets indicator outward; large offsets it inward.'],
                ['avatarStyle', 'React.CSSProperties', '—', 'Style forwarded to the inner Avatar circle element. Use to set custom width/height.'],
                ['children', 'ReactNode', '—', 'Content rendered inside the avatar circle — typically AvatarImage and/or AvatarFallback.'],
                ['style', 'React.CSSProperties', '—', 'Style applied to the outer positioning wrapper span.'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--ld-semantic-color-text-brand)' }}>{prop}</td>
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
