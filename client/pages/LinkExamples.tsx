import { MastHead } from '../components/ui/MastHead';
import { LinkExample } from '../components/LinkExample';
import { useState } from 'react';
import type { MediaSolution } from '../components/ui/MediaSolutionsDropdown';

/**
 * Link Examples Page
 * 
 * Demonstrates the Living Design 3.5 Link component
 * Reference: guidelines/Link.md
 */
export default function LinkExamplesPage() {
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
          <h1 className="text-3xl font-bold mb-2">Living Design 3.5 - Link Component</h1>
          <p className="text-gray-600">
            Links are navigational elements. They take users to a different page/screen, a different site, or a location within the same page.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Reference: <code className="bg-gray-100 px-2 py-1 rounded">guidelines/Link.md</code> | 
            Implementation: <code className="bg-gray-100 px-2 py-1 rounded">client/components/ui/Link.tsx</code>
          </p>
        </div>
        
        <LinkExample />
      </main>
    </div>
  );
}
