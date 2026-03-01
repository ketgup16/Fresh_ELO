import React, { useRef, useCallback } from 'react';
import { RotateCcw } from '@/components/icons/RotateCcw';
import styles from './TokenColorRow.module.css';

interface TokenColorRowProps {
  /** CSS custom property name, e.g. "--ld-semantic-color-action-fill-primary" */
  token: string;
  /** Human-readable label shown to users */
  label: string;
  /** Whether this token has been overridden */
  isOverridden: boolean;
  /** Called when user picks a new color */
  onSet: (token: string, value: string) => void;
  /** Called when user resets to theme default */
  onReset: (token: string) => void;
  /** Read the current live resolved value for this token */
  getCurrentValue: (token: string) => string;
}

/**
 * A single editable token row: color swatch + hex field + label + reset button.
 * Reads the live computed value via getComputedStyle so it always reflects
 * the current theme cascade (before AND after edits).
 */
export function TokenColorRow({
  token,
  label,
  isOverridden,
  onSet,
  onReset,
  getCurrentValue,
}: TokenColorRowProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Resolve the current live value each render
  const currentValue = getCurrentValue(token);

  // Normalize to hex if possible (computed values may be `rgb(...)`)
  const hexValue = normalizeToHex(currentValue);

  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSet(token, e.target.value);
  }, [token, onSet]);

  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      onSet(token, val);
    }
  }, [token, onSet]);

  const handleHexKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = (e.target as HTMLInputElement).value.trim();
      const withHash = val.startsWith('#') ? val : `#${val}`;
      if (/^#[0-9a-fA-F]{6}$/.test(withHash)) {
        onSet(token, withHash);
      }
    }
  }, [token, onSet]);

  const handleSwatchClick = useCallback(() => {
    colorInputRef.current?.click();
  }, []);

  const handleReset = useCallback(() => {
    onReset(token);
  }, [token, onReset]);

  return (
    <div className={`${styles.row} ${isOverridden ? styles.overridden : ''}`}>
      {/* Color swatch — clicking opens native color picker */}
      <button
        type="button"
        className={styles.swatch}
        onClick={handleSwatchClick}
        style={{ backgroundColor: hexValue || currentValue || 'transparent' }}
        aria-label={`Change color for ${label}`}
        title={`Change color for ${label}`}
      />
      {/* Hidden native color input */}
      <input
        ref={colorInputRef}
        type="color"
        className={styles.hiddenColorInput}
        value={hexValue || '#000000'}
        onChange={handleColorChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Token label + monospace name */}
      <div className={styles.labelGroup}>
        <span className={styles.label}>{label}</span>
        <span className={styles.tokenName}>{token}</span>
      </div>

      {/* Hex text field */}
      <input
        type="text"
        className={styles.hexInput}
        defaultValue={hexValue || currentValue}
        key={hexValue || currentValue}
        onBlur={handleHexChange}
        onKeyDown={handleHexKeyDown}
        maxLength={7}
        aria-label={`Hex value for ${label}`}
        spellCheck={false}
      />

      {/* Reset button — only shown when there's an override */}
      <button
        type="button"
        className={`${styles.resetBtn} ${isOverridden ? styles.resetBtnVisible : ''}`}
        onClick={handleReset}
        aria-label={`Reset ${label} to theme default`}
        title="Reset to theme default"
        tabIndex={isOverridden ? 0 : -1}
      >
        <RotateCcw width={14} height={14} />
      </button>
    </div>
  );
}

/**
 * Attempt to convert a CSS color value to a 6-digit hex string.
 * Handles `rgb(r, g, b)` and already-hex values.
 * Returns empty string if conversion fails.
 */
function normalizeToHex(value: string): string {
  if (!value) return '';

  const trimmed = value.trim();

  // Already a valid hex
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/)!;
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  return '';
}
