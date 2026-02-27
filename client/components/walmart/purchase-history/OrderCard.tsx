import { ChevronRight } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Alert } from '@/components/ui/Alert';
import { Link } from '@/components/ui/Link';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import { AmendsBanner } from './AmendsBanner';
import styles from './OrderCard.module.css';

export type OrderType = 'curbside' | 'delivery' | 'shipping' | 'store' | 'auto';
export type TimelineStep = 'placed' | 'preparing' | 'on-the-way' | 'delivered';

export interface OrderAction {
  label: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

export interface OrderProduct {
  src: string;
  alt: string;
}

export interface ServiceDetails {
  vehicle: string;
  services: string[];
}

export interface OrderCardProps {
  orderType: OrderType;
  location?: string;
  seller?: string;
  fulfilledBy?: string;
  statusHeading: string;
  timelineStep?: TimelineStep;
  timelineVariant?: 'delivery' | 'pickup';
  isDelayed?: boolean;
  products: OrderProduct[];
  orderTotal?: string;
  actions?: OrderAction[];
  showStartReturn?: boolean;
  returnNotice?: string;
  returnDeadline?: string;
  addItemsBanner?: string;
  serviceDetails?: ServiceDetails;
}

const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  curbside: 'Curbside pickup',
  delivery: 'Delivery from store',
  shipping: 'Shipping',
  store: 'Store purchase',
  auto: 'Auto Care Center',
};

const DELIVERY_STEPS = ['Placed', 'Preparing', 'On the way', 'Delivered'];
const PICKUP_STEPS = ['Placed', 'Preparing', 'Ready', 'Picked up'];
const STEP_INDEX: Record<TimelineStep, number> = {
  placed: 0,
  preparing: 1,
  'on-the-way': 2,
  delivered: 3,
};

const FULFILLMENT_ICONS: Record<OrderType, { src: string; alt: string }> = {
  curbside: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Feb8e854b1c2441668631c59d482af3f2',
    alt: 'Curbside pickup',
  },
  delivery: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F06ac09fed4534c02b62a8d43e759a824',
    alt: 'Delivery',
  },
  store: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4ed8486e018848678a23689dc195dcd8',
    alt: 'Store purchase',
  },
  shipping: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fae074f13699f44c0a142fc357711a02e',
    alt: 'Shipping',
  },
  auto: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F26a934c359774221bf674b2fb62d93da',
    alt: '',
  },
};

function OrderTypeIcon({ type }: { type: OrderType }) {
  const icon = FULFILLMENT_ICONS[type];
  return <img src={icon.src} alt="" aria-hidden="true" width={64} height={64} />;
}

export function OrderCard({
  orderType,
  location,
  seller,
  fulfilledBy,
  statusHeading,
  timelineStep,
  timelineVariant = 'delivery',
  isDelayed = false,
  products,
  orderTotal,
  actions = [],
  showStartReturn = false,
  returnNotice,
  returnDeadline,
  addItemsBanner,
  serviceDetails,
}: OrderCardProps) {
  const primaryActions = actions.filter((a) => a.variant === 'primary');
  const secondaryActions = actions.filter((a) => a.variant === 'secondary');

  const steps = timelineVariant === 'pickup' ? PICKUP_STEPS : DELIVERY_STEPS;
  const activeStep = timelineStep ? STEP_INDEX[timelineStep] : undefined;
  const trackerStatus = isDelayed ? 'warning' : 'info';

  return (
    <article className={styles.card}>
      {/* Amends Banner — custom design per Figma */}
      {addItemsBanner && (
        <AmendsBanner message={addItemsBanner} />
      )}

      <div className={styles.cardBody}>
        {/* Left: order info + timeline + products */}
        <div className={styles.leftCol}>
          {/* Order type + location */}
          <div className={styles.orderMeta}>
            <span className={styles.orderTypeChip}>
              <OrderTypeIcon type={orderType} />
              <span className={styles.orderTypeChipText}>
                <span className={styles.eyebrow}>{ORDER_TYPE_LABELS[orderType]}</span>
                {location && <span className={styles.location}>{location}</span>}
                <h3 className={`${styles.statusHeading} ${isDelayed ? styles.statusHeadingDelayed : ''}`}>
                  {statusHeading}
                </h3>
              </span>
              {/* Mobile-only chevron */}
              <ChevronRight className={styles.mobileChevron} aria-hidden="true" />
            </span>
            {seller && (
              <span className={styles.seller}>
                Sold by{' '}
                <Link href="#" underline>{seller}</Link>
                {fulfilledBy && <> | Fulfilled by {fulfilledBy}</>}
              </span>
            )}
          </div>

          {/* LD ProgressTracker */}
          {timelineStep && activeStep !== undefined && (
            <ProgressTracker
              steps={steps}
              activeStep={activeStep}
              status={trackerStatus}
              className={styles.progressTracker}
            />
          )}

          {/* Return notices — LD Alert (info) */}
          {returnNotice && (
            <div className={styles.returnAlertWrap}>
              <Alert variant="info">
                {returnNotice}
              </Alert>
            </div>
          )}
          {returnDeadline && (
            <div className={styles.returnAlertWrap}>
              <Alert variant="info">
                Return by {returnDeadline}
              </Alert>
            </div>
          )}

          {/* Service details (auto appointments) */}
          {serviceDetails && (
            <div className={styles.serviceDetails}>
              <span className={styles.vehicleLabel}>{serviceDetails.vehicle}</span>
              <ul className={styles.serviceList}>
                {serviceDetails.services.map((s, i) => (
                  <li key={i} className={styles.serviceItem}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Product images */}
          {products.length > 0 && (
            <div className={styles.products}>
              {products.slice(0, 8).map((p, i) => (
                <img key={i} src={p.src} alt={p.alt} className={styles.productImg} />
              ))}
            </div>
          )}
        </div>

        {/* Right: action buttons */}
        {actions.length > 0 && (
          <div className={styles.rightCol}>
            {primaryActions.map((a) => (
              <Button key={a.label} variant="primary" size="small" onClick={a.onClick} UNSAFE_className={styles.actionBtn}>
                {a.label}
              </Button>
            ))}
            {secondaryActions.map((a) => (
              <Button key={a.label} variant="secondary" size="small" onClick={a.onClick} UNSAFE_className={styles.actionBtn}>
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Divider />
      <div className={styles.cardFooter}>
        {showStartReturn && (
          <Link href="/returns" underline>Start a return</Link>
        )}
        <span className={styles.footerSpacer} />
        {orderTotal && (
          <span className={styles.orderTotal}>Order total {orderTotal}</span>
        )}
      </div>
    </article>
  );
}
