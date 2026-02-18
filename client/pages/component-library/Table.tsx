import React from 'react';
import DataTableExample from '@/components/examples/DataTableExample';

export default function TablePage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', marginBottom: '12px' }}>
          Data Table
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-secondary, #74767C)', maxWidth: '800px' }}>
          Living Design 3.5 Data Table with sortable headers, row selection, bulk actions, status tags, inline editing, and action buttons. Uses LD semantic tokens exclusively.
        </p>
      </div>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <DataTableExample />
        </React.Suspense>
      </div>
    </div>
  );
}
