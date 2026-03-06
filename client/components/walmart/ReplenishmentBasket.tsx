import { useState } from 'react';
import { CondensedItemTile } from './CondensedItemTile';
import { StepAnimation } from './StepAnimation';
import { DeliveryScheduler } from './DeliveryScheduler';
import { Button } from '@/components/ui/Button';
import {
  X,
  CartFill,
  RotateCcw,
} from '@/components/icons';
import styles from './ReplenishmentBasket.module.css';
import tileStyles from './CondensedItemTile.module.css';

type BasketState = 'collapsed' | 'generating' | 'expanded' | 'scheduling';

interface BasketItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  tag?: string;
  name?: string;
  quantity?: number;
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
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/f1484020403bddc45dfa804d4e33949478f6895e?width=161',
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
    quantity: 2,
  },
  {
    id: '3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/ac05fd7183f5fe71dddb905644af34902c39c8d0?width=161',
    price: '3',
    cents: '24',
    tag: '5 oz',
    name: 'Fresh Strawberries, 1 lb',
    quantity: 2,
  },
  {
    id: '4',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/871720e670ad040e0f7d7b9860b4d5aca4098b8c?width=161',
    price: '8',
    cents: '86',
    tag: '5 oz',
    name: 'Barilla Whole Grain Penne Pasta',
    quantity: 2,
  },
  {
    id: '5',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b1c5486ccc017cbaa03f2a39e1b77fa28f88166f?width=161',
    price: '2',
    cents: '62',
    tag: '5 oz',
    name: 'Good Culture Cottage Cheese',
    quantity: 2,
  },
  {
    id: '6',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8de62693db42c198562f27ca46ac63d0c1761cdd?width=161',
    price: '3',
    cents: '77',
    tag: '5 oz',
    name: 'Kikkoman Soy Sauce, 10 oz',
    quantity: 2,
  },
  {
    id: '7',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '3',
    cents: '47',
    tag: '5 oz',
    name: 'SkinnyPop Original Popcorn',
    quantity: 2,
  },
  {
    id: '8',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '1',
    cents: '98',
    tag: '5 oz',
    name: 'Cold Pressed Orange Juice',
    quantity: 2,
  },
  {
    id: '9',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '5',
    cents: '27',
    tag: '5 oz',
    name: 'Oatly Original Oat Milk',
    quantity: 2,
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
  onEditItems,
  forceVisible = false,
  contained = false,
}: ReplenishmentBasketProps) {
  const [state, setState] = useState<BasketState>('collapsed');
  const [isEditing, setIsEditing] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.id, true]))
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((item) => [item.id, item.quantity ?? 2]))
  );
  const [selectedDay, setSelectedDay] = useState('Fri');
  const [selectedTime, setSelectedTime] = useState('4pm-5pm');

  const handleExpand = () => {
    setState('generating');
    setTimeout(() => {
      setState('expanded');
    }, 3500);
  };

  const handleCollapse = () => {
    setState('collapsed');
    setIsEditing(false);
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleQuantityChange = (id: string, q: number) => {
    setQuantities((prev) => ({ ...prev, [id]: q }));
  };

  const handleOpenScheduling = () => {
    setState('scheduling');
    setIsEditing(false);
  };

  const handleBackToBasket = () => {
    setState('expanded');
  };

  const handleConfirmDelivery = () => {
    setState('collapsed');
    setIsEditing(false);
  };

  const isPanel = state === 'generating' || state === 'expanded' || state === 'scheduling';

  // Derive a friendly delivery label from selection
  const deliveryDayLabel = selectedDay === 'Fri' ? 'Friday' : selectedDay === 'Sat' ? 'Saturday' : selectedDay === 'Thu' ? 'Thursday' : selectedDay === 'Wed' ? 'Wednesday' : selectedDay === 'Tue' ? 'Tuesday' : selectedDay;
  const deliveryTimeLabel = selectedTime.split('-')[0] || '4pm';

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
          <div className={styles.notificationStrip}>
            <span className={styles.newBadge}>New</span>
            <span className={styles.notifText}>Add items, edit, or pause anytime</span>
          </div>

          <div className={styles.summaryRow}>
            <div className={styles.summaryLeft}>
              <div className={styles.cartIconWrap}>
                <CartFill className={styles.cartIcon} />
              </div>
              <div className={styles.summaryInfo}>
                <span className={styles.deliveryLabel}>Your upcoming {deliveryDayLabel} delivery</span>
                <span className={styles.totalLabel}>
                  {itemCount} items: ${total}
                </span>
              </div>
            </div>
            <RotateCcw className={styles.refreshIcon} aria-hidden="true" />
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

      {/* ── PANEL STATES (generating / expanded / scheduling) ── */}
      {isPanel && (
        <div
          className={`${styles.expandedPanel} ${state === 'generating' ? styles.panelGenerating : styles.panelExpanded}`}
        >
          {/* Header */}
          <div className={styles.replenishHeader}>
            <div className={styles.replenishHeaderText}>
              {state === 'scheduling' ? (
                <>
                  <span className={styles.replenishTitle}>
                    Schedule your delivery
                  </span>
                  <span className={styles.replenishSubtitle}>
                    {itemCount} items &middot; Est. ${total}
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.replenishTitle}>
                    Shop easily with items you buy often
                  </span>
                  <span className={styles.replenishSubtitle}>
                    Get it by <u>{deliveryDayLabel}, {deliveryTimeLabel}</u>
                  </span>
                </>
              )}
            </div>
            <button
              className={styles.closeBtn}
              onClick={state === 'scheduling' ? handleBackToBasket : handleCollapse}
              aria-label={state === 'scheduling' ? 'Back to basket' : 'Close basket'}
            >
              <X className={styles.closeIcon} />
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
              <div className={styles.contentCard}>
                <div className={[styles.contentCardInner, isEditing ? styles.contentCardInnerEdit : ''].filter(Boolean).join(' ')}>
                  <div className={isEditing ? styles.itemGridEdit : styles.itemGrid}>
                    {items.map((item, index) => (
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

                  {!isEditing && (
                    <div className={styles.summaryBar}>
                      <div className={styles.summaryText}>
                        <span>Est.total ({itemCount} items):</span>
                        <span className={styles.summaryTotal}>${total}</span>
                      </div>
                      <Button
                        variant="tertiary"
                        size="small"
                        onClick={handleToggleEdit}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.glassFooter}>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={isEditing ? handleSave : handleToggleEdit}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handleOpenScheduling}
                >
                  Add to {deliveryDayLabel} delivery
                </Button>
              </div>
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
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={handleBackToBasket}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handleConfirmDelivery}
                >
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
