import React from 'react';

export default function InputPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', marginBottom: '12px' }}>
          Input
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-secondary, #74767C)', maxWidth: '800px' }}>
          Basic text input field. For full-featured inputs with labels, helper text, and validation, see the Text Fields component.
        </p>
      </div>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)', marginBottom: '8px' }}>Default</label>
            <input type="text" placeholder="Enter text..." style={{ width: '100%', padding: '10px 12px', fontSize: '16px', fontFamily: 'var(--ld-semantic-font-family-sans)', border: '1px solid var(--ld-semantic-color-border, #BABBBE)', borderRadius: '8px', backgroundColor: 'var(--ld-semantic-color-surface, #fff)', color: 'var(--ld-semantic-color-text, #2E2F32)', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)', marginBottom: '8px' }}>Disabled</label>
            <input type="text" placeholder="Disabled..." disabled style={{ width: '100%', padding: '10px 12px', fontSize: '16px', fontFamily: 'var(--ld-semantic-font-family-sans)', border: '1px solid var(--ld-semantic-color-border, #BABBBE)', borderRadius: '8px', backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)', color: 'var(--ld-semantic-color-text-subtle, #74767C)', outline: 'none', boxSizing: 'border-box', opacity: 0.5, cursor: 'not-allowed' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
