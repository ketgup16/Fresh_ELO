import { ChevronLeft } from "@/components/icons";
import { SparklesIcon } from "@/components/icons-custom";
import { Button } from "@/components/ui/Button";

interface SearchResultsHeaderProps {
  query: string;
  onBack: () => void;
}

export function SearchResultsHeader({ query, onBack }: SearchResultsHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-1 px-4 pb-3 pt-2">
        <Button
          variant="tertiary"
          size="small"
          onClick={onBack}
          UNSAFE_className="flex-shrink-0 !p-0 !h-auto"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <div className="border-2 border-[var(--ld-semantic-color-action-fill-primary)] rounded-full">
            <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 h-[42px]">
              <div className="w-6 h-6 flex-shrink-0">
                <SparklesIcon />
              </div>
              <span className="flex-1 text-foreground text-[16px] truncate">{query}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
