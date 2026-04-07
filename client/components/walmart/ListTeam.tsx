import React from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { Tag } from '@/components/ui/Tag';
import { AXAttribute } from '@/components/walmart/AXAttribute';
import { Clock } from '@/components/icons/Clock';
import { Star } from '@/components/icons/Star';
import { StarFill } from '@/components/icons/StarFill';
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
 * Consolidated illustration data — single source of truth.
 * `label` is the exact purple annotation text from the Figma design.
 * `src` is the Builder.io CDN image URL (only confirmed for apparel from Figma).
 */
export const TEAM_ILLUSTRATIONS: Record<
  ListTeamIllustration,
  { src: string; label: string }
> = {
  apparel: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F81093f7476624887a94b9a3813f20e8d?format=webp&width=160',
    label: 'Apparel',
  },
  'asset-protection': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F17a2ded50a1b441da85755c823861bbe?format=webp&width=160',
    label: 'Asset Protection',
  },
  'auto-care-center': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F06985a0ce6cf4b2680bc70028d0faa3e?format=webp&width=160',
    label: 'Auto Care Center',
  },
  'deli-bakery': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F3d384edc39c444da93f4d9c521de0fd9?format=webp&width=160',
    label: 'Deli & Bakery',
  },
  digital: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4d4eec4ea67d4666ba20540fe1093b9b?format=webp&width=160',
    label: 'Digital',
  },
  entertainment: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F96a72e8d985d4ffc8155439a6db9b961?format=webp&width=160',
    label: 'Entertainment',
  },
  'food-consumables': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb7198f11a6fc4dc5815534156cc26ed2?format=webp&width=160',
    label: 'Food & Consumables',
  },
  'front-end': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa3b266f7c117417bbf21c5f1952d2b6e?format=webp&width=160',
    label: 'Front End',
  },
  fuel: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F887806d138d9421aa311d10f47f81e7f?format=webp&width=160',
    label: 'Fuel',
  },
  hardlines: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F78cf57f7327943278b05a59642babc8c?format=webp&width=160',
    label: 'Hardlines',
  },
  'health-beauty': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F2381d741ec9f4b949688f3cebdbd4fc5?format=webp&width=160',
    label: 'Health & Beauty',
  },
  home: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F1190f42815b34bb392afaa287bb5e02a?format=webp&width=160',
    label: 'Home',
  },
  'meat-produce': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F8ced19e4a8244039bf57a475b3f9d716?format=webp&width=160',
    label: 'Meat & Produce',
  },
  pharmacy: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F8465619eb3094c34a3a92e3d03f47315?format=webp&width=160',
    label: 'Pharmacy',
  },
  remodel: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F7e2c0855e38240b2b7c1c540a479a379?format=webp&width=160',
    label: 'Remodel',
  },
  salesfloor: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F2ec7531c353d4fbb8e6f1495805b047e?format=webp&width=160',
    label: 'Salesfloor',
  },
  seasonal: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb75fb279b3ee4aa896bf7d8a304fcaf3?format=webp&width=160',
    label: 'Seasonal',
  },
  'stocking-day': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fced220badcdc4cb486407cc32c031d8a?format=webp&width=160',
    label: 'Stocking Day',
  },
  'stocking-overnight': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fea591b3c41f9413e8c27661d9ab4068c?format=webp&width=160',
    label: 'Stocking Overnight',
  },
  store: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F80930352cfe041e6b2778dd1c62d36b0?format=webp&width=160',
    label: 'Store',
  },
  vision: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa12e47a61a2a432dab7a992a7174913f?format=webp&width=160',
    label: 'Vision',
  },
  placeholder: { src: '', label: 'Placeholder' },
  'saved-teams': {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc18dec0cae224f4493212d2035da9539?format=webp&width=160',
    label: 'Saved Teams',
  },
};

/** @deprecated Use TEAM_ILLUSTRATIONS[key].src instead */
export const TEAM_ILLUSTRATION_SRC: Record<ListTeamIllustration, string> =
  Object.fromEntries(
    Object.entries(TEAM_ILLUSTRATIONS).map(([k, v]) => [k, v.src])
  ) as Record<ListTeamIllustration, string>;

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

  /**
   * A React element to render as the leading illustration (e.g. an inline SVG component).
   * Takes precedence over `illustrationSrc` when provided.
   */
  illustrationElement?: React.ReactNode;

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

  /**
   * Whether the star icon button is in the "saved" (filled) state.
   * @default false
   */
  starred?: boolean;

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
  illustrationElement,
  illustrationAlt = '',
  title,
  subtitle,
  attribute1,
  attribute2,
  tagLabel,
  starred = false,
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
      {illustrationElement ? (
        illustrationElement
      ) : illustrationSrc ? (
        <img
          src={illustrationSrc}
          alt={illustrationAlt}
          className={styles.illustration}
          aria-hidden={illustrationAlt === '' ? true : undefined}
        />
      ) : (
        <span className={styles.illustrationPlaceholder} aria-hidden="true">
          {(illustrationAlt || title).charAt(0).toUpperCase()}
        </span>
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
          {starred
            ? <StarFill width={20} height={20} aria-hidden="true" />
            : <Star width={20} height={20} aria-hidden="true" />}
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
