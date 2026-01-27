import { X, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
  adGroup?: string;
}

interface CampaignSection {
  id: string;
  name: string;
  adGroups: number;
  recommendations: number;
  impact: string;
  description: string;
  goal: string;
  items: RecommendationItem[];
  isHidden: boolean;
  isExpanded: boolean;
}

export default function RecommendationsPanel({ isOpen, onClose, campaignGoal = "Awareness" }: RecommendationsPanelProps) {
  const [selectedTab, setSelectedTab] = useState<"active" | "applied" | "dismissed">("active");
  const [selectedGoalFilter, setSelectedGoalFilter] = useState<string | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
  const [campaigns, setCampaigns] = useState<CampaignSection[]>([]);

  // Initialize campaigns data
  useEffect(() => {
    if (isOpen) {
      setCampaigns([
        {
          id: "campaign-1",
          name: "Campaign name goes here",
          adGroups: 2,
          recommendations: 5,
          impact: "20k-23k",
          description: "Potential increase in reach",
          goal: "Awareness",
          isHidden: false,
          isExpanded: false,
          items: [
            {
              id: "rec-1-1",
              type: "campaign",
              title: "Reallocate budget",
              impact: "20k-23k",
              message: "Potential increase in reach",
              affectedAdGroups: ["Ad group name...", "Ad group name...", "Ad group name..."]
            },
            {
              id: "rec-1-2",
              type: "adgroup",
              title: "Add 15 keywords",
              impact: "18k-21k",
              message: "Potential increase in reach",
              adGroup: "Ad group 01 name goes here"
            },
            {
              id: "rec-1-3",
              type: "adgroup",
              title: "Add 20 categories",
              impact: "14k-16k",
              message: "Potential increase in reach",
              adGroup: "Ad group 02 name goes here"
            },
            {
              id: "rec-1-4",
              type: "adgroup",
              title: "Add 20 keywords",
              impact: "14k-16k",
              message: "Potential increase in reach",
              adGroup: "Ad group 02 name goes here"
            },
            {
              id: "rec-1-5",
              type: "adgroup",
              title: "Extend campaign duration",
              impact: "14k-16k",
              message: "Potential increase in reach",
              adGroup: "Ad group 02 name goes here"
            }
          ]
        },
        {
          id: "campaign-2",
          name: "Campaign name goes here",
          adGroups: 2,
          recommendations: 5,
          impact: "20k-23k",
          description: "Potential increase in reach",
          goal: "Awareness",
          isHidden: false,
          isExpanded: false,
          items: [
            {
              id: "rec-2-1",
              type: "campaign",
              title: "Reallocate budget",
              impact: "20k-23k",
              message: "Potential increase in reach",
              affectedAdGroups: ["Ad group name...", "Ad group name...", "Ad group name..."]
            },
            {
              id: "rec-2-2",
              type: "adgroup",
              title: "Add 15 keywords",
              impact: "18k-21k",
              message: "Potential increase in reach",
              adGroup: "Ad group 01 name goes here"
            }
          ]
        },
        {
          id: "campaign-3",
          name: "Campaign name goes here",
          adGroups: 2,
          recommendations: 5,
          impact: "20k-23k",
          description: "Potential increase in reach",
          goal: "Engagement",
          isHidden: false,
          isExpanded: false,
          items: [
            {
              id: "rec-3-1",
              type: "campaign",
              title: "Reallocate budget",
              impact: "20k-23k",
              message: "Potential increase in reach",
              affectedAdGroups: ["Ad group name...", "Ad group name..."]
            },
            {
              id: "rec-3-2",
              type: "adgroup",
              title: "Add 15 keywords",
              impact: "18k-21k",
              message: "Potential increase in reach",
              adGroup: "Ad group 01 name goes here"
            }
          ]
        }
      ]);
      setSelectedRecommendations(new Set());
      setSelectedTab("active");
      setSelectedGoalFilter(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleRecommendation = (recId: string) => {
    const newSelected = new Set(selectedRecommendations);
    if (newSelected.has(recId)) {
      newSelected.delete(recId);
    } else {
      newSelected.add(recId);
    }
    setSelectedRecommendations(newSelected);
  };

  const handleToggleCampaignHidden = (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, isHidden: !c.isHidden } : c
    ));
  };

  const handleToggleCampaignExpanded = (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, isExpanded: !c.isExpanded } : c
    ));
  };

  const handleApplySelected = () => {
    toast("Recommendations applied successfully", {
      closeButton: true,
    });
    setSelectedRecommendations(new Set());
  };

  const filteredCampaigns = selectedGoalFilter
    ? campaigns.filter(c => c.goal === selectedGoalFilter)
    : campaigns;

  const totalRecommendations = campaigns.reduce((sum, c) => sum + c.recommendations, 0);

  return (
    <>
      {/* Scrim/Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[800px] bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#2E2F32] leading-8">
              Recommendations
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-[#E3E4E5]">
          <div className="flex gap-0">
            <button
              onClick={() => setSelectedTab("active")}
              className={`px-3 pb-2 pt-4 text-sm relative ${
                selectedTab === "active"
                  ? "font-bold text-[#2E2F32] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#0053E2] after:rounded-t"
                  : "font-normal text-[#2E2F32]"
              }`}
            >
              Active recommendations ({totalRecommendations})
            </button>
            <button
              onClick={() => setSelectedTab("applied")}
              className={`px-3 pb-2 pt-4 text-sm relative ${
                selectedTab === "applied"
                  ? "font-bold text-[#2E2F32] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#0053E2] after:rounded-t"
                  : "font-normal text-[#2E2F32]"
              }`}
            >
              Applied (8)
            </button>
            <button
              onClick={() => setSelectedTab("dismissed")}
              className={`px-3 pb-2 pt-4 text-sm relative ${
                selectedTab === "dismissed"
                  ? "font-bold text-[#2E2F32] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#0053E2] after:rounded-t"
                  : "font-normal text-[#2E2F32]"
              }`}
            >
              Dismissed (4)
            </button>
          </div>
        </div>

        {/* Goal Filter Pills */}
        <div className="px-6 pt-4 flex items-center gap-3">
          <button
            onClick={() => setSelectedGoalFilter(selectedGoalFilter === "Awareness" ? null : "Awareness")}
            className={`flex items-center gap-3 h-12 px-6 border-2 rounded-lg text-base font-normal transition-all ${
              selectedGoalFilter === "Awareness"
                ? "border-[#2E2F32] bg-[#2E2F32] text-white"
                : "border-[#2E2F32] bg-white text-[#2E2F32] hover:bg-gray-50"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M12 6.75C8.15634 6.75 5.61812 9.5163 4.23279 11.6617L3 10.8383C4.46772 8.57532 7.39216 5.25 12 5.25C16.6078 5.25 19.5323 8.57532 21 10.8383L19.7672 11.6617C18.3819 9.5163 15.8437 6.75 12 6.75Z" fill="currentColor"/>
              <path d="M12 17.25C8.15634 17.25 5.61812 14.4837 4.23279 12.3383L3 13.1617C4.46772 15.4247 7.39216 18.75 12 18.75C16.6078 18.75 19.5323 15.4247 21 13.1617L19.7672 12.3383C18.3819 14.4837 15.8437 17.25 12 17.25Z" fill="currentColor"/>
              <path d="M15.6873 12C15.6873 14.0711 14.0477 15.75 12.0001 15.75C9.95248 15.75 8.31287 14.0711 8.31287 12C8.31287 9.92893 9.95248 8.25 12.0001 8.25C14.0477 8.25 15.6873 9.92893 15.6873 12ZM14.2124 12C14.2124 10.7574 13.2219 9.75 12.0001 9.75C10.7783 9.75 9.78779 10.7574 9.78779 12C9.78779 13.2426 10.7783 14.25 12.0001 14.25C13.2219 14.25 14.2124 13.2426 14.2124 12Z" fill="currentColor"/>
            </svg>
            Awareness
          </button>
          <button
            onClick={() => setSelectedGoalFilter(selectedGoalFilter === "Engagement" ? null : "Engagement")}
            className={`flex items-center gap-3 h-12 px-6 border-2 rounded-lg text-base font-normal transition-all ${
              selectedGoalFilter === "Engagement"
                ? "border-[#2E2F32] bg-[#2E2F32] text-white"
                : "border-[#2E2F32] bg-white text-[#2E2F32] hover:bg-gray-50"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            </svg>
            Engagement
          </button>
          <button
            onClick={() => setSelectedGoalFilter(selectedGoalFilter === "Conversion" ? null : "Conversion")}
            className={`flex items-center gap-3 h-12 px-6 border-2 rounded-lg text-base font-normal transition-all ${
              selectedGoalFilter === "Conversion"
                ? "border-[#2E2F32] bg-[#2E2F32] text-white"
                : "border-[#2E2F32] bg-white text-[#2E2F32] hover:bg-gray-50"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 7V8M12 16V17M10.5 10C10.5 10 11 9 12.5 9C14 9 14.5 10 14.5 10.5C14.5 11.5 13.5 12 12.5 12C11.5 12 10.5 12.5 10.5 13.5C10.5 14 11 15 12.5 15C14 15 14.5 14 14.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Conversion
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <div className="flex flex-col gap-6">
            {filteredCampaigns.map((campaign) => {
              const visibleItems = campaign.isExpanded ? campaign.items : campaign.items.slice(0, 2);
              const hiddenCount = campaign.items.length - 2;

              return (
                <div key={campaign.id} className="rounded-lg border border-[#E3E4E5] overflow-hidden">
                  {/* Campaign Header - White Background */}
                  <div className="flex items-start justify-between p-4 bg-white">
                    <div className="flex flex-col gap-1">
                      <a
                        href="#"
                        className="text-sm text-[#2E2F32] underline hover:no-underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        {campaign.name}
                      </a>
                      <div className="flex items-center gap-2 text-sm text-[#2E2F32]">
                        <span>{campaign.adGroups} ad groups · {campaign.recommendations} recommendations</span>
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-sm font-bold text-[#2A8703]">{campaign.impact}</span>
                        <span className="text-sm font-bold text-[#2E2F32]">{campaign.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleCampaignHidden(campaign.id)}
                      className="text-sm text-[#2E2F32] underline hover:no-underline flex items-center gap-1"
                    >
                      Hide
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${campaign.isHidden ? 'rotate-180' : ''}`}>
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Recommendations List - Gray Background */}
                  {!campaign.isHidden && (
                    <div className="bg-[#F4F5F5] p-4 flex flex-col gap-3">
                      {visibleItems.map((rec) => (
                        <div
                          key={rec.id}
                          className={`flex items-start gap-3 p-4 rounded-lg ${
                            selectedRecommendations.has(rec.id) ? 'bg-[#F0F5FF]' : 'bg-white'
                          }`}
                        >
                          {/* Checkbox */}
                          <div className="flex items-start pt-0.5">
                            <Checkbox
                              checked={selectedRecommendations.has(rec.id)}
                              onCheckedChange={() => handleToggleRecommendation(rec.id)}
                              className="w-6 h-6 rounded border-2 border-[#2E2F32] data-[state=checked]:bg-[#2E2F32] data-[state=checked]:border-[#2E2F32] data-[state=unchecked]:bg-white"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-bold text-[#2E2F32]">{rec.title}</div>
                              <div className="flex items-end gap-1">
                                <span className="text-sm font-bold text-[#2A8703]">{rec.impact}</span>
                                <span className="text-sm text-[#2E2F32]">{rec.message}</span>
                              </div>
                            </div>

                            {/* Affected ad groups */}
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

                            {/* Ad group name for adgroup type */}
                            {rec.adGroup && (
                              <div className="text-sm text-[#515357]">{rec.adGroup}</div>
                            )}
                          </div>

                          {/* Card CTAs */}
                          <div className="flex items-center gap-4">
                            <a
                              href="#"
                              className="text-sm text-[#2E2F32] underline hover:no-underline whitespace-nowrap"
                              onClick={(e) => e.preventDefault()}
                            >
                              Dismiss
                            </a>
                            <Button
                              variant="tertiary"
                              size="small"
                              onClick={(e) => e.preventDefault()}
                            >
                              View details
                            </Button>
                          </div>
                        </div>
                      ))}

                      {/* Show more/less link */}
                      {campaign.items.length > 2 && (
                        <button
                          onClick={() => handleToggleCampaignExpanded(campaign.id)}
                          className="text-sm text-[#2E2F32] underline hover:no-underline self-end"
                        >
                          {campaign.isExpanded ? 'Show less' : `Show more (${hiddenCount})`}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#E3E4E5] px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="text-sm text-[#2E2F32] underline hover:no-underline"
            >
              Cancel
            </a>
            <Button
              onClick={handleApplySelected}
              disabled={selectedRecommendations.size === 0}
              className="h-8 px-4 text-sm font-bold bg-[#0053E2] hover:bg-[#0046c7] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply selected
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
