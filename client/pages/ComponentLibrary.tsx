import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { IconButton } from '@/components/ui/IconButton';
import { Tag } from '@/components/ui/tag';
import { OLQTag } from '@/components/ui/olq-tag';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/components/ui/Link';
import { Alert } from '@/components/ui/Alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Heading } from '@/components/ui/Heading';
import { BadgeExample } from '@/components/BadgeExample';
import { ButtonExample } from '@/components/ButtonExample';
import { BreadcrumbExample } from '@/components/BreadcrumbExample';
import { IconButtonExample } from '@/components/IconButtonExample';
import { LinkExample } from '@/components/LinkExample';
import { CardHeaderExample } from '@/components/CardHeaderExample';

/**
 * Component Library Page
 * Complete showcase of all components in the project
 */
export default function ComponentLibrary() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '24px 32px',
        }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 700, 
            color: '#2E2F32',
            marginBottom: '6px'
          }}>
            Component Library
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: '#74767c'
          }}>
            Living Design 3.5 components and application-specific components
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '32px',
      }}>
        
        {/* SECTION 1: LD 3.5 Core Components */}
        <SectionHeader 
          title="LD 3.5 Core Components" 
          description="Reusable design system components from client/components/ui/"
        />

        {/* Buttons */}
        <ComponentCard title="Button" path="client/components/ui/Button.tsx">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label>Variants</Label>
              <ButtonGroup>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="destructive">Destructive</Button>
              </ButtonGroup>
            </div>
            <div>
              <Label>Sizes</Label>
              <ButtonGroup>
                <Button variant="primary" size="small">Small</Button>
                <Button variant="primary" size="medium">Medium</Button>
                <Button variant="primary" size="large">Large</Button>
              </ButtonGroup>
            </div>
          </div>
        </ComponentCard>

        {/* ButtonGroup */}
        <ComponentCard title="ButtonGroup" path="client/components/ui/ButtonGroup.tsx">
          <ButtonGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary">Publish</Button>
          </ButtonGroup>
        </ComponentCard>

        {/* IconButton */}
        <ComponentCard title="IconButton" path="client/components/ui/IconButton.tsx">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <IconButton variant="primary" aria-label="Add">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
            </IconButton>
            <IconButton variant="secondary" aria-label="Settings">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </IconButton>
            <IconButton variant="tertiary" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </IconButton>
          </div>
        </ComponentCard>

        {/* Tag */}
        <ComponentCard title="Tag" path="client/components/ui/tag.tsx">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Tag variant="default">Default</Tag>
            <Tag variant="primary">Primary</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="destructive">Destructive</Tag>
            <Tag variant="info">Info</Tag>
          </div>
        </ComponentCard>

        {/* OLQTag */}
        <ComponentCard title="OLQTag" path="client/components/ui/olq-tag.tsx">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <OLQTag value="95" />
            <OLQTag value="82" />
            <OLQTag value="65" />
            <OLQTag value="52" />
            <OLQTag value="35" />
          </div>
        </ComponentCard>

        {/* Badge */}
        <ComponentCard title="Badge" path="client/components/ui/Badge.tsx">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Badge variant="info" value={5} />
            <Badge variant="success" value={12} />
            <Badge variant="warning" value={3} />
            <Badge variant="error" value={99} />
            <Badge variant="neutral" value={2} />
          </div>
        </ComponentCard>

        {/* Link */}
        <ComponentCard title="Link" path="client/components/ui/Link.tsx">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/" variant="default">Default Link (underlined)</Link>
            <Link href="/" variant="subtle">Subtle Link</Link>
            <Link href="/" underline={false}>Link without underline</Link>
          </div>
        </ComponentCard>

        {/* Alert */}
        <ComponentCard title="Alert" path="client/components/ui/Alert.tsx">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Alert variant="info">
              <strong>Info:</strong> Informational alert message
            </Alert>
            <Alert variant="success">
              <strong>Success:</strong> Operation completed successfully
            </Alert>
            <Alert variant="warning">
              <strong>Warning:</strong> Please review before proceeding
            </Alert>
            <Alert variant="error">
              <strong>Error:</strong> Something went wrong
            </Alert>
          </div>
        </ComponentCard>

        {/* Breadcrumb */}
        <ComponentCard title="Breadcrumb" path="client/components/ui/Breadcrumb.tsx">
          <Breadcrumb aria-label="Navigation">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/products">Products</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Details</BreadcrumbItem>
          </Breadcrumb>
        </ComponentCard>

        {/* Card */}
        <ComponentCard title="Card, CardHeader, CardContent" path="client/components/ui/Card.tsx">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <Card>
              <CardHeader title="Card Title" />
              <CardContent>
                <p style={{ fontSize: '14px', color: '#2E2F32' }}>
                  Card content goes here
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader 
                title="With Action" 
                trailing={<Button variant="tertiary" size="small">Action</Button>}
              />
              <CardContent>
                <p style={{ fontSize: '14px', color: '#2E2F32' }}>
                  Card with trailing action
                </p>
              </CardContent>
            </Card>
          </div>
        </ComponentCard>

        {/* Form Controls */}
        <ComponentCard title="Form Controls" path="client/components/ui/">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <Input placeholder="Text input..." />
            <Textarea placeholder="Textarea..." rows={3} />
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox id="c1" />
                <label htmlFor="c1" style={{ fontSize: '14px' }}>Checkbox</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Switch id="s1" />
                <label htmlFor="s1" style={{ fontSize: '14px' }}>Switch</label>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Heading */}
        <ComponentCard title="Heading" path="client/components/ui/Heading.tsx">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Heading as="h1" size="large">Heading H1 (Large)</Heading>
            <Heading as="h3" size="medium">Heading H3 (Medium)</Heading>
            <Heading as="h5" size="small">Heading H5 (Small)</Heading>
          </div>
        </ComponentCard>

        {/* SECTION 2: Application Components */}
        <SectionHeader 
          title="Application Components" 
          description="Component examples and custom implementations from client/components/"
        />

        {/* BadgeExample */}
        <ComponentCard title="BadgeExample" path="client/components/BadgeExample.tsx">
          <BadgeExample />
        </ComponentCard>

        {/* ButtonExample */}
        <ComponentCard title="ButtonExample" path="client/components/ButtonExample.tsx">
          <ButtonExample />
        </ComponentCard>

        {/* BreadcrumbExample */}
        <ComponentCard title="BreadcrumbExample" path="client/components/BreadcrumbExample.tsx">
          <BreadcrumbExample />
        </ComponentCard>

        {/* IconButtonExample */}
        <ComponentCard title="IconButtonExample" path="client/components/IconButtonExample.tsx">
          <IconButtonExample />
        </ComponentCard>

        {/* LinkExample */}
        <ComponentCard title="LinkExample" path="client/components/LinkExample.tsx">
          <LinkExample />
        </ComponentCard>

        {/* CardHeaderExample */}
        <ComponentCard title="CardHeaderExample" path="client/components/CardHeaderExample.tsx">
          <CardHeaderExample />
        </ComponentCard>

      </div>
    </div>
  );
}

// Helper Components
function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: '24px', marginTop: '32px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 700, 
        color: '#2E2F32',
        marginBottom: '4px' 
      }}>
        {title}
      </h2>
      <p style={{ fontSize: '14px', color: '#74767c' }}>{description}</p>
    </div>
  );
}

function ComponentCard({ title, path, children }: { 
  title: string; 
  path: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      marginBottom: '16px',
    }}>
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#fafafa',
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#2E2F32',
          margin: '0 0 4px 0',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '12px',
          color: '#74767c',
          margin: 0,
          fontFamily: 'monospace'
        }}>
          {path}
        </p>
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '12px',
      fontWeight: 600,
      color: '#74767c',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '8px',
    }}>
      {children}
    </p>
  );
}
