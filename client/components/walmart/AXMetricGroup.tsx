import React from 'react';
import { Metric, MetricProps } from '@/components/ui/Metric';
import { Divider } from '@/components/ui/Divider';
import styles from './AXMetricGroup.module.css';

export interface AXMetricGroupProps {
  /** Array of 2–3 Metric prop objects to render side-by-side. */
  metrics: MetricProps[];
  /** Optional additional CSS class applied to the root element. */
  className?: string;
}

/**
 * AX Pattern — Metric Group
 *
 * Renders 2–3 Metric components side-by-side, separated by vertical Dividers,
 * with 8px space tokens between all elements (via CSS gap on the flex container).
 *
 * @example
 * <AXMetricGroup
 *   metrics={[
 *     { title: 'Total Sales', value: '$24,500', unit: 'USD' },
 *     { title: 'Orders', value: '1,340', variant: 'positiveUp', textLabel: '+12% vs last week' },
 *   ]}
 * />
 */
export const AXMetricGroup: React.FC<AXMetricGroupProps> = ({ metrics, className = '' }) => {
  if (import.meta.env.DEV) {
    if (metrics.length < 2 || metrics.length > 3) {
      console.warn(
        `[AXMetricGroup] Expected 2–3 metrics, received ${metrics.length}. ` +
        'Please pass an array with 2 or 3 MetricProps objects.'
      );
    }
  }

  // Clamp to 2–3 for safety in production
  const items = metrics.slice(0, 3);

  return (
    <div className={`${styles.group} ${className}`}>
      {items.map((metricProps, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider orientation="vertical" />}
          <Metric {...metricProps} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default AXMetricGroup;
