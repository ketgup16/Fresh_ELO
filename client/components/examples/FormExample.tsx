import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FormExample() {
  const [formData, setFormData] = React.useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

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
          Basic Form
        </h3>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <Button type="submit" variant="primary">Submit</Button>
        </form>
      </section>
    </div>
  );
}
