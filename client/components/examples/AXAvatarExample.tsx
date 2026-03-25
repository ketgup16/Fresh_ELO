import React, { useState } from 'react';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

      {/* ── Badge types ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
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

      {/* ── Clock indicator status ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
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

      {/* ── Image type ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <section>
          <h3 style={HEADING}>Image type</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
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
            <div>
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
          </div>
        </section>
      </div>

      {/* ── Sizes ── */}
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <section>
          <h3 style={HEADING}>Sizes</h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator={indicator} clockState={clockState} avatarStyle={{ width: '32px', height: '32px' }}>
                <AvatarFallback style={{ fontSize: '12px' }}>SM</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>Small · 32px</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator={indicator} clockState={clockState}>
                <AvatarFallback>MD</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>Medium · 40px</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator={indicator} clockState={clockState} avatarStyle={{ width: '64px', height: '64px' }}>
                <AvatarFallback style={{
                  fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)',
                  fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)',
                  fontFamily: 'var(--ld-semantic-font-heading-large-family)',
                  lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)',
                }}>LG</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>Large · 64px</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
