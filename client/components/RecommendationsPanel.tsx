import { X, Eye, ChevronDown } from "lucide-react";
import { useState } from "react";
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
}

type ViewMode = "list" | "detail" | "recommendation-detail";

export default function RecommendationsPanel({ isOpen, onClose, campaignGoal = "Awareness" }: RecommendationsPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
  const [selectedRadioOptions, setSelectedRadioOptions] = useState<Record<string, string>>({});
  const [keywordsExpanded, setKeywordsExpanded] = useState(true);
  const [currentExpanded, setCurrentExpanded] = useState(false);

  if (!isOpen) return null;

  const mockRecommendations = [
    {
      id: "1",
      name: "H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839",
      adGroups: 3,
      recommendations: 5,
      impact: "850k-1.2M",
      description: "Potential increase in impressions"
    },
    {
      id: "2",
      name: "Electronics_Q1_Spring_Sale_Display_Retargeting_Desktop_Mobile",
      adGroups: 4,
      recommendations: 6,
      impact: "620k-890k",
      description: "Potential increase in impressions"
    },
    {
      id: "3",
      name: "Grocery_Essentials_FY25_Evergreen_Display_Contextual_Targeting",
      adGroups: 2,
      recommendations: 3,
      impact: "425k-580k",
      description: "Potential increase in impressions"
    },
    {
      id: "4",
      name: "Fashion_Spring_Collection_Display_Audience_Expansion_Video",
      adGroups: 5,
      recommendations: 7,
      impact: "1.1M-1.5M",
      description: "Potential increase in impressions"
    },
    {
      id: "5",
      name: "Home_Garden_Seasonal_Display_Placement_Optimization",
      adGroups: 3,
      recommendations: 4,
      impact: "320k-450k",
      description: "Potential increase in impressions"
    }
  ];

  // Mock detailed recommendations for a campaign
  const detailedRecommendations: RecommendationItem[] = [
    {
      id: "rec-1",
      type: "campaign",
      title: "Reallocate budget across ad groups",
      impact: "23k-25k",
      message: "Potential increase in reach",
      affectedAdGroups: ["Ad group name....", "Ad group name....", "Ad group name...."]
    },
    {
      id: "rec-2",
      type: "adgroup",
      title: "Add 15 keywords",
      impact: "14k-16k",
      message: "Potential increase in reach",
    },
    {
      id: "rec-3",
      type: "adgroup",
      title: "Add 15 keywords",
      impact: "14k-16k",
      message: "Potential increase in reach",
      hasMultipleOptions: true
    }
  ];

  const handleViewRecommendations = (campaignId: string, campaignName: string) => {
    setSelectedCampaign(campaignName);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedCampaign(null);
    setSelectedRecommendations(new Set());
  };

  const handleBackToDetail = () => {
    setViewMode("detail");
  };

  const handleViewRecommendationDetail = () => {
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

  const campaignLevelRecs = detailedRecommendations.filter(r => r.type === "campaign");
  const adGroupRecs = detailedRecommendations.filter(r => r.type === "adgroup");

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
              {mockRecommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="flex flex-col gap-4 p-4 rounded-lg border border-[#E3E4E5] bg-white"
                >
                  {/* Campaign Name Link */}
                  <a 
                    href="#"
                    className="text-sm text-[#2E2F32] underline hover:no-underline truncate"
                    onClick={(e) => e.preventDefault()}
                  >
                    {rec.name}
                  </a>

                  {/* Recommendation Content */}
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-[#2E2F32]">
                      {rec.adGroups} ad groups · {rec.recommendations} recommendations
                    </div>
                    <div className="flex items-end gap-1 flex-wrap">
                      <span className="text-sm font-bold text-[#2A8703]">
                        {rec.impact}
                      </span>
                      <span className="text-sm font-bold text-[#2E2F32]">
                        {rec.description}
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
                        handleViewRecommendations(rec.id, rec.name);
                      }}
                    >
                      View recommendations
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : viewMode === "recommendation-detail" ? (
            /* Recommendation Detail View */
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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackToDetail();
                  }}
                  className="text-[#515357] underline hover:no-underline truncate max-w-[120px]"
                >
                  Campaign name...
                </a>
                <span className="text-[#515357]">/</span>
                <span className="text-[#2E2F32]">Recommendation details</span>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-1 flex-wrap">
                  <span className="text-base font-bold text-[#2A8703]">15k-18k</span>
                  <span className="text-base font-bold text-[#2E2F32]">Potential increase in reach</span>
                </div>
                <div className="text-base text-[#2E2F32]">by adding 15 keywords</div>
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
                  className="text-sm text-[#2E2F32] underline hover:no-underline truncate"
                  onClick={(e) => e.preventDefault()}
                >
                  H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839
                </a>
              </div>

              {/* Ad group */}
              <div className="flex flex-col gap-1">
                <div className="text-sm font-bold text-[#2E2F32]">Ad group</div>
                <a 
                  href="#"
                  className="text-sm text-[#2E2F32] underline hover:no-underline truncate"
                  onClick={(e) => e.preventDefault()}
                >
                  Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio
                </a>
              </div>

              {/* Recommended keywords section */}
              <div className="flex flex-col gap-3 rounded-lg border border-[#E3E4E5] overflow-hidden">
                <div className="flex flex-col gap-2 p-3 pb-2 border-b border-[#E3E4E5]">
                  <div className="text-sm font-bold text-[#2E2F32]">Recommended keywords</div>
                  <div className="text-sm text-[#515357] line-clamp-4">
                    Coca-Cola freestyle machine, Coke vending machine, Coca-Cola sponsorship deals, Coke tasting event, Coca-Cola heritage tour, Coke glassware, Coca-Cola recipe pairing, Coke float dessert, Coca-Cola ice cream soda, Coke recipe hacks, Coca-Cola themed café, Coke and popcorn combo, Coca-Cola holiday truck tour, Coke art installation, Coca-Cola fan club, Coke TikTok challenge, Coca-Cola merch giveaway
                  </div>
                  <a
                    href="#"
                    className="text-sm text-[#2E2F32] underline hover:no-underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setKeywordsExpanded(!keywordsExpanded);
                    }}
                  >
                    View more
                  </a>
                </div>
                
                {/* Current section */}
                <button
                  onClick={() => setCurrentExpanded(!currentExpanded)}
                  className="flex items-center justify-between px-4 pb-4 w-full text-left"
                >
                  <span className="text-sm font-bold text-[#2E2F32]">Current</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${currentExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Why we recommend this */}
              <div className="flex flex-col gap-1">
                <div className="text-sm font-bold text-[#2E2F32]">Why we recommend this</div>
                <p className="text-sm text-[#2E2F32]">
                  Based on your campaign performance, we've identified that adding keywords could significantly increase your reach. Similar campaigns saw an average 12% increase in impressions while maintaining conversion quality. This recommendation uses machine learning to find users with similar characteristics to your best-performing audience segments.
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
                <span className="text-[#2E2F32]">Campaign name...</span>
              </div>

              {/* Campaign Info */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#2E2F32]">Campaign</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-[#E6F1FC] text-xs text-[#002E99]">
                      <Eye className="w-4 h-4" />
                      {campaignGoal}
                    </span>
                  </div>
                  <a 
                    href="#"
                    className="text-sm text-[#2E2F32] underline hover:no-underline truncate"
                    onClick={(e) => e.preventDefault()}
                  >
                    {selectedCampaign || "H&H_FY25_Always On_North Atlantic_Blackstone_Display_In..."}
                  </a>
                </div>

                <div className="h-px bg-[#E3E4E5]" />

                {/* Campaign Level Recommendations */}
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
                            <div className="text-sm text-[#2E2F32]">{rec.title}</div>
                            <div className="flex items-end gap-1 flex-wrap">
                              <span className="text-sm font-bold text-[#2A8703]">{rec.impact}</span>
                              <span className="text-sm font-bold text-[#2E2F32]">{rec.message}</span>
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
                              handleViewRecommendationDetail();
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

                {/* Ad Group Recommendations */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-1">
                    <span className="text-base font-bold text-[#2E2F32]">Ad group recommendations</span>
                    <span className="text-base text-[#2E2F32]">({adGroupRecs.length})</span>
                  </div>

                  {adGroupRecs.map((rec, idx) => (
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
                          className="text-sm text-[#2E2F32] underline hover:no-underline truncate"
                          onClick={(e) => e.preventDefault()}
                        >
                          Ad group {String(idx + 1).padStart(2, '0')} name goes here
                        </a>

                        {rec.hasMultipleOptions ? (
                          // Multiple options with radio buttons
                          <RadioGroup
                            value={selectedRadioOptions[rec.id] || ''}
                            onValueChange={(value) => setSelectedRadioOptions(prev => ({ ...prev, [rec.id]: value }))}
                          >
                            <div className="flex flex-col gap-4">
                              {[1, 2].map((optionIdx) => (
                                <div key={optionIdx} className="flex flex-col gap-2.5">
                                  <div className="flex items-start gap-3">
                                    <div className="flex items-start pt-0.5">
                                      <RadioGroupItem
                                        value={`${rec.id}-${optionIdx}`}
                                        className="w-6 h-6 border-2 border-[#2E2F32]"
                                      />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                      <div className="text-sm text-[#2E2F32]">{rec.title}</div>
                                      <div className="flex items-end gap-1 flex-wrap">
                                        <span className="text-sm font-bold text-[#2A8703]">{rec.impact}</span>
                                        <span className="text-sm font-bold text-[#2E2F32]">{rec.message}</span>
                                      </div>
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
                                        handleViewRecommendationDetail();
                                      }}
                                    >
                                      View details
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        ) : (
                          // Single option
                          <div className="flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm text-[#2E2F32]">{rec.title}</div>
                              <div className="flex items-end gap-1 flex-wrap">
                                <span className="text-sm font-bold text-[#2A8703]">{rec.impact}</span>
                                <span className="text-sm font-bold text-[#2E2F32]">{rec.message}</span>
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
                                  handleViewRecommendationDetail();
                                }}
                              >
                                View details
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
