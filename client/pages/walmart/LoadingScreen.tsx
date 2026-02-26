import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SparklesIcon } from "@/components/icons-custom";
import { BottomNav } from "@/components/walmart/BottomNav";
import { Button } from "@/components/ui/Button";

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query === 'dresses for women') {
        navigate('/walmart/search/dresses', { replace: true });
      } else {
        navigate(`/walmart/search?q=${encodeURIComponent(query)}`, { replace: true });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, query]);

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative">
      {/* Search Bar */}
      <div className="flex items-center gap-1 px-4 pb-3 border-b border-border">
        <Button
          variant="tertiary"
          size="small"
          onClick={() => navigate('/walmart')}
          UNSAFE_className="flex-shrink-0 !p-0 !h-auto"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-foreground">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 border-2 border-primary rounded-full">
            <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 h-[42px]">
              <div className="w-6 h-6 flex-shrink-0">
                <SparklesIcon />
              </div>
              <div className="flex-1 text-muted-foreground text-[16px]">{query}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Skeletons */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-border">
        <div className="w-8 h-8 rounded-full animate-shimmer"></div>
        <div className="w-[115px] h-8 rounded-full animate-shimmer"></div>
        <div className="w-[115px] h-8 rounded-full animate-shimmer"></div>
        <div className="w-[115px] h-8 rounded-full animate-shimmer"></div>
      </div>

      {/* Loading Message */}
      <div className="flex items-center justify-center h-8 bg-white">
        <p className="text-foreground text-[14px] text-center">Away we go! Stay tuned...</p>
      </div>

      {/* Line Skeleton */}
      <div className="px-3 py-2 border-b border-border">
        <div className="h-6 rounded animate-shimmer"></div>
      </div>

      {/* Product Skeletons */}
      <div className="flex flex-col">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 px-2 py-3 border-b border-border">
            <div className="w-[161px] h-[159px] rounded-lg flex-shrink-0 animate-shimmer"></div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-6 rounded animate-shimmer"></div>
              <div className="h-6 rounded animate-shimmer"></div>
              <div className="h-6 rounded animate-shimmer"></div>
              <div className="w-[59px] h-6 rounded animate-shimmer"></div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
