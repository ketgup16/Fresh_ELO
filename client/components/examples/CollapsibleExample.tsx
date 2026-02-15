import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/Button';

export default function CollapsibleExample() {
  const [isOpen, setIsOpen] = React.useState(false);

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
          Basic Collapsible
        </h3>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} style={{ maxWidth: '600px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '16px',
            border: '1px solid var(--ld-semantic-color-border-moderate)',
            borderRadius: '8px',
            marginBottom: '8px'
          }}>
            <h4 style={{ fontWeight: '600', color: 'var(--ld-semantic-color-text-primary)' }}>
              @peduarte starred 3 repositories
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="secondary" size="small">
                {isOpen ? 'Hide' : 'Show'}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div style={{ 
              padding: '16px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
              borderRadius: '8px',
              marginBottom: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
            }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                @radix-ui/primitives
              </p>
            </div>
            <div style={{ 
              padding: '16px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
              borderRadius: '8px',
              marginBottom: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
            }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                @radix-ui/colors
              </p>
            </div>
            <div style={{ 
              padding: '16px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
              borderRadius: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
            }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                @stitches/react
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>
    </div>
  );
}
