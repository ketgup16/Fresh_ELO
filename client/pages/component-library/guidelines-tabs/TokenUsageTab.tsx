import React from 'react';

export function TokenUsageTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Design Token Hierarchy
        </h3>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '24px'
        }}>
          Living Design 3.5 uses a two-tier token system: <strong>Primitive</strong> tokens (base values)
          and <strong>Semantic</strong> tokens (context-specific values).
        </p>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px'
          }}>
            <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px', color: 'var(--ld-semantic-color-text-brand)' }}>
              Semantic Tokens (USE THESE)
            </div>
            <div style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: 'var(--ld-semantic-color-text-subtle)'
            }}>
              --ld-semantic-color-text<br />
              --ld-semantic-color-action-fill-primary<br />
              --ld-semantic-spacing-200<br />
              --ld-semantic-border-radius-medium
            </div>
            <p style={{
              fontSize: '14px',
              marginTop: '12px',
              color: 'var(--ld-semantic-color-text-subtle)',
              lineHeight: '1.6'
            }}>
              Context-aware tokens that adapt to themes. Always prefer these.
            </p>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            opacity: 0.7
          }}>
            <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px', color: 'var(--ld-semantic-color-text-subtlest)' }}>
              Primitive Tokens (Avoid)
            </div>
            <div style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: 'var(--ld-semantic-color-text-subtlest)'
            }}>
              --ld-primitive-color-blue-100<br />
              --ld-primitive-scale-space-200<br />
              --ld-primitive-font-size-100
            </div>
            <p style={{
              fontSize: '14px',
              marginTop: '12px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              lineHeight: '1.6'
            }}>
              Base values without context. Only use when semantic tokens don't exist.
            </p>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Common Token Categories
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          fontSize: '14px'
        }}>
          {[
            { title: 'Colors', tokens: '--ld-semantic-color-text\n--ld-semantic-color-fill-*\n--ld-semantic-color-border-*\n--ld-semantic-color-action-*' },
            { title: 'Spacing', tokens: '--ld-semantic-spacing-100\n--ld-semantic-spacing-200\n--ld-semantic-spacing-300\n--ld-primitive-scale-space-*' },
            { title: 'Typography', tokens: '--ld-semantic-font-family-sans\n--ld-semantic-font-body-*-size\n--ld-semantic-font-heading-*' },
            { title: 'Elevation', tokens: '--ld-semantic-elevation-100\n--ld-semantic-elevation-200\n--ld-semantic-elevation-300' },
          ].map((cat) => (
            <div key={cat.title} style={{
              padding: '16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '8px' }}>{cat.title}</div>
              <div style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '12px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                whiteSpace: 'pre-line'
              }}>
                {cat.tokens}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          TypeScript Usage
        </h3>
        <ul style={{
          fontSize: '14px',
          lineHeight: '1.8',
          color: 'var(--ld-semantic-color-text-subtle)',
          paddingLeft: '24px'
        }}>
          <li>Always export TypeScript types for component props</li>
          <li>Use React.forwardRef for components that need ref access</li>
          <li>Provide prop type unions for variants (e.g., size: 'small' | 'medium' | 'large')</li>
          <li>Document props with JSDoc comments</li>
          <li>Use discriminated unions for complex state management</li>
        </ul>
      </div>
    </div>
  );
}
