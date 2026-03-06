import { useState } from 'react';
import { CondensedItemTile } from './CondensedItemTile';
import { StepAnimation } from './StepAnimation';
import { OrderSummaryCard } from './OrderSummaryCard';
import { Button } from '@/components/ui/Button';
import {
  Flash,
  Pause,
  Location,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
  Spark,
  CartFill,
  RotateCcw,
} from '@/components/icons';
import styles from './ReplenishmentBasket.module.css';

type BasketState = 'collapsed' | 'generating' | 'expanded';

interface BasketItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  tag?: string;
}

interface SuggestedItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  originalPrice?: string;
}

export interface ReplenishmentBasketProps {
  deliveryDay?: string;
  deliveryTime?: string;
  address?: string;
  itemCount?: number;
  total?: string;
  items?: BasketItem[];
  suggestedItems?: SuggestedItem[];
  onPauseDelivery?: () => void;
  onGetItNow?: () => void;
  onEditItems?: () => void;
  /** Force the component visible regardless of viewport width (for docs demos) */
  forceVisible?: boolean;
  /**
   * When true, uses position:absolute instead of fixed — required when
   * rendering inside a scrollable container or phone-frame demo.
   * The parent must have position:relative.
   */
  contained?: boolean;
}

const DEMO_ITEMS: BasketItem[] = [
  {
    id: '1',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/1a0ad125303b4f53a1b532e7490232fab0dc48db?width=161',
    price: '1',
    cents: '00',
    tag: '5 oz',
  },
  {
    id: '2',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4cdf6dad6c63310c2e6e655f2c02bd1b86fb1663?width=161',
    price: '0',
    cents: '85',
    tag: '5 oz',
  },
  {
    id: '3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/1a0ad125303b4f53a1b532e7490232fab0dc48db?width=161',
    price: '0',
    cents: '24',
    tag: '5 oz',
  },
  {
    id: '4',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4cdf6dad6c63310c2e6e655f2c02bd1b86fb1663?width=161',
    price: '8',
    cents: '86',
    tag: '5 oz',
  },
  {
    id: '5',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/1a0ad125303b4f53a1b532e7490232fab0dc48db?width=161',
    price: '2',
    cents: '62',
    tag: '5 oz',
  },
  {
    id: '6',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4cdf6dad6c63310c2e6e655f2c02bd1b86fb1663?width=161',
    price: '0',
    cents: '77',
    tag: '5 oz',
  },
];

const DEMO_SUGGESTIONS: SuggestedItem[] = [
  {
    id: 's1',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/1a0ad125303b4f53a1b532e7490232fab0dc48db?width=161',
    price: '8',
    cents: '05',
    originalPrice: '9.98',
  },
  {
    id: 's2',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4cdf6dad6c63310c2e6e655f2c02bd1b86fb1663?width=161',
    price: '9',
    cents: '25',
    originalPrice: '10.98',
  },
  {
    id: 's3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/1a0ad125303b4f53a1b532e7490232fab0dc48db?width=161',
    price: '15',
    cents: '80',
  },
];

export function ReplenishmentBasket({
  deliveryDay = 'Friday, Feb 6',
  deliveryTime = '4pm',
  address = '3743 Park Ln, Dallas, TX 75220',
  itemCount = 14,
  total = '55.59',
  items = DEMO_ITEMS,
  suggestedItems = DEMO_SUGGESTIONS,
  onPauseDelivery,
  onGetItNow,
  onEditItems,
  forceVisible = false,
  contained = false,
}: ReplenishmentBasketProps) {
  const [state, setState] = useState<BasketState>('collapsed');

  const handleExpand = () => {
    setState('generating');
    // StepAnimation plays for ~3.5s then we show the full basket
    setTimeout(() => {
      setState('expanded');
    }, 3500);
  };

  const handleCollapse = () => {
    setState('collapsed');
  };

  return (
    <div
      className={[
        styles.wrapper,
        forceVisible ? styles.wrapperForceVisible : '',
        contained ? styles.wrapperContained : '',
      ].filter(Boolean).join(' ')}
      aria-label="Replenishment basket"
    >
      {/* ── COLLAPSED STATE ── */}
      {state === 'collapsed' && (
        <button
          className={styles.collapsedBar}
          onClick={handleExpand}
          aria-label="Expand upcoming delivery basket"
        >
          {/* Notification strip */}
          <div className={styles.notificationStrip}>
            <span className={styles.newBadge}>New</span>
            <span className={styles.notifText}>Add items, edit, or pause anytime</span>
          </div>

          {/* Summary row */}
          <div className={styles.summaryRow}>
            <div className={styles.summaryLeft}>
              <div className={styles.cartIconWrap}>
                <CartFill className={styles.cartIcon} />
              </div>
              <div className={styles.summaryInfo}>
                <span className={styles.deliveryLabel}>Your upcoming Friday delivery</span>
                <span className={styles.totalLabel}>
                  {itemCount} items: ${total}
                </span>
              </div>
            </div>
            <RotateCcw className={styles.refreshIcon} aria-hidden="true" />
          </div>

          {/* Item thumbnails */}
          <div className={styles.thumbnailRow}>
            {items.slice(0, 4).map((item) => (
              <div key={item.id} className={styles.thumbWrap}>
                <img src={item.image} alt="" className={styles.thumb} />
              </div>
            ))}
            {itemCount > 4 && (
              <div className={styles.thumbMore}>+{itemCount - 4}</div>
            )}
          </div>
        </button>
      )}

      {/* ── GENERATING / EXPANDED STATES ── */}
      {(state === 'generating' || state === 'expanded') && (
        <div
          className={`${styles.expandedPanel} ${state === 'generating' ? styles.panelGenerating : styles.panelExpanded}`}
        >
          {/* Panel header */}
          <div className={styles.panelHeader}>
            <div className={styles.headerLeft}>
              <Spark className={styles.sparkIcon} aria-hidden="true" />
              <span className={styles.headerTitle}>Your upcoming delivery</span>
            </div>
            <button
              className={styles.closeBtn}
              onClick={handleCollapse}
              aria-label="Collapse basket"
            >
              <X className={styles.closeIcon} />
            </button>
          </div>

          {/* Delivery info row */}
          <div className={styles.deliveryInfoRow}>
            <Location className={styles.locationIcon} aria-hidden="true" />
            <div className={styles.deliveryDetails}>
              <span className={styles.deliveryTime}>
                Arriving {deliveryDay}, {deliveryTime}
              </span>
              <span className={styles.deliveryAddress}>{address}</span>
            </div>
            <button className={styles.settingsBtn} aria-label="Delivery settings">
              <Settings className={styles.settingsIcon} />
            </button>
          </div>

          {/* ── GENERATING CONTENT (StepAnimation) ── */}
          {state === 'generating' && (
            <div className={styles.generatingContent}>
              <StepAnimation />
            </div>
          )}

          {/* ── EXPANDED CONTENT ── */}
          {state === 'expanded' && (
            <>
              <div className={styles.scrollContent}>
                {/* Item grid — 3 columns of CondensedItemTile */}
                <div className={styles.itemGrid}>
                  {items.map((item) => (
                    <CondensedItemTile
                      key={item.id}
                      image={item.image}
                      price={item.price}
                      cents={item.cents}
                      tag={item.tag}
                      variant="primary"
                      onAddToCart={() => {}}
                    />
                  ))}
                </div>

                {/* Action row */}
                <div className={styles.actionRow}>
                  <Button variant="secondary" size="small" onClick={onEditItems}>
                    Edit items
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    trailing={<ChevronDown />}
                  >
                    View all {itemCount} items
                  </Button>
                </div>

                {/* Separator */}
                <div className={styles.sectionSep} />

                {/* Suggestions section */}
                <div className={styles.suggestionsSection}>
                  <div className={styles.suggestionHeader}>
                    <span className={styles.suggestionTitle}>
                      Looking to add anything else?
                    </span>
                    <ChevronRight className={styles.suggestionArrow} aria-hidden="true" />
                  </div>
                  <div className={styles.suggestionScroll}>
                    {suggestedItems.map((item) => (
                      <div key={item.id} className={styles.suggestionCard}>
                        <div className={styles.suggestionImageWrap}>
                          <img
                            src={item.image}
                            alt=""
                            className={styles.suggestionImage}
                          />
                          <button
                            className={styles.addBtn}
                            aria-label="Add item to basket"
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                        <div className={styles.suggestionPriceRow}>
                          <span className={styles.suggestSign}>$</span>
                          <span className={styles.suggestMain}>{item.price}</span>
                          <span className={styles.suggestCents}>{item.cents}</span>
                          {item.originalPrice && (
                            <span className={styles.suggestOriginal}>
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div className={styles.sectionSep} />

                {/* Order summary / payment details */}
                <OrderSummaryCard
                  itemCount={itemCount}
                  total={total}
                  estimatedTaxes="$0.00"
                  paymentLast4="1234"
                />
              </div>

              {/* Fixed footer inside panel */}
              <div className={styles.panelFooter}>
                <Button
                  variant="secondary"
                  size="medium"
                  leading={<Pause />}
                  onClick={onPauseDelivery}
                >
                  Pause Delivery
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  leading={<Flash />}
                  subLabel="as soon as 37 mins"
                  onClick={onGetItNow}
                >
                  Get it now
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
