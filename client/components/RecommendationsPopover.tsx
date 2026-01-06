import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Alert {
  type: 'learning-paused' | 'out-of-budget';
  message: string;
  targetColumn?: 'biddingStrategy' | 'totalBudget';
}

interface Recommendation {
  type: 'update-roas';
  message: string;
  suggestedValue: string;
  targetColumn?: 'biddingStrategy';
}

interface Campaign {
  id: string;
  name: string;
  alerts?: Alert[];
  recommendations?: Recommendation[];
}

interface RecommendationsPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignData: Campaign;
  onViewRecommendation: (type: string) => void;
  trigger?: React.ReactNode;
}

export default function RecommendationsPopover({
  open,
  onOpenChange,
  campaignData,
  onViewRecommendation,
  trigger
}: RecommendationsPopoverProps) {
  const alerts = campaignData.alerts || [];
  const recommendations = campaignData.recommendations || [];
  const allItems = [...alerts, ...recommendations];

  if (allItems.length === 0) return trigger || null;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
      <PopoverContent
        className="w-[447px] p-6 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]"
        align="start"
        sideOffset={8}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-[20px] font-bold text-[#2E2F32] leading-7 mb-1">
            Recommendations
          </h3>
          <p className="text-sm text-[#2E2F32] leading-5">
            Click below or scroll to review and apply recommendations
          </p>
        </div>

        {/* Items List */}
        <div className="flex flex-col">
          {alerts.map((alert, idx) => (
            <React.Fragment key={`alert-${idx}`}>
              {(idx > 0 || allItems.length > 1) && (
                <div className="h-px bg-[#E3E4E5] my-4" />
              )}
              <div className="flex items-start gap-2">
                {/* Alert Icon */}
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F8D2D3] flex-shrink-0 mt-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[13px] h-[13px]"
                  >
                    <path
                      d="M6.66927 3.25065C6.9178 3.25065 7.12398 3.43198 7.16273 3.66955L7.16927 3.75065V8.03457C7.16927 8.31071 6.94541 8.53457 6.66927 8.53457C6.42074 8.53457 6.21457 8.35324 6.17582 8.11567L6.16927 8.03457V3.75065C6.16927 3.47451 6.39313 3.25065 6.66927 3.25065Z"
                      fill="#9B1419"
                    />
                    <path
                      d="M6.66927 10.0853C6.94614 10.0853 7.17058 9.86085 7.17058 9.58398C7.17058 9.30712 6.94614 9.08267 6.66927 9.08267C6.39241 9.08267 6.16796 9.30712 6.16796 9.58398C6.16796 9.86085 6.39241 10.0853 6.66927 10.0853Z"
                      fill="#9B1419"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5026 6.66732C12.5026 3.44566 9.89093 0.833984 6.66927 0.833984C3.44761 0.833984 0.835938 3.44566 0.835938 6.66732C0.835938 9.88898 3.44761 12.5007 6.66927 12.5007C9.89093 12.5007 12.5026 9.88898 12.5026 6.66732ZM1.83594 6.66732C1.83594 3.99794 3.99989 1.83398 6.66927 1.83398C9.33865 1.83398 11.5026 3.99794 11.5026 6.66732C11.5026 9.33669 9.33865 11.5007 6.66927 11.5007C3.99989 11.5007 1.83594 9.33669 1.83594 6.66732Z"
                      fill="#9B1419"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-between">
                  <div className="text-sm text-[#2E2F32] leading-5">
                    <span className="font-extrabold">Alert: </span>
                    <span>{alert.message}</span>
                  </div>
                  <button
                    onClick={() => onViewRecommendation(alert.type)}
                    className="text-sm text-[#2E2F32] underline hover:no-underline ml-4 flex-shrink-0"
                  >
                    View
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}

          {recommendations.map((rec, idx) => (
            <React.Fragment key={`rec-${idx}`}>
              {(alerts.length > 0 || idx > 0) && (
                <div className="h-px bg-[#E3E4E5] my-4" />
              )}
              <div className="flex items-start gap-2">
                {/* Recommendation Icon */}
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F5D5E9] flex-shrink-0 mt-0.5">
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[11px] h-[13px]"
                  >
                    <path
                      d="M6.79102 5.2832L6.70996 5.76855H10.9668L5.96289 11.5186L6.53809 8.05078L6.61816 7.56641H2.36035L7.36523 1.81445L6.79102 5.2832Z"
                      stroke="#661648"
                      strokeWidth="0.833333"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-between">
                  <div className="text-sm text-[#2E2F32] leading-5">
                    <span className="font-extrabold">Recommendation: </span>
                    <span>{rec.message}</span>
                  </div>
                  <button
                    onClick={() => onViewRecommendation(rec.type)}
                    className="text-sm text-[#2E2F32] underline hover:no-underline ml-4 flex-shrink-0"
                  >
                    View
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
