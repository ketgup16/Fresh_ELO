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

const CONTROL_ROW: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
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

const DIVIDER: React.CSSProperties = {
  width: '1px',
  background: 'var(--ld-semantic-color-separator, #D9DADB)',
  alignSelf: 'stretch',
};

export default function AXAvatarExample() {
  const [indicator, setIndicator] = useState<AXAvatarIndicatorType>('none');
  const [clockState, setClockState] = useState<AXAvatarClockState>('active');

  const clockStateOptions: { value: AXAvatarClockState; label: string }[] = [
    { value: 'active', label: 'Clocked in' },
    { value: 'subtle', label: 'Clocked out' },
  ];

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

      {/* ── Properties Panel ── */}
      <div>
        <h3 style={{ ...HEADING, marginBottom: '12px' }}>Indicator</h3>
        <div style={CONTROL_ROW}>

          {/* Indicator type dropdown */}
          <span style={{ fontSize: '13px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2E2F32)', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Type:
          </span>
          <select
            value={indicator}
            onChange={e => setIndicator(e.target.value as AXAvatarIndicatorType)}
            style={SELECT_STYLE}
          >
            <option value="none">None</option>
            <option value="badge">Badge</option>
            <option value="clock">Clock indicator</option>
          </select>

          {/* Clock state chips — only when clock indicator is selected */}
          {indicator === 'clock' && (
            <>
              <div style={DIVIDER} />
              <span style={{ fontSize: '13px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                State:
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {clockStateOptions.map(opt => (
                  <button
                    key={opt.value}
                    style={clockState === opt.value ? CHIP_ACTIVE : CHIP_BASE}
                    onClick={() => setClockState(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Badge note */}
          {indicator === 'badge' && (
            <>
              <div style={DIVIDER} />
              <span style={{ fontSize: '12px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>
                Variant: Brand Bold (blue)
              </span>
            </>
          )}
        </div>

        {/* Indicator reference row */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {/* Live preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <AXAvatar indicator={indicator} clockState={clockState}>
              <AvatarFallback>AB</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Preview</span>
          </div>

          <div style={DIVIDER} />

          {/* All states reference */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
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
              <span style={LABEL}>Clocked in</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator="clock" clockState="subtle">
                <AvatarFallback>EM</AvatarFallback>
              </AXAvatar>
              <span style={LABEL}>Clocked out</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatar indicator="none">
                <AvatarFallback>AL</AvatarFallback>
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
          <AXAvatar indicator={indicator} clockState={clockState}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </AXAvatar>
          <AXAvatar indicator={indicator} clockState={clockState}>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </AXAvatar>
          <AXAvatar indicator={indicator} clockState={clockState}>
            <AvatarImage src="https://github.com/react.png" alt="@react" />
            <AvatarFallback>RC</AvatarFallback>
          </AXAvatar>
        </div>
      </section>

      {/* ── Avatar with Fallback ── */}
      <section>
        <h3 style={HEADING}>Avatar with Fallback</h3>
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
      </section>

      {/* ── Different Sizes ── */}
      <section>
        <h3 style={HEADING}>Different Sizes</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <AXAvatar indicator={indicator} clockState={clockState} avatarStyle={{ width: '32px', height: '32px' }}>
              <AvatarFallback style={{ fontSize: '12px' }}>SM</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <AXAvatar indicator={indicator} clockState={clockState}>
              <AvatarFallback>MD</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <AXAvatar indicator={indicator} clockState={clockState} avatarStyle={{ width: '56px', height: '56px' }}>
              <AvatarFallback style={{ fontSize: '18px' }}>LG</AvatarFallback>
            </AXAvatar>
            <span style={LABEL}>Large</span>
          </div>
        </div>
      </section>

    </div>
  );
}
