import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";

interface AttributionFilterDropdownProps {
  value?: string;
  onApply: (value: string) => void;
}

export default function AttributionFilterDropdown({
  value: initialValue = "14 days attribution",
  onApply,
}: AttributionFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(initialValue);
  const [committedValue, setCommittedValue] = useState(initialValue);

  const options = [
    "7 days attribution",
    "14 days attribution",
    "30 days attribution",
    "60 days attribution",
    "90 days attribution",
  ];

  const handleApply = () => {
    setCommittedValue(tempValue);
    onApply(tempValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempValue(committedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 border border-[#909196] rounded bg-white hover:bg-gray-50 transition-colors">
          <span className="text-sm text-[#2E2F32]">{committedValue}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="flex flex-col">
          {/* Options list */}
          <div className="flex flex-col p-2">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setTempValue(option)}
                className={`px-3 py-2 text-sm text-left rounded transition-colors ${
                  tempValue === option
                    ? "bg-[#E5F0FF] text-[#0053E2]"
                    : "text-[#2E2F32] hover:bg-[#F8F8F8]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 p-3 border-t border-[#E3E4E5]">
            <ButtonGroup>
              <Button
                variant="secondary"
                size="small"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleApply}
              >
                Apply
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
