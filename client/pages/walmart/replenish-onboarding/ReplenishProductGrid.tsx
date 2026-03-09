import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import { Button } from '@/components/ui/Button';
import { X, Minus, Plus, Check, Circle } from '@/components/icons';
import styles from './ReplenishProductGrid.module.css';
import pageStyles from './ReplenishOnboarding.module.css';

export interface ProductItem {
  id: string;
  image: string;
  name: string;
  priceDollars: string;
  priceCents: string;
  quantity: number;
  sizeLabel?: string;
}

const DEFAULT_ITEMS: ProductItem[] = [
  { id: '1', image: PRODUCT_IMAGES.redApple, name: 'Fresh Honeycrisp Apple, Each', priceDollars: '1', priceCents: '25', quantity: 3, sizeLabel: '5 oz' },
  { id: '2', image: PRODUCT_IMAGES.oatlyOatMilk, name: 'Oatly Oat Milk, 64 fl oz', priceDollars: '3', priceCents: '85', quantity: 2, sizeLabel: '5 oz' },
  { id: '3', image: PRODUCT_IMAGES.eggs6Count, name: 'Great Value Large Eggs, 12 ct', priceDollars: '8', priceCents: '86', quantity: 1, sizeLabel: '5 oz' },
  { id: '4', image: PRODUCT_IMAGES.starbucksDoubleshot, name: 'Starbucks Doubleshot Espresso', priceDollars: '2', priceCents: '62', quantity: 5, sizeLabel: '5 oz' },
  { id: '5', image: PRODUCT_IMAGES.bettergooodsFruitSnacks, name: 'Bettergoods Fruit Snacks', priceDollars: '3', priceCents: '77', quantity: 2, sizeLabel: '5 oz' },
  { id: '6', image: PRODUCT_IMAGES.skinnyPopPopcorn, name: 'SkinnyPop Original Popcorn', priceDollars: '3', priceCents: '24', quantity: 1, sizeLabel: '5 oz' },
  { id: '7', image: PRODUCT_IMAGES.kikkomanSoySauce, name: 'Kikkoman Soy Sauce, 10 fl oz', priceDollars: '3', priceCents: '47', quantity: 2, sizeLabel: '5 oz' },
  { id: '8', image: PRODUCT_IMAGES.freshStrawberries, name: 'Fresh Strawberries, 1 lb', priceDollars: '5', priceCents: '27', quantity: 1, sizeLabel: '5 oz' },
  { id: '9', image: PRODUCT_IMAGES.bettergoodsSalsa, name: 'Bettergoods Medium Salsa', priceDollars: '1', priceCents: '98', quantity: 2, sizeLabel: '5 oz' },
  { id: '10', image: PRODUCT_IMAGES.bettergoodsFrozenMeal, name: 'Bettergoods Frozen Meal', priceDollars: '4', priceCents: '75', quantity: 1, sizeLabel: '5 oz' },
  { id: '11', image: PRODUCT_IMAGES.goodCultureCottageCheese, name: 'Good Culture Cottage Cheese', priceDollars: '4', priceCents: '22', quantity: 2, sizeLabel: '5 oz' },
  { id: '12', image: PRODUCT_IMAGES.bettergoodsCarrotJuice, name: 'Bettergoods Carrot Juice', priceDollars: '4', priceCents: '66', quantity: 1, sizeLabel: '5 oz' },
];

/* ── Condensed Tile (3-column view) ── */
function CondensedTile({ item }: { item: ProductItem }) {
  return (
    <div className={styles.tile}>
      <div className={styles.tileImageArea}>
        <div className={styles.tileImageWrap}>
          <img src={item.image} alt={item.name} className={styles.tileImage} />
          <div className={styles.quantityBadge}>
            <span className={styles.quantityText}>{item.quantity}</span>
            <span className={styles.quantityText} style={{ width: 6 }}>x</span>
          </div>
        </div>
      </div>
      <div className={styles.priceRow}>
        <span className={styles.priceDollar}>$</span>
        <span className={styles.priceWhole}>{item.priceDollars}</span>
        <span className={styles.priceCents}>{item.priceCents}</span>
      </div>
    </div>
  );
}

/* ── Edit Tile (2-column view) ── */
function EditTile({
  item,
  onIncrement,
  onDecrement,
}: {
  item: ProductItem;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className={styles.editTile}>
      <div className={styles.editImageArea}>
        <div className={styles.editImageWrap}>
          <img src={item.image} alt={item.name} className={styles.editImage} />
          <button type="button" className={styles.circleSelector} aria-label="Select item">
            <Circle style={{ width: 24, height: 24, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
          </button>
        </div>
      </div>
      <div className={styles.priceRow}>
        <span className={styles.priceDollar}>$</span>
        <span className={styles.priceWhole}>{item.priceDollars}</span>
        <span className={styles.priceCents}>{item.priceCents}</span>
        {item.sizeLabel && (
          <div className={styles.sizeTag}>
            <span className={styles.sizeTagText}>{item.sizeLabel}</span>
          </div>
        )}
      </div>
      <div className={styles.editName}>{item.name}</div>
      <div className={styles.quantityStepper}>
        <button type="button" className={styles.stepperBtn} onClick={onDecrement} aria-label="Decrease quantity">
          <Minus style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
        </button>
        <span className={styles.stepperCount}>{item.quantity}</span>
        <button type="button" className={styles.stepperBtn} onClick={onIncrement} aria-label="Increase quantity">
          <Plus style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
        </button>
      </div>
    </div>
  );
}

/* ── View modes ── */
export type GridView = 'browse' | 'edit' | 'confirm' | 'terms';

interface ReplenishProductGridProps {
  deliveryDay: string;
  deliveryTime: string;
  view: GridView;
  items: ProductItem[];
  onClose: () => void;
  onEdit: () => void;
  onAddToDelivery: () => void;
  onSave: () => void;
  onConfirmWeekly: () => void;
  onDecline: () => void;
  onAgree: () => void;
  onUpdateItem: (id: string, qty: number) => void;
}

export function ReplenishProductGrid({
  deliveryDay,
  deliveryTime,
  view,
  items,
  onClose,
  onEdit,
  onAddToDelivery,
  onSave,
  onConfirmWeekly,
  onDecline,
  onAgree,
  onUpdateItem,
}: ReplenishProductGridProps) {
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(`${item.priceDollars}.${item.priceCents}`);
    return sum + price * item.quantity;
  }, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Build rows for condensed view (3 cols)
  const condensedRows: ProductItem[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    condensedRows.push(items.slice(i, i + 3));
  }

  // Build rows for edit view (2 cols)
  const editRows: ProductItem[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    editRows.push(items.slice(i, i + 2));
  }

  const isEditMode = view === 'edit';
  const showOverlay = view === 'confirm' || view === 'terms';

  return (
    <div className={pageStyles.section}>
      {/* Header */}
      <div className={pageStyles.header}>
        <div className={pageStyles.headerText}>
          <div className={pageStyles.headerTitle}>
            Shop easily with items you buy often
          </div>
          <span className={pageStyles.headerSubtext}>
            Get it by{' '}
            <span className={pageStyles.headerSubtextLink}>
              {deliveryDay}, {deliveryTime}
            </span>
          </span>
        </div>
        <button type="button" className={pageStyles.closeButton} onClick={onClose} aria-label="Close">
          <X style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
        </button>
      </div>

      {/* Product content area */}
      <div className={styles.contentProducts}>
        {isEditMode ? (
          /* Edit mode — 2-column expanded tiles */
          <div className={styles.editContent}>
            {editRows.map((row, rowIdx) => (
              <div key={rowIdx} className={styles.editRow}>
                {row.map((item) => (
                  <EditTile
                    key={item.id}
                    item={item}
                    onIncrement={() => onUpdateItem(item.id, item.quantity + 1)}
                    onDecrement={() => onUpdateItem(item.id, Math.max(0, item.quantity - 1))}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* Browse mode — 3-column condensed tiles */
          <div className={styles.contentInner}>
            {condensedRows.map((row, rowIdx) => (
              <div key={rowIdx} className={styles.productRow}>
                {row.map((item) => (
                  <CondensedTile key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Overlay for confirm/terms views */}
        {showOverlay && <div className={styles.overlay} />}
      </div>

      {/* Footer area — varies by view */}
      {view === 'browse' && (
        <BrowseFooter onEdit={onEdit} onAddToDelivery={onAddToDelivery} deliveryDay={deliveryDay} />
      )}
      {view === 'edit' && (
        <EditFooter
          onSave={onSave}
          onAddToDelivery={onAddToDelivery}
          deliveryDay={deliveryDay}
          itemCount={itemCount}
          totalPrice={totalPrice}
        />
      )}
      {view === 'confirm' && (
        <ConfirmFooter
          itemCount={itemCount}
          totalPrice={totalPrice}
          deliveryDay={deliveryDay}
          onConfirmWeekly={onConfirmWeekly}
          onDecline={onDecline}
        />
      )}
      {view === 'terms' && (
        <TermsFooter onAgree={onAgree} onDecline={onDecline} />
      )}
    </div>
  );
}

/* ── Browse Footer ── */
function BrowseFooter({
  onEdit,
  onAddToDelivery,
  deliveryDay,
}: {
  onEdit: () => void;
  onAddToDelivery: () => void;
  deliveryDay: string;
}) {
  return (
    <div className={pageStyles.footerSection}>
      <div className={pageStyles.floatingFooter}>
        <Button variant="secondary" size="medium" onClick={onEdit}>
          Edit
        </Button>
        <div style={{ flex: 1 }}>
          <Button variant="primary" size="medium" isFullWidth onClick={onAddToDelivery}>
            Add to {deliveryDay} delivery
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Edit Footer ── */
function EditFooter({
  onSave,
  onAddToDelivery,
  deliveryDay,
  itemCount,
  totalPrice,
}: {
  onSave: () => void;
  onAddToDelivery: () => void;
  deliveryDay: string;
  itemCount: number;
  totalPrice: number;
}) {
  return (
    <div className={pageStyles.footerSection}>
      <div className={pageStyles.floatingFooter}>
        <Button variant="secondary" size="medium" onClick={onSave}>
          Save
        </Button>
        <div style={{ flex: 1 }}>
          <Button variant="primary" size="medium" isFullWidth onClick={onAddToDelivery}>
            Add to {deliveryDay} delivery
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Confirm Footer (Replenish 1.3) ── */
function ConfirmFooter({
  itemCount,
  totalPrice,
  deliveryDay,
  onConfirmWeekly,
  onDecline,
}: {
  itemCount: number;
  totalPrice: number;
  deliveryDay: string;
  onConfirmWeekly: () => void;
  onDecline: () => void;
}) {
  return (
    <div className={styles.confirmSection}>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Estimated total</span>
        <span className={styles.summaryLabel}>({itemCount} items)</span>
        <span className={styles.summaryLabel}>:</span>
        <span className={styles.summaryPrice}>${totalPrice.toFixed(2)}</span>
        <div style={{ flex: 1 }} />
        <Button variant="tertiary" size="small" onClick={() => {}}>
          Edit
        </Button>
      </div>
      <p className={styles.confirmText}>
        <span className={styles.confirmTextBold}>Get your usuals delivered every {deliveryDay}.</span>{' '}
        You can add items, edit, or pause anytime.
      </p>
      <div className={styles.confirmButtons}>
        <Button variant="primary" size="medium" isFullWidth onClick={onConfirmWeekly}>
          Yes, do it every week
        </Button>
        <Button variant="tertiary" size="medium" isFullWidth onClick={onDecline}>
          Not right now
        </Button>
      </div>
    </div>
  );
}

/* ── Terms Footer (Replenish 1.4) ── */
function TermsFooter({
  onAgree,
  onDecline,
}: {
  onAgree: () => void;
  onDecline: () => void;
}) {
  return (
    <div className={styles.termsSection}>
      <p className={styles.termsText}>
        By tapping &quot;I agree&quot;, you accept the{' '}
        <span className={styles.termsLink}>Terms &amp; Conditions</span>{' '}
        for recurring delivery. You can modify or cancel anytime from your account settings.
      </p>
      <div className={styles.termsButtons}>
        <Button variant="primary" size="medium" isFullWidth onClick={onAgree}>
          I agree
        </Button>
        <Button variant="tertiary" size="medium" isFullWidth onClick={onDecline}>
          Not right now
        </Button>
      </div>
    </div>
  );
}

export { DEFAULT_ITEMS };
