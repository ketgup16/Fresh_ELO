import React from 'react';
import { Placeholder } from '@/components/icons/Placeholder';
import { ArrowRight } from '@/components/icons/ArrowRight';
import styles from './AXAttribute.module.css';

export type AXAttributeSize = 'small' | 'large';

/**
 * Both sizes support 5 color variants: default, brand, negative, inverse, highlight.
 */
export type AXAttributeColor = 'default' | 'brand' | 'negative' | 'inverse' | 'highlight';

export interface AXAttributeProps {
  /** Display label — required. */
  label: string;
  /** Size of the attribute. Affects icon size, gap, and text style. @default 'small' */
  size?: AXAttributeSize;
  /**
   * Color variant. 'success' is only available in Small.
   * @default 'default'
   */
  color?: AXAttributeColor;
  /**
   * Leading icon element. Defaults to the library Placeholder icon.
   * Designer can swap with any LD icon component.
   */
  icon?: React.ReactNode;
  /**
   * When true, renders an ArrowRight icon + "Label 2" to the left of the
   * original label, all separated by 4px space tokens.
   */
  additionalLabel?: boolean;
  /** Additional class name forwarded to the root element. */
  className?: string;
}

const ICON_SIZE: Record<AXAttributeSize, number> = {
  small: 16,
  large: 20,
};

export const AXAttribute: React.FC<AXAttributeProps> = ({
  label,
  size = 'small',
  color = 'default',
  icon,
  additionalLabel = false,
  className,
}) => {
  const iconSize = ICON_SIZE[size];

  const rootClass = [
    styles.attribute,
    styles[`attribute--${size}`],
    styles[`color--${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = [styles.label, styles[`label--${size}`]].join(' ');

  const resolvedIcon = icon ?? (
    <Placeholder width={iconSize} height={iconSize} aria-hidden="true" />
  );

  return (
    <span className={rootClass}>
      <span className={styles.icon}>{resolvedIcon}</span>
      {additionalLabel ? (
        <span className={styles.additionalContainer}>
          <ArrowRight width={16} height={16} aria-hidden="true" className={styles.additionalIcon} />
          <span className={labelClass}>Label 2</span>
          <span className={labelClass}>{label}</span>
        </span>
      ) : (
        <span className={labelClass}>{label}</span>
      )}
    </span>
  );
};
