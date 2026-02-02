import { useState, useRef, useMemo, useEffect } from "react";
import { Search, Calendar, Filter, Download, Settings as SettingsIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../components/MartyFloatingPanel";
import SponsoredSearchSidebar from "../components/SponsoredSearchSidebar";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

interface Keyword {
  id: string;
  keywordId: string;
  keyword: string;
  status: string;
  matchType: string;
  suggestedBid: string;
  bid: string;
  campaignName: string;
  campaignId: string;
  campaignStatus: string;
  adGroupName: string;
  adGroupId: string;
  adGroupStatus: string;
  totalAttributedSales: string;
  roas: string;
  omniRoas: string;
  adSpend: string;
  averageCPC: string;
  impressions: string;
  clicks: string;
  ctr: string;
  totalProductDetailPageViews: string;
  totalAddToCart: string;
  conversionRate: string;
  orders: string;
  unitsSold: string;
}

export default function AllKeywords() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');

  // Selected rows state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Search state
  const [searchScope, setSearchScope] = useState<string>('Keyword');
  const [showSearchScopeDropdown, setShowSearchScopeDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchScopeDropdownRef = useRef<HTMLDivElement>(null);

  // Refs for scrolling
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [keywordsData] = useState<Keyword[]>([
    {
      id: "kw-001",
      keywordId: "112156132",
      keyword: "br30 led light bulbs",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$1.22",
      bid: "$3.00",
      campaignName: "GV_LEDBulb",
      campaignId: "4024073",
      campaignStatus: "Paused",
      adGroupName: "LEDBulb",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-002",
      keywordId: "112156131",
      keyword: "flood light bulbs",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.69",
      bid: "$1.50",
      campaignName: "GV_LEDBulb",
      campaignId: "4024073",
      campaignStatus: "Paused",
      adGroupName: "LEDBulb",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-003",
      keywordId: "112155357",
      keyword: "cappuccino mix",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.98",
      bid: "$2.00",
      campaignName: "GV_CappuccinoMix",
      campaignId: "4024056",
      campaignStatus: "Paused",
      adGroupName: "CappuccinoMix",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-004",
      keywordId: "112154872",
      keyword: "cold pack",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.97",
      bid: "$2.00",
      campaignName: "Equate_GelPak",
      campaignId: "4023982",
      campaignStatus: "Paused",
      adGroupName: "GelPak",
      adGroupId: "4733425",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-005",
      keywordId: "112154871",
      keyword: "ice pack",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.50",
      bid: "$2.00",
      campaignName: "Equate_GelPak",
      campaignId: "4023982",
      campaignStatus: "Paused",
      adGroupName: "GelPak",
      adGroupId: "4733425",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-006",
      keywordId: "112154471",
      keyword: "jumbo shrimp",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.41",
      bid: "$2.00",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp 32 OZ",
      adGroupId: "4733497",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-007",
      keywordId: "112154396",
      keyword: "shrimp tail off",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$1.91",
      bid: "$2.00",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp",
      adGroupId: "4733420",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-008",
      keywordId: "112051297",
      keyword: "led flood light bulb daylight",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$0.30",
      bid: "$0.75",
      campaignName: "GV_LEDBulb",
      campaignId: "4024073",
      campaignStatus: "Paused",
      adGroupName: "LEDBulb",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-009",
      keywordId: "112051296",
      keyword: "led flood light bulb",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$0.87",
      bid: "$1.50",
      campaignName: "GV_LEDBulb",
      campaignId: "4024073",
      campaignStatus: "Paused",
      adGroupName: "LEDBulb",
      adGroupId: "4733520",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-010",
      keywordId: "112051194",
      keyword: "french vanilla cappuccino liquid",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$2.04",
      bid: "$2.08",
      campaignName: "GV_CappuccinoMix",
      campaignId: "4024056",
      campaignStatus: "Paused",
      adGroupName: "CappuccinoMix",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-011",
      keywordId: "112051193",
      keyword: "french vanilla cappuccino",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.97",
      bid: "$3.00",
      campaignName: "GV_CappuccinoMix",
      campaignId: "4024056",
      campaignStatus: "Paused",
      adGroupName: "CappuccinoMix",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-012",
      keywordId: "112051192",
      keyword: "french vanilla cappuccino mix",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$1.01",
      bid: "$3.00",
      campaignName: "GV_CappuccinoMix",
      campaignId: "4024056",
      campaignStatus: "Paused",
      adGroupName: "CappuccinoMix",
      adGroupId: "4733500",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-013",
      keywordId: "112051163",
      keyword: "frozen shrimp",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.51",
      bid: "$0.46",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp 32 OZ",
      adGroupId: "4733497",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-014",
      keywordId: "112051162",
      keyword: "easy peel shrimp",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$3.00",
      bid: "$3.00",
      campaignName: "GV_Red Shrimp",
      campaignId: "4023978",
      campaignStatus: "Paused",
      adGroupName: "RedShrimp 32 OZ",
      adGroupId: "4733497",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-015",
      keywordId: "112050940",
      keyword: "gel pack for injury",
      status: "Disabled",
      matchType: "broad",
      suggestedBid: "$0.97",
      bid: "$0.69",
      campaignName: "Equate_GelPak",
      campaignId: "4023982",
      campaignStatus: "Paused",
      adGroupName: "GelPak",
      adGroupId: "4733425",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-016",
      keywordId: "110865922",
      keyword: "t-mobile iphone",
      status: "Enabled",
      matchType: "exact",
      suggestedBid: "$2.70",
      bid: "$2.00",
      campaignName: "TMobile Test Campaign 1",
      campaignId: "3973132",
      campaignStatus: "Paused",
      adGroupName: "TMobile Test Campaign",
      adGroupId: "4672126",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-017",
      keywordId: "110865921",
      keyword: "t-mobile iphone",
      status: "Enabled",
      matchType: "phrase",
      suggestedBid: "$0.30",
      bid: "$2.00",
      campaignName: "TMobile Test Campaign 1",
      campaignId: "3973132",
      campaignStatus: "Paused",
      adGroupName: "TMobile Test Campaign",
      adGroupId: "4672126",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-018",
      keywordId: "110865920",
      keyword: "t-mobile iphone",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$1.50",
      bid: "$2.00",
      campaignName: "TMobile Test Campaign 1",
      campaignId: "3973132",
      campaignStatus: "Paused",
      adGroupName: "TMobile Test Campaign",
      adGroupId: "4672126",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-019",
      keywordId: "73371435",
      keyword: "egg 18 count",
      status: "Disabled",
      matchType: "exact",
      suggestedBid: "$1.13",
      bid: "$0.41",
      campaignName: "KWB_CampaignUnification_NEW",
      campaignId: "1431055",
      campaignStatus: "Paused",
      adGroupName: "test2",
      adGroupId: "3022309",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    },
    {
      id: "kw-020",
      keywordId: "59915184",
      keyword: "noosa yogurt",
      status: "Enabled",
      matchType: "broad",
      suggestedBid: "$0.74",
      bid: "$1.62",
      campaignName: "KBC Campaign New 1",
      campaignId: "1833735",
      campaignStatus: "Paused",
      adGroupName: "AG1",
      adGroupId: "1208433",
      adGroupStatus: "Enabled",
      totalAttributedSales: "-",
      roas: "-",
      omniRoas: "-",
      adSpend: "-",
      averageCPC: "-",
      impressions: "-",
      clicks: "-",
      ctr: "-",
      totalProductDetailPageViews: "-",
      totalAddToCart: "-",
      conversionRate: "-",
      orders: "-",
      unitsSold: "-"
    }
  ]);

  const keywords = useMemo(() => keywordsData, [keywordsData]);

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      keywords.forEach(keyword => {
        newSelectedRows.add(keyword.id);
      });
    } else {
      keywords.forEach(keyword => {
        newSelectedRows.delete(keyword.id);
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (keywordId: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(keywordId);
    } else {
      newSelectedRows.delete(keywordId);
    }

    setSelectedRows(newSelectedRows);
  };

  const isAllSelected = () => {
    if (keywords.length === 0) return false;
    return keywords.every(keyword => selectedRows.has(keyword.id));
  };

  const isSomeSelected = () => {
    if (keywords.length === 0) return false;
    const selectedCount = keywords.filter(keyword => selectedRows.has(keyword.id)).length;
    return selectedCount > 0 && selectedCount < keywords.length;
  };

  // Set indeterminate state for select all checkbox
  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = isSomeSelected();
    }
  }, [selectedRows]);

  // Handle click outside for search scope dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchScopeDropdownRef.current &&
        !searchScopeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSearchScopeDropdown(false);
      }
    }

    if (showSearchScopeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showSearchScopeDropdown]);

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col">
      {/* Header */}
      <MastHead 
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        
        <div className="flex-1 overflow-y-auto">
          {/* Page Header */}
          <div className="bg-white shadow-sm px-6 py-6">
            <h1 className="text-[28px] font-bold text-[#2E2F32] mb-2">All Keywords</h1>
            
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
              <div className="flex items-center gap-2 flex-1 px-3 h-10 border border-[rgba(46,47,50,1)] rounded-full bg-white relative">
                <Search className="w-4 h-4 text-[#2E2F32]" />
                <span className="text-sm text-[#515357]">Search by</span>
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-sm font-bold text-[#2E2F32] hover:bg-gray-100 px-1 rounded"
                    onClick={() => setShowSearchScopeDropdown(!showSearchScopeDropdown)}
                  >
                    {searchScope}
                    {showSearchScopeDropdown ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Search Scope Dropdown */}
                  {showSearchScopeDropdown && (
                    <div
                      ref={searchScopeDropdownRef}
                      className="absolute left-0 top-full mt-1 w-[160px] bg-white rounded border border-[#D5D6D8] shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 py-1"
                    >
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-[#2E2F32] hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setSearchScope('Keyword');
                          setShowSearchScopeDropdown(false);
                        }}
                      >
                        Keyword
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-[#2E2F32] hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setSearchScope('ID');
                          setShowSearchScopeDropdown(false);
                        }}
                      >
                        ID
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="flex-1 text-sm border-none outline-none bg-transparent"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-[#2E2F32]" />
                  </button>
                )}
              </div>
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm">View draft keywords</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/campaign')}
                className="px-6 h-10 rounded-full bg-[#0071DC] text-white font-bold"
              >
                Add keywords
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="px-6 py-7">
            <div className="bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              {/* Table Header */}
              <div className="flex items-center justify-between px-6 py-6">
                <div className="flex-1">
                  <h2 className="text-[20px] font-bold text-[#000] leading-7 mb-1">
                    Manage your keywords (450)
                  </h2>
                  <p className="text-sm text-[#515357] leading-5">
                    Analyze performance metrics and make updates to your keywords.{' '}
                    <span style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }} className="underline cursor-pointer hover:no-underline">Learn more.</span>
                  </p>
                </div>
              </div>

              {/* Table Controls */}
              <div className="flex items-center justify-end gap-2 p-4 border-b border-[#E3E4E5] bg-white">
                {/* Search Bar */}
                <div className="flex items-center gap-2 flex-1 min-w-[360px] max-w-[600px] px-3 h-8 border border-[rgba(46,47,50,1)] rounded-full bg-white relative">
                  <Search className="w-4 h-4 text-[#2E2F32]" />
                  <span className="text-sm text-[#515357]">Search by</span>
                  <div className="relative" ref={searchScopeDropdownRef}>
                    <button
                      className="flex items-center gap-1 text-sm font-bold text-[#2E2F32] hover:bg-gray-100 px-1 rounded"
                      onClick={() => setShowSearchScopeDropdown(!showSearchScopeDropdown)}
                    >
                      {searchScope}
                      {showSearchScopeDropdown ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Search Scope Dropdown */}
                    {showSearchScopeDropdown && (
                      <div className="absolute left-0 top-full mt-1 w-[160px] bg-white rounded border border-[#D5D6D8] shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 py-1">
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-[#2E2F32] hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setSearchScope('Keyword');
                            setShowSearchScopeDropdown(false);
                          }}
                        >
                          Keyword
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-[#2E2F32] hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setSearchScope('ID');
                            setShowSearchScopeDropdown(false);
                          }}
                        >
                          ID
                        </button>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="flex-1 text-sm border-none outline-none bg-transparent"
                    value={searchQuery || ''}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-[#2E2F32]" />
                    </button>
                  )}
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-2">
                  {/* All Filters Button */}
                  <button className="flex items-center justify-center h-8 w-8 px-1.5 border border-[rgba(46,47,50,1)] rounded-full bg-white hover:bg-gray-50 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="2" y1="5" x2="5.5" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="7.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <line x1="9.5" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="2" y1="11" x2="9.5" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="11.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <line x1="13.5" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-gray-50 transition-colors">
                    <SettingsIcon className="w-4 h-4 text-[#2E2F32]" />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4 text-[#2E2F32]" />
                  </button>
                </div>
              </div>

              {/* Table Content */}
              <div ref={tableContainerRef} className="overflow-x-auto">
                <div className="flex">
                  {/* Checkbox Column */}
                  <div className="flex flex-col flex-shrink-0">
                    {/* Header */}
                    <div className="flex items-center justify-center h-[44px] px-3 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                      <input
                        ref={selectAllCheckboxRef}
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#909196] accent-black cursor-pointer"
                        checked={isAllSelected()}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </div>
                    {/* Rows */}
                    {keywords.map((keyword, idx) => (
                      <div key={idx} className="flex items-center justify-center h-[44px] px-3 border-b border-[#E3E4E5] bg-white">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#909196] accent-black cursor-pointer"
                          checked={selectedRows.has(keyword.id)}
                          onChange={(e) => handleSelectRow(keyword.id, e.target.checked)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Data Columns */}
                  <div className="flex flex-1 overflow-x-auto">
                    {/* Keyword Column */}
                    <div className="flex flex-col min-w-[300px] flex-1 sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[44px] px-4 gap-1 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Keyword</span>
                        <button className="p-1 hover:bg-gray-200 transition-colors">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2L6 10" stroke="#74767C" strokeWidth="1.2" strokeLinecap="round"/>
                            <path d="M4 8L6 10L8 8" stroke="#74767C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <Link href="#" className="text-[13px] truncate">
                            {keyword.keyword}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Status Column */}
                    <div className="flex flex-col min-w-[120px] sticky left-[300px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Status</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">
                            {keyword.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Match Type Column */}
                    <div className="flex flex-col min-w-[120px] sticky left-[420px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Match type</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32] capitalize">{keyword.matchType}</span>
                        </div>
                      ))}
                    </div>

                    {/* Suggested Bid Column */}
                    <div className="flex flex-col min-w-[130px] sticky left-[540px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Suggested bid</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.suggestedBid}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bid Column */}
                    <div className="flex flex-col min-w-[100px] sticky left-[670px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Bid</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.bid}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Name Column */}
                    <div className="flex flex-col min-w-[220px]">
                      <div className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Campaign name</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <Link href="#" className="text-[13px] truncate">
                            {keyword.campaignName}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Status Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Campaign status</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">
                            {keyword.campaignStatus}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* ROAS Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">ROAS</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.roas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Online ROAS Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32] whitespace-nowrap">Online ROAS</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.omniRoas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Average CPC Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Average CPC</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.averageCPC}</span>
                        </div>
                      ))}
                    </div>

                    {/* Ad Spend Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Ad spend</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.adSpend}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Attributed Sales Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Total attributed sales</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.totalAttributedSales}</span>
                        </div>
                      ))}
                    </div>

                    {/* Impressions Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Impressions</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.impressions}</span>
                        </div>
                      ))}
                    </div>

                    {/* Clicks Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Clicks</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.clicks}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTR Column */}
                    <div className="flex flex-col min-w-[80px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">CTR</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.ctr}</span>
                        </div>
                      ))}
                    </div>

                    {/* Conversion Rate Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Conversion rate</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.conversionRate}</span>
                        </div>
                      ))}
                    </div>

                    {/* Orders Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Orders</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.orders}</span>
                        </div>
                      ))}
                    </div>

                    {/* Units Sold Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-[#FAFAFA]">
                        <span className="text-[13px] font-semibold text-[#2E2F32]">Units sold</span>
                      </div>
                      {keywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[44px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-[13px] text-[#2E2F32]">{keyword.unitsSold}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
