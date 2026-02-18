import * as React from 'react';
import { createPortal } from 'react-dom';
import styles from './BottomSheet.module.css';
import { IconButton } from './IconButton';
import { Divider } from './Divider';
import { Scrim } from './Scrim';

export type BottomSheetCloseEvent =
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | KeyboardEvent
  | MouseEvent
  | PointerEvent
  | TouchEvent;

export interface BottomSheetCloseButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'className' | 'style' | 'aria-label' | 'children' | 'disabled' | 'type'
  > {
  'aria-label'?: string;
}

export interface BottomSheetProps {
  /**
   * Main content of the bottom sheet
   */
  children: React.ReactNode;

  /**
   * Title displayed in the header
   */
  title?: React.ReactNode;

  /**
   * Optional action buttons (typically ButtonGroup)
   */
  actions?: React.ReactNode;

  /**
   * Controls visibility of the bottom sheet
   * @default false
   */
  isOpen?: boolean;

  /**
   * Callback when sheet should close
   */
  onClose: (event: BottomSheetCloseEvent) => void;

  /**
   * Callback after close transition completes
   */
  onClosed?: () => void;

  /**
   * Accessibility label when title is not provided
   */
  a11yLabel?: string;

  /**
   * Props for the close button
   */
  closeButtonProps?: BottomSheetCloseButtonProps;

  /**
   * Custom z-index for the overlay
   */
  zIndex?: number;

  /**
   * Escape hatch for additional CSS classes
   */
  UNSAFE_className?: string;
}

/**
 * BottomSheet component for Living Design 3.5
 *
 * A mobile-friendly modal component that slides up from the bottom of the screen
 * to display supplementary content without leaving the current context.
 *
 * @example
 * ```tsx
 * <BottomSheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Settings"
 *   actions={
 *     <ButtonGroup>
 *       <Button variant="secondary" onClick={() => setIsOpen(false)}>
 *         Cancel
 *       </Button>
 *       <Button variant="primary">Save</Button>
 *     </ButtonGroup>
 *   }
 * >
 *   <p>Sheet content here</p>
 * </BottomSheet>
 * ```
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  (props, ref) => {
    const {
      children,
      title,
      actions,
      isOpen = false,
      onClose,
      onClosed,
      a11yLabel,
      closeButtonProps,
      zIndex = 1000,
      UNSAFE_className,
    } = props;

    const [isVisible, setIsVisible] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);
    const sheetRef = React.useRef<HTMLDivElement>(null);
    const titleId = React.useId();

    // Sync visibility state with isOpen prop
    React.useEffect(() => {
      if (isOpen) {
        setIsMounted(true);
        // Use RAF to ensure DOM is ready before animating
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      } else if (isVisible) {
        setIsClosing(true);
        setIsVisible(false);
        // Wait for animation to complete before unmounting
        const timer = setTimeout(() => {
          setIsMounted(false);
          setIsClosing(false);
          onClosed?.();
        }, 300); // Match CSS transition duration
        return () => clearTimeout(timer);
      }
    }, [isOpen, isVisible, onClosed]);

    // Lock body scroll when open
    React.useEffect(() => {
      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        
        return () => {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        };
      }
    }, [isOpen]);

    // Handle ESC key
    React.useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose(event);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose(event as any);
      }
    };

    // Handle close button click
    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClose(event);
    };

    if (!isMounted) {
      return null;
    }

    const content = (
      <div
        className={styles.bottomSheetOverlay}
        style={{ zIndex }}
        onClick={handleBackdropClick}
      >
        <Scrim isOpen={isVisible} isClosing={isClosing} />
        <div
          ref={ref || sheetRef}
          className={[
            styles.bottomSheet,
            isVisible && !isClosing ? styles['bottomSheet--open'] : '',
            isClosing ? styles['bottomSheet--closing'] : '',
            UNSAFE_className,
          ]
            .filter(Boolean)
            .join(' ')}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-label={!title ? a11yLabel : undefined}
        >
          {/* Header */}
          <div className={styles.bottomSheet__header}>
            <div className={styles.bottomSheet__titleContainer}>
              <div className={styles.bottomSheet__titleFrame}>
                {title && (
                  <h2 id={titleId} className={styles.bottomSheet__title}>
                    {title}
                  </h2>
                )}
              </div>
              <IconButton
                aria-label={closeButtonProps?.['aria-label'] || 'Close dialog'}
                variant="ghost"
                size="medium"
                shape="rounded"
                onClick={handleCloseClick}
                {...closeButtonProps}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M11.7803 13.0787L18 19.2983L19.0607 18.2377L12.841 12.018L19.0607 5.79833L18 4.73767L11.7803 10.9573L5.56066 4.73767L4.5 5.79833L10.7197 12.018L4.5 18.2377L5.56066 19.2983L11.7803 13.0787Z"
                    fill="currentColor"
                  />
                </svg>
              </IconButton>
            </div>
          </div>

          {/* Content */}
          <div className={styles.bottomSheet__content}>{children}</div>

          {/* Actions */}
          {actions && (
            <div className={styles.bottomSheet__actions}>
              <Divider decorative />
              <div className={styles.bottomSheet__actionsContainer}>
                {actions}
              </div>
            </div>
          )}
        </div>
      </div>
    );

    // Portal to body
    if (typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return null;
  }
);

BottomSheet.displayName = 'BottomSheet';
