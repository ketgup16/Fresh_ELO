import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/Button';

export default function HoverCardExample() {
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
          Hover Card
        </h3>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="secondary">Hover over me</Button>
          </HoverCardTrigger>
          <HoverCardContent style={{ width: '320px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontWeight: '600', fontSize: '16px', color: 'var(--ld-semantic-color-text-primary)' }}>
                @nextjs
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                The React Framework – created and maintained by @vercel.
              </p>
              <div style={{ display: 'flex', gap: '16px', paddingTop: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                  <strong>100k+</strong> Stars
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                  <strong>20k+</strong> Forks
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </section>
    </div>
  );
}
