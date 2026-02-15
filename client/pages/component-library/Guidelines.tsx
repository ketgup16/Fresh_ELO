import React from 'react';
import { Button } from '@/components/ui/Button';
import * as Icons from '@/components/icons';

export default function GuidelinesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '48px' }}>
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

      {/* Design Principles */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          Design Principles
        </h2>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Icons.Check size={20} />
            Accessibility First
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '16px'
          }}>
            All components must meet WCAG 2.1 AA standards. This includes proper color contrast, keyboard navigation, 
            screen reader support, and ARIA attributes.
          </p>
          <ul style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            paddingLeft: '24px'
          }}>
            <li>Color contrast ratio of at least 4.5:1 for text</li>
            <li>All interactive elements must be keyboard accessible</li>
            <li>Proper focus indicators (2px outline with focus color)</li>
            <li>Meaningful labels and ARIA attributes</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Icons.Palette size={20} />
            Consistent Design Tokens
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '16px'
          }}>
            Always use Living Design 3.5 semantic tokens instead of hard-coded values. This ensures consistency 
            and makes theme switching possible.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                marginBottom: '8px'
              }}>
                ✅ Do
              </div>
              <div style={{
                backgroundColor: 'var(--ld-semantic-color-fill-success-subtle, #E6F7E6)',
                padding: '12px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '13px'
              }}>
                color: var(--ld-semantic-color-text-primary)
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                marginBottom: '8px'
              }}>
                ❌ Don't
              </div>
              <div style={{
                backgroundColor: 'var(--ld-semantic-color-fill-error-subtle, #FFE6E6)',
                padding: '12px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '13px'
              }}>
                color: #2E2F32
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Icons.Target size={20} />
            Component Reusability
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)'
          }}>
            Always use existing components from the library. Never create custom implementations for common UI patterns.
            Check the component library first before building anything new.
          </p>
        </div>
      </section>

      {/* Component Usage Guidelines */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          Component Usage Guidelines
        </h2>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px'
          }}>
            Button Variants
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '16px',
            fontSize: '14px'
          }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Primary</div>
              <Button variant="primary" size="small">Primary</Button>
            </div>
            <div style={{ color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              Use for the main action on a page. Only one primary button per section.
            </div>

            <div>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Secondary</div>
              <Button variant="secondary" size="small">Secondary</Button>
            </div>
            <div style={{ color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              Use for secondary actions. Can have multiple per section.
            </div>

            <div>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Tertiary</div>
              <Button variant="tertiary" size="small">Tertiary</Button>
            </div>
            <div style={{ color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              Use for low-priority actions or when you need subtle buttons.
            </div>

            <div>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Destructive</div>
              <Button variant="destructive" size="small">Delete</Button>
            </div>
            <div style={{ color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
              Use for destructive actions like delete or remove. Always confirm destructive actions.
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px'
          }}>
            When to Use Each Component
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <div style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
            }}>
              <strong>Alerts</strong>: Page-level or section-level messages (info, success, warning, error)
            </div>
            <div style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
            }}>
              <strong>Badges</strong>: Count indicators, status labels, or notification dots
            </div>
            <div style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
            }}>
              <strong>Chips</strong>: Selectable categories or filters (single or multi-select)
            </div>
            <div style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
            }}>
              <strong>Filter Chips</strong>: Toggleable filters with optional counts
            </div>
            <div style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
            }}>
              <strong>Callouts</strong>: Contextual coaching tips or onboarding guidance
            </div>
            <div style={{
              padding: '12px 0'
            }}>
              <strong>Content Messages</strong>: Full-page states (empty, error, no permission, loading)
            </div>
          </div>
        </div>
      </section>

      {/* Code Standards */}
      <section>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          Code Standards
        </h2>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px'
          }}>
            Import Conventions
          </h3>
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary, #F7F7F8)',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            {`// ✅ Correct - Import from uppercase path\nimport { Button } from '@/components/ui/Button';\n\n// ✅ Correct - Multiple imports\nimport { Button } from '@/components/ui/Button';\nimport { Badge } from '@/components/ui/Badge';\nimport { Tag } from '@/components/ui/tag';`}
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px'
          }}>
            Component Props
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '16px'
          }}>
            Use TypeScript prop types and avoid overriding component styles with className or inline styles.
          </p>
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary, #F7F7F8)',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            {`// ✅ Correct - Use component props\n<Button variant="primary" size="medium">\n  Click me\n</Button>\n\n// ❌ Wrong - Don't override with inline styles\n<Button style={{ backgroundColor: '#0071DC' }}>\n  Click me\n</Button>`}
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px'
          }}>
            Token Usage Requirements
          </h3>
          <ul style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            paddingLeft: '24px'
          }}>
            <li>Always use semantic tokens (--ld-semantic-*) over primitive tokens</li>
            <li>Never hard-code colors, spacing, or font sizes</li>
            <li>Use CSS custom properties: var(--token-name)</li>
            <li>Provide fallback values for critical properties</li>
            <li>Test in both light and dark modes (when applicable)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
