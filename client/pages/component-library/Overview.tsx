import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from '@/components/icons';

const componentSections = [
  {
    title: 'Alerts',
    description: 'Banner messages for info, success, warning, and error states',
    path: '/component-library/alerts',
    icon: 'AlertCircle'
  },
  {
    title: 'Badges',
    description: 'Count badges, status indicators, and semantic color variants',
    path: '/component-library/badges',
    icon: 'Tag'
  },
  {
    title: 'Breadcrumbs',
    description: 'Navigation breadcrumbs with support for 2-5 levels and custom separators',
    path: '/component-library/breadcrumbs',
    icon: 'ArrowRight'
  },
  {
    title: 'Buttons',
    description: 'Primary, secondary, tertiary, and destructive button variants with full accessibility',
    path: '/component-library/buttons',
    icon: 'Target'
  },
  {
    title: 'Callouts',
    description: 'Contextual tooltips with directional arrows for onboarding',
    path: '/component-library/callouts',
    icon: 'Info'
  },
  {
    title: 'Cards',
    description: 'Card containers with headers, actions, and content areas',
    path: '/component-library/cards',
    icon: 'Square'
  },
  {
    title: 'Checkboxes',
    description: 'Single and grouped checkboxes with indeterminate state support',
    path: '/component-library/checkboxes',
    icon: 'Check'
  },
  {
    title: 'Chips',
    description: 'Interactive, selectable buttons for categories and selections',
    path: '/component-library/chips',
    icon: 'Tag'
  },
  {
    title: 'Component Sandbox',
    description: 'Interactive testing environment for all components with live property controls',
    path: '/component-library/component-tester',
    icon: 'Settings'
  },
  {
    title: 'Content Messages',
    description: 'Full-page state messages for errors, permissions, and loading',
    path: '/component-library/content-messages',
    icon: 'MessageSquare'
  },
  {
    title: 'Date Fields',
    description: 'Text input fields for date entry with validation',
    path: '/component-library/date-fields',
    icon: 'Calendar'
  },
  {
    title: 'Date Pickers',
    description: 'Calendar popup for visual date selection',
    path: '/component-library/date-pickers',
    icon: 'Calendar'
  },
  {
    title: 'Dividers',
    description: 'Horizontal and vertical separators for content sections',
    path: '/component-library/dividers',
    icon: 'Minus'
  },
  {
    title: 'Filter Chips',
    description: 'Pill-shaped toggleable chips with counts for filtering',
    path: '/component-library/filter-chips',
    icon: 'Filter'
  },
  {
    title: 'Form Groups',
    description: 'Fieldset containers for checkbox and radio groups',
    path: '/component-library/form-groups',
    icon: 'List'
  },
  {
    title: 'Icon Buttons',
    description: 'Icon-only buttons for compact actions with ghost, primary, secondary variants',
    path: '/component-library/icon-buttons',
    icon: 'Star'
  },
  {
    title: 'Icons',
    description: 'Complete icon library with 100+ React components organized by category',
    path: '/component-library/icons',
    icon: 'Star'
  },
  {
    title: 'Link Buttons',
    description: 'Link-styled interactive elements with icon support and multiple sizes',
    path: '/component-library/link-buttons',
    icon: 'Link'
  },
  {
    title: 'Links',
    description: 'Text links with icon support and semantic color variants',
    path: '/component-library/links',
    icon: 'Link'
  },
  {
    title: 'Lists',
    description: 'Vertical lists with leading icons and trailing content',
    path: '/component-library/lists',
    icon: 'List'
  },
  {
    title: 'Magic Box',
    description: 'AI-powered loading animation with sparkle effects',
    path: '/component-library/magic-box',
    icon: 'Sparkles'
  },
  {
    title: 'Menu',
    description: 'Dropdown menus with keyboard navigation and positioning',
    path: '/component-library/menu',
    icon: 'Menu'
  },
  {
    title: 'Metrics',
    description: 'Display critical data points with trend indicators and units',
    path: '/component-library/metrics',
    icon: 'BarGraph'
  },
  {
    title: 'Modals',
    description: 'Centered overlay dialogs with size variants for focused user interactions',
    path: '/component-library/modals',
    icon: 'Square'
  },
  {
    title: 'Nudges',
    description: 'Non-critical supportive information with actions and dismissible states',
    path: '/component-library/nudges',
    icon: 'Info'
  },
  {
    title: 'Panels',
    description: 'Slide-out panels for supplemental content and forms with three size variants',
    path: '/component-library/panels',
    icon: 'Sidebar'
  },
  {
    title: 'Progress Tracker',
    description: 'Step-by-step progress visualization for multi-step processes and workflows',
    path: '/component-library/progress-tracker',
    icon: 'TrendingUp'
  },
  {
    title: 'Radio Buttons',
    description: 'Mutually exclusive selection within a group',
    path: '/component-library/radio-buttons',
    icon: 'Circle'
  },
  {
    title: 'Select',
    description: 'Dropdown select component with error states, AI-assisted variant, and full accessibility',
    path: '/component-library/select',
    icon: 'ChevronDown'
  },
  {
    title: 'Spinners',
    description: 'Loading indicators for indeterminate processes with color and size variants',
    path: '/component-library/spinners',
    icon: 'Loader'
  },
  {
    title: 'Spot Icons',
    description: 'Decorative icon containers with brand and neutral color variants',
    path: '/component-library/spot-icons',
    icon: 'Circle'
  },
  {
    title: 'Switches',
    description: 'Toggle controls for binary on/off settings with immediate state changes',
    path: '/component-library/switches',
    icon: 'ToggleLeft'
  },
  {
    title: 'Tab Navigation',
    description: 'Page-level navigation tabs with selected state and icon support',
    path: '/component-library/tabs',
    icon: 'List'
  },
  {
    title: 'Text Area',
    description: 'Multi-line text input with character counting and AI-generated content indicators',
    path: '/component-library/textarea',
    icon: 'FileText'
  },
  {
    title: 'Text Fields',
    description: 'Single-line text inputs with labels, error states, helper text, icons, and AI-generated content indicators',
    path: '/component-library/text-fields',
    icon: 'Edit'
  },
];

export default function ComponentLibraryOverview() {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter components based on search query
  const filteredSections = searchQuery.trim()
    ? componentSections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : componentSections;

  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            marginBottom: '16px'
          }}>
            Living Design 3.5
          </h1>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            maxWidth: '800px'
          }}>
            A comprehensive component library for the Walmart Connect Ad Center.
            Each component follows the Living Design 3.5 specification with proper accessibility,
            semantic tokens, and responsive behavior.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}>
            <Icons.Search style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-secondary, #74767C)' }} />
          </div>
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              fontSize: '16px',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              border: '2px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
              borderRadius: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-fill-primary, #0071DC)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-moderate, #E6E6E8)';
            }}
          />
        </div>

        {/* Search Results Count */}
        {searchQuery.trim() && (
          <div style={{
            marginTop: '16px',
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)'
          }}>
            Found {filteredSections.length} component{filteredSections.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Component Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => {
            const IconComponent = Icons[section.icon as keyof typeof Icons] as React.ComponentType<{ size?: number }>;

            return (
              <Link
                key={section.path}
                to={section.path}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  padding: '24px',
                  backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
                  border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-fill-primary, #0071DC)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-moderate, #E6E6E8)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  {IconComponent && (
                    <div style={{
                      padding: '12px',
                      backgroundColor: 'var(--ld-semantic-color-fill-info-subtle, #E3F1FF)',
                      borderRadius: '8px',
                      flexShrink: 0
                    }}>
                      <IconComponent size={24} />
                    </div>
                  )}
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                      marginBottom: '8px'
                    }}>
                      {section.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: 'var(--ld-semantic-color-text-secondary, #74767C)'
                    }}>
                      {section.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '64px 32px',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)'
          }}>
            <Icons.Search style={{ width: 48, height: 48, margin: '0 auto 16px', opacity: 0.5 }} />
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>No components found</p>
            <p style={{ fontSize: '14px' }}>Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
