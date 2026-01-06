import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Check } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  biddingStrategy: string;
  biddingTarget: string;
}

interface BiddingStrategyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignData: Campaign;
  recommendedValue?: string;
  onSave: (newValue: string) => void;
}

export default function BiddingStrategyModal({
  open,
  onOpenChange,
  campaignData,
  recommendedValue,
  onSave,
}: BiddingStrategyModalProps) {
  const [selectedStrategy, setSelectedStrategy] = React.useState("target-roas");
  const [roasValue, setRoasValue] = React.useState("");
  const [recApplied, setRecApplied] = React.useState(false);

  // Extract current ROAS value from biddingTarget like "(set at 4.10)"
  const extractRoasValue = (target: string): string => {
    const match = target.match(/\(set at ([\d.]+)\)/);
    return match ? match[1] : "4.10";
  };

  // Initialize values when modal opens
  React.useEffect(() => {
    if (open) {
      const currentValue = extractRoasValue(campaignData.biddingTarget);
      setRoasValue(currentValue);
      setRecApplied(false);
      setSelectedStrategy("target-roas");
    }
  }, [open, campaignData.biddingTarget]);

  const handleApplyRecommendation = () => {
    if (recommendedValue) {
      setRoasValue(recommendedValue);
      setRecApplied(true);
    }
  };

  const handleReset = () => {
    const currentValue = extractRoasValue(campaignData.biddingTarget);
    setRoasValue(currentValue);
    setRecApplied(false);
  };

  const handleSave = () => {
    onSave(roasValue);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-[20px] font-bold text-[#2E2F32] leading-7">
            Bidding strategy
          </DialogTitle>
          <p className="text-sm text-[#2E2F32] leading-5 mt-1">
            Choose the strategy that best suits your business goals. <span className="underline cursor-pointer">Learn more</span>
          </p>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-6 flex flex-col gap-6">
          {/* Radio Options */}
          <div className="flex flex-col gap-6 py-2">
            {/* Dynamic bidding */}
            <div className="flex items-start gap-1">
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-[#2E2F32] bg-white" />
                </div>
                <label className="ml-3 text-sm text-[#2E2F32] leading-5 cursor-pointer">
                  Dynamic bidding
                </label>
              </div>
              <span className="ml-1 px-2 py-0.5 text-xs text-[#AF2F00] border border-[#AF2F00] rounded-sm bg-white">
                Beta
              </span>
            </div>

            {/* Target ROAS */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-1">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#2E2F32] bg-[#2E2F32] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <label className="ml-3 text-sm font-bold text-[#2E2F32] leading-5 cursor-pointer">
                    Target ROAS
                  </label>
                </div>
                <span className="ml-1 px-2 py-0.5 text-xs text-[#AF2F00] border border-[#AF2F00] rounded-sm bg-white">
                  Beta
                </span>
              </div>

              {/* ROAS Input */}
              <div className="ml-8 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#2E2F32] leading-4">
                    ROAS target
                  </label>
                  <input
                    type="text"
                    value={roasValue}
                    onChange={(e) => setRoasValue(e.target.value)}
                    className="h-10 px-3 py-2 border border-[#909196] rounded text-sm text-[#2E2F32] leading-5 focus:outline-none focus:border-[#2E2F32]"
                  />
                  <p className="text-xs text-[#515357] leading-4">
                    Example: Enter 3.00 to target a $3 return for every $1 you spend
                  </p>
                </div>

                {/* Recommendation Banner */}
                {recommendedValue && !recApplied && (
                  <div className="flex items-start gap-2 p-4 rounded-lg bg-[#FCE9F5]">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F5D5E9] flex-shrink-0 mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                      >
                        <path
                          d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z"
                          stroke="#661648"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#2E2F32] leading-4">
                        <span className="font-bold">Recommendation:</span> Set your ROAS
                        target to {recommendedValue} and your daily budget to $250 to{" "}
                        <span className="font-bold">
                          potentially increase your sales up to $12k-15k/week.
                        </span>{" "}
                        <span className="underline cursor-pointer hover:no-underline">
                          Learn more
                        </span>
                        <span className="text-[#74767C]"> Updated 07/28/2024</span>
                      </p>
                    </div>
                    <button
                      onClick={handleApplyRecommendation}
                      className="px-4 h-8 rounded-full border border-[#2E2F32] bg-white text-sm font-bold text-[#2E2F32] hover:bg-gray-50 flex-shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Success State */}
                {recApplied && (
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#1D5F02]" />
                    <span className="text-xs text-[#1D5F02] leading-4">
                      Recommended ROAS target and budget applied -
                    </span>
                    <button
                      onClick={handleReset}
                      className="text-xs text-[#2E2F32] underline hover:no-underline"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed bidding */}
            <div className="flex items-start gap-1">
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-[#2E2F32] bg-white" />
                </div>
                <label className="ml-3 text-sm text-[#2E2F32] leading-5 cursor-pointer">
                  Fixed bidding
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 pt-0 border-t border-[#E3E4E5]">
          <div className="flex items-center justify-end gap-4 w-full pt-6">
            <button
              onClick={handleCancel}
              className="text-sm text-[#2E2F32] underline hover:no-underline"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 h-8 rounded-full bg-[#0053E2] text-sm font-bold text-white hover:bg-[#0046c7]"
            >
              Save
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
