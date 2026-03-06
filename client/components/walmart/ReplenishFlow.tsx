import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { CondensedItemTile } from './CondensedItemTile';
import { StepAnimation } from './StepAnimation';
import { CartFill } from '@/components/icons';
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
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/f1484020403bddc45dfa804d4e33949478f6895e?width=161',
    price: '1', cents: '25', tag: '5 oz', name: 'Fresh Honeycrisp Apple, Each', quantity: 1,
  },
  {
    id: '2',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/bcac1ec76260b487fdca0da0e986227b0008a4f1?width=161',
    price: '3', cents: '85', tag: '5 oz', name: 'bettergoods Tomato Basil Pasta Sauce', quantity: 4,
  },
  {
    id: '3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/ac05fd7183f5fe71dddb905644af34902c39c8d0?width=161',
    price: '3', cents: '24', tag: '5 oz', name: 'Fresh Strawberries, 1 lb', quantity: 1,
  },
  {
    id: '4',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/323c5117092e03881a4de576391cda6b2b866e1f?width=161',
    price: '8', cents: '86', tag: '5 oz', name: 'Nature Valley Granola, 18 oz', quantity: 5,
  },
  {
    id: '5',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a623c7c97391141ceeff8cb0d7c45f93634735e8?width=161',
    price: '2', cents: '62', tag: '5 oz', name: 'Good Culture Cottage Cheese, 16 oz', quantity: 5,
  },
  {
    id: '6',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/acb5fd24f27c7481379b4e12d10b08353dfc8afe?width=161',
    price: '3', cents: '77', tag: '5 oz', name: 'Kikkoman Soy Sauce, 10 fl oz', quantity: 5,
  },
  {
    id: '7',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '3', cents: '47', tag: '5 oz', name: 'SkinnyPop Popcorn, 4.4 oz', quantity: 2,
  },
  {
    id: '8',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '1', cents: '98', tag: '5 oz', name: 'Vita Coco Coconut Water, 16.9 fl oz', quantity: 4,
  },
  {
    id: '9',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '5', cents: '27', tag: '5 oz', name: 'Oatly Oat Milk, 64 fl oz', quantity: 5,
  },
  {
    id: '10',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '4', cents: '75', tag: '5 oz', name: 'Great Value Large White Eggs, 12 ct', quantity: 4,
  },
  {
    id: '11',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/bcac1ec76260b487fdca0da0e986227b0008a4f1?width=161',
    price: '4', cents: '22', tag: '5 oz', name: 'bettergoods Chocolate Chip Cookies', quantity: 3,
  },
  {
    id: '12',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=161',
    price: '4', cents: '66', tag: '5 oz', name: 'Starbucks Coffee K-Cup Pods', quantity: 3,
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
    <div className={styles.loadingSection}>
      {/* Loading header (no close button on loading screen) */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.headerTitle}>Shop easily with items you buy often</div>
          <div className={styles.headerSubtitle}>
            Get it by <span>Friday, 4pm</span>
          </div>
        </div>
      </div>

      {/* Product card with faded grid + StepAnimation overlay */}
      <div className={styles.loadingCardWrap}>
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

      {/* Skeleton pill footer */}
      <div className={styles.loadingFooter}>
        <div className={styles.skeletonPill}>
          <div className={styles.skeletonBar} />
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

  // Auto-advance loading → overview
  useEffect(() => {
    if (screen !== 'loading') return;
    loadingTimerRef.current = setTimeout(() => {
      setScreen('overview');
    }, 3500);
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
    </div>,
    document.body
  );
}
