import { useState, useRef, useMemo, useEffect } from "react";
import { Search, Calendar, Filter, Download, Settings as SettingsIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../components/MartyFloatingPanel";
import SponsoredSearchSidebar from "../components/SponsoredSearchSidebar";
import RecommendationsPopover from "../components/RecommendationsPopover";
import BiddingStrategyModal from "../components/BiddingStrategyModal";
import { Button } from "../components/ui/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Menu } from "../components/ui/Menu";
import { MenuItem } from "../components/ui/MenuItem";
import { MastHead } from "../components/ui/MastHead";
import { Link } from "../components/ui/Link";
import { Tag } from "../components/ui/tag";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

interface Alert {
  type: 'item-health-issues' | 'out-of-budget';
  message: string;
  targetColumn?: 'biddingStrategy' | 'totalBudget';
}

interface Recommendation {
  type: 'update-roas';
  message: string;
  suggestedValue: string;
  targetColumn?: 'biddingStrategy';
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  totalBudget: string;
  suggestedTotalBudget: string;
  hasWarning: boolean;
  hasBolt: boolean;
  hasAlertIcon: boolean;
  hasRecIcon: boolean;
  dailyBudget: string;
  suggestedDailyBudget: string;
  biddingStrategy: string;
  biddingTarget: string;
  roasTarget: string;
  recommendedRoasTarget: string;
  biddingIcon: boolean;
  biddingStatus: string;
  biddingStatusDate: string;
  campaignType: string;
  avgCapOutTime: string;
  estMissedImpressions: string;
  estMissedClicks: string;
  campaignReviewStatus: string;
  roas: string;
  omniRoas: string;
  avgCPC: string;
  spend: string;
  totalAttributedSales: string;
  impressions: string;
  clicks: string;
  ctr: string;
  totalProductDetailPageViews: string;
  totalAddToCart: string;
  conversionRate: string;
  orders: string;
  unitsSold: string;
  alerts?: Alert[];
  recommendations?: Recommendation[];
}

export default function AllCampaigns() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');

  // Recommendations & Modal State
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [biddingModalOpen, setBiddingModalOpen] = useState(false);
  const [recommendedRoasValue, setRecommendedRoasValue] = useState<string | undefined>();

  // Selected rows state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Search state
  const [searchScope, setSearchScope] = useState<string>('Campaign name');
  const [showSearchScopeDropdown, setShowSearchScopeDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Refs for scrolling
  const biddingStrategyColumnRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [campaignsData, setCampaignsData] = useState<Campaign[]>([
    {
      id: "4673120",
      name: "SP - GTV - HiSense - New SKUs - Category - Auto",
      status: "Live",
      startDate: "10/08/2025",
      endDate: "No end date",
      totalBudget: "$12,500",
      suggestedTotalBudget: "-",
      hasWarning: true,
      hasBolt: false,
      hasAlertIcon: true,
      hasRecIcon: false,
      dailyBudget: "$150",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 3.25)",
      roasTarget: "3.25",
      recommendedRoasTarget: "2.50",
      biddingIcon: true,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "08:00am PST",
      estMissedImpressions: "422460 - 571565",
      estMissedClicks: "2747 - 3721",
      campaignReviewStatus: "-",
      roas: "47.84",
      omniRoas: "$52.62",
      avgCPC: "$0.65",
      spend: "$3,800",
      totalAttributedSales: "$181,810.95",
      impressions: "680,052",
      clicks: "5,803",
      ctr: "0.85%",
      totalProductDetailPageViews: "5,321",
      totalAddToCart: "2,822",
      conversionRate: "16.35%",
      orders: "949",
      unitsSold: "1,067",
      alerts: [
        {
          type: 'item-health-issues',
          message: 'Item health issues detected',
          targetColumn: 'biddingStrategy'
        },
        {
          type: 'out-of-budget',
          message: 'Campaign out-of-budget',
          targetColumn: 'totalBudget'
        }
      ],
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    },
    {
      id: "2596045",
      name: "SP - GTV - Hisense - Auto 2025 - All Products",
      status: "Live",
      startDate: "06/11/2025",
      endDate: "No end date",
      totalBudget: "$18,750",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: true,
      hasRecIcon: false,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 2.75)",
      roasTarget: "2.75",
      recommendedRoasTarget: "2.50",
      biddingIcon: true,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "09:00am PST",
      estMissedImpressions: "1919114 - 2596447",
      estMissedClicks: "3231 - 4368",
      campaignReviewStatus: "-",
      roas: "24.75",
      omniRoas: "$27.23",
      avgCPC: "$0.68",
      spend: "$2,097.37",
      totalAttributedSales: "$51,904.76",
      impressions: "1,518,277",
      clicks: "3,084",
      ctr: "0.20%",
      totalProductDetailPageViews: "3,769",
      totalAddToCart: "848",
      conversionRate: "7.20%",
      orders: "222",
      unitsSold: "233",
      alerts: [
        {
          type: 'out-of-budget',
          message: 'Campaign out-of-budget',
          targetColumn: 'totalBudget'
        }
      ]
    },
    {
      id: "4694172",
      name: "SP - GTV - Philips - Auto 2025 - All Products",
      status: "Live",
      startDate: "06/11/2025",
      endDate: "No end date",
      totalBudget: "$22,300",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: true,
      hasAlertIcon: false,
      hasRecIcon: false,
      dailyBudget: "$100",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 4.10)",
      roasTarget: "4.10",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "07:00am PST",
      estMissedImpressions: "3829208 - 5180689",
      estMissedClicks: "5530 - 7477",
      campaignReviewStatus: "-",
      roas: "23.04",
      omniRoas: "$25.34",
      avgCPC: "$0.67",
      spend: "$3,182.84",
      totalAttributedSales: "$73,342.94",
      impressions: "2,937,982",
      clicks: "4,732",
      ctr: "0.16%",
      totalProductDetailPageViews: "4,143",
      totalAddToCart: "1,120",
      conversionRate: "4.67%",
      orders: "221",
      unitsSold: "238"
    },
    {
      id: "4401295",
      name: "SP - GTV - TCL - Q Series 55in - Category - Auto",
      status: "Live",
      startDate: "10/14/2025",
      endDate: "No end date",
      totalBudget: "$15,600",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: true,
      hasAlertIcon: false,
      hasRecIcon: true,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 3.75)",
      roasTarget: "3.75",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Learning",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "09:00am PST",
      estMissedImpressions: "386173 - 522470",
      estMissedClicks: "819 - 1110",
      campaignReviewStatus: "-",
      roas: "12.25",
      omniRoas: "$13.48",
      avgCPC: "$1.54",
      spend: "$3,763.20",
      totalAttributedSales: "$46,114.60",
      impressions: "786,749",
      clicks: "2,439",
      ctr: "0.31%",
      totalProductDetailPageViews: "2,302",
      totalAddToCart: "478",
      conversionRate: "6.77%",
      orders: "165",
      unitsSold: "189",
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    },
    {
      id: "4683076",
      name: "SP  - GTV - TCL - Q Series 65in - Category - Auto",
      status: "Live",
      startDate: "10/14/2025",
      endDate: "No end date",
      totalBudget: "$27,800",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: true,
      hasAlertIcon: false,
      hasRecIcon: false,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 4.50)",
      roasTarget: "4.50",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Learning",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "08:00am PST",
      estMissedImpressions: "482528 - 652831",
      estMissedClicks: "828 - 1117",
      campaignReviewStatus: "-",
      roas: "10.72",
      omniRoas: "$11.79",
      avgCPC: "$1.51",
      spend: "$2,544.44",
      totalAttributedSales: "$27,281.10",
      impressions: "939,683",
      clicks: "1,689",
      ctr: "0.18%",
      totalProductDetailPageViews: "1,672",
      totalAddToCart: "299",
      conversionRate: "4.38%",
      orders: "74",
      unitsSold: "83"
    },
    {
      id: "4450652",
      name: "SBA - Onn. Q2 - 4K Plus Launch - Category",
      status: "Live",
      startDate: "05/29/2025",
      endDate: "No end date",
      totalBudget: "$9,900",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: false,
      hasRecIcon: true,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 3.50)",
      roasTarget: "3.50",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Learning",
      biddingStatusDate: "Since 01/06/2025",
      campaignType: "Sponsored Brands",
      avgCapOutTime: "11:00am PST",
      estMissedImpressions: "182676 - 247151",
      estMissedClicks: "1620 - 2191",
      campaignReviewStatus: "Approved",
      roas: "10.69",
      omniRoas: "$11.76",
      avgCPC: "$1.03",
      spend: "$1,689.45",
      totalAttributedSales: "$18,054.63",
      impressions: "167,514",
      clicks: "1,644",
      ctr: "0.98%",
      totalProductDetailPageViews: "1,812",
      totalAddToCart: "651",
      conversionRate: "17.27%",
      orders: "284",
      unitsSold: "663",
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    },
    {
      id: "4431941",
      name: "SBA - Q2 2025 GTV - Custom Image - TCL - BRANDED",
      status: "Live",
      startDate: "07/03/2025",
      endDate: "No end date",
      totalBudget: "$24,400",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: false,
      hasRecIcon: false,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 4.40)",
      roasTarget: "4.40",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Brands",
      avgCapOutTime: "07:00am PST",
      estMissedImpressions: "238988 - 323334",
      estMissedClicks: "1641 - 2221",
      campaignReviewStatus: "Approved",
      roas: "10.59",
      omniRoas: "$11.65",
      avgCPC: "$2.24",
      spend: "$2,450",
      totalAttributedSales: "$25,936.38",
      impressions: "148,604",
      clicks: "1,095",
      ctr: "0.74%",
      totalProductDetailPageViews: "965",
      totalAddToCart: "198",
      conversionRate: "7.40%",
      orders: "81",
      unitsSold: "92"
    },
    {
      id: "camp-008",
      name: "SP - GTV - HiSense - 55in - Category - Auto",
      status: "Live",
      startDate: "10/15/2025",
      endDate: "No end date",
      totalBudget: "$7,200",
      suggestedTotalBudget: "-",
      hasWarning: false,
      hasBolt: false,
      hasAlertIcon: false,
      hasRecIcon: true,
      dailyBudget: "$50",
      suggestedDailyBudget: "-",
      biddingStrategy: "Target ROAS",
      biddingTarget: "(set at 2.90)",
      roasTarget: "2.90",
      recommendedRoasTarget: "-",
      biddingIcon: false,
      biddingStatus: "Optimizing",
      biddingStatusDate: "Since 01/05/2025",
      campaignType: "Sponsored Products (Auto)",
      avgCapOutTime: "12:00pm PST",
      estMissedImpressions: "221064 - 299087",
      estMissedClicks: "468 - 632",
      campaignReviewStatus: "-",
      roas: "10.23",
      omniRoas: "$11.25",
      avgCPC: "$1.15",
      spend: "$699.38",
      totalAttributedSales: "$7,157",
      impressions: "271,761",
      clicks: "610",
      ctr: "0.22%",
      totalProductDetailPageViews: "666",
      totalAddToCart: "167",
      conversionRate: "5.41%",
      orders: "33",
      unitsSold: "35",
      recommendations: [
        {
          type: 'update-roas',
          message: 'Update ROAS target',
          suggestedValue: '2.50',
          targetColumn: 'biddingStrategy'
        }
      ]
    }
  ]);

  // Sort campaigns: alerts first, then recommendations, then others
  // Only show icons on top rows that have alerts/recommendations
  const campaigns = useMemo(() => {
    const sorted = [...campaignsData].map((campaign, originalIndex) => ({
      ...campaign,
      originalIndex,
      hasAlerts: (campaign.alerts?.length || 0) > 0,
      hasRecs: (campaign.recommendations?.length || 0) > 0,
    }));

    sorted.sort((a, b) => {
      // Priority 1: Alerts first
      if (a.hasAlerts && !b.hasAlerts) return -1;
      if (!a.hasAlerts && b.hasAlerts) return 1;

      // Priority 2: Recommendations second (if neither has alerts)
      if (!a.hasAlerts && !b.hasAlerts) {
        if (a.hasRecs && !b.hasRecs) return -1;
        if (!a.hasRecs && b.hasRecs) return 1;
      }

      // Priority 3: Maintain original order within same group
      return a.originalIndex - b.originalIndex;
    });

    return sorted.map((campaign) => ({
      ...campaign,
      hasAlertIcon: campaign.hasAlerts,
      hasRecIcon: campaign.hasRecs && !campaign.hasAlerts,
    }));
  }, [campaignsData]);

  // Handler: Icon Click
  const handleIconClick = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setRecommendationsOpen(true);
  };

  // Handler: View Recommendation
  const handleViewRecommendation = (type: string) => {
    if (!selectedCampaignId) return;

    setRecommendationsOpen(false);

    // Navigate to item health page for item health issues
    if (type === 'item-health-issues') {
      navigate('/reports/item-health');
      return;
    }

    const campaign = campaigns.find((c) => c.id === selectedCampaignId);
    if (!campaign) return;

    // Find the recommendation or alert
    const rec = campaign.recommendations?.find((r) => r.type === type);
    const alert = campaign.alerts?.find((a) => a.type === type);

    const targetColumn = rec?.targetColumn || alert?.targetColumn;

    // Scroll to target column
    if (targetColumn === 'biddingStrategy' && biddingStrategyColumnRef.current) {
      biddingStrategyColumnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    // Set recommended value if it's a recommendation
    setRecommendedRoasValue(rec?.suggestedValue);

    // Open modal after a short delay to allow scroll to complete
    setTimeout(() => {
      setBiddingModalOpen(true);
    }, 300);
  };

  // Handler: Save ROAS
  const handleSaveRoas = (newValue: string) => {
    if (!selectedCampaignId) return;

    // Update campaigns array
    setCampaignsData((prevCampaigns) =>
      prevCampaigns.map((c) =>
        c.id === selectedCampaignId
          ? {
              ...c,
              biddingTarget: `(set at ${newValue})`,
              // Remove recommendation after applying
              recommendations: c.recommendations?.filter(
                (r) => r.type !== 'update-roas'
              ),
            }
          : c
      )
    );

    setBiddingModalOpen(false);
    setRecommendedRoasValue(undefined);
  };

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      campaigns.forEach(campaign => {
        newSelectedRows.add(campaign.id);
      });
    } else {
      campaigns.forEach(campaign => {
        newSelectedRows.delete(campaign.id);
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (campaignId: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(campaignId);
    } else {
      newSelectedRows.delete(campaignId);
    }

    setSelectedRows(newSelectedRows);
  };

  const isAllSelected = () => {
    if (campaigns.length === 0) return false;
    return campaigns.every(campaign => selectedRows.has(campaign.id));
  };

  const isSomeSelected = () => {
    if (campaigns.length === 0) return false;
    const selectedCount = campaigns.filter(campaign => selectedRows.has(campaign.id)).length;
    return selectedCount > 0 && selectedCount < campaigns.length;
  };

  // Set indeterminate state for select all checkbox
  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = isSomeSelected();
    }
  }, [selectedRows]);

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
                  defaultValue=""
                />
              </div>
              <button className="flex items-center gap-2 px-4 h-10 border border-[#74767C] rounded bg-white">
                <span className="text-sm">View draft campaigns</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <Button
                variant="primary"
                size="medium"
                onClick={() => setIsMartyMinimized(false)}
              >
                Create campaign
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div className="px-6 py-7">
            <div className="bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              {/* Table Header */}
              <div className="flex items-center justify-between px-6 py-6">
                <div className="flex-1">
                  <h2 className="text-[20px] font-bold text-[#000] leading-7 mb-1">
                    Manage your campaigns (450)
                  </h2>
                  <p className="text-sm text-[#515357] leading-5">
                    Analyze performance metrics and make updates to your campaigns.{' '}
                    <span className="underline cursor-pointer hover:no-underline">Learn more.</span>
                  </p>
                </div>
              </div>

              {/* Table Controls */}
              <div className="flex items-center justify-end gap-2 p-4 border-b border-[#E3E4E5] bg-white">
                {/* Search Bar */}
                <div className="flex items-center gap-2 flex-1 min-w-[360px] max-w-[600px] px-3 h-8 border border-[rgba(46,47,50,1)] rounded-full bg-white relative">
                  <Search className="w-4 h-4 text-[#2E2F32]" />
                  <span className="text-sm text-[#515357]">Search by</span>
                  <Popover open={showSearchScopeDropdown} onOpenChange={setShowSearchScopeDropdown}>
                    <PopoverTrigger asChild>
                      <button
                        className="flex items-center gap-1 text-sm font-bold text-[#2E2F32] hover:bg-gray-100 px-1 rounded"
                      >
                        {searchScope}
                        {showSearchScopeDropdown ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Menu isOpen={showSearchScopeDropdown} onClose={() => setShowSearchScopeDropdown(false)}>
                        <MenuItem
                          selected={searchScope === 'Campaign name'}
                          onClick={() => {
                            setSearchScope('Campaign name');
                            setShowSearchScopeDropdown(false);
                          }}
                        >
                          Campaign name
                        </MenuItem>
                        <MenuItem
                          selected={searchScope === 'ID'}
                          onClick={() => {
                            setSearchScope('ID');
                            setShowSearchScopeDropdown(false);
                          }}
                        >
                          ID
                        </MenuItem>
                      </Menu>
                    </PopoverContent>
                  </Popover>
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
                    <div className="flex items-center justify-center h-[52px] px-3 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                      <input
                        ref={selectAllCheckboxRef}
                        type="checkbox"
                        className="w-5 h-5 rounded border-[#909196] accent-black cursor-pointer"
                        checked={isAllSelected()}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </div>
                    {/* Rows */}
                    {campaigns.map((campaign, idx) => (
                      <div key={idx} className="flex items-center justify-center h-[52px] px-3 border-b border-[#E3E4E5] bg-white">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-[#909196] accent-black cursor-pointer"
                          checked={selectedRows.has(campaign.id)}
                          onChange={(e) => handleSelectRow(campaign.id, e.target.checked)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Icon Column */}
                  <div className="flex flex-col flex-shrink-0 w-[48px]">
                    {/* Header */}
                    <div className="flex items-center justify-center h-[52px] border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                      {/* Empty header for icon column */}
                    </div>
                    {/* Rows */}
                    {campaigns.map((campaign, idx) => (
                      <div key={campaign.id} className="flex items-center justify-center h-[52px] border-b border-[#E3E4E5] bg-white">
                        {(campaign.hasAlertIcon || campaign.hasRecIcon) && (
                          <RecommendationsPopover
                            open={recommendationsOpen && selectedCampaignId === campaign.id}
                            onOpenChange={(open) => {
                              setRecommendationsOpen(open);
                              if (!open) {
                                setSelectedCampaignId(null);
                              }
                            }}
                            campaignData={campaign}
                            onViewRecommendation={handleViewRecommendation}
                            trigger={
                              <button
                                onClick={() => handleIconClick(campaign.id)}
                                className="flex items-center justify-center w-6 h-6 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
                              >
                                {campaign.hasAlertIcon && (
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F8D2D3]">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM7 1.2002C3.79675 1.2002 1.2002 3.79675 1.2002 7C1.2002 10.2033 3.79675 12.7998 7 12.7998C10.2033 12.7998 12.7998 10.2033 12.7998 7C12.7998 3.79675 10.2033 1.2002 7 1.2002ZM7 9.89844C7.33224 9.89844 7.60156 10.1678 7.60156 10.5C7.60156 10.8322 7.33224 11.1016 7 11.1016C6.66776 11.1016 6.39844 10.8322 6.39844 10.5C6.39844 10.1678 6.66776 9.89844 7 9.89844ZM7 2.90039C7.2981 2.90039 7.54514 3.11744 7.5918 3.40234L7.59961 3.5V8.64062C7.59961 8.972 7.33137 9.24023 7 9.24023C6.70187 9.24023 6.45483 9.02322 6.4082 8.73828L6.40039 8.64062V3.5C6.40039 3.16863 6.66863 2.90039 7 2.90039Z" fill="#9B1419"/>
                                    </svg>
                                  </div>
                                )}
                                {campaign.hasRecIcon && (
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FCE9F5]">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]">
                                      <path d="M8.42285 6.55273L8.32324 7.1543H13.6016L7.39648 14.2852L8.10938 9.98438L8.20898 9.38281H2.93164L9.13477 2.25293L8.42285 6.55273Z" stroke="#661648" strokeWidth="1.03333"/>
                                    </svg>
                                  </div>
                                )}
                              </button>
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Data Columns */}
                  <div className="flex flex-1 overflow-x-auto">
                    {/* Campaign Name Column */}
                    <div className="flex flex-col min-w-[280px] flex-1 sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Campaign name</span>
                        <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <Link
                            href="/campaign"
                            className="text-sm truncate"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate('/campaign', {
                                state: {
                                  campaignName: campaign.name,
                                  campaignId: campaign.id
                                }
                              });
                            }}
                          >
                            {campaign.name}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Status Column */}
                    <div className="flex flex-col min-w-[140px] sticky left-[280px] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Campaign status</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <Tag variant={campaign.status === 'Live' ? 'success' : 'neutral'} size="small">
                            {campaign.status}
                          </Tag>
                        </div>
                      ))}
                    </div>

                    {/* Total Budget Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Total budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <div className="flex items-center gap-1">
                            {campaign.hasWarning && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                                <circle cx="8" cy="8" r="7" stroke="#A20C00" strokeWidth="1.5" fill="none"/>
                                <path d="M8 4.5V8.5" stroke="#A20C00" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="8" cy="11" r="0.75" fill="#A20C00"/>
                              </svg>
                            )}
                            {campaign.hasBolt && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                              </svg>
                            )}
                            <span className="text-sm text-[#2E2F32]">{campaign.totalBudget}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Daily Budget Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Daily budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.dailyBudget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bidding Strategy Column */}
                    <div ref={biddingStrategyColumnRef} className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Bidding strategy</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] pl-[34px] pr-4 border-b border-[#E3E4E5] bg-white relative">
                          {campaign.biddingIcon && (
                            <button
                              onClick={() => {
                                setSelectedCampaignId(campaign.id);
                                setBiddingModalOpen(true);
                                setRecommendedRoasValue(campaign.recommendedRoasTarget !== '-' ? campaign.recommendedRoasTarget : undefined);
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7" stroke="#A20C00" strokeWidth="1.5" fill="none"/>
                                <path d="M8 4.5V8.5" stroke="#A20C00" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="8" cy="11" r="0.75" fill="#A20C00"/>
                              </svg>
                            </button>
                          )}
                          {campaign.hasBolt && !campaign.biddingIcon && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0">
                              <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                            </svg>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm text-[#2E2F32]">{campaign.biddingStrategy}</span>
                            <span className="text-xs text-[#74767C]">{campaign.biddingTarget}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bidding Status Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Bidding status</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <div className="flex flex-col">
                            <span className="text-sm text-[#2E2F32]">{campaign.biddingStatus}</span>
                            <span className="text-xs text-[#74767C]">{campaign.biddingStatusDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Average CPC Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Average CPC</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.avgCPC}</span>
                        </div>
                      ))}
                    </div>

                    {/* Spend Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Spend</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.spend}</span>
                        </div>
                      ))}
                    </div>

                    {/* Start Date Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Start date</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.startDate}</span>
                        </div>
                      ))}
                    </div>

                    {/* End Date Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">End date</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.endDate}</span>
                        </div>
                      ))}
                    </div>

                    {/* Suggested Total Budget Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Sugg. total budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.suggestedTotalBudget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Suggested Daily Budget Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Sugg. daily budget</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.suggestedDailyBudget}</span>
                        </div>
                      ))}
                    </div>

                    {/* ROAS Target Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">ROAS target</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.roasTarget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Recommended ROAS Target Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Recommended ROAS target</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.recommendedRoasTarget}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Type Column */}
                    <div className="flex flex-col min-w-[200px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Campaign type</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.campaignType}</span>
                        </div>
                      ))}
                    </div>

                    {/* Avg. Cap-out Time Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Avg. cap-out time</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.avgCapOutTime}</span>
                        </div>
                      ))}
                    </div>

                    {/* Est. Missed Impressions Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Est. missed impressions</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.estMissedImpressions}</span>
                        </div>
                      ))}
                    </div>

                    {/* Est. Missed Clicks Column */}
                    <div className="flex flex-col min-w-[160px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Est. missed clicks</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.estMissedClicks}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign Review Status Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Campaign review status</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.campaignReviewStatus}</span>
                        </div>
                      ))}
                    </div>

                    {/* ROAS Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">ROAS</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.omniRoas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Online ROAS Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5 whitespace-nowrap">Online ROAS</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.roas}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Attributed Sales Column */}
                    <div className="flex flex-col min-w-[180px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Online attributed sales</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.totalAttributedSales}</span>
                        </div>
                      ))}
                    </div>

                    {/* Impressions Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Impressions</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.impressions}</span>
                        </div>
                      ))}
                    </div>

                    {/* Clicks Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Clicks</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.clicks}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTR Column */}
                    <div className="flex flex-col min-w-[80px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">CTR</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.ctr}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Product Detail Page Views Column */}
                    <div className="flex flex-col min-w-[220px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Total product detail page views</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.totalProductDetailPageViews}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Add to Cart Column */}
                    <div className="flex flex-col min-w-[150px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Total add to cart</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.totalAddToCart}</span>
                        </div>
                      ))}
                    </div>

                    {/* Conversion Rate Column */}
                    <div className="flex flex-col min-w-[140px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Conversion rate</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.conversionRate}</span>
                        </div>
                      ))}
                    </div>

                    {/* Orders Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Orders</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.orders}</span>
                        </div>
                      ))}
                    </div>

                    {/* Campaign ID Column */}
                    <div className="flex flex-col min-w-[120px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Campaign ID</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.id}</span>
                        </div>
                      ))}
                    </div>

                    {/* Units Sold Column */}
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                        <span className="text-sm font-bold text-[#2E2F32] leading-5">Units sold</span>
                      </div>
                      {campaigns.map((campaign, idx) => (
                        <div key={idx} className="flex items-center justify-end h-[52px] px-4 border-b border-[#E3E4E5] bg-white">
                          <span className="text-sm text-[#2E2F32]">{campaign.unitsSold}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Column - Right Aligned */}
                  <div className="flex flex-col flex-shrink-0 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <div className="flex items-center h-[52px] px-4 border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
                      <span className="text-sm font-bold text-[#2E2F32] leading-5">Actions</span>
                    </div>
                    {campaigns.map((_, idx) => (
                      <div key={idx} className="flex items-center justify-center h-[52px] px-2.5 border-b border-[#E3E4E5] bg-white">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M9 3.5C9 4.05228 8.55228 4.5 8 4.5C7.44772 4.5 7 4.05228 7 3.5C7 2.94772 7.44772 2.5 8 2.5C8.55228 2.5 9 2.94772 9 3.5Z" fill="#2E2F32"/>
                            <path d="M9 8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8Z" fill="#2E2F32"/>
                            <path d="M9 12.5C9 13.0523 8.55228 13.5 8 13.5C7.44772 13.5 7 13.0523 7 12.5C7 11.9477 7.44772 11.5 8 11.5C8.55228 11.5 9 11.9477 9 12.5Z" fill="#2E2F32"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bidding Strategy Modal */}
      {selectedCampaignId && (
        <BiddingStrategyModal
          open={biddingModalOpen}
          onOpenChange={setBiddingModalOpen}
          campaignData={campaigns.find((c) => c.id === selectedCampaignId)!}
          recommendedValue={recommendedRoasValue}
          onSave={handleSaveRoas}
        />
      )}

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
