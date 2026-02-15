import React from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/use-toast';

export default function ToastExample() {
  const { toast } = useToast();

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
          Toast Notifications
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            onClick={() => {
              toast({
                title: 'Success!',
                description: 'Your changes have been saved.',
              });
            }}
          >
            Show Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              toast({
                title: 'Scheduled: Catch up',
                description: 'Friday, February 10, 2023 at 5:57 PM',
              });
            }}
          >
            Show Scheduled
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
              });
            }}
          >
            Show Error
          </Button>
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          With Action Button
        </h3>
        <Button
          variant="secondary"
          onClick={() => {
            toast({
              title: 'Undo action',
              description: 'Your file has been deleted.',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            });
          }}
        >
          Show with Action
        </Button>
      </section>
    </div>
  );
}
