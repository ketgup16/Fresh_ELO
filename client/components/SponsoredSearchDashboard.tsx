import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CampaignChart from "./CampaignChart";
import DateRangeFilterDropdown from "./DateRangeFilterDropdown";
import AttributionFilterDropdown from "./AttributionFilterDropdown";

interface Campaign {
  name: string;
  roas: string;
  cpc: string;
  ctr: string;
  cvr: string;
  spend: number;
}

export default function SponsoredSearchDashboard() {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string | null>('spend');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Date range filter state
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 7, 1)); // Aug 1, 2025
  const [endDate, setEndDate] = useState<Date>(new Date(2025, 7, 8)); // Aug 8, 2025

  // Attribution filter state
  const [attribution, setAttribution] = useState<string>("14 days attribution");

  // Metrics state (will be adjusted based on attribution)
  const [metrics, setMetrics] = useState({
    impressions: 18689154,
    clicks: 148782,
    cpc: 1.36,
    ctr: 0.84,
    adSpend: 195607
  });

  // Calculate metrics based on attribution window
  useEffect(() => {
    const attributionDays = parseInt(attribution.split(" ")[0]);

    // Simulate how different attribution windows affect metrics
    // Longer attribution windows typically capture more conversions
    const attributionMultiplier = {
      7: 0.85,   // 7 days - fewer conversions attributed
      14: 1.0,   // 14 days - baseline
      30: 1.18,  // 30 days - more conversions attributed
      60: 1.32,  // 60 days - even more conversions
      90: 1.45   // 90 days - most conversions attributed
    }[attributionDays] || 1.0;

    // Base metrics (14-day attribution)
    const baseMetrics = {
      impressions: 18689154,
      clicks: 148782,
      cpc: 1.36,
      ctr: 0.84,
      adSpend: 195607
    };

    // Adjust metrics based on attribution window
    // Longer windows = better metrics (more conversions counted)
    setMetrics({
      impressions: Math.round(baseMetrics.impressions * (0.95 + (attributionMultiplier - 1) * 0.15)),
      clicks: Math.round(baseMetrics.clicks * (0.95 + (attributionMultiplier - 1) * 0.2)),
      cpc: parseFloat((baseMetrics.cpc * (1.05 - (attributionMultiplier - 1) * 0.05)).toFixed(2)),
      ctr: parseFloat((baseMetrics.ctr * (0.95 + (attributionMultiplier - 1) * 0.15)).toFixed(2)),
      adSpend: Math.round(baseMetrics.adSpend * (0.98 + (attributionMultiplier - 1) * 0.08))
    });

    // Also update campaign metrics
    const adjustedCampaigns = initialCampaigns.map(campaign => ({
      ...campaign,
      roas: `$${(parseFloat(campaign.roas.replace('$', '')) * attributionMultiplier).toFixed(2)}`,
      cvr: `${(parseFloat(campaign.cvr.replace('%', '')) * attributionMultiplier).toFixed(2)}%`,
      cpc: `$${(parseFloat(campaign.cpc.replace('$', '')) * (1.1 - (attributionMultiplier - 1) * 0.1)).toFixed(2)}`,
      ctr: `${(parseFloat(campaign.ctr.replace('%', '')) * (0.95 + (attributionMultiplier - 1) * 0.15)).toFixed(2)}%`,
    }));
    setCampaigns(adjustedCampaigns);
  }, [attribution]);

  const initialCampaigns: Campaign[] = [
    {
      name: "Cool Beans, Hot Days (Summer 2025)",
      roas: "$7.68",
      cpc: "$1.09",
      ctr: "2.37%",
      cvr: "57.48%",
      spend: 1.09
    },
    {
      name: "Decaf, Not Defeated (Evergreen)",
      roas: "$10.52",
      cpc: "$0.78",
      ctr: "0.60%",
      cvr: "63.92%",
      spend: 0.78
    },
    {
      name: "Press, Sip, Reign, K-Cups (Evergreen)",
      roas: "$6.78",
      cpc: "$1.32",
      ctr: "0.78%",
      cvr: "44.67%",
      spend: 1.32
    }
  ];

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortColumn(column);
    setSortDirection(newDirection);

    const sorted = [...campaigns].sort((a, b) => {
      let aVal: any = a[column as keyof Campaign];
      let bVal: any = b[column as keyof Campaign];

      // Convert string values to numbers for proper comparison
      if (column === 'spend') {
        // spend is already a number
      } else if (column === 'name') {
        // string comparison
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      } else {
        // Remove $ and % symbols for numeric comparison
        aVal = parseFloat(aVal.replace(/[$%]/g, ''));
        bVal = parseFloat(bVal.replace(/[$%]/g, ''));
      }

      if (newDirection === 'desc') {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });

    setCampaigns(sorted);
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="#2E2F32"/>
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="#0053E2"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="#BABBBE"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="#BABBBE"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="#0053E2"/>
        </svg>
      );
    }
  };
  return (
    <div className="flex flex-col gap-[25px] p-6 bg-[#F8F8F8] overflow-y-auto relative">
      {/* Page Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-[#2E2F32] leading-10">Hi, Gabriela</h1>
          <button
            onClick={() => navigate('/campaign')}
            className="h-10 px-6 bg-[#0053E2] text-white text-base font-bold rounded-full hover:bg-[#0046c7] transition-colors"
          >
            Create campaign
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <DateRangeFilterDropdown
            startDate={startDate}
            endDate={endDate}
            onApply={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
          <AttributionFilterDropdown
            value={attribution}
            onApply={(value) => setAttribution(value)}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col items-start gap-[-1px] self-stretch rounded-xl shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] bg-white">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 self-stretch p-4">
          <h2 className="text-2xl font-bold text-[#2E2F32] leading-9">All campaigns</h2>
        </div>

        {/* Metrics Ribbon */}
        <div className="flex items-start gap-[11.5px] self-stretch px-4">
          {/* Impressions */}
          <div className="flex flex-col items-start gap-4 flex-1 self-stretch">
            <div className="h-2 self-stretch rounded-b-full bg-[#993EF4]"></div>
            <div className="flex flex-col justify-center items-start self-stretch">
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-[#2E2F32] leading-5">Impressions</span>
                <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
              </div>
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">{metrics.impressions.toLocaleString()}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-[103px] bg-[#E3E4E5]"></div>

          {/* Clicks */}
          <div className="flex flex-col items-start gap-4 flex-1 self-stretch">
            <div className="h-2 self-stretch rounded-b-full bg-[#4DBDF5]"></div>
            <div className="flex flex-col justify-center items-start self-stretch">
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-[#2E2F32] leading-5">Clicks</span>
                <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
              </div>
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">{metrics.clicks.toLocaleString()}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-[103px] bg-[#E3E4E5]"></div>

          {/* Cost per click */}
          <div className="flex flex-col items-start gap-4 flex-1 self-stretch">
            <div className="h-2 self-stretch rounded-b-full bg-[#0053E2]"></div>
            <div className="flex flex-col justify-center items-start self-stretch">
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-[#2E2F32] leading-5">Cost per click</span>
                <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
              </div>
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">${metrics.cpc.toFixed(2)}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-[103px] bg-[#E3E4E5]"></div>

          {/* Click through */}
          <div className="flex flex-col items-start gap-4 flex-1 self-stretch">
            <div className="h-2 self-stretch rounded-b-full"></div>
            <div className="flex flex-col justify-center items-start self-stretch">
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-[#2E2F32] leading-5">Click through</span>
                <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
              </div>
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">{metrics.ctr.toFixed(2)}%</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-[103px] bg-[#E3E4E5]"></div>

          {/* Ad spend */}
          <div className="flex flex-col items-start gap-4 flex-1 self-stretch">
            <div className="h-2 self-stretch rounded-b-full"></div>
            <div className="flex flex-col justify-center items-start self-stretch">
              <div className="flex h-6 items-center gap-1">
                <span className="text-sm text-[#2E2F32] leading-5">Ad spend</span>
                <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
              </div>
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">${metrics.adSpend.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Campaign Chart */}
        <CampaignChart />
      </div>

      {/* Recommendations */}
      <h2 className="text-[32px] font-bold text-[#2E2F32] leading-10">Recommendations</h2>
      
      {/* Recommendation Cards Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-[#FBD0CC] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.9C8.29823 3.9 8.54565 4.11759 8.59215 4.40268L8.6 4.5V9.6407C8.6 9.97207 8.33137 10.2407 8 10.2407C7.70177 10.2407 7.45435 10.0231 7.40785 9.73802L7.4 9.6407V4.5C7.4 4.16863 7.66863 3.9 8 3.9Z" fill="#EA1100"/>
                <path d="M8 12.1016C8.33224 12.1016 8.60157 11.8322 8.60157 11.5C8.60157 11.1678 8.33224 10.8984 8 10.8984C7.66776 10.8984 7.39843 11.1678 7.39843 11.5C7.39843 11.8322 7.66776 12.1016 8 12.1016Z" fill="#EA1100"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8Z" fill="#EA1100"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#2E2F32]">Update daily budgets</h3>
          </div>
          <p className="text-base text-[#2E2F32]">
            10 of your campaigns reached their daily budgets. Update your budget with our recommendations to serve your ads all day.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Campaigns</div>
              <div className="text-lg font-bold text-[#2E2F32]">10</div>
            </div>
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Rec. budget increase</div>
              <div className="text-lg font-bold text-[#2E2F32]">$1,000</div>
            </div>
            <div>
              <div className="text-xs text-[#2A8703] mb-1">Est. missed sales (last 7 days)</div>
              <div className="text-lg font-bold text-[#2A8703]">$24k-$30k</div>
            </div>
          </div>
          <div className="h-px bg-[#E3E4E5]"></div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline text-center sm:text-left">See details</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Update 10 campaigns</button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#2E2F32]">Switch your bidding strategy</h3>
          </div>
          <p className="text-base text-[#2E2F32]">
            You could see a revenue increase by switching 24 campaigns to a Target RoAS bidding strategy with our recommended targets.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Campaigns</div>
              <div className="text-lg font-bold text-[#2E2F32]">24</div>
            </div>
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Est. ROAS</div>
              <div className="text-lg font-bold text-[#2E2F32]">2.00-3.00</div>
            </div>
            <div>
              <div className="text-xs text-[#2A8703] mb-1">Est. sales increase</div>
              <div className="text-lg font-bold text-[#2A8703]">$124k-$130k</div>
            </div>
          </div>
          <div className="h-px bg-[#E3E4E5]"></div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline text-center sm:text-left">See details</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Update 24 campaigns</button>
          </div>
        </div>
      </div>

      {/* Recommendation Cards Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Card 3 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#2E2F32]">Update your RoAS target</h3>
          </div>
          <p className="text-base text-[#2E2F32]">
            You could see a revenue increase by updating the Target RoAS on 4 of your campaigns.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Campaigns</div>
              <div className="text-lg font-bold text-[#2E2F32]">4</div>
            </div>
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Est. ROAS</div>
              <div className="text-lg font-bold text-[#2E2F32]">2.50-3.50</div>
            </div>
            <div>
              <div className="text-xs text-[#2A8703] mb-1">Est. sales increase</div>
              <div className="text-lg font-bold text-[#2A8703]">$32k-40k</div>
            </div>
          </div>
          <div className="h-px bg-[#E3E4E5]"></div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline text-center sm:text-left">See details</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Update 4 campaigns</button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#2E2F32]">Advertise these high quality items</h3>
            </div>
            <span className="text-xs text-[#74767C]">Updated Oct 10, 2025</span>
          </div>
          <p className="text-sm text-[#2E2F32]">
            We found items that you're not advertising that have the potential to drive sales in a Sponsored Products automatic campaign. <span className="underline cursor-pointer hover:no-underline">Learn more</span>
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Number of items</div>
              <div className="text-lg font-bold text-[#2E2F32]">1,000</div>
            </div>
            <div>
              <div className="text-xs text-[#2A8703] mb-1">Average listing quality</div>
              <div className="text-lg font-bold text-[#2A8703]">88.5%</div>
            </div>
            <div className="flex items-center gap-2.5">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/c04ef675f842aa0f2c9c1a3292268267f5cd2203?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/e3b58a71f6bde1765cd30f82d152e9bf0db3400c?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/7e3d5aa0b2caeacb2e0dd9a07394026e5d0244bc?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/bb319b37f89c1feb714d0e5ad392bd7062c7edef?width=96" alt="Product" className="w-12 h-12 object-cover" />
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/fa81303645e82b1387b2f225cd10e485d3c956fe?width=52" alt="Product" className="w-[26px] h-12 object-cover" />
            </div>
          </div>
          <div className="h-px bg-[#E3E4E5]"></div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline text-center sm:text-left">Request report</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Create new campaign</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Add items to existing campaign</button>
          </div>
        </div>
      </div>

      {/* Top Campaigns */}
      <h2 className="text-[32px] font-bold text-[#2E2F32] leading-10 mt-0.5">Top campaigns</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F8F8] sticky top-0 z-10">
            <tr>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('name')}>
                  Campaign
                  {renderSortIcon('name')}
                </div>
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('roas')}>
                  ROAS
                  {renderSortIcon('roas')}
                </div>
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('cpc')}>
                  CPC
                  {renderSortIcon('cpc')}
                </div>
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('ctr')}>
                  CTR
                  {renderSortIcon('ctr')}
                </div>
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('cvr')}>
                  CVR
                  {renderSortIcon('cvr')}
                </div>
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap" onClick={() => handleSort('spend')}>
                  Spend
                  {renderSortIcon('spend')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index} className="border-b border-[#E3E4E5] hover:bg-[#F0F5FF]">
                <td className="p-4">
                  <div className="text-[#2E2F32] underline hover:no-underline cursor-pointer">
                    {campaign.name}
                  </div>
                </td>
                <td className="p-4 text-[#2E2F32]">{campaign.roas}</td>
                <td className="p-4 text-[#2E2F32]">{campaign.cpc}</td>
                <td className="p-4 text-[#2E2F32]">{campaign.ctr}</td>
                <td className="p-4 text-[#2E2F32]">{campaign.cvr}</td>
                <td className="p-4 text-[#2E2F32]">${campaign.spend.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1 py-6 text-xs text-[#2E2F32]">
        <span>© 2025 Walmart Inc. All Rights reserved.</span>
        <a href="#" className="underline hover:no-underline">Privacy</a>
        <span>and</span>
        <a href="#" className="underline hover:no-underline">Terms</a>
      </div>

    </div>
  );
}
