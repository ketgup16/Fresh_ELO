import React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/tag';
import { OLQTag } from '@/components/ui/olq-tag';
import { Link } from '@/components/ui/Link';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@/components/ui/popover';
import { Badge } from '@/components/ui/Badge';
import { Settings, Download, Upload, Search, Plus, Edit, Trash2 } from 'lucide-react';

export default function ComponentLibrary() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--ld-semantic-color-surface-primary, #FFFFFF)',
      padding: '40px 60px'
    }}>
      {/* Page Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans, "Everyday Sans UI", sans-serif)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          Living Design 3.5 Component Library
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          fontFamily: 'var(--ld-semantic-font-family-sans, "Everyday Sans UI", sans-serif)'
        }}>
          A comprehensive showcase of all UI components in the Walmart Connect Ad Center
        </p>
      </div>

      {/* Breadcrumb Section */}
      <Section title="Breadcrumb">
        <ComponentCard>
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/campaigns">Campaigns</BreadcrumbItem>
            <BreadcrumbItem>Component Library</BreadcrumbItem>
          </Breadcrumb>
        </ComponentCard>
      </Section>

      {/* Buttons Section */}
      <Section title="Buttons">
        <ComponentCard label="Button Variants">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" size="medium">Primary</Button>
            <Button variant="secondary" size="medium">Secondary</Button>
            <Button variant="tertiary" size="medium">Tertiary</Button>
            <Button variant="destructive" size="medium">Destructive</Button>
          </div>
        </ComponentCard>

        <ComponentCard label="Button Sizes">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="medium">Medium</Button>
            <Button variant="primary" size="large">Large</Button>
          </div>
        </ComponentCard>

        <ComponentCard label="Buttons with Icons">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="medium" icon={<Plus size={16} />}>
              Create Campaign
            </Button>
            <Button variant="secondary" size="medium" icon={<Download size={16} />}>
              Download
            </Button>
            <Button variant="secondary" size="medium" icon={<Upload size={16} />}>
              Upload
            </Button>
            <Button variant="tertiary" size="medium" icon={<Settings size={16} />}>
              Settings
            </Button>
          </div>
        </ComponentCard>

        <ComponentCard label="Button Group">
          <ButtonGroup>
            <Button variant="secondary" size="medium">Cancel</Button>
            <Button variant="primary" size="medium">Save Changes</Button>
          </ButtonGroup>
        </ComponentCard>

        <ComponentCard label="Disabled State">
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="primary" size="medium" disabled>Disabled Primary</Button>
            <Button variant="secondary" size="medium" disabled>Disabled Secondary</Button>
          </div>
        </ComponentCard>
      </Section>

      {/* Tags & Badges Section */}
      <Section title="Tags & Badges">
        <ComponentCard label="Tag Variants">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag variant="default">Default</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="error">Error</Tag>
            <Tag variant="info">Info</Tag>
          </div>
        </ComponentCard>

        <ComponentCard label="OLQ Tags">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <OLQTag percentage={95} />
            <OLQTag percentage={75} />
            <OLQTag percentage={50} />
            <OLQTag percentage={25} />
          </div>
        </ComponentCard>

        <ComponentCard label="Badges">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge>New</Badge>
            <Badge variant="secondary">Beta</Badge>
            <Badge variant="destructive">Urgent</Badge>
            <Badge variant="outline">Featured</Badge>
          </div>
        </ComponentCard>
      </Section>

      {/* Links Section */}
      <Section title="Links">
        <ComponentCard label="Link Variants">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/campaigns">Standard Link</Link>
            <Link href="/campaigns" icon={<Search size={16} />}>Link with Icon</Link>
            <Link href="/campaigns" external>External Link</Link>
          </div>
        </ComponentCard>
      </Section>

      {/* Form Elements Section */}
      <Section title="Form Elements">
        <ComponentCard label="Inputs">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <Input placeholder="Enter campaign name" />
            <Input placeholder="Search..." icon={<Search size={16} />} />
            <Input placeholder="Disabled input" disabled />
          </div>
        </ComponentCard>

        <ComponentCard label="Checkboxes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="check1" />
              <label htmlFor="check1" style={{ fontSize: '14px', cursor: 'pointer' }}>
                Enable notifications
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="check2" defaultChecked />
              <label htmlFor="check2" style={{ fontSize: '14px', cursor: 'pointer' }}>
                Auto-save changes
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="check3" disabled />
              <label htmlFor="check3" style={{ fontSize: '14px', color: '#999', cursor: 'not-allowed' }}>
                Disabled option
              </label>
            </div>
          </div>
        </ComponentCard>
      </Section>

      {/* Cards Section */}
      <Section title="Cards">
        <ComponentCard label="Basic Card">
          <Card style={{ maxWidth: '400px' }}>
            <CardHeader>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Campaign Performance</h3>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, color: 'var(--ld-semantic-color-text-secondary)' }}>
                Your campaign has generated 1,234,567 impressions with a 2.5% click-through rate.
              </p>
            </CardContent>
          </Card>
        </ComponentCard>

        <ComponentCard label="Card with Actions">
          <Card style={{ maxWidth: '400px' }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Campaign Settings</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button variant="tertiary" size="small" icon={<Edit size={14} />} />
                  <Button variant="tertiary" size="small" icon={<Trash2 size={14} />} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>Status:</span>{' '}
                  <Tag variant="success">Active</Tag>
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Budget:</span> $10,000
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Duration:</span> Jan 1 - Dec 31, 2025
                </div>
              </div>
            </CardContent>
          </Card>
        </ComponentCard>
      </Section>

      {/* Popovers Section */}
      <Section title="Popovers">
        <ComponentCard label="Basic Popover">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="medium">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow className="fill-white" />
              <div style={{ padding: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                  Additional Information
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-secondary)', margin: 0 }}>
                  This is a popover with additional context and information about the selected item.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </ComponentCard>
      </Section>

      {/* Color Tokens Section */}
      <Section title="Design Tokens">
        <ComponentCard label="Action Colors">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-primary)" 
              label="Action Primary" 
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-secondary)" 
              label="Action Secondary" 
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-destructive)" 
              label="Action Destructive" 
            />
          </div>
        </ComponentCard>

        <ComponentCard label="Text Colors">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-text-primary)" 
              label="Text Primary" 
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-text-secondary)" 
              label="Text Secondary" 
            />
          </div>
        </ComponentCard>
      </Section>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text-primary)',
        marginBottom: '24px',
        paddingBottom: '12px',
        borderBottom: '2px solid var(--ld-semantic-color-border-strong, #E6E6E8)'
      }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {children}
      </div>
    </div>
  );
}

function ComponentCard({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid var(--ld-semantic-color-border-subtle, #E6E6E8)',
      borderRadius: '8px',
      padding: '24px'
    }}>
      {label && (
        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--ld-semantic-color-text-secondary)',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{
        width: '100%',
        height: '80px',
        backgroundColor: color,
        borderRadius: '8px',
        border: '1px solid #E6E6E8'
      }} />
      <div style={{ fontSize: '13px', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: '11px', color: '#74767C', fontFamily: 'monospace' }}>{color}</div>
    </div>
  );
}
