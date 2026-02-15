import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SheetExample() {
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
          Sheet from Right (Default)
        </h3>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div style={{ display: 'grid', gap: '16px', paddingTop: '24px', paddingBottom: '24px' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="primary">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Sheet from Left
        </h3>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Open from Left</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Quick access to your navigation items.
              </SheetDescription>
            </SheetHeader>
            <div style={{ paddingTop: '24px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                Navigation items would go here.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </div>
  );
}
