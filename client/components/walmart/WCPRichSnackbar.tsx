import React, { useEffect, useRef } from 'react';
import styles from './WCPRichSnackbar.module.css';

export type WCPRichSnackbarColor = 'primary' | 'secondary' | 'inverse' | 'brand';
export type WCPRichSnackbarContentVariant =
  | 'left-regular'
  | 'left-bold'
  | 'center-regular'
  | 'center-bold';

export interface WCPRichSnackbarProps {
  id?: string;
  open?: boolean;
  color?: WCPRichSnackbarColor;
  contentVariant?: WCPRichSnackbarContentVariant;
  leadingSlot?: React.ReactNode;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  /** Render inline (non-fixed) for use inside docs/demo cards */
  static?: boolean;
}

const POSITION_CLASS: Record<string, string> = {
  'bottom-left': styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
  'bottom-right': styles.bottomRight,
};

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M7.85355 8.71911L12 12.8656L12.7071 12.1584L8.56066 8.012L12.7071 3.86555L12 3.15845L7.85355 7.30489L3.70711 3.15845L3 3.86555L7.14645 8.012L3 12.1584L3.70711 12.8656L7.85355 8.71911Z"
      fill="currentColor"
    />
  </svg>
);

export const WCPRichSnackbar: React.FC<WCPRichSnackbarProps> = ({
  id,
  open = true,
  color = 'primary',
  contentVariant = 'left-regular',
  leadingSlot,
  message,
  actionLabel,
  onAction,
  onClose,
  duration = 4000,
  position = 'bottom-center',
  static: isStatic = false,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-dismiss
  useEffect(() => {
    if (open && duration !== Infinity && onClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open, duration, onClose]);

  if (!open && !isStatic) return null;

  const isDark = color === 'inverse' || color === 'brand';
  const isBold = contentVariant === 'left-bold' || contentVariant === 'center-bold';
  const isCenter = contentVariant === 'center-regular' || contentVariant === 'center-bold';

  const handleActionClick = () => {
    onAction?.();
    onClose?.();
  };

  const snackbarClass = [
    styles.snackbar,
    styles[color],
    isStatic ? styles.staticMode : (POSITION_CLASS[position] ?? styles.bottomCenter),
    open || isStatic ? styles.open : '',
  ]
    .filter(Boolean)
    .join(' ');

  const copyClass = [styles.copy, isCenter ? styles.copyCenter : '']
    .filter(Boolean)
    .join(' ');

  const messageClass = [styles.message, isBold ? styles.messageBold : '']
    .filter(Boolean)
    .join(' ');

  const closeBtnClass = [styles.closeBtn, isDark ? styles.closeBtnWhite : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      className={snackbarClass}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Leading + Message */}
      <div className={copyClass}>
        {leadingSlot && <div className={styles.leading}>{leadingSlot}</div>}
        <div className={messageClass}>{message}</div>
      </div>

      {/* Trailing: action + close */}
      {(actionLabel || onClose) && (
        <div className={styles.trailing}>
          <div className={styles.trailingActions}>
            {actionLabel && (
              <div className={styles.actionWrapper}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={handleActionClick}
                >
                  {actionLabel}
                </button>
              </div>
            )}
            {onClose && (
              <div className={styles.closeWrapper}>
                <button
                  type="button"
                  className={closeBtnClass}
                  onClick={onClose}
                  aria-label="Close notification"
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WCPRichSnackbar;
