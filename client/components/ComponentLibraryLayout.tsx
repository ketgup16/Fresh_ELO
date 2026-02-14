import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import * as Icons from '@/components/icons';

// Component library navigation structure
const componentNavItems = [
  { 
    id: 'overview', 
    name: 'Overview', 
    path: '/component-library',
    icon: 'Home'
  },
  { 
    id: 'component-tester', 
    name: 'Component Sandbox', 
    path: '/component-library/component-tester',
    icon: 'Settings'
  },
  { 
    id: 'icons', 
    name: 'Icons', 
    path: '/component-library/icons',
    icon: 'Star'
  },
  { 
    id: 'buttons', 
    name: 'Buttons', 
    path: '/component-library/buttons',
    icon: 'Target'
  },
  { 
    id: 'badges', 
    name: 'Badges', 
    path: '/component-library/badges',
    icon: 'Tag'
  },
  { 
    id: 'breadcrumbs', 
    name: 'Breadcrumbs', 
    path: '/component-library/breadcrumbs',
    icon: 'ArrowRight'
  },
  { 
    id: 'links', 
    name: 'Links', 
    path: '/component-library/links',
    icon: 'Link'
  },
  { 
    id: 'link-buttons', 
    name: 'Link Buttons', 
    path: '/component-library/link-buttons',
    icon: 'Link'
  },
  { 
    id: 'icon-buttons', 
    name: 'Icon Buttons', 
    path: '/component-library/icon-buttons',
    icon: 'Star'
  },
  { 
    id: 'checkboxes', 
    name: 'Checkboxes', 
    path: '/component-library/checkboxes',
    icon: 'Check'
  },
  { 
    id: 'radio-buttons', 
    name: 'Radio Buttons', 
    path: '/component-library/radio-buttons',
    icon: 'Circle'
  },
  { 
    id: 'form-groups', 
    name: 'Form Groups', 
    path: '/component-library/form-groups',
    icon: 'List'
  },
  { 
    id: 'chips', 
    name: 'Chips', 
    path: '/component-library/chips',
    icon: 'Tag'
  },
  { 
    id: 'filter-chips', 
    name: 'Filter Chips', 
    path: '/component-library/filter-chips',
    icon: 'Filter'
  },
  { 
    id: 'callouts', 
    name: 'Callouts', 
    path: '/component-library/callouts',
    icon: 'Info'
  },
  { 
    id: 'cards', 
    name: 'Cards', 
    path: '/component-library/cards',
    icon: 'Square'
  },
  { 
    id: 'alerts', 
    name: 'Alerts', 
    path: '/component-library/alerts',
    icon: 'AlertCircle'
  },
  { 
    id: 'content-messages', 
    name: 'Content Messages', 
    path: '/component-library/content-messages',
    icon: 'MessageSquare'
  },
  { 
    id: 'date-fields', 
    name: 'Date Fields', 
    path: '/component-library/date-fields',
    icon: 'Calendar'
  },
  { 
    id: 'date-pickers', 
    name: 'Date Pickers', 
    path: '/component-library/date-pickers',
    icon: 'Calendar'
  },
  { 
    id: 'dividers', 
    name: 'Dividers', 
    path: '/component-library/dividers',
    icon: 'Minus'
  },
  { 
    id: 'lists', 
    name: 'Lists', 
    path: '/component-library/lists',
    icon: 'List'
  },
  { 
    id: 'magic-box', 
    name: 'Magic Box', 
    path: '/component-library/magic-box',
    icon: 'Sparkles'
  },
  { 
    id: 'menu', 
    name: 'Menu', 
    path: '/component-library/menu',
    icon: 'Menu'
  },
  { 
    id: 'design-tokens', 
    name: 'Design Tokens', 
    path: '/component-library/design-tokens',
    icon: 'Palette'
  },
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
          
          <SideNavigation aria-label="Component Library Navigation">
            {componentNavItems.map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ size?: number }>;
              const isActive = location.pathname === item.path;
              
              return (
                <SideNavigationItem
                  key={item.id}
                  href={item.path}
                  isCurrent={isActive}
                  onClick={(e) => handleNavClick(e, item.path)}
                  leading={IconComponent ? <IconComponent size={20} /> : undefined}
                >
                  {item.name}
                </SideNavigationItem>
              );
            })}
          </SideNavigation>
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
