import { X, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";

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

export default function RecommendationsPanel({ isOpen, onClose, campaignGoal = "Awareness" }: RecommendationsPanelProps) {
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());

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
                    <Button 
                      variant="link"
                      className="h-8 text-sm text-[#2E2F32] p-0"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle dismiss
                      }}
                    >
                      Dismiss
                    </Button>
                    <Button 
                      variant="link"
                      className="h-8 text-sm text-[#2E2F32] p-0"
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewRecommendations(rec.id, rec.name);
                      }}
                    >
                      View recommendations
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <Button
                  variant="link"
                  onClick={handleBackToList}
                  className="h-auto p-0 text-[#515357]"
                >
                  Main
                </Button>
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
                          <Button variant="link" className="h-8 text-sm text-[#2E2F32] p-0">
                            Dismiss
                          </Button>
                          <Button variant="link" className="h-8 text-sm text-[#2E2F32] p-0">
                            View details
                          </Button>
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
                                  <Button variant="link" className="h-8 text-sm text-[#2E2F32] p-0">
                                    Dismiss
                                  </Button>
                                  <Button variant="link" className="h-8 text-sm text-[#2E2F32] p-0">
                                    View details
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
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
                              <Button variant="link" className="h-8 text-sm text-[#2E2F32] p-0">
                                Dismiss
                              </Button>
                              <Button variant="link" className="h-8 text-sm text-[#2E2F32] p-0">
                                View details
                              </Button>
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
              <Button 
                variant="link"
                onClick={handleBackToList}
                className="h-8 text-sm text-[#2E2F32] p-0"
              >
                Cancel
              </Button>
              <Button className="h-8 px-4 text-sm font-bold bg-[#0071CE] hover:bg-[#004F9A]">
                Apply selected
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
