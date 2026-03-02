import * as React from 'react';
import styles from './Highlight.module.css';

/**
 * Position of the callout relative to the anchor element.
 * The nubbin (arrow) points from the callout back toward the anchor.
 *
 * Examples:
 *   'bottom'       → callout appears below anchor, nubbin at top-center
 *   'bottom-start' → callout appears below anchor, nubbin at top-left
 *   'top'          → callout appears above anchor, nubbin at bottom-center
 *   'right'        → callout appears right of anchor, nubbin at left-center
 */
export type HighlightPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface HighlightProps {
  /** The anchor element the callout points to */
  children: React.ReactNode;
  /** Message text inside the callout */
  message: string;
  /**
   * Where the callout appears relative to the anchor.
   * @default 'bottom'
   */
  position?: HighlightPosition;
  /**
   * Optional leading icon/image. When provided it renders with a looping
   * bounce animation to attract the user's attention.
   */
  icon?: React.ReactNode;
  /** Label for the optional action link */
  actionLabel?: string;
  /** Fired when the action link is clicked */
  onAction?: () => void;
  /** Fired when the close (×) button is clicked */
  onClose?: () => void;
  /**
   * Controlled open state. When undefined the component manages its own
   * state via `defaultOpen`.
   */
  open?: boolean;
  /**
   * Initial open state for uncontrolled usage.
   * @default true
   */
  defaultOpen?: boolean;
  /** Additional class applied to the outer wrapper */
  UNSAFE_className?: string;
}

/**
 * Highlight — a contextual callout anchored to a UI element.
 *
 * Use it to draw attention to interactive controls, guide users through
 * onboarding flows, or confirm contextual information (e.g. location).
 *
 * The leading `icon` bounces on a loop to attract attention.
 * The callout has an entrance animation and supports 12 nubbin positions.
 *
 * @example
 * ```tsx
 * <Highlight
 *   message="Is this the right location?"
 *   position="bottom-start"
 *   actionLabel="Update"
 *   onAction={() => openGIC()}
 *   onClose={() => dismiss()}
 *   icon={<img src="/pin.svg" alt="" />}
 * >
 *   <GICButton />
 * </Highlight>
 * ```
 */
export const Highlight = React.forwardRef<HTMLDivElement, HighlightProps>(
  (
    {
      children,
      message,
      position = 'bottom',
      icon,
      actionLabel,
      onAction,
      onClose,
      open: controlledOpen,
      defaultOpen = true,
      UNSAFE_className,
    },
    ref,
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const handleClose = () => {
      if (!isControlled) setInternalOpen(false);
      onClose?.();
    };

    const handleAction = () => {
      onAction?.();
    };

    const wrapperClass = [styles.wrapper, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    const calloutClass = [
      styles.callout,
      styles[`callout--${position}`],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={wrapperClass}>
        {children}

        {isOpen && (
          <div className={calloutClass} role="status" aria-live="polite">
            {/* Nubbin / arrow */}
            <span className={styles.nubbin} aria-hidden="true" />

            {/* Leading icon with bounce animation */}
            {icon && (
              <span className={styles.icon} aria-hidden="true">
                {icon}
              </span>
            )}

            {/* Message */}
            <span className={styles.message}>{message}</span>

            {/* Optional action */}
            {actionLabel && (
              <button
                type="button"
                className={styles.action}
                onClick={handleAction}
              >
                {actionLabel}
              </button>
            )}

            {/* Close button */}
            <button
              type="button"
              className={styles.close}
              onClick={handleClose}
              aria-label="Dismiss"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 1L11 11M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  },
);

Highlight.displayName = 'Highlight';
