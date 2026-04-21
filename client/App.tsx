import "./global.css";

import "./i18n";
import { createRoot } from "react-dom/client";
import { SnackbarContainer } from "@/components/ui/SnackbarContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MartyProvider } from "@/contexts/MartyContext";
import { AgentProvider } from "@/contexts/AgentContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LayoutSettingsProvider } from "@/contexts/LayoutSettingsContext";
import { CartProvider } from "@/contexts/CartContext";
import { ComponentLibraryLayout } from "./components/ComponentLibraryLayout";

import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = React.lazy(() => import("./pages/NotFound"));
const HomePage = React.lazy(() => import("./pages/Home"));

// Component library pages (lazy loaded)
const ComponentLibraryOverview = React.lazy(() => import("./pages/component-library/Overview"));
const ComponentTester = React.lazy(() => import("./pages/component-library/ComponentTester"));
const IconsPage = React.lazy(() => import("./pages/component-library/Icons"));
const ButtonsPage = React.lazy(() => import("./pages/component-library/Buttons"));
const BadgesPage = React.lazy(() => import("./pages/component-library/Badges"));
const BreadcrumbsPage = React.lazy(() => import("./pages/component-library/Breadcrumbs"));
const LinksPage = React.lazy(() => import("./pages/component-library/Links"));
const LinkButtonsPage = React.lazy(() => import("./pages/component-library/LinkButtons"));
const IconButtonsPage = React.lazy(() => import("./pages/component-library/IconButtons"));
const CheckboxesPage = React.lazy(() => import("./pages/component-library/Checkboxes"));
const RadioButtonsPage = React.lazy(() => import("./pages/component-library/RadioButtons"));
const SelectPage = React.lazy(() => import("./pages/component-library/Select"));
const FormGroupsPage = React.lazy(() => import("./pages/component-library/FormGroups"));
const ChipsPage = React.lazy(() => import("./pages/component-library/Chips"));
const FilterChipsPage = React.lazy(() => import("./pages/component-library/FilterChips"));
const CalloutsPage = React.lazy(() => import("./pages/component-library/Callouts"));
const CardsPage = React.lazy(() => import("./pages/component-library/Cards"));
const AlertsPage = React.lazy(() => import("./pages/component-library/Alerts"));
const ContentMessagesPage = React.lazy(() => import("./pages/component-library/ContentMessages"));
const DateFieldsPage = React.lazy(() => import("./pages/component-library/DateFields"));
const DatePickersPage = React.lazy(() => import("./pages/component-library/DatePickers"));
const DividersPage = React.lazy(() => import("./pages/component-library/Dividers"));
const ListsPage = React.lazy(() => import("./pages/component-library/Lists"));
const ListActionPage = React.lazy(() => import("./pages/component-library/ListAction"));
const ListAssociatePage = React.lazy(() => import("./pages/component-library/ListAssociate"));
const ListTeamPage = React.lazy(() => import("./pages/component-library/ListTeam"));
const ListGoalPage = React.lazy(() => import("./pages/component-library/ListGoal"));
const MagicBoxPage = React.lazy(() => import("./pages/component-library/MagicBox"));
const MenuPage = React.lazy(() => import("./pages/component-library/Menu"));
const MetricsPage = React.lazy(() => import("./pages/component-library/Metrics"));
const ModalsPage = React.lazy(() => import("./pages/component-library/Modals"));
const NudgesPage = React.lazy(() => import("./pages/component-library/Nudges"));
const PanelsPage = React.lazy(() => import("./pages/component-library/Panels"));
const GuidelinesPage = React.lazy(() => import("./pages/component-library/Guidelines"));
const DocIndexPage = React.lazy(() => import("./pages/component-library/DocIndexPage"));
const GettingStartedPage = React.lazy(() => import("./pages/component-library/GettingStarted"));

// Shadcn/Radix component pages (lazy loaded to avoid blocking initial render)
const AccordionPage = React.lazy(() => import("./pages/component-library/Accordion"));
const AlertDialogPage = React.lazy(() => import("./pages/component-library/AlertDialog"));
const AXAvatarPage = React.lazy(() => import("./pages/component-library/AXAvatar"));
const AXAvatarButtonPage = React.lazy(() => import("./pages/component-library/AXAvatarButton"));
const AXAttributePage = React.lazy(() => import("./pages/component-library/AXAttribute"));
const BottomSheetPage = React.lazy(() => import("./pages/component-library/BottomSheet"));
const CalendarPage = React.lazy(() => import("./pages/component-library/Calendar"));
const DateRangePickerPage = React.lazy(() => import("./pages/component-library/DateRangePicker"));
const CarouselPage = React.lazy(() => import("./pages/component-library/Carousel"));
const ChartPage = React.lazy(() => import("./pages/component-library/Chart"));
const CollapsiblePage = React.lazy(() => import("./pages/component-library/Collapsible"));
const CommandPage = React.lazy(() => import("./pages/component-library/Command"));
const ContextMenuPage = React.lazy(() => import("./pages/component-library/ContextMenu"));
const DialogPage = React.lazy(() => import("./pages/component-library/Dialog"));
const DrawerPage = React.lazy(() => import("./pages/component-library/Drawer"));
const DropdownMenuPage = React.lazy(() => import("./pages/component-library/DropdownMenu"));
const FormPage = React.lazy(() => import("./pages/component-library/Form"));
const MenubarPage = React.lazy(() => import("./pages/component-library/Menubar"));
const NavigationMenuPage = React.lazy(() => import("./pages/component-library/NavigationMenu"));
const PaginationPage = React.lazy(() => import("./pages/component-library/Pagination"));
const PopoverPage = React.lazy(() => import("./pages/component-library/Popover"));
const ProgressIndicatorPage = React.lazy(() => import("./pages/component-library/ProgressIndicator"));
const ProgressTrackerPage = React.lazy(() => import("./pages/component-library/ProgressTracker"));
const ScrollAreaPage = React.lazy(() => import("./pages/component-library/ScrollArea"));
const SkeletonPage = React.lazy(() => import("./pages/component-library/Skeleton"));
const SliderPage = React.lazy(() => import("./pages/component-library/Slider"));
const SegmentedControlsPage = React.lazy(() => import("./pages/component-library/SegmentedControls"));
const QuantityStepperPage = React.lazy(() => import("./pages/component-library/QuantityStepperPage"));
const SnackbarsPage = React.lazy(() => import("./pages/component-library/Snackbars"));
const SpinnersPage = React.lazy(() => import("./pages/component-library/Spinners"));
const SpotIconsPage = React.lazy(() => import("./pages/component-library/SpotIcons"));
const SwitchesPage = React.lazy(() => import("./pages/component-library/Switches"));
const TablePage = React.lazy(() => import("./pages/component-library/Table"));
const TabsPage = React.lazy(() => import("./pages/component-library/Tabs"));
const TagsPage = React.lazy(() => import("./pages/component-library/Tags"));
const TextAreaPage = React.lazy(() => import("./pages/component-library/TextArea"));
const TextFieldsPage = React.lazy(() => import("./pages/component-library/TextFields"));
const ThemesPage = React.lazy(() => import("./pages/component-library/Themes"));
const TogglePage = React.lazy(() => import("./pages/component-library/Toggle"));
const DesignTokensPage = React.lazy(() => import("./pages/component-library/DesignTokens"));
const ThemeEditorPage = React.lazy(() => import("./pages/component-library/ThemeEditorPage"));
const FooterPatternsPage = React.lazy(() => import("./pages/component-library/FooterPatterns"));
const SquigglyAgentPage = React.lazy(() => import("./pages/component-library/SquigglyAgentPage"));
const TopNavPage = React.lazy(() => import("./pages/component-library/TopNav"));
const SideNavPage = React.lazy(() => import("./pages/component-library/SideNav"));
const AXButtonGroupsPage = React.lazy(() => import("./pages/component-library/AXButtonGroups"));
const AXFloatingButtonPage = React.lazy(() => import("./pages/component-library/AXFloatingButton"));
const AXRatingPage = React.lazy(() => import("./pages/component-library/AXRating"));
const AXSearchBarPage = React.lazy(() => import("./pages/component-library/AXSearchBar"));
const AXSearchFieldPage = React.lazy(() => import("./pages/component-library/AXSearchField"));
const AXSignatureCapturePage = React.lazy(() => import("./pages/component-library/AXSignatureCapture"));
const AXRichMediaSheetPage = React.lazy(() => import("./pages/component-library/AXRichMediaSheet"));
const AXUploadImagePage = React.lazy(() => import("./pages/component-library/AXUploadImage"));
const AXMetricGroupPage = React.lazy(() => import("./pages/component-library/AXMetricGroup"));
const AXSegmentedControlGroupPage = React.lazy(() => import("./pages/component-library/AXSegmentedControlGroup"));
const IntelligentInsightPage = React.lazy(() => import("./pages/component-library/IntelligentInsight"));
const IntelligentRecommendationPage = React.lazy(() => import("./pages/component-library/IntelligentRecommendation"));
const HeaderSectionPage = React.lazy(() => import("./pages/component-library/HeaderSection"));
const HeaderInstructionalPage = React.lazy(() => import("./pages/component-library/HeaderInstructional"));
const HeaderWidgetPage = React.lazy(() => import("./pages/component-library/HeaderWidget"));
const ProjectSettingsPage = React.lazy(() => import("./pages/component-library/ProjectSettings"));
const FoundationsPage = React.lazy(() => import("./pages/component-library/Foundations"));
const AssetsPage = React.lazy(() => import("./pages/component-library/Assets"));
const LazyFallback = <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>Loading...</div>;

const queryClient = new QueryClient();

// Persist last visited path across full HMR reloads (dev only)
const LAST_PATH_KEY = '__last_visited_path__';
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  try {
    const last = sessionStorage.getItem(LAST_PATH_KEY);
    const current = window.location.pathname + window.location.search + window.location.hash;
    // If the page looks like the dev-server root, restore previous path.
    if (last && (current === '/' || current === '/index.html' || current === '/walmart')) {
      window.history.replaceState(null, '', last);
      sessionStorage.removeItem(LAST_PATH_KEY);
    }
  } catch (e) {
    // ignore sessionStorage errors
  }

  // Save on full unloads
  window.addEventListener('beforeunload', () => {
    try {
      sessionStorage.setItem(LAST_PATH_KEY, window.location.pathname + window.location.search + window.location.hash);
    } catch (e) {}
  });
}

function RouteWatcher() {
  const location = useLocation();
  useEffect(() => {
    try {
      sessionStorage.setItem(LAST_PATH_KEY, location.pathname + location.search + location.hash);
    } catch (e) {}
  }, [location]);
  return null;
}

// Main App component with routing
const App = () => (
  <ThemeProvider>
      <LayoutSettingsProvider>
        <CartProvider>
        <QueryClientProvider client={queryClient}>
      <SnackbarContainer />
      <AgentProvider>
      <MartyProvider>
          <BrowserRouter>
            <React.Suspense fallback={LazyFallback}>
            {import.meta.env.DEV && <RouteWatcher />}
            <Routes>
              {/* Component Library with nested routes */}
              <Route path="/component-library" element={<ComponentLibraryLayout />}>
                <Route index element={<ComponentLibraryOverview />} />
                <Route path="themes" element={<ThemesPage />} />
                <Route path="design-tokens" element={<DesignTokensPage />} />
                <Route path="foundations" element={<FoundationsPage />} />
                <Route path="assets" element={<AssetsPage />} />
                <Route path="component-tester" element={<ComponentTester />} />
                <Route path="icons" element={<IconsPage />} />
                <Route path="buttons" element={<ButtonsPage />} />
                <Route path="badges" element={<BadgesPage />} />
                <Route path="breadcrumbs" element={<BreadcrumbsPage />} />
                <Route path="links" element={<LinksPage />} />
                <Route path="link-buttons" element={<LinkButtonsPage />} />
                <Route path="icon-buttons" element={<IconButtonsPage />} />
                <Route path="checkboxes" element={<CheckboxesPage />} />
                <Route path="radio-buttons" element={<RadioButtonsPage />} />
                <Route path="select" element={<SelectPage />} />
                <Route path="form-groups" element={<FormGroupsPage />} />
                <Route path="chips" element={<ChipsPage />} />
                <Route path="filter-chips" element={<FilterChipsPage />} />
                <Route path="callouts" element={<CalloutsPage />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="content-messages" element={<ContentMessagesPage />} />
                <Route path="date-fields" element={<DateFieldsPage />} />
                <Route path="date-pickers" element={<DatePickersPage />} />
                <Route path="date-range-picker" element={<DateRangePickerPage />} />
                <Route path="dividers" element={<DividersPage />} />
                <Route path="lists" element={<ListsPage />} />
                <Route path="list-action" element={<ListActionPage />} />
                <Route path="list-associate" element={<ListAssociatePage />} />
                <Route path="list-team" element={<ListTeamPage />} />
                <Route path="list-goal" element={<ListGoalPage />} />
                <Route path="magic-box" element={<MagicBoxPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="metrics" element={<MetricsPage />} />
                <Route path="modals" element={<ModalsPage />} />
                <Route path="nudges" element={<NudgesPage />} />
                <Route path="panels" element={<PanelsPage />} />
                <Route path="text-fields" element={<TextFieldsPage />} />
                <Route path="textarea" element={<TextAreaPage />} />
                <Route path="guidelines" element={<GuidelinesPage />} />
                <Route path="doc-index" element={<DocIndexPage />} />
                <Route path="getting-started" element={<GettingStartedPage />} />
                {/* Shadcn/Radix Components */}
                <Route path="accordion" element={<AccordionPage />} />
                <Route path="alert-dialog" element={<AlertDialogPage />} />
                <Route path="ax-avatar" element={<AXAvatarPage />} />
                <Route path="ax-avatar-button" element={<AXAvatarButtonPage />} />
                <Route path="ax-attribute" element={<AXAttributePage />} />
                <Route path="bottom-sheet" element={<BottomSheetPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="carousel" element={<CarouselPage />} />
                <Route path="chart" element={<ChartPage />} />
                <Route path="collapsible" element={<CollapsiblePage />} />
                <Route path="command" element={<CommandPage />} />
                <Route path="context-menu" element={<ContextMenuPage />} />
                <Route path="dialog" element={<DialogPage />} />
                <Route path="drawer" element={<DrawerPage />} />
                <Route path="dropdown-menu" element={<DropdownMenuPage />} />
                <Route path="form" element={<FormPage />} />
                <Route path="menubar" element={<MenubarPage />} />
                <Route path="navigation-menu" element={<NavigationMenuPage />} />
                <Route path="pagination" element={<PaginationPage />} />
                <Route path="popover" element={<PopoverPage />} />
                <Route path="progress-indicator" element={<ProgressIndicatorPage />} />
                <Route path="progress-tracker" element={<ProgressTrackerPage />} />
                <Route path="scroll-area" element={<ScrollAreaPage />} />
                <Route path="skeleton" element={<SkeletonPage />} />
                <Route path="slider" element={<SliderPage />} />
                <Route path="snackbars" element={<SnackbarsPage />} />
                <Route path="spinners" element={<SpinnersPage />} />
                <Route path="spot-icons" element={<SpotIconsPage />} />
                <Route path="segmented-control" element={<SegmentedControlsPage />} />
                <Route path="quantity-stepper" element={<QuantityStepperPage />} />
                <Route path="switches" element={<SwitchesPage />} />
                <Route path="table" element={<TablePage />} />
                <Route path="tabs" element={<TabsPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="toggle" element={<TogglePage />} />
                <Route path="theme-editor" element={<ThemeEditorPage />} />
                <Route path="project-settings" element={<ProjectSettingsPage />} />
                <Route path="footer-patterns" element={<FooterPatternsPage />} />
                <Route path="squiggly-agent" element={<SquigglyAgentPage />} />
                <Route path="top-nav" element={<TopNavPage />} />
                <Route path="side-nav" element={<SideNavPage />} />
                <Route path="ax-button-groups" element={<AXButtonGroupsPage />} />
                <Route path="ax-floating-button" element={<AXFloatingButtonPage />} />
                <Route path="ax-rating" element={<AXRatingPage />} />
                <Route path="ax-search-bar" element={<AXSearchBarPage />} />
                <Route path="ax-search-field" element={<AXSearchFieldPage />} />
                <Route path="ax-signature-capture" element={<AXSignatureCapturePage />} />
                <Route path="ax-rich-media-sheet" element={<AXRichMediaSheetPage />} />
                <Route path="ax-upload-image" element={<AXUploadImagePage />} />
                <Route path="ax-metric-group" element={<AXMetricGroupPage />} />
                <Route path="ax-segmented-control-group" element={<AXSegmentedControlGroupPage />} />
                <Route path="intelligent-insight" element={<IntelligentInsightPage />} />
                <Route path="intelligent-recommendation" element={<IntelligentRecommendationPage />} />
                <Route path="header-section" element={<HeaderSectionPage />} />
                <Route path="header-instructional" element={<HeaderInstructionalPage />} />
                <Route path="header-widget" element={<HeaderWidgetPage />} />
              </Route>

              {/* Home page */}
              <Route path="/" element={<HomePage />} />

              {/* Component library fallback */}
              <Route path="/component-library-redirect" element={<Navigate to="/component-library" replace />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </React.Suspense>
          </BrowserRouter>
        </MartyProvider>
      </AgentProvider>
    </QueryClientProvider>
        </CartProvider>
      </LayoutSettingsProvider>
  </ThemeProvider>
);

const rootElement = document.getElementById("root")!;

// Store the root on the DOM element to persist across HMR
if (!(rootElement as any)._reactRoot) {
  (rootElement as any)._reactRoot = createRoot(rootElement);
}

(rootElement as any)._reactRoot.render(<App />);
