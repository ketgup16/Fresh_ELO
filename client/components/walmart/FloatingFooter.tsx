import React from 'react';
import { Button } from '@/components/ui/Button';
import styles from './FloatingFooter.module.css';

interface FloatingFooterAction {
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface FloatingFooterProps {
  secondaryAction: FloatingFooterAction;
  primaryAction: FloatingFooterAction;
  /** false = in-flow (for docs page demo); true = fixed to viewport bottom */
  fixed?: boolean;
}

export function FloatingFooter({
  secondaryAction,
  primaryAction,
  fixed = false,
}: FloatingFooterProps) {
  return (
    <div className={`${styles.bar} ${fixed ? styles.barFixed : ''}`}>
      <Button
        variant="secondary"
        size="medium"
        leading={secondaryAction.icon}
        onClick={secondaryAction.onClick}
      >
        {secondaryAction.label}
      </Button>
      <Button
        variant="secondary"
        size="medium"
        leading={primaryAction.icon}
        subLabel={primaryAction.subLabel}
        onClick={primaryAction.onClick}
      >
        {primaryAction.label}
      </Button>
    </div>
  );
}
