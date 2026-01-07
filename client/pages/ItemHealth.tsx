import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SponsoredSearchSidebar from "../components/SponsoredSearchSidebar";
import MartyFloatingPanel from "../components/MartyFloatingPanel";

interface ItemHealthData {
  itemImage: string;
  itemId: string;
  campaignIds: string[];
  adGroupIds: string[];
  primaryVariant: string;
  itemStatus: string;
  productDetailPageViewsToday: number;
  productDetailPageViewsLast7Days: number;
  itemAvailableToday: string;
  itemAvailableLast7Days: string;
  buyBoxWinRateToday: string;
  buyBoxWinRateLast7Days: string;
}

export default function ItemHealth() {
  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useState(false);

  const itemHealthData: ItemHealthData[] = [
    {
      itemImage: "📦",
      itemId: "1750942750",
      campaignIds: ["432081"],
      adGroupIds: ["580546"],
      primaryVariant: "1750942750",
      itemStatus: "Published",
      productDetailPageViewsToday: 4956,
      productDetailPageViewsLast7Days: 51124,
      itemAvailableToday: "96.74%",
      itemAvailableLast7Days: "93.57%",
      buyBoxWinRateToday: "96.75%",
      buyBoxWinRateLast7Days: "96.66%"
    },
    {
      itemImage: "📦",
      itemId: "875633804",
      campaignIds: ["3920037"],
      adGroupIds: ["4934907"],
      primaryVariant: "875633804",
      itemStatus: "Published",
      productDetailPageViewsToday: 4543,
      productDetailPageViewsLast7Days: 57267,
      itemAvailableToday: "99.68%",
      itemAvailableLast7Days: "99.83%",
      buyBoxWinRateToday: "100%",
      buyBoxWinRateLast7Days: "99.98%"
    },
    {
      itemImage: "📦",
      itemId: "1566660392",
      campaignIds: ["4001729", "4345285", "3920926", "3225492"],
      adGroupIds: ["4834896", "4706485", "3692926", "3387680"],
      primaryVariant: "1566660392",
      itemStatus: "Published",
      productDetailPageViewsToday: 3275,
      productDetailPageViewsLast7Days: 40379,
      itemAvailableToday: "99.68%",
      itemAvailableLast7Days: "99.85%",
      buyBoxWinRateToday: "97.22%",
      buyBoxWinRateLast7Days: "98.48%"
    },
    {
      itemImage: "📦",
      itemId: "3452723904",
      campaignIds: ["4001729", "3920926", "3225492"],
      adGroupIds: ["4834896", "4706485", "3692214"],
      primaryVariant: "3452723904",
      itemStatus: "Published",
      productDetailPageViewsToday: 2331,
      productDetailPageViewsLast7Days: 30360,
      itemAvailableToday: "100%",
      itemAvailableLast7Days: "99.83%",
      buyBoxWinRateToday: "100%",
      buyBoxWinRateLast7Days: "99.95%"
    },
    {
      itemImage: "📦",
      itemId: "1403322750",
      campaignIds: ["4345285", "4001729", "4706485"],
      adGroupIds: ["4834896", "4706485"],
      primaryVariant: "1403322750",
      itemStatus: "zoom us Published",
      productDetailPageViewsToday: 2352,
      productDetailPageViewsLast7Days: 30353,
      itemAvailableToday: "99.49%",
      itemAvailableLast7Days: "99.62%",
      buyBoxWinRateToday: "98.33%",
      buyBoxWinRateLast7Days: "100%"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col">
      {/* Header */}
      <header className="h-[54px] border-b border-[#E3E4E5] flex items-center justify-between px-6 bg-white">
        <div className="flex items-center gap-5">
          {/* App Switcher */}
          <button className="w-6 h-6 p-1 rounded-full hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="0" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="0" y="10" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="5" y="10" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="0" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="5" width="2" height="2" fill="#2E2F32"/>
              <rect x="10" y="10" width="2" height="2" fill="#2E2F32"/>
            </svg>
          </button>
          
          {/* Logo */}
          <div className="h-[14px]">
            <svg width="241" height="14" viewBox="0 0 241 14" fill="none">
              <path d="M14.3131 0.262451L12.5653 9.03428L10.6022 0.262451H7.19181L5.22872 9.03428L3.48087 0.262451H0L2.83702 13.6607H6.88937L8.86916 4.76444L10.8508 13.6607H14.8141L17.6326 0.262451H14.3131Z" fill="#001F64"/>
            </svg>
          </div>

          <div className="relative">
            <button className="flex items-center gap-1 text-xs">
              <span className="text-[#2E2F32]">Walmart Connect</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="w-px h-[22px] bg-gray-300"></div>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#2E2F32]">Coca Cola</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="w-px h-[22px] bg-gray-300"></div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        
        <div className="flex-1 overflow-y-auto">
          {/* Page Content */}
          <div className="bg-white p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-[28px] font-bold text-[#2E2F32]">Item Health</h1>
              <button className="px-4 h-10 border border-[#74767C] rounded text-sm text-[#2E2F32] hover:bg-gray-50">
                Export to CSV
              </button>
            </div>

            {/* Date Range Info */}
            <div className="mb-4">
              <p className="text-sm text-[#2E2F32]">
                <strong>Item Health on as of live date, date range: 12/30/2025 - 1/6/2025</strong>
              </p>
              <p className="text-sm text-[#2E2F32]">
                *'Report only shows enabled items that have been live for at least 3 days
              </p>
              <p className="text-sm text-[#2E2F32]">
                **The start below is from Walmart internally
              </p>
            </div>

            {/* Link */}
            <div className="mb-4">
              <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline">
                Need to improve your item health? Refer to our recommended actions guide sheet
              </a>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm text-[#2E2F32]">Item Status (2)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm text-[#2E2F32]">All Campaigns (13)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm text-[#2E2F32]">All Ad Groups (13)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F8F8F8] border-t border-b border-[#E3E4E5]">
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Item Image</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Item ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Campaign ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Ad Group ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Primary Variant</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Item Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Product Detail Page Views Today</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Product Detail Page Views in Last 7 Days</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Item Available Today</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Item Available in Last 7 Days</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Buy Box Win Rate Today</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-[#2E2F32]">Buy Box Win Rate in Last 7 Days</th>
                  </tr>
                </thead>
                <tbody>
                  {itemHealthData.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#E3E4E5] hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-2xl">
                          {item.itemImage}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32] underline cursor-pointer hover:no-underline">
                        {item.itemId}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {item.campaignIds.map((id, i) => (
                            <span key={i} className="text-sm text-[#2E2F32] underline cursor-pointer hover:no-underline">
                              {id}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {item.adGroupIds.map((id, i) => (
                            <span key={i} className="text-sm text-[#2E2F32] underline cursor-pointer hover:no-underline">
                              {id}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.primaryVariant}</td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.itemStatus}</td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.productDetailPageViewsToday.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.productDetailPageViewsLast7Days.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.itemAvailableToday}</td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.itemAvailableLast7Days}</td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.buyBoxWinRateToday}</td>
                      <td className="px-4 py-3 text-sm text-[#2E2F32]">{item.buyBoxWinRateLast7Days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Marty Panel */}
        {showMartyPanel && (
          <MartyFloatingPanel 
            isMinimized={isMartyMinimized}
            onToggleMinimize={() => setIsMartyMinimized(!isMartyMinimized)}
          />
        )}
      </div>
    </div>
  );
}
