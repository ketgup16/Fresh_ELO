import { ChevronLeft } from "@/components/icons";
import { SparklesIcon } from "@/components/icons-custom";
import { IconButton } from "@/components/ui/IconButton";
import { useLayoutSettings } from "@/contexts/LayoutSettingsContext";

interface SearchResultsHeaderProps {
  query: string;
  onBack: () => void;
}

export function SearchResultsHeader({ query, onBack }: SearchResultsHeaderProps) {
  const { platform } = useLayoutSettings();
  const isNative = platform === 'ios' || platform === 'android';

  return (
    <div
      className={[
        'sticky z-50 bg-white lg:hidden -mx-4',
        // In native mode the status bar (54px) is its own sticky element above.
        // Set top-[54px] so this header never slides under it.
        isNative ? 'top-[54px]' : 'top-0',
      ].join(' ')}
    >
      <div className="flex items-center gap-1 px-4 pb-4 pt-2">
        <IconButton
          variant="ghost"
          size="large"
          onClick={onBack}
          aria-label="Go back"
          UNSAFE_className="flex-shrink-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </IconButton>
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
