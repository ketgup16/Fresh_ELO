import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Transparent overlay - no scrim */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50" />
        
        {/* Modal Content */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-[560px] translate-x-[-50%] translate-y-[-50%]",
            "bg-white rounded-xl shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]"
          )}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-0">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <DialogPrimitive.Title className="text-[20px] font-bold text-[#2E2F32] leading-7">
                  Bidding strategy
                </DialogPrimitive.Title>
                <DialogPrimitive.Close className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>
              <DialogPrimitive.Description className="text-sm text-[#2E2F32] leading-5">
                Choose the strategy that best suits your business goals.{" "}
                <span className="text-[#2E2F32] underline cursor-pointer hover:no-underline">
                  Learn more
                </span>
              </DialogPrimitive.Description>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 flex flex-col gap-6">
            {/* Dynamic bidding */}
            <div className="flex items-start gap-1">
              <button
                onClick={() => setSelectedStrategy("dynamic")}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#2E2F32" />
                  </svg>
                </div>
                <span className="text-sm text-[#2E2F32] leading-5">Dynamic bidding</span>
              </button>
              <span className="px-2 py-1 text-xs leading-4 text-[#AF2F00] border border-[#AF2F00] rounded-sm bg-white">
                Beta
              </span>
            </div>

            {/* Target ROAS */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-1">
                <button
                  onClick={() => setSelectedStrategy("target-roas")}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 flex items-center justify-center relative flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="#2E2F32" stroke="#2E2F32" strokeWidth="2" />
                    </svg>
                    <div className="absolute w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-sm font-bold text-[#2E2F32] leading-5">Target ROAS</span>
                </button>
                <span className="px-2 py-1 text-xs leading-4 text-[#AF2F00] border border-[#AF2F00] rounded-sm bg-white">
                  Beta
                </span>
              </div>

              {/* ROAS Input Section */}
              <div className="ml-8 flex flex-col gap-3 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#2E2F32] leading-4 mb-1">
                    ROAS target
                  </label>
                  <input
                    type="text"
                    value={roasValue}
                    onChange={(e) => setRoasValue(e.target.value)}
                    className="h-10 px-3 py-2 border border-[#909196] rounded text-sm text-[#2E2F32] leading-5 focus:outline-none focus:border-[#2E2F32]"
                  />
                  <p className="text-xs text-[#515357] leading-4 mt-1">
                    Example: Enter 3.00 to target a $3 return for every $1 you spend
                  </p>
                </div>

                {/* Recommendation Banner */}
                {recommendedValue && !recApplied && (
                  <div className="flex items-start gap-2 p-4 rounded-lg bg-[#FCF4F9]">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F5D5E9] flex-shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z"
                          stroke="#661648"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="text-xs text-[#2E2F32] leading-4">
                        <span className="font-bold">Recommendation:</span> Set your ROAS
                        target to {recommendedValue} and your daily budget to $250 to{" "}
                        <span className="font-bold">
                          potentially increase your sales up to $12k-15k/week.
                        </span>{" "}
                        <span className="underline cursor-pointer hover:no-underline">
                          Learn more
                        </span>
                      </p>
                      <p className="text-xs text-[#74767C] leading-4">Updated 07/28/2024</p>
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
                    <Check className="w-4 h-4 text-[#1D5F02]" strokeWidth={2.5} />
                    <span className="text-xs text-[#1D5F02] leading-4">
                      Recommended ROAS target and budget applied -
                    </span>
                    <button
                      onClick={handleReset}
                      className="text-xs text-[#2E2F32] underline hover:no-underline ml-1"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed bidding */}
            <div className="flex items-start gap-1">
              <button
                onClick={() => setSelectedStrategy("fixed")}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#2E2F32" />
                  </svg>
                </div>
                <span className="text-sm text-[#2E2F32] leading-5">Fixed bidding</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E3E4E5] mx-6" />

          {/* Footer */}
          <div className="px-6 pb-6 pt-6">
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={handleCancel}
                className="text-sm text-[#2E2F32] leading-5 underline hover:no-underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 h-8 rounded-full bg-[#0053E2] text-sm font-bold text-white leading-5 hover:bg-[#0046c7]"
              >
                Save
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
