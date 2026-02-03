import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { NavList, NavListItem } from "@/components/ui/NavList";
import { format } from "date-fns";

interface DateRangeFilterDropdownProps {
  startDate?: Date;
  endDate?: Date;
  onApply: (startDate: Date, endDate: Date) => void;
}

type QuickRange = "last7" | "last30" | "lastMonth" | "thisMonth" | "allTime" | "custom";

export default function DateRangeFilterDropdown({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onApply,
}: DateRangeFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<QuickRange>("custom");
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(initialStartDate);
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(initialEndDate);
  const [committedStartDate, setCommittedStartDate] = useState<Date | undefined>(initialStartDate);
  const [committedEndDate, setCommittedEndDate] = useState<Date | undefined>(initialEndDate);

  const quickRanges: { id: QuickRange; label: string }[] = [
    { id: "last7", label: "Last 7 Days" },
    { id: "last30", label: "Last 30 Days" },
    { id: "lastMonth", label: "Last Month" },
    { id: "thisMonth", label: "This Month" },
    { id: "allTime", label: "All Time" },
    { id: "custom", label: "Custom range" },
  ];

  const calculateDateRange = (range: QuickRange): { start: Date; end: Date } => {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case "last7":
        start.setDate(end.getDate() - 6);
        break;
      case "last30":
        start.setDate(end.getDate() - 29);
        break;
      case "lastMonth":
        start.setMonth(end.getMonth() - 1, 1);
        end.setDate(0); // Last day of previous month
        break;
      case "thisMonth":
        start.setDate(1);
        break;
      case "allTime":
        start.setFullYear(2020, 0, 1);
        break;
      case "custom":
        return { start: tempStartDate || new Date(), end: tempEndDate || new Date() };
    }

    return { start, end };
  };

  const handleQuickRangeSelect = (range: QuickRange) => {
    setSelectedRange(range);
    const { start, end } = calculateDateRange(range);
    setTempStartDate(start);
    setTempEndDate(end);
  };

  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      setCommittedStartDate(tempStartDate);
      setCommittedEndDate(tempEndDate);
      onApply(tempStartDate, tempEndDate);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setTempStartDate(committedStartDate);
    setTempEndDate(committedEndDate);
    setOpen(false);
  };

  const handleApplyToday = () => {
    const today = new Date();
    setTempStartDate(today);
    setTempEndDate(today);
  };

  const formatDateRange = () => {
    if (committedStartDate && committedEndDate) {
      return `${format(committedStartDate, "MMM d, yyyy")} – ${format(committedEndDate, "MMM d, yyyy")}`;
    }
    return "Select date range";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 border border-[#909196] rounded bg-white hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="12" height="2" rx="1" fill="#2E2F32"/>
            <rect x="2" y="7" width="12" height="2" rx="1" fill="#2E2F32"/>
            <rect x="2" y="10" width="12" height="2" rx="1" fill="#2E2F32"/>
          </svg>
          <span className="text-sm text-[#2E2F32]">{formatDateRange()}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 max-w-4xl" align="start">
        <div className="flex">
          {/* Left sidebar with quick select options */}
          <div className="border-r border-[#E3E4E5]">
            <NavList aria-label="Quick date ranges">
              {quickRanges.map((range) => (
                <NavListItem
                  key={range.id}
                  selected={selectedRange === range.id}
                  onClick={() => handleQuickRangeSelect(range.id)}
                >
                  {range.label}
                </NavListItem>
              ))}
            </NavList>
          </div>

          {/* Right section with date inputs and calendar */}
          <div className="flex flex-col gap-4 p-6">
            {/* Date inputs */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-bold text-[#2E2F32]">Start date</label>
                <input
                  type="text"
                  value={tempStartDate ? format(tempStartDate, "MM/dd/yyyy") : ""}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    if (!isNaN(date.getTime())) {
                      setTempStartDate(date);
                      setSelectedRange("custom");
                    }
                  }}
                  className="px-3 py-2 text-sm border border-[#909196] rounded focus:outline-none focus:ring-2 focus:ring-[#0053E2] bg-white"
                  placeholder="01/01/2026"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-bold text-[#2E2F32]">End date</label>
                <input
                  type="text"
                  value={tempEndDate ? format(tempEndDate, "MM/dd/yyyy") : ""}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    if (!isNaN(date.getTime())) {
                      setTempEndDate(date);
                      setSelectedRange("custom");
                    }
                  }}
                  className="px-3 py-2 text-sm border border-[#909196] rounded focus:outline-none focus:ring-2 focus:ring-[#0053E2] bg-white"
                  placeholder="05/15/2026"
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="border-t border-[#E3E4E5] pt-4">
              <Calendar
                mode="range"
                selected={{
                  from: tempStartDate,
                  to: tempEndDate,
                }}
                onSelect={(range) => {
                  if (range?.from) setTempStartDate(range.from);
                  if (range?.to) setTempEndDate(range.to);
                  setSelectedRange("custom");
                }}
                numberOfMonths={2}
              />

              {/* Timezone and Apply to today */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E3E4E5]">
                <div className="flex items-center gap-2 text-xs text-[#74767C]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#74767C" strokeWidth="1.2" fill="none"/>
                    <path d="M8 4V8L11 10" stroke="#74767C" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span>Pacific Standard Time</span>
                </div>
                <button
                  onClick={handleApplyToday}
                 
                  className="text-sm underline hover:no-underline"
                >
                  Jump to today
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleCancel}
               
                className="px-6 py-2 text-sm underline hover:no-underline transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 text-sm font-bold text-white bg-[#0053E2] rounded-full hover:bg-[#0046c7] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
