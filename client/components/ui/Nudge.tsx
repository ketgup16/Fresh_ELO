import * as React from 'react';
import { X } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';
import styles from './Nudge.module.css';

export interface NudgeProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'title'> {
  /**
   * The title for the nudge.
   */
  title: React.ReactNode;
  
  /**
   * The content for the nudge.
   */
  children?: React.ReactNode;
  
  /**
   * The leading content for the nudge (icon, spot icon, illustration).
   */
  leading?: React.ReactNode;
  
  /**
   * The callback fired when the nudge requests to close.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * The actions for the nudge (buttons, links, etc).
   */
  actions?: React.ReactNode;
  
  /**
   * The props spread to the nudge's close button.
   */
  closeButtonProps?: React.ComponentPropsWithoutRef<'button'>;
  
  /**
   * Unsafe override for className. Use sparingly.
   */
  UNSAFE_className?: string;
  
  /**
   * Unsafe override for style. Use sparingly.
   */
  UNSAFE_style?: React.CSSProperties;
}

export const Nudge = React.forwardRef<HTMLDivElement, NudgeProps>(
  (
    {
      title,
      children,
      leading,
      onClose,
      actions,
      closeButtonProps,
      UNSAFE_className,
      UNSAFE_style,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(styles.nudge, UNSAFE_className)}
        style={UNSAFE_style}
        {...rest}
      >
        {/* Header Section: Leading + Title + Close */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {leading && <div className={styles.leading}>{leading}</div>}
            <div className={styles.title}>{title}</div>
          </div>
          {onClose && (
            <IconButton
              variant="ghost"
              size="medium"
              shape="rounded"
              onClick={onClose}
              aria-label="Close"
              UNSAFE_className={styles.closeButton}
            >
              <X style={{ width: 20, height: 20 }} />
            </IconButton>
          )}
        </div>

        {/* Content Section */}
        {children && <div className={styles.content}>{children}</div>}

        {/* Actions Section */}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  }
);

Nudge.displayName = 'Nudge';
