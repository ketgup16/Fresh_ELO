import * as React from 'react';
import { ButtonExample } from '@/components/ButtonExample';
import IconButtonExample from '@/components/IconButtonExample';
import { LinkExample } from '@/components/LinkExample';
import { BadgeExample } from '@/components/BadgeExample';
import { BreadcrumbExample } from '@/components/BreadcrumbExample';
import { CardHeaderExample } from '@/components/CardHeaderExample';

/**
 * Component Showcase Page
 * Displays all available component examples from the client/components folder
 */
export default function ComponentShowcase() {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  const sections = [
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
            Living Design 3.5 component library examples
          </p>
          
          {/* Navigation Pills */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap' 
          }}>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ 
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
                  backgroundColor: activeSection === section.id ? '#0071DC' : '#f3f4f6',
                  color: activeSection === section.id ? 'white' : '#2E2F32',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '32px',
      }}>
        {sections.map((section, index) => {
          const Component = section.component;
          return (
            <section
              key={section.id}
              id={section.id}
              style={{
                marginBottom: index < sections.length - 1 ? '48px' : '0',
                scrollMarginTop: '120px', // Account for sticky header
              }}
            >
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
              }}>
                {/* Section Header */}
                <div style={{
                  padding: '24px 32px',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#fafafa',
                }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#2E2F32',
                    margin: 0,
                  }}>
                    {section.title}
                  </h2>
                  <p style={{
                    fontSize: '14px',
                    color: '#74767c',
                    margin: '4px 0 0 0',
                  }}>
                    Component: <code style={{ 
                      backgroundColor: '#f3f4f6', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '13px'
                    }}>
                      {section.component.name}
                    </code>
                  </p>
                </div>

                {/* Component Examples */}
                <div style={{ 
                  padding: '0',
                  backgroundColor: 'white'
                }}>
                  <Component />
                </div>
              </div>
            </section>
          );
        })}
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
            Living Design 3.5 Component Library • {sections.length} component categories
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
