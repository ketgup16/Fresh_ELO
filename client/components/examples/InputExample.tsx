import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InputExample() {
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
          Text Input
        </h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
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
          Password Input
        </h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" />
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
          Disabled Input
        </h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="disabled">Disabled</Label>
          <Input id="disabled" placeholder="Disabled input" disabled />
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
          Different Input Types
        </h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="number">Number</Label>
            <Input id="number" type="number" placeholder="Enter a number" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="tel">Phone</Label>
            <Input id="tel" type="tel" placeholder="Enter your phone" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="url">URL</Label>
            <Input id="url" type="url" placeholder="https://example.com" />
          </div>
        </div>
      </section>
    </div>
  );
}
