import { MastHead } from '../components/ui/MastHead';
import { BadgeExample } from '../components/BadgeExample';
import { useState } from 'react';
import type { MediaSolution } from '../components/ui/MediaSolutionsDropdown';

/**
 * Badge Examples Page
 * 
 * Demonstrates the Living Design 3.5 Badge component
 * Reference: guidelines/Badge.md
 */
export default function BadgeExamplesPage() {
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Display Advertising');

  return (
    <div className="min-h-screen bg-white">
      <MastHead 
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />
      
      <main className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Living Design 3.5 - Badge Component</h1>
          <p className="text-gray-600">
            Badges highlight an object to visually indicate a count or status. Badges are not interactive.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Reference: <code className="bg-gray-100 px-2 py-1 rounded">guidelines/Badge.md</code> | 
            Implementation: <code className="bg-gray-100 px-2 py-1 rounded">client/components/ui/Badge.tsx</code>
          </p>
        </div>
        
        <BadgeExample />
      </main>
    </div>
  );
}
