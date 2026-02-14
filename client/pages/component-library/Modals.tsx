import { ModalExample } from '@/components/examples/ModalExample';

export default function ModalsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Modal</h1>
        <p className="text-lg text-gray-600 mb-4">
          Centered overlay dialogs with size variants for focused user interactions. Built with Radix UI Dialog primitives
          and Living Design 3.5 tokens.
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <p>
            <span className="font-bold">Use when:</span> You need to interrupt the user's workflow to capture information,
            confirm an action, or display critical information that requires immediate attention.
          </p>
          <p>
            <span className="font-bold">Don't use when:</span> The content is non-critical or can be displayed inline.
            Consider using a Popover or Drawer for less disruptive interactions.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Three size variants: Small (400px), Medium (600px), Large (800px)</li>
          <li>Custom width support for edge cases</li>
          <li>Built-in close button with keyboard support (Escape key)</li>
          <li>Focus trap to keep keyboard navigation within the modal</li>
          <li>Overlay/scrim with fade animations</li>
          <li>Fully accessible with ARIA attributes</li>
          <li>Responsive behavior on mobile devices</li>
          <li>Uses Living Design 3.5 semantic tokens exclusively</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Component API</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Modal (Root)</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Prop</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Default</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">open</td>
                  <td className="py-2 pr-4 font-mono">boolean</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Controlled open state</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">onOpenChange</td>
                  <td className="py-2 pr-4 font-mono">(open: boolean) =&gt; void</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Callback when open state changes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-bold mb-2">ModalContent</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Prop</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Default</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">size</td>
                  <td className="py-2 pr-4 font-mono">'small' | 'medium' | 'large'</td>
                  <td className="py-2 pr-4 font-mono">'medium'</td>
                  <td className="py-2">Size variant (400px, 600px, 800px)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">maxWidth</td>
                  <td className="py-2 pr-4 font-mono">string</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Custom max-width (overrides size)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">hideClose</td>
                  <td className="py-2 pr-4 font-mono">boolean</td>
                  <td className="py-2 pr-4 font-mono">false</td>
                  <td className="py-2">Hide the default close button</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">className</td>
                  <td className="py-2 pr-4 font-mono">string</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-bold mb-2">Sub-components</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><span className="font-mono">ModalTrigger</span> - Button that opens the modal</li>
              <li><span className="font-mono">ModalHeader</span> - Container for title and description</li>
              <li><span className="font-mono">ModalTitle</span> - Modal heading (required for accessibility)</li>
              <li><span className="font-mono">ModalDescription</span> - Optional descriptive text</li>
              <li><span className="font-mono">ModalFooter</span> - Container for action buttons</li>
              <li><span className="font-mono">ModalClose</span> - Programmatic close button</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Design Tokens</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">Token</th>
              <th className="text-left py-2">Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4 font-mono text-xs">--ld-semantic-color-fill-surface-primary</td>
              <td className="py-2">Modal background</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-mono text-xs">--ld-semantic-border-radius-medium</td>
              <td className="py-2">Modal border radius</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-mono text-xs">--ld-semantic-font-heading-small-family</td>
              <td className="py-2">Title font</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-mono text-xs">--ld-semantic-color-text</td>
              <td className="py-2">Text color</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-mono text-xs">--ld-semantic-color-text-subtlest</td>
              <td className="py-2">Close button color</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-mono text-xs">--ld-semantic-color-action-focus-outline</td>
              <td className="py-2">Focus indicator</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-mono text-xs">--ld-primitive-scale-space-*</td>
              <td className="py-2">Spacing and padding</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li><span className="font-bold">Keyboard Navigation:</span> Modal can be closed with the Escape key</li>
          <li><span className="font-bold">Focus Management:</span> Focus is trapped within the modal when open</li>
          <li><span className="font-bold">Screen Readers:</span> Uses proper ARIA attributes (role="dialog", aria-modal)</li>
          <li><span className="font-bold">Close Button:</span> Includes visually hidden "Close" text for screen readers</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Interactive Examples</h2>
        <ModalExample />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Migration from Dialog</h2>
        <p className="text-sm mb-4">
          The legacy <span className="font-mono">dialog.tsx</span> wrapper has been updated to export Modal components
          with Dialog aliases for backward compatibility. Existing code will continue to work without changes.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Old Import (Still works)</h3>
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
              <code>{`import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';`}</code>
            </pre>
          </div>
          <div>
            <h3 className="font-bold mb-2">New Import (Recommended)</h3>
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
              <code>{`import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
