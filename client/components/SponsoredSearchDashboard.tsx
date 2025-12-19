import { ChevronDown, ArrowDown } from "lucide-react";
import CampaignChart from "./CampaignChart";
import MartyAssistant from "./MartyAssistant";

export default function SponsoredSearchDashboard() {
  return (
    <div className="flex flex-col gap-[25px] p-6 bg-[#F8F8F8] overflow-y-auto relative">
      {/* Page Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-[#2E2F32] leading-10">Hi, Gabriela</h1>
          <button className="h-10 px-6 bg-[#0053E2] text-white text-base font-bold rounded-full hover:bg-[#0046c7] transition-colors">
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
            <div className="w-12 h-12 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
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
          <div className="flex items-center justify-end gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline">See details</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Update 10 campaigns</button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
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
          <div className="flex items-center justify-end gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline">See details</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Update 24 campaigns</button>
          </div>
        </div>
      </div>

      {/* Recommendation Cards Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Card 3 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
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
          <div className="flex items-center justify-end gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline">See details</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Update 4 campaigns</button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#2E2F32]">Advertise recently added items</h3>
          </div>
          <p className="text-base text-[#2E2F32]">
            I found 12 items you're not advertising that have the potential to drive sales with a Sponsored Search Smart Performance campaign.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <div className="text-xs text-[#2E2F32] mb-1">Items</div>
              <div className="text-lg font-bold text-[#2E2F32]">12</div>
            </div>
            <div>
              <div className="text-xs text-[#2A8703] mb-1">Est. sales increase</div>
              <div className="text-lg font-bold text-[#2A8703]">$24-30k</div>
            </div>
          </div>
          <div className="h-px bg-[#E3E4E5]"></div>
          <div className="flex items-center justify-end gap-4">
            <button className="text-sm text-[#2E2F32] underline hover:no-underline">Create campaign</button>
            <button className="h-8 px-4 border border-[#2E2F32] rounded-full text-sm font-bold text-[#2E2F32] hover:bg-gray-50">Add to existing campaigns</button>
          </div>
        </div>
      </div>

      {/* Top Campaigns */}
      <h2 className="text-[32px] font-bold text-[#2E2F32] leading-10 mt-0.5">Top campaigns</h2>

      <div className="flex items-start self-stretch">
        {/* Campaign Column */}
        <div className="flex w-[280px] max-w-[450px] items-start">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1">
                <div className="text-sm font-bold text-[#2E2F32] leading-5">Campaign</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 underline cursor-pointer hover:no-underline">Cool Beans, Hot Days (Summer 2025)</div>
              </div>
              <div className="absolute inset-0 w-[280px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 underline overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:no-underline">Decaf, Not Defeated (Evergreen)</div>
              </div>
              <div className="absolute inset-0 w-[280px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 underline overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:no-underline">Press, Sip, Reign, K-Cups (Evergreen)</div>
              </div>
              <div className="absolute inset-0 w-[280px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* ROAS Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">ROAS</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$7.68</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$10.52</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$6.78</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* CPC Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">CPC</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.09</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$0.78</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.32</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* CTR Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">CTR</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">2.37%</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">0.60%</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">0.78%</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* CVR Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">CVR</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">57.48%</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">63.92%</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">44.67%</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Spend Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">Spend</div>
                <div className="flex items-center">
                  <button className="flex p-1 justify-center items-center rounded-full bg-transparent hover:bg-gray-100 transition-colors">
                    <ArrowDown className="w-4 h-4 text-[#2E2F32]" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.09</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$0.78</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1 relative z-10">
                <div className="text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.32</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1 py-6 text-xs text-[#2E2F32]">
        <span>© 2025 Walmart Inc. All Rights reserved.</span>
        <a href="#" className="underline hover:no-underline">Privacy</a>
        <span>and</span>
        <a href="#" className="underline hover:no-underline">Terms</a>
      </div>

      {/* Marty Assistant */}
      <MartyAssistant />
    </div>
  );
}
