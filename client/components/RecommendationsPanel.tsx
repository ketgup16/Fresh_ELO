import { X, Eye, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RecommendationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  campaignGoal?: string;
}

interface RecommendationItem {
  id: string;
  type: "campaign" | "adgroup";
  title: string;
  impact: string;
  message: string;
  affectedAdGroups?: string[];
  hasMultipleOptions?: boolean;
  campaign?: string;
  adGroup?: string;
  keywords?: string;
  currentKeywords?: string;
  whyRecommend?: string;
}

interface Campaign {
  id: string;
  name: string;
  adGroups: number;
  recommendations: number;
  impact: string;
  description: string;
  goal: string;
  detailedRecommendations: RecommendationItem[];
}

type ViewMode = "list" | "detail" | "recommendation-detail";

export default function RecommendationsPanel({ isOpen, onClose, campaignGoal = "Awareness" }: RecommendationsPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendationItem | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
  const [selectedRadioOptions, setSelectedRadioOptions] = useState<Record<string, string>>({});
  const [keywordsExpanded, setKeywordsExpanded] = useState(false);
  const [currentExpanded, setCurrentExpanded] = useState(false);

  // Reset to list view whenever the panel opens
  useEffect(() => {
    if (isOpen) {
      setViewMode("list");
      setSelectedCampaign(null);
      setSelectedRecommendation(null);
      setSelectedRecommendations(new Set());
      setKeywordsExpanded(false);
      setCurrentExpanded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Realistic display advertising campaigns with detailed recommendations
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "CocaCola_Summer_Always_On_Display_Contextual_National_Premium_Sites",
      adGroups: 5,
      recommendations: 8,
      impact: "850k-1.2M",
      description: "Potential increase in impressions",
      goal: "Awareness",
      detailedRecommendations: [
        {
          id: "rec-1-1",
          type: "campaign",
          title: "Increase daily budget by 25%",
          impact: "320k-450k",
          message: "Potential increase in impressions",
          affectedAdGroups: [
            "Display|Premium_Sites|Desktop",
            "Display|Premium_Sites|Mobile", 
            "Display|Premium_Sites|Tablet"
          ],
          campaign: "CocaCola_Summer_Always_On_Display_Contextual_National_Premium_Sites",
          adGroup: "",
          keywords: "",
          whyRecommend: "Your campaign is frequently hitting its daily budget limit, causing it to stop showing ads before the end of the day. Historical data shows that similar campaigns with increased budgets saw a 35% boost in impressions while maintaining a healthy CTR of 0.8%."
        },
        {
          id: "rec-1-2",
          type: "adgroup",
          title: "Add 15 contextual keywords",
          impact: "180k-220k",
          message: "Potential increase in impressions",
          campaign: "CocaCola_Summer_Always_On_Display_Contextual_National_Premium_Sites",
          adGroup: "Display|Premium_Sites|Beverage_Context|Summer_Recipes",
          keywords: "summer refreshment drinks, cold beverages recipes, backyard BBQ drinks, poolside refreshments, beach cooler drinks, picnic beverage ideas, outdoor party drinks, ice-cold sodas, summer meal pairings, refreshing drink mixes, family gathering beverages, cookout drink options, summer hydration tips, chilled drink recipes, warm weather beverages",
          currentKeywords: "coca cola, coke, soda, soft drink, beverage, refreshment",
          whyRecommend: "Based on your campaign performance, we've identified that adding contextual keywords related to summer activities could significantly increase your reach. Similar campaigns in the beverage category saw an average 28% increase in impressions while maintaining conversion quality. This recommendation uses machine learning to find users actively searching for summer refreshment ideas who are likely to engage with your brand."
        },
        {
          id: "rec-1-3",
          type: "adgroup",
          title: "Expand to responsive display ads",
          impact: "250k-310k",
          message: "Potential increase in impressions",
          campaign: "CocaCola_Summer_Always_On_Display_Contextual_National_Premium_Sites",
          adGroup: "Display|Premium_Sites|Desktop",
          keywords: "",
          whyRecommend: "Your current ad group is limited to standard display formats. Enabling responsive display ads would allow your ads to dynamically adjust to available ad spaces across the Google Display Network, potentially reaching 40% more inventory."
        }
      ]
    },
    {
      id: "2",
      name: "CocaCola_Zero_Sugar_Retargeting_Desktop_Mobile_Conversion_Optimized",
      adGroups: 3,
      recommendations: 6,
      impact: "420k-580k",
      description: "Potential increase in impressions",
      goal: "Conversion",
      detailedRecommendations: [
        {
          id: "rec-2-1",
          type: "campaign",
          title: "Switch to Target CPA bidding",
          impact: "15%-18%",
          message: "Potential increase in conversions",
          affectedAdGroups: [
            "Retargeting|Past_Visitors_7_Days",
            "Retargeting|Cart_Abandoners_14_Days"
          ],
          campaign: "CocaCola_Zero_Sugar_Retargeting_Desktop_Mobile_Conversion_Optimized",
          adGroup: "",
          keywords: "",
          whyRecommend: "Your campaign has accumulated sufficient conversion data (150+ conversions in last 30 days) to enable Target CPA bidding. This automated bidding strategy can optimize bids in real-time to maximize conversions at your target cost per acquisition."
        },
        {
          id: "rec-2-2",
          type: "adgroup",
          title: "Add product-specific audiences",
          impact: "95k-125k",
          message: "Potential increase in impressions",
          campaign: "CocaCola_Zero_Sugar_Retargeting_Desktop_Mobile_Conversion_Optimized",
          adGroup: "Retargeting|Health_Conscious_Shoppers|Zero_Calorie_Interest",
          keywords: "zero calorie beverages, sugar-free drinks, diet soda alternatives, low-calorie refreshments, healthy drink options, keto-friendly sodas, diabetic-friendly beverages, calorie-free drinks, weight loss drinks, fitness lifestyle beverages, nutrition-conscious choices, guilt-free indulgence, wellness beverages",
          currentKeywords: "zero sugar, diet coke, calorie free, no sugar",
          whyRecommend: "Your retargeting campaign can be enhanced by layering in-market audiences interested in health and wellness. Users who visited your site and are also in health-conscious shopping audiences convert at 2.3x the rate of general retargeting audiences."
        }
      ]
    },
    {
      id: "3",
      name: "CocaCola_Holiday_Campaign_Video_Display_YouTube_Cross_Device",
      adGroups: 4,
      recommendations: 5,
      impact: "620k-890k",
      description: "Potential increase in video views",
      goal: "Awareness",
      detailedRecommendations: [
        {
          id: "rec-3-1",
          type: "campaign",
          title: "Enable video partners on Display Network",
          impact: "280k-350k",
          message: "Potential increase in video views",
          affectedAdGroups: [
            "Video|YouTube_InStream|Desktop",
            "Video|YouTube_InStream|Mobile"
          ],
          campaign: "CocaCola_Holiday_Campaign_Video_Display_YouTube_Cross_Device",
          adGroup: "",
          keywords: "",
          whyRecommend: "Your video campaign is currently limited to YouTube. Expanding to video partners on the Display Network would increase your reach by approximately 45% while maintaining similar engagement rates based on our analysis of comparable campaigns."
        },
        {
          id: "rec-3-2",
          type: "adgroup",
          title: "Add holiday-themed keywords",
          impact: "195k-240k",
          message: "Potential increase in impressions",
          campaign: "CocaCola_Holiday_Campaign_Video_Display_YouTube_Cross_Device",
          adGroup: "Display|YouTube_InStream|Holiday_Content",
          keywords: "christmas traditions, holiday celebrations, family gatherings, festive season, winter holidays, holiday recipes, christmas dinner ideas, new year celebrations, holiday gift ideas, seasonal festivities, holiday party planning, christmas memories, holiday cooking, festive decorations, year-end celebrations",
          currentKeywords: "holiday, christmas, coca cola christmas, santa",
          whyRecommend: "The holiday season presents an opportunity to expand beyond brand-specific terms. Campaigns that include contextual holiday keywords see 42% higher engagement during Q4. These keywords will help reach users planning holiday events who may not be actively searching for your brand."
        }
      ]
    },
    {
      id: "4",
      name: "CocaCola_Energy_Drink_Launch_Competitive_Conquest_Display",
      adGroups: 6,
      recommendations: 9,
      impact: "1.1M-1.5M",
      description: "Potential increase in impressions",
      goal: "Awareness",
      detailedRecommendations: [
        {
          id: "rec-4-1",
          type: "campaign",
          title: "Increase bids for top-performing placements",
          impact: "380k-475k",
          message: "Potential increase in impressions",
          affectedAdGroups: [
            "Display|Energy_Lifestyle_Sites|Desktop",
            "Display|Gaming_Platforms|Mobile",
            "Display|Sports_Content|Cross_Device"
          ],
          campaign: "CocaCola_Energy_Drink_Launch_Competitive_Conquest_Display",
          adGroup: "",
          keywords: "",
          whyRecommend: "Analysis shows that certain premium placements (ESPN.com, IGN.com, Twitch.tv) are driving 3x higher engagement than average. Increasing bids specifically for these high-performing sites could capture more inventory on these valuable placements."
        },
        {
          id: "rec-4-2",
          type: "adgroup",
          title: "Add competitor conquest keywords",
          impact: "420k-550k",
          message: "Potential increase in impressions",
          campaign: "CocaCola_Energy_Drink_Launch_Competitive_Conquest_Display",
          adGroup: "Display|Competitive_Conquest|Energy_Drink_Market",
          keywords: "best energy drinks, top energy drink brands, natural energy boosters, caffeine drink alternatives, pre-workout beverages, gaming energy drinks, athlete energy drinks, sugar-free energy drinks, healthy energy options, energy drink reviews, long-lasting energy, smooth energy boost, no crash energy, premium energy drinks, innovative energy drinks",
          currentKeywords: "energy drink, caffeine, boost, power drink",
          whyRecommend: "Your product launch can benefit from conquesting strategies. By targeting users searching for general energy drink categories and competitor alternatives, you can capture consideration during the research phase. New product launches that implement this strategy see 38% higher trial rates."
        }
      ]
    },
    {
      id: "5",
      name: "CocaCola_Local_Store_Locator_Geo_Targeted_Mobile_First",
      adGroups: 8,
      recommendations: 7,
      impact: "320k-450k",
      description: "Potential increase in local actions",
      goal: "Conversion",
      detailedRecommendations: [
        {
          id: "rec-5-1",
          type: "campaign",
          title: "Enable location extensions",
          impact: "85k-110k",
          message: "Potential increase in store visits",
          affectedAdGroups: [
            "Local|Store_Locator|Mobile_Proximity",
            "Local|Store_Locator|Desktop"
          ],
          campaign: "CocaCola_Local_Store_Locator_Geo_Targeted_Mobile_First",
          adGroup: "",
          keywords: "",
          whyRecommend: "Adding location extensions to your mobile campaign will display the nearest store locations directly in your ads. Campaigns with location extensions see 15% higher CTR and significantly more foot traffic to physical locations."
        },
        {
          id: "rec-5-2",
          type: "adgroup",
          title: "Add local purchase intent keywords",
          impact: "125k-160k",
          message: "Potential increase in impressions",
          campaign: "CocaCola_Local_Store_Locator_Geo_Targeted_Mobile_First",
          adGroup: "Local|Mobile|Near_Me_Searches",
          keywords: "buy coca cola near me, soda shop nearby, beverage store locations, where to buy coke, local grocery stores, convenience stores near me, supermarket finder, drinks available now, buy beverages locally, same-day drink purchase, stores open now, quick refreshment nearby, local drink options",
          currentKeywords: "near me, store locator, buy now, locations",
          whyRecommend: "Mobile users searching with local intent convert at 4x the rate of general searches. Adding 'near me' and immediate purchase intent keywords will capture users at the moment they're ready to buy, significantly improving your conversion rate."
        }
      ]
    }
  ];

  const handleViewRecommendations = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedCampaign(null);
    setSelectedRecommendations(new Set());
    setSelectedRecommendation(null);
  };

  const handleBackToDetail = () => {
    setViewMode("detail");
    setSelectedRecommendation(null);
  };

  const handleViewRecommendationDetail = (recommendation: RecommendationItem) => {
    setSelectedRecommendation(recommendation);
    setViewMode("recommendation-detail");
  };

  const handleToggleRecommendation = (recId: string) => {
    const newSelected = new Set(selectedRecommendations);
    if (newSelected.has(recId)) {
      newSelected.delete(recId);
    } else {
      newSelected.add(recId);
    }
    setSelectedRecommendations(newSelected);
  };

  const campaignLevelRecs = selectedCampaign?.detailedRecommendations.filter(r => r.type === "campaign") || [];
  const adGroupRecs = selectedCampaign?.detailedRecommendations.filter(r => r.type === "adgroup") || [];

  return (
    <>
      {/* Scrim/Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[420px] bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-2 border-b border-[#E3E4E5]">
          <div className="flex flex-col pt-1 pb-2">
            <h2 className="text-xl font-bold text-[#2E2F32] leading-7">
              Recommendations
            </h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E3E4E5]" />

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-6 pt-3 pb-6">
          {viewMode === "list" ? (
            <div className="flex flex-col gap-4">
              {/* Campaign Goal Section */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#2E2F32]">Campaign goal</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-[#E6F1FC] text-xs text-[#002E99]">
                  <Eye className="w-4 h-4" />
                  {campaignGoal}
                </span>
              </div>

              {/* Recommendation Cards */}
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="flex flex-col gap-4 p-4 rounded-lg border border-[#E3E4E5] bg-white"
                >
                  {/* Campaign Name Link */}
                  <a 
                    href="#"
                    className="text-sm text-[#2E2F32] underline hover:no-underline truncate"
                    onClick={(e) => e.preventDefault()}
                  >
                    {campaign.name}
                  </a>

                  {/* Recommendation Content */}
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-[#2E2F32]">
                      {campaign.adGroups} ad groups · {campaign.recommendations} recommendations
                    </div>
                    <div className="flex items-end gap-1 flex-wrap">
                      <span className="text-sm font-bold text-[#2A8703]">
                        {campaign.impact}
                      </span>
                      <span className="text-sm font-bold text-[#2E2F32]">
                        {campaign.description}
                      </span>
                    </div>
                  </div>

                  {/* Card CTAs */}
                  <div className="flex items-center justify-end gap-4">
                    <a
                      href="#"
                      className="text-sm text-[#2E2F32] underline hover:no-underline"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle dismiss
                      }}
                    >
                      Dismiss
                    </a>
                    <a
                      href="#"
                      className="text-sm text-[#2E2F32] underline hover:no-underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewRecommendations(campaign);
                      }}
                    >
                      View recommendations
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : viewMode === "recommendation-detail" && selectedRecommendation ? (
            /* Recommendation Detail View */
            <div className="flex flex-col gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm overflow-hidden">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackToList();
                  }}
                  className="text-[#515357] underline hover:no-underline whitespace-nowrap flex-shrink-0"
                >
                  Main
                </a>
                <span className="text-[#515357] flex-shrink-0">/</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackToDetail();
                  }}
                  className="text-[#515357] underline hover:no-underline truncate max-w-[140px]"
                  title={selectedCampaign?.name}
                >
                  {selectedCampaign?.name}
                </a>
                {selectedRecommendation.adGroup && (
                  <>
                    <span className="text-[#515357] flex-shrink-0">/</span>
                    <span
                      className="text-[#515357] truncate max-w-[100px]"
                      title={selectedRecommendation.adGroup}
                    >
                      {selectedRecommendation.adGroup}
                    </span>
                  </>
                )}
                <span className="text-[#515357] flex-shrink-0">/</span>
                <span className="text-[#2E2F32] whitespace-nowrap flex-shrink-0">Recommendation details</span>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <div className="text-base font-bold text-[#2E2F32]">{selectedRecommendation.title}</div>
                <div className="flex items-end gap-1 flex-wrap">
                  <span className="text-base font-bold text-[#2A8703]">{selectedRecommendation.impact}</span>
                  <span className="text-base text-[#2E2F32]">{selectedRecommendation.message}</span>
                </div>
              </div>

              {/* Alert */}
              <div className="flex items-start gap-2 p-2 pr-3 rounded border border-[#004FC4] bg-[#E6F1FC] relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#004FC4] rounded-l" />
                <div className="flex items-start gap-2 ml-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#002E99"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#002E99"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#002E99"/>
                  </svg>
                  <p className="text-sm text-[#002E99]">
                    Applying this recommendation will reconfigure your ad group(s) and disable any other recommendations that affect the same group(s).
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E3E4E5]" />

              {/* Campaign */}
              <div className="flex flex-col gap-1">
                <div className="text-sm font-bold text-[#2E2F32]">Campaign</div>
                <a 
                  href="#"
                  className="text-sm text-[#2E2F32] underline hover:no-underline break-words"
                  onClick={(e) => e.preventDefault()}
                >
                  {selectedRecommendation.campaign || selectedCampaign?.name}
                </a>
              </div>

              {/* Ad group - only show if exists */}
              {selectedRecommendation.adGroup && (
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-bold text-[#2E2F32]">Ad group</div>
                  <a 
                    href="#"
                    className="text-sm text-[#2E2F32] underline hover:no-underline break-words"
                    onClick={(e) => e.preventDefault()}
                  >
                    {selectedRecommendation.adGroup}
                  </a>
                </div>
              )}

              {/* Keywords section - only show if keywords exist */}
              {selectedRecommendation.keywords && (
                <div className="flex flex-col gap-3 rounded-lg border border-[#E3E4E5] overflow-hidden">
                  <div className="flex flex-col gap-2 p-3 pb-2 border-b border-[#E3E4E5]">
                    <div className="text-sm font-bold text-[#2E2F32]">Recommended keywords</div>
                    <div className={`text-sm text-[#515357] ${keywordsExpanded ? '' : 'line-clamp-4'}`}>
                      {selectedRecommendation.keywords}
                    </div>
                    <a
                      href="#"
                      className="text-sm text-[#2E2F32] underline hover:no-underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setKeywordsExpanded(!keywordsExpanded);
                      }}
                    >
                      {keywordsExpanded ? 'View less' : 'View more'}
                    </a>
                  </div>
                  
                  {/* Current section */}
                  {selectedRecommendation.currentKeywords && (
                    <>
                      <button
                        onClick={() => setCurrentExpanded(!currentExpanded)}
                        className="flex items-center justify-between px-4 pb-4 w-full text-left"
                      >
                        <span className="text-sm font-bold text-[#2E2F32]">Current</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${currentExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      {currentExpanded && (
                        <div className="px-4 pb-4 pt-0">
                          <div className="text-sm text-[#515357]">
                            {selectedRecommendation.currentKeywords}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Why we recommend this */}
              <div className="flex flex-col gap-1">
                <div className="text-sm font-bold text-[#2E2F32]">Why we recommend this</div>
                <p className="text-sm text-[#2E2F32]">
                  {selectedRecommendation.whyRecommend || "Based on your campaign performance, we've identified an opportunity to improve results. This recommendation is backed by machine learning analysis of similar campaigns and industry benchmarks."}
                </p>
              </div>
            </div>
          ) : (
            /* Campaign Detail View */
            <div className="flex flex-col gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackToList();
                  }}
                  className="text-[#515357] underline hover:no-underline"
                >
                  Main
                </a>
                <span className="text-[#515357]">/</span>
                <span className="text-[#2E2F32] truncate">Campaign name...</span>
              </div>

              {/* Campaign Info */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#2E2F32]">Campaign</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-[#E6F1FC] text-xs text-[#002E99]">
                      <Eye className="w-4 h-4" />
                      {selectedCampaign?.goal || campaignGoal}
                    </span>
                  </div>
                  <a 
                    href="#"
                    className="text-sm text-[#2E2F32] underline hover:no-underline break-words"
                    onClick={(e) => e.preventDefault()}
                  >
                    {selectedCampaign?.name}
                  </a>
                </div>

                <div className="h-px bg-[#E3E4E5]" />

                {/* Campaign Level Recommendations */}
                {campaignLevelRecs.length > 0 && (
                  <>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-1">
                        <span className="text-base font-bold text-[#2E2F32]">Campaign level recommendations</span>
                        <span className="text-base text-[#2E2F32]">({campaignLevelRecs.length})</span>
                      </div>

                      {campaignLevelRecs.map((rec) => (
                        <div 
                          key={rec.id}
                          className="flex items-start gap-3 p-4 rounded-lg border border-[#E3E4E5] bg-white"
                        >
                          {/* Checkbox */}
                          <div className="flex items-start pt-0.5">
                            <Checkbox
                              checked={selectedRecommendations.has(rec.id)}
                              onCheckedChange={() => handleToggleRecommendation(rec.id)}
                              className="w-6 h-6 rounded border-2 data-[state=checked]:bg-[#2E2F32] data-[state=checked]:border-[#2E2F32]"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col gap-4">
                            <div className="flex flex-col gap-2.5">
                              <div className="flex flex-col gap-1">
                                <div className="text-sm font-bold text-[#2E2F32]">{rec.title}</div>
                                <div className="flex items-end gap-1 flex-wrap">
                                  <span className="text-sm font-bold text-[#2A8703]">{rec.impact}</span>
                                  <span className="text-sm text-[#2E2F32]">{rec.message}</span>
                                </div>
                              </div>

                              {rec.affectedAdGroups && (
                                <div className="flex flex-col gap-2">
                                  <span className="text-sm text-[#515357]">Affected ad groups</span>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {rec.affectedAdGroups.map((adGroup, idx) => (
                                      <span 
                                        key={idx}
                                        className="px-2 py-1 rounded-sm bg-[#F4F5F5] text-xs text-[#515357]"
                                      >
                                        {adGroup}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Card CTA */}
                            <div className="flex items-center justify-end gap-4">
                              <a
                                href="#"
                                className="text-sm text-[#2E2F32] underline hover:no-underline"
                                onClick={(e) => e.preventDefault()}
                              >
                                Dismiss
                              </a>
                              <a
                                href="#"
                                className="text-sm text-[#2E2F32] underline hover:no-underline"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleViewRecommendationDetail(rec);
                                }}
                              >
                                View details
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-[#E3E4E5]" />
                  </>
                )}

                {/* Ad Group Recommendations */}
                {adGroupRecs.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-1">
                      <span className="text-base font-bold text-[#2E2F32]">Ad group recommendations</span>
                      <span className="text-base text-[#2E2F32]">({adGroupRecs.length})</span>
                    </div>

                    {adGroupRecs.map((rec) => (
                      <div 
                        key={rec.id}
                        className="flex items-start gap-3 p-4 rounded-lg border border-[#E3E4E5] bg-white"
                      >
                        {/* Checkbox */}
                        <div className="flex items-start pt-0.5">
                          <Checkbox
                            checked={selectedRecommendations.has(rec.id)}
                            onCheckedChange={() => handleToggleRecommendation(rec.id)}
                            className="w-6 h-6 rounded border-2 data-[state=checked]:bg-[#2E2F32] data-[state=checked]:border-[#2E2F32]"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col gap-4">
                          {/* Ad Group Name Link */}
                          <a 
                            href="#"
                            className="text-sm text-[#2E2F32] underline hover:no-underline break-words"
                            onClick={(e) => e.preventDefault()}
                          >
                            {rec.adGroup}
                          </a>

                          <div className="flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-bold text-[#2E2F32]">{rec.title}</div>
                              <div className="flex items-end gap-1 flex-wrap">
                                <span className="text-sm font-bold text-[#2A8703]">{rec.impact}</span>
                                <span className="text-sm text-[#2E2F32]">{rec.message}</span>
                              </div>
                            </div>

                            {/* Card CTA */}
                            <div className="flex items-center justify-end gap-4">
                              <a
                                href="#"
                                className="text-sm text-[#2E2F32] underline hover:no-underline"
                                onClick={(e) => e.preventDefault()}
                              >
                                Dismiss
                              </a>
                              <a
                                href="#"
                                className="text-sm text-[#2E2F32] underline hover:no-underline"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleViewRecommendationDetail(rec);
                                }}
                              >
                                View details
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        {viewMode === "detail" && (
          <>
            <div className="h-px bg-[#E3E4E5]" />
            <div className="flex items-center justify-end gap-4 px-6 py-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleBackToList();
                }}
                className="text-sm text-[#2E2F32] underline hover:no-underline"
              >
                Cancel
              </a>
              <Button className="h-8 px-4 text-sm font-bold bg-[#0071CE] hover:bg-[#004F9A] rounded-full">
                Apply selected
              </Button>
            </div>
          </>
        )}

        {viewMode === "recommendation-detail" && (
          <>
            <div className="h-px bg-[#E3E4E5]" />
            <div className="flex items-center justify-end gap-4 px-6 py-6">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-[#2E2F32] underline hover:no-underline"
              >
                Dismiss
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleBackToDetail();
                }}
                className="text-sm text-[#2E2F32] underline hover:no-underline"
              >
                Cancel
              </a>
              <Button className="h-8 px-4 text-sm font-bold bg-[#0071CE] hover:bg-[#004F9A] rounded-full">
                Apply recommendation
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
