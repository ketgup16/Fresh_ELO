import React from 'react';

export default function GuidelinesPage() {
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
          Guidelines
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          Design principles, best practices, and usage guidelines for Living Design 3.5 components.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)'
      }}>
        <p style={{
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          textAlign: 'center',
          padding: '64px 32px'
        }}>
          Guidelines documentation coming soon...
        </p>
      </div>
    </div>
  );
}
