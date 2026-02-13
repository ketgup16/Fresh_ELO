import React from 'react';
import { BadgeExample } from '@/components/BadgeExample';
import { ButtonExample } from '@/components/ButtonExample';
import { BreadcrumbExample } from '@/components/BreadcrumbExample';
import { LinkExample } from '@/components/LinkExample';
import IconButtonExample from '@/components/IconButtonExample';
import { CardHeaderExample } from '@/components/CardHeaderExample';
import {
  Search, Settings, Download, Upload, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Check, X, Dot, Circle, MoreHorizontal, PanelLeft,
  HelpCircle, User, RotateCcw, GripVertical, Calendar,
  Plus, Edit, Trash2, Eye, Sliders, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Bell
} from '@/components/icons';

export default function ComponentLibrary() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB',
      padding: '40px 60px'
    }}>
      {/* Page Header */}
      <div style={{ 
        marginBottom: '40px',
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
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
          fontFamily: 'var(--ld-semantic-font-family-sans, "Everyday Sans UI", sans-serif)',
          lineHeight: '1.5'
        }}>
          A comprehensive showcase of all UI components in the Walmart Connect Ad Center. 
          Each component follows the Living Design 3.5 specification with proper accessibility, 
          semantic tokens, and responsive behavior.
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        marginBottom: '32px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: 600, 
          marginBottom: '12px',
          color: '#74767C',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Quick Navigation
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Icons', 'Buttons', 'Badges', 'Breadcrumbs', 'Links', 'Icon Buttons', 'Cards'].map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase().replace(' ', '-')}`}
              style={{
                padding: '8px 16px',
                backgroundColor: '#F3F4F6',
                color: '#2E2F32',
                borderRadius: '20px',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0071DC';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = '#0071DC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
                e.currentTarget.style.color = '#2E2F32';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {section}
            </a>
          ))}
        </div>
      </div>

      {/* Icons Section */}
      <Section id="icons" title="Icons" description="LD 3.5-styled icon library with consistent stroke widths, semantic colors, and accessibility">
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '24px' }}>
            <IconShowcase icon={<Search />} name="Search" />
            <IconShowcase icon={<Settings />} name="Settings" />
            <IconShowcase icon={<Download />} name="Download" />
            <IconShowcase icon={<Upload />} name="Upload" />
            <IconShowcase icon={<ExternalLink />} name="ExternalLink" />
            <IconShowcase icon={<ChevronDown />} name="ChevronDown" />
            <IconShowcase icon={<ChevronUp />} name="ChevronUp" />
            <IconShowcase icon={<ChevronLeft />} name="ChevronLeft" />
            <IconShowcase icon={<ChevronRight />} name="ChevronRight" />
            <IconShowcase icon={<Check />} name="Check" />
            <IconShowcase icon={<X />} name="X" />
            <IconShowcase icon={<Dot />} name="Dot" />
            <IconShowcase icon={<Circle />} name="Circle" />
            <IconShowcase icon={<MoreHorizontal />} name="MoreHorizontal" />
            <IconShowcase icon={<PanelLeft />} name="PanelLeft" />
            <IconShowcase icon={<HelpCircle />} name="HelpCircle" />
            <IconShowcase icon={<User />} name="User" />
            <IconShowcase icon={<RotateCcw />} name="RotateCcw" />
            <IconShowcase icon={<GripVertical />} name="GripVertical" />
            <IconShowcase icon={<Calendar />} name="Calendar" />
            <IconShowcase icon={<Plus />} name="Plus" />
            <IconShowcase icon={<Edit />} name="Edit" />
            <IconShowcase icon={<Trash2 />} name="Trash2" />
            <IconShowcase icon={<Eye />} name="Eye" />
            <IconShowcase icon={<Sliders />} name="Sliders" />
            <IconShowcase icon={<ArrowUp />} name="ArrowUp" />
            <IconShowcase icon={<ArrowDown />} name="ArrowDown" />
            <IconShowcase icon={<ArrowLeft />} name="ArrowLeft" />
            <IconShowcase icon={<ArrowRight />} name="ArrowRight" />
            <IconShowcase icon={<Bell />} name="Bell" />
          </div>

          <div style={{
            marginTop: '32px',
            padding: '20px',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            borderLeft: '4px solid #0071DC'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Usage</h4>
            <pre style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#2E2F32',
              margin: 0,
              lineHeight: '1.6'
            }}>
{`import { Search, ChevronDown, Check } from '@/components/icons';

<Search className="w-5 h-5 text-blue-600" />
<ChevronDown style={{ color: '#0071DC' }} />`}
            </pre>
          </div>
        </div>
      </Section>

      {/* Buttons Section */}
      <Section id="buttons" title="Buttons" description="Primary, secondary, tertiary, and destructive button variants with full accessibility support">
        <ComponentShowcase>
          <ButtonExample />
        </ComponentShowcase>
      </Section>

      {/* Badges Section */}
      <Section id="badges" title="Badges" description="Count badges, status indicators, and semantic color variants for notifications and labels">
        <ComponentShowcase>
          <BadgeExample />
        </ComponentShowcase>
      </Section>

      {/* Breadcrumbs Section */}
      <Section id="breadcrumbs" title="Breadcrumbs" description="Navigation breadcrumbs with support for 2-5 levels and custom separators">
        <ComponentShowcase>
          <BreadcrumbExample />
        </ComponentShowcase>
      </Section>

      {/* Links Section */}
      <Section id="links" title="Links" description="Text links with underline variants, external link support, and hover states">
        <ComponentShowcase>
          <LinkExample />
        </ComponentShowcase>
      </Section>

      {/* Icon Buttons Section */}
      <Section id="icon-buttons" title="Icon Buttons" description="Icon-only buttons for compact actions with ghost, primary, secondary, and destructive variants">
        <ComponentShowcase>
          <IconButtonExample />
        </ComponentShowcase>
      </Section>

      {/* Cards Section */}
      <Section id="cards" title="Cards" description="Card containers with headers, content areas, and support for leading/trailing elements">
        <ComponentShowcase>
          <CardHeaderExample />
        </ComponentShowcase>
      </Section>

      {/* Design Tokens Section */}
      <Section id="design-tokens" title="Design Tokens" description="Living Design 3.5 semantic color tokens and spacing values">
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Action Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-primary)" 
              label="Action Primary" 
              token="--ld-semantic-color-action-fill-primary"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-primary-hovered)" 
              label="Action Primary Hovered" 
              token="--ld-semantic-color-action-fill-primary-hovered"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-secondary)" 
              label="Action Secondary" 
              token="--ld-semantic-color-action-fill-secondary"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-action-fill-destructive)" 
              label="Action Destructive" 
              token="--ld-semantic-color-action-fill-destructive"
            />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Text Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-text-primary)" 
              label="Text Primary" 
              token="--ld-semantic-color-text-primary"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-text-secondary)" 
              label="Text Secondary" 
              token="--ld-semantic-color-text-secondary"
            />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Border Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            <ColorSwatch 
              color="var(--ld-semantic-color-border-strong, #BABBBE)" 
              label="Border Strong" 
              token="--ld-semantic-color-border-strong"
            />
            <ColorSwatch 
              color="var(--ld-semantic-color-border-subtle, #E6E6E8)" 
              label="Border Subtle" 
              token="--ld-semantic-color-border-subtle"
            />
          </div>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section id="usage-guidelines" title="Usage Guidelines" description="Best practices for implementing Living Design 3.5 components">
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'grid', gap: '24px' }}>
            <GuidelineItem 
              title="Always Use Semantic Tokens"
              description="Never hard-code colors or spacing. Always use LD 3.5 semantic tokens like var(--ld-semantic-color-action-fill-primary) to ensure consistency and support theme switching."
            />
            <GuidelineItem 
              title="Reuse Existing Components"
              description="Before creating custom components, check if an existing LD 3.5 component meets your needs. Reusing components ensures consistency across the application."
            />
            <GuidelineItem 
              title="Accessibility First"
              description="All components include proper ARIA labels, keyboard navigation support, and focus indicators. Maintain these standards when implementing components."
            />
            <GuidelineItem 
              title="Responsive Design"
              description="Components are designed to work across all screen sizes. Use responsive utilities and test on mobile, tablet, and desktop viewports."
            />
            <GuidelineItem 
              title="Component Composition"
              description="Break complex UIs into smaller, reusable components. This improves maintainability and follows React best practices."
            />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div style={{
        marginTop: '64px',
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <p style={{ 
          fontSize: '14px', 
          color: '#74767C',
          marginBottom: '8px'
        }}>
          Living Design 3.5 Component Library
        </p>
        <p style={{ 
          fontSize: '12px', 
          color: '#BABBBE'
        }}>
          For more information, visit the{' '}
          <a 
            href="/guidelines" 
            style={{ 
              color: '#0071DC', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Design System Guidelines
          </a>
        </p>
      </div>
    </div>
  );
}

// Helper Components
interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function Section({ id, title, description, children }: SectionProps) {
  return (
    <div id={id} style={{ marginBottom: '48px', scrollMarginTop: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '8px'
        }}>
          {title}
        </h2>
        {description && (
          <p style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-secondary)',
            lineHeight: '1.5'
          }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function ComponentShowcase({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {children}
    </div>
  );
}

interface ColorSwatchProps {
  color: string;
  label: string;
  token: string;
}

function ColorSwatch({ color, label, token }: ColorSwatchProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        width: '100%',
        height: '100px',
        backgroundColor: color,
        borderRadius: '8px',
        border: '1px solid #E6E6E8',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }} />
      <div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 600,
          color: '#2E2F32',
          marginBottom: '4px'
        }}>
          {label}
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#74767C', 
          fontFamily: 'monospace',
          wordBreak: 'break-all'
        }}>
          {token}
        </div>
      </div>
    </div>
  );
}

interface GuidelineItemProps {
  title: string;
  description: string;
}

function GuidelineItem({ title, description }: GuidelineItemProps) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#F9FAFB',
      borderLeft: '4px solid #0071DC',
      borderRadius: '4px'
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: '#2E2F32',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '14px',
        color: '#74767C',
        lineHeight: '1.6',
        margin: 0
      }}>
        {description}
      </p>
    </div>
  );
}

interface IconShowcaseProps {
  icon: React.ReactNode;
  name: string;
}

function IconShowcase({ icon, name }: IconShowcaseProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '20px',
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        border: '1px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#0071DC';
        e.currentTarget.style.backgroundColor = '#E9F1FE';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.backgroundColor = '#F9FAFB';
      }}
    >
      <div style={{
        color: '#2E2F32',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {React.cloneElement(icon as React.ReactElement, {
          style: { width: '24px', height: '24px' }
        })}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#74767C',
        textAlign: 'center',
        fontFamily: 'monospace'
      }}>
        {copied ? '✓ Copied!' : name}
      </div>
    </div>
  );
}
