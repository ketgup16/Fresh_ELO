import React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import * as Icons from '@/components/icons';

export default function GuidelinesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '12px'
        }}>
          Guidelines
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtlest)',
          maxWidth: '800px'
        }}>
          Design principles, best practices, and usage guidelines for Living Design 3.5 components.
        </p>
      </div>

      <Tabs defaultValue="principles">
        <TabList>
          <Tab value="principles">Design Principles</Tab>
          <Tab value="components">Component Usage</Tab>
          <Tab value="accessibility">Accessibility</Tab>
          <Tab value="code">Code Standards</Tab>
          <Tab value="tokens">Token Usage</Tab>
        </TabList>

        {/* Design Principles Tab */}
        <TabPanel value="principles">
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
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icons.Check style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
                </div>
                Accessibility First
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                All components must meet WCAG 2.1 AA standards for accessibility compliance.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Color Contrast
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    Minimum 4.5:1 ratio for text, 3:1 for UI components
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Keyboard Navigation
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    All interactive elements accessible via Tab, Enter, Space, Arrows
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Screen Readers
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    Proper ARIA labels, roles, and semantic HTML structure
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                    Focus Indicators
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    2px visible outline using focus ring tokens
                  </div>
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
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icons.Grid style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
                </div>
                Consistency & Reusability
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '20px'
              }}>
                Always use existing components from the library. Check the component library before building anything new.
              </p>
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
                borderRadius: '6px',
                borderLeft: '4px solid var(--ld-semantic-color-border-info)'
              }}>
                <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                  Rule: Reuse &gt; Adapt &gt; Create
                </div>
                <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                  1. First, search for an existing component that matches your need<br />
                  2. If close match, adapt existing component with props<br />
                  3. Only create new components when truly unique functionality is needed
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
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icons.Gear style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
                </div>
                Responsive Design
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)'
              }}>
                Components should work across all device sizes. Use responsive tokens and breakpoints,
                not hard-coded pixel values.
              </p>
            </div>
          </div>
        </TabPanel>

        {/* Component Usage Tab */}
        <TabPanel value="components">
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
                Button Hierarchy
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="primary" size="medium">Primary</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Main action</strong> - Only one per section/page. Most important action user should take.
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="secondary" size="medium">Secondary</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Supporting actions</strong> - Can have multiple. Use for cancel, back, or alternative actions.
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="tertiary" size="medium">Tertiary</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Low priority</strong> - Subtle actions, less emphasis. Use sparingly.
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-negative-subtle)',
                  borderRadius: '6px'
                }}>
                  <Button variant="destructive" size="medium">Delete</Button>
                  <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                    <strong>Destructive actions</strong> - Delete, remove, cancel operations. Always confirm first.
                  </div>
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
                When to Use Each Component
              </h3>
              <div style={{
                display: 'grid',
                gap: '12px',
                fontSize: '14px'
              }}>
                {[
                  { name: 'Alerts', usage: 'Page-level or section-level messages for info, success, warning, error states' },
                  { name: 'Badges', usage: 'Count indicators, status labels, notification dots on buttons or icons' },
                  { name: 'Breadcrumbs', usage: 'Navigation trail showing current page hierarchy (2-5 levels)' },
                  { name: 'Callouts', usage: 'Contextual coaching tips, onboarding guidance, or feature highlights' },
                  { name: 'Cards', usage: 'Grouping related content with headers, actions, and content areas' },
                  { name: 'Chips', usage: 'Selectable categories or filters (single or multi-select)' },
                  { name: 'Content Messages', usage: 'Full-page states: empty, error, no permission, loading' },
                  { name: 'Date Fields', usage: 'Text input for dates with mm/dd/yyyy validation' },
                  { name: 'Modals', usage: 'Focused interactions requiring user attention or confirmation' },
                  { name: 'Nudges', usage: 'Non-critical supportive information with optional actions' },
                  { name: 'Text Fields', usage: 'Single-line text input for names, emails, search, etc.' },
                  { name: 'Text Area', usage: 'Multi-line text input for descriptions, comments, notes' },
                ].map((item) => (
                  <div
                    key={item.name}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                      borderRadius: '6px',
                      display: 'grid',
                      gridTemplateColumns: '180px 1fr',
                      gap: '16px',
                      alignItems: 'center'
                    }}
                  >
                    <strong style={{ color: 'var(--ld-semantic-color-text)' }}>{item.name}</strong>
                    <span style={{ color: 'var(--ld-semantic-color-text-subtle)', lineHeight: '1.6' }}>
                      {item.usage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Accessibility Tab */}
        <TabPanel value="accessibility">
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
                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    1. Color Contrast
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Text: 4.5:1 contrast ratio minimum</li>
                    <li>Large text (18px+): 3:1 contrast ratio minimum</li>
                    <li>UI components: 3:1 contrast ratio</li>
                    <li>Interactive elements: Must be distinguishable from non-interactive</li>
                  </ul>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    2. Keyboard Navigation
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Tab: Move forward through interactive elements</li>
                    <li>Shift+Tab: Move backward</li>
                    <li>Enter/Space: Activate buttons, checkboxes, links</li>
                    <li>Arrow keys: Navigate within grouped elements (tabs, radio groups, menus)</li>
                    <li>Escape: Close modals, dropdowns, popovers</li>
                  </ul>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    3. ARIA Attributes
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Use semantic HTML first (button, nav, header, main, etc.)</li>
                    <li>Add ARIA labels for context: aria-label, aria-labelledby</li>
                    <li>Indicate states: aria-disabled, aria-selected, aria-expanded</li>
                    <li>Associate related content: aria-describedby, aria-controls</li>
                    <li>Use appropriate roles: role="dialog", role="navigation", etc.</li>
                  </ul>
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                    4. Focus Management
                  </div>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    paddingLeft: '20px'
                  }}>
                    <li>Always show visible focus indicators (never outline: none without replacement)</li>
                    <li>Use LD 3.5 focus ring tokens for consistency</li>
                    <li>Trap focus within modals and dialogs</li>
                    <li>Return focus to trigger element when closing overlays</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Code Standards Tab */}
        <TabPanel value="code">
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
                Import Conventions
              </h3>
              <div style={{
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                padding: '20px',
                borderRadius: '6px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                lineHeight: '1.8',
                marginBottom: '16px'
              }}>
                <div style={{ color: 'var(--ld-semantic-color-text-positive)', marginBottom: '4px' }}>
                  // ✅ CORRECT - Import from uppercase path
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  import &#123; Button &#125; from '@/components/ui/Button';
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  import &#123; TextField &#125; from '@/components/ui/TextField';
                </div>
                <br />
                <div style={{ color: 'var(--ld-semantic-color-text-negative)', marginBottom: '4px' }}>
                  // ❌ WRONG - Deprecated lowercase imports
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  import &#123; Button &#125; from '@/components/ui/button';
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  import &#123; Input &#125; from '@/components/ui/input';
                </div>
              </div>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ld-semantic-color-text-subtle)',
                padding: '16px',
                backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
                borderRadius: '6px',
                borderLeft: '4px solid var(--ld-semantic-color-border-info)'
              }}>
                <strong>Note:</strong> Living Design 3.5 components use uppercase filenames (Button.tsx, TextField.tsx).
                Shadcn/radix components use lowercase (popover.tsx, dialog.tsx).
              </p>
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
                Component Props Best Practices
              </h3>
              <div style={{
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                padding: '20px',
                borderRadius: '6px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                lineHeight: '1.8',
                marginBottom: '16px'
              }}>
                <div style={{ color: 'var(--ld-semantic-color-text-positive)', marginBottom: '4px' }}>
                  // ✅ CORRECT - Use semantic props
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &lt;Button variant="primary" size="medium"&gt;
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;Click me
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &lt;/Button&gt;
                </div>
                <br />
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &lt;TextField
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;label="Email"
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;error=&#123;emailError&#125;
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  &nbsp;&nbsp;helperText="We'll never share your email"
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text)' }}>
                  /&gt;
                </div>
                <br />
                <div style={{ color: 'var(--ld-semantic-color-text-negative)', marginBottom: '4px' }}>
                  // ❌ WRONG - Don't override with inline styles
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  &lt;Button style=&#123;&#123; backgroundColor: '#0071DC' &#125;&#125;&gt;
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  &nbsp;&nbsp;Click me
                </div>
                <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
                  &lt;/Button&gt;
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
                Layout Patterns
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Forms</strong><br />
                  Use 16px gap between form fields per LD 3.5 spec. Stack fields vertically with consistent spacing.
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Button Groups</strong><br />
                  Always use ButtonGroup component for multiple buttons. Ensures proper spacing and alignment.
                </div>
                <div>
                  <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Cards</strong><br />
                  Use elevation (box-shadow), not borders. Default to elevation-100 for standard cards.
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Token Usage Tab */}
        <TabPanel value="tokens">
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
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Colors</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-color-text<br />
                    --ld-semantic-color-fill-*<br />
                    --ld-semantic-color-border-*<br />
                    --ld-semantic-color-action-*
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Spacing</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-spacing-100<br />
                    --ld-semantic-spacing-200<br />
                    --ld-semantic-spacing-300<br />
                    --ld-primitive-scale-space-*
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Typography</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-font-family-sans<br />
                    --ld-semantic-font-body-*-size<br />
                    --ld-semantic-font-heading-*
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>Elevation</div>
                  <div style={{
                    fontFamily: 'var(--ld-semantic-font-family-mono)',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--ld-semantic-color-text-subtle)'
                  }}>
                    --ld-semantic-elevation-100<br />
                    --ld-semantic-elevation-200<br />
                    --ld-semantic-elevation-300
                  </div>
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
        </TabPanel>
      </Tabs>
    </div>
  );
}
