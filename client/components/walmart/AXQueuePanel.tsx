import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { AXQueueItemCard } from './AXQueueItemCard';
import type { QueueItem } from './AXQueueItemCard';
import styles from './AXQueuePanel.module.css';

export interface AXQueuePanelProps {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Called when the panel should close */
  onClose: () => void;
  /** List of queue items to display */
  items: QueueItem[];
}

export const AXQueuePanel: React.FC<AXQueuePanelProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const itemCount = items.length;
  const title = `You\u2019re in line for ${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="medium"
      position="right"
      ariaLabel={title}
      closeButtonAriaLabel="Close queue panel"
    >
      <div className={styles.cardList}>
        {items.map((item) => (
          <AXQueueItemCard key={item.id} item={item} />
        ))}
      </div>
    </Panel>
  );
};
