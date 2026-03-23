import { useRef, useState, useCallback } from 'react';
import { Search, Microphone, Barcode, X } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import styles from './AXSearchBar.module.css';

export type AXSearchBarState = 'enabled' | 'disabled' | 'readOnly';

interface AXSearchBarProps {
  value?: string;
  placeholder?: string;
  state?: AXSearchBarState;
  showMic?: boolean;
  showBarcode?: boolean;
  /** Force focused appearance regardless of actual browser focus (for demos/docs). */
  simulateFocused?: boolean;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onCancel?: () => void;
  onMicClick?: () => void;
  onBarcodeClick?: () => void;
  className?: string;
}

export function AXSearchBar({
  value = '',
  placeholder = 'Search',
  state = 'enabled',
  showMic = true,
  showBarcode = true,
  simulateFocused = false,
  onChange,
  onClear,
  onCancel,
  onMicClick,
  onBarcodeClick,
  className = '',
}: AXSearchBarProps) {
  const [focused, setFocused] = useState(false);
  const valueOnFocus = useRef<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'readOnly';
  const isFocused = (focused || simulateFocused) && !isDisabled && !isReadOnly;
  const hasValue = value.length > 0;

  const handleContainerClick = useCallback(() => {
    if (!isDisabled && !isReadOnly) {
      inputRef.current?.focus();
    }
  }, [isDisabled, isReadOnly]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
    onClear?.();
    // Do NOT re-focus here — doing so fires onFocus which would overwrite valueOnFocus
    // with the stale pre-clear value, corrupting Cancel revert behaviour.
  }, [onChange, onClear]);

  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Revert to the value captured when the field was activated
    onChange?.(valueOnFocus.current);
    inputRef.current?.blur();
    onCancel?.();
  }, [onChange, onCancel]);

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
            onFocus={() => { valueOnFocus.current = value; setFocused(true); }}
            onBlur={() => setFocused(false)}
            aria-label={placeholder}
          />
        )}

        <div className={styles.trailing}>
          {hasValue && !isDisabled && !isReadOnly ? (
            /* Single stable X button — present whenever value exists and field is editable.
               Keeping it in one JSX branch prevents blur-before-click from unmounting
               the node mid-interaction and swallowing the click event. */
            <IconButton
              variant="ghost"
              size="medium"
              onMouseDown={(e) => e.preventDefault()} // keep input focused so click always lands
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X />
            </IconButton>
          ) : !isFocused && !isDisabled && !isReadOnly ? (
            /* Enabled unfilled: mic + barcode */
            <>
              {showMic && (
                <IconButton
                  variant="ghost"
                  size="medium"
                  onClick={(e) => { e.stopPropagation(); onMicClick?.(); }}
                  aria-label="Search by voice"
                >
                  <Microphone />
                </IconButton>
              )}
              {showBarcode && (
                <IconButton
                  variant="ghost"
                  size="medium"
                  onClick={(e) => { e.stopPropagation(); onBarcodeClick?.(); }}
                  aria-label="Scan barcode"
                >
                  <Barcode />
                </IconButton>
              )}
            </>
          ) : null}
        </div>
      </div>

      {/* Cancel sits OUTSIDE the field container, per Figma */}
      {isFocused && (
        <button
          className={styles.cancelBtn}
          onMouseDown={(e) => e.preventDefault()} // prevent input blur before click fires
          onClick={handleCancel}
          type="button"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
