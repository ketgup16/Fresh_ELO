import * as React from 'react';
import { ButtonExample } from '@/components/ButtonExample';
import IconButtonExample from '@/components/IconButtonExample';
import { LinkExample } from '@/components/LinkExample';
import { BadgeExample } from '@/components/BadgeExample';
import { BreadcrumbExample } from '@/components/BreadcrumbExample';
import { CardHeaderExample } from '@/components/CardHeaderExample';
import { Button } from '@/components/ui/Button';
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

/**
 * Component Showcase Page
 * Displays all available components from the client/components folder
 */
export default function ComponentShowcase() {
  const [activeSection, setActiveSection] = React.useState<string | null>('example-components');

  const exampleSections = [
    { id: 'buttons', title: 'Buttons', component: ButtonExample },
    { id: 'icon-buttons', title: 'Icon Buttons', component: IconButtonExample },
    { id: 'links', title: 'Links', component: LinkExample },
    { id: 'badges', title: 'Badges', component: BadgeExample },
    { id: 'breadcrumbs', title: 'Breadcrumbs', component: BreadcrumbExample },
    { id: 'card-headers', title: 'Card Headers', component: CardHeaderExample },
  ];

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
            fontSize: '32px', 
            fontWeight: 700, 
            color: '#2E2F32',
            marginBottom: '8px'
          }}>
            Component Showcase
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#74767c',
            marginBottom: '16px'
          }}>
            Living Design 3.5 component library - All components from client/components and client/components/ui
          </p>
          
          {/* Navigation Pills */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap' 
          }}>
            <a
              href="#example-components"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('example-components');
                document.getElementById('example-components')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                backgroundColor: activeSection === 'example-components' ? '#0071DC' : '#f3f4f6',
                color: activeSection === 'example-components' ? 'white' : '#2E2F32',
                cursor: 'pointer',
              }}
            >
              Example Components
            </a>
            <a
              href="#ui-components"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('ui-components');
                document.getElementById('ui-components')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                backgroundColor: activeSection === 'ui-components' ? '#0071DC' : '#f3f4f6',
                color: activeSection === 'ui-components' ? 'white' : '#2E2F32',
                cursor: 'pointer',
              }}
            >
              UI Components
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '32px',
      }}>
        
        {/* Example Components Section */}
        <section id="example-components" style={{ marginBottom: '48px', scrollMarginTop: '120px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#2E2F32', marginBottom: '24px' }}>
            Example Components
          </h2>
          <p style={{ fontSize: '14px', color: '#74767c', marginBottom: '24px' }}>
            Comprehensive examples showing all features and variants of each component
          </p>
          
          {exampleSections.map((section, index) => {
            const Component = section.component;
            return (
              <div
                key={section.id}
                id={section.id}
                style={{
                  marginBottom: index < exampleSections.length - 1 ? '32px' : '0',
                  scrollMarginTop: '120px',
                }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '20px 32px',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#fafafa',
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#2E2F32',
                      margin: 0,
                    }}>
                      {section.title}
                    </h3>
                  </div>
                  <div style={{ padding: '0', backgroundColor: 'white' }}>
                    <Component />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* UI Components Section */}
        <section id="ui-components" style={{ marginBottom: '48px', scrollMarginTop: '120px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#2E2F32', marginBottom: '24px' }}>
            UI Components (client/components/ui)
          </h2>
          <p style={{ fontSize: '14px', color: '#74767c', marginBottom: '24px' }}>
            Individual component instances from the ui folder
          </p>

          {/* Button Component */}
          <UIComponentCard title="Button" path="client/components/ui/Button.tsx">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="medium">Medium</Button>
              <Button variant="primary" size="large">Large</Button>
            </div>
          </UIComponentCard>

          {/* IconButton Component */}
          <UIComponentCard title="IconButton" path="client/components/ui/IconButton.tsx">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <IconButton variant="primary" aria-label="Add">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </IconButton>
              <IconButton variant="secondary" aria-label="Settings">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </IconButton>
              <IconButton variant="tertiary" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </IconButton>
            </div>
          </UIComponentCard>

          {/* Tag Component */}
          <UIComponentCard title="Tag" path="client/components/ui/tag.tsx">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Tag variant="default">Default</Tag>
              <Tag variant="primary">Primary</Tag>
              <Tag variant="secondary">Secondary</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="warning">Warning</Tag>
              <Tag variant="destructive">Destructive</Tag>
              <Tag variant="info">Info</Tag>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <Tag variant="outline">Outline</Tag>
              <Tag variant="outline-primary">Outline Primary</Tag>
              <Tag variant="outline-success">Outline Success</Tag>
            </div>
          </UIComponentCard>

          {/* OLQTag Component */}
          <UIComponentCard title="OLQTag" path="client/components/ui/olq-tag.tsx">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '4px' }}>Good (≥80%)</p>
                <OLQTag value="85" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '4px' }}>Fair (50-79%)</p>
                <OLQTag value="65" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#74767c', marginBottom: '4px' }}>Poor (&lt;50%)</p>
                <OLQTag value="35" />
              </div>
            </div>
          </UIComponentCard>

          {/* Breadcrumb Component */}
          <UIComponentCard title="Breadcrumb" path="client/components/ui/Breadcrumb.tsx">
            <Breadcrumb aria-label="Example navigation">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
            </Breadcrumb>
          </UIComponentCard>

          {/* Badge Component */}
          <UIComponentCard title="Badge" path="client/components/ui/Badge.tsx">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </UIComponentCard>

          {/* Link Component */}
          <UIComponentCard title="Link" path="client/components/ui/Link.tsx">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/">Default Link</Link>
              <Link href="/" variant="underlined">Underlined Link</Link>
              <Link href="/" variant="subtle">Subtle Link</Link>
            </div>
          </UIComponentCard>

          {/* Alert Component */}
          <UIComponentCard title="Alert" path="client/components/ui/Alert.tsx">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Alert variant="default">
                <strong>Default Alert:</strong> This is a default alert message.
              </Alert>
              <Alert variant="success">
                <strong>Success:</strong> Your action was completed successfully.
              </Alert>
              <Alert variant="warning">
                <strong>Warning:</strong> Please review this information.
              </Alert>
              <Alert variant="error">
                <strong>Error:</strong> Something went wrong.
              </Alert>
            </div>
          </UIComponentCard>

          {/* Form Controls */}
          <UIComponentCard title="Form Controls" path="client/components/ui/">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>
                  Input
                </label>
                <Input placeholder="Enter text..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>
                  Textarea
                </label>
                <Textarea placeholder="Enter longer text..." rows={3} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox id="check1" />
                <label htmlFor="check1" style={{ fontSize: '14px' }}>Checkbox</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Switch id="switch1" />
                <label htmlFor="switch1" style={{ fontSize: '14px' }}>Switch</label>
              </div>
            </div>
          </UIComponentCard>

        </section>

      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '32px',
        marginTop: '48px',
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#74767c',
            margin: 0
          }}>
            Living Design 3.5 Component Library • {exampleSections.length} example components + UI components
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

// Helper component for UI component cards
function UIComponentCard({ 
  title, 
  path, 
  children 
}: { 
  title: string; 
  path: string; 
  children: React.ReactNode;
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      marginBottom: '24px',
    }}>
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#fafafa',
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#2E2F32',
          margin: '0 0 4px 0',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '12px',
          color: '#74767c',
          margin: 0,
          fontFamily: 'monospace',
        }}>
          {path}
        </p>
      </div>
      <div style={{ padding: '24px' }}>
        {children}
      </div>
    </div>
  );
}
