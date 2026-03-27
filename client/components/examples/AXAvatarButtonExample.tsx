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
  const [indicator, setIndicator] = useState<AXAvatarIndicatorType>('clock');
  const [clockState, setClockState] = useState<AXAvatarClockState>('active');
  const [imageType, setImageType] = useState<'image' | 'initials' | 'icon'>('initials');
  const [avatarSize, setAvatarSize] = useState<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [buttonState, setButtonState] = useState<'default' | 'focused' | 'pressed' | 'disabled'>('default');
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(true);

  // Fallback initials font style per avatar size
  const FALLBACK_TEXT_STYLE: Record<string, React.CSSProperties> = {
    xsmall: { fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)', fontWeight: 'var(--ld-semantic-font-caption-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-caption-family)', lineHeight: 'var(--ld-semantic-font-caption-line-height, 1rem)' },
    small:  { fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-body-small-family)', lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)' },
    medium: {},
    large:  {},
    xlarge: { fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)', fontFamily: 'var(--ld-semantic-font-heading-large-family)', lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)' },
  };
  const fallbackTextStyle = FALLBACK_TEXT_STYLE[avatarSize];

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

              {/* State */}
              <div style={{ ...PROP_ROW, borderBottom: 'none' }}>
                <span style={PROP_LABEL}>State</span>
                <select value={buttonState} onChange={e => setButtonState(e.target.value as 'default' | 'focused' | 'pressed' | 'disabled')} style={{ ...SELECT_STYLE, padding: '4px 6px', width: '100%' }}>
                  <option value="default">Default</option>
                  <option value="focused">Focused</option>
                  <option value="pressed">Pressed</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>

            {/* Live preview */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ ...LABEL, marginTop: 0 }}>Preview</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                {/* Button anchor — menu is absolutely positioned below so button never moves */}
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <AXAvatarButton
                    indicator={indicator}
                    clockState={clockState}
                    size={avatarSize}
                    avatarStyle={sizeStyle}
                    disabled={buttonState === 'disabled'}
                    aria-label="User avatar"
                    onClick={() => {
                      if (buttonState !== 'disabled') {
                        setButtonState(s => s === 'pressed' ? 'default' : 'pressed');
                      }
                    }}
                    wrapperStyle={buttonState === 'focused' ? { boxShadow: '0 0 0 3px var(--ld-semantic-color-border-focus, #0071CE)' } : undefined}
                  >
                    {imageType === 'image' && (
                      <>
                        <AvatarImage src="https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg" alt="Person" />
                        <AvatarFallback>AB</AvatarFallback>
                      </>
                    )}
                    {imageType === 'initials' && (
                      <AvatarFallback style={{
                        ...fallbackTextStyle,
                        ...(buttonState === 'focused' ? { backgroundColor: 'var(--ld-semantic-color-fill-activated-subtle-focused)' } : {}),
                        ...(buttonState === 'pressed' ? { backgroundColor: 'var(--ld-semantic-color-fill-activated-subtle-pressed)' } : {}),
                      }}>AB</AvatarFallback>
                    )}
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

                  {/* Account menu — absolutely positioned so button stays in place */}
                  {buttonState === 'pressed' && (
                    <div style={{ position: 'absolute', top: 'calc(100% + var(--ld-primitive-scale-space-100, 8px))', right: 0, zIndex: 10 }}>
                      <div style={{ width: '280px', borderRadius: 'var(--ld-primitive-scale-border-radius-50, 4px)', background: 'var(--ld-semantic-color-fill-surface-primary, #FFF)', boxShadow: '0 -1px 4px 0 rgba(0,0,0,0.10), 0 5px 10px 3px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', width: '100%', padding: 'var(--ld-primitive-scale-space-250, 1.25rem) var(--ld-primitive-scale-space-200, 1rem) var(--ld-primitive-scale-space-200, 1rem)', justifyContent: 'center', boxSizing: 'border-box' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                            <div style={{ width: 'var(--ld-primitive-scale-space-600, 3rem)', height: 'var(--ld-primitive-scale-space-600, 3rem)', borderRadius: '50%', backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ color: 'var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-heading-small-size, 1.125rem)', fontWeight: 700, lineHeight: 1 }}>SC</span>
                            </div>
                            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Firstname Lastname</span>
                            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)', textDecoration: 'underline' }}>Sign out</span>
                          </div>
                        </div>
                        {/* Club info */}
                        <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
                        <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path fillRule="evenodd" clipRule="evenodd" d="M3 6.83055C3.02367 5.52738 3.56347 4.28685 4.5009 3.38129C5.43833 2.47573 6.69679 1.97914 8 2.00055C9.30321 1.97914 10.5617 2.47573 11.4991 3.38129C12.4365 4.28685 12.9763 5.52738 13 6.83055C12.8431 8.3715 12.1618 9.81182 11.07 10.9106C10.1454 11.9585 9.14254 12.9346 8.07001 13.8306L8 13.8906L7.92999 13.8306C6.85746 12.9346 5.85457 11.9585 4.92999 10.9106C3.83823 9.81182 3.15691 8.3715 3 6.83055ZM8 1.00055C6.43158 0.979175 4.9188 1.58112 3.79384 2.67421C2.66888 3.7673 2.0237 5.26217 2 6.83055C2 10.0106 5.5 13.0406 7.27 14.5806L7.56 14.8406C7.68395 14.9428 7.83932 14.9993 8 15.0006C8.16068 14.9993 8.31605 14.9428 8.44 14.8406L8.73 14.5806C10.5 13.0006 14 10.0006 14 6.83055C13.9763 5.26217 13.3311 3.7673 12.2062 2.67421C11.0812 1.58112 9.56842 0.979175 8 1.00055ZM6.5 7.00055C6.5 6.60273 6.65804 6.22119 6.93935 5.93989C7.22065 5.65859 7.60218 5.50055 8 5.50055V4.50055C7.33696 4.50055 6.70108 4.76394 6.23224 5.23278C5.7634 5.70162 5.5 6.33751 5.5 7.00055C5.5 7.66359 5.7634 8.29948 6.23224 8.76832C6.70108 9.23716 7.33696 9.50055 8 9.50055C8.66304 9.50055 9.29892 9.23716 9.76776 8.76832C10.2366 8.29948 10.5 7.66359 10.5 7.00055H9.5C9.5 7.39838 9.34196 7.77991 9.06065 8.06121C8.77935 8.34251 8.39782 8.50055 8 8.50055C7.60218 8.50055 7.22065 8.34251 6.93935 8.06121C6.65804 7.77991 6.5 7.39838 6.5 7.00055Z" fill="#74767C"/></svg>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Club #0001</span>
                              <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Member Services</span>
                            </div>
                          </div>
                          <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)', textDecoration: 'underline', whiteSpace: 'nowrap' }}>Change</span>
                        </div>
                        {/* Report issues */}
                        <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
                        <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M14 14V2H1V1H15V15H1V2H2V14H14Z" fill="#74767C"/><path fillRule="evenodd" clipRule="evenodd" d="M3.438 7V3.172H4.56C4.996 3.172 5.336 3.27 5.58 3.466C5.828 3.662 5.952 3.954 5.952 4.342C5.952 4.718 5.828 5.01 5.58 5.218C5.336 5.426 4.996 5.53 4.56 5.53H3.924V7H3.438ZM4.518 3.58H3.924V5.128H4.518C4.862 5.128 5.106 5.06 5.25 4.924C5.394 4.784 5.466 4.594 5.466 4.354C5.466 4.106 5.394 3.916 5.25 3.784C5.106 3.648 4.862 3.58 4.518 3.58Z" fill="#74767C"/><path d="M6.5895 3.598C6.6455 3.65 6.7175 3.676 6.8055 3.676C6.8935 3.676 6.9655 3.65 7.0215 3.598C7.0815 3.542 7.1115 3.472 7.1115 3.388C7.1115 3.308 7.0815 3.242 7.0215 3.19C6.9655 3.138 6.8935 3.112 6.8055 3.112C6.7175 3.112 6.6455 3.138 6.5895 3.19C6.5335 3.242 6.5055 3.308 6.5055 3.388C6.5055 3.472 6.5335 3.542 6.5895 3.598Z" fill="#74767C"/><path d="M7.0395 7V4.162H6.5775V7H7.0395Z" fill="#74767C"/><path d="M9.91997 4.342V4.816C9.81997 4.716 9.69997 4.638 9.55997 4.582C9.42397 4.526 9.27597 4.498 9.11597 4.498C8.93197 4.498 8.76197 4.54 8.60597 4.624C8.44997 4.708 8.32597 4.83 8.23397 4.99C8.14197 5.15 8.09597 5.348 8.09597 5.584C8.09597 5.82 8.14197 6.018 8.23397 6.178C8.32597 6.334 8.44997 6.454 8.60597 6.538C8.76197 6.618 8.93197 6.658 9.11597 6.658C9.29597 6.658 9.45197 6.632 9.58397 6.58C9.71597 6.528 9.82797 6.462 9.91997 6.382V6.802C9.86397 6.854 9.76797 6.91 9.63197 6.97C9.49597 7.03 9.31597 7.06 9.09197 7.06C8.83197 7.06 8.58997 7.002 8.36597 6.886C8.14197 6.77 7.96397 6.602 7.83197 6.382C7.69997 6.162 7.63397 5.896 7.63397 5.584C7.63397 5.268 7.69997 5 7.83197 4.78C7.96397 4.56 8.14197 4.392 8.36597 4.276C8.58997 4.16 8.83197 4.102 9.09197 4.102C9.30397 4.102 9.47597 4.128 9.60797 4.18C9.74397 4.232 9.84797 4.286 9.91997 4.342Z" fill="#74767C"/><path d="M11.0119 2.998V5.42358L12.2179 4.162H12.7279L11.45 5.49879L12.7819 7H12.2419L11.0119 5.63086V7H10.5499V2.998H11.0119Z" fill="#74767C"/><path fillRule="evenodd" clipRule="evenodd" d="M8.37558 12.554C8.10758 12.554 7.86758 12.49 7.65558 12.362C7.44758 12.234 7.28358 12.058 7.16358 11.834C7.04358 11.61 6.98358 11.358 6.98358 11.078C6.98358 10.79 7.04358 10.536 7.16358 10.316C7.28358 10.092 7.44758 9.916 7.65558 9.788C7.86758 9.656 8.10758 9.59 8.37558 9.59C8.65158 9.59 8.89358 9.656 9.10158 9.788C9.31358 9.916 9.47958 10.092 9.59958 10.316C9.71958 10.536 9.77958 10.79 9.77958 11.078C9.77958 11.358 9.71958 11.61 9.59958 11.834C9.47958 12.058 9.31358 12.234 9.10158 12.362C8.89358 12.49 8.65158 12.554 8.37558 12.554ZM8.37558 12.17C8.57558 12.17 8.74558 12.122 8.88558 12.026C9.02558 11.93 9.13358 11.8 9.20958 11.636C9.28558 11.472 9.32358 11.286 9.32358 11.078C9.32358 10.866 9.28558 10.678 9.20958 10.514C9.13758 10.35 9.03158 10.22 8.89158 10.124C8.75158 10.028 8.57958 9.98 8.37558 9.98C8.17958 9.98 8.01158 10.028 7.87158 10.124C7.73158 10.22 7.62358 10.35 7.54758 10.514C7.47558 10.678 7.43958 10.866 7.43958 11.078C7.43958 11.286 7.47758 11.472 7.55358 11.636C7.62958 11.8 7.73758 11.93 7.87758 12.026C8.01758 12.122 8.18358 12.17 8.37558 12.17Z" fill="#74767C"/><path d="M6.54497 10.316V9.842C6.47297 9.786 6.36897 9.732 6.23297 9.68C6.10097 9.628 5.92897 9.602 5.71697 9.602C5.45697 9.602 5.21497 9.66 4.99097 9.776C4.76697 9.892 4.58897 10.06 4.45697 10.28C4.32497 10.5 4.25897 10.768 4.25897 11.084C4.25897 11.396 4.32497 11.662 4.45697 11.882C4.58897 12.102 4.76697 12.27 4.99097 12.386C5.21497 12.502 5.45697 12.56 5.71697 12.56C5.94097 12.56 6.12097 12.53 6.25697 12.47C6.39297 12.41 6.48897 12.354 6.54497 12.302V11.882C6.45297 11.962 6.34097 12.028 6.20897 12.08C6.07697 12.132 5.92097 12.158 5.74097 12.158C5.55697 12.158 5.38697 12.118 5.23097 12.038C5.07497 11.954 4.95097 11.834 4.85897 11.678C4.76697 11.518 4.72097 11.32 4.72097 11.084C4.72097 10.848 4.76697 10.65 4.85897 10.49C4.95097 10.33 5.07497 10.208 5.23097 10.124C5.38397 10.04 5.55697 9.998 5.74097 9.998C5.90097 9.998 6.04897 10.026 6.18497 10.082C6.32497 10.138 6.44497 10.216 6.54497 10.316Z" fill="#74767C"/><path d="M3.6645 9.662V12.5H3.2025V9.662H3.6645Z" fill="#74767C"/><path d="M3.4305 9.176C3.3425 9.176 3.2705 9.15 3.2145 9.098C3.1585 9.042 3.1305 8.972 3.1305 8.888C3.1305 8.808 3.1585 8.742 3.2145 8.69C3.2705 8.638 3.3425 8.612 3.4305 8.612C3.5185 8.612 3.5905 8.638 3.6465 8.69C3.7065 8.742 3.7365 8.808 3.7365 8.888C3.7365 8.972 3.7065 9.042 3.6465 9.098C3.5905 9.15 3.5185 9.176 3.4305 9.176Z" fill="#74767C"/><path d="M10.8421 10.3253C10.8515 10.2999 10.8615 10.2748 10.8721 10.25C10.9561 10.05 11.0821 9.89 11.2501 9.77C11.4181 9.65 11.6241 9.59 11.8681 9.59C12.1481 9.59 12.3741 9.678 12.5461 9.854C12.7221 10.03 12.8101 10.3 12.8101 10.664V12.5H12.3481V10.718C12.3481 10.45 12.2901 10.262 12.1741 10.154C12.0581 10.046 11.9001 9.992 11.7001 9.992C11.4561 9.992 11.2521 10.088 11.0881 10.28C10.9281 10.472 10.8481 10.748 10.8481 11.108V12.5H10.3801V9.662H10.8421V10.3253Z" fill="#74767C"/></svg>
                            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Report issues or leave feedback</span>
                          </div>
                        </div>
                        {/* See what's new */}
                        <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
                        <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M8.24807 2.29245C7.37049 3.27509 7.06444 4.62347 7.39918 5.86897L7.42663 5.96193L1.14651 12.2406C0.951168 12.4359 0.951162 12.7525 1.1465 12.9478L3.05236 14.853L3.1216 14.9109C3.31643 15.0458 3.58577 15.0265 3.75931 14.853L10.0415 8.57178L10.1362 8.59992C11.4494 8.94995 12.8756 8.58887 13.8668 7.59799C14.9416 6.5236 15.2769 4.93669 14.7638 3.53472L14.7262 3.45418C14.5664 3.1781 14.178 3.11624 13.9411 3.35272L12.4383 4.85199L11.3804 4.62001L11.1484 3.56307L12.653 2.06149C12.9112 1.80354 12.8149 1.36484 12.4725 1.23865C11.0683 0.721282 9.47664 1.05548 8.39962 2.13214L8.24807 2.29245ZM11.185 2.00015L11.2934 2.00516L10.2483 3.05045C10.1276 3.17107 10.0767 3.34494 10.1134 3.51161L10.4734 5.14728C10.5153 5.3376 10.6639 5.48624 10.8542 5.52811L12.4906 5.88814L12.5908 5.89977C12.7244 5.9017 12.8548 5.85 12.9513 5.75369L13.9933 4.712L13.9993 4.81804C14.0117 5.57707 13.7224 6.32849 13.1599 6.8908C12.3475 7.7029 11.1413 7.94447 10.0893 7.53408L10.0088 7.51023C9.84587 7.47651 9.6744 7.52604 9.55412 7.64628L3.40486 13.7925L2.20693 12.5935L8.35341 6.45049C8.49409 6.30987 8.53803 6.09923 8.46531 5.91409C8.05183 4.86148 8.29272 3.6529 9.10656 2.83933C9.67032 2.27576 10.4241 1.98655 11.185 2.00015Z" fill="#74767C"/></svg>
                            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>See what's new</span>
                          </div>
                          <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', whiteSpace: 'nowrap' }}>v 3.5.1</span>
                        </div>
                        {/* Supervisor sign in */}
                        <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
                        <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M7.99978 9.33337C8.36797 9.33337 8.66645 9.0349 8.66645 8.66671C8.66645 8.29852 8.36797 8.00004 7.99978 8.00004C7.63159 8.00004 7.33311 8.29852 7.33311 8.66671C7.33311 9.0349 7.63159 9.33337 7.99978 9.33337Z" fill="#74767C"/><path fillRule="evenodd" clipRule="evenodd" d="M10.9491 6.11336L7.99978 0.583374L5.05046 6.11336L1.23242 4.20434L2.00153 13.0491C2.01751 13.2626 2.13583 13.4646 2.3357 13.5788C2.3914 13.6107 2.44872 13.6417 2.50757 13.6721C3.43782 14.2578 5.54694 14.6667 7.99984 14.6667C10.4531 14.6667 12.5625 14.2577 13.4925 13.6718C13.5512 13.6415 13.6083 13.6106 13.6639 13.5788C13.8641 13.4644 13.9825 13.2619 13.9981 13.048L14.7671 4.20434L10.9491 6.11336ZM12.7524 11.9826L13.2324 6.46241L10.3838 7.88673L7.99978 3.41671L5.61577 7.88673L2.76714 6.46241L3.24716 11.9826C4.34436 11.5877 6.06516 11.3334 7.99984 11.3334C9.93445 11.3334 11.6552 11.5877 12.7524 11.9826ZM12.5767 12.6282C11.5003 13.0779 9.79433 13.3333 7.99979 13.3333C6.20527 13.3333 4.49935 13.0779 3.42292 12.6282C3.57349 12.5722 3.74434 12.517 3.93563 12.4639C4.94839 12.1826 6.38554 12 7.99984 12C9.61413 12 11.0513 12.1826 12.064 12.4639C12.2553 12.517 12.4262 12.5722 12.5767 12.6282Z" fill="#74767C"/></svg>
                            <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Supervisor sign in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
            {/* Default */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatarButton indicator="clock" clockState="active" aria-label="Default" onClick={() => {}}>
                <AvatarFallback>DE</AvatarFallback>
              </AXAvatarButton>
              <span style={LABEL}>Default</span>
            </div>

            {/* Focused — circle uses fill.activated.subtle.focused; focus ring shown */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatarButton
                indicator="clock" clockState="active"
                aria-label="Focused"
                onClick={() => {}}
                wrapperStyle={{ boxShadow: '0 0 0 3px var(--ld-semantic-color-border-focus, #0071CE)' }}
              >
                <AvatarFallback style={{ backgroundColor: 'var(--ld-semantic-color-fill-activated-subtle-focused)' }}>
                  FO
                </AvatarFallback>
              </AXAvatarButton>
              <span style={LABEL}>Focused</span>
            </div>

            {/* Pressed — circle uses fill.activated.subtle.pressed */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatarButton indicator="clock" clockState="active" aria-label="Pressed" onClick={() => {}}>
                <AvatarFallback style={{ backgroundColor: 'var(--ld-semantic-color-fill-activated-subtle-pressed)' }}>
                  PR
                </AvatarFallback>
              </AXAvatarButton>
              <span style={LABEL}>Pressed</span>
            </div>

            {/* Disabled */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <AXAvatarButton indicator="clock" clockState="active" disabled aria-label="Disabled">
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

      {/* ── Menu ── */}
      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={HEADING}>Menu</h3>
          <p style={{ margin: 0, fontSize: '13px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>
            Activating the AX Avatar Button opens an account menu. The menu is offset{' '}
            <code style={{ fontFamily: 'monospace', fontSize: '12px' }}>var(--ld-primitive-scale-space-100, 8px)</code>{' '}
            below the button.
          </p>
        </div>

        {/* Preview: interactive — click button to open/close menu */}
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end' }}>

          {/* Avatar Button — pressed while menu is open */}
          <AXAvatarButton size="medium" aria-label="Account" onClick={() => setMenuOpen(o => !o)}>
            <AvatarFallback style={menuOpen ? { backgroundColor: 'var(--ld-semantic-color-fill-activated-subtle-pressed)' } : undefined}>
              SC
            </AvatarFallback>
          </AXAvatarButton>

          {menuOpen && (
            <>
          {/* 8px spacer — var(--ld-primitive-scale-space-100, 8px) */}
          <div style={{ height: 'var(--ld-primitive-scale-space-100, 8px)' }} />

          {/* Account Menu */}
          <div style={{
            width: '280px',
            borderRadius: 'var(--ld-primitive-scale-border-radius-50, 4px)',
            background: 'var(--ld-semantic-color-fill-surface-primary, #FFF)',
            boxShadow: '0 -1px 4px 0 rgba(0,0,0,0.10), 0 5px 10px 3px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>

            {/* ── Header ── */}
            <div style={{
              display: 'flex',
              width: '100%',
              padding: 'var(--ld-primitive-scale-space-250, 1.25rem) var(--ld-primitive-scale-space-200, 1rem) var(--ld-primitive-scale-space-200, 1rem)',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                {/* Large avatar (48px) */}
                <div style={{
                  width: 'var(--ld-primitive-scale-space-600, 3rem)',
                  height: 'var(--ld-primitive-scale-space-600, 3rem)',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    color: 'var(--ld-semantic-color-text-on-fill-brand-subtle, #114AB6)',
                    fontFamily: 'var(--ld-semantic-font-family-sans)',
                    fontSize: 'var(--ld-semantic-font-heading-small-size, 1.125rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}>SC</span>
                </div>
                <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
                  Firstname Lastname
                </span>
                <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)', textDecoration: 'underline', cursor: 'pointer' }}>
                  Sign out
                </span>
              </div>
            </div>

            {/* ── Club Info ── */}
            <div style={{ height: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
            <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)', alignSelf: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 6.83055C3.02367 5.52738 3.56347 4.28685 4.5009 3.38129C5.43833 2.47573 6.69679 1.97914 8 2.00055C9.30321 1.97914 10.5617 2.47573 11.4991 3.38129C12.4365 4.28685 12.9763 5.52738 13 6.83055C12.8431 8.3715 12.1618 9.81182 11.07 10.9106C10.1454 11.9585 9.14254 12.9346 8.07001 13.8306L8 13.8906L7.92999 13.8306C6.85746 12.9346 5.85457 11.9585 4.92999 10.9106C3.83823 9.81182 3.15691 8.3715 3 6.83055ZM8 1.00055C6.43158 0.979175 4.9188 1.58112 3.79384 2.67421C2.66888 3.7673 2.0237 5.26217 2 6.83055C2 10.0106 5.5 13.0406 7.27 14.5806L7.56 14.8406C7.68395 14.9428 7.83932 14.9993 8 15.0006C8.16068 14.9993 8.31605 14.9428 8.44 14.8406L8.73 14.5806C10.5 13.0006 14 10.0006 14 6.83055C13.9763 5.26217 13.3311 3.7673 12.2062 2.67421C11.0812 1.58112 9.56842 0.979175 8 1.00055ZM6.5 7.00055C6.5 6.60273 6.65804 6.22119 6.93935 5.93989C7.22065 5.65859 7.60218 5.50055 8 5.50055V4.50055C7.33696 4.50055 6.70108 4.76394 6.23224 5.23278C5.7634 5.70162 5.5 6.33751 5.5 7.00055C5.5 7.66359 5.7634 8.29948 6.23224 8.76832C6.70108 9.23716 7.33696 9.50055 8 9.50055C8.66304 9.50055 9.29892 9.23716 9.76776 8.76832C10.2366 8.29948 10.5 7.66359 10.5 7.00055H9.5C9.5 7.39838 9.34196 7.77991 9.06065 8.06121C8.77935 8.34251 8.39782 8.50055 8 8.50055C7.60218 8.50055 7.22065 8.34251 6.93935 8.06121C6.65804 7.77991 6.5 7.39838 6.5 7.00055Z" fill="#74767C"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Club #0001</span>
                  <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Member Services</span>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)', textDecoration: 'underline', cursor: 'pointer', whiteSpace: 'nowrap' }}>Change</span>
            </div>

            {/* ── Report Issues ── */}
            <div style={{ height: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
            <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)', alignSelf: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M14 14V2H1V1H15V15H1V2H2V14H14Z" fill="#74767C"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.438 7V3.172H4.56C4.996 3.172 5.336 3.27 5.58 3.466C5.828 3.662 5.952 3.954 5.952 4.342C5.952 4.718 5.828 5.01 5.58 5.218C5.336 5.426 4.996 5.53 4.56 5.53H3.924V7H3.438ZM4.518 3.58H3.924V5.128H4.518C4.862 5.128 5.106 5.06 5.25 4.924C5.394 4.784 5.466 4.594 5.466 4.354C5.466 4.106 5.394 3.916 5.25 3.784C5.106 3.648 4.862 3.58 4.518 3.58Z" fill="#74767C"/>
                  <path d="M6.5895 3.598C6.6455 3.65 6.7175 3.676 6.8055 3.676C6.8935 3.676 6.9655 3.65 7.0215 3.598C7.0815 3.542 7.1115 3.472 7.1115 3.388C7.1115 3.308 7.0815 3.242 7.0215 3.19C6.9655 3.138 6.8935 3.112 6.8055 3.112C6.7175 3.112 6.6455 3.138 6.5895 3.19C6.5335 3.242 6.5055 3.308 6.5055 3.388C6.5055 3.472 6.5335 3.542 6.5895 3.598Z" fill="#74767C"/>
                  <path d="M7.0395 7V4.162H6.5775V7H7.0395Z" fill="#74767C"/>
                  <path d="M9.91997 4.342V4.816C9.81997 4.716 9.69997 4.638 9.55997 4.582C9.42397 4.526 9.27597 4.498 9.11597 4.498C8.93197 4.498 8.76197 4.54 8.60597 4.624C8.44997 4.708 8.32597 4.83 8.23397 4.99C8.14197 5.15 8.09597 5.348 8.09597 5.584C8.09597 5.82 8.14197 6.018 8.23397 6.178C8.32597 6.334 8.44997 6.454 8.60597 6.538C8.76197 6.618 8.93197 6.658 9.11597 6.658C9.29597 6.658 9.45197 6.632 9.58397 6.58C9.71597 6.528 9.82797 6.462 9.91997 6.382V6.802C9.86397 6.854 9.76797 6.91 9.63197 6.97C9.49597 7.03 9.31597 7.06 9.09197 7.06C8.83197 7.06 8.58997 7.002 8.36597 6.886C8.14197 6.77 7.96397 6.602 7.83197 6.382C7.69997 6.162 7.63397 5.896 7.63397 5.584C7.63397 5.268 7.69997 5 7.83197 4.78C7.96397 4.56 8.14197 4.392 8.36597 4.276C8.58997 4.16 8.83197 4.102 9.09197 4.102C9.30397 4.102 9.47597 4.128 9.60797 4.18C9.74397 4.232 9.84797 4.286 9.91997 4.342Z" fill="#74767C"/>
                  <path d="M11.0119 2.998V5.42358L12.2179 4.162H12.7279L11.45 5.49879L12.7819 7H12.2419L11.0119 5.63086V7H10.5499V2.998H11.0119Z" fill="#74767C"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.37558 12.554C8.10758 12.554 7.86758 12.49 7.65558 12.362C7.44758 12.234 7.28358 12.058 7.16358 11.834C7.04358 11.61 6.98358 11.358 6.98358 11.078C6.98358 10.79 7.04358 10.536 7.16358 10.316C7.28358 10.092 7.44758 9.916 7.65558 9.788C7.86758 9.656 8.10758 9.59 8.37558 9.59C8.65158 9.59 8.89358 9.656 9.10158 9.788C9.31358 9.916 9.47958 10.092 9.59958 10.316C9.71958 10.536 9.77958 10.79 9.77958 11.078C9.77958 11.358 9.71958 11.61 9.59958 11.834C9.47958 12.058 9.31358 12.234 9.10158 12.362C8.89358 12.49 8.65158 12.554 8.37558 12.554ZM8.37558 12.17C8.57558 12.17 8.74558 12.122 8.88558 12.026C9.02558 11.93 9.13358 11.8 9.20958 11.636C9.28558 11.472 9.32358 11.286 9.32358 11.078C9.32358 10.866 9.28558 10.678 9.20958 10.514C9.13758 10.35 9.03158 10.22 8.89158 10.124C8.75158 10.028 8.57958 9.98 8.37558 9.98C8.17958 9.98 8.01158 10.028 7.87158 10.124C7.73158 10.22 7.62358 10.35 7.54758 10.514C7.47558 10.678 7.43958 10.866 7.43958 11.078C7.43958 11.286 7.47758 11.472 7.55358 11.636C7.62958 11.8 7.73758 11.93 7.87758 12.026C8.01758 12.122 8.18358 12.17 8.37558 12.17Z" fill="#74767C"/>
                  <path d="M6.54497 10.316V9.842C6.47297 9.786 6.36897 9.732 6.23297 9.68C6.10097 9.628 5.92897 9.602 5.71697 9.602C5.45697 9.602 5.21497 9.66 4.99097 9.776C4.76697 9.892 4.58897 10.06 4.45697 10.28C4.32497 10.5 4.25897 10.768 4.25897 11.084C4.25897 11.396 4.32497 11.662 4.45697 11.882C4.58897 12.102 4.76697 12.27 4.99097 12.386C5.21497 12.502 5.45697 12.56 5.71697 12.56C5.94097 12.56 6.12097 12.53 6.25697 12.47C6.39297 12.41 6.48897 12.354 6.54497 12.302V11.882C6.45297 11.962 6.34097 12.028 6.20897 12.08C6.07697 12.132 5.92097 12.158 5.74097 12.158C5.55697 12.158 5.38697 12.118 5.23097 12.038C5.07497 11.954 4.95097 11.834 4.85897 11.678C4.76697 11.518 4.72097 11.32 4.72097 11.084C4.72097 10.848 4.76697 10.65 4.85897 10.49C4.95097 10.33 5.07497 10.208 5.23097 10.124C5.38697 10.04 5.55697 9.998 5.74097 9.998C5.90097 9.998 6.04897 10.026 6.18497 10.082C6.32497 10.138 6.44497 10.216 6.54497 10.316Z" fill="#74767C"/>
                  <path d="M3.6645 9.662V12.5H3.2025V9.662H3.6645Z" fill="#74767C"/>
                  <path d="M3.4305 9.176C3.3425 9.176 3.2705 9.15 3.2145 9.098C3.1585 9.042 3.1305 8.972 3.1305 8.888C3.1305 8.808 3.1585 8.742 3.2145 8.69C3.2705 8.638 3.3425 8.612 3.4305 8.612C3.5185 8.612 3.5905 8.638 3.6465 8.69C3.7065 8.742 3.7365 8.808 3.7365 8.888C3.7365 8.972 3.7065 9.042 3.6465 9.098C3.5905 9.15 3.5185 9.176 3.4305 9.176Z" fill="#74767C"/>
                  <path d="M10.8421 10.3253C10.8515 10.2999 10.8615 10.2748 10.8721 10.25C10.9561 10.05 11.0821 9.89 11.2501 9.77C11.4181 9.65 11.6241 9.59 11.8681 9.59C12.1481 9.59 12.3741 9.678 12.5461 9.854C12.7221 10.03 12.8101 10.3 12.8101 10.664V12.5H12.3481V10.718C12.3481 10.45 12.2901 10.262 12.1741 10.154C12.0581 10.046 11.9001 9.992 11.7001 9.992C11.4561 9.992 11.2521 10.088 11.0881 10.28C10.9281 10.472 10.8481 10.748 10.8481 11.108V12.5H10.3801V9.662H10.8421V10.3253Z" fill="#74767C"/>
                </svg>
                <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Report issues or leave feedback</span>
              </div>
            </div>

            {/* ── See What's New ── */}
            <div style={{ height: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
            <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)', alignSelf: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M8.24807 2.29245C7.37049 3.27509 7.06444 4.62347 7.39918 5.86897L7.42663 5.96193L1.14651 12.2406C0.951168 12.4359 0.951162 12.7525 1.1465 12.9478L3.05236 14.853L3.1216 14.9109C3.31643 15.0458 3.58577 15.0265 3.75931 14.853L10.0415 8.57178L10.1362 8.59992C11.4494 8.94995 12.8756 8.58887 13.8668 7.59799C14.9416 6.5236 15.2769 4.93669 14.7638 3.53472L14.7262 3.45418C14.5664 3.1781 14.178 3.11624 13.9411 3.35272L12.4383 4.85199L11.3804 4.62001L11.1484 3.56307L12.653 2.06149C12.9112 1.80354 12.8149 1.36484 12.4725 1.23865C11.0683 0.721282 9.47664 1.05548 8.39962 2.13214L8.24807 2.29245ZM11.185 2.00015L11.2934 2.00516L10.2483 3.05045C10.1276 3.17107 10.0767 3.34494 10.1134 3.51161L10.4734 5.14728C10.5153 5.3376 10.6639 5.48624 10.8542 5.52811L12.4906 5.88814L12.5908 5.89977C12.7244 5.9017 12.8548 5.85 12.9513 5.75369L13.9933 4.712L13.9993 4.81804C14.0117 5.57707 13.7224 6.32849 13.1599 6.8908C12.3475 7.7029 11.1413 7.94447 10.0893 7.53408L10.0088 7.51023C9.84587 7.47651 9.6744 7.52604 9.55412 7.64628L3.40486 13.7925L2.20693 12.5935L8.35341 6.45049C8.49409 6.30987 8.53803 6.09923 8.46531 5.91409C8.05183 4.86148 8.29272 3.6529 9.10656 2.83933C9.67032 2.27576 10.4241 1.98655 11.185 2.00015Z" fill="#74767C"/>
                </svg>
                <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>See what's new</span>
              </div>
              <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', whiteSpace: 'nowrap' }}>v 3.5.1</span>
            </div>

            {/* ── Supervisor Sign In ── */}
            <div style={{ height: '1px', alignSelf: 'stretch', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
            <div style={{ display: 'flex', padding: 'var(--ld-primitive-scale-space-200, 1rem)', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 0.5rem)', alignSelf: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', flex: 1 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M7.99978 9.33337C8.36797 9.33337 8.66645 9.0349 8.66645 8.66671C8.66645 8.29852 8.36797 8.00004 7.99978 8.00004C7.63159 8.00004 7.33311 8.29852 7.33311 8.66671C7.33311 9.0349 7.63159 9.33337 7.99978 9.33337Z" fill="#74767C"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9491 6.11336L7.99978 0.583374L5.05046 6.11336L1.23242 4.20434L2.00153 13.0491C2.01751 13.2626 2.13583 13.4646 2.3357 13.5788C2.3914 13.6107 2.44872 13.6417 2.50757 13.6721C3.43782 14.2578 5.54694 14.6667 7.99984 14.6667C10.4531 14.6667 12.5625 14.2577 13.4925 13.6718C13.5512 13.6415 13.6083 13.6106 13.6639 13.5788C13.8641 13.4644 13.9825 13.2619 13.9981 13.048L14.7671 4.20434L10.9491 6.11336ZM12.7524 11.9826L13.2324 6.46241L10.3838 7.88673L7.99978 3.41671L5.61577 7.88673L2.76714 6.46241L3.24716 11.9826C4.34436 11.5877 6.06516 11.3334 7.99984 11.3334C9.93445 11.3334 11.6552 11.5877 12.7524 11.9826ZM12.5767 12.6282C11.5003 13.0779 9.79433 13.3333 7.99979 13.3333C6.20527 13.3333 4.49935 13.0779 3.42292 12.6282C3.57349 12.5722 3.74434 12.517 3.93563 12.4639C4.94839 12.1826 6.38554 12 7.99984 12C9.61413 12 11.0513 12.1826 12.064 12.4639C12.2553 12.517 12.4262 12.5722 12.5767 12.6282Z" fill="#74767C"/>
                </svg>
                <span style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Supervisor sign in</span>
              </div>
            </div>

          </div>
            </>
          )}
        </div>
      </div>

      {/* ── Hit Targets ── */}
      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 4px', color: 'var(--ld-semantic-color-text)' }}>Hit Targets</h2>
          <p style={{ margin: 0, fontSize: '13px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>
            iOS and Android require a minimum 48×48px touch target. XSmall, Small, and Medium avatars use a transparent hit slot to meet this requirement. The dashed outline shows the hit area; the solid circle is the visual avatar.
          </p>
        </div>

        {(() => {
          const HIT_ITEMS = [
            { label: 'XSmall', size: 'xsmall', avatarPx: 24, hitPx: 48, avatarDim: AVATAR_DIM.xsmall },
            { label: 'Small',  size: 'small',  avatarPx: 32, hitPx: 48, avatarDim: AVATAR_DIM.small },
            { label: 'Medium', size: 'medium', avatarPx: 40, hitPx: 48, avatarDim: undefined },
            { label: 'Large',  size: 'large',  avatarPx: 48, hitPx: 48, avatarDim: AVATAR_DIM.large },
            { label: 'XLarge', size: 'xlarge', avatarPx: 64, hitPx: 64, avatarDim: AVATAR_DIM.xlarge },
          ] as const;
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Avatar row — all instances centered on the same horizontal line */}
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                {HIT_ITEMS.map(({ label, size, avatarPx, hitPx, avatarDim }) => {
                  const meetsMin = avatarPx >= 48;
                  return (
                    <div key={size} style={{ position: 'relative', width: `${hitPx}px`, height: `${hitPx}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {!meetsMin && (
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px dashed var(--ld-semantic-color-border-brand, #0071DC)', pointerEvents: 'none' }} />
                      )}
                      <AXAvatarButton indicator="badge" size={size} avatarStyle={avatarDim} aria-label={`${label} avatar`} onClick={() => {}}>
                        <AvatarFallback style={
                          size === 'xsmall' ? { fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)', fontWeight: 'var(--ld-semantic-font-caption-weight-default, 400)', fontFamily: 'var(--ld-semantic-font-caption-family)' }
                          : size === 'small'  ? { fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)' }
                          : size === 'xlarge' ? { fontSize: 'var(--ld-semantic-font-heading-large-size-b-s, 1.5rem)', fontWeight: 'var(--ld-semantic-font-heading-large-weight-alt, 400)', fontFamily: 'var(--ld-semantic-font-heading-large-family)', lineHeight: 'var(--ld-semantic-font-heading-large-line-height-b-s, 2rem)' }
                          : undefined
                        }>
                          {size === 'xsmall' ? 'XS' : size === 'small' ? 'SM' : size === 'medium' ? 'MD' : size === 'large' ? 'LG' : 'XL'}
                        </AvatarFallback>
                      </AXAvatarButton>
                    </div>
                  );
                })}
              </div>
              {/* Label row — all label groups top-aligned */}
              <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                {HIT_ITEMS.map(({ label, size, avatarPx, hitPx }) => {
                  const meetsMin = avatarPx >= 48;
                  return (
                    <div key={size} style={{ width: `${hitPx}px`, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>{label}</span>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Avatar: {avatarPx}px</span>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: meetsMin ? 'var(--ld-semantic-color-text-subtle)' : 'var(--ld-semantic-color-text-brand)' }}>
                        Hit: {hitPx}px{meetsMin ? '' : ' (expanded)'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Legend */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', borderTop: '1.5px dashed var(--ld-semantic-color-border-brand, #0071DC)' }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Transparent 48×48 hit slot · XSmall · Small · Medium</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', borderTop: '1.5px solid var(--ld-semantic-color-border-subtle)' }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)' }}>Avatar meets minimum · Large · XLarge</span>
          </div>
        </div>
      </div>

      {/* ── Anatomy ── */}
      <div style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>Anatomy</h2>

        {/* Avatar Button subsection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--ld-semantic-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avatar Button</h3>
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

        {/* Divider between subsections */}
        <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />

        {/* Menu subsection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--ld-semantic-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Menu</h3>
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
                  ['Menu surface', 'White card (280px wide) with drop shadow, appearing below the avatar button.', 'When avatar button is activated'],
                  ['Header', 'Contains a large (48px) avatar, the user\'s full name, and a "Sign out" link.', 'Always when menu is open'],
                  ['Avatar (header)', '48px avatar circle showing the user\'s initials or image inside the menu header.', 'Always when menu is open'],
                  ['Full name', 'User\'s first and last name displayed below the header avatar.', 'Always when menu is open'],
                  ['Sign out', 'Link button that signs the user out of the session.', 'Always when menu is open'],
                  ['Club info item', 'Shows the current club number (subtext) and "Member Services" label with a "Change" link.', 'Always when menu is open'],
                  ['Report issues item', 'Link to report issues or leave feedback, with a leading icon.', 'Always when menu is open'],
                  ['See what\'s new item', 'Shows release notes entry; displays version number (e.g. v 3.5.1) as trailing detail.', 'Always when menu is open'],
                  ['Supervisor sign in item', 'Allows a supervisor to sign in to the session, with a leading admin icon.', 'Always when menu is open'],
                  ['Item dividers', '1px separator lines between each menu item.', 'Always when menu is open'],
                ].map(([el, desc, vis]) => (
                  <tr key={el} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--ld-semantic-color-text)', whiteSpace: 'nowrap' }}>{el}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{vis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                ['size', "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'", "'medium'", 'Avatar size. XSmall/Small/Medium use a transparent 48×48px hit slot (iOS & Android a11y minimum). Large and XLarge already meet or exceed 48px.'],
                ['disabled', 'boolean', 'false', 'Disables the button interaction and applies disabled color tokens to the avatar circle and text.'],
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
