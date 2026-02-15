import React from 'react';

export default function ChartExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Chart Component
        </h3>
        <p style={{ color: 'var(--ld-semantic-color-text-secondary)', marginBottom: '24px' }}>
          The Chart component is powered by Recharts and provides various chart types.
        </p>
        <div style={{
          padding: '48px',
          border: '1px solid var(--ld-semantic-color-border-moderate)',
          borderRadius: '8px',
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--ld-semantic-color-text-secondary)' }}>
            Chart examples would go here. Install recharts to use this component.
          </p>
        </div>
      </section>
    </div>
  );
}
