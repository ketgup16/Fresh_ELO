import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

const NotFound = () => {
  const location = useLocation();
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Display Advertising');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a
            href="/"
            style={{ color: 'var(--ld-semantic-color-text-brand, #0071ce)' }}
            className="underline hover:no-underline"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
