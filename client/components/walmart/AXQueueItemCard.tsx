import React from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { Button } from '@/components/ui/Button';
import { AXTimerView } from './AXTimerView';
import type { AXTimerBadgeColor } from './AXTimerView';
import { useAXTimer } from '@/hooks/use-ax-timer';
import styles from './AXQueueItemCard.module.css';

export interface QueueItem {
  id: string;
  /** Product thumbnail URL */
  productImage?: string;
  /** Alt text for product image */
  productImageAlt?: string;
  /** Product description */
  description: string;
  /** Current price */
  price: string;
  /** Original / strikethrough price */
  originalPrice?: string;
  /** Timer end time */
  endTime: Date | number | string;
  /** Called when View is clicked */
  onView?: () => void;
  /** Called when Leave the line is clicked */
  onLeave?: () => void;
}

interface AXQueueItemCardProps {
  item: QueueItem;
}

export const AXQueueItemCard: React.FC<AXQueueItemCardProps> = ({ item }) => {
  const timer = useAXTimer(item.endTime);

  const badgeColor: AXTimerBadgeColor =
    timer.urgency === 'critical'
      ? 'negative'
      : timer.urgency === 'warning'
      ? 'spark'
      : 'blue';

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {/* Timer + "estimated wait" row */}
        <div className={styles.timerRow}>
          <AXTimerView
            endTime={item.endTime}
            variant="badge"
            badgeColor={badgeColor}
          />
          <span className={styles.timerLabel}>estimated wait</span>
        </div>

        {/* Product description row */}
        <div className={styles.productRow}>
          {item.productImage ? (
            <img
              src={item.productImage}
              alt={item.productImageAlt || ''}
              className={styles.productImg}
            />
          ) : (
            <div className={styles.productImgPlaceholder} aria-hidden="true" />
          )}
          <span className={styles.productDescription}>{item.description}</span>
          <div className={styles.pricing}>
            <span className={styles.currentPrice}>{item.price}</span>
            {item.originalPrice && (
              <span className={styles.originalPrice}>{item.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Actions row */}
        <div className={styles.actionsRow}>
          {item.onLeave && (
            <LinkButton color="default" size="small" onClick={item.onLeave}>
              Leave the line
            </LinkButton>
          )}
          {item.onView && (
            <Button variant="secondary" size="small" onClick={item.onView}>
              View
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
