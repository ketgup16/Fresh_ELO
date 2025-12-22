import { useState } from "react";
import { ChevronDown, Bell, HelpCircle, User, MessageSquare, Calendar, Filter, Download, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../components/MartyFloatingPanel";
import SponsoredSearchSidebar from "../components/SponsoredSearchSidebar";

export default function AllCampaigns() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col">
      {/* Header */}
      <header className="h-[48px] border-b border-[#E3E4E5] flex items-center justify-between px-5 bg-white">
        <div className="flex items-center gap-5">
          {/* App Switcher Icon */}
          <button className="flex items-center justify-center w-6 h-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect width="2" height="2" fill="#2E2F32" />
              <rect y="5" width="2" height="2" fill="#2E2F32" />
              <rect y="10" width="2" height="2" fill="#2E2F32" />
              <rect x="5" width="2" height="2" fill="#2E2F32" />
              <rect x="5" y="5" width="2" height="2" fill="#2E2F32" />
              <rect x="5" y="10" width="2" height="2" fill="#2E2F32" />
              <rect x="10" width="2" height="2" fill="#2E2F32" />
              <rect x="10" y="5" width="2" height="2" fill="#2E2F32" />
              <rect x="10" y="10" width="2" height="2" fill="#2E2F32" />
            </svg>
          </button>
          
          {/* Logo */}
          <div className="h-[14px]">
            <svg width="151" height="14" viewBox="0 0 151 14" fill="none">
              <path d="M21.8916 2.46582C24.8198 2.46582 26.3895 3.80498 26.3896 6.82422V13.3984H23.0703V12.0264C22.5655 12.9863 21.6466 13.7012 20.1064 13.7012C18.2676 13.7011 17.0001 12.5757 17 10.6465C17 8.55736 18.3922 7.6802 20.8027 7.18066C22.391 6.84088 22.9629 6.62745 22.9629 6.09082C22.9628 5.46702 22.5502 5.16211 21.4443 5.16211C19.6593 5.16217 18.3032 6.00229 17.6611 6.57422V3.71582C18.2162 3.19775 19.732 2.46586 21.8916 2.46582ZM53.5781 2.46582C56.5063 2.46582 58.0761 3.80498 58.0762 6.82422V13.3984H54.7568V12.0264C54.2521 12.9863 53.3331 13.7012 51.793 13.7012C49.9541 13.7011 48.6866 12.5757 48.6865 10.6465C48.6865 8.55736 50.0787 7.6802 52.4893 7.18066C54.0775 6.84088 54.6494 6.62745 54.6494 6.09082C54.6493 5.46702 54.2367 5.16211 53.1309 5.16211C51.3458 5.16217 49.9897 6.00229 49.3477 6.57422V3.71582C49.9027 3.19774 51.4185 2.46585 53.5781 2.46582ZM70.5723 0.75V2.80371H72.7676V5.4834L72.7695 5.48535H70.5742V9.37891C70.5742 10.5042 71.0736 10.8447 71.8418 10.8262C72.2518 10.8262 72.5728 10.7181 72.7695 10.5752V13.2363C72.5189 13.3979 71.9473 13.6113 70.877 13.6113C68.5741 13.6113 67.128 12.4135 67.1279 9.86035V0.75H70.5723Z" fill="#001E60"/>
            </svg>
            <svg width="72" height="14" viewBox="0 0 72 14" fill="none" className="ml-2 inline-block">
              <path d="M50.2939 2.7207C53.263 2.72073 55.4098 4.61818 55.124 9.18262H48.3789C48.6294 10.6867 49.5775 11.3476 51.4385 11.3477C52.7447 11.3477 53.979 10.9544 54.623 10.4346V13.1377C54.1759 13.5128 52.816 13.998 51.0996 13.998V14C47.2529 14 45.0167 11.8699 45.0166 8.36035C45.0166 4.85063 47.3248 2.7207 50.2939 2.7207Z" fill="#4DBDF5"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white">
            <span className="text-xs text-[#2E2F32]">Sponsored Search</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="w-px h-[22px] bg-[#E3E4E5]"></div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white">
            <span className="text-xs text-[#2E2F32]">Free Rein Coffee</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="w-px h-[22px] bg-[#E3E4E5]"></div>
          <div className="flex items-center gap-2">
            <button className="p-1 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#EA1100] rounded-full"></span>
            </button>
            <button className="p-1">
              <SettingsIcon className="w-4 h-4" />
            </button>
            <button className="p-1">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-48px)]">
        <SponsoredSearchSidebar />
        
        <div className="flex-1 overflow-y-auto">
          {/* Page Header */}
          <div className="bg-white shadow-sm px-6 py-6">
            <h1 className="text-[28px] font-bold text-[#2E2F32] mb-2">All Campaigns</h1>
            
            {/* Filters */}
            <div className="flex items-center gap-4 mt-6">
              {/* Date Range */}
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded">
                <Calendar className="w-4 h-4" />
                <span className="text-sm text-[#2E2F32]">Jan 03, 2023 - Jan 09, 2023</span>
              </button>

              {/* Attribution Tabs */}
              <div className="flex border border-[#74767C] rounded overflow-hidden">
                <button className="px-4 h-10 bg-[#F2F8FD] border-r border-[#0071DC] text-sm text-[#0071DC]">
                  Attributed data
                </button>
                <button className="px-4 h-10 bg-white text-sm text-[#2E2F32]">
                  Near real time data
                </button>
              </div>

              {/* Attribution Period */}
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm text-[#2E2F32]">Attribution: 14 days</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Campaign Status */}
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm text-[#2E2F32]">Campaign status: Live, Schedu...</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* All Filters */}
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <Filter className="w-4 h-4" />
                <span className="text-sm">All filters</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1 flex items-center border border-[#909196] rounded overflow-hidden bg-white">
                <div className="flex items-center px-3 border-r border-[#909196]">
                  <span className="text-sm text-[#2E2F32]">Campaign name</span>
                  <ChevronDown className="w-4 h-4 ml-3" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 px-3 h-10 text-sm outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm">View draft campaigns</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="px-6 h-10 rounded-full bg-[#0071DC] text-white font-bold">
                Create campaign
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="px-6 py-7">
            <div className="bg-white rounded-lg shadow-md">
              {/* Table Header */}
              <div className="px-4 py-6 border-b border-[#E3E4E5]">
                <h2 className="text-xl font-bold text-[#000]">Manage your campaigns (450)</h2>
                <p className="text-sm text-[#515357] mt-2">
                  Analyze performance metrics and make updates to your campaigns. <span className="underline text-[#2E2F32]">Learn more.</span>
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Download className="w-6 h-6 text-[#001E60]" />
                  <SettingsIcon className="w-6 h-6 text-[#001E60]" />
                </div>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F8F8]">
                    <tr>
                      <th className="px-4 py-4 text-left">
                        <input type="checkbox" className="w-4 h-4" />
                      </th>
                      <th className="px-4 py-4 text-left text-base font-bold text-[#2E2F32]">Campaign name</th>
                      <th className="px-4 py-4 text-left text-base font-bold text-[#2E2F32]">Campaign status</th>
                      <th className="px-4 py-4 text-left text-base font-bold text-[#2E2F32]">Campaign type</th>
                      <th className="px-4 py-4 text-left text-base font-bold text-[#2E2F32]">Review status</th>
                      <th className="px-4 py-4 text-left text-base font-bold text-[#2E2F32] border-b border-dashed border-[#000]">Total budget</th>
                      <th className="px-4 py-4 text-left text-base font-bold text-[#2E2F32] border-b border-dashed border-[#000]">Daily budget</th>
                      <th className="px-4 py-4 text-right text-base font-bold text-[#2E2F32]">Missed clicks</th>
                      <th className="px-4 py-4 text-right text-base font-bold text-[#2E2F32]">Missed impressions</th>
                      <th className="px-4 py-4 text-center text-base font-bold text-[#2E2F32]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample Row 1 */}
                    <tr className="border-b border-[#E3E4E5] bg-[#F2F8FD]">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="px-4 py-4">
                        <a href="#" className="text-sm text-[#0071DC] underline">
                          Walmart|Sponsored Product|Cross Device|Auto|All Postions KCMasterpieceFY2020|3747|...
                        </a>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-block px-2 py-1 text-xs bg-[#EAF3E6] text-[#1D5F02] rounded w-fit">Live</span>
                          <span className="inline-block px-2 py-1 text-xs bg-[#FDE9E8] text-[#A20C00] rounded w-fit">Out-of-budget</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#2E2F32]">Sponsored products<br />(Automatic)</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#2E2F32]">-</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="#A20C00" strokeWidth="2" fill="none"/>
                            <path d="M8 4V8L11 11" stroke="#A20C00" strokeWidth="2"/>
                          </svg>
                          <span className="text-sm text-[#2E2F32]">$12,500</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#2E2F32]">$450</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm text-[#2E2F32]">764,158 - 856,243</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm text-[#2E2F32]">561,142-652,431</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-[#2E2F32]">•••</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-end gap-4 px-4 py-4 border-t border-[#E3E4E5]">
                <div className="flex items-center gap-1">
                  <span className="text-sm">Results per page: 50</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-[#BABBBE]">««</button>
                  <button className="p-1 text-[#BABBBE]">‹</button>
                  <span className="text-sm">Page</span>
                  <input
                    type="text"
                    defaultValue="1"
                    className="w-7 h-6 px-1 text-center text-sm border border-[#74767C] rounded"
                  />
                  <span className="text-sm">of 10</span>
                  <button className="p-1">›</button>
                  <button className="p-1">»</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
