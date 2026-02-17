import "./global.css";

import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SnackbarContainer } from "@/components/ui/SnackbarContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MartyProvider } from "@/contexts/MartyContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import SponsoredSearch from "./pages/SponsoredSearch";
import Campaign from "./pages/Campaign";
import AllCampaigns from "./pages/AllCampaigns";
import AllKeywords from "./pages/AllKeywords";
import KeywordsPlanner from "./pages/KeywordsPlanner";
import ItemHealth from "./pages/ItemHealth";
import OmniROAS from "./pages/OmniROAS";
import DisplayAdvertisingCampaigns from "./pages/DisplayAdvertisingCampaigns";
import SellerCenter from "./pages/SellerCenter";
import StoreAds from "./pages/StoreAds";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ComponentLibraryLayout } from "./components/ComponentLibraryLayout";

// Component library pages
import React from 'react';
import ComponentLibraryOverview from "./pages/component-library/Overview";
import ComponentTester from "./pages/component-library/ComponentTester";
import IconsPage from "./pages/component-library/Icons";
import ButtonsPage from "./pages/component-library/Buttons";
import BadgesPage from "./pages/component-library/Badges";
import BreadcrumbsPage from "./pages/component-library/Breadcrumbs";
import LinksPage from "./pages/component-library/Links";
import LinkButtonsPage from "./pages/component-library/LinkButtons";
import IconButtonsPage from "./pages/component-library/IconButtons";
import CheckboxesPage from "./pages/component-library/Checkboxes";
import RadioButtonsPage from "./pages/component-library/RadioButtons";
import SelectPage from "./pages/component-library/Select";
import FormGroupsPage from "./pages/component-library/FormGroups";
import ChipsPage from "./pages/component-library/Chips";
import FilterChipsPage from "./pages/component-library/FilterChips";
import CalloutsPage from "./pages/component-library/Callouts";
import CardsPage from "./pages/component-library/Cards";
import AlertsPage from "./pages/component-library/Alerts";
import ContentMessagesPage from "./pages/component-library/ContentMessages";
import DateFieldsPage from "./pages/component-library/DateFields";
import DatePickersPage from "./pages/component-library/DatePickers";
import DividersPage from "./pages/component-library/Dividers";
import ListsPage from "./pages/component-library/Lists";
import MagicBoxPage from "./pages/component-library/MagicBox";
import MenuPage from "./pages/component-library/Menu";
import MetricsPage from "./pages/component-library/Metrics";
import ModalsPage from "./pages/component-library/Modals";
import NudgesPage from "./pages/component-library/Nudges";
import PanelsPage from "./pages/component-library/Panels";
import GuidelinesPage from "./pages/component-library/Guidelines";

// Shadcn/Radix component pages
import AccordionPage from "./pages/component-library/Accordion";
import AlertDialogPage from "./pages/component-library/AlertDialog";
import AvatarPage from "./pages/component-library/Avatar";
import CalendarPage from "./pages/component-library/Calendar";
import CarouselPage from "./pages/component-library/Carousel";
import ChartPage from "./pages/component-library/Chart";
import CollapsiblePage from "./pages/component-library/Collapsible";
import CommandPage from "./pages/component-library/Command";
import ContextMenuPage from "./pages/component-library/ContextMenu";
import DialogPage from "./pages/component-library/Dialog";
import DrawerPage from "./pages/component-library/Drawer";
import DropdownMenuPage from "./pages/component-library/DropdownMenu";
import FormPage from "./pages/component-library/Form";
import HoverCardPage from "./pages/component-library/HoverCard";
import InputPage from "./pages/component-library/Input";
import LabelPage from "./pages/component-library/Label";
import MenubarPage from "./pages/component-library/Menubar";
import NavigationMenuPage from "./pages/component-library/NavigationMenu";
import PaginationPage from "./pages/component-library/Pagination";
import PopoverPage from "./pages/component-library/Popover";
import ProgressPage from "./pages/component-library/Progress";
import ProgressIndicatorPage from "./pages/component-library/ProgressIndicator";
import ProgressTrackerPage from "./pages/component-library/ProgressTracker";
import RadioGroupPage from "./pages/component-library/RadioGroup";
import ScrollAreaPage from "./pages/component-library/ScrollArea";
import SeparatorPage from "./pages/component-library/Separator";
import SheetPage from "./pages/component-library/Sheet";
import SkeletonPage from "./pages/component-library/Skeleton";
import SliderPage from "./pages/component-library/Slider";
import SnackbarsPage from "./pages/component-library/Snackbars";
import SpinnersPage from "./pages/component-library/Spinners";
import SpotIconsPage from "./pages/component-library/SpotIcons";
import SwitchPage from "./pages/component-library/Switch";
import SwitchesPage from "./pages/component-library/Switches";
import TablePage from "./pages/component-library/Table";
import TabsPage from "./pages/component-library/Tabs";
import TagsPage from "./pages/component-library/Tags";
import TextAreaPage from "./pages/component-library/TextArea";
import TextFieldsPage from "./pages/component-library/TextFields";
import ThemesPage from "./pages/component-library/Themes";
import ToastPage from "./pages/component-library/Toast";
import TogglePage from "./pages/component-library/Toggle";
import TooltipPage from "./pages/component-library/Tooltip";

const queryClient = new QueryClient();

// Main App component with routing
const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <SnackbarContainer />
        <MartyProvider>
          <BrowserRouter>
            <Routes>
              {/* Component Library with nested routes */}
              <Route path="/component-library" element={<ComponentLibraryLayout />}>
                <Route index element={<ComponentLibraryOverview />} />
                <Route path="themes" element={
                  <React.Suspense fallback={<div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>}>
                    <ThemesPage />
                  </React.Suspense>
                } />
                <Route path="component-tester" element={
                  <React.Suspense fallback={<div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>}>
                    <ComponentTester />
                  </React.Suspense>
                } />
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
                <Route path="dividers" element={<DividersPage />} />
                <Route path="lists" element={<ListsPage />} />
                <Route path="magic-box" element={<MagicBoxPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="metrics" element={<MetricsPage />} />
                <Route path="modals" element={<ModalsPage />} />
                <Route path="nudges" element={<NudgesPage />} />
                <Route path="panels" element={<PanelsPage />} />
                <Route path="text-fields" element={<TextFieldsPage />} />
                <Route path="textarea" element={<TextAreaPage />} />
                <Route path="guidelines" element={<GuidelinesPage />} />
                {/* Shadcn/Radix Components */}
                <Route path="accordion" element={<AccordionPage />} />
                <Route path="alert-dialog" element={<AlertDialogPage />} />
                <Route path="avatar" element={<AvatarPage />} />
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
                <Route path="hover-card" element={<HoverCardPage />} />
                <Route path="input" element={<InputPage />} />
                <Route path="label" element={<LabelPage />} />
                <Route path="menubar" element={<MenubarPage />} />
                <Route path="navigation-menu" element={<NavigationMenuPage />} />
                <Route path="pagination" element={<PaginationPage />} />
                <Route path="popover" element={<PopoverPage />} />
                <Route path="progress" element={<ProgressPage />} />
                <Route path="progress-indicator" element={<ProgressIndicatorPage />} />
                <Route path="progress-tracker" element={<ProgressTrackerPage />} />
                <Route path="radio-group" element={<RadioGroupPage />} />
                <Route path="scroll-area" element={<ScrollAreaPage />} />
                <Route path="separator" element={<SeparatorPage />} />
                <Route path="sheet" element={<SheetPage />} />
                <Route path="skeleton" element={<SkeletonPage />} />
                <Route path="slider" element={<SliderPage />} />
                <Route path="snackbars" element={<SnackbarsPage />} />
                <Route path="spinners" element={<SpinnersPage />} />
                <Route path="spot-icons" element={<SpotIconsPage />} />
                <Route path="switch" element={<SwitchPage />} />
                <Route path="switches" element={<SwitchesPage />} />
                <Route path="table" element={<TablePage />} />
                <Route path="tabs" element={<TabsPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="toast" element={<ToastPage />} />
                <Route path="toggle" element={<TogglePage />} />
                <Route path="tooltip" element={<TooltipPage />} />
              </Route>

              <Route path="/" element={<Index />} />
              <Route path="/sponsored-search" element={<SponsoredSearch />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/all-campaigns" element={<AllCampaigns />} />
              <Route path="/all-keywords" element={<AllKeywords />} />
              <Route path="/keywords-planner" element={<KeywordsPlanner />} />
              <Route path="/reports/item-health" element={<ItemHealth />} />
              <Route path="/reports/omni-roas" element={<OmniROAS />} />
              <Route path="/display-advertising/campaigns" element={<DisplayAdvertisingCampaigns />} />
              <Route path="/seller-center" element={<SellerCenter />} />
              <Route path="/store-ads" element={<StoreAds />} />
              <Route path="/store-ads/campaigns" element={<StoreAds />} />
              <Route path="/store-ads/performance" element={<StoreAds />} />
              <Route path="/store-ads/inventory" element={<StoreAds />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MartyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

const rootElement = document.getElementById("root")!;

// Store the root on the DOM element to persist across HMR
if (!(rootElement as any)._reactRoot) {
  (rootElement as any)._reactRoot = createRoot(rootElement);
}

(rootElement as any)._reactRoot.render(<App />);
