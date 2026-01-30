import { useState } from "react";
import { ChevronDown, ChevronUp, Bell, HelpCircle, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../components/MartyFloatingPanel";
import StoreAdsSidebar from "../components/StoreAdsSidebar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "../components/ui/Button";

export default function StoreAds() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useLocalStorage('marty:minimized', false);
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState('Store Ads');
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleCreateCampaign = () => {
    setIsMartyMinimized(false);
    // Marty panel will handle the campaign creation flow
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
        <header className="h-12 px-4 border-b border-[#E3E4E5] bg-white flex items-center justify-between flex-shrink-0">
          {/* Left side - Logo */}
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.7678 11.9998C23.7678 5.4846 18.518 0.234802 12.0027 0.234802C5.48752 0.234802 0.237732 5.4846 0.237732 11.9998C0.237732 18.515 5.48752 23.7648 12.0027 23.7648C18.518 23.7648 23.7678 18.515 23.7678 11.9998Z" fill="#FFC220"/>
              <path d="M7.80732 6.14479L11.5623 9.89979L15.3173 6.14479C16.2798 5.18229 17.8123 5.18229 18.7748 6.14479C19.7373 7.10729 19.7373 8.63979 18.7748 9.60229L15.0198 13.3573L18.7748 17.1123C19.7373 18.0748 19.7373 19.6073 18.7748 20.5698C17.8123 21.5323 16.2798 21.5323 15.3173 20.5698L11.5623 16.8148L7.80732 20.5698C6.84482 21.5323 5.31232 21.5323 4.34982 20.5698C3.38732 19.6073 3.38732 18.0748 4.34982 17.1123L8.10482 13.3573L4.34982 9.60229C3.38732 8.63979 3.38732 7.10729 4.34982 6.14479C5.31232 5.18229 6.84482 5.18229 7.80732 6.14479Z" fill="#0071DC"/>
            </svg>
            <span className="font-bold text-base text-[#2E2F32]">Walmart Connect</span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            {/* Media Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMediaSolutionsOpen(!mediaSolutionsOpen)}
                className="flex items-center gap-2 px-3 h-8 rounded border border-[#74767C] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-[#2E2F32]">{selectedMediaSolution}</span>
                {mediaSolutionsOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#2E2F32]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
                )}
              </button>

              {mediaSolutionsOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E3E4E5] rounded-lg shadow-lg z-50">
                  <div className="p-2 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setSelectedMediaSolution('Sponsored Search');
                        setMediaSolutionsOpen(false);
                        navigate('/sponsored-search');
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#F2F2F3] transition-colors text-left"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#0071DC" />
                      </svg>
                      <span className="text-xs text-[#2E2F32] text-center">Sponsored Search</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMediaSolution('Display Advertising');
                        setMediaSolutionsOpen(false);
                        navigate('/');
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#F2F2F3] transition-colors text-left"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="2" fill="#9170FE" />
                      </svg>
                      <span className="text-xs text-[#2E2F32] text-center">Display Advertising</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMediaSolution('Store Ads');
                        setMediaSolutionsOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded bg-[#E9F1FE] transition-colors text-left"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="#FFC220" />
                      </svg>
                      <span className="text-xs text-[#2E2F32] text-center">Store Ads</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-[#2E2F32]" />
            </button>

            {/* Help */}
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-5 h-5 text-[#2E2F32]" />
            </button>

            {/* User Profile */}
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-[#2E2F32]" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F2F2F3] p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#2E2F32] mb-3">Welcome to Store Ads</h1>
              <p className="text-lg text-[#74767C] mb-6">
                Reach customers where they shop, both in-store and online
              </p>
              <Button
                variant="primary"
                size="large"
                onClick={handleCreateCampaign}
              >
                Create campaign
              </Button>
            </div>

            {/* Feature Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Tile 1 */}
              <button
                onClick={() => navigate('/store-ads/campaigns')}
                className="group bg-white rounded-lg p-6 border border-[#E3E4E5] hover:border-[#0071DC] hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FFF3CD] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7V12C2 16.55 5.84 20.74 10.35 21.87C11.21 22.04 12.79 22.04 13.65 21.87C18.16 20.74 22 16.55 22 12V7L12 2Z" fill="#FFC220"/>
                    </svg>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#74767C] group-hover:text-[#0071DC] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-[#2E2F32] mb-2">Your products, seen by millions</h3>
                <p className="text-sm text-[#74767C]">
                  Showcase your products to millions of Walmart shoppers across stores and online.
                </p>
              </button>

              {/* Tile 2 */}
              <button
                onClick={() => navigate('/store-ads/performance')}
                className="group bg-white rounded-lg p-6 border border-[#E3E4E5] hover:border-[#0071DC] hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D9F0FF] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3V17C3 18.1 3.9 19 5 19H21V21H5C2.79 21 1 19.21 1 17V3H3ZM19 7V9H21V7H19ZM19 11V13H21V11H19ZM19 15V17H21V15H19ZM7 17H17V7H7V17ZM15 9V15H9V9H15Z" fill="#0071DC"/>
                    </svg>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#74767C] group-hover:text-[#0071DC] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-[#2E2F32] mb-2">Brand experiences, built your way</h3>
                <p className="text-sm text-[#74767C]">
                  Create custom brand experiences that drive engagement and sales.
                </p>
              </button>

              {/* Tile 3 */}
              <button
                onClick={() => navigate('/store-ads/inventory')}
                className="group bg-white rounded-lg p-6 border border-[#E3E4E5] hover:border-[#0071DC] hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E9F1FE] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 8H17V4H3V20H20V8ZM5 18V6H15V8H5V18ZM19 18H7V10H19V18Z" fill="#0053E2"/>
                    </svg>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#74767C] group-hover:text-[#0071DC] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-[#2E2F32] mb-2">Manage your inventory</h3>
                <p className="text-sm text-[#74767C]">
                  Keep track of your product inventory and optimize stock levels.
                </p>
              </button>
            </div>

            {/* Quick Stats Section */}
            <div className="bg-white rounded-lg p-6 border border-[#E3E4E5]">
              <h2 className="text-xl font-bold text-[#2E2F32] mb-4">Get started with Store Ads</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#E9F1FE] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0053E2]">1</span>
                    </div>
                    <h3 className="font-bold text-[#2E2F32]">Set up your campaign</h3>
                  </div>
                  <p className="text-sm text-[#74767C] ml-10">
                    Define your goals, budget, and target audience
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#E9F1FE] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0053E2]">2</span>
                    </div>
                    <h3 className="font-bold text-[#2E2F32]">Choose your products</h3>
                  </div>
                  <p className="text-sm text-[#74767C] ml-10">
                    Select which products to feature in your campaign
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#E9F1FE] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0053E2]">3</span>
                    </div>
                    <h3 className="font-bold text-[#2E2F32]">Track performance</h3>
                  </div>
                  <p className="text-sm text-[#74767C] ml-10">
                    Monitor your campaign results and optimize for success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && (
        <MartyFloatingPanel
          isMinimized={isMartyMinimized}
          onMinimizedChange={setIsMartyMinimized}
        />
      )}
    </div>
  );
}
