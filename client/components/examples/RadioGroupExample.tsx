import React from 'react';
import { RadioGroup, Radio } from '@/components/ui/radio-group';

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
          <Radio value="default" label="Default" />
          <Radio value="comfortable" label="Comfortable" />
          <Radio value="compact" label="Compact" />
        </RadioGroup>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
          Selected: {value}
        </p>
      </section>
    </div>
  );
}
