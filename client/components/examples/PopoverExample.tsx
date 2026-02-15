import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PopoverExample() {
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
          Basic Popover
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="width">Width</Label>
                <Input id="width" defaultValue="100%" />
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input id="maxWidth" defaultValue="300px" />
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="height">Height</Label>
                <Input id="height" defaultValue="25px" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Simple Popover
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Show Info</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
              This is a simple popover with some information. You can put any content here.
            </p>
          </PopoverContent>
        </Popover>
      </section>
    </div>
  );
}
