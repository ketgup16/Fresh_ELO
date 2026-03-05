import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

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
    <ResponsiveLayout maxWidth="full">
      <div className="bg-white font-sans">
        {/* Search header — matches live SearchResultsHeader */}
        <SearchResultsHeader query={query} onBack={() => navigate('/walmart')} />

        {/* Filter bar skeleton — mirrors SearchFilterBar layout */}
        <div className="flex items-center gap-2 px-3 py-2 overflow-hidden border-b border-border">
          <div className="w-8 h-8 rounded-full flex-shrink-0 animate-shimmer" />
          {[80, 64, 96, 72, 88].map((w, i) => (
            <div key={i} className="h-8 rounded-full flex-shrink-0 animate-shimmer" style={{ width: w }} />
          ))}
        </div>

        {/* AI banner skeleton */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
          <div className="w-4 h-4 rounded animate-shimmer flex-shrink-0" />
          <div className="h-4 w-48 rounded animate-shimmer" />
        </div>

        {/* Product list skeletons */}
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3 px-2 py-3 border-b border-border">
              <div className="w-[161px] h-[159px] rounded-lg flex-shrink-0 animate-shimmer" />
              <div className="flex-1 flex flex-col gap-3">
                <div className="h-6 rounded animate-shimmer" />
                <div className="h-6 rounded animate-shimmer" />
                <div className="h-6 rounded animate-shimmer" />
                <div className="w-[59px] h-6 rounded animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
