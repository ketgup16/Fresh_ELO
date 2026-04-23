import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { Menu } from '@/components/icons/Menu';
import { X } from '@/components/icons/X';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { GlobalMeasureTool } from '@/pages/component-library/GlobalMeasureTool';
import styles from './ComponentLibraryLayout.module.css';

const COLLAPSED_STORAGE_KEY = 'cl-collapsed-sections';
// Large sections start collapsed by default
const DEFAULT_COLLAPSED = new Set<string>();

function readCollapsed(): Set<string> {
  try {
    const raw = localStorage.getItem(COLLAPSED_STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* ignore */ }
  return new Set(DEFAULT_COLLAPSED);
}

// Navigation item definition (nameKey references componentLibrary.* translation keys)
interface NavItem {
  id: string;
  nameKey: string;
  path: string;
}

interface NavSubGroup {
  id: string;
  titleKey: string;
  items: NavItem[];
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
  subGroups?: NavSubGroup[];
}

const navigationSections: NavSection[] = [
  {
    titleKey: 'componentLibrary.gettingStarted',
    items: [
      { id: 'overview', nameKey: 'componentLibrary.overview', path: '/component-library' },
      { id: 'assets', nameKey: 'componentLibrary.navAssets', path: '/component-library/assets' },
      { id: 'getting-started', nameKey: 'componentLibrary.gettingStartedNav', path: '/component-library/getting-started' },
      { id: 'guidelines', nameKey: 'componentLibrary.guidelines', path: '/component-library/guidelines' },
    ]
  },
  {
    titleKey: 'componentLibrary.tools',
    items: [
      { id: 'project-settings', nameKey: 'componentLibrary.navProjectSettings', path: '/component-library/project-settings' },
      { id: 'theme-editor', nameKey: 'componentLibrary.navThemeEditor', path: '/component-library/theme-editor' },
    ]
  },
  {
    titleKey: 'componentLibrary.wcpPatterns',
    items: [
      { id: 'clock-status', nameKey: 'componentLibrary.navClockStatus', path: '/component-library/clock-status' },
      { id: 'squiggly-agent', nameKey: 'componentLibrary.navAIAgents', path: '/component-library/squiggly-agent' },
      { id: 'top-nav', nameKey: 'componentLibrary.navTopNav', path: '/component-library/top-nav' },
      { id: 'footer-patterns', nameKey: 'componentLibrary.navFooterPatterns', path: '/component-library/footer-patterns' },
      { id: 'ax-metric-group', nameKey: 'componentLibrary.navAXMetricGroup', path: '/component-library/ax-metric-group' },
      { id: 'mega-nav', nameKey: 'componentLibrary.navSideNav', path: '/component-library/mega-nav' },
      { id: 'ax-location-breadcrumb', nameKey: 'componentLibrary.navAXLocationBreadcrumb', path: '/component-library/ax-location-breadcrumb' },
      { id: 'ax-quantity-stepper', nameKey: 'componentLibrary.navAXQuantityStepper', path: '/component-library/ax-quantity-stepper' },
      { id: 'radio-patterns', nameKey: 'componentLibrary.navRadioPatterns', path: '/component-library/radio-patterns' },
    ]
  },
  {
    titleKey: 'componentLibrary.wcpComponents',
    items: [
      { id: 'ax-attribute', nameKey: 'componentLibrary.navAXAttribute', path: '/component-library/ax-attribute' },
      { id: 'ax-avatar', nameKey: 'componentLibrary.navAXAvatar', path: '/component-library/ax-avatar' },
      { id: 'ax-avatar-button', nameKey: 'componentLibrary.navAXAvatarButton', path: '/component-library/ax-avatar-button' },
      { id: 'ax-button-groups', nameKey: 'componentLibrary.navAXButtonGroups', path: '/component-library/ax-button-groups' },
      { id: 'intelligent-insight', nameKey: 'componentLibrary.navIntelligentInsight', path: '/component-library/intelligent-insight' },
      { id: 'intelligent-recommendation', nameKey: 'componentLibrary.navIntelligentRecommendation', path: '/component-library/intelligent-recommendation' },
      { id: 'ax-search-bar', nameKey: 'componentLibrary.navAXSearchBar', path: '/component-library/ax-search-bar' },
      { id: 'ax-search-field', nameKey: 'componentLibrary.navAXSearchField', path: '/component-library/ax-search-field' },
      { id: 'ax-segmented-control-group', nameKey: 'componentLibrary.navAXSegmentedControlGroup', path: '/component-library/ax-segmented-control-group' },
      { id: 'ax-signature-capture', nameKey: 'componentLibrary.navAXSignatureCapture', path: '/component-library/ax-signature-capture' },
    ],
    subGroups: [
      {
        id: 'header',
        titleKey: 'componentLibrary.headerCategory',
        items: [
          { id: 'header-instructional', nameKey: 'componentLibrary.navHeaderInstructional', path: '/component-library/header-instructional' },
          { id: 'header-section', nameKey: 'componentLibrary.navHeaderSection', path: '/component-library/header-section' },
          { id: 'header-widget', nameKey: 'componentLibrary.navHeaderWidget', path: '/component-library/header-widget' },
        ],
      },
      {
        id: 'list',
        titleKey: 'componentLibrary.listCategory',
        items: [
          { id: 'list-action',    nameKey: 'componentLibrary.navListAction',    path: '/component-library/list-action' },
          { id: 'list-associate', nameKey: 'componentLibrary.navListAssociate', path: '/component-library/list-associate' },
          { id: 'list-goal',      nameKey: 'componentLibrary.navListGoal',      path: '/component-library/list-goal' },
          { id: 'list-team',      nameKey: 'componentLibrary.navListTeam',      path: '/component-library/list-team' },
          { id: 'lists',          nameKey: 'componentLibrary.navLists',          path: '/component-library/lists' },
        ],
      },
    ],
  },
  {
    titleKey: 'componentLibrary.myWalmartSection',
    items: [
      { id: 'ax-item-recommendation', nameKey: 'componentLibrary.navAXItemRecommendation', path: '/component-library/ax-item-recommendation' },
    ],
  },
  {
    titleKey: 'componentLibrary.components',
    items: [
      { id: 'alerts', nameKey: 'componentLibrary.navAlerts', path: '/component-library/alerts' },
      { id: 'badges', nameKey: 'componentLibrary.navBadges', path: '/component-library/badges' },
      { id: 'bottom-sheet', nameKey: 'componentLibrary.navBottomSheet', path: '/component-library/bottom-sheet' },
      { id: 'breadcrumbs', nameKey: 'componentLibrary.navBreadcrumbs', path: '/component-library/breadcrumbs' },
      { id: 'buttons', nameKey: 'componentLibrary.navButtons', path: '/component-library/buttons' },
      { id: 'callouts', nameKey: 'componentLibrary.navCallouts', path: '/component-library/callouts' },
      { id: 'cards', nameKey: 'componentLibrary.navCards', path: '/component-library/cards' },
      { id: 'checkboxes', nameKey: 'componentLibrary.navCheckboxes', path: '/component-library/checkboxes' },
      { id: 'chips', nameKey: 'componentLibrary.navChips', path: '/component-library/chips' },
      { id: 'content-messages', nameKey: 'componentLibrary.navContentMessages', path: '/component-library/content-messages' },
      { id: 'data-table', nameKey: 'componentLibrary.navDataTable', path: '/component-library/table' },
      { id: 'date-fields', nameKey: 'componentLibrary.navDateFields', path: '/component-library/date-fields' },
      { id: 'date-picker-calendar', nameKey: 'componentLibrary.navDatePickerCalendar', path: '/component-library/calendar' },
      { id: 'date-pickers', nameKey: 'componentLibrary.navDatePickers', path: '/component-library/date-pickers' },
      { id: 'date-range-picker', nameKey: 'componentLibrary.navDateRangePicker', path: '/component-library/date-range-picker' },
      { id: 'dialog', nameKey: 'componentLibrary.navDialog', path: '/component-library/dialog' },
      { id: 'dividers', nameKey: 'componentLibrary.navDividers', path: '/component-library/dividers' },
      { id: 'filter-chips', nameKey: 'componentLibrary.navFilterChips', path: '/component-library/filter-chips' },
      { id: 'form-groups', nameKey: 'componentLibrary.navFormGroups', path: '/component-library/form-groups' },
      { id: 'icon-buttons', nameKey: 'componentLibrary.navIconButtons', path: '/component-library/icon-buttons' },
      { id: 'icons', nameKey: 'componentLibrary.navIcons', path: '/component-library/icons' },
      { id: 'link-buttons', nameKey: 'componentLibrary.navLinkButtons', path: '/component-library/link-buttons' },
      { id: 'links', nameKey: 'componentLibrary.navLinks', path: '/component-library/links' },
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
      { id: 'skeleton', nameKey: 'componentLibrary.navSkeleton', path: '/component-library/skeleton' },
      { id: 'snackbars', nameKey: 'componentLibrary.navSnackbars', path: '/component-library/snackbars' },
      { id: 'spinners', nameKey: 'componentLibrary.navSpinners', path: '/component-library/spinners' },
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
      { id: 'carousel', nameKey: 'componentLibrary.navCarousel', path: '/component-library/carousel' },
      { id: 'chart', nameKey: 'componentLibrary.navChart', path: '/component-library/chart' },
      { id: 'collapsible', nameKey: 'componentLibrary.navCollapsible', path: '/component-library/collapsible' },
      { id: 'command', nameKey: 'componentLibrary.navCommand', path: '/component-library/command' },
      { id: 'context-menu', nameKey: 'componentLibrary.navContextMenu', path: '/component-library/context-menu' },
      { id: 'drawer', nameKey: 'componentLibrary.navDrawer', path: '/component-library/drawer' },
      { id: 'dropdown-menu', nameKey: 'componentLibrary.navDropdownMenu', path: '/component-library/dropdown-menu' },
      { id: 'ax-floating-button', nameKey: 'componentLibrary.navAXFloatingButton', path: '/component-library/ax-floating-button' },
      { id: 'form', nameKey: 'componentLibrary.navForm', path: '/component-library/form' },
      { id: 'menubar', nameKey: 'componentLibrary.navMenubar', path: '/component-library/menubar' },
      { id: 'navigation-menu', nameKey: 'componentLibrary.navNavigationMenu', path: '/component-library/navigation-menu' },
      { id: 'pagination', nameKey: 'componentLibrary.navPagination', path: '/component-library/pagination' },
      { id: 'quantity-stepper', nameKey: 'componentLibrary.navQuantityStepper', path: '/component-library/quantity-stepper' },
      { id: 'ax-rating', nameKey: 'componentLibrary.navAXRating', path: '/component-library/ax-rating' },
      { id: 'ax-rich-media-sheet', nameKey: 'componentLibrary.navAXRichMediaSheet', path: '/component-library/ax-rich-media-sheet' },
      { id: 'scroll-area', nameKey: 'componentLibrary.navScrollArea', path: '/component-library/scroll-area' },
      { id: 'segmented-control', nameKey: 'componentLibrary.navSegmentedControl', path: '/component-library/segmented-control' },
      { id: 'slider', nameKey: 'componentLibrary.navSlider', path: '/component-library/slider' },
      { id: 'toggle', nameKey: 'componentLibrary.navToggle', path: '/component-library/toggle' },
      { id: 'ax-upload-image', nameKey: 'componentLibrary.navAXUploadImage', path: '/component-library/ax-upload-image' },
    ]
  },
];

export function ComponentLibraryLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(readCollapsed);
  const [collapsedSubGroups, setCollapsedSubGroups] = useState<Set<string>>(new Set());

  const toggleSubGroup = useCallback((id: string) => {
    setCollapsedSubGroups(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSection = useCallback((titleKey: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(titleKey)) next.delete(titleKey);
      else next.add(titleKey);
      try { localStorage.setItem(COLLAPSED_STORAGE_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const closeNav = useCallback(() => setMobileNavOpen(false), []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    closeNav();
  }, [navigate, closeNav]);

  // Current page name for mobile top bar
  const currentPage = navigationSections
    .flatMap(s => s.items)
    .find(item => item.path === location.pathname);
  const currentPageName = currentPage ? t(currentPage.nameKey) : t('componentLibrary.title');

  return (
    <div className={styles.shell}>
      <div className={styles.body}>
        {/* Backdrop for mobile drawer */}
        <div
          className={`${styles.backdrop} ${mobileNavOpen ? styles.backdropVisible : ''}`}
          onClick={closeNav}
          aria-hidden="true"
        />

        {/* Sidebar / Drawer */}
        <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarInner}>
            {/* Close button — mobile only */}
            <div className={styles.drawerCloseRow}>
              <button
                className={styles.drawerCloseBtn}
                onClick={closeNav}
                aria-label="Close navigation"
              >
                <X width={20} height={20} />
              </button>
            </div>

            <h1 className={styles.sidebarTitle}>{t('componentLibrary.title')}</h1>
            <p className={styles.sidebarSubtitle}>{t('componentLibrary.subtitle')}</p>

            {navigationSections.map((section, sectionIndex) => {
              const isCollapsed = collapsed.has(section.titleKey);
              // Auto-expand section if the current page lives inside it
              const hasActiveItem =
                section.items.some(item => item.path === location.pathname) ||
                (section.subGroups ?? []).some(sg => sg.items.some(item => item.path === location.pathname));
              const effectivelyOpen = hasActiveItem || !isCollapsed;

              return (
                <div
                  key={section.titleKey}
                  className={styles.navSection}
                  style={{ marginBottom: sectionIndex < navigationSections.length - 1 ? '8px' : '0' }}
                >
                  <button
                    className={styles.sectionToggle}
                    onClick={() => toggleSection(section.titleKey)}
                    aria-expanded={effectivelyOpen}
                    aria-controls={`section-${section.titleKey}`}
                  >
                    <span className={styles.sectionLabelText}>{t(section.titleKey)}</span>
                    <ChevronDown
                      width={14}
                      height={14}
                      className={[styles.sectionChevron, effectivelyOpen ? styles.sectionChevronOpen : ''].join(' ')}
                    />
                  </button>

                  <div
                    id={`section-${section.titleKey}`}
                    className={[styles.sectionContent, effectivelyOpen ? styles.sectionContentOpen : ''].join(' ')}
                  >
                    <div className={styles.sectionContentInner}>
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

                      {/* Nested sub-groups */}
                      {(section.subGroups ?? []).map((sg) => {
                        const sgCollapsed = collapsedSubGroups.has(sg.id);
                        const sgOpen = !sgCollapsed;
                        return (
                          <div key={sg.id}>
                            <button
                              className={styles.subGroupToggle}
                              onClick={() => toggleSubGroup(sg.id)}
                              aria-expanded={sgOpen}
                              aria-controls={`subgroup-${sg.id}`}
                            >
                              <span className={styles.subGroupLabelText}>{t(sg.titleKey)}</span>
                              <ChevronDown
                                width={14}
                                height={14}
                                className={[styles.sectionChevron, sgOpen ? styles.sectionChevronOpen : ''].join(' ')}
                              />
                            </button>
                            <div
                              id={`subgroup-${sg.id}`}
                              className={[styles.subGroupContent, sgOpen ? styles.subGroupContentOpen : ''].join(' ')}
                            >
                              <div className={styles.subGroupContentInner}>
                                <SideNavigation aria-label={`${t(sg.titleKey)} Navigation`}>
                                  {sg.items.map((item) => {
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
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Back to Home */}
            <div className={styles.backToHome}>
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
        <main className={styles.main}>
          {/* Mobile top bar with hamburger */}
          <div className={styles.mobileTopBar}>
            <button
              className={styles.hamburgerBtn}
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
            >
              <Menu width={24} height={24} />
            </button>
            <span className={styles.mobileTopBarTitle}>{currentPageName}</span>
          </div>

          <Outlet />
        </main>
      </div>
      <GlobalMeasureTool />
    </div>
  );
}
