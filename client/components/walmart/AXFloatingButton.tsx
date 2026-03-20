/**
 * @deprecated Use `<IconButton floating>` from `@/components/ui/IconButton` instead.
 * The `floating` prop applies the same elevated circular style.
 *
 * Migration:
 *   Before: <AXFloatingButton size="medium" aria-label="Next"><ArrowRight /></AXFloatingButton>
 *   After:  <IconButton floating size="medium" aria-label="Next"><ArrowRight /></IconButton>
 *
 * Note: AXFloatingButton sizes map to IconButton sizes as follows:
 *   xsmall → small, small → small, medium → medium, large → large
 */
import React from 'react';
import { IconButton, type IconButtonButtonProps } from '@/components/ui/IconButton';

export type AXFloatingButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

export interface AXFloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  children: React.ReactNode;
  size?: AXFloatingButtonSize;
  'aria-label': string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/**
 * @deprecated Use `<IconButton floating>` instead.
 */
export function AXFloatingButton({
  children,
  size = 'medium',
  'aria-label': ariaLabel,
  UNSAFE_className,
  UNSAFE_style,
  ...rest
}: AXFloatingButtonProps) {
  // xsmall and small both map to IconButton's small size
  const iconButtonSize = size === 'large' ? 'large' : size === 'medium' ? 'medium' : 'small';

  return (
    <IconButton
      floating
      size={iconButtonSize}
      aria-label={ariaLabel}
      UNSAFE_className={UNSAFE_className}
      UNSAFE_style={UNSAFE_style}
      {...(rest as Omit<IconButtonButtonProps, 'aria-label' | 'size' | 'children'>)}
    >
      {children}
    </IconButton>
  );
}
