import React, { useState } from "react";
import { MastHead } from "../components/ui/MastHead";
import { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { useNavigate } from "react-router-dom";
import SponsoredSearchDashboard from "../features/sponsored-search/SponsoredSearchDashboard";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";

export default function SponsoredSearch() {
  const navigate = useNavigate();
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');
  const [showMartyPanel] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <MastHead 
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />


      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <SponsoredSearchSidebar />
        <main className="flex-1 overflow-y-auto">
          <SponsoredSearchDashboard />
        </main>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
