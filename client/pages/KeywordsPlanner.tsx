import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { Card } from "../components/ui/Card";
import { CardHeader } from "../components/ui/CardHeader";
import { CardContent } from "../components/ui/CardContent";
import { Button } from "../components/ui/Button";

export default function KeywordsPlanner() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');

  return (
    <div className="flex h-screen bg-ld-main overflow-hidden">
      <SponsoredSearchSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 bg-[var(--ld-semantic-color-action-fill-primary)] flex items-center justify-between px-6 flex-shrink-0">
          {/* Left section */}
          <div className="flex items-center gap-6">
            {/* Walmart logo */}
            <svg width="116" height="26" viewBox="0 0 116 26" fill="none" className="flex-shrink-0">
              <path d="M12.9999 0.333344L16.4166 10.8333L27.6666 10.8333L18.6249 17.5L22.0416 28L12.9999 21.3333L3.95825 28L7.37492 17.5L-1.66675 10.8333L9.58325 10.8333L12.9999 0.333344Z" fill="#FFC220"/>
              <text x="32" y="20" fill="white" style={{ fontFamily: 'Bogle, Arial, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Walmart</text>
            </svg>

            {/* Media Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMediaSolutionsOpen(!mediaSolutionsOpen)}
                className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-1.5 rounded transition-colors"
              >
                <span className="font-medium">{selectedMediaSolution}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {mediaSolutionsOpen && (
                <div className="absolute top-full left-0 mt-1 bg-ld-main rounded shadow-lg py-1 min-w-[200px] z-50">
                  {mediaSolutions.map((solution) => (
                    <button
                      key={solution}
                      onClick={() => {
                        setSelectedMediaSolution(solution);
                        setMediaSolutionsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover-ld-gray text-ld-primary"
                    >
                      {solution}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <button className="text-[var(--ld-semantic-color-text-inverse)] hover:bg-white/10 p-2 rounded transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-[var(--ld-semantic-color-text-inverse)] hover:bg-white/10 p-2 rounded transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="text-[var(--ld-semantic-color-text-inverse)] hover:bg-white/10 p-2 rounded transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-ld-subtle">
          <div className="max-w-7xl mx-auto p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-ld-primary mb-2">Keywords Planner</h1>
              <p className="text-ld-subtle">
                Plan and discover new keywords for your campaigns
              </p>
            </div>

            {/* Placeholder content */}
            <div className="bg-ld-main rounded-lg shadow p-8 text-center mb-6">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Keywords Planner
                </h2>
                <p className="text-gray-600 mb-6">
                  This feature is coming soon. Use the Keywords Planner to discover new keyword opportunities and plan your keyword strategy.
                </p>
              </div>
            </div>

            {/* Living Design Card with CardHeader */}
            <Card size="large">
              <CardHeader
                leadingIcon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6m-6 4h6" />
                  </svg>
                }
                title="Keyword Research Tools"
                trailing={
                  <Button variant="primary" size="small">
                    Get Started
                  </Button>
                }
              />
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Discover high-performing keywords for your Walmart Sponsored Search campaigns.
                  Our keyword research tools help you identify trending search terms, analyze competition,
                  and optimize your keyword strategy for better campaign performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Keyword Discovery</h4>
                    <p className="text-sm text-gray-600">
                      Find new keyword opportunities based on search volume and relevance
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Competition Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Analyze keyword difficulty and competitive landscape
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Tracking</h4>
                    <p className="text-sm text-gray-600">
                      Monitor keyword performance and ROI across campaigns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
