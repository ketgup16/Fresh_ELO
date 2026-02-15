import { ModalExample } from '@/components/examples/ModalExample';

export default function ModalsPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          Modal
        </h1>
        <p style={{
          fontSize: '16px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-subtle, #46474C)',
          marginBottom: '16px'
        }}>
          Centered overlay dialogs with size variants for focused user interactions. Built with Radix UI Dialog primitives
          and Living Design 3.5 tokens.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{
            fontSize: '14px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
          }}>
            <span style={{ fontWeight: '700' }}>Use when:</span> You need to interrupt the user's workflow to capture information,
            confirm an action, or display critical information that requires immediate attention.
          </p>
          <p style={{
            fontSize: '14px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
          }}>
            <span style={{ fontWeight: '700' }}>Don't use when:</span> The content is non-critical or can be displayed inline.
            Consider using a Popover or Drawer for less disruptive interactions.
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          Features
        </h2>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Three size variants: Small (400px), Medium (600px), Large (800px)</li>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Custom width support for edge cases</li>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Built-in close button with keyboard support (Escape key)</li>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Focus trap to keep keyboard navigation within the modal</li>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Overlay/scrim with fade animations</li>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Fully accessible with ARIA attributes</li>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Responsive behavior on mobile devices</li>
          <li style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-primary, #2E2F32)' }}>Uses Living Design 3.5 semantic tokens exclusively</li>
        </ul>
      </div>

      {/* Component API */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          Component API
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Modal Root */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              marginBottom: '12px'
            }}>
              Modal (Root)
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
              borderTop: '1px solid #E3E4E5'
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '700' }}>Prop</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '700' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '700' }}>Default</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: '700' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>open</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>boolean</td>
                  <td style={{ padding: '8px 16px 8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>Controlled open state</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>onOpenChange</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>(open: boolean) =&gt; void</td>
                  <td style={{ padding: '8px 16px 8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>Callback when open state changes</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ModalContent */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              marginBottom: '12px'
            }}>
              ModalContent
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
              borderTop: '1px solid #E3E4E5'
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '700' }}>Prop</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '700' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '700' }}>Default</th>
                  <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: '700' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>size</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>'small' | 'medium' | 'large'</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>'medium'</td>
                  <td style={{ padding: '8px 0' }}>Size variant (400px, 600px, 800px)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>maxWidth</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>string</td>
                  <td style={{ padding: '8px 16px 8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>Custom max-width (overrides size)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>hideClose</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>boolean</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>false</td>
                  <td style={{ padding: '8px 0' }}>Hide the default close button</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>className</td>
                  <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace' }}>string</td>
                  <td style={{ padding: '8px 16px 8px 0' }}>-</td>
                  <td style={{ padding: '8px 0' }}>Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sub-components */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              marginBottom: '12px'
            }}>
              Sub-components
            </h3>
            <ul style={{
              listStyle: 'disc',
              paddingLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '14px'
            }}>
              <li><span style={{ fontFamily: 'monospace' }}>ModalTrigger</span> - Button that opens the modal</li>
              <li><span style={{ fontFamily: 'monospace' }}>ModalHeader</span> - Container for title and description</li>
              <li><span style={{ fontFamily: 'monospace' }}>ModalTitle</span> - Modal heading (required for accessibility)</li>
              <li><span style={{ fontFamily: 'monospace' }}>ModalDescription</span> - Optional descriptive text</li>
              <li><span style={{ fontFamily: 'monospace' }}>ModalFooter</span> - Container for action buttons</li>
              <li><span style={{ fontFamily: 'monospace' }}>ModalClose</span> - Programmatic close button</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Design Tokens */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          Design Tokens
        </h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
          borderTop: '1px solid #E3E4E5'
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', fontWeight: '700' }}>Token</th>
              <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: '700' }}>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>--ld-semantic-color-fill-surface-primary</td>
              <td style={{ padding: '8px 0' }}>Modal background</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>--ld-semantic-border-radius-medium</td>
              <td style={{ padding: '8px 0' }}>Modal border radius</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>--ld-semantic-font-heading-small-family</td>
              <td style={{ padding: '8px 0' }}>Title font</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>--ld-semantic-color-text</td>
              <td style={{ padding: '8px 0' }}>Text color</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>--ld-semantic-color-text-subtlest</td>
              <td style={{ padding: '8px 0' }}>Close button color</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>--ld-semantic-color-action-focus-outline</td>
              <td style={{ padding: '8px 0' }}>Focus indicator</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E3E4E5' }}>
              <td style={{ padding: '8px 16px 8px 0', fontFamily: 'monospace', fontSize: '12px' }}>--ld-primitive-scale-space-*</td>
              <td style={{ padding: '8px 0' }}>Spacing and padding</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Accessibility */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          Accessibility
        </h2>
        <ul style={{
          listStyle: 'disc',
          paddingLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '14px'
        }}>
          <li><span style={{ fontWeight: '700' }}>Keyboard Navigation:</span> Modal can be closed with the Escape key</li>
          <li><span style={{ fontWeight: '700' }}>Focus Management:</span> Focus is trapped within the modal when open</li>
          <li><span style={{ fontWeight: '700' }}>Screen Readers:</span> Uses proper ARIA attributes (role="dialog", aria-modal)</li>
          <li><span style={{ fontWeight: '700' }}>Close Button:</span> Includes visually hidden "Close" text for screen readers</li>
        </ul>
      </div>

      {/* Interactive Examples */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          Interactive Examples
        </h2>
        <ModalExample />
      </div>

      {/* Migration from Dialog */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          Migration from Dialog
        </h2>
        <p style={{
          fontSize: '14px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          The legacy <span style={{ fontFamily: 'monospace' }}>dialog.tsx</span> wrapper has been updated to export Modal components
          with Dialog aliases for backward compatibility. Existing code will continue to work without changes.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              marginBottom: '8px'
            }}>
              Old Import (Still works)
            </h3>
            <pre style={{
              backgroundColor: '#F8F8F8',
              padding: '16px',
              borderRadius: '4px',
              fontSize: '14px',
              overflowX: 'auto',
              fontFamily: 'monospace'
            }}>
              <code>{`import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';`}</code>
            </pre>
          </div>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              marginBottom: '8px'
            }}>
              New Import (Recommended)
            </h3>
            <pre style={{
              backgroundColor: '#F8F8F8',
              padding: '16px',
              borderRadius: '4px',
              fontSize: '14px',
              overflowX: 'auto',
              fontFamily: 'monospace'
            }}>
              <code>{`import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
