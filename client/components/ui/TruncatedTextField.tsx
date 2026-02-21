import * as React from 'react';
import { TextField, type TextFieldProps } from './TextField';
import styles from './TruncatedTextField.module.css';

/**
 * TruncatedTextField — a wrapper around the LD TextField that truncates
 * overflowing text with an ellipsis instead of scrolling.
 *
 * Useful for single-line fields where the value may exceed the visible width
 * and you want a clean ellipsis instead of horizontal scrolling.
 *
 * @example
 * ```tsx
 * <TruncatedTextField
 *   label="Email"
 *   value={longEmail}
 *   onChange={handleChange}
 * />
 * ```
 */
export type TruncatedTextFieldProps = TextFieldProps;

export const TruncatedTextField = React.forwardRef<HTMLInputElement, TruncatedTextFieldProps>(
  (props, ref) => {
    const combinedClassName = [styles.truncated, props.UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    return (
      <TextField
        ref={ref}
        {...props}
        UNSAFE_className={combinedClassName}
      />
    );
  },
);

TruncatedTextField.displayName = 'TruncatedTextField';
