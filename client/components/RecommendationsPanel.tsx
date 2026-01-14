import { X, Eye } from "lucide-react";

interface RecommendationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  campaignGoal?: string;
}

export default function RecommendationsPanel({ isOpen, onClose, campaignGoal = "Awareness" }: RecommendationsPanelProps) {
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

  return (
    <>
      {/* Scrim/Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[452px] bg-white shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-2 border-b border-[#E3E4E5]">
          <div className="flex flex-col pt-1 pb-2">
            <h2 className="text-xl font-bold text-[#2E2F32] leading-7">
              Recommendations
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-transparent"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-[#2E2F32]" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E3E4E5]" />

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
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
                  <button 
                    className="h-8 text-sm text-[#2E2F32] underline hover:no-underline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle dismiss
                    }}
                  >
                    Dismiss
                  </button>
                  <button 
                    className="h-8 text-sm text-[#2E2F32] underline hover:no-underline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle view recommendations
                    }}
                  >
                    View recommendations
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="h-px bg-[#E3E4E5]" />
      </div>
    </>
  );
}
