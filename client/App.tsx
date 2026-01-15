import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SponsoredSearch from "./pages/SponsoredSearch";
import Campaign from "./pages/Campaign";
import AllCampaigns from "./pages/AllCampaigns";
import AllKeywords from "./pages/AllKeywords";
import KeywordsPlanner from "./pages/KeywordsPlanner";
import ItemHealth from "./pages/ItemHealth";
import DisplayAdvertisingCampaigns from "./pages/DisplayAdvertisingCampaigns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Main App component with routing
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sponsored-search" element={<SponsoredSearch />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/all-campaigns" element={<AllCampaigns />} />
          <Route path="/all-keywords" element={<AllKeywords />} />
          <Route path="/keywords-planner" element={<KeywordsPlanner />} />
          <Route path="/reports/item-health" element={<ItemHealth />} />
          <Route path="/display-advertising/campaigns" element={<DisplayAdvertisingCampaigns />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const rootElement = document.getElementById("root")!;

// Store the root on the DOM element to persist across HMR
if (!(rootElement as any)._reactRoot) {
  (rootElement as any)._reactRoot = createRoot(rootElement);
}

(rootElement as any)._reactRoot.render(<App />);
