import * as React from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * @deprecated This component is deprecated. Use DatePickerCalendar from '@/components/ui/DatePickerCalendar' instead.
 * This component will be removed in a future version.
 *
 * The new DatePickerCalendar component:
 * - Follows LD 3.5 design specifications exactly
 * - Has better token usage and styling
 * - Supports week numbers variant
 * - Has improved accessibility
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-3",
        caption: "flex justify-center pt-0 pb-3 relative items-center mb-2",
        caption_label: "text-sm font-bold text-[#2E2F32]",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 hover:bg-gray-100 rounded inline-flex items-center justify-center",
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse",
        head_row: "flex mb-2",
        head_cell:
          "text-[#2E2F32] rounded-md w-9 font-bold text-xs uppercase",
        row: "flex w-full mt-1",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-full [&:has([aria-selected].day-outside)]:bg-[#E5F0FF] [&:has([aria-selected])]:bg-[#E5F0FF] first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal text-sm text-[#2E2F32] hover:bg-gray-100 rounded-full aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#0053E2] text-white hover:bg-[#0046c7] hover:text-white focus:bg-[#0053E2] focus:text-white rounded-full",
        day_today: "bg-transparent border border-[#0053E2] text-[#2E2F32]",
        day_outside:
          "day-outside text-[#BABBBE] opacity-50 aria-selected:bg-[#E5F0FF] aria-selected:text-[#909196] aria-selected:opacity-50",
        day_disabled: "text-[#BABBBE] opacity-50",
        day_range_middle:
          "aria-selected:bg-[#E5F0FF] aria-selected:text-[#2E2F32]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4 text-[#2E2F32]" />;
          }
          return <ChevronRight className="h-4 w-4 text-[#2E2F32]" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
