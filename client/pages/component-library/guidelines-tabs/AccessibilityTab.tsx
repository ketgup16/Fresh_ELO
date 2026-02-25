import React from 'react';

const sections = [
  {
    title: '1. Color Contrast',
    items: [
      'Text: 4.5:1 contrast ratio minimum',
      'Large text (18px+): 3:1 contrast ratio minimum',
      'UI components: 3:1 contrast ratio',
      'Interactive elements: Must be distinguishable from non-interactive',
    ],
  },
  {
    title: '2. Keyboard Navigation',
    items: [
      'Tab: Move forward through interactive elements',
      'Shift+Tab: Move backward',
      'Enter/Space: Activate buttons, checkboxes, links',
      'Arrow keys: Navigate within grouped elements (tabs, radio groups, menus)',
      'Escape: Close modals, dropdowns, popovers',
    ],
  },
  {
    title: '3. ARIA Attributes',
    items: [
      'Use semantic HTML first (button, nav, header, main, etc.)',
      'Add ARIA labels for context: aria-label, aria-labelledby',
      'Indicate states: aria-disabled, aria-selected, aria-expanded',
      'Associate related content: aria-describedby, aria-controls',
      'Use appropriate roles: role="dialog", role="navigation", etc.',
    ],
  },
  {
    title: '4. Focus Management',
    items: [
      'Always show visible focus indicators (never outline: none without replacement)',
      'Use LD 3.5 focus ring tokens for consistency',
      'Trap focus within modals and dialogs',
      'Return focus to trigger element when closing overlays',
    ],
  },
];

export function AccessibilityTab() {
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
          WCAG 2.1 AA Requirements
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sections.map((section) => (
            <div key={section.title} style={{
              padding: '20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                {section.title}
              </div>
              <ul style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: 'var(--ld-semantic-color-text-subtle)',
                paddingLeft: '20px'
              }}>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
