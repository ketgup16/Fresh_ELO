import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../components/MartyFloatingPanel";
import StoreAdsSidebar from "../components/StoreAdsSidebar";
import { Button } from "../components/ui/Button";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

export default function StoreAds() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Store Ads');
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleCreateCampaign = () => {
    // Marty panel will handle the campaign creation flow
    // Marty state is now managed by MartyContext
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <StoreAdsSidebar
        activeMenuItem={activeMenuItem}
        onMenuItemClick={handleMenuItemClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <MastHead 
          companyName="Coca Cola"
          currentSolution={selectedMediaSolution}
          onSolutionChange={setSelectedMediaSolution}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#EDF4FA]">
          {/* Hero Section */}
          <div className="bg-[#EDF4FA] px-8 py-16">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-[#2E2F32] mb-4">
                Reach more customers with Store Ads
              </h1>
              <p className="text-xl text-[#2E2F32] mb-8">
                Show off your brand with digital ads across 4,700 stores.
              </p>
              <Button
                variant="primary"
                size="large"
                onClick={handleCreateCampaign}
              >
                Create campaign
              </Button>
            </div>
          </div>

          {/* Feature Cards Section */}
          <div className="bg-white px-8 py-12">
            <div className="max-w-6xl mx-auto">
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Your products, seen by millions */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M21 8C21 5.79086 22.7909 4 25 4H39C41.2091 4 43 5.79086 43 8V33C43 35.2091 41.2091 37 39 37H25C22.7909 37 21 35.2091 21 33V8Z" fill="#0071DC"/>
                        <circle cx="32" cy="21" r="2" fill="white"/>
                        <circle cx="32" cy="28" r="2" fill="white"/>
                        <rect x="5" y="22" width="12" height="19" rx="2" fill="#FFC220"/>
                        <path d="M11 30C11 29.4477 11.4477 29 12 29C12.5523 29 13 29.4477 13 30V35C13 35.5523 12.5523 36 12 36C11.4477 36 11 35.5523 11 35V30Z" fill="#2E2F32"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        Your products, seen by millions
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Don't miss billions of online traffic. Multiply your growth with online advertising.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Start advertising
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 2: Brand experiences */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="12" y="16" width="24" height="24" rx="2" fill="#FFC220"/>
                        <path d="M24 8L30 14H18L24 8Z" fill="#0071DC"/>
                        <circle cx="18" cy="24" r="2" fill="#0071DC"/>
                        <rect x="22" y="22" width="8" height="4" rx="1" fill="#0071DC"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        Brand experiences, built your way
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Create immersive pages that tell your story, reach more customers.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Create your shop
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 3: Walmart Luminate */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="28" width="6" height="12" rx="1" fill="#7B61FF"/>
                        <rect x="17" y="20" width="6" height="20" rx="1" fill="#0071DC"/>
                        <rect x="26" y="12" width="6" height="28" rx="1" fill="#FFC220"/>
                        <rect x="35" y="16" width="6" height="24" rx="1" fill="#2ED47A"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[#2E2F32]">
                          Walmart Luminate
                        </h3>
                        <span className="bg-[#2ED47A] text-white text-xs font-bold px-2 py-0.5 rounded">
                          New
                        </span>
                      </div>
                      <p className="text-sm text-[#74767C] mb-3">
                        Gain deeper insights and opportunities that help optimizing your Store Ads campaigns.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Discover more
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 4: Helpful how-to's */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="10" y="8" width="28" height="32" rx="2" fill="#FFE5B4"/>
                        <rect x="14" y="14" width="20" height="2" rx="1" fill="#0071DC"/>
                        <rect x="14" y="20" width="16" height="2" rx="1" fill="#0071DC"/>
                        <rect x="14" y="26" width="18" height="2" rx="1" fill="#0071DC"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        Helpful how-to's
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Don't miss billions of online traffic. Multiply your growth with online advertising.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Get guidance
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 5: On-demand instruction */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="12" width="32" height="24" rx="2" fill="#FFE5B4"/>
                        <path d="M8 12C8 10.8954 8.89543 10 10 10H38C39.1046 10 40 10.8954 40 12V16H8V12Z" fill="#FFC220"/>
                        <rect x="12" y="20" width="24" height="12" rx="1" fill="white"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        On-demand instruction
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Access our Seller Academy on Youtube for video walkthroughs.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Subscribe
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card 6: What makes an eye-catching video */}
                <div className="bg-white border border-[#E3E4E5] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="14" width="32" height="20" rx="2" fill="#2E2F32"/>
                        <path d="M20 20L28 24L20 28V20Z" fill="#FFC220"/>
                        <rect x="10" y="36" width="4" height="4" rx="1" fill="#0071DC"/>
                        <rect x="16" y="36" width="4" height="4" rx="1" fill="#0071DC"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2E2F32] mb-2">
                        What makes an eye-catching video
                      </h3>
                      <p className="text-sm text-[#74767C] mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing eli.
                      </p>
                      <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="text-sm underline hover:no-underline">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-[#E3E4E5]">
                <p className="text-xs text-[#74767C] text-center">
                  © 2000–2023 Wal-Mart Stores, Inc. All Rights reserved. <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="hover:underline">Privacy</a> and <a href="#" style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="hover:underline">Terms</a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
