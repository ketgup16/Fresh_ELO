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
import tileStyles from './CondensedItemTile.module.css';

type BasketState = 'collapsed' | 'generating' | 'expanded';

interface BasketItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  tag?: string;
  name?: string;
  quantity?: number;
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
  const [isEditing, setIsEditing] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.id, true]))
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((item) => [item.id, item.quantity ?? 2]))
  );

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

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleQuantityChange = (id: string, q: number) => {
    setQuantities((prev) => ({ ...prev, [id]: q }));
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
                <span className={styles.deliveryLabel}>Your upcoming Friday delivery</span>
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

      {/* ── GENERATING / EXPANDED STATES ── */}
      {(state === 'generating' || state === 'expanded') && (
        <div
          className={`${styles.expandedPanel} ${state === 'generating' ? styles.panelGenerating : styles.panelExpanded}`}
        >
          {/* Replenish-style header */}
          <div className={styles.replenishHeader}>
            <div className={styles.replenishHeaderText}>
              <span className={styles.replenishTitle}>
                Shop easily with items you buy often
              </span>
              <span className={styles.replenishSubtitle}>
                Get it by <u>Friday, {deliveryTime}</u>
              </span>
            </div>
            <button
              className={styles.closeBtn}
              onClick={handleCollapse}
              aria-label="Close basket"
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
              {/* Content card with rounded corners */}
              <div className={styles.contentCard}>
                <div className={[styles.contentCardInner, isEditing ? styles.contentCardInnerEdit : ''].filter(Boolean).join(' ')}>
                  {/* Item grid — switches between 3-col and 2-col */}
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

                  {/* Summary bar inline — visible in default mode only */}
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

              {/* Glass-style floating footer pill */}
              <div className={styles.glassFooter}>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={handleToggleEdit}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                >
                  Add to Friday delivery
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
