import { X, ArrowUp, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/Alert";
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

interface AppliedRecommendation {
  id: string;
  title: string;
  campaignName: string;
  type: string;
  dateApplied: string;
  impactType: string;
  impactValue: string;
}

interface DismissedRecommendation {
  id: string;
  title: string;
  campaignName: string;
  type: string;
  impactType: string;
  impactValue: string;
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
  const [appliedRecommendations, setAppliedRecommendations] = useState<AppliedRecommendation[]>([]);
  const [dismissedRecommendations, setDismissedRecommendations] = useState<DismissedRecommendation[]>([]);
  const [viewingDetailId, setViewingDetailId] = useState<string | null>(null);
  const [newlyAppliedIds, setNewlyAppliedIds] = useState<Set<string>>(new Set());
  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = localStorage.getItem('recommendationsPanelWidth');
    return saved ? parseInt(saved, 10) : 800;
  });
  const [isResizing, setIsResizing] = useState(false);

  // Initialize campaigns data
  useEffect(() => {
    if (isOpen) {
      setCampaigns([
        {
          id: "campaign-1",
          name: "Coca-Cola Zero Sugar - Summer Campaign 2024",
          adGroups: 3,
          recommendations: 8,
          impact: "2.4M-2.8M",
          description: "Potential increase in impressions",
          goal: "Awareness",
          isHidden: false,
          isExpanded: false,
          items: [
            {
              id: "rec-1-1",
              type: "campaign",
              title: "Reallocate budget across ad groups",
              impact: "2.4M-2.8M",
              message: "Potential increase in impressions",
              affectedAdGroups: ["Young Adults 18-24", "Fitness Enthusiasts", "Health Conscious"]
            },
            {
              id: "rec-1-2",
              type: "adgroup",
              title: "Add lifestyle and fitness placements",
              impact: "890K-1.2M",
              message: "Potential increase in impressions",
              adGroup: "Young Adults 18-24"
            },
            {
              id: "rec-1-3",
              type: "adgroup",
              title: "Optimize creative for mobile devices",
              impact: "750K-920K",
              message: "Potential increase in engagement",
              adGroup: "Fitness Enthusiasts"
            },
            {
              id: "rec-1-4",
              type: "adgroup",
              title: "Increase bid for premium placements",
              impact: "640K-780K",
              message: "Potential increase in impressions",
              adGroup: "Health Conscious"
            },
            {
              id: "rec-1-5",
              type: "adgroup",
              title: "Extend campaign to high-performing locations",
              impact: "520K-650K",
              message: "Potential increase in reach",
              adGroup: "Young Adults 18-24"
            },
            {
              id: "rec-1-6",
              type: "adgroup",
              title: "Adjust bid strategy for better ROI",
              impact: "450K-580K",
              message: "Potential increase in conversions",
              adGroup: "Young Adults 18-24"
            },
            {
              id: "rec-1-7",
              type: "adgroup",
              title: "Add video ad format",
              impact: "680K-830K",
              message: "Potential increase in engagement",
              adGroup: "Fitness Enthusiasts"
            },
            {
              id: "rec-1-8",
              type: "adgroup",
              title: "Expand targeting to lookalike audiences",
              impact: "590K-720K",
              message: "Potential increase in reach",
              adGroup: "Health Conscious"
            }
          ]
        },
        {
          id: "campaign-2",
          name: "Coca-Cola Original - Holiday Brand Campaign",
          adGroups: 4,
          recommendations: 4,
          impact: "3.1M-3.6M",
          description: "Potential increase in impressions",
          goal: "Awareness",
          isHidden: false,
          isExpanded: false,
          items: [
            {
              id: "rec-2-1",
              type: "campaign",
              title: "Add seasonal audience segments",
              impact: "3.1M-3.6M",
              message: "Potential increase in impressions",
              affectedAdGroups: ["Families", "Holiday Shoppers", "Gift Buyers", "Entertainment Seekers"]
            },
            {
              id: "rec-2-2",
              type: "adgroup",
              title: "Increase frequency cap during peak hours",
              impact: "1.2M-1.5M",
              message: "Potential increase in brand recall",
              adGroup: "Families"
            },
            {
              id: "rec-2-3",
              type: "adgroup",
              title: "Add video ad formats",
              impact: "980K-1.1M",
              message: "Potential increase in engagement",
              adGroup: "Holiday Shoppers"
            },
            {
              id: "rec-2-4",
              type: "adgroup",
              title: "Target streaming and entertainment sites",
              impact: "850K-1.0M",
              message: "Potential increase in impressions",
              adGroup: "Entertainment Seekers"
            }
          ]
        },
        {
          id: "campaign-3",
          name: "Coca-Cola Energy - Sports & Gaming",
          adGroups: 3,
          recommendations: 3,
          impact: "1.8M-2.1M",
          description: "Potential increase in clicks",
          goal: "Engagement",
          isHidden: false,
          isExpanded: false,
          items: [
            {
              id: "rec-3-1",
              type: "campaign",
              title: "Allocate more budget to gaming platforms",
              impact: "1.8M-2.1M",
              message: "Potential increase in clicks",
              affectedAdGroups: ["Gamers 18-35", "Sports Fans", "Esports Viewers"]
            },
            {
              id: "rec-3-2",
              type: "adgroup",
              title: "Add interactive ad formats",
              impact: "720K-850K",
              message: "Potential increase in engagement rate",
              adGroup: "Gamers 18-35"
            },
            {
              id: "rec-3-3",
              type: "adgroup",
              title: "Target live sports streaming platforms",
              impact: "650K-780K",
              message: "Potential increase in clicks",
              adGroup: "Sports Fans"
            }
          ]
        },
        {
          id: "campaign-4",
          name: "Coca-Cola Mini - Impulse Purchase Driver",
          adGroups: 2,
          recommendations: 3,
          impact: "420K-520K",
          description: "Potential increase in store visits",
          goal: "Conversion",
          isHidden: false,
          isExpanded: false,
          items: [
            {
              id: "rec-4-1",
              type: "campaign",
              title: "Add location-based targeting near stores",
              impact: "420K-520K",
              message: "Potential increase in store visits",
              affectedAdGroups: ["On-the-Go Consumers", "Convenience Shoppers"]
            },
            {
              id: "rec-4-2",
              type: "adgroup",
              title: "Enable dynamic product ads with offers",
              impact: "280K-340K",
              message: "Potential increase in click-through rate",
              adGroup: "On-the-Go Consumers"
            },
            {
              id: "rec-4-3",
              type: "adgroup",
              title: "Optimize for mobile app installs",
              impact: "180K-220K",
              message: "Potential increase in conversions",
              adGroup: "Convenience Shoppers"
            }
          ]
        }
      ]);
      setAppliedRecommendations([
        {
          id: "applied-1",
          title: "Reallocate budget across ad groups",
          campaignName: "Campaign name 01",
          type: "Budget",
          dateApplied: "01/20/2026",
          impactType: "Impressions",
          impactValue: "35k"
        },
        {
          id: "applied-2",
          title: "Add 15 keywords",
          campaignName: "Campaign name 02",
          type: "Targeting",
          dateApplied: "01/20/2026",
          impactType: "Clicks",
          impactValue: "2.5%"
        },
        {
          id: "applied-3",
          title: "Add 7 categories",
          campaignName: "Campaign name 02",
          type: "Targeting",
          dateApplied: "01/20/2026",
          impactType: "Transactions",
          impactValue: "15%"
        },
        {
          id: "applied-4",
          title: "Extend campaign duration",
          campaignName: "Campaign name 03",
          type: "Date",
          dateApplied: "01/20/2026",
          impactType: "Impressions",
          impactValue: "15k"
        },
        {
          id: "applied-5",
          title: "Reallocate budget across ad groups",
          campaignName: "Campaign name 01",
          type: "Data",
          dateApplied: "01/20/2026",
          impactType: "Impressions",
          impactValue: "100%"
        },
        {
          id: "applied-6",
          title: "Add 15 keywords",
          campaignName: "Campaign name 02",
          type: "Data",
          dateApplied: "01/20/2026",
          impactType: "Impressions",
          impactValue: "100%"
        },
        {
          id: "applied-7",
          title: "Add 7 categories",
          campaignName: "Campaign name 02",
          type: "Data",
          dateApplied: "01/20/2026",
          impactType: "Transactions",
          impactValue: "100%"
        },
        {
          id: "applied-8",
          title: "Extend campaign duration",
          campaignName: "Campaign name 03",
          type: "Data",
          dateApplied: "01/20/2026",
          impactType: "Transactions",
          impactValue: "100%"
        }
      ]);
      setDismissedRecommendations([
        {
          id: "dismissed-1",
          title: "Reallocate budget across ad groups",
          campaignName: "Campaign name 01",
          type: "Budget",
          impactType: "Impressions",
          impactValue: "27k-35k"
        },
        {
          id: "dismissed-2",
          title: "Add 15 keywords",
          campaignName: "Campaign name 02",
          type: "Targeting",
          impactType: "Clicks",
          impactValue: "2.1%-2.5%"
        },
        {
          id: "dismissed-3",
          title: "Add 7 categories",
          campaignName: "Campaign name 02",
          type: "Targeting",
          impactType: "Transactions",
          impactValue: "13%-15%"
        }
      ]);
      setSelectedRecommendations(new Set());
      setSelectedTab("active");
      setSelectedGoalFilter(campaignGoal || null);
    }
  }, [isOpen, campaignGoal]);

  // Resize handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = window.innerWidth - e.clientX;
      const maxWidth = Math.min(800, window.innerWidth - 40); // Leave 40px margin on small screens
      const clampedWidth = Math.min(Math.max(newWidth, 420), maxWidth);
      setPanelWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Save panel width to localStorage
  useEffect(() => {
    localStorage.setItem('recommendationsPanelWidth', panelWidth.toString());
  }, [panelWidth]);

  // Adjust panel width on window resize
  useEffect(() => {
    const handleWindowResize = () => {
      const maxWidth = Math.min(800, window.innerWidth - 40);
      if (panelWidth > maxWidth) {
        setPanelWidth(maxWidth);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [panelWidth]);

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
    // Add all selected recommendations to the applied set
    setNewlyAppliedIds(prev => new Set([...prev, ...selectedRecommendations]));
    toast.success('Recommendation applied successfully');
    setSelectedRecommendations(new Set());
  };

  // Helper function to check if a recommendation conflicts with selected ones
  const getConflictingRecommendation = (rec: RecommendationItem, campaignId: string): { isConflicted: boolean; conflictingRecTitle?: string } => {
    // Get all selected recommendations from the same campaign
    const currentCampaign = campaigns.find(c => c.id === campaignId);
    if (!currentCampaign) return { isConflicted: false };

    const selectedRecsInCampaign = currentCampaign.items.filter(r => selectedRecommendations.has(r.id));

    for (const selectedRec of selectedRecsInCampaign) {
      // Skip if comparing with itself
      if (selectedRec.id === rec.id) continue;

      // If both are ad-group level and from the same ad group, they conflict
      if (selectedRec.type === 'adgroup' && rec.type === 'adgroup' &&
          selectedRec.adGroup && rec.adGroup && selectedRec.adGroup === rec.adGroup) {
        return { isConflicted: true, conflictingRecTitle: selectedRec.title };
      }

      // If selected recommendation is campaign-level (affects multiple ad groups)
      if (selectedRec.type === 'campaign' && selectedRec.affectedAdGroups && selectedRec.affectedAdGroups.length > 0) {
        // If current rec is ad group level, it conflicts
        if (rec.type === 'adgroup') {
          return { isConflicted: true, conflictingRecTitle: selectedRec.title };
        }
      }

      // If selected recommendation is ad group level and current one is campaign level
      if (selectedRec.type === 'adgroup' && rec.type === 'campaign' && rec.affectedAdGroups) {
        return { isConflicted: true, conflictingRecTitle: selectedRec.title };
      }
    }

    return { isConflicted: false };
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
      <div
        className="fixed top-0 right-0 bottom-0 bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col"
        style={{ width: `${panelWidth}px` }}
      >
        {/* Resize Handle */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-[#0053E2] cursor-col-resize transition-colors z-10"
          onMouseDown={handleMouseDown}
        >
          {/* Invisible expanded hit area */}
          <div className="absolute left-0 top-0 bottom-0 w-4 -translate-x-1.5" />
          {/* Visual indicator - centered dots */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-[#909196]" />
            <div className="w-1 h-1 rounded-full bg-[#909196]" />
            <div className="w-1 h-1 rounded-full bg-[#909196]" />
          </div>
        </div>
        {viewingDetailId ? (
          /* Detail View */
          <>
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-0">
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

            {/* Breadcrumb */}
            <div className="px-6 pt-4 pb-4">
              <div className="flex items-center gap-2 text-sm text-[#2E2F32]">
                <button
                  onClick={() => setViewingDetailId(null)}
                  className="underline hover:no-underline"
                >
                  Recommendations
                </button>
                <span>/</span>
                <span>Recommendation details</span>
              </div>
            </div>

            {/* Detail Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="flex flex-col gap-4">
                {/* Title and Impact */}
                <div>
                  <h3 className="text-base font-bold text-[#2E2F32] mb-1">Add 15 keywords</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-sm font-bold text-[#2A8703]">15k-18k</span>
                    <span className="text-sm text-[#2E2F32]">Potential increase in reach</span>
                  </div>
                </div>

                {/* Alert Banner */}
                <Alert variant="info">
                  Applying this recommendation will update the ad group. Other recommendations for the same ad group may no longer apply.
                </Alert>

                {/* Campaign */}
                <div>
                  <h4 className="text-sm font-bold text-[#2E2F32] mb-1">Campaign</h4>
                  <Link href="#" className="text-sm">
                    H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839
                  </Link>
                </div>

                {/* Ad group */}
                <div>
                  <h4 className="text-sm font-bold text-[#2E2F32] mb-1">Ad group</h4>
                  <Link href="#" className="text-sm">
                    Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio
                  </Link>
                </div>

                {/* Recommended keywords and Current - Combined container */}
                <div className="bg-[#F8F8F8] border border-[#E3E4E5] rounded">
                  {/* Recommended keywords */}
                  <div className="p-4 border-b border-[#E3E4E5] bg-white">
                    <h4 className="text-sm font-bold text-[#2E2F32] mb-2">Recommended keywords</h4>
                    <p className="text-sm text-[#2E2F32] mb-2 leading-relaxed">
                      Coca-Cola freestyle machine, Coke vending machine, Coca-Cola sponsorship deals, Coke tasting event, Coca-Cola heritage tour, Coke glassware, Coca-Cola recipe pairing, Coke float dessert, Coca-Cola ice cream soda, Coke recipe hacks, Coca-Cola themed cafe, Coke and popcorn combo, Coca-Cola holiday truck tour, Coke art installation, Coca-Cola fan club, Coke TikTok challenge, Coca-Cola merch giveaway
                    </p>
                    <button className="text-sm underline hover:no-underline">
                      View more
                    </button>
                  </div>

                  {/* Current */}
                  <div>
                    <button className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-100 transition-colors">
                      <h4 className="text-sm font-bold text-[#2E2F32]">Current</h4>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform rotate-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.14645 5.39645C3.32669 5.2162 3.6103 5.20234 3.80645 5.35485L3.85355 5.39645L8 9.5425L12.1464 5.39645C12.3267 5.2162 12.6103 5.20234 12.8064 5.35485L12.8536 5.39645C13.0338 5.57669 13.0477 5.8603 12.8951 6.05645L12.8536 6.10355L8.35355 10.6036C8.17331 10.7838 7.8897 10.7977 7.69355 10.6451L7.64645 10.6036L3.14645 6.10355C2.95118 5.90829 2.95118 5.59171 3.14645 5.39645Z" fill="#2E2F32"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Why we recommend this */}
                <div>
                  <h4 className="text-sm font-bold text-[#2E2F32] mb-2">Why we recommend this</h4>
                  <p className="text-sm text-[#2E2F32]">
                    Based on your campaign performance, we've identified that adding keywords could significantly increase your reach. Similar campaigns saw an average 12% increase in impressions while maintaining conversion quality. This recommendation uses machine learning to find users with similar characteristics to your best-performing audience segments.
                  </p>
                </div>
              </div>
            </div>

            {/* Detail Footer */}
            <div className="border-t border-[#E3E4E5] px-6 py-4">
              <div className="flex items-center justify-end gap-4">
                {viewingDetailId && newlyAppliedIds.has(viewingDetailId) ? (
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <circle cx="10" cy="10" r="10" fill="#2A8703"/>
                      <path d="M14.5 7L8.5 13L5.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-normal text-[#2A8703]">Recommendation applied</span>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setViewingDetailId(null)}
                      className="text-sm underline hover:no-underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="text-sm underline hover:no-underline"
                    >
                      Dismiss
                    </button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        if (viewingDetailId) {
                          setNewlyAppliedIds(prev => new Set([...prev, viewingDetailId]));
                          toast.success('Recommendation applied successfully');
                          // Keep user on detail view - footer will update to show "Recommendation applied"
                        }
                      }}
                    >
                      Apply recommendation
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          /* List View */
          <>
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

        {/* Filter Dropdowns - Only show on active tab */}
        {selectedTab === "active" && (
          <div className="px-6 pt-4 flex items-center gap-3">
            <button
              className="flex items-center justify-center gap-2 h-8 px-4 rounded-full text-base font-normal transition-all border-2 border-[#0053E2] bg-[#E5F0FF] text-[#2E2F32]"
            >
              Awareness campaign
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.93306 7.24553C4.15578 7.02281 4.51544 7.00292 4.75806 7.18482L4.81694 7.24553L10 12.4281L15.1831 7.24553C15.4058 7.02281 15.7654 7.00292 16.0081 7.18482L16.0669 7.24553C16.2896 7.46825 16.3095 7.82791 16.1276 8.07053L16.0669 8.12941L10.4419 13.7544C10.2192 13.9771 9.85956 13.997 9.61694 13.8151L9.55806 13.7544L3.93306 8.12941C3.68897 7.88532 3.68897 7.48962 3.93306 7.24553Z" fill="#2E2F32"/>
              </svg>
            </button>
            <button
              className="flex items-center justify-center gap-2 h-8 px-4 rounded-full text-base font-normal transition-all border border-[#74767C] bg-white text-[#2E2F32] hover:bg-gray-50"
            >
              Type
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.93306 7.24553C4.15578 7.02281 4.51544 7.00292 4.75806 7.18482L4.81694 7.24553L10 12.4281L15.1831 7.24553C15.4058 7.02281 15.7654 7.00292 16.0081 7.18482L16.0669 7.24553C16.2896 7.46825 16.3095 7.82791 16.1276 8.07053L16.0669 8.12941L10.4419 13.7544C10.2192 13.9771 9.85956 13.997 9.61694 13.8151L9.55806 13.7544L3.93306 8.12941C3.68897 7.88532 3.68897 7.48962 3.93306 7.24553Z" fill="#2E2F32"/>
              </svg>
            </button>
            <button
              className="flex items-center justify-center gap-2 h-8 px-4 rounded-full text-base font-normal transition-all border border-[#74767C] bg-white text-[#2E2F32] hover:bg-gray-50"
            >
              Campaign
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.93306 7.24553C4.15578 7.02281 4.51544 7.00292 4.75806 7.18482L4.81694 7.24553L10 12.4281L15.1831 7.24553C15.4058 7.02281 15.7654 7.00292 16.0081 7.18482L16.0669 7.24553C16.2896 7.46825 16.3095 7.82791 16.1276 8.07053L16.0669 8.12941L10.4419 13.7544C10.2192 13.9771 9.85956 13.997 9.61694 13.8151L9.55806 13.7544L3.93306 8.12941C3.68897 7.88532 3.68897 7.48962 3.93306 7.24553Z" fill="#2E2F32"/>
              </svg>
            </button>
          </div>
        )}

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          {selectedTab === "applied" ? (
            /* Applied Recommendations Table */
            <div className="bg-white rounded-lg border border-[#E3E4E5]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E3E4E5]">
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Recommendation</th>
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Type</th>
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Date applied</th>
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedRecommendations.map((rec) => (
                    <tr key={rec.id} className="border-b border-[#E3E4E5] last:border-b-0">
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <div className="text-sm text-[#2E2F32]">{rec.title}</div>
                          <div className="text-sm text-[#74767C]">{rec.campaignName}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-[#2E2F32]">{rec.type}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-[#2E2F32]">{rec.dateApplied}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#2E2F32]">{rec.impactType}</span>
                          <span className="flex items-center gap-1 text-sm font-bold text-[#2A8703]">
                            <ArrowUp className="w-4 h-4" />
                            {rec.impactValue}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : selectedTab === "dismissed" ? (
            /* Dismissed Recommendations Table */
            <div className="bg-white rounded-lg border border-[#E3E4E5]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E3E4E5]">
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Recommendation</th>
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Type</th>
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Impact</th>
                    <th className="text-left px-4 py-3 text-sm font-normal text-[#2E2F32]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dismissedRecommendations.map((rec) => (
                    <tr key={rec.id} className="border-b border-[#E3E4E5] last:border-b-0">
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <div className="text-sm text-[#2E2F32]">{rec.title}</div>
                          <div className="text-sm text-[#74767C]">{rec.campaignName}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-[#2E2F32]">{rec.type}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#2E2F32]">{rec.impactType}</span>
                          <span className="flex items-center gap-1 text-sm font-bold text-[#2A8703]">
                            <ArrowUp className="w-4 h-4" />
                            {rec.impactValue}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button className="flex items-center gap-1 text-sm underline hover:no-underline">
                          <RotateCcw className="w-4 h-4" />
                          Restore
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Banner Text */}
              <div className="text-sm text-[#2E2F32]">
                Some recommendations may become unavailable based on your selection.
              </div>

              {filteredCampaigns.map((campaign) => {
              const visibleItems = campaign.isExpanded ? campaign.items : campaign.items.slice(0, 2);
              const hiddenCount = campaign.items.length - 2;

              return (
                <div key={campaign.id} className="rounded-lg border border-[#E3E4E5] overflow-hidden">
                  {/* Campaign Header - White Background */}
                  <div className="flex items-start justify-between p-4 bg-white">
                    <div className="flex flex-col gap-1">
                      <div className="text-base text-[#2E2F32]">
                        {campaign.name}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-[#2A8703]">{campaign.impact}</span>
                        <span className="text-base text-[#2E2F32]">{campaign.description}</span>
                      </div>
                    </div>
                    <div className="text-sm text-[#74767C]">
                      {campaign.recommendations} recommendation{campaign.recommendations !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Recommendations List - Gray Background */}
                  {!campaign.isHidden && (
                    <div className="bg-[#F4F5F5] p-4 flex flex-col gap-3">
                      {visibleItems.map((rec) => {
                        const conflict = getConflictingRecommendation(rec, campaign.id);
                        const isDisabled = conflict.isConflicted;

                        return (
                          <div
                            key={rec.id}
                            className={`flex flex-col rounded-lg bg-white ${
                              selectedRecommendations.has(rec.id) ? 'border border-black' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3 p-4">
                              {/* Checkbox */}
                              <div className="flex items-start pt-0.5">
                                <Checkbox
                                  checked={selectedRecommendations.has(rec.id)}
                                  onCheckedChange={() => !isDisabled && !newlyAppliedIds.has(rec.id) && handleToggleRecommendation(rec.id)}
                                  disabled={isDisabled || newlyAppliedIds.has(rec.id)}
                                  className={`w-6 h-6 rounded border ${
                                    isDisabled || newlyAppliedIds.has(rec.id)
                                      ? 'border-[#C7C8CB] bg-[#F4F5F5] cursor-not-allowed'
                                      : 'border-[#2E2F32] data-[state=checked]:bg-[#2E2F32] data-[state=checked]:border data-[state=checked]:border-black data-[state=unchecked]:bg-white'
                                  }`}
                                />
                              </div>

                              {/* Content */}
                              <div className="flex-1 flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                  <div className={`text-base font-normal ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#2E2F32]'}`}>
                                    {rec.title}
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className={`text-base font-bold ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#2A8703]'}`}>
                                      {rec.impact}
                                    </span>
                                    <span className={`text-base ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#2E2F32]'}`}>
                                      {rec.message}
                                    </span>
                                  </div>
                                </div>

                                {/* Affected ad groups */}
                                {rec.affectedAdGroups && (
                                  <div className="flex flex-col gap-1">
                                    <span className={`text-sm ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                      Ad group(s) affected
                                    </span>
                                    <div className={`text-base ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                      {rec.affectedAdGroups.join(' · ')}
                                    </div>
                                  </div>
                                )}

                                {/* Ad group name for adgroup type */}
                                {rec.adGroup && (
                                  <div className="flex flex-col gap-1">
                                    <span className={`text-sm ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                      Ad group(s) affected
                                    </span>
                                    <div className={`text-base ${isDisabled ? 'text-[#C7C8CB]' : 'text-[#74767C]'}`}>
                                      {rec.adGroup}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Card CTAs - Always enabled */}
                              <div className="flex items-center gap-4">
                                {newlyAppliedIds.has(rec.id) ? (
                                  <div className="flex items-center gap-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                      <circle cx="10" cy="10" r="10" fill="#2A8703"/>
                                      <path d="M14.5 7L8.5 13L5.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-sm font-normal text-[#2A8703] whitespace-nowrap">Recommendation applied</span>
                                  </div>
                                ) : (
                                  <>
                                    <Link
                                      href="#"
                                      className="text-sm whitespace-nowrap"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Dismiss
                                    </Link>
                                    <Button
                                      variant="secondary"
                                      size="small"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setViewingDetailId(rec.id);
                                      }}
                                    >
                                      View details
                                    </Button>
                                    <Button
                                      variant="primary"
                                      size="small"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (!isDisabled) {
                                          setNewlyAppliedIds(prev => new Set([...prev, rec.id]));
                                          toast.success('Recommendation applied successfully');
                                        }
                                      }}
                                      disabled={isDisabled}
                                    >
                                      Apply
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Show more/less link */}
                      {campaign.items.length > 2 && (
                        <button
                          onClick={() => handleToggleCampaignExpanded(campaign.id)}
                         
                          className="text-sm underline hover:no-underline self-end"
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
          )}
        </div>

        {/* Bottom Section */}
        {selectedTab === "active" && (
          <div className="border-t border-[#E3E4E5] px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {selectedRecommendations.size > 0 && (
                <span className="text-sm text-[#2E2F32]">
                  {selectedRecommendations.size} recommendation{selectedRecommendations.size !== 1 ? 's' : ''} selected
                </span>
              )}
              <div className="flex items-center gap-4 ml-auto">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="text-sm"
                >
                  Cancel
                </Link>
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
        )}
          </>
        )}
      </div>
    </>
  );
}
