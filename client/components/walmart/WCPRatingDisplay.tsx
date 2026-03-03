import React from 'react';
import { Rating } from '@/components/ui/Rating';
import styles from './WCPRatingDisplay.module.css';

export type WCPRatingDisplaySize = 'small' | 'medium';
export type WCPRatingDisplayColor = 'default' | 'inverse';

export interface WCPRatingDisplayProps {
  /**
   * Aggregate rating value (0–5). Supports whole numbers and 0.5 increments.
   * @default 0
   */
  value?: number;
  /**
   * Size variant.
   * small  → 12px stars + caption text (12px)
   * medium → 20px stars + body text (16px)
   * @default 'small'
   */
  size?: WCPRatingDisplaySize;
  /**
   * Color scheme.
   * default → gold stars on light background
   * inverse → white stars on dark background
   * @default 'default'
   */
  color?: WCPRatingDisplayColor;
  /**
   * The aggregate count label shown next to the stars, e.g. "(1.5)" or "(4,281)".
   * When omitted the count is not rendered.
   */
  count?: string;
  /**
   * Text for the clickable link in the content pattern (e.g. "2,341 reviews").
   * When omitted the link is not rendered.
   */
  linkText?: string;
  /**
   * href for the link. If not provided the link renders as a button-style anchor.
   */
  linkHref?: string;
  /** Called when the link is clicked. */
  onLinkClick?: (e: React.MouseEvent) => void;
  /**
   * Optional secondary text string shown after the pipe separator.
   * When omitted the pipe and text are not rendered.
   */
  text?: string;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Accessible label for the star region. */
  'aria-label'?: string;
}

/**
 * WCPRatingDisplay — Non-interactive (read-only) aggregate rating component.
 *
 * Designed for use inside item tiles and review sections. Renders 5 stars
 * reflecting the aggregate rating value, plus an optional content pattern
 * consisting of a count, a link, a pipe separator, and a trailing text string.
 *
 * Supports two sizes (small / medium) and two color schemes (default / inverse).
 *
 * @example
 * ```tsx
 * // Item tile (small, default)
 * <WCPRatingDisplay value={4.5} size="small" count="(4.5)" linkText="2,341 reviews" text="Best seller" />
 *
 * // Review section (medium, default)
 * <WCPRatingDisplay value={3} size="medium" count="(3.0)" linkText="821 reviews" />
 *
 * // On a dark/coloured background (inverse)
 * <WCPRatingDisplay value={4} size="small" color="inverse" count="(4.0)" linkText="Reviews" />
 * ```
 */
export const WCPRatingDisplay: React.FC<WCPRatingDisplayProps> = ({
  value = 0,
  size = 'small',
  color = 'default',
  count,
  linkText,
  linkHref,
  onLinkClick,
  text,
  className = '',
  'aria-label': ariaLabel,
}) => {
  // Map WCP size → LD Rating size: small→small (12px), medium→large (20px)
  const starSize = size === 'medium' ? 'large' : 'small';
  const isInverse = color === 'inverse';

  const wrapperClass = [
    styles.wrapper,
    styles[`wrapper--${size}`],
    isInverse && styles['wrapper--inverse'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasContent = count || linkText || text;

  return (
    <div className={wrapperClass}>
      {/* Star region */}
      <Rating
        value={value}
        size={starSize}
        className={isInverse ? styles.starsInverse : ''}
        aria-label={ariaLabel || `Rating: ${value} out of 5 stars`}
      />

      {/* Content pattern: count · link · | · text */}
      {hasContent && (
        <div className={styles.content}>
          {/* Left group: count + link */}
          {(count || linkText) && (
            <span className={styles.leftGroup}>
              {count && <span className={styles.count}>{count}</span>}
              {linkText && (
                <a
                  href={linkHref ?? '#'}
                  className={styles.link}
                  onClick={onLinkClick}
                  aria-label={linkText}
                >
                  {linkText}
                </a>
              )}
            </span>
          )}

          {/* Pipe separator — only shown when both left-group and text exist */}
          {(count || linkText) && text && (
            <span className={styles.pipe} aria-hidden="true">|</span>
          )}

          {/* Trailing text */}
          {text && <span className={styles.text}>{text}</span>}
        </div>
      )}
    </div>
  );
};
