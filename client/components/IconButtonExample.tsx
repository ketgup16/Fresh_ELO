import * as React from 'react';
import { IconButton } from './ui/IconButton';
import { Plus, Edit, Trash2, InfoCircle, X, Menu, ChevronDown } from '@/components/icons';

/**
 * Example component demonstrating IconButton usage patterns with LD icon library
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
              <InfoCircle style={{ width: 16, height: 16 }} />
            </IconButton>
            <span className="text-xs text-gray-600">Small</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="medium">
              <InfoCircle style={{ width: 20, height: 20 }} />
            </IconButton>
            <span className="text-xs text-gray-600">Medium</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="large">
              <InfoCircle style={{ width: 24, height: 24 }} />
            </IconButton>
            <span className="text-xs text-gray-600">Large</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="medium" disabled>
              <InfoCircle style={{ width: 20, height: 20 }} />
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
            <Plus style={{ width: 16, height: 16 }} />
          </IconButton>

          <IconButton aria-label="Add item" variant="primary" size="medium">
            <Plus style={{ width: 20, height: 20 }} />
          </IconButton>

          <IconButton aria-label="Add item" variant="primary" size="large">
            <Plus style={{ width: 24, height: 24 }} />
          </IconButton>

          <IconButton aria-label="Add item" variant="primary" size="medium" disabled>
            <Plus style={{ width: 20, height: 20 }} />
          </IconButton>
        </div>
      </section>

      {/* Secondary Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Secondary Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Edit" variant="secondary" size="small">
            <Edit style={{ width: 16, height: 16 }} />
          </IconButton>

          <IconButton aria-label="Edit" variant="secondary" size="medium">
            <Edit style={{ width: 20, height: 20 }} />
          </IconButton>

          <IconButton aria-label="Edit" variant="secondary" size="large">
            <Edit style={{ width: 24, height: 24 }} />
          </IconButton>

          <IconButton aria-label="Edit" variant="secondary" size="medium" disabled>
            <Edit style={{ width: 20, height: 20 }} />
          </IconButton>
        </div>
      </section>

      {/* Destructive Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Destructive Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Delete" variant="destructive" size="small">
            <Trash2 style={{ width: 16, height: 16 }} />
          </IconButton>

          <IconButton aria-label="Delete" variant="destructive" size="medium">
            <Trash2 style={{ width: 20, height: 20 }} />
          </IconButton>

          <IconButton aria-label="Delete" variant="destructive" size="large">
            <Trash2 style={{ width: 24, height: 24 }} />
          </IconButton>

          <IconButton aria-label="Delete" variant="destructive" size="medium" disabled>
            <Trash2 style={{ width: 20, height: 20 }} />
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
              <X style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 mr-auto">Menu Toggle:</span>
            <IconButton aria-label="Open menu" variant="ghost">
              <Menu style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 mr-auto">Dropdown Arrow:</span>
            <IconButton aria-label="Expand options" variant="ghost" size="small">
              <ChevronDown style={{ width: 16, height: 16 }} />
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
