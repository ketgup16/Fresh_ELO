import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/Checkbox';

export default function LabelExample() {
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
          Label with Input
        </h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" placeholder="Enter your name" />
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
          Label with Checkbox
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox id="terms" />
          <Label htmlFor="terms" style={{ cursor: 'pointer' }}>
            Accept terms and conditions
          </Label>
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
          Required Field Label
        </h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="email">
            Email <span style={{ color: 'var(--ld-semantic-color-action-fill-destructive)' }}>*</span>
          </Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </div>
      </section>
    </div>
  );
}
