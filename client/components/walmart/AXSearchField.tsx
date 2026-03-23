import * as React from 'react';
import { Microphone, Barcode } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import styles from './AXSearchField.module.css';

export interface AXSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onCancel?: () => void;
  /** Show microphone icon button in unfilled, resting state. @default true */
  showMic?: boolean;
  /** Show barcode icon button in unfilled, resting state. @default true */
  showBarcode?: boolean;
  onMicClick?: () => void;
  onBarcodeClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AXSearchField({
  value,
  onChange,
  onClear,
  onCancel,
  showMic = true,
  showBarcode = true,
  onMicClick,
  onBarcodeClick,
  placeholder = 'Enter search term(s)',
  disabled = false,
  className,
}: AXSearchFieldProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isActivated = isFocused;
  const hasValue = value.length > 0;

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  const handleCancel = () => {
    onChange('');
    onCancel?.();
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handlePillClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  // Trailing slot: X when filled, mic+barcode when resting/empty
  const trailingSlot = (() => {
    if (hasValue && !disabled) {
      return (
        <button
          type="button"
          className={styles.clearBtn}
          onMouseDown={e => e.preventDefault()}
          onClick={e => { e.stopPropagation(); handleClear(); }}
          aria-label="Clear search"
          tabIndex={0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M11.7803 13.0788L18 19.2985L19.0607 18.2378L12.841 12.0181L19.0607 5.79845L18 4.73779L11.7803 10.9575L5.56066 4.73779L4.5 5.79845L10.7197 12.0181L4.5 18.2378L5.56066 19.2985L11.7803 13.0788Z" fill="currentColor" />
          </svg>
        </button>
      );
    }
    if (!hasValue && !isActivated && !disabled && (showMic || showBarcode)) {
      return (
        <div className={styles.trailingIcons}>
          {showMic && (
            <IconButton
              variant="ghost"
              size="medium"
              aria-label="Search by voice"
              onClick={e => { e.stopPropagation(); onMicClick?.(); }}
            >
              <Microphone />
            </IconButton>
          )}
          {showBarcode && (
            <IconButton
              variant="ghost"
              size="medium"
              aria-label="Scan barcode"
              onClick={e => { e.stopPropagation(); onBarcodeClick?.(); }}
            >
              <Barcode />
            </IconButton>
          )}
        </div>
      );
    }
    return null;
  })();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div
        className={[
          styles.pill,
          isActivated ? styles.pillActivated : '',
          disabled ? styles.pillDisabled : '',
        ].filter(Boolean).join(' ')}
        onClick={handlePillClick}
      >
        {/* Search icon */}
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.searchIcon}>
            <path d="M15.2465 16.3073C13.9536 17.3652 12.3009 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.301 17.3652 13.9537 16.3072 15.2466L21.5303 20.4697L20.4696 21.5304L15.2465 16.3073ZM16.5 10.5C16.5 7.18629 13.8137 4.5 10.5 4.5C7.18629 4.5 4.5 7.18629 4.5 10.5C4.5 13.8137 7.18629 16.5 10.5 16.5C13.8137 16.5 16.5 13.8137 16.5 10.5Z" fill="currentColor" />
          </svg>
        </div>

        {/* Input area */}
        <div className={styles.inputArea}>
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isActivated ? placeholder : ''}
            disabled={disabled}
            aria-label={placeholder}
            autoComplete="off"
          />
          {!isActivated && !hasValue && (
            <span className={styles.placeholder} aria-hidden="true">
              {placeholder}
            </span>
          )}
        </div>

        {/* Trailing slot */}
        {trailingSlot}
      </div>

      {/* Cancel link — only when activated and not disabled */}
      {isActivated && !disabled && (
        <button
          type="button"
          className={styles.cancelBtn}
          onMouseDown={e => {
            e.preventDefault();
            handleCancel();
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
