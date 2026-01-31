import React, { useState } from "react";
import { MastHead } from "../components/ui/MastHead";
import { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { useNavigate } from "react-router-dom";
import SponsoredSearchDashboard from "../components/SponsoredSearchDashboard";
import SponsoredSearchSidebar from "../components/SponsoredSearchSidebar";
import MartyFloatingPanel from "../components/MartyFloatingPanel";

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
      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        <main className="flex-1 h-auto overflow-y-auto">
          <SponsoredSearchDashboard />
        </main>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
