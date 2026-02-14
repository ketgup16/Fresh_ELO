import React from 'react';
import { ListExample } from '@/components/examples/ListExample';

export default function ListsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          Lists
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          Vertical lists with leading icons, spot icons, and trailing content.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)'
      }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ListExample />
        </React.Suspense>
      </div>
    </div>
  );
}
