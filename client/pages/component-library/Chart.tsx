import React from 'react';
import ChartExample from '@/components/examples/ChartExample';

export default function ChartPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', marginBottom: '12px' }}>
          Chart
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-secondary, #74767C)', maxWidth: '800px' }}>
          Data visualization charts built with Recharts and styled with LD 3.5 tokens.
        </p>
      </div>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ChartExample />
        </React.Suspense>
      </div>
    </div>
  );
}
