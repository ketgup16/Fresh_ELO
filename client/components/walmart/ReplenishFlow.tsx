import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { CondensedItemTile } from './CondensedItemTile';
import { StepAnimation, STEP_TOTAL_DURATION } from './StepAnimation';
import { NativeStatusBar } from './NativeStatusBar';
import { CartFill } from '@/components/icons';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import styles from './ReplenishFlow.module.css';

// ─── Demo data ────────────────────────────────────────────────────────────────

interface ReplenishItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  tag: string;
  name: string;
  quantity: number;
}

const REPLENISH_ITEMS: ReplenishItem[] = [
  {
    id: '1',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa15cb75189e0433a8216488ded94874b?format=webp&width=800&height=1200',
    price: '0', cents: '58', tag: '1 lb', name: 'Fresh Bananas, Each', quantity: 2,
  },
  {
    id: '2',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F76eb5fcd25004ac295b4b7380eee76d8?format=webp&width=800&height=1200',
    price: '4', cents: '98', tag: '1 gal', name: 'Crystal Whole Milk, 1 gal', quantity: 1,
  },
  {
    id: '3',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F1f722edca31f4864b8cf7cd2bbef3ca3?format=webp&width=800&height=1200',
    price: '5', cents: '48', tag: '18 ct', name: 'Marketside Cage Free Large Brown Eggs, 18 ct', quantity: 1,
  },
  {
    id: '4',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc6ad243f2d7d4a989d11c62a16c21b9b?format=webp&width=800&height=1200',
    price: '13', cents: '97', tag: '50 fl oz', name: 'Dreft Stage 1 Baby Laundry Detergent, 50 fl oz', quantity: 1,
  },
  {
    id: '5',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc4898f852f7943649ef09692a0a725f2?format=webp&width=800&height=1200',
    price: '9', cents: '97', tag: '6 ct', name: 'Viva Multi-Surface Paper Towels, Double Rolls, 6 ct', quantity: 2,
  },
  {
    id: '6',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F144d176390c64a69a84480e3588843d0?format=webp&width=800&height=1200',
    price: '7', cents: '48', tag: '20 ct', name: 'Ritz Crackers, Original, 20 Snack Packs', quantity: 1,
  },
  {
    id: '7',
    image: '/assets/products/blueberries.jpg',
    price: '3', cents: '48', tag: '6 oz', name: 'Fresh Blueberries, 6 oz', quantity: 2,
  },
  {
    id: '8',
    image: '/assets/products/oranges.jpg',
    price: '4', cents: '97', tag: '3 lb', name: 'Fresh Navel Oranges, 3 lb Bag', quantity: 1,
  },
  {
    id: '9',
    image: '/assets/products/tomato.jpg',
    price: '1', cents: '24', tag: '1 lb', name: 'Fresh Tomatoes on the Vine, 1 lb', quantity: 3,
  },
  {
    id: '10',
    image: '/assets/products/watering-can.jpg',
    price: '12', cents: '97', tag: '1.3 gal', name: 'Better Homes & Gardens Watering Can, 1.3 gal', quantity: 1,
  },
  {
    id: '11',
    image: '/assets/products/blueberries.jpg',
    price: '3', cents: '48', tag: '6 oz', name: 'Fresh Blueberries, 6 oz', quantity: 1,
  },
  {
    id: '12',
    image: '/assets/products/oranges.jpg',
    price: '4', cents: '97', tag: '3 lb', name: 'Fresh Navel Oranges, 3 lb Bag', quantity: 2,
  },
];

type ReplenishScreen = 'loading' | 'overview' | 'edit' | 'optin' | 'terms';

// ─── Sub-components ────────────────────────────────────────────────────────────

interface ReplenishHeaderProps {
  onClose: () => void;
}

function ReplenishHeader({ onClose }: ReplenishHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <div className={styles.headerTitle}>Shop easily with items you buy often</div>
        <div className={styles.headerSubtitle}>
          Get it by <span>Friday, 4pm</span>
        </div>
      </div>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.85355 8.72082L12 12.8673L12.7071 12.1602L8.56066 8.01371L12.7071 3.86726L12 3.16016L7.85355 7.3066L3.70711 3.16016L3 3.86726L7.14645 8.01371L3 12.1602L3.70711 12.8673L7.85355 8.72082Z"
            fill="#2E2F32"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className={styles.section}>
      {/* Loading header (no close button on loading screen) */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.headerTitle}>Shop easily with items you buy often</div>
          <div className={styles.headerSubtitle}>
            Get it by <span>Friday, 4pm</span>
          </div>
        </div>
      </div>

      <div className={styles.screenContent}>
        {/* Product card with faded grid + StepAnimation overlay */}
        <div className={styles.productCard}>
          <div className={styles.condensedGrid}>
            {REPLENISH_ITEMS.map((item) => (
              <CondensedItemTile
                key={item.id}
                image={item.image}
                price={item.price}
                cents={item.cents}
                tag={item.tag}
                variant="tertiary"
                loading
              />
            ))}
          </div>

          {/* StepAnimation centered over the grid */}
          <div className={styles.stepAnimationWrap}>
            <StepAnimation />
          </div>
        </div>

        {/* Skeleton pill footer — same slot as real footer */}
        <div className={styles.footer}>
          <div className={styles.skeletonPill}>
            <div className={styles.skeletonBar} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Overview Screen ──────────────────────────────────────────────────────────

interface OverviewScreenProps {
  items: ReplenishItem[];
  onClose: () => void;
  onEdit: () => void;
  onAddToDelivery: () => void;
}

function OverviewScreen({ items, onClose, onEdit, onAddToDelivery }: OverviewScreenProps) {
  const total = items.reduce(
    (sum, item) => sum + (parseInt(item.price) * 100 + parseInt(item.cents)) * item.quantity,
    0
  );
  const dollars = Math.floor(total / 100);
  const cents = (total % 100).toString().padStart(2, '0');

  return (
    <div className={styles.section}>
      <ReplenishHeader onClose={onClose} />

      <div className={styles.screenContent}>
        {/* Scrollable product card */}
        <div className={styles.productCard}>
          <div className={styles.cardScroll}>
            <div className={styles.condensedGrid}>
              {items.map((item) => (
                <CondensedItemTile
                  key={item.id}
                  image={item.image}
                  price={item.price}
                  cents={item.cents}
                  tag={item.tag}
                  variant="tertiary"
                  onAddToCart={() => {}}
                />
              ))}
            </div>
          </div>
          <div className={styles.cardScrollFade} />

          {/* Est. total row at bottom of card */}
          <div className={styles.totalRow}>
            <div className={styles.totalLeft}>
              <span className={styles.totalLabel}>Est. total</span>
              <span className={styles.totalCount}>({items.length} items)</span>
              <span className={styles.totalColon}>:</span>
            </div>
            <span className={styles.totalAmount}>${dollars}.{cents}</span>
            <Button
              variant="tertiary"
              size="small"
              onClick={onEdit}
            >
              Edit
            </Button>
          </div>
        </div>

        {/* Floating footer */}
        <div className={styles.footer}>
          <div className={styles.footerBar}>
            <Button variant="secondary" size="medium" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="primary" size="medium" strokeOn onClick={onAddToDelivery}>
              Add to Friday delivery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Screen ──────────────────────────────────────────────────────────────

interface EditScreenProps {
  items: ReplenishItem[];
  onClose: () => void;
  onSave: () => void;
  onAddToDelivery: () => void;
  onQuantityChange: (id: string, q: number) => void;
}

function EditScreen({ items, onClose, onSave, onAddToDelivery, onQuantityChange }: EditScreenProps) {
  return (
    <div className={styles.section}>
      <ReplenishHeader onClose={onClose} />

      <div className={styles.screenContent}>
        {/* Scrollable 2-col edit grid */}
        <div className={styles.productCard}>
          <div className={styles.cardScroll}>
            <div className={styles.editGrid}>
              {items.map((item) => (
                <CondensedItemTile
                  key={item.id}
                  image={item.image}
                  price={item.price}
                  cents={item.cents}
                  tag={item.tag}
                  name={item.name}
                  variant="edit"
                  quantity={item.quantity}
                  isChecked
                  onQuantityChange={(q) => onQuantityChange(item.id, q)}
                />
              ))}
            </div>
          </div>
          <div className={styles.cardScrollFade} />
        </div>

        {/* Floating footer */}
        <div className={styles.footer}>
          <div className={styles.footerBar}>
            <Button variant="secondary" size="medium" onClick={onSave}>
              Save
            </Button>
            <Button variant="primary" size="medium" onClick={onAddToDelivery}>
              Add to Friday delivery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Opt-in Screen ────────────────────────────────────────────────────────────

interface OptinScreenProps {
  items: ReplenishItem[];
  onClose: () => void;
  onYes: () => void;
  onNotNow: () => void;
}

function OptinScreen({ items, onClose, onYes, onNotNow }: OptinScreenProps) {
  return (
    <div className={styles.section}>
      <ReplenishHeader onClose={onClose} />

      <div className={styles.screenWithCard}>
        {/* Grid — partial height, scrollable */}
        <div className={styles.screenWithCardGrid}>
          <div className={styles.productCard}>
            <div className={styles.cardScroll}>
              <div className={styles.condensedGrid}>
                {items.map((item) => (
                  <CondensedItemTile
                    key={item.id}
                    image={item.image}
                    price={item.price}
                    cents={item.cents}
                    tag={item.tag}
                    variant="tertiary"
                  />
                ))}
              </div>
            </div>
            <div className={styles.cardScrollFade} />
          </div>
        </div>

        {/* Opt-in card */}
        <div className={styles.screenWithCardFooter}>
          <div className={styles.optinCard}>
            <div className={styles.optinHeader}>
              <div className={styles.optinIconWrap}>
                <CartFill width={20} height={20} />
              </div>
              <div className={styles.optinTextBlock}>
                <div className={styles.optinTitle}>Add your usuals automatically?</div>
                <div className={styles.optinSubtitle}>You can add items, edit, or pause anytime.</div>
              </div>
            </div>
            <div className={styles.optinCtas}>
              <Button variant="primary" size="medium" isFullWidth onClick={onYes}>
                Yes, do it every week
              </Button>
              <Button variant="tertiary" size="medium" isFullWidth onClick={onNotNow}>
                Not right now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Terms Screen ─────────────────────────────────────────────────────────────

interface TermsScreenProps {
  items: ReplenishItem[];
  onClose: () => void;
  onAgree: () => void;
  onNotNow: () => void;
}

function TermsScreen({ items, onClose, onAgree, onNotNow }: TermsScreenProps) {
  return (
    <div className={styles.section}>
      <ReplenishHeader onClose={onClose} />

      <div className={styles.screenWithCard}>
        {/* Grid */}
        <div className={styles.screenWithCardGrid}>
          <div className={styles.productCard}>
            <div className={styles.cardScroll}>
              <div className={styles.condensedGrid}>
                {items.map((item) => (
                  <CondensedItemTile
                    key={item.id}
                    image={item.image}
                    price={item.price}
                    cents={item.cents}
                    tag={item.tag}
                    variant="tertiary"
                  />
                ))}
              </div>
            </div>
            <div className={styles.cardScrollFade} />
          </div>
        </div>

        {/* Terms card */}
        <div className={styles.screenWithCardFooter}>
          <div className={styles.termsCard}>
            <div className={styles.termsTitle}>Review the terms and conditions</div>
            <div className={styles.termsBody}>
              By selecting "I agree", you agree that your auto-reorder(s) will begin when you place
              your order and renew on a recurring basis at the chosen frequency on your scheduled day
              and time. We'll charge you the price then in effect, plus taxes. To avoid charges,
              pause in Auto-reorder 3 days before your delivery day. To pause, go to Account &gt;
              My items &gt; Auto-reorder &gt; Pause. If your payment method is ineligible, we'll
              charge any on file.
            </div>
            <div className={styles.termsCtas}>
              <Button variant="primary" size="medium" isFullWidth onClick={onAgree}>
                I agree
              </Button>
              <Button variant="tertiary" size="medium" isFullWidth onClick={onNotNow}>
                Not right now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ReplenishFlow ────────────────────────────────────────────────────────

interface ReplenishFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReplenishFlow({ isOpen, onClose }: ReplenishFlowProps) {
  const [screen, setScreen] = useState<ReplenishScreen>('loading');
  const [isExiting, setIsExiting] = useState(false);
  const [items, setItems] = useState<ReplenishItem[]>(REPLENISH_ITEMS);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { platform } = useLayoutSettings();
  const isNative = platform === 'ios' || platform === 'android';

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset to loading screen when re-opened
      setScreen('loading');
      setIsExiting(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Auto-advance loading → overview after all 3 frames have been shown
  useEffect(() => {
    if (screen !== 'loading') return;
    loadingTimerRef.current = setTimeout(() => {
      setScreen('overview');
    }, STEP_TOTAL_DURATION);
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, [screen]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 250);
  }, [onClose]);

  const handleQuantityChange = useCallback((id: string, q: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: q } : item));
  }, []);

  if (!isOpen) return null;

  const overlayClass = [styles.overlay, isExiting ? styles.exiting : ''].filter(Boolean).join(' ');

  return createPortal(
    <div
      className={overlayClass}
      role="dialog"
      aria-modal="true"
      aria-label="Your replenishment basket"
    >
      {/* Status bar — same brand bg, dark icons to match light surface */}
      {isNative && (
        <div className={styles.statusBarWrap}>
          <NativeStatusBar
            platform={platform as 'ios' | 'android'}
            color="var(--ld-semantic-color-text, #2E2F32)"
          />
        </div>
      )}

      {screen === 'loading' && <LoadingScreen />}

      {screen === 'overview' && (
        <OverviewScreen
          items={items}
          onClose={handleClose}
          onEdit={() => setScreen('edit')}
          onAddToDelivery={() => setScreen('optin')}
        />
      )}

      {screen === 'edit' && (
        <EditScreen
          items={items}
          onClose={handleClose}
          onSave={() => setScreen('overview')}
          onAddToDelivery={() => setScreen('optin')}
          onQuantityChange={handleQuantityChange}
        />
      )}

      {screen === 'optin' && (
        <OptinScreen
          items={items}
          onClose={handleClose}
          onYes={() => setScreen('terms')}
          onNotNow={handleClose}
        />
      )}

      {screen === 'terms' && (
        <TermsScreen
          items={items}
          onClose={handleClose}
          onAgree={handleClose}
          onNotNow={handleClose}
        />
      )}

      {/* Home indicator — iOS only */}
      {platform === 'ios' && <div className={styles.homeIndicator} />}
      {platform === 'android' && <div className={styles.androidNavBar}><div className={styles.androidGestureBar} /></div>}
    </div>,
    document.body
  );
}
