import * as React from 'react';
import { Button } from './ui/Button';
import { ButtonGroup } from './ui/ButtonGroup';

/**
 * Example component demonstrating Button usage with Living Design 3.5
 */
export const ButtonExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button Variants
        </h2>
        <ButtonGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button Sizes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="medium">Medium</Button>
            <Button variant="primary" size="large">Large</Button>
          </ButtonGroup>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Buttons with Icons
        </h2>
        <ButtonGroup>
          <Button
            variant="primary"
            leading={
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Add Item
          </Button>
          <Button
            variant="secondary"
            trailing={
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            }
          >
            Next
          </Button>
          <Button
            variant="tertiary"
            leading={
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            }
          >
            Download
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Disabled State
        </h2>
        <ButtonGroup>
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="tertiary" disabled>Tertiary Disabled</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Full Width Buttons
        </h2>
        <div style={{ maxWidth: '400px' }}>
          <Button variant="primary" size="large" isFullWidth>
            Full Width Primary
          </Button>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button as Link
        </h2>
        <ButtonGroup>
          <Button href="https://www.walmart.com" variant="primary" target="_blank">
            Visit Walmart
          </Button>
          <Button href="#section" variant="secondary">
            Jump to Section
          </Button>
          <Button href="/help" variant="tertiary">
            Get Help
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Form Actions
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ maxWidth: '400px' }}
        >
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
          </div>
          <ButtonGroup>
            <Button variant="tertiary" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </ButtonGroup>
        </form>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Destructive Actions
        </h2>
        <ButtonGroup>
          <Button variant="secondary">Keep Item</Button>
          <Button
            variant="destructive"
            leading={
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Delete Permanently
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Icon-Only Button
        </h2>
        <ButtonGroup>
          <Button
            variant="tertiary"
            aria-label="Close"
            leading={
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            }
          />
          <Button
            variant="secondary"
            aria-label="Settings"
            leading={
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            }
          />
        </ButtonGroup>
      </section>
    </div>
  );
};
