import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function TextareaExample() {
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
          Basic Textarea
        </h3>
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="message">Your message</Label>
          <Textarea id="message" placeholder="Type your message here." />
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
          Textarea with Character Count
        </h3>
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" rows={5} />
          <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-secondary)', textAlign: 'right' }}>
            0 / 500
          </p>
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
          Disabled Textarea
        </h3>
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Label htmlFor="disabled">Disabled</Label>
          <Textarea id="disabled" placeholder="This is disabled" disabled />
        </div>
      </section>
    </div>
  );
}
