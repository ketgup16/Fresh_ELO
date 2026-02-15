import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DialogExample() {
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
          Basic Dialog
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div style={{ display: 'grid', gap: '16px', paddingTop: '16px', paddingBottom: '16px' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="primary">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Simple Dialog
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Show Message</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Important Message</DialogTitle>
              <DialogDescription>
                This is a simple dialog that displays important information to the user.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
