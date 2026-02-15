import React from 'react';
import { Separator } from '@/components/ui/separator';

export default function SeparatorExample() {
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
          Horizontal Separator
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ padding: '16px 0' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Radix Primitives</h4>
            <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
              An open-source UI component library.
            </p>
          </div>
          <Separator />
          <div style={{ padding: '16px 0' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>shadcn/ui</h4>
            <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
              Beautifully designed components built with Radix UI and Tailwind CSS.
            </p>
          </div>
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
          Vertical Separator
        </h3>
        <div style={{ display: 'flex', height: '100px', alignItems: 'center', gap: '16px' }}>
          <div>Item 1</div>
          <Separator orientation="vertical" />
          <div>Item 2</div>
          <Separator orientation="vertical" />
          <div>Item 3</div>
        </div>
      </section>
    </div>
  );
}
