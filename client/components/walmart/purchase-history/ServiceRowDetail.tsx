import React from 'react';
import { ProgressTracker, type ProgressTrackerStatus } from '@/components/ui/ProgressTracker';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { ServiceType } from './ServiceTypeIcon';
import { type ServiceStatus } from './ServiceRow';
import styles from './ServiceRowDetail.module.css';

/* ── Tracking steps per service type ─────────────────────────────────────── */

const STEPS: Record<ServiceType, string[]> = {
  PHARMACY: ['Submitted', 'Filling', 'Ready', 'Picked up'],
  AUTO:     ['Scheduled', 'Checked in', 'In progress', 'Complete'],
  OPTICAL:  ['Ordered', 'Lab processing', 'Ready', 'Picked up'],
  BAKERY:   ['Ordered', 'Decorating', 'Ready', 'Picked up'],
};

const STATUS_TO_STEP: Record<ServiceType, Record<ServiceStatus, number>> = {
  PHARMACY: {
    READY_FOR_PICKUP: 2,
    IN_PROGRESS:      1,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
  AUTO: {
    READY_FOR_PICKUP: 3,
    IN_PROGRESS:      2,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
  OPTICAL: {
    READY_FOR_PICKUP: 2,
    IN_PROGRESS:      1,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
  BAKERY: {
    READY_FOR_PICKUP: 2,
    IN_PROGRESS:      1,
    PROCESSING:       1,
    SCHEDULED:        0,
    CANCELLED:        0,
    OTHER:            0,
  },
};

function getTrackerStatus(status: ServiceStatus): ProgressTrackerStatus {
  switch (status) {
    case 'READY_FOR_PICKUP': return 'success';
    case 'CANCELLED':        return 'error';
    default:                 return 'info';
  }
}

function getPrimaryAction(serviceType: ServiceType, status: ServiceStatus): string {
  if (status === 'READY_FOR_PICKUP') return 'Pick up';
  if (serviceType === 'AUTO' && status === 'SCHEDULED') return 'Check in';
  return 'View details';
}

/* ── Component ───────────────────────────────────────────────────────────── */

export interface ServiceRowDetailProps {
  serviceType: ServiceType;
  status: ServiceStatus;
  activeStep?: number;
  pickupLocation?: string;
  pickupDate?: string;
}

export function ServiceRowDetail({
  serviceType,
  status,
  activeStep,
  pickupLocation,
  pickupDate,
}: ServiceRowDetailProps) {
  const steps = STEPS[serviceType];
  const step = activeStep ?? STATUS_TO_STEP[serviceType][status];
  const trackerStatus = getTrackerStatus(status);

  const primaryLabel = getPrimaryAction(serviceType, status);
  const showSecondary = primaryLabel !== 'View details';

  return (
    <div className={styles.panel}>
      <ProgressTracker
        steps={steps}
        activeStep={step}
        status={trackerStatus}
        className={styles.tracker}
      />

      {(pickupLocation || pickupDate) && (
        <p className={styles.locationDate}>
          {pickupLocation}
          {pickupLocation && pickupDate && ' · '}
          {pickupDate}
        </p>
      )}

      <ButtonGroup UNSAFE_className={styles.actions}>
        <Button variant="primary" size="small">
          {primaryLabel}
        </Button>
        {showSecondary && (
          <Button variant="secondary" size="small">
            View details
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}
