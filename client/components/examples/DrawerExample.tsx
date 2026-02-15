import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/Button';

export default function DrawerExample() {
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
          Bottom Drawer
        </h3>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="primary">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <div style={{ padding: '16px' }}>
              <p style={{ color: 'var(--ld-semantic-color-text-secondary)' }}>
                Drawer content goes here. This is a mobile-first drawer component.
              </p>
            </div>
            <DrawerFooter>
              <Button variant="primary">Submit</Button>
              <DrawerClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
    </div>
  );
}
