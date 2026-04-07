import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { AXMetricGroup } from '@/components/walmart/AXMetricGroup';
import { Button } from '@/components/ui/Button';
import { MetricProps } from '@/components/ui/Metric';
import { useTranslation } from 'react-i18next';
import styles from './AXMetricGroup.module.css';

// ── Demo data ────────────────────────────────────────────────────────────────

const DEMO_METRICS: MetricProps[] = [
  {
    title: 'Total Sales',
    value: '$24,500',
    unit: 'USD',
    variant: 'positiveUp',
    textLabel: '+8% vs last week',
  },
  {
    title: 'Orders Fulfilled',
    value: '1,340',
    variant: 'positiveUp',
    textLabel: '+12% vs last week',
  },
  {
    title: 'Return Rate',
    value: '3.2',
    unit: '%',
    variant: 'negativeDown',
    textLabel: '-0.4% vs last week',
  },
];

// ── Shared inline style tokens ────────────────────────────────────────────────

const DESC: React.CSSProperties = {
  margin: '0 0 24px',
  fontSize: '14px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-subtle)',
  lineHeight: 1.6,
};

const SECTION_TITLE: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
  margin: '0 0 24px',
  paddingBottom: '12px',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AXMetricGroupPage() {
  const { t } = useTranslation();
  const [count, setCount] = useState<2 | 3>(2);

  const codeSnippet = `import { AXMetricGroup } from '@/components/walmart/AXMetricGroup';

<AXMetricGroup
  metrics={[
    { title: 'Total Sales', value: '$24,500', unit: 'USD', variant: 'positiveUp', textLabel: '+8% vs last week' },
    { title: 'Orders Fulfilled', value: '1,340', variant: 'positiveUp', textLabel: '+12% vs last week' },${count === 3 ? `
    { title: 'Return Rate', value: '3.2', unit: '%', variant: 'negativeDown', textLabel: '-0.4% vs last week' },` : ''}
  ]}
/>`;

  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navAXMetricGroup')}
      description={t('componentLibrary.descAXMetricGroup')}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

        {/* ── Interactive demo ── */}
        <div>
          <h2 style={SECTION_TITLE}>Interactive demo</h2>
          <p style={DESC}>
            Toggle between 2 and 3 metrics to see the Metric Group adjust. Each Metric component is separated by a vertical Divider with 8px spacing between all elements.
          </p>

          {/* Count selector */}
          <div className={styles.countSelector}>
            <span className={styles.countLabel}>Metric count</span>
            <div className={styles.countButtons}>
              <Button
                variant={count === 2 ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setCount(2)}
              >
                2 Metrics
              </Button>
              <Button
                variant={count === 3 ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setCount(3)}
              >
                3 Metrics
              </Button>
            </div>
          </div>

          {/* Live preview */}
          <div className={styles.previewFrame}>
            <AXMetricGroup metrics={DEMO_METRICS.slice(0, count)} />
          </div>
        </div>

        {/* ── Anatomy ── */}
        <div>
          <h2 style={SECTION_TITLE}>Anatomy</h2>
          <p style={DESC}>
            The Metric Group is a horizontal flex container composed of:
          </p>
          <ul style={{ ...DESC, margin: 0, paddingLeft: '20px' }}>
            <li><strong>Metric</strong> — displays a title, value, optional unit, optional time, and optional trend label with a directional arrow.</li>
            <li><strong>Divider (vertical)</strong> — a vertical separator rendered between each pair of Metric components. It stretches to match the tallest Metric in the row.</li>
            <li><strong>8px gap</strong> — applied uniformly via CSS <code>gap</code> on the flex container using <code>var(--ld-primitive-scale-space-2)</code>, so the gap appears between every element: Metric → Divider → Metric.</li>
          </ul>
        </div>

        {/* ── Guidelines ── */}
        <div>
          <h2 style={SECTION_TITLE}>Guidelines</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p style={{ ...DESC, fontWeight: 700, color: 'var(--ld-semantic-color-text-positive, #1a7f64)', marginBottom: '8px' }}>When to use</p>
              <ul style={{ ...DESC, margin: 0, paddingLeft: '20px' }}>
                <li>Group 2–3 closely related KPIs that together tell a larger story (e.g., Sales + Orders + Returns).</li>
                <li>Use on dashboards or summary cards where horizontal space is available and the metrics share the same time context.</li>
                <li>When each metric is equally important and no single value should dominate visually.</li>
              </ul>
            </div>
            <div>
              <p style={{ ...DESC, fontWeight: 700, color: 'var(--ld-semantic-color-text-critical, #c0392b)', marginBottom: '8px' }}>When not to use</p>
              <ul style={{ ...DESC, margin: 0, paddingLeft: '20px' }}>
                <li>Do not use more than 3 metrics — beyond 3, scanability drops. Use a data table or a grid of individual Metric cards instead.</li>
                <li>Avoid mixing metrics with unrelated contexts or units in the same group.</li>
                <li>Do not use a single metric — use the standalone Metric component instead.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Props table ── */}
        <div>
          <h2 style={SECTION_TITLE}>Properties</h2>
          <p style={DESC}>Props accepted by the AXMetricGroup component. For individual metric options, refer to the MetricProps interface on the Metrics documentation page.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtle)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['metrics', 'MetricProps[]', '—', 'Required. Array of 2–3 MetricProps objects to render. A dev-only warning is shown if the count is outside the 2–3 range.'],
                  ['className', 'string', '—', 'Optional additional CSS class applied to the root flex container.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--ld-semantic-color-text-brand)', whiteSpace: 'nowrap' }}>{prop}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{type}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>{def}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Import reference ── */}
        <div>
          <h2 style={SECTION_TITLE}>Import reference</h2>
          <pre style={{
            margin: 0,
            padding: '20px',
            borderRadius: '6px',
            backgroundColor: 'var(--ld-semantic-color-fill-surface-secondary, #F8F8F8)',
            border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--ld-semantic-color-text, #2E2F32)',
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}>
            {codeSnippet}
          </pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
