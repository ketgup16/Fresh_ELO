import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Divider } from '@/components/ui/Divider';
import { Checkbox } from '@/components/ui/Checkbox';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { LocationIcon } from '@/components/icons-custom/LocationIcon';
import styles from './AXItemRecommendation.module.css';

// ── Sidekick icon with magic fill gradient ───────────────────────────────────
const SIDEKICK_GRADIENT_ID = 'ax-item-rec-sidekick-magic';

function SidekickMagicIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={SIDEKICK_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--ld-semantic-color-text-magic-start, #0053E2)" />
          <stop offset="50%" stopColor="var(--ld-semantic-color-text-magic-middle, #3D90EC)" />
          <stop offset="100%" stopColor="var(--ld-semantic-color-text-magic-stop, #79CDF6)" />
        </linearGradient>
        <clipPath id="sidekick-item-rec-clip">
          <rect width="23.9992" height="23.9984" fill="white" />
        </clipPath>
      </defs>
      <g clipPath="url(#sidekick-item-rec-clip)">
        <path
          d="M7.41376 22.9792C6.05479 21.6202 6.05479 19.4169 7.41376 18.0579L17.2564 8.21533L18.7327 9.69172C20.6353 11.5943 20.6353 14.679 18.7327 16.5815L12.3351 22.9792C10.9761 24.3382 8.77274 24.3382 7.41376 22.9792Z"
          fill={`url(#${SIDEKICK_GRADIENT_ID})`}
        />
        <path
          d="M5.26677 14.3067C3.3642 12.4042 3.3642 9.31949 5.26677 7.41692L11.6645 1.01923C13.0234 -0.339745 15.2268 -0.339744 16.5857 1.01923C17.9447 2.37821 17.9447 4.58155 16.5857 5.94053L6.74316 15.7831L5.26677 14.3067Z"
          fill={`url(#${SIDEKICK_GRADIENT_ID})`}
        />
      </g>
    </svg>
  );
}

// ── Public types ─────────────────────────────────────────────────────────────

export type AXItemRecommendationAction = 'none' | 'navigate' | 'linkButton' | 'checkbox';

export interface AXItemRecommendationMetric {
  label: string;
  value: string;
}

export interface AXItemRecommendationProps {
  // Header
  eyebrowText?: string;
  tagLabel?: string;
  trailingAction?: AXItemRecommendationAction;
  linkButtonLabel?: string;
  onLinkButtonClick?: () => void;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onNavigate?: () => void;

  // Item details
  imageSrc?: string;
  imageAlt?: string;
  itemName?: string;
  itemColor?: string;
  price?: string;
  wasPrice?: string;
  pricingDetails?: string;
  unitPrice?: string;
  attributes?: Array<{ key: string; value: string }>;

  // Metrics row
  metrics?: AXItemRecommendationMetric[];

  // Location
  locationCode?: string;
  additionalLocations?: number;
  onMoreLocations?: () => void;

  // AI Insight
  insightText?: string;
  showInsight?: boolean;

  // Alert
  alertMessage?: string;
  alertActionLabel?: string;
  onAlertAction?: () => void;
  showAlert?: boolean;

  // Action buttons
  alternateLabel?: string;
  preferredLabel?: string;
  onAlternate?: () => void;
  onPreferred?: () => void;

  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export function AXItemRecommendation({
  eyebrowText = 'Eyebrow text',
  tagLabel,
  trailingAction = 'navigate',
  linkButtonLabel = 'Button',
  onLinkButtonClick,
  checked = false,
  onCheckedChange,
  onNavigate,
  imageSrc,
  imageAlt = '',
  itemName = 'ITEM NAME',
  itemColor = 'Color',
  price = '$10.98 ea',
  wasPrice = '$11.98',
  pricingDetails,
  unitPrice,
  attributes = [],
  metrics = [],
  locationCode,
  additionalLocations,
  onMoreLocations,
  insightText = 'Data-based intelligence to support action.',
  showInsight = true,
  alertMessage,
  alertActionLabel,
  onAlertAction,
  showAlert = false,
  alternateLabel = 'Alternate',
  preferredLabel = 'Preferred',
  onAlternate,
  onPreferred,
  UNSAFE_className,
  UNSAFE_style,
}: AXItemRecommendationProps) {
  const rootClass = [styles.root, UNSAFE_className].filter(Boolean).join(' ');

  return (
    <div className={rootClass} style={UNSAFE_style}>
      {/* ── Header row: eyebrow + tag + trailing action ── */}
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrowText}>{eyebrowText}</span>
          {tagLabel && (
            <Tag variant="tertiary" color="gray">
              {tagLabel}
            </Tag>
          )}
        </div>

        <div className={styles.headerTrailing}>
          {trailingAction === 'navigate' && (
            <button
              className={styles.navigateBtn}
              onClick={onNavigate}
              aria-label="View item details"
            >
              <ChevronRight width={20} height={20} />
            </button>
          )}
          {trailingAction === 'linkButton' && (
            <LinkButton size="small" onClick={onLinkButtonClick}>
              {linkButtonLabel}
            </LinkButton>
          )}
          {trailingAction === 'checkbox' && (
            <Checkbox
              checked={checked}
              onCheckedChange={(v) => onCheckedChange?.(Boolean(v))}
              aria-label="Select item"
            />
          )}
        </div>
      </div>

      {/* ── Item details ── */}
      <div className={styles.itemRow}>
        {imageSrc && (
          <div className={styles.imageWrapper}>
            <img src={imageSrc} alt={imageAlt} className={styles.itemImage} />
          </div>
        )}
        {!imageSrc && (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
        <div className={styles.itemDetails}>
          <p className={styles.itemName}>{itemName}</p>
          {itemColor && <p className={styles.itemColor}>{itemColor}</p>}
          <p className={styles.priceRow}>
            <span className={styles.price}>{price}</span>
            {wasPrice && <span className={styles.wasPrice}>WAS <span className={styles.wasPriceValue}>{wasPrice}</span></span>}
          </p>
          {pricingDetails && <p className={styles.pricingDetails}>{pricingDetails}</p>}
          {unitPrice && <p className={styles.unitPrice}>{unitPrice}</p>}
          {attributes.map((attr) => (
            <p key={attr.key} className={styles.attributeRow}>
              <span className={styles.attrKey}>{attr.key}</span>
              <span className={styles.attrValue}>{attr.value}</span>
            </p>
          ))}
        </div>
      </div>

      {/* ── Metrics row ── */}
      {metrics.length > 0 && (
        <div className={styles.metricsRow}>
          {metrics.map((metric, i) => (
            <React.Fragment key={metric.label}>
              {i > 0 && <div className={styles.metricDivider} aria-hidden="true" />}
              <div className={styles.metric}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={styles.metricValue}>{metric.value}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* ── Location row ── */}
      {locationCode && (
        <>
          <Divider />
          <div className={styles.locationRow}>
            <LocationIcon width={16} height={16} className={styles.locationIcon} aria-hidden="true" />
            <span className={styles.locationCode}>{locationCode}</span>
            {additionalLocations != null && additionalLocations > 0 && (
              <button className={styles.moreLocationsBtn} onClick={onMoreLocations}>
                +{additionalLocations} more locations
              </button>
            )}
          </div>
        </>
      )}

      {/* ── AI Insight banner ── */}
      {showInsight && (
        <div className={styles.insightBanner}>
          <SidekickMagicIcon />
          <span className={styles.insightText}>{insightText}</span>
        </div>
      )}

      {/* ── Alert ── */}
      {showAlert && alertMessage && (
        <Alert
          variant="error"
          action={alertActionLabel ? (
            <LinkButton size="small" onClick={onAlertAction}>{alertActionLabel}</LinkButton>
          ) : undefined}
        >
          {alertMessage}
        </Alert>
      )}

      {/* ── Action buttons ── */}
      <div className={styles.actionButtons}>
        <Button
          variant="secondary"
          size="medium"
          isFullWidth
          onClick={onAlternate}
        >
          {alternateLabel}
        </Button>
        <Button
          variant="primary"
          size="medium"
          isFullWidth
          onClick={onPreferred}
        >
          {preferredLabel}
        </Button>
      </div>
    </div>
  );
}
