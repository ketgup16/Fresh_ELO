import * as React from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { Plus, Edit, Trash, InfoCircle, X, Menu, ChevronDown } from '@/components/icons';

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
            <IconButton aria-label="Information" variant="ghost" size="xsmall">
              <InfoCircle />
            </IconButton>
            <span className="text-xs text-gray-600">XSmall</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="small">
              <InfoCircle />
            </IconButton>
            <span className="text-xs text-gray-600">Small</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="medium">
              <InfoCircle />
            </IconButton>
            <span className="text-xs text-gray-600">Medium</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="large">
              <InfoCircle />
            </IconButton>
            <span className="text-xs text-gray-600">Large</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconButton aria-label="Information" variant="ghost" size="medium" disabled>
              <InfoCircle />
            </IconButton>
            <span className="text-xs text-gray-600">Disabled</span>
          </div>
        </div>
      </section>

      {/* Rounded Shape Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Rounded Shape</h2>
        <p className="text-sm text-gray-600 mb-3">
          Icon buttons can have a fully rounded (circular) shape by adding the shape="rounded" prop.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 w-24">Primary:</span>
            <IconButton aria-label="Add item" variant="primary" shape="rounded" size="xsmall">
              <Plus />
            </IconButton>
            <IconButton aria-label="Add item" variant="primary" shape="rounded" size="small">
              <Plus />
            </IconButton>
            <IconButton aria-label="Add item" variant="primary" shape="rounded" size="medium">
              <Plus />
            </IconButton>
            <IconButton aria-label="Add item" variant="primary" shape="rounded" size="large">
              <Plus />
            </IconButton>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 w-24">Secondary:</span>
            <IconButton aria-label="Edit" variant="secondary" shape="rounded" size="xsmall">
              <Edit />
            </IconButton>
            <IconButton aria-label="Edit" variant="secondary" shape="rounded" size="small">
              <Edit />
            </IconButton>
            <IconButton aria-label="Edit" variant="secondary" shape="rounded" size="medium">
              <Edit />
            </IconButton>
            <IconButton aria-label="Edit" variant="secondary" shape="rounded" size="large">
              <Edit />
            </IconButton>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 w-24">Ghost:</span>
            <IconButton aria-label="Close" variant="ghost" shape="rounded" size="xsmall">
              <X />
            </IconButton>
            <IconButton aria-label="Close" variant="ghost" shape="rounded" size="small">
              <X />
            </IconButton>
            <IconButton aria-label="Close" variant="ghost" shape="rounded" size="medium">
              <X />
            </IconButton>
            <IconButton aria-label="Close" variant="ghost" shape="rounded" size="large">
              <X />
            </IconButton>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 w-24">Destructive:</span>
            <IconButton aria-label="Delete" variant="destructive" shape="rounded" size="xsmall">
              <Trash />
            </IconButton>
            <IconButton aria-label="Delete" variant="destructive" shape="rounded" size="small">
              <Trash />
            </IconButton>
            <IconButton aria-label="Delete" variant="destructive" shape="rounded" size="medium">
              <Trash />
            </IconButton>
            <IconButton aria-label="Delete" variant="destructive" shape="rounded" size="large">
              <Trash />
            </IconButton>
          </div>
        </div>
      </section>

      {/* Primary Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Primary Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Add item" variant="primary" size="small">
            <Plus />
          </IconButton>

          <IconButton aria-label="Add item" variant="primary" size="medium">
            <Plus />
          </IconButton>

          <IconButton aria-label="Add item" variant="primary" size="large">
            <Plus />
          </IconButton>

          <IconButton aria-label="Add item" variant="primary" size="medium" disabled>
            <Plus />
          </IconButton>
        </div>
      </section>

      {/* Secondary Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Secondary Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Edit" variant="secondary" size="small">
            <Edit />
          </IconButton>

          <IconButton aria-label="Edit" variant="secondary" size="medium">
            <Edit />
          </IconButton>

          <IconButton aria-label="Edit" variant="secondary" size="large">
            <Edit />
          </IconButton>

          <IconButton aria-label="Edit" variant="secondary" size="medium" disabled>
            <Edit />
          </IconButton>
        </div>
      </section>

      {/* Destructive Variant */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Destructive Variant</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded">
          <IconButton aria-label="Delete" variant="destructive" size="small">
            <Trash />
          </IconButton>

          <IconButton aria-label="Delete" variant="destructive" size="medium">
            <Trash />
          </IconButton>

          <IconButton aria-label="Delete" variant="destructive" size="large">
            <Trash />
          </IconButton>

          <IconButton aria-label="Delete" variant="destructive" size="medium" disabled>
            <Trash />
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
              <X />
            </IconButton>
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 mr-auto">Menu Toggle:</span>
            <IconButton aria-label="Open menu" variant="ghost">
              <Menu />
            </IconButton>
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 mr-auto">Dropdown Arrow:</span>
            <IconButton aria-label="Expand options" variant="ghost" size="small">
              <ChevronDown />
            </IconButton>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Code Examples</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm space-y-2">
          <div className="text-green-400">// Ghost icon button (default square shape)</div>
          <div>{'<IconButton aria-label="Info" variant="ghost" size="medium">'}</div>
          <div className="pl-4">{'<InfoIcon />'}</div>
          <div>{'</IconButton>'}</div>

          <div className="mt-4 text-green-400">// Primary icon button</div>
          <div>{'<IconButton aria-label="Add" variant="primary">'}</div>
          <div className="pl-4">{'<PlusIcon />'}</div>
          <div>{'</IconButton>'}</div>

          <div className="mt-4 text-green-400">// Rounded icon button</div>
          <div>{'<IconButton aria-label="Add" variant="primary" shape="rounded">'}</div>
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
