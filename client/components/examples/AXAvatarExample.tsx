import React, { useState } from 'react';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AXAvatar, AXAvatarClockIndicator } from '@/components/walmart/AXAvatar';

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

const CONTROL_ROW: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '32px',
  padding: '16px',
  background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
  borderRadius: '8px',
};

const CHIP_BASE: React.CSSProperties = {
  padding: '6px 14px',
  borderRadius: '999px',
  border: '1px solid var(--ld-semantic-color-separator, #D9DADB)',
  background: 'white',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  transition: 'all 0.15s ease',
};

const CHIP_ACTIVE: React.CSSProperties = {
  ...CHIP_BASE,
  background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
  borderColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
  color: 'white',
};

const INDICATOR_SWATCH_ACTIVE: React.CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'var(--ld-semantic-color-border-positive, #2A8703)',
  boxShadow: 'inset 0 0 0 1px var(--ld-semantic-color-border-positive, #2A8703)',
  flexShrink: 0,
};

const INDICATOR_SWATCH_SUBTLE: React.CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'var(--ld-semantic-color-background-subtle, #F8F8F8)',
  boxShadow: 'inset 0 0 0 1px var(--ld-semantic-color-border-subtle, #515357)',
  flexShrink: 0,
};

export default function AXAvatarExample() {
  const [clockIndicator, setClockIndicator] = useState<AXAvatarClockIndicator>('none');

  const options: { value: AXAvatarClockIndicator; label: string }[] = [
    { value: 'none', label: 'None' },
    { value: 'active', label: 'Active' },
    { value: 'subtle', label: 'Subtle' },
  ];

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

      {/* ── Clock Indicator Control ── */}
      <div>
        <h3 style={{ ...HEADING, marginBottom: '12px' }}>Clock Indicator</h3>
        <div style={CONTROL_ROW}>
          <span style={{ fontSize: '13px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', fontWeight: 500, whiteSpace: 'nowrap' }}>
            State:
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {options.map(opt => (
              <button
                key={opt.value}
                style={clockIndicator === opt.value ? CHIP_ACTIVE : CHIP_BASE}
                onClick={() => setClockIndicator(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {clockIndicator !== 'none' && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={clockIndicator === 'active' ? INDICATOR_SWATCH_ACTIVE : INDICATOR_SWATCH_SUBTLE} />
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>
                {clockIndicator === 'active'
                  ? 'Fill + stroke: --ld-semantic-color-border-positive'
                  : 'Fill: --ld-semantic-color-background-subtle · Stroke: --ld-semantic-color-border-subtle'}
              </span>
            </div>
          )}
        </div>

        {/* Both indicator states side-by-side for reference */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <AXAvatar clockIndicator={clockIndicator}>
              <AvatarFallback>AB</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Preview</span>
          </div>

          <div style={{ width: '1px', background: 'var(--ld-semantic-color-separator, #D9DADB)', alignSelf: 'stretch' }} />

          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar clockIndicator="active">
                <AvatarFallback>JD</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>Active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar clockIndicator="subtle">
                <AvatarFallback>MK</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>Subtle</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar clockIndicator="none">
                <AvatarFallback>EM</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>None</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Avatar with Image ── */}
      <section>
        <h3 style={HEADING}>Avatar with Image</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <AXAvatar clockIndicator={clockIndicator}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </AXAvatar>
          <AXAvatar clockIndicator={clockIndicator}>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </AXAvatar>
          <AXAvatar clockIndicator={clockIndicator}>
            <AvatarImage src="https://github.com/react.png" alt="@react" />
            <AvatarFallback>RC</AvatarFallback>
          </AXAvatar>
        </div>
      </section>

      {/* ── Avatar with Fallback ── */}
      <section>
        <h3 style={HEADING}>Avatar with Fallback</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <AXAvatar clockIndicator={clockIndicator}>
            <AvatarFallback>AB</AvatarFallback>
          </AXAvatar>
          <AXAvatar clockIndicator={clockIndicator}>
            <AvatarFallback>CD</AvatarFallback>
          </AXAvatar>
          <AXAvatar clockIndicator={clockIndicator}>
            <AvatarFallback>EF</AvatarFallback>
          </AXAvatar>
        </div>
      </section>

      {/* ── Different Sizes ── */}
      <section>
        <h3 style={HEADING}>Different Sizes</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <AXAvatar clockIndicator={clockIndicator} avatarStyle={{ width: '32px', height: '32px' }}>
              <AvatarFallback style={{ fontSize: '12px' }}>SM</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <AXAvatar clockIndicator={clockIndicator}>
              <AvatarFallback>MD</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <AXAvatar clockIndicator={clockIndicator} avatarStyle={{ width: '56px', height: '56px' }}>
              <AvatarFallback style={{ fontSize: '18px' }}>LG</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Large</span>
          </div>
        </div>
      </section>

    </div>
  );
}
