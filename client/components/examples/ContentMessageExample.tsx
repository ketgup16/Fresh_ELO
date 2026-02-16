import * as React from 'react';
import { ContentMessage } from '@/components/ui/ContentMessage';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ContentMessageExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Error states with illustrations */}
      <ExampleSection
        title="Error States with Illustrations (Small Size)"
        description="Common error states using illustrative imagery for better user engagement."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
          <ContentMessage
            size="small"
            variant="neutral"
            title="[Information] isn't available right now"
            media={
              <img
                src="/illustrations/associate-waving.svg"
                alt="Walmart associate"
                style={{ width: 160, height: 160 }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>

          <ContentMessage
            size="small"
            variant="error"
            title="No internet connection"
            media={
              <img
                src="/illustrations/network-issue.svg"
                alt="No internet connection"
                style={{ width: 160, height: 160 }}
              />
            }
          >
            Make sure you're connected to WiFi or data and try again.
          </ContentMessage>

          <ContentMessage
            size="small"
            variant="error"
            title="We couldn't find this page"
            media={
              <img
                src="/illustrations/associate-glasses.svg"
                alt="Page not found"
                style={{ width: 160, height: 160 }}
              />
            }
          >
            Try searching or go to the homepage.
          </ContentMessage>

          <ContentMessage
            size="small"
            variant="error"
            title="Something went wrong"
            media={
              <img
                src="/illustrations/network-issue.svg"
                alt="Error occurred"
                style={{ width: 160, height: 160 }}
              />
            }
          >
            Try restarting the app.
          </ContentMessage>

          <ContentMessage
            size="small"
            variant="neutral"
            title="There was a issue"
            media={
              <img
                src="/illustrations/associate-waving.svg"
                alt="Technical issue"
                style={{ width: 160, height: 160 }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>

          <ContentMessage
            size="small"
            variant="neutral"
            title="No items available"
            media={
              <img
                src="/illustrations/toys.svg"
                alt="No items available"
                style={{ width: 160, height: 160 }}
              />
            }
          >
            Check back later for new items.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* Error states with illustrations - LARGE */}
      <ExampleSection
        title="Error States with Illustrations (Large Size)"
        description="Full-page error states with larger illustrations for desktop and prominent displays."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
          <ContentMessage
            size="large"
            variant="neutral"
            title="[Information] isn't available right now"
            media={
              <img
                src="/illustrations/associate-waving.svg"
                alt="Walmart associate"
                style={{ width: 240, height: 240 }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="error"
            title="No internet connection"
            media={
              <img
                src="/illustrations/network-issue.svg"
                alt="No internet connection"
                style={{ width: 240, height: 240 }}
              />
            }
          >
            Make sure you're connected to WiFi or data and try again.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="error"
            title="We couldn't find this page"
            media={
              <img
                src="/illustrations/associate-glasses.svg"
                alt="Page not found"
                style={{ width: 240, height: 240 }}
              />
            }
          >
            Try searching or go to the homepage.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="error"
            title="Something went wrong"
            media={
              <img
                src="/illustrations/network-issue.svg"
                alt="Error occurred"
                style={{ width: 240, height: 240 }}
              />
            }
          >
            Try restarting the app.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="neutral"
            title="There was a issue"
            media={
              <img
                src="/illustrations/associate-waving.svg"
                alt="Technical issue"
                style={{ width: 240, height: 240 }}
              />
            }
          >
            Refresh this page to try again.
          </ContentMessage>

          <ContentMessage
            size="large"
            variant="neutral"
            title="No items available"
            media={
              <img
                src="/illustrations/toys.svg"
                alt="No items available"
                style={{ width: 240, height: 240 }}
              />
            }
          >
            Check back later for new items.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* Variant showcase */}
      <ExampleSection
        title="Variants"
        description="Content Messages support error, success, info, warning, and neutral variants for color-coding severity."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          <ContentMessage
            variant="error"
            title="We can't load your orders"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small" onClick={() => window.location.reload()}>
                  Reload page
                </Button>
                <Button variant="secondary" size="small">
                  Contact support
                </Button>
              </ButtonGroup>
            }
          >
            Check your connection, then try again. If the issue continues, contact support.
          </ContentMessage>

          <ContentMessage
            variant="success"
            title="Payment confirmed"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <Button variant="primary" size="small">
                Continue shopping
              </Button>
            }
          >
            Your order has been placed and a confirmation email is on its way.
          </ContentMessage>

          <ContentMessage
            variant="info"
            title="New features available"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <Button variant="secondary" size="small">
                Learn more
              </Button>
            }
          >
            We've added new reporting tools to help you track campaign performance.
          </ContentMessage>

          <ContentMessage
            variant="warning"
            title="Your session is expiring"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <Button variant="primary" size="small">
                Stay signed in
              </Button>
            }
          >
            You'll be signed out in 5 minutes due to inactivity.
          </ContentMessage>

          <ContentMessage
            variant="neutral"
            title="No campaigns yet"
          >
            Create your first campaign to start reaching customers.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* Size variants */}
      <ExampleSection
        title="Size Variants"
        description="Small (default) for compact layouts, large for full-page blocking states."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <VariantLabel>Small (default)</VariantLabel>
            <ContentMessage
              size="small"
              variant="error"
              title="Service unavailable"
              media={
                <div style={{
                  width: 160,
                  height: 160,
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                  borderRadius: '8px'
                }} />
              }
              actions={
                <Button variant="primary" size="small">
                  Retry
                </Button>
              }
            >
              We're experiencing an outage. Please try again shortly.
            </ContentMessage>
          </div>
          <div>
            <VariantLabel>Large</VariantLabel>
            <ContentMessage
              size="large"
              variant="error"
              title="Service unavailable"
              media={
                <div style={{
                  width: 240,
                  height: 240,
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                  borderRadius: '8px'
                }} />
              }
              actions={
                <ButtonGroup>
                  <Button variant="primary" size="medium">
                    Retry
                  </Button>
                  <Button variant="secondary" size="medium">
                    Contact support
                  </Button>
                </ButtonGroup>
              }
            >
              We're experiencing an outage. Please try again shortly.
            </ContentMessage>
          </div>
        </div>
      </ExampleSection>

      {/* With and without media */}
      <ExampleSection
        title="With & Without Media"
        description="Media is optional. Omit it when space is constrained or the text is sufficient."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          <ContentMessage
            variant="info"
            title="Camera access required"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <Button variant="primary" size="small">
                Open settings
              </Button>
            }
          >
            Enable camera access in your browser settings to scan items.
          </ContentMessage>

          <ContentMessage
            variant="info"
            title="Camera access required"
            actions={
              <Button variant="primary" size="small">
                Open settings
              </Button>
            }
          >
            Enable camera access in your browser settings to scan items.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* With multiple actions */}
      <ExampleSection
        title="Action Patterns"
        description="Use ButtonGroup for multiple actions. Lead with the primary path forward."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ContentMessage
            variant="error"
            title="This page didn't load"
            media={
              <div style={{
                width: 160,
                height: 160,
                backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
                borderRadius: '8px'
              }} />
            }
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small" onClick={() => window.location.reload()}>
                  Reload page
                </Button>
                <Button variant="secondary" size="small">
                  Go to homepage
                </Button>
              </ButtonGroup>
            }
          >
            Something went wrong loading this content. Try reloading or go back to the homepage.
          </ContentMessage>

          <ContentMessage
            variant="neutral"
            title="No results found"
            actions={
              <Button variant="secondary" size="small">
                Clear filters
              </Button>
            }
          >
            Try adjusting your filters or search terms.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* Heading levels */}
      <ExampleSection
        title="Heading Levels"
        description="Use headingLevel to maintain a correct heading hierarchy in nested contexts."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          <ContentMessage variant="neutral" title="Heading h2 (default)" headingLevel="h2">
            Default heading level for full-page states.
          </ContentMessage>
          <ContentMessage variant="neutral" title="Heading h3" headingLevel="h3">
            For use inside a section with an h2 parent.
          </ContentMessage>
          <ContentMessage variant="neutral" title="Heading h4" headingLevel="h4">
            For deeply nested content areas.
          </ContentMessage>
        </div>
      </ExampleSection>

      {/* Usage code */}
      <ExampleSection
        title="Usage"
        description="Import and use the ContentMessage component."
      >
        <pre
          style={{
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            fontSize: '13px',
            color: 'var(--ld-semantic-color-text)',
            lineHeight: '1.6',
            overflowX: 'auto',
            padding: '16px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
            margin: 0,
          }}
        >
{`import { ContentMessage } from '@/components/ui/ContentMessage';
import { Button } from '@/components/ui/Button';

// Error state with gray placeholder
<ContentMessage
  variant="error"
  title="We can't load your orders"
  media={
    <div style={{
      width: 160,
      height: 160,
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      borderRadius: '8px'
    }} />
  }
  actions={<Button variant="primary" size="small">Reload page</Button>}
>
  Check your connection, then try again.
</ContentMessage>

// Error state with illustration (small size)
<ContentMessage
  size="small"
  variant="error"
  title="No internet connection"
  media={
    <img
      src="/illustrations/network-issue.svg"
      alt="No internet connection"
      style={{ width: 160, height: 160 }}
    />
  }
>
  Make sure you're connected to WiFi or data and try again.
</ContentMessage>

// Success state
<ContentMessage
  variant="success"
  title="All set"
  actions={<Button variant="primary" size="small">Continue</Button>}
>
  You can continue to the next step.
</ContentMessage>

// Large variant with illustration
<ContentMessage
  size="large"
  variant="error"
  title="No internet connection"
  media={
    <img
      src="/illustrations/network-issue.svg"
      alt="No internet connection"
      style={{ width: 240, height: 240 }}
    />
  }
>
  Make sure you're connected to WiFi or data and try again.
</ContentMessage>

// Large, full-page blocking state (no media)
<ContentMessage
  size="large"
  variant="error"
  title="Service unavailable"
  headingLevel="h2"
>
  We're experiencing an outage. Please try again later.
</ContentMessage>

// Neutral empty state
<ContentMessage variant="neutral" title="No campaigns yet">
  Create your first campaign to start reaching customers.
</ContentMessage>`}
        </pre>
      </ExampleSection>
    </div>
  );
}

/* ─── Helper sub-components ─── */

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '4px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          marginBottom: '16px',
          lineHeight: '1.5',
        }}
      >
        {description}
      </p>
      {children}
    </div>
  );
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text-subtle)',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
      }}
    >
      {children}
    </span>
  );
}
