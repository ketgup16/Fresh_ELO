import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';

// Component library navigation structure with groups
const navigationSections = [
  {
    title: 'Getting Started',
    items: [
      {
        id: 'overview',
        name: 'Overview',
        path: '/component-library'
      },
      {
        id: 'component-tester',
        name: 'Component Sandbox',
        path: '/component-library/component-tester'
      },
      {
        id: 'design-tokens',
        name: 'Design Tokens',
        path: '/component-library/design-tokens'
      },
      {
        id: 'guidelines',
        name: 'Guidelines',
        path: '/component-library/guidelines'
      },
    ]
  },
  {
    title: 'Components',
    items: [
      {
        id: 'icons',
        name: 'Icons',
        path: '/component-library/icons'
      },
      {
        id: 'buttons',
        name: 'Buttons',
        path: '/component-library/buttons'
      },
      {
        id: 'badges',
        name: 'Badges',
        path: '/component-library/badges'
      },
      {
        id: 'breadcrumbs',
        name: 'Breadcrumbs',
        path: '/component-library/breadcrumbs'
      },
      {
        id: 'links',
        name: 'Links',
        path: '/component-library/links'
      },
      {
        id: 'link-buttons',
        name: 'Link Buttons',
        path: '/component-library/link-buttons'
      },
      {
        id: 'icon-buttons',
        name: 'Icon Buttons',
        path: '/component-library/icon-buttons'
      },
      {
        id: 'checkboxes',
        name: 'Checkboxes',
        path: '/component-library/checkboxes'
      },
      {
        id: 'radio-buttons',
        name: 'Radio Buttons',
        path: '/component-library/radio-buttons'
      },
      {
        id: 'select',
        name: 'Select',
        path: '/component-library/select'
      },
      {
        id: 'form-groups',
        name: 'Form Groups',
        path: '/component-library/form-groups'
      },
      {
        id: 'chips',
        name: 'Chips',
        path: '/component-library/chips'
      },
      {
        id: 'filter-chips',
        name: 'Filter Chips',
        path: '/component-library/filter-chips'
      },
      {
        id: 'callouts',
        name: 'Callouts',
        path: '/component-library/callouts'
      },
      {
        id: 'cards',
        name: 'Cards',
        path: '/component-library/cards'
      },
      {
        id: 'alerts',
        name: 'Alerts',
        path: '/component-library/alerts'
      },
      {
        id: 'content-messages',
        name: 'Content Messages',
        path: '/component-library/content-messages'
      },
      {
        id: 'date-fields',
        name: 'Date Fields',
        path: '/component-library/date-fields'
      },
      {
        id: 'date-pickers',
        name: 'Date Pickers',
        path: '/component-library/date-pickers'
      },
      {
        id: 'dividers',
        name: 'Dividers',
        path: '/component-library/dividers'
      },
      {
        id: 'lists',
        name: 'Lists',
        path: '/component-library/lists'
      },
      {
        id: 'magic-box',
        name: 'Magic Box',
        path: '/component-library/magic-box'
      },
      {
        id: 'menu',
        name: 'Menu',
        path: '/component-library/menu'
      },
      {
        id: 'metrics',
        name: 'Metrics',
        path: '/component-library/metrics'
      },
      {
        id: 'modals',
        name: 'Modals',
        path: '/component-library/modals'
      },
      {
        id: 'nudges',
        name: 'Nudges',
        path: '/component-library/nudges'
      },
      {
        id: 'panels',
        name: 'Panels',
        path: '/component-library/panels'
      },
      {
        id: 'popover',
        name: 'Popover',
        path: '/component-library/popover'
      },
      {
        id: 'progress-indicator',
        name: 'Progress Indicator',
        path: '/component-library/progress-indicator'
      },
      {
        id: 'progress-tracker',
        name: 'Progress Tracker',
        path: '/component-library/progress-tracker'
      },
      {
        id: 'snackbars',
        name: 'Snackbars',
        path: '/component-library/snackbars'
      },
    ]
  },
  {
    title: 'Shadcn/Radix Components',
    items: [
      {
        id: 'accordion',
        name: 'Accordion',
        path: '/component-library/accordion'
      },
      {
        id: 'alert-dialog',
        name: 'Alert Dialog',
        path: '/component-library/alert-dialog'
      },
      {
        id: 'avatar',
        name: 'Avatar',
        path: '/component-library/avatar'
      },
      {
        id: 'calendar',
        name: 'Calendar',
        path: '/component-library/calendar'
      },
      {
        id: 'carousel',
        name: 'Carousel',
        path: '/component-library/carousel'
      },
      {
        id: 'chart',
        name: 'Chart',
        path: '/component-library/chart'
      },
      {
        id: 'collapsible',
        name: 'Collapsible',
        path: '/component-library/collapsible'
      },
      {
        id: 'command',
        name: 'Command',
        path: '/component-library/command'
      },
      {
        id: 'context-menu',
        name: 'Context Menu',
        path: '/component-library/context-menu'
      },
      {
        id: 'dialog',
        name: 'Dialog',
        path: '/component-library/dialog'
      },
      {
        id: 'drawer',
        name: 'Drawer',
        path: '/component-library/drawer'
      },
      {
        id: 'dropdown-menu',
        name: 'Dropdown Menu',
        path: '/component-library/dropdown-menu'
      },
      {
        id: 'form',
        name: 'Form',
        path: '/component-library/form'
      },
      {
        id: 'hover-card',
        name: 'Hover Card',
        path: '/component-library/hover-card'
      },
      {
        id: 'input',
        name: 'Input',
        path: '/component-library/input'
      },
      {
        id: 'label',
        name: 'Label',
        path: '/component-library/label'
      },
      {
        id: 'menubar',
        name: 'Menubar',
        path: '/component-library/menubar'
      },
      {
        id: 'navigation-menu',
        name: 'Navigation Menu',
        path: '/component-library/navigation-menu'
      },
      {
        id: 'pagination',
        name: 'Pagination',
        path: '/component-library/pagination'
      },
      {
        id: 'progress',
        name: 'Progress',
        path: '/component-library/progress'
      },
      {
        id: 'radio-group',
        name: 'Radio Group',
        path: '/component-library/radio-group'
      },
      {
        id: 'scroll-area',
        name: 'Scroll Area',
        path: '/component-library/scroll-area'
      },
      {
        id: 'separator',
        name: 'Separator',
        path: '/component-library/separator'
      },
      {
        id: 'sheet',
        name: 'Sheet',
        path: '/component-library/sheet'
      },
      {
        id: 'skeleton',
        name: 'Skeleton',
        path: '/component-library/skeleton'
      },
      {
        id: 'slider',
        name: 'Slider',
        path: '/component-library/slider'
      },
      {
        id: 'switch',
        name: 'Switch',
        path: '/component-library/switch'
      },
      {
        id: 'table',
        name: 'Table',
        path: '/component-library/table'
      },
      {
        id: 'tabs',
        name: 'Tabs',
        path: '/component-library/tabs'
      },
      {
        id: 'textarea',
        name: 'Textarea',
        path: '/component-library/textarea'
      },
      {
        id: 'toast',
        name: 'Toast',
        path: '/component-library/toast'
      },
      {
        id: 'toggle',
        name: 'Toggle',
        path: '/component-library/toggle'
      },
      {
        id: 'tooltip',
        name: 'Tooltip',
        path: '/component-library/tooltip'
      },
    ]
  }
];

export function ComponentLibraryLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside 
        style={{ 
          width: '280px', 
          borderRight: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          overflowY: 'auto',
          flexShrink: 0
        }}
      >
        <div style={{ padding: '24px 16px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            marginBottom: '8px',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
          }}>
            Component Library
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '24px'
          }}>
            Living Design 3.5 Components
          </p>
          
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} style={{ marginBottom: sectionIndex < navigationSections.length - 1 ? '24px' : '0' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                marginBottom: '8px',
                paddingLeft: '16px'
              }}>
                {section.title}
              </h2>
              <SideNavigation aria-label={`${section.title} Navigation`}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <SideNavigationItem
                      key={item.id}
                      href={item.path}
                      isCurrent={isActive}
                      onClick={(e) => handleNavClick(e, item.path)}
                    >
                      {item.name}
                    </SideNavigationItem>
                  );
                })}
              </SideNavigation>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content area */}
      <main style={{ 
        flex: 1, 
        overflowY: 'auto',
        backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary, #F7F7F8)'
      }}>
        <Outlet />
      </main>
    </div>
  );
}
