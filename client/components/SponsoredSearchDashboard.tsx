import { useState } from "react";
import { ChevronDown, ArrowDown, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CampaignChart from "./CampaignChart";

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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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

  const handleSort = () => {
    const newDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    setSortDirection(newDirection);

    const sorted = [...campaigns].sort((a, b) => {
      if (newDirection === 'desc') {
        return b.spend - a.spend;
      } else {
        return a.spend - b.spend;
      }
    });

    setCampaigns(sorted);
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
          <div className="flex items-center gap-2 px-3 py-2 border border-[#909196] rounded bg-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="12" height="2" rx="1" fill="#2E2F32"/>
              <rect x="2" y="7" width="12" height="2" rx="1" fill="#2E2F32"/>
              <rect x="2" y="10" width="12" height="2" rx="1" fill="#2E2F32"/>
            </svg>
            <span className="text-sm text-[#2E2F32]">Aug 1, 2025 – Aug 8, 2025</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border border-[#909196] rounded bg-white">
            <span className="text-sm text-[#2E2F32]">14 days attribution</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col items-start gap-[-1px] self-stretch rounded-xl shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] bg-white">
        {/* Header with Filters */}
        <div className="flex flex-col items-start gap-4 self-stretch p-4">
          <div className="flex items-center gap-2 self-stretch">
            <h2 className="flex-1 text-2xl font-bold text-[#2E2F32] leading-9">All campaigns</h2>
            <div className="flex items-start gap-2">
              <button className="flex h-8 px-3 justify-center items-center gap-2 rounded-full border border-[#909196] bg-white hover:bg-gray-50 transition-colors">
                <span className="text-sm text-[#2E2F32] leading-5">14 day attribution</span>
                <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
              </button>
              <button className="flex h-8 px-3 justify-center items-center gap-2 rounded-full border border-[#909196] bg-white hover:bg-gray-50 transition-colors">
                <span className="text-sm text-[#2E2F32] leading-5">Jan 1 – Mar 30, 2025</span>
                <ChevronDown className="w-4 h-4 text-[#2E2F32]" />
              </button>
            </div>
          </div>
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
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">18,689,154</div>
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
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">148,782</div>
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
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">$1.36</div>
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
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">0.84%</div>
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
              <div className="text-2xl font-bold text-[#2E2F32] leading-9">$195,607</div>
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
                Campaign
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                ROAS
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                CPC
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                CTR
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                CVR
              </th>
              <th className="p-4 text-left font-bold text-[#2E2F32] border-b border-t border-[#E3E4E5]">
                <div className="flex items-center gap-2">
                  <span>Spend</span>
                  <button
                    onClick={handleSort}
                    className="flex p-1 justify-center items-center rounded-full bg-transparent hover:bg-gray-100 transition-colors"
                  >
                    {sortDirection === 'desc' ? (
                      <ArrowUp className="w-4 h-4 text-[#2E2F32]" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-[#2E2F32]" />
                    )}
                  </button>
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
