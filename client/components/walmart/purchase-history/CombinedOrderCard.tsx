import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import { AutoCareModals, AutoCareModalType } from './AutoCareModals';
import type { OrderCardProps } from './OrderCard';
import styles from './CombinedOrderCard.module.css';

const FULFILLMENT_ICONS: Record<string, { src: string }> = {
  delivery: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F06ac09fed4534c02b62a8d43e759a824',
  },
  auto: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F26a934c359774221bf674b2fb62d93da',
  },
};

const ORDER_TYPE_LABELS: Record<string, string> = {
  delivery: 'Delivery from store',
  auto: 'Auto Care Center',
};

const DELIVERY_STEPS = ['Placed', 'Preparing', 'On the way', 'Delivered'];
const STEP_INDEX: Record<string, number> = {
  placed: 0, preparing: 1, 'on-the-way': 2, delivered: 3,
};

interface CombinedOrderCardProps {
  autoCare: OrderCardProps;
  delivery: OrderCardProps;
  autoCareAppointmentDate?: Date;
}

export function CombinedOrderCard({ autoCare, delivery, autoCareAppointmentDate }: CombinedOrderCardProps) {
  const [openModal, setOpenModal] = useState<AutoCareModalType>(null);

  const autoCareActions = autoCare.actions?.map(a => {
    if (a.label === 'Check in')     return { ...a, onClick: () => setOpenModal('checkIn') };
    if (a.label === 'Reschedule')   return { ...a, onClick: () => setOpenModal('reschedule') };
    if (a.label === 'View details') return { ...a, onClick: () => setOpenModal('viewDetails') };
    return a;
  }) ?? [];

  const deliveryPrimary   = delivery.actions?.filter(a => a.variant === 'primary') ?? [];
  const deliverySecondary = delivery.actions?.filter(a => a.variant === 'secondary') ?? [];
  const activeStep = delivery.timelineStep ? STEP_INDEX[delivery.timelineStep] : undefined;

  return (
    <>
      <article className={styles.card}>
        {/* Two-column body */}
        <div className={styles.body}>

          {/* ── Left: Auto Care ── */}
          <div className={styles.section}>
            <div className={styles.orderMeta}>
              <img
                src={FULFILLMENT_ICONS.auto.src}
                alt=""
                aria-hidden="true"
                className={styles.typeIcon}
              />
              <div className={styles.metaText}>
                <span className={styles.eyebrow}>{ORDER_TYPE_LABELS.auto}</span>
                {autoCare.location && (
                  <span className={styles.location}>{autoCare.location}</span>
                )}
                <h3 className={styles.statusHeading}>{autoCare.statusHeading}</h3>
              </div>
            </div>

            {autoCare.serviceDetails && (
              <div className={styles.serviceDetails}>
                <span className={styles.vehicleLabel}>{autoCare.serviceDetails.vehicle}</span>
                <ul className={styles.serviceList}>
                  {autoCare.serviceDetails.services.map((s, i) => (
                    <li key={i} className={styles.serviceItem}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.actions}>
              {autoCareActions.map(a => (
                <Button
                  key={a.label}
                  variant={a.variant}
                  size="small"
                  onClick={a.onClick}
                  UNSAFE_className={styles.actionBtn}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className={styles.verticalDivider} aria-hidden="true" />

          {/* ── Right: Delivery ── */}
          <div className={styles.section}>
            <div className={styles.orderMeta}>
              <img
                src={FULFILLMENT_ICONS.delivery.src}
                alt=""
                aria-hidden="true"
                className={styles.typeIcon}
              />
              <div className={styles.metaText}>
                <span className={styles.eyebrow}>{ORDER_TYPE_LABELS.delivery}</span>
                <h3 className={styles.statusHeading}>{delivery.statusHeading}</h3>
              </div>
            </div>

            {delivery.timelineStep && activeStep !== undefined && (
              <ProgressTracker
                steps={DELIVERY_STEPS}
                activeStep={activeStep}
                status="info"
                className={styles.tracker}
              />
            )}

            {delivery.products.length > 0 && (
              <div className={styles.products}>
                {delivery.products.slice(0, 5).map((p, i) => (
                  <img key={i} src={p.src} alt={p.alt} className={styles.productImg} />
                ))}
              </div>
            )}

            <div className={styles.actions}>
              {deliveryPrimary.map(a => (
                <Button key={a.label} variant="primary" size="small" onClick={a.onClick} UNSAFE_className={styles.actionBtn}>
                  {a.label}
                </Button>
              ))}
              {deliverySecondary.map(a => (
                <Button key={a.label} variant="secondary" size="small" onClick={a.onClick} UNSAFE_className={styles.actionBtn}>
                  {a.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Divider />
        <div className={styles.footer}>
          <div className={styles.footerItem}>
            <span className={styles.footerLabel}>Auto Care</span>
            <span className={styles.orderTotal}>Order total {autoCare.orderTotal}</span>
          </div>
          <span className={styles.footerDivider} aria-hidden="true" />
          <div className={styles.footerItem}>
            <span className={styles.footerLabel}>Delivery from store</span>
            <span className={styles.orderTotal}>Order total {delivery.orderTotal}</span>
          </div>
        </div>
      </article>

      <AutoCareModals
        openModal={openModal}
        onClose={() => setOpenModal(null)}
        onSwitchToCheckIn={() => setOpenModal('checkIn')}
        onSwitchToReschedule={() => setOpenModal('reschedule')}
        serviceDetails={autoCare.serviceDetails}
        location={autoCare.location}
        statusHeading={autoCare.statusHeading}
        orderTotal={autoCare.orderTotal}
        appointmentDate={autoCareAppointmentDate}
      />
    </>
  );
}
