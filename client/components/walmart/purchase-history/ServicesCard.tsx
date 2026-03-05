import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from '@/components/icons';
import { Link } from '@/components/ui/Link';
import { ServiceRow, ServiceStatus } from './ServiceRow';
import { ServiceType } from './ServiceTypeIcon';
import styles from './ServicesCard.module.css';

export interface ServiceEntry {
  id: string;
  serviceType: ServiceType;
  serviceLabel: string;
  status: ServiceStatus;
  microcopy?: string;
  orderDetailPath?: string;
}

interface ServicesCardProps {
  services: ServiceEntry[];
  onViewAll?: () => void;
  defaultExpanded?: boolean;
}

const PRIORITY: Record<ServiceStatus, number> = {
  READY_FOR_PICKUP: 0,
  IN_PROGRESS:      1,
  PROCESSING:       2,
  SCHEDULED:        3,
  CANCELLED:        4,
  OTHER:            5,
};

export function ServicesCard({
  services,
  onViewAll,
  defaultExpanded = false,
}: ServicesCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const activeCount = services.filter(s => s.status !== 'CANCELLED').length;

  const sorted = [...services].sort(
    (a, b) => PRIORITY[a.status] - PRIORITY[b.status]
  );

  const displayed = isExpanded ? sorted : sorted.slice(0, 2);
  const showViewAll = sorted.length > 2 && !isExpanded;
  const showToggle = sorted.length > 2;

  return (
    <article className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          Your Services
          <span className={styles.activeCount}>
            {' '}({activeCount} Active)
          </span>
        </h3>

        {showToggle && (
          <button
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(prev => !prev)}
            aria-expanded={isExpanded}
            aria-controls="services-list"
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronUp aria-hidden="true" className={styles.toggleIcon} />
              </>
            ) : (
              <>
                Show all
                <ChevronDown aria-hidden="true" className={styles.toggleIcon} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Service rows */}
      <div id="services-list">
        {displayed.map((entry, i) => (
          <ServiceRow
            key={entry.id}
            serviceType={entry.serviceType}
            serviceLabel={entry.serviceLabel}
            status={entry.status}
            microcopy={entry.microcopy}
            isLast={i === displayed.length - 1 && !showViewAll}
            onTap={
              entry.orderDetailPath
                ? () => window.location.assign(entry.orderDetailPath!)
                : undefined
            }
          />
        ))}
      </div>

      {/* View All footer link */}
      {showViewAll && (
        <div className={styles.viewAllRow}>
          <Link href="#" underline onClick={e => { e.preventDefault(); onViewAll?.(); }}>
            View all services
          </Link>
        </div>
      )}
    </article>
  );
}
