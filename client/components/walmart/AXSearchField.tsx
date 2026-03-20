import { useRef, useState, useCallback } from 'react';
import { Search, Microphone, Barcode, X } from '@/components/icons';
import styles from './AXSearchField.module.css';

export type AXSearchFieldState = 'enabled' | 'disabled' | 'readOnly';

interface AXSearchFieldProps {
  value?: string;
  placeholder?: string;
  state?: AXSearchFieldState;
  showMic?: boolean;
  showBarcode?: boolean;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onCancel?: () => void;
  onMicClick?: () => void;
  onBarcodeClick?: () => void;
  className?: string;
}

export function AXSearchField({
  value = '',
  placeholder = 'Search',
  state = 'enabled',
  showMic = true,
  showBarcode = true,
  onChange,
  onClear,
  onCancel,
  onMicClick,
  onBarcodeClick,
  className = '',
}: AXSearchFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'readOnly';
  const isFocused = focused && !isDisabled && !isReadOnly;
  const hasValue = value.length > 0;

  const handleContainerClick = useCallback(() => {
    if (!isDisabled && !isReadOnly) {
      inputRef.current?.focus();
    }
  }, [isDisabled, isReadOnly]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClear?.();
    inputRef.current?.focus();
  }, [onClear]);

  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.blur();
    onCancel?.();
  }, [onCancel]);

  const containerClass = [
    styles.container,
    isFocused ? styles.focused : '',
    isDisabled ? styles.disabled : '',
    isReadOnly ? styles.readOnly : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      <div
        className={containerClass}
        onClick={handleContainerClick}
        role={isReadOnly || isDisabled ? undefined : 'button'}
        tabIndex={isReadOnly || isDisabled ? -1 : undefined}
        aria-disabled={isDisabled}
      >
        <Search
          className={styles.leadingIcon}
          aria-hidden="true"
        />

        {isReadOnly || isDisabled ? (
          <span className={styles.readOnlyText}>
            {hasValue ? value : placeholder}
          </span>
        ) : (
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label={placeholder}
          />
        )}

        <div className={styles.trailing}>
          {/* When focused: show clear button (if has value) + cancel */}
          {isFocused ? (
            <>
              {hasValue && (
                <button
                  className={styles.iconBtn}
                  onClick={handleClear}
                  aria-label="Clear search"
                  type="button"
                >
                  <X className={styles.trailingIcon} />
                </button>
              )}
              <button
                className={styles.cancelBtn}
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
            </>
          ) : hasValue ? (
            /* Enabled filled (not focused): X only */
            <button
              className={styles.iconBtn}
              onClick={handleClear}
              aria-label="Clear search"
              type="button"
            >
              <X className={styles.trailingIcon} />
            </button>
          ) : !isDisabled && !isReadOnly ? (
            /* Enabled unfilled: mic + barcode */
            <>
              {showMic && (
                <button
                  className={styles.iconBtn}
                  onClick={(e) => { e.stopPropagation(); onMicClick?.(); }}
                  aria-label="Search by voice"
                  type="button"
                >
                  <Microphone className={styles.trailingIcon} />
                </button>
              )}
              {showBarcode && (
                <button
                  className={styles.iconBtn}
                  onClick={(e) => { e.stopPropagation(); onBarcodeClick?.(); }}
                  aria-label="Scan barcode"
                  type="button"
                >
                  <Barcode className={styles.trailingIcon} />
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
