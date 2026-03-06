import { useState } from 'react';
import { CondensedItemTile } from './CondensedItemTile';
import { DeliveryScheduler } from './DeliveryScheduler';
import { Button } from '@/components/ui/Button';
import {
  ChevronDown,
  ChevronRight,
  Location,
  Gear,
  Flash,
  Pause,
} from '@/components/icons';
import { MinimizeIcon, MaximizeIcon } from '@/components/icons-custom';
import styles from './ReplenishmentBasket.module.css';
import tileStyles from './CondensedItemTile.module.css';

type BasketState = 'collapsed' | 'expanded' | 'scheduling';

interface BasketItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  tag?: string;
  name?: string;
  quantity?: number;
}

interface SuggestionItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  originalPrice?: string;
  name: string;
}

export interface ReplenishmentBasketProps {
  deliveryDay?: string;
  deliveryTime?: string;
  address?: string;
  itemCount?: number;
  total?: string;
  items?: BasketItem[];
  onPauseDelivery?: () => void;
  onGetItNow?: () => void;
  onEditItems?: () => void;
  forceVisible?: boolean;
  contained?: boolean;
}

const DEMO_ITEMS: BasketItem[] = [
  {
    id: '1',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/580e227005cd83b0b46a623f6f2a90340fd2b3b4?width=161',
    price: '1',
    cents: '25',
    tag: '5 oz',
    name: 'Fresh Honeycrisp Apple, Each',
    quantity: 2,
  },
  {
    id: '2',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/42897fd4cbe669fcae12fa1ae43708b172dd0f60?width=161',
    price: '3',
    cents: '85',
    tag: '5 oz',
    name: 'Bettergoods Smoky Fire-Roasted Salsa',
    quantity: 1,
  },
  {
    id: '3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/ac05fd7183f5fe71dddb905644af34902c39c8d0?width=161',
    price: '3',
    cents: '24',
    tag: '5 oz',
    name: 'Fresh Strawberries, 1 lb',
    quantity: 1,
  },
  {
    id: '4',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/871720e670ad040e0f7d7b9860b4d5aca4098b8c?width=161',
    price: '8',
    cents: '86',
    tag: '5 oz',
    name: 'Barilla Whole Grain Penne Pasta',
    quantity: 1,
  },
  {
    id: '5',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b1c5486ccc017cbaa03f2a39e1b77fa28f88166f?width=161',
    price: '2',
    cents: '62',
    tag: '5 oz',
    name: 'Good Culture Cottage Cheese',
    quantity: 3,
  },
  {
    id: '6',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8de62693db42c198562f27ca46ac63d0c1761cdd?width=161',
    price: '3',
    cents: '77',
    tag: '5 oz',
    name: 'Kikkoman Soy Sauce, 10 oz',
    quantity: 1,
  },
  {
    id: '7',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '3',
    cents: '47',
    tag: '5 oz',
    name: 'SkinnyPop Original Popcorn',
    quantity: 1,
  },
  {
    id: '8',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '1',
    cents: '98',
    tag: '5 oz',
    name: 'Cold Pressed Orange Juice',
    quantity: 1,
  },
  {
    id: '9',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '5',
    cents: '27',
    tag: '5 oz',
    name: 'Oatly Original Oat Milk',
    quantity: 1,
  },
];

const SUGGESTION_ITEMS: SuggestionItem[] = [
  {
    id: 's1',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/42897fd4cbe669fcae12fa1ae43708b172dd0f60?width=161',
    price: '8',
    cents: '05',
    name: 'Ritz Crackers Family Size',
  },
  {
    id: 's2',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/ac05fd7183f5fe71dddb905644af34902c39c8d0?width=161',
    price: '9',
    cents: '25',
    name: 'Viva Paper Towels',
  },
  {
    id: 's3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/871720e670ad040e0f7d7b9860b4d5aca4098b8c?width=161',
    price: '15',
    cents: '80',
    name: 'Dreft Baby Detergent',
  },
  {
    id: 's4',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b1c5486ccc017cbaa03f2a39e1b77fa28f88166f?width=161',
    price: '4',
    cents: '98',
    name: 'Large Eggs, 12 Count',
  },
  {
    id: 's5',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8de62693db42c198562f27ca46ac63d0c1761cdd?width=161',
    price: '3',
    cents: '48',
    name: 'Great Value Whole Milk',
  },
  {
    id: 's6',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '0',
    cents: '68',
    name: 'Bananas, each',
  },
];

export function ReplenishmentBasket({
  deliveryDay = 'Friday, Feb 6',
  deliveryTime = '4pm',
  address = '3743 Park Ln, Dallas, TX 75220',
  itemCount = 14,
  total = '55.59',
  items = DEMO_ITEMS,
  onPauseDelivery,
  onGetItNow,
  forceVisible = false,
  contained = false,
}: ReplenishmentBasketProps) {
  const [state, setState] = useState<BasketState>('collapsed');
  const [isEditing, setIsEditing] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.id, true]))
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((item) => [item.id, item.quantity ?? 2]))
  );
  const [selectedDay, setSelectedDay] = useState('Fri');
  const [selectedTime, setSelectedTime] = useState('4pm-5pm');

  const handleExpand = () => {
    // Go directly to expanded — no step animation
    setState('expanded');
  };

  const handleCollapse = () => {
    setState('collapsed');
    setIsEditing(false);
    setShowAll(false);
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
    setShowAll(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddToDelivery = () => {
    // Save and collapse — no scheduling modal
    setIsEditing(false);
    setState('collapsed');
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleQuantityChange = (id: string, q: number) => {
    setQuantities((prev) => ({ ...prev, [id]: q }));
  };

  const handleBackToBasket = () => {
    setState('expanded');
  };

  const handleConfirmDelivery = () => {
    setState('collapsed');
    setIsEditing(false);
  };

  const isPanel = state === 'expanded' || state === 'scheduling';

  // Show only first 6 items unless showAll is true
  const visibleItems = showAll ? items : items.slice(0, 6);

  const deliveryDayShort = deliveryDay.split(',')[0] ?? deliveryDay;

  return (
    <div
      className={[
        styles.wrapper,
        isPanel ? styles.wrapperExpanded : '',
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
          <div className={styles.summaryRow}>
            <div className={styles.summaryLeft}>
              <div className={styles.cartIconWrap}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5ac1c437b00342a0b54f6649d7d6eeb8?width=80"
                  alt=""
                  className={styles.cartIcon}
                />
              </div>
              <div className={styles.summaryInfo}>
                <span className={styles.deliveryLabel}>Your upcoming {deliveryDayShort} delivery</span>
                <span className={styles.totalLabel}>
                  {itemCount} items: ${total}
                </span>
              </div>
            </div>
            <span className={styles.floatingIconBtn} aria-hidden="true">
              <MaximizeIcon width={20} height={20} />
            </span>
          </div>

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

      {/* ── PANEL STATES (expanded / scheduling) ── */}
      {isPanel && (
        <div className={`${styles.expandedPanel} ${styles.panelExpanded}`}>

          {/* Grabber handle */}
          <div className={styles.grabberArea} onClick={handleCollapse} role="button" aria-label="Collapse basket">
            <div className={styles.grabber} />
          </div>

          {/* ── Panel header: "Your upcoming delivery" ── */}
          {state === 'expanded' && (
            <div className={styles.panelTopHeader}>
              <div className={styles.panelTopHeaderLeft}>
                <div className={styles.sparkIconWrap}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5ac1c437b00342a0b54f6649d7d6eeb8?width=80"
                    alt=""
                    className={styles.sparkIconInner}
                  />
                </div>
                <span className={styles.panelTopTitle}>Your upcoming delivery</span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={handleCollapse}
                aria-label="Minimize basket"
              >
                <MinimizeIcon width={20} height={20} className={styles.closeIcon} />
              </button>
            </div>
          )}

          {state === 'scheduling' && (
            <div className={styles.panelTopHeader}>
              <div className={styles.panelTopHeaderLeft}>
                <span className={styles.panelTopTitle}>Schedule your delivery</span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={handleBackToBasket}
                aria-label="Back to basket"
              >
                <ChevronDown className={styles.closeIcon} />
              </button>
            </div>
          )}

          {/* ── Delivery info row ── */}
          {state === 'expanded' && !isEditing && (
            <div className={styles.deliveryInfoRow}>
              <Location className={styles.locationIcon} aria-hidden="true" />
              <div className={styles.deliveryDetails}>
                <span className={styles.deliveryTime}>Arriving {deliveryDay}, {deliveryTime}</span>
                <span className={styles.deliveryAddress}>{address}</span>
              </div>
              <button className={styles.settingsBtn} aria-label="Edit delivery settings">
                <Gear className={styles.settingsIcon} />
              </button>
            </div>
          )}

          {/* ── EXPANDED CONTENT ── */}
          {state === 'expanded' && (
            <>
              <div className={styles.contentCard}>
                <div className={[styles.contentCardInner, isEditing ? styles.contentCardInnerEdit : ''].filter(Boolean).join(' ')}>
                  {/* Item grid */}
                  <div className={isEditing ? styles.itemGridEdit : styles.itemGrid}>
                    {visibleItems.map((item, index) => (
                      <CondensedItemTile
                        key={item.id}
                        image={item.image}
                        price={item.price}
                        cents={item.cents}
                        tag={item.tag}
                        variant={isEditing ? 'edit' : 'tertiary'}
                        name={item.name}
                        quantity={quantities[item.id] ?? item.quantity ?? 2}
                        onQuantityChange={(q) => handleQuantityChange(item.id, q)}
                        isChecked={checkedItems[item.id] ?? true}
                        onCheckChange={(checked) => handleCheckChange(item.id, checked)}
                        itemIndex={index}
                        animationClass={isEditing ? tileStyles.itemBounceIn : undefined}
                        onAddToCart={isEditing ? undefined : () => {}}
                      />
                    ))}
                  </div>

                  {/* Edit items + View all row */}
                  {!isEditing && (
                    <div className={styles.actionRow}>
                      <Button variant="secondary" size="small" onClick={handleToggleEdit}>
                        Edit items
                      </Button>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => setShowAll((v) => !v)}
                      >
                        <span className={styles.viewAllLabel}>
                          {showAll ? `Show less` : `View all ${itemCount} items`}
                          <ChevronDown
                            width={14}
                            height={14}
                            className={showAll ? styles.chevronUp : styles.chevronDown}
                          />
                        </span>
                      </Button>
                    </div>
                  )}

                  {/* Separator + Suggestions (non-edit only) */}
                  {!isEditing && (
                    <>
                      <div className={styles.sectionSep} />
                      <div className={styles.suggestionsSection}>
                        <div className={styles.suggestionHeader}>
                          <span className={styles.suggestionTitle}>Looking to add anything else?</span>
                          <ChevronRight className={styles.suggestionArrow} />
                        </div>
                        <div className={styles.suggestionScroll}>
                          {SUGGESTION_ITEMS.map((s) => (
                            <div key={s.id} className={styles.suggestionTileWrap}>
                              <CondensedItemTile
                                image={s.image}
                                price={s.price}
                                cents={s.cents}
                                variant="primary"
                                onAddToCart={() => {}}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Footer ── */}
              {isEditing ? (
                /* Edit mode footer: Save + Add to [Day] delivery (animated stroke) */
                <div className={styles.glassFooter}>
                  <Button variant="secondary" size="medium" isFullWidth onClick={handleSave}>
                    Save
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    isFullWidth
                    strokeOn
                    onClick={handleAddToDelivery}
                  >
                    Add to {deliveryDayShort} delivery
                  </Button>
                </div>
              ) : (
                /* Default expanded footer: Pause Delivery + Get it now */
                <div className={styles.glassFooter}>
                  <Button
                    variant="secondary"
                    size="medium"
                    isFullWidth
                    leading={<Pause width={16} height={16} />}
                    onClick={onPauseDelivery}
                  >
                    Pause Delivery
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    isFullWidth
                    strokeOn
                    leading={<Flash width={16} height={16} />}
                    subLabel="as soon as 37 mins"
                    onClick={onGetItNow}
                  >
                    Get it now
                  </Button>
                </div>
              )}
            </>
          )}

          {/* ── SCHEDULING CONTENT ── */}
          {state === 'scheduling' && (
            <>
              <div className={styles.contentCard}>
                <div className={styles.contentCardInner}>
                  <DeliveryScheduler
                    selectedDay={selectedDay}
                    selectedTime={selectedTime}
                    onDayChange={setSelectedDay}
                    onTimeChange={setSelectedTime}
                  />
                </div>
              </div>

              <div className={styles.glassFooter}>
                <Button variant="secondary" size="medium" isFullWidth onClick={handleBackToBasket}>
                  Back
                </Button>
                <Button variant="primary" size="medium" isFullWidth strokeOn onClick={handleConfirmDelivery}>
                  Confirm delivery
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
