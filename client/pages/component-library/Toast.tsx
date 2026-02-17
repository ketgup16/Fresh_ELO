import React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export default function ToastPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-primary, #2E2F32)', marginBottom: '12px' }}>
          Toast
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-secondary, #74767C)', maxWidth: '800px' }}>
          Brief, non-intrusive notifications that appear temporarily to provide feedback on actions.
        </p>
      </div>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)', marginBottom: '12px' }}>Toast Types</h3>
            <ButtonGroup>
              <Button variant="secondary" size="small" onClick={() => toast('Default toast notification')}>
                Default
              </Button>
              <Button variant="secondary" size="small" onClick={() => toast.success('Operation completed successfully')}>
                Success
              </Button>
              <Button variant="secondary" size="small" onClick={() => toast.error('Something went wrong')}>
                Error
              </Button>
              <Button variant="secondary" size="small" onClick={() => toast.info('Here is some information')}>
                Info
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)', marginBottom: '12px' }}>With Description</h3>
            <ButtonGroup>
              <Button variant="secondary" size="small" onClick={() => toast('Event created', { description: 'Monday, January 3rd at 6:00 PM' })}>
                With Description
              </Button>
              <Button variant="secondary" size="small" onClick={() => toast.success('Campaign saved', { description: 'Your changes have been saved successfully.' })}>
                Success + Description
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)', marginBottom: '12px' }}>With Action</h3>
            <Button variant="secondary" size="small" onClick={() => toast('Item deleted', { action: { label: 'Undo', onClick: () => toast.success('Undo successful') } })}>
              With Undo Action
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
