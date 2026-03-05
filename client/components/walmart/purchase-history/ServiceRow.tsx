import React from 'react';
import { ChevronRight } from '@/components/icons';
import { Tag } from '@/components/ui/Tag';
import { ServiceTypeIcon, ServiceType } from './ServiceTypeIcon';
import styles from './ServiceRow.module.css';

export type ServiceStatus =
  | 'READY_FOR_PICKUP'
  | 'IN_PROGRESS'
  | 'PROCESSING'
  | 'SCHEDULED'
  | 'CANCELLED'
  | 'OTHER';

interface StatusConfig {
  label: string;
  color: 'positive' | 'info' | 'gray' | 'negative';
}

const STATUS_CONFIG: Record<ServiceStatus, StatusConfig> = {
  READY_FOR_PICKUP: { label: 'Ready',       color: 'positive' },
  IN_PROGRESS:      { label: 'In Progress', color: 'info'     },
  PROCESSING:       { label: 'Processing',  color: 'info'     },
  SCHEDULED:        { label: 'Scheduled',   color: 'gray'     },
  CANCELLED:        { label: 'Canceled',    color: 'negative' },
  OTHER:            { label: 'See details', color: 'gray'     },
};

export interface ServiceRowProps {
  serviceType: ServiceType;
  serviceLabel: string;
  status: ServiceStatus;
  microcopy?: string;
  onTap?: () => void;
}

export function ServiceRow({
  serviceType,
  serviceLabel,
  status,
  microcopy,
  onTap,
}: ServiceRowProps) {
  const { label, color } = STATUS_CONFIG[status];

  const content = (
    <>
      <ServiceTypeIcon type={serviceType} size={32} />

      <div className={styles.info}>
        <span className={styles.serviceLabel}>{serviceLabel}</span>
        {microcopy && (
          <span className={styles.microcopy}>{microcopy}</span>
        )}
      </div>

      <Tag variant="secondary" color={color}>
        {label}
      </Tag>

      {onTap && (
        <ChevronRight
          aria-hidden="true"
          className={styles.chevron}
        />
      )}
    </>
  );

  if (onTap) {
    return (
      <button
        className={`${styles.row} ${styles.rowInteractive}`}
        onClick={onTap}
        aria-label={`${serviceLabel}, ${label}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={styles.row} aria-label={`${serviceLabel}, ${label}`}>
      {content}
    </div>
  );
}
