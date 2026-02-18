import React from 'react';

const BottomSheetExample = React.lazy(() => import('../../components/examples/BottomSheetExample'));

export default function BottomSheetPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          Bottom Sheet
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          A mobile-friendly modal component that slides up from the bottom of the screen
          to display supplementary content without leaving the current context.
          Replaces the previous Drawer component with Living Design 3.5 tokens.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BottomSheetExample />
        </React.Suspense>
      </div>
    </div>
  );
}
