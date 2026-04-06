import React from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { Tag } from '@/components/ui/Tag';
import { AXAttribute } from '@/components/walmart/AXAttribute';
import { Clock } from '@/components/icons/Clock';
import { Star } from '@/components/icons/Star';
import { ChevronRight } from '@/components/icons/ChevronRight';
import styles from './ListTeam.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListTeamVariant = 'navigational' | 'selectable';
export type ListTeamState = 'default' | 'pressed' | 'selected';

export type ListTeamIllustration =
  | 'apparel'
  | 'asset-protection'
  | 'auto-care-center'
  | 'deli-bakery'
  | 'digital'
  | 'entertainment'
  | 'food-consumables'
  | 'front-end'
  | 'fuel'
  | 'hardlines'
  | 'health-beauty'
  | 'home'
  | 'meat-produce'
  | 'pharmacy'
  | 'remodel'
  | 'salesfloor'
  | 'seasonal'
  | 'stocking-day'
  | 'stocking-overnight'
  | 'store'
  | 'vision'
  | 'placeholder'
  | 'saved-teams';

/**
 * Map of known team illustration names to their Builder.io CDN image URLs.
 * The apparel URL is confirmed from the Figma design.
 * For other team types, supply the `illustrationSrc` prop directly.
 */
export const TEAM_ILLUSTRATION_SRC: Record<ListTeamIllustration, string> = {
  apparel:
    'https://api.builder.io/api/v1/image/assets/TEMP/1dbefc0bf7597bc82e849aa172e61b08dbf901d4?width=80',
  'asset-protection': '',
  'auto-care-center': '',
  'deli-bakery': '',
  digital: '',
  entertainment: '',
  'food-consumables': '',
  'front-end': '',
  fuel: '',
  hardlines: '',
  'health-beauty': '',
  home: '',
  'meat-produce': '',
  pharmacy: '',
  remodel: '',
  salesfloor: '',
  seasonal: '',
  'stocking-day': '',
  'stocking-overnight': '',
  store: '',
  vision: '',
  placeholder: '',
  'saved-teams': '',
};

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ListTeamProps {
  /**
   * The variant controls the trailing element:
   * - `navigational` shows a ChevronRight icon
   * - `selectable` shows no trailing navigation element
   * @default 'navigational'
   */
  variant?: ListTeamVariant;

  /**
   * Visual interaction state.
   * `selected` is only valid for the `selectable` variant.
   * @default 'default'
   */
  state?: ListTeamState;

  /**
   * URL for the team department illustration (40×40 circular image).
   * Use `TEAM_ILLUSTRATION_SRC[illustration]` to get known URLs.
   */
  illustrationSrc?: string;

  /** Alt text for the illustration image. @default '' */
  illustrationAlt?: string;

  /** Primary team name / label. */
  title: string;

  /** Optional subtitle below the title. */
  subtitle?: string;

  /** Optional first attribute label (shown with Clock icon). */
  attribute1?: string;

  /** Optional second attribute label (shown with Clock icon). */
  attribute2?: string;

  /**
   * When provided, renders a tertiary-blue Tag in the trailing cluster.
   */
  tagLabel?: string;

  /** Accessible label for the star icon button. @default 'Save team' */
  starAriaLabel?: string;

  /** Callback for the star button press. */
  onStarPress?: () => void;

  /** Callback for the whole item press / click. */
  onPress?: () => void;

  /** Additional CSS class name forwarded to the root element. */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ListTeam: React.FC<ListTeamProps> = ({
  variant = 'navigational',
  state = 'default',
  illustrationSrc,
  illustrationAlt = '',
  title,
  subtitle,
  attribute1,
  attribute2,
  tagLabel,
  starAriaLabel = 'Save team',
  onStarPress,
  onPress,
  className,
}) => {
  const rootClass = [
    styles.item,
    styles[`item--${variant}`],
    state === 'pressed' && styles['item--pressed'],
    variant === 'selectable' && state === 'selected' && styles['item--selected'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      role={onPress ? 'button' : undefined}
      tabIndex={onPress ? 0 : undefined}
      onClick={onPress}
      onKeyDown={
        onPress
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
              }
            }
          : undefined
      }
    >
      {/* Leading illustration */}
      {illustrationSrc && (
        <img
          src={illustrationSrc}
          alt={illustrationAlt}
          className={styles.illustration}
          aria-hidden={illustrationAlt === '' ? true : undefined}
        />
      )}

      {/* Content area */}
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <span className={styles.title}>{title}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        {attribute1 && (
          <AXAttribute
            label={attribute1}
            size="small"
            icon={<Clock width={16} height={16} aria-hidden="true" />}
          />
        )}
        {attribute2 && (
          <AXAttribute
            label={attribute2}
            size="small"
            icon={<Clock width={16} height={16} aria-hidden="true" />}
          />
        )}
      </div>

      {/* Trailing cluster */}
      <div className={styles.trailing}>
        {tagLabel && (
          <Tag variant="tertiary" color="blue">
            {tagLabel}
          </Tag>
        )}
        <IconButton
          aria-label={starAriaLabel}
          variant="ghost"
          size="medium"
          onClick={
            onStarPress
              ? (e) => {
                  e.stopPropagation();
                  onStarPress();
                }
              : undefined
          }
        >
          <Star width={20} height={20} aria-hidden="true" />
        </IconButton>
        {variant === 'navigational' && (
          <span className={styles.chevron} aria-hidden="true">
            <ChevronRight width={20} height={20} />
          </span>
        )}
      </div>
    </div>
  );
};
