import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function RadioGroupExample() {
  const [value, setValue] = React.useState('comfortable');

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
          Basic Radio Group
        </h3>
        <RadioGroup value={value} onValueChange={setValue}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1" style={{ cursor: 'pointer' }}>Default</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2" style={{ cursor: 'pointer' }}>Comfortable</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3" style={{ cursor: 'pointer' }}>Compact</Label>
          </div>
        </RadioGroup>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
          Selected: {value}
        </p>
      </section>
    </div>
  );
}
