import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { AXMetricGroup } from '@/components/walmart/AXMetricGroup';
import { Button } from '@/components/ui/Button';
import { MetricProps } from '@/components/ui/Metric';
import { useTranslation } from 'react-i18next';
import styles from './AXMetricGroup.module.css';
import exStyles from '@/components/examples/ExamplePage.module.css';

const DEMO_METRICS: MetricProps[] = [
  { title: 'Total Sales', value: '$24,500', unit: 'USD', variant: 'positiveUp', textLabel: '+8% vs last week' },
  { title: 'Orders Fulfilled', value: '1,340', variant: 'positiveUp', textLabel: '+12% vs last week' },
  { title: 'Return Rate', value: '3.2', unit: '%', variant: 'negativeDown', textLabel: '-0.4% vs last week' },
];

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
      <div className={exStyles.pageGap}>

        {/* Interactive demo */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Interactive demo</h2>
          <p className={exStyles.desc}>
            Toggle between 2 and 3 metrics to see the Metric Group adjust. Each Metric component is separated by a vertical Divider with 8px spacing between all elements.
          </p>

          <div className={styles.countSelector}>
            <span className={styles.countLabel}>Metric count</span>
            <div className={styles.countButtons}>
              <Button variant={count === 2 ? 'primary' : 'secondary'} size="small" onClick={() => setCount(2)}>
                2 Metrics
              </Button>
              <Button variant={count === 3 ? 'primary' : 'secondary'} size="small" onClick={() => setCount(3)}>
                3 Metrics
              </Button>
            </div>
          </div>

          <div className={styles.previewFrame}>
            <AXMetricGroup metrics={DEMO_METRICS.slice(0, count)} />
          </div>
        </div>

        {/* Anatomy */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Anatomy</h2>
          <p className={exStyles.desc}>
            The Metric Group is a horizontal flex container composed of:
          </p>
          <ul className={styles.list}>
            <li><strong>Metric</strong> — displays a title, value, optional unit, optional time, and optional trend label with a directional arrow.</li>
            <li><strong>Divider (vertical)</strong> — a vertical separator rendered between each pair of Metric components. It stretches to match the tallest Metric in the row.</li>
            <li><strong>8px gap</strong> — applied uniformly via CSS <code>gap</code> on the flex container, so the gap appears between every element: Metric → Divider → Metric.</li>
          </ul>
        </div>

        {/* Guidelines */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Guidelines</h2>

          <div className={styles.guidelinesGrid}>
            <div>
              <p className={styles.guidelineLabel} style={{ color: 'var(--ld-semantic-color-text-positive)' }}>When to use</p>
              <ul className={styles.list}>
                <li>Group 2–3 closely related KPIs that together tell a larger story (e.g., Sales + Orders + Returns).</li>
                <li>Use on dashboards or summary cards where horizontal space is available and the metrics share the same time context.</li>
                <li>When each metric is equally important and no single value should dominate visually.</li>
              </ul>
            </div>
            <div>
              <p className={styles.guidelineLabel} style={{ color: 'var(--ld-semantic-color-text-negative)' }}>When not to use</p>
              <ul className={styles.list}>
                <li>Do not use more than 3 metrics — beyond 3, scanability drops. Use a data table or a grid of individual Metric cards instead.</li>
                <li>Avoid mixing metrics with unrelated contexts or units in the same group.</li>
                <li>Do not use a single metric — use the standalone Metric component instead.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Props table */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Properties</h2>
          <p className={exStyles.desc}>Props accepted by the AXMetricGroup component. For individual metric options, refer to the MetricProps interface on the Metrics documentation page.</p>
          <div className={exStyles.tableWrapper}>
            <table className={exStyles.docsTable}>
              <thead>
                <tr>
                  <th>Prop</th><th>Type</th><th>Default</th><th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['metrics', 'MetricProps[]', '—', 'Required. Array of 2–3 MetricProps objects to render.'],
                  ['className', 'string', '—', 'Optional additional CSS class applied to the root flex container.'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className={exStyles.propCell}>{prop}</td>
                    <td className={exStyles.codeCell}>{type}</td>
                    <td className={exStyles.codeCell}>{def}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Import reference */}
        <div className={exStyles.section}>
          <h2 className={exStyles.sectionTitle}>Import reference</h2>
          <pre className={exStyles.codeBlock}>{codeSnippet}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
