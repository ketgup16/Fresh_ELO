import React from 'react';

const BottomSheetExample = React.lazy(() => import('../../components/examples/BottomSheetExample'));

export default function BottomSheetPage() {
  return (
    <div>
      <div style={{
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--ld-semantic-color-border-subtle)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '8px'
        }}>
          Bottom Sheet
        </h1>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--ld-semantic-color-text)' }}>
          A mobile-friendly modal component that slides up from the bottom of the screen.
          Part of Living Design 3.5, it replaces the previous Drawer component with proper
          LD design tokens and responsive behavior.
        </p>
      </div>

      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BottomSheetExample />
        </React.Suspense>
      </div>
    </div>
  );
}
