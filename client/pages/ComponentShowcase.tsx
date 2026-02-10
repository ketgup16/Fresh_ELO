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

/**
 * Component Showcase Page
 * Single page displaying all available components from the project
 */
export default function ComponentShowcase() {
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
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '32px',
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            color: '#2E2F32',
            marginBottom: '8px'
          }}>
            Living Design 3.5 Components
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#74767c'
          }}>
            Complete component library reference
          </p>
        </div>
      </div>

      {/* All Components - Single Page */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '32px',
      }}>
        
        {/* Buttons */}
        <ComponentSection title="Button" description="Primary interactive elements">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <SectionLabel>Variants</SectionLabel>
              <ButtonGroup>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="destructive">Destructive</Button>
              </ButtonGroup>
            </div>
            
            <div>
              <SectionLabel>Sizes</SectionLabel>
              <ButtonGroup>
                <Button variant="primary" size="small">Small</Button>
                <Button variant="primary" size="medium">Medium</Button>
                <Button variant="primary" size="large">Large</Button>
              </ButtonGroup>
            </div>

            <div>
              <SectionLabel>With Icons</SectionLabel>
              <ButtonGroup>
                <Button 
                  variant="primary"
                  leading={<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>}
                >
                  Add Item
                </Button>
                <Button 
                  variant="secondary"
                  trailing={<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" /></svg>}
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </ComponentSection>

        {/* ButtonGroup */}
        <ComponentSection title="ButtonGroup" description="Groups buttons together with consistent spacing">
          <ButtonGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary">Save Draft</Button>
            <Button variant="primary">Publish</Button>
          </ButtonGroup>
        </ComponentSection>

        {/* IconButton */}
        <ComponentSection title="IconButton" description="Icon-only buttons for compact actions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <SectionLabel>Variants</SectionLabel>
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
                <IconButton variant="destructive" aria-label="Delete">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </IconButton>
              </div>
            </div>

            <div>
              <SectionLabel>Sizes</SectionLabel>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <IconButton variant="primary" size="small" aria-label="Small">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                </IconButton>
                <IconButton variant="primary" size="medium" aria-label="Medium">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                </IconButton>
                <IconButton variant="primary" size="large" aria-label="Large">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Tag */}
        <ComponentSection title="Tag" description="Labels and status indicators">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <SectionLabel>Filled Variants</SectionLabel>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Tag variant="default">Default</Tag>
                <Tag variant="primary">Primary</Tag>
                <Tag variant="secondary">Secondary</Tag>
                <Tag variant="success">Success</Tag>
                <Tag variant="warning">Warning</Tag>
                <Tag variant="destructive">Destructive</Tag>
                <Tag variant="info">Info</Tag>
              </div>
            </div>
            
            <div>
              <SectionLabel>Outline Variants</SectionLabel>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Tag variant="outline">Outline</Tag>
                <Tag variant="outline-primary">Outline Primary</Tag>
                <Tag variant="outline-success">Outline Success</Tag>
                <Tag variant="outline-warning">Outline Warning</Tag>
                <Tag variant="outline-destructive">Outline Destructive</Tag>
                <Tag variant="outline-info">Outline Info</Tag>
              </div>
            </div>

            <div>
              <SectionLabel>Sizes</SectionLabel>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Tag variant="primary" size="sm">Small</Tag>
                <Tag variant="primary" size="md">Medium</Tag>
                <Tag variant="primary" size="lg">Large</Tag>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* OLQTag */}
        <ComponentSection title="OLQTag" description="Specialized tags for Offer Listing Quality scores">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '6px' }}>Excellent (≥80%)</p>
              <OLQTag value="95" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '6px' }}>Good (≥80%)</p>
              <OLQTag value="82" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '6px' }}>Fair (50-79%)</p>
              <OLQTag value="65" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '6px' }}>Warning (50-79%)</p>
              <OLQTag value="52" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '6px' }}>Poor (&lt;50%)</p>
              <OLQTag value="35" />
            </div>
          </div>
        </ComponentSection>

        {/* Breadcrumb */}
        <ComponentSection title="Breadcrumb" description="Navigation hierarchy indicator">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <SectionLabel>Basic (2 levels)</SectionLabel>
              <Breadcrumb aria-label="Basic navigation">
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Dashboard</BreadcrumbItem>
              </Breadcrumb>
            </div>
            
            <div>
              <SectionLabel>Multi-level (4 levels)</SectionLabel>
              <Breadcrumb aria-label="Multi-level navigation">
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Smartphones</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <div>
              <SectionLabel>Custom Separator</SectionLabel>
              <Breadcrumb separator="›" aria-label="Custom separator">
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/products">Products</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Details</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </ComponentSection>

        {/* Badge */}
        <ComponentSection title="Badge" description="Small numeric indicators">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="info" value={5} />
            <Badge variant="success" value={12} />
            <Badge variant="warning" value={3} />
            <Badge variant="error" value={99} />
            <Badge variant="neutral" value={2} />
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Button variant="secondary">
                Notifications
              </Button>
              <span style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-8px' 
              }}>
                <Badge variant="error" value={3} size="small" />
              </span>
            </div>
          </div>
        </ComponentSection>

        {/* Link */}
        <ComponentSection title="Link" description="Text links and navigation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/" variant="default">Default Link (underlined)</Link>
            <Link href="/" variant="subtle">Subtle Link</Link>
            <Link href="/" underline={false}>Link without underline</Link>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link href="/">
                Link with Icon
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }}>
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </ComponentSection>

        {/* Alert */}
        <ComponentSection title="Alert" description="Contextual feedback messages">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Alert variant="info">
              <strong>Information:</strong> This is an informational alert.
            </Alert>
            <Alert variant="success">
              <strong>Success:</strong> Your changes have been saved successfully!
            </Alert>
            <Alert variant="warning">
              <strong>Warning:</strong> Please review the following items before proceeding.
            </Alert>
            <Alert variant="error">
              <strong>Error:</strong> There was a problem processing your request.
            </Alert>
          </div>
        </ComponentSection>

        {/* Card */}
        <ComponentSection title="Card" description="Container for content grouping">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <Card>
              <CardHeader
                title="Card Title"
                description="Card description goes here"
              />
              <CardContent>
                <p style={{ fontSize: '14px', color: '#2E2F32' }}>
                  This is the card content area. You can place any content here.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader
                title="With Action"
                description="Card with header action"
                action={<Button variant="tertiary" size="small">Action</Button>}
              />
              <CardContent>
                <p style={{ fontSize: '14px', color: '#2E2F32' }}>
                  Cards can include actions in the header.
                </p>
              </CardContent>
            </Card>
          </div>
        </ComponentSection>

        {/* Form Controls */}
        <ComponentSection title="Form Controls" description="Input elements for forms">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: 500, color: '#2E2F32' }}>
                Text Input
              </label>
              <Input placeholder="Enter text..." />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: 500, color: '#2E2F32' }}>
                Textarea
              </label>
              <Textarea placeholder="Enter longer text..." rows={3} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox id="check1" />
                <label htmlFor="check1" style={{ fontSize: '14px', color: '#2E2F32' }}>Checkbox option</label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox id="check2" defaultChecked />
                <label htmlFor="check2" style={{ fontSize: '14px', color: '#2E2F32' }}>Checked by default</label>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Switch id="switch1" />
                <label htmlFor="switch1" style={{ fontSize: '14px', color: '#2E2F32' }}>Enable feature</label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Switch id="switch2" defaultChecked />
                <label htmlFor="switch2" style={{ fontSize: '14px', color: '#2E2F32' }}>Enabled by default</label>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Heading */}
        <ComponentSection title="Heading" description="Semantic heading components">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Heading as="h1" size="large">Heading H1 (Large)</Heading>
            <Heading as="h2" size="large">Heading H2 (Large)</Heading>
            <Heading as="h3" size="medium">Heading H3 (Medium)</Heading>
            <Heading as="h4" size="medium">Heading H4 (Medium)</Heading>
            <Heading as="h5" size="small">Heading H5 (Small)</Heading>
            <Heading as="h6" size="small">Heading H6 (Small)</Heading>
          </div>
        </ComponentSection>

      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '32px',
        marginTop: '48px',
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#74767c',
            margin: 0
          }}>
            Living Design 3.5 Component Library
          </p>
          <p style={{ 
            fontSize: '12px', 
            color: '#9ca3af',
            margin: '8px 0 0 0'
          }}>
            All components follow LD 3.5 design tokens and accessibility standards
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ComponentSection({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      marginBottom: '24px',
    }}>
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#fafafa',
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#2E2F32',
          margin: '0 0 4px 0',
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#74767c',
          margin: 0,
        }}>
          {description}
        </p>
      </div>
      <div style={{ padding: '24px' }}>
        {children}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
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
