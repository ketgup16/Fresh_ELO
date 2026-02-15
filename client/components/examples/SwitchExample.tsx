import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SwitchExample() {
  const [isEnabled, setIsEnabled] = React.useState(false);

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
          Basic Switch
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch id="airplane-mode" checked={isEnabled} onCheckedChange={setIsEnabled} />
          <Label htmlFor="airplane-mode" style={{ cursor: 'pointer' }}>
            Airplane Mode
          </Label>
        </div>
        <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
          Status: {isEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Form Switches
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label htmlFor="marketing" style={{ cursor: 'pointer' }}>Marketing emails</Label>
            <Switch id="marketing" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label htmlFor="security" style={{ cursor: 'pointer' }}>Security emails</Label>
            <Switch id="security" defaultChecked />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label htmlFor="notifications" style={{ cursor: 'pointer' }}>Push notifications</Label>
            <Switch id="notifications" />
          </div>
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
          Disabled Switch
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch id="disabled" disabled />
          <Label htmlFor="disabled" style={{ opacity: 0.5 }}>
            Disabled option
          </Label>
        </div>
      </section>
    </div>
  );
}
