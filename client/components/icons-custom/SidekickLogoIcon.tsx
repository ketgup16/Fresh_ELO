import * as React from 'react';

export interface SidekickLogoIconProps {
  /** Icon size. "small" = 16px (default), "medium" = 24px */
  size?: 'small' | 'medium';
  /** Accessible label for the image */
  alt?: string;
  className?: string;
}

/**
 * Sidekick logo icon — the AI assistant brand mark used in Intelligent Insight
 * and other Sidekick-branded surfaces.
 *
 * Rendered as a local PNG asset (16×16 source) scaled via CSS.
 *
 * @example
 * <SidekickLogoIcon size="small" />
 * <SidekickLogoIcon size="medium" alt="Sidekick AI" />
 */
export function SidekickLogoIcon({
  size = 'small',
  alt = 'Sidekick',
  className,
}: SidekickLogoIconProps) {
  const px = size === 'medium' ? 24 : 16;
  return (
    <img
      src="/assets/sidekick-logo.png"
      alt={alt}
      width={px}
      height={px}
      className={className}
      aria-hidden={alt === '' ? true : undefined}
      style={{ display: 'block', width: px, height: px }}
    />
  );
}
