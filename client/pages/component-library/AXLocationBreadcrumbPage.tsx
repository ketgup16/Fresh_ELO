import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import { AXLocationBreadcrumb } from '@/components/walmart/AXLocationBreadcrumb';
import exStyles from '@/components/examples/ExamplePage.module.css';

export default function AXLocationBreadcrumbPage() {
  // Demo controls
  const [depth, setDepth] = useState<'1' | '2' | '3'>('1');
  const [showCount, setShowCount] = useState(true);
  const [countLoading, setCountLoading] = useState(false);
  const [demoCount, setDemoCount] = useState(12);

  const crumbsForDepth = {
    '1': [{ label: 'All', onClick: () => {} }],
    '2': [
      { label: 'All', onClick: () => {} },
      { label: 'Item 1', onClick: () => {} },
    ],
    '3': [
      { label: 'All', onClick: () => {} },
      { label: 'Department A', onClick: () => {} },
      { label: 'Aisle 3', onClick: () => {} },
    ],
  };

  return (
    <ComponentPageLayout
      section="AX Patterns"
      title="Location Breadcrumbs"
      description="Combines the LD Breadcrumb with a trailing item count to show a user's position within a location hierarchy (All → Department → Aisle). Used in list and section headers to provide context and show how many items are at the current level."
    >
      <div className={exStyles.pageGap}>

        {/* ① Interactive Demo */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Interactive Demo</h2>
          <p className={exStyles.desc}>
            Use the controls below to explore breadcrumb depth and count options.
          </p>

          <div className={exStyles.controlsRow}>
            <span className={exStyles.controlLabel}>Depth:</span>
            <RadioGroup
              value={depth}
              onValueChange={(v) => setDepth(v as '1' | '2' | '3')}
              orientation="horizontal"
              className={exStyles.radioGroupRow}
            >
              <Radio value="1" label="1 level" />
              <Radio value="2" label="2 levels" />
              <Radio value="3" label="3 levels" />
            </RadioGroup>
          </div>

          <div className={exStyles.checkboxRow}>
            <Checkbox
              checked={showCount}
              onCheckedChange={(v) => setShowCount(Boolean(v))}
              label="Show count"
            />
            <Checkbox
              checked={countLoading}
              onCheckedChange={(v) => setCountLoading(Boolean(v))}
              label="Count loading"
            />
          </div>

          <AXLocationBreadcrumb
            crumbs={crumbsForDepth[depth]}
            count={showCount ? demoCount : undefined}
            countLoading={countLoading}
          />
        </div>

        {/* ② Variants */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Variants</h2>
          <p className={exStyles.desc}>
            Breadcrumb depth grows as the user navigates deeper into a location hierarchy.
            The current level is always the last (non-clickable) crumb.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Root level (All)</span>
              <AXLocationBreadcrumb
                crumbs={[{ label: 'All', onClick: () => {} }]}
                count={0}
              />
            </div>

            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>One level deep</span>
              <AXLocationBreadcrumb
                crumbs={[
                  { label: 'All', onClick: () => {} },
                  { label: 'Item 1', onClick: () => {} },
                ]}
                count={0}
              />
            </div>

            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Two levels deep</span>
              <AXLocationBreadcrumb
                crumbs={[
                  { label: 'All', onClick: () => {} },
                  { label: 'Department A', onClick: () => {} },
                  { label: 'Aisle 3', onClick: () => {} },
                ]}
                count={14}
              />
            </div>

            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>No count</span>
              <AXLocationBreadcrumb
                crumbs={[
                  { label: 'All', onClick: () => {} },
                  { label: 'Section B', onClick: () => {} },
                ]}
              />
            </div>
          </div>
        </div>

        {/* ③ Count States */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Count States</h2>
          <p className={exStyles.desc}>
            The count can be hidden, shown with a value, or shown in a loading skeleton state
            while the count is being fetched.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>0 count</span>
              <AXLocationBreadcrumb
                crumbs={[{ label: 'All', onClick: () => {} }]}
                count={0}
              />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>With count</span>
              <AXLocationBreadcrumb
                crumbs={[{ label: 'All', onClick: () => {} }]}
                count={42}
              />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Loading</span>
              <AXLocationBreadcrumb
                crumbs={[{ label: 'All', onClick: () => {} }]}
                count={0}
                countLoading
              />
            </div>
          </div>
        </div>

        {/* ④ Custom count label */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Custom Count Label</h2>
          <p className={exStyles.desc}>
            The count label defaults to "count" but can be customised to match the item type.
          </p>

          <div className={exStyles.variantGrid}>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Items</span>
              <AXLocationBreadcrumb
                crumbs={[{ label: 'All', onClick: () => {} }]}
                count={8}
                countLabel="items"
              />
            </div>
            <div className={exStyles.variantCard}>
              <span className={exStyles.variantCardLabel}>Actions</span>
              <AXLocationBreadcrumb
                crumbs={[
                  { label: 'All', onClick: () => {} },
                  { label: 'Today', onClick: () => {} },
                ]}
                count={3}
                countLabel="actions"
              />
            </div>
          </div>
        </div>

        {/* ⑤ Props Table */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Props</h2>
          <div className={exStyles.tableWrapper}>
            <table className={exStyles.docsTable}>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['crumbs', 'AXLocationBreadcrumbCrumb[]', '—', 'Ordered list of location levels. The last entry renders as the current (non-clickable) crumb.'],
                  ['count', 'number', 'undefined', 'Item count shown on the trailing side. Omit to hide.'],
                  ['countLabel', 'string', "'count'", 'Label appended after the count number.'],
                  ['countLoading', 'boolean', 'false', 'Shows a loading skeleton in place of the count.'],
                  ['aria-label', 'string', "'Location breadcrumb'", 'Accessible label for the breadcrumb nav element.'],
                  ['UNSAFE_className', 'string', '—', 'Escape hatch for adding a custom class to the root element.'],
                  ['UNSAFE_style', 'React.CSSProperties', '—', 'Escape hatch for adding inline styles to the root element.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{prop}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)' }}>{type}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{def}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={exStyles.section} style={{ marginTop: 0 }}>
            <h3 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 14, fontWeight: 600, color: 'var(--ld-semantic-color-text)', margin: '0 0 8px' }}>
              AXLocationBreadcrumbCrumb
            </h3>
            <div className={exStyles.tableWrapper}>
              <table className={exStyles.docsTable}>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['label', 'string', 'Display text for this level.'],
                    ['href', 'string (optional)', 'If provided, renders as an <a> link.'],
                    ['onClick', '() => void (optional)', 'If provided (and no href), renders as a <button>.'],
                  ].map(([field, type, desc]) => (
                    <tr key={field} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{field}</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)' }}>{type}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ⑥ Usage */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Usage</h2>
          <pre className={exStyles.codeBlock}>{`import { AXLocationBreadcrumb } from '@/components/walmart/AXLocationBreadcrumb';

// Root level — single "All" crumb
<AXLocationBreadcrumb
  crumbs={[{ label: 'All', onClick: () => navigate('/') }]}
  count={itemCount}
/>

// One level deep — breadcrumb trail
<AXLocationBreadcrumb
  crumbs={[
    { label: 'All', onClick: () => navigate('/') },
    { label: 'Item 1', onClick: () => navigate('/item-1') },
  ]}
  count={12}
/>

// Link-based crumbs
<AXLocationBreadcrumb
  crumbs={[
    { label: 'All', href: '/' },
    { label: 'Department A', href: '/dept-a' },
    { label: 'Aisle 3', href: '/dept-a/aisle-3' },
  ]}
  count={8}
  countLabel="items"
/>

// While count is loading
<AXLocationBreadcrumb
  crumbs={[{ label: 'All', onClick: handleReset }]}
  count={0}
  countLoading={isLoading}
/>`}</pre>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
