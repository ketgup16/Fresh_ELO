import * as React from 'react';
import { Checkbox, type CheckboxProps } from './Checkbox';
import styles from './LargeCheckbox.module.css';

/**
 * LargeCheckbox — a wrapper around the LD Checkbox that renders at 24×24px.
 *
 * Use for confirmation messages, terms acceptance, consent flows, or any
 * prominent single-checkbox interaction. The default Checkbox (small) is
 * for data tables, filters, and multi-select lists.
 *
 * @example
 * ```tsx
 * <LargeCheckbox
 *   label="I agree to the Terms of Service"
 *   checked={agreed}
 *   onCheckedChange={setAgreed}
 * />
 * ```
 */
export type LargeCheckboxProps = CheckboxProps;

export const LargeCheckbox = React.forwardRef<HTMLButtonElement, LargeCheckboxProps>(
  (props, ref) => {
    const combinedClassName = [styles.large, props.UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    return (
      <Checkbox
        ref={ref}
        {...props}
        UNSAFE_className={combinedClassName}
      />
    );
  },
);

LargeCheckbox.displayName = 'LargeCheckbox';
