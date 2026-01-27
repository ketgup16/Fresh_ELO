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
        <div className="px-6">
          <div className="flex items-center gap-6 border-b-2 border-[#E3E4E5]">
            <button
              onClick={() => setSelectedTab("active")}
              className={`pb-3 text-sm font-bold border-b-2 -mb-0.5 transition-colors ${
                selectedTab === "active"
                  ? "border-[#0053E2] text-[#2E2F32]"
                  : "border-transparent text-[#2E2F32]"
              }`}
            >
              Active recommendations ({totalRecommendations})
            </button>
            <button
              onClick={() => setSelectedTab("applied")}
              className={`pb-3 text-sm font-bold border-b-2 -mb-0.5 transition-colors ${
                selectedTab === "applied"
                  ? "border-[#0053E2] text-[#2E2F32]"
                  : "border-transparent text-[#2E2F32]"
              }`}
            >
              Applied (8)
            </button>
            <button
              onClick={() => setSelectedTab("dismissed")}
              className={`pb-3 text-sm font-bold border-b-2 -mb-0.5 transition-colors ${
                selectedTab === "dismissed"
                  ? "border-[#0053E2] text-[#2E2F32]"
                  : "border-transparent text-[#2E2F32]"
              }`}
            >
              Dismissed (4)
            </button>
          </div>
        </div>

        {/* Goal Filter Pills */}
        <div className="px-6 pt-4 flex items-center gap-2">
          <button
            onClick={() => setSelectedGoalFilter(selectedGoalFilter === "Awareness" ? null : "Awareness")}
            className={`flex items-center gap-2 h-8 px-3 border rounded-full text-sm transition-all ${
              selectedGoalFilter === "Awareness"
                ? "border-2 border-[#0053E2] bg-[#E9F1FE] text-[#2E2F32]"
                : "border-[#2E2F32] bg-white text-[#2E2F32] hover:bg-gray-50"
            }`}
          >
            <Eye className="w-4 h-4" />
            Awareness
          </button>
          <button
            onClick={() => setSelectedGoalFilter(selectedGoalFilter === "Engagement" ? null : "Engagement")}
            className={`flex items-center gap-2 h-8 px-3 border rounded-full text-sm transition-all ${
              selectedGoalFilter === "Engagement"
                ? "border-2 border-[#0053E2] bg-[#E9F1FE] text-[#2E2F32]"
                : "border-[#2E2F32] bg-white text-[#2E2F32] hover:bg-gray-50"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="5.5" cy="6.5" r="1" fill="currentColor"/>
              <circle cx="10.5" cy="6.5" r="1" fill="currentColor"/>
              <path d="M5 10C5.5 11 6.5 11.5 8 11.5C9.5 11.5 10.5 11 11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Engagement
          </button>
          <button
            onClick={() => setSelectedGoalFilter(selectedGoalFilter === "Conversion" ? null : "Conversion")}
            className={`flex items-center gap-2 h-8 px-3 border rounded-full text-sm transition-all ${
              selectedGoalFilter === "Conversion"
                ? "border-2 border-[#0053E2] bg-[#E9F1FE] text-[#2E2F32]"
                : "border-[#2E2F32] bg-white text-[#2E2F32] hover:bg-gray-50"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                <div key={campaign.id} className="flex flex-col">
                  {/* Campaign Header */}
                  <div className="flex items-start justify-between mb-3">
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

                  {/* Recommendations List */}
                  {!campaign.isHidden && (
                    <div className="flex flex-col gap-4">
                      {visibleItems.map((rec) => (
                        <div
                          key={rec.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border ${
                            selectedRecommendations.has(rec.id) ? 'border-[#2E2F32]' : 'border-[#E3E4E5]'
                          } bg-white`}
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
                          <div className="flex-1 flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
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
                                onClick={(e) => e.preventDefault()}
                              >
                                View details
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Show more/less link */}
                      {campaign.items.length > 2 && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleToggleCampaignExpanded(campaign.id)}
                            className="text-sm text-[#2E2F32] underline hover:no-underline"
                          >
                            {campaign.isExpanded ? 'Show less' : `Show more (${hiddenCount})`}
                          </button>
                        </div>
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
