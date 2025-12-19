import { ChevronDown, ArrowDown } from "lucide-react";
import CampaignChart from "./CampaignChart";

export default function SponsoredSearchDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F8F8F8] overflow-y-auto">
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
      <div className="rounded-xl shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-hidden">
        {/* Ribbon with Metrics */}
        <div className="bg-white">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-bold text-[#2E2F32]">All campaigns</h2>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 border border-[#909196] rounded-full bg-white text-sm text-[#2E2F32] flex items-center gap-1">
                14 day attribution
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="h-8 px-3 border border-[#909196] rounded-full bg-white text-sm text-[#2E2F32] flex items-center gap-1">
                Jan 1 – Mar 30, 2025
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="flex items-start gap-3 px-4 pb-4">
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-2 rounded-b-full bg-[#993EF4] w-full"></div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-[#2E2F32]">Impressions</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-[#2E2F32]">18,689,154</div>
              </div>
            </div>
            <div className="w-px h-24 bg-[#E3E4E5]"></div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-2 rounded-b-full bg-[#4DBDF5] w-full"></div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-[#2E2F32]">Clicks</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-[#2E2F32]">148,782</div>
              </div>
            </div>
            <div className="w-px h-24 bg-[#E3E4E5]"></div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-2 rounded-b-full bg-[#0053E2] w-full"></div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-[#2E2F32]">Cost per click</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-[#2E2F32]">$1.36</div>
              </div>
            </div>
            <div className="w-px h-24 bg-[#E3E4E5]"></div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-2 rounded-b-full w-full"></div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-[#2E2F32]">Click through</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-[#2E2F32]">0.84%</div>
              </div>
            </div>
            <div className="w-px h-24 bg-[#E3E4E5]"></div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-2 rounded-b-full w-full"></div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-[#2E2F32]">Ad spend</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-[#2E2F32]">$195,607</div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E3E4E5]"></div>

          {/* Campaign Chart */}
          <CampaignChart />
        </div>
      </div>

      {/* Recommendations */}
      <h2 className="text-[32px] font-bold text-[#2E2F32] leading-10">Recommendations</h2>
      
      {/* Recommendation Cards Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border-4 border-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5D5E9] flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#993EF4"/>
                <path d="M12 8V12L14 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#993EF4"/>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#993EF4"/>
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
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
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
      <h2 className="text-[32px] font-bold text-[#2E2F32] leading-10">Top campaigns</h2>

      <div className="flex items-start self-stretch">
        {/* Campaign Column */}
        <div className="flex flex-col w-[280px] max-w-[450px] items-start">
          <div className="flex flex-col items-start flex-1 self-stretch">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1">
                <div className="text-sm font-bold text-[#2E2F32] leading-5">Campaign</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 underline">Cool Beans, Hot Days (Summer 2025)</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 underline overflow-hidden text-ellipsis whitespace-nowrap">Decaf, Not Defeated (Evergreen)</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 underline overflow-hidden text-ellipsis whitespace-nowrap">Press, Sip, Reign, K-Cups (Evergreen)</div>
              </div>
              <div className="absolute inset-0 border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* ROAS Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">ROAS</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$7.68</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$10.52</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$6.78</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* CPC Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">CPC</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.09</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$0.78</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.32</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* CTR Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">CTR</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">2.37%</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">0.60%</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">0.78%</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* CVR Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">CVR</div>
                <div className="flex w-6 h-6 items-center"></div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">57.48%</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">63.92%</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">44.67%</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Spend Column */}
        <div className="flex max-w-[450px] items-start flex-1">
          <div className="flex flex-col items-start flex-1">
            <div className="flex h-[52px] px-4 items-center gap-1 self-stretch border-t border-b border-[#E3E4E5] bg-[#F8F8F8]">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm font-bold text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">Spend</div>
                <div className="flex items-center">
                  <div className="flex p-1 justify-center items-center rounded-full bg-transparent">
                    <ArrowDown className="w-4 h-4 text-[#2E2F32]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.09</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$0.78</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
            </div>
            <div className="flex h-[52px] max-w-[450px] px-4 items-center gap-2 self-stretch relative">
              <div className="flex h-5 items-center gap-1 flex-1">
                <div className="flex-1 text-sm text-[#2E2F32] leading-5 overflow-hidden text-ellipsis whitespace-nowrap">$1.32</div>
              </div>
              <div className="absolute inset-0 w-[177px] border-b border-[#E3E4E5] bg-white pointer-events-none"></div>
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
    </div>
  );
}
