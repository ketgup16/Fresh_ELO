import * as React from 'react';
import { IconButton } from './ui/IconButton';

/**
 * Example component demonstrating IconButton usage patterns
 */
export default function IconButtonExample() {
  return (
    <div className="p-8 space-y-8 bg-white">
      <div>
        <h1 className="text-2xl font-bold mb-4">LD 3.5 Icon Button Examples</h1>
        <p className="text-gray-600 mb-6">
          Icon-only buttons for actions that don't require text labels.
          Always include an aria-label for accessibility.
        </p>
      </div>

      {/* Ghost Variant (Default) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ghost Variant (Transparent)</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="small">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
              </svg>
            </IconButton>
            <span className="text-xs text-gray-600">Small</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="medium">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
              </svg>
            </IconButton>
            <span className="text-xs text-gray-600">Medium</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="large">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
              </svg>
            </IconButton>
            <span className="text-xs text-gray-600">Large</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="medium" disabled>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
              </svg>
            </IconButton>
            <span className="text-xs text-gray-600">Disabled</span>
          </div>
        </div>
      </section>

      {/* Primary Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Primary Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Add item" variant="primary" size="small">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Add item" variant="primary" size="medium">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Add item" variant="primary" size="large">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Add item" variant="primary" size="medium" disabled>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </IconButton>
        </div>
      </section>

      {/* Secondary Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Secondary Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Edit" variant="secondary" size="small">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Edit" variant="secondary" size="medium">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Edit" variant="secondary" size="large">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Edit" variant="secondary" size="medium" disabled>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
        </div>
      </section>

      {/* Destructive Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Destructive Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Delete" variant="destructive" size="small">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M6 4V2H10V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Delete" variant="destructive" size="medium">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M6 4V2H10V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Delete" variant="destructive" size="large">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M6 4V2H10V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
          
          <IconButton aria-label="Delete" variant="destructive" size="medium" disabled>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M6 4V2H10V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
        </div>
      </section>

      {/* Common Use Cases */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Common Use Cases</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 mr-auto">Close Dialog:</span>
            <IconButton aria-label="Close dialog" variant="ghost">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </IconButton>
          </div>
          
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 mr-auto">Menu Toggle:</span>
            <IconButton aria-label="Open menu" variant="ghost">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </IconButton>
          </div>
          
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 mr-auto">Dropdown Arrow:</span>
            <IconButton aria-label="Expand options" variant="ghost" size="small">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconButton>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Code Examples</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm space-y-2">
          <div className="text-green-400">// Ghost icon button (default)</div>
          <div>{'<IconButton aria-label="Info" variant="ghost" size="medium">'}</div>
          <div className="pl-4">{'<InfoIcon />'}</div>
          <div>{'</IconButton>'}</div>
          
          <div className="mt-4 text-green-400">// Primary icon button</div>
          <div>{'<IconButton aria-label="Add" variant="primary">'}</div>
          <div className="pl-4">{'<PlusIcon />'}</div>
          <div>{'</IconButton>'}</div>
          
          <div className="mt-4 text-green-400">// Disabled icon button</div>
          <div>{'<IconButton aria-label="Delete" variant="destructive" disabled>'}</div>
          <div className="pl-4">{'<TrashIcon />'}</div>
          <div>{'</IconButton>'}</div>
        </div>
      </section>
    </div>
  );
}
