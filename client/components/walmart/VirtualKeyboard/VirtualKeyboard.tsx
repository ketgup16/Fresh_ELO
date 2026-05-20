import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './VirtualKeyboard.module.css';

type Layout = 'alpha' | 'numeric';
type ShiftMode = 'off' | 'once' | 'caps';

const ALPHA_ROWS: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACKSPACE'],
  ['NUMBERS', 'SPACE', 'DONE'],
];

const NUMERIC_ROWS: string[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'BACKSPACE'],
  ['ALPHA', 'DONE'],
];

function setNativeInputValue(
  el: HTMLInputElement | HTMLTextAreaElement,
  value: string,
) {
  const proto =
    el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
  if (setter) {
    setter.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

export const VirtualKeyboard: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState<Layout>('alpha');
  const [shiftMode, setShiftMode] = useState<ShiftMode>('once');
  const activeEl = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const keyboardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        (target instanceof HTMLInputElement &&
          !target.readOnly &&
          !target.disabled &&
          target.type !== 'checkbox' &&
          target.type !== 'radio' &&
          target.type !== 'range') ||
        (target instanceof HTMLTextAreaElement &&
          !target.readOnly &&
          !target.disabled)
      ) {
        activeEl.current = target as HTMLInputElement | HTMLTextAreaElement;
        const inputMode = target.getAttribute('inputmode') ?? '';
        if (
          inputMode === 'tel' ||
          inputMode === 'numeric' ||
          inputMode === 'decimal'
        ) {
          setLayout('numeric');
        } else {
          setLayout('alpha');
          // Auto-capitalize first character
          if (target.value.length === 0) setShiftMode('once');
        }
        setVisible(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      // Stay visible if focus moved into the keyboard itself
      if (related && keyboardRef.current?.contains(related)) return;
      // Stay visible if focus moved to another input (focusin will re-trigger)
      if (
        related instanceof HTMLInputElement ||
        related instanceof HTMLTextAreaElement
      )
        return;
      setVisible(false);
      activeEl.current = null;
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const pressKey = useCallback(
    (key: string) => {
      const el = activeEl.current;
      if (!el) return;

      // Re-focus without scrolling (keyboard handles focus context)
      el.focus({ preventScroll: true });

      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;

      if (key === 'BACKSPACE') {
        let newValue: string;
        let cursor: number;
        if (start !== end) {
          newValue = el.value.slice(0, start) + el.value.slice(end);
          cursor = start;
        } else if (start > 0) {
          newValue = el.value.slice(0, start - 1) + el.value.slice(start);
          cursor = start - 1;
        } else {
          return;
        }
        setNativeInputValue(el, newValue);
        requestAnimationFrame(() => el.setSelectionRange(cursor, cursor));
      } else if (key === 'SPACE') {
        const newValue = el.value.slice(0, start) + ' ' + el.value.slice(end);
        setNativeInputValue(el, newValue);
        const cursor = start + 1;
        requestAnimationFrame(() => el.setSelectionRange(cursor, cursor));
        // After a space in a name field, next char should be capitalized
        if (layout === 'alpha' && shiftMode === 'off') setShiftMode('once');
      } else if (key === 'DONE') {
        el.blur();
        setVisible(false);
      } else if (key === 'SHIFT') {
        setShiftMode(prev =>
          prev === 'off' ? 'once' : prev === 'once' ? 'caps' : 'off',
        );
      } else if (key === 'NUMBERS') {
        setLayout('numeric');
      } else if (key === 'ALPHA') {
        setLayout('alpha');
      } else {
        let char = key;
        if (layout === 'alpha' && shiftMode !== 'off') {
          char = key.toUpperCase();
          if (shiftMode === 'once') setShiftMode('off');
        }
        const newValue = el.value.slice(0, start) + char + el.value.slice(end);
        setNativeInputValue(el, newValue);
        const cursor = start + char.length;
        requestAnimationFrame(() => el.setSelectionRange(cursor, cursor));
      }
    },
    [layout, shiftMode],
  );

  if (!visible) return null;

  const rows = layout === 'alpha' ? ALPHA_ROWS : NUMERIC_ROWS;
  const isShifted = shiftMode !== 'off';

  const getLabel = (key: string): string => {
    switch (key) {
      case 'SHIFT':
        return shiftMode === 'caps' ? '⇪' : '⇧';
      case 'BACKSPACE':
        return '⌫';
      case 'SPACE':
        return 'Space';
      case 'DONE':
        return 'Done';
      case 'NUMBERS':
        return '123';
      case 'ALPHA':
        return 'ABC';
      default:
        return layout === 'alpha' && isShifted ? key.toUpperCase() : key;
    }
  };

  const getClassName = (key: string): string => {
    return [
      styles.key,
      ['SHIFT', 'BACKSPACE', 'NUMBERS', 'ALPHA'].includes(key) && styles.keyAction,
      key === 'SPACE' && styles.keySpace,
      key === 'DONE' && styles.keyDone,
      key === 'BACKSPACE' && styles.keyBackspace,
      key === 'SHIFT' && isShifted && styles.keyShiftActive,
      key === 'SHIFT' && shiftMode === 'caps' && styles.keyCapsLock,
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div ref={keyboardRef} className={styles.keyboard} data-virtual-keyboard="true">
      <div className={styles.inner}>
        {rows.map((row, ri) => (
          <div key={ri} className={[styles.row, layout === 'numeric' && styles.rowNumeric].filter(Boolean).join(' ')}>
            {row.map(key => (
              <button
                key={key}
                type="button"
                className={getClassName(key)}
                tabIndex={-1}
                aria-label={
                  key === 'BACKSPACE'
                    ? 'Backspace'
                    : key === 'SHIFT'
                      ? 'Shift'
                      : key === 'DONE'
                        ? 'Done'
                        : undefined
                }
                onPointerDown={e => {
                  e.preventDefault(); // critical: prevents input blur
                  pressKey(key);
                }}
              >
                {getLabel(key)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
