import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Alert } from '@/components/ui/Alert';
import { Link } from '@/components/ui/Link';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import styles from './OrderCard.module.css';

export type OrderType = 'curbside' | 'delivery' | 'shipping' | 'store';
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
}

const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  curbside: 'Curbside pickup',
  delivery: 'Delivery from store',
  shipping: 'Shipping',
  store: 'Store purchase',
};

const DELIVERY_STEPS = ['Placed', 'Preparing', 'On the way', 'Delivered'];
const PICKUP_STEPS = ['Placed', 'Preparing', 'Ready', 'Picked up'];
const STEP_INDEX: Record<TimelineStep, number> = {
  placed: 0,
  preparing: 1,
  'on-the-way': 2,
  delivered: 3,
};

function OrderTypeIcon({ type }: { type: OrderType }) {
  if (type === 'curbside' || type === 'store') {
    return (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M28 10h-4V7a3 3 0 0 0-3-3H11a3 3 0 0 0-3 3v3H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h10a3 3 0 0 0 6 0h1a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2ZM9 26a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm14 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM10 10V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3H10Z"/>
      </svg>
    );
  }
  if (type === 'delivery') {
    return (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M28.8 11.4 26 6.8A2 2 0 0 0 24.3 6H20V4H2v18h2a4 4 0 0 0 8 0h8a4 4 0 0 0 8 0h2V16a5 5 0 0 0-1.2-4.6ZM8 24a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm16 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM20 14V8h4.3l2.5 4.2A3 3 0 0 1 28 14h-8Z"/>
      </svg>
    );
  }
  // shipping
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path fill="currentColor" d="M29 20h-1V12.4a2 2 0 0 0-.6-1.4l-5.4-5.4A2 2 0 0 0 20.6 5H18V3H3v20h2a3 3 0 0 0 6 0h8a3 3 0 0 0 6 0h4v-3ZM8 24a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm14 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM18 7h2.6l5.4 5.4V13H18V7Z"/>
    </svg>
  );
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
}: OrderCardProps) {
  const primaryActions = actions.filter((a) => a.variant === 'primary');
  const secondaryActions = actions.filter((a) => a.variant === 'secondary');

  const steps = timelineVariant === 'pickup' ? PICKUP_STEPS : DELIVERY_STEPS;
  const activeStep = timelineStep ? STEP_INDEX[timelineStep] : undefined;
  const trackerStatus = isDelayed ? 'warning' : 'info';

  return (
    <article className={styles.card}>
      {/* Add items banner — LD Alert (warning) */}
      {addItemsBanner && (
        <div className={styles.addItemsBannerWrap}>
          <Alert
            variant="warning"
            action={
              <Link href="#" underline>
                Add items
              </Link>
            }
          >
            {addItemsBanner}
          </Alert>
        </div>
      )}

      <div className={styles.cardBody}>
        {/* Left: order info + timeline + products */}
        <div className={styles.leftCol}>
          {/* Order type + location */}
          <div className={styles.orderMeta}>
            <span className={styles.orderTypeChip}>
              <OrderTypeIcon type={orderType} />
              <span>{ORDER_TYPE_LABELS[orderType]}</span>
            </span>
            {location && <span className={styles.location}>{location}</span>}
            {seller && (
              <span className={styles.seller}>
                Sold by{' '}
                <Link href="#" underline>{seller}</Link>
                {fulfilledBy && <> | Fulfilled by {fulfilledBy}</>}
              </span>
            )}
          </div>

          {/* Status heading */}
          <h3 className={`${styles.statusHeading} ${isDelayed ? styles.statusHeadingDelayed : ''}`}>
            {statusHeading}
          </h3>

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

          {/* Product images */}
          <div className={styles.products}>
            {products.slice(0, 8).map((p, i) => (
              <img key={i} src={p.src} alt={p.alt} className={styles.productImg} />
            ))}
          </div>
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
