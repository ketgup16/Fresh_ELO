import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Divider } from '@/components/ui/Divider';
import { Checkbox } from '@/components/ui/Checkbox';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { Map } from '@/components/icons/Map';
import styles from './AXItemRecommendation.module.css';

// ── Magic fill gradient icon ─────────────────────────────────────────────────
const MAGIC_GRADIENT_ID = 'ax-item-rec-magic-fill';

function MagicFillGradient() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={MAGIC_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--ld-semantic-color-text-magic-start, #0053E2)" />
          <stop offset="50%" stopColor="var(--ld-semantic-color-text-magic-middle, #3D90EC)" />
          <stop offset="100%" stopColor="var(--ld-semantic-color-text-magic-stop, #79CDF6)" />
        </linearGradient>
      </defs>
      <path
        d="M11.1458 2.79167L12.3333 2.33333L12.7708 1.16667C12.7917 1.0625 12.8958 1 13 1C13.0833 1 13.1875 1.0625 13.2083 1.16667L13.6667 2.33333L14.8333 2.79167C14.9375 2.8125 15 2.91667 15 3C15 3.10417 14.9375 3.20833 14.8333 3.22917L13.6667 3.66667L13.2083 4.85417C13.1875 4.9375 13.0833 5 13 5C12.8958 5 12.7917 4.9375 12.7708 4.85417L12.3333 3.66667L11.1458 3.22917C11.0625 3.20833 11 3.10417 11 3C11 2.91667 11.0625 2.8125 11.1458 2.79167Z"
        fill={`url(#${MAGIC_GRADIENT_ID})`}
      />
      <path
        d="M1.28346 8.5288L1.8189 8.3089L2.07087 8.18325H2.10236L4.87402 6.89529L6.16535 4.09948L6.29134 3.84817L6.54331 3.31414C6.6063 3.12565 6.79528 3 6.98425 3C7.17323 3 7.3622 3.12565 7.45669 3.31414L7.70866 3.84817L7.80315 4.09948L7.83465 4.13089L9.09449 6.89529L11.8976 8.18325L12.1496 8.3089L12.685 8.56021C12.874 8.62304 13 8.81152 13 9C13 9.18848 12.874 9.37696 12.685 9.4712L12.1496 9.6911L11.8976 9.81675L9.09449 11.1047L7.80315 13.8691V13.9005L7.67717 14.1518L7.45669 14.6859C7.3622 14.8743 7.17323 15 6.98425 15C6.79528 15 6.6063 14.8743 6.54331 14.6859L6.29134 14.1518L6.16535 13.9005V13.8691L4.87402 11.1047L2.10236 9.81675H2.07087L1.8189 9.6911L1.28346 9.4712C1.09449 9.37696 1 9.18848 1 9C1 8.81152 1.09449 8.62304 1.28346 8.5288Z"
        fill={`url(#${MAGIC_GRADIENT_ID})`}
      />
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
            <Tag variant="secondary" color="brand">
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
            <Map width={16} height={16} className={styles.locationIcon} aria-hidden="true" />
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
          <MagicFillGradient />
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
