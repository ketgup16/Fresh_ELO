import React from 'react';
import TooltipExample from '@/components/examples/TooltipExample';

export default function TooltipPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: 'var(--ld-primitive-color-purple-10)',
        borderLeft: '4px solid var(--ld-primitive-color-purple-100)',
        borderRadius: '4px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: 'var(--ld-primitive-color-purple-100)' }}>
          ⚠️ Component Replaced
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--ld-semantic-color-text)' }}>
          The SHADCN/Radix Tooltip component has been replaced with <strong>Callout</strong> from Living Design 3.5.
          The example below demonstrates the new Callout component. Note: Callout is click-based rather than hover-based.
        </p>
      </div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', marginBottom: '12px' }}>
          Callout (LD 3.5)
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-secondary, #74767C)', maxWidth: '800px' }}>
          Callouts display contextual onboarding or coaching content relative to a target element. Click-based interaction for better mobile support.
        </p>
      </div>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TooltipExample />
        </React.Suspense>
      </div>
    </div>
  );
}
