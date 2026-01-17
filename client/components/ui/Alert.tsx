import React from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  variant?: AlertVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

// Default icons for each variant (using inline SVGs from LD 3.5 spec)
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M8 4C8.27614 4 8.5 4.22386 8.5 4.5V8.5C8.5 8.77614 8.27614 9 8 9C7.72386 9 7.5 8.77614 7.5 8.5V4.5C7.5 4.22386 7.72386 4 8 4Z" fill="currentColor"/>
    <path d="M8 11C8.27614 11 8.5 10.7761 8.5 10.5C8.5 10.2239 8.27614 10 8 10C7.72386 10 7.5 10.2239 7.5 10.5C7.5 10.7761 7.72386 11 8 11Z" fill="currentColor"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M10.5 6L7.5 9.5L5.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L14.928 14H1.072L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M8 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
  </svg>
);

const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', children, icon, action, ...props }, ref) => {
    const displayIcon = icon !== undefined ? icon : DEFAULT_ICONS[variant];
    
    const className = [
      styles.alert,
      styles[`alert--${variant}`],
    ]
      .filter(Boolean)
      .join(' ');

    // Use role="alert" for error variant, aria-live="polite" for others
    const ariaProps = variant === 'error' 
      ? { role: 'alert' }
      : { 'aria-live': 'polite' as const };

    return (
      <div
        ref={ref}
        className={className}
        {...ariaProps}
        {...props}
      >
        {displayIcon && (
          <div className={styles.alert__icon}>
            {displayIcon}
          </div>
        )}
        <div className={styles.alert__content}>
          <div className={styles.alert__text}>
            {children}
          </div>
          {action && (
            <div className={styles.alert__action}>
              {action}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
