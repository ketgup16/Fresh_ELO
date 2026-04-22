import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import styles from './AXLocationBreadcrumb.module.css';

export interface AXLocationBreadcrumbCrumb {
  /** Display label for this level */
  label: string;
  /** If provided, renders as a clickable link */
  href?: string;
  /** If provided (and no href), renders as a clickable button */
  onClick?: () => void;
}

export interface AXLocationBreadcrumbProps {
  /**
   * Ordered list of location levels.
   * The last item is always rendered as the current (non-clickable) crumb.
   */
  crumbs: AXLocationBreadcrumbCrumb[];
  /** Count to display on the right. Pass undefined to hide. */
  count?: number;
  /** Label appended after the count number. @default 'count' */
  countLabel?: string;
  /** Whether the count is in a loading state. */
  countLoading?: boolean;
  /** Accessible label for the breadcrumb nav. @default 'Location breadcrumb' */
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/**
 * AX Location Breadcrumb — shows a hierarchical location path (using LD Breadcrumb)
 * alongside an item count on the trailing side. Common in list/section headers where
 * the user navigates through location levels (All → Department → Aisle, etc.).
 */
export function AXLocationBreadcrumb({
  crumbs,
  count,
  countLabel = 'count',
  countLoading = false,
  'aria-label': ariaLabel = 'Location breadcrumb',
  UNSAFE_className,
  UNSAFE_style,
}: AXLocationBreadcrumbProps) {
  const rootClass = [styles.root, UNSAFE_className].filter(Boolean).join(' ');

  return (
    <div className={rootClass} style={UNSAFE_style}>
      {/* Left: breadcrumb path */}
      <Breadcrumb aria-label={ariaLabel} UNSAFE_className={styles.breadcrumb}>
        {crumbs.map((crumb, i) => {
          const isCurrent = i === crumbs.length - 1;

          if (isCurrent) {
            return (
              <BreadcrumbItem key={i} isCurrent>
                {crumb.label}
              </BreadcrumbItem>
            );
          }

          if (crumb.href) {
            return (
              <BreadcrumbItem key={i} href={crumb.href}>
                {crumb.label}
              </BreadcrumbItem>
            );
          }

          if (crumb.onClick) {
            return (
              <BreadcrumbItem key={i} onClick={crumb.onClick}>
                {crumb.label}
              </BreadcrumbItem>
            );
          }

          // Non-interactive ancestor (no href/onClick) — render as current-style span
          return (
            <BreadcrumbItem key={i} isCurrent>
              {crumb.label}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      {/* Right: count */}
      {count !== undefined && (
        <span className={styles.count} aria-live="polite">
          {countLoading ? (
            <span className={styles.countLoading} aria-label="Loading count" />
          ) : (
            <>
              <span className={styles.countNumber}>{count}</span>
              {' '}
              <span className={styles.countLabel}>{countLabel}</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
