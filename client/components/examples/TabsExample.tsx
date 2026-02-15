import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabsExample() {
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
          Basic Tabs
        </h3>
        <Tabs defaultValue="account" style={{ maxWidth: '600px' }}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-moderate)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Account Settings</h4>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                Make changes to your account here. Click save when you're done.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-moderate)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Password Settings</h4>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                Change your password here. After saving, you'll be logged out.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Multiple Tabs
        </h3>
        <Tabs defaultValue="overview" style={{ maxWidth: '800px' }}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-moderate)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                Overview content goes here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-moderate)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                Analytics content goes here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reports">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-moderate)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                Reports content goes here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-moderate)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                Notifications content goes here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
