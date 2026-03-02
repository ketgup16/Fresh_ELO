import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPFloatingButton } from '@/components/walmart/WCPFloatingButton';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Search,
  Star,
  X,
} from '@/components/icons';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ld-semantic-color-surface)',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--ld-semantic-color-text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '8px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={labelStyle}>{children}</div>;
}

export default function WCPFloatingButtonPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Floating Button"
      description="A circular elevated icon button used for carousel controls and floating action scenarios. Combines LD 3.5 secondary action tokens with a box-shadow to communicate elevation."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Sizes */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Sizes
          </h2>
          <div>
            <SectionLabel>XSmall (28px)</SectionLabel>
            <div style={rowStyle}>
              <WCPFloatingButton size="xsmall" aria-label="Previous">
                <ArrowLeft size={16} />
              </WCPFloatingButton>
              <WCPFloatingButton size="xsmall" aria-label="Next">
                <ArrowRight size={16} />
              </WCPFloatingButton>
            </div>
          </div>
          <div>
            <SectionLabel>Small (32px)</SectionLabel>
            <div style={rowStyle}>
              <WCPFloatingButton size="small" aria-label="Previous">
                <ArrowLeft size={16} />
              </WCPFloatingButton>
              <WCPFloatingButton size="small" aria-label="Next">
                <ArrowRight size={16} />
              </WCPFloatingButton>
            </div>
          </div>
          <div>
            <SectionLabel>Medium (40px) — default</SectionLabel>
            <div style={rowStyle}>
              <WCPFloatingButton size="medium" aria-label="Previous">
                <ArrowLeft />
              </WCPFloatingButton>
              <WCPFloatingButton size="medium" aria-label="Next">
                <ArrowRight />
              </WCPFloatingButton>
            </div>
          </div>
          <div>
            <SectionLabel>Large (52px)</SectionLabel>
            <div style={rowStyle}>
              <WCPFloatingButton size="large" aria-label="Previous">
                <ArrowLeft size={32} />
              </WCPFloatingButton>
              <WCPFloatingButton size="large" aria-label="Next">
                <ArrowRight size={32} />
              </WCPFloatingButton>
            </div>
          </div>
        </div>

        {/* States */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            States
          </h2>
          <div>
            <SectionLabel>Enabled (default)</SectionLabel>
            <div style={rowStyle}>
              <WCPFloatingButton aria-label="Search"><Search /></WCPFloatingButton>
            </div>
          </div>
          <div>
            <SectionLabel>Disabled</SectionLabel>
            <div style={rowStyle}>
              <WCPFloatingButton aria-label="Search" disabled><Search /></WCPFloatingButton>
              <WCPFloatingButton size="small" aria-label="Dismiss" disabled><X size={16} /></WCPFloatingButton>
              <WCPFloatingButton size="large" aria-label="Star" disabled><Star size={32} /></WCPFloatingButton>
            </div>
          </div>
          <div style={{ background: 'var(--ld-semantic-color-background-subtle)', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
              Hover and focus states are visible in the browser — hover over any button to see the elevated shadow change, and tab to a button to see the focus ring.
            </p>
          </div>
        </div>

        {/* Common use cases */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Common use cases
          </h2>

          {/* Carousel controls */}
          <div>
            <SectionLabel>Carousel prev / next controls</SectionLabel>
            <div style={{ position: 'relative', background: 'var(--ld-semantic-color-background-subtle)', borderRadius: '8px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)', fontSize: '13px' }}>
                Carousel content area
              </div>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <WCPFloatingButton size="medium" aria-label="Previous slide">
                  <ArrowLeft />
                </WCPFloatingButton>
              </div>
              <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <WCPFloatingButton size="medium" aria-label="Next slide">
                  <ArrowRight />
                </WCPFloatingButton>
              </div>
            </div>
          </div>

          {/* Scroll-to-top */}
          <div>
            <SectionLabel>Scroll controls / misc</SectionLabel>
            <div style={rowStyle}>
              <WCPFloatingButton aria-label="Scroll to top"><ChevronDown /></WCPFloatingButton>
              <WCPFloatingButton aria-label="Dismiss"><X /></WCPFloatingButton>
              <WCPFloatingButton aria-label="Search"><Search /></WCPFloatingButton>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Usage
          </h2>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            background: 'var(--ld-semantic-color-fill-subtle)',
            padding: '16px',
            borderRadius: '8px',
            overflowX: 'auto',
            margin: 0,
            color: 'var(--ld-semantic-color-text)',
          }}>{`import { WCPFloatingButton } from '@/components/walmart/WCPFloatingButton';
import { ArrowLeft, ArrowRight } from '@/components/icons';

// Carousel controls (most common)
<WCPFloatingButton size="medium" aria-label="Previous slide">
  <ArrowLeft />
</WCPFloatingButton>

<WCPFloatingButton size="medium" aria-label="Next slide">
  <ArrowRight />
</WCPFloatingButton>

// Sizes: 'xsmall' | 'small' | 'medium' (default) | 'large'
<WCPFloatingButton size="small" aria-label="Dismiss">
  <X size={16} />
</WCPFloatingButton>

// Disabled state
<WCPFloatingButton aria-label="Previous slide" disabled>
  <ArrowLeft />
</WCPFloatingButton>

// With click handler
<WCPFloatingButton
  aria-label="Next slide"
  onClick={() => carousel.next()}
>
  <ArrowRight />
</WCPFloatingButton>`}</pre>
        </div>

        {/* Do / Don't */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Do / Don't
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <SectionLabel style={{ color: 'var(--ld-semantic-color-text-positive)' }}>Do</SectionLabel>
              <ul style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', color: 'var(--ld-semantic-color-text)', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Always provide a descriptive <code>aria-label</code> for each button</li>
                <li>Use for carousel prev/next and floating action contexts</li>
                <li>Match icon size to button size (xsmall/small → 16px, medium → 24px, large → 32px)</li>
                <li>Ensure tap targets meet 44×44px minimum on touch devices (xsmall at 28px needs extra padding in context)</li>
              </ul>
            </div>
            <div>
              <SectionLabel style={{ color: 'var(--ld-semantic-color-text-negative)' }}>Don't</SectionLabel>
              <ul style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', color: 'var(--ld-semantic-color-text)', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Don't use for inline actions in text or forms — use IconButton instead</li>
                <li>Don't omit <code>aria-label</code> — icons alone are not accessible</li>
                <li>Don't place text inside the button — it is icon-only by design</li>
                <li>Don't override colors with UNSAFE_style hex values — use tokens only</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
