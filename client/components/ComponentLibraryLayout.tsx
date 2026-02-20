import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { MastHead } from '@/components/ui/MastHead';

// Navigation item definition (nameKey references componentLibrary.* translation keys)
interface NavItem {
  id: string;
  nameKey: string;
  path: string;
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    titleKey: 'componentLibrary.gettingStarted',
    items: [
      { id: 'overview', nameKey: 'componentLibrary.overview', path: '/component-library' },
      { id: 'getting-started', nameKey: 'componentLibrary.gettingStartedNav', path: '/component-library/getting-started' },
      { id: 'themes', nameKey: 'componentLibrary.themesTokens', path: '/component-library/themes' },
      { id: 'component-tester', nameKey: 'componentLibrary.componentSandbox', path: '/component-library/component-tester' },
      { id: 'guidelines', nameKey: 'componentLibrary.guidelines', path: '/component-library/guidelines' },
    ]
  },
  {
    titleKey: 'componentLibrary.components',
    items: [
      { id: 'alerts', nameKey: 'componentLibrary.navAlerts', path: '/component-library/alerts' },
      { id: 'badges', nameKey: 'componentLibrary.navBadges', path: '/component-library/badges' },
      { id: 'breadcrumbs', nameKey: 'componentLibrary.navBreadcrumbs', path: '/component-library/breadcrumbs' },
      { id: 'buttons', nameKey: 'componentLibrary.navButtons', path: '/component-library/buttons' },
      { id: 'callouts', nameKey: 'componentLibrary.navCallouts', path: '/component-library/callouts' },
      { id: 'cards', nameKey: 'componentLibrary.navCards', path: '/component-library/cards' },
      { id: 'checkboxes', nameKey: 'componentLibrary.navCheckboxes', path: '/component-library/checkboxes' },
      { id: 'chips', nameKey: 'componentLibrary.navChips', path: '/component-library/chips' },
      { id: 'content-messages', nameKey: 'componentLibrary.navContentMessages', path: '/component-library/content-messages' },
      { id: 'date-fields', nameKey: 'componentLibrary.navDateFields', path: '/component-library/date-fields' },
      { id: 'date-picker-calendar', nameKey: 'componentLibrary.navDatePickerCalendar', path: '/component-library/calendar' },
      { id: 'date-pickers', nameKey: 'componentLibrary.navDatePickers', path: '/component-library/date-pickers' },
      { id: 'date-range-picker', nameKey: 'componentLibrary.navDateRangePicker', path: '/component-library/date-range-picker' },
      { id: 'dividers', nameKey: 'componentLibrary.navDividers', path: '/component-library/dividers' },
      { id: 'filter-chips', nameKey: 'componentLibrary.navFilterChips', path: '/component-library/filter-chips' },
      { id: 'form-groups', nameKey: 'componentLibrary.navFormGroups', path: '/component-library/form-groups' },
      { id: 'icon-buttons', nameKey: 'componentLibrary.navIconButtons', path: '/component-library/icon-buttons' },
      { id: 'icons', nameKey: 'componentLibrary.navIcons', path: '/component-library/icons' },
      { id: 'link-buttons', nameKey: 'componentLibrary.navLinkButtons', path: '/component-library/link-buttons' },
      { id: 'links', nameKey: 'componentLibrary.navLinks', path: '/component-library/links' },
      { id: 'lists', nameKey: 'componentLibrary.navLists', path: '/component-library/lists' },
      { id: 'magic-box', nameKey: 'componentLibrary.navMagicBox', path: '/component-library/magic-box' },
      { id: 'menu', nameKey: 'componentLibrary.navMenu', path: '/component-library/menu' },
      { id: 'metrics', nameKey: 'componentLibrary.navMetrics', path: '/component-library/metrics' },
      { id: 'modals', nameKey: 'componentLibrary.navModals', path: '/component-library/modals' },
      { id: 'nudges', nameKey: 'componentLibrary.navNudges', path: '/component-library/nudges' },
      { id: 'panels', nameKey: 'componentLibrary.navPanels', path: '/component-library/panels' },
      { id: 'popover', nameKey: 'componentLibrary.navPopover', path: '/component-library/popover' },
      { id: 'progress-indicator', nameKey: 'componentLibrary.navProgressIndicator', path: '/component-library/progress-indicator' },
      { id: 'progress-tracker', nameKey: 'componentLibrary.navProgressTracker', path: '/component-library/progress-tracker' },
      { id: 'radio-buttons', nameKey: 'componentLibrary.navRadioButtons', path: '/component-library/radio-buttons' },
      { id: 'select', nameKey: 'componentLibrary.navSelect', path: '/component-library/select' },
      { id: 'snackbars', nameKey: 'componentLibrary.navSnackbars', path: '/component-library/snackbars' },
      { id: 'spot-icons', nameKey: 'componentLibrary.navSpotIcons', path: '/component-library/spot-icons' },
      { id: 'switches', nameKey: 'componentLibrary.navSwitches', path: '/component-library/switches' },
      { id: 'tab-navigation', nameKey: 'componentLibrary.navTabNavigation', path: '/component-library/tabs' },
      { id: 'tags', nameKey: 'componentLibrary.navTags', path: '/component-library/tags' },
      { id: 'textarea', nameKey: 'componentLibrary.navTextArea', path: '/component-library/textarea' },
      { id: 'text-fields', nameKey: 'componentLibrary.navTextFields', path: '/component-library/text-fields' },
    ]
  },
  {
    titleKey: 'componentLibrary.sharedSection',
    items: [
      { id: 'accordion', nameKey: 'componentLibrary.navAccordion', path: '/component-library/accordion' },
      { id: 'alert-dialog', nameKey: 'componentLibrary.navAlertDialog', path: '/component-library/alert-dialog' },
      { id: 'avatar', nameKey: 'componentLibrary.navAvatar', path: '/component-library/avatar' },
      { id: 'carousel', nameKey: 'componentLibrary.navCarousel', path: '/component-library/carousel' },
      { id: 'chart', nameKey: 'componentLibrary.navChart', path: '/component-library/chart' },
      { id: 'collapsible', nameKey: 'componentLibrary.navCollapsible', path: '/component-library/collapsible' },
      { id: 'command', nameKey: 'componentLibrary.navCommand', path: '/component-library/command' },
      { id: 'context-menu', nameKey: 'componentLibrary.navContextMenu', path: '/component-library/context-menu' },
      { id: 'dialog', nameKey: 'componentLibrary.navDialog', path: '/component-library/dialog' },
      { id: 'bottom-sheet', nameKey: 'componentLibrary.navBottomSheet', path: '/component-library/bottom-sheet' },
      { id: 'dropdown-menu', nameKey: 'componentLibrary.navDropdownMenu', path: '/component-library/dropdown-menu' },
      { id: 'form', nameKey: 'componentLibrary.navForm', path: '/component-library/form' },
      { id: 'menubar', nameKey: 'componentLibrary.navMenubar', path: '/component-library/menubar' },
      { id: 'navigation-menu', nameKey: 'componentLibrary.navNavigationMenu', path: '/component-library/navigation-menu' },
      { id: 'pagination', nameKey: 'componentLibrary.navPagination', path: '/component-library/pagination' },
      { id: 'scroll-area', nameKey: 'componentLibrary.navScrollArea', path: '/component-library/scroll-area' },
      { id: 'skeleton', nameKey: 'componentLibrary.navSkeleton', path: '/component-library/skeleton' },
      { id: 'slider', nameKey: 'componentLibrary.navSlider', path: '/component-library/slider' },
      { id: 'table', nameKey: 'componentLibrary.navTable', path: '/component-library/table' },
      { id: 'toggle', nameKey: 'componentLibrary.navToggle', path: '/component-library/toggle' },
    ]
  }
];

export function ComponentLibraryLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <MastHead />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          borderRight: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}
      >
        <div style={{
          padding: '24px 16px',
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            marginBottom: '8px',
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)'
          }}>
            {t('componentLibrary.title')}
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            marginBottom: '24px'
          }}>
            {t('componentLibrary.subtitle')}
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
                {t(section.titleKey)}
              </h2>
              <SideNavigation aria-label={`${t(section.titleKey)} Navigation`}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <SideNavigationItem
                      key={item.id}
                      href={item.path}
                      isCurrent={isActive}
                      onClick={(e) => handleNavClick(e, item.path)}
                    >
                      {t(item.nameKey)}
                    </SideNavigationItem>
                  );
                })}
              </SideNavigation>
            </div>
          ))}

          {/* Back to Home - Bottom of Navigation */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '24px',
            borderTop: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            <SideNavigation aria-label="Main Navigation">
              <SideNavigationItem
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
              >
                ← {t('componentLibrary.backToHome')}
              </SideNavigationItem>
            </SideNavigation>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#ffffff'
      }}>
        <Outlet />
      </main>

      </div>
    </div>
  );
}
