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
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F8206c77074484a9197d83dc1e2877e26?format=webp&width=800&height=1200',
    price: '5', cents: '29', tag: '64 fl oz', name: 'Oatly Oat Milk, 64 fl oz', quantity: 2,
  },
  {
    id: '8',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F759d48cc33124307ac4a02f0d3b37c71?format=webp&width=800&height=1200',
    price: '3', cents: '98', tag: '12 fl oz', name: 'bettergoods Cold Pressed Carrot Juice, 12 fl oz', quantity: 1,
  },
  {
    id: '9',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F0a07a194a7d8492fa5350edb76b4cb95?format=webp&width=800&height=1200',
    price: '4', cents: '98', tag: '9.5 oz', name: 'SkinnyPop Popcorn, Sharing Size, 9.5 oz', quantity: 3,
  },
  {
    id: '10',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff5cf2e5441634561b83ce4c2a6ea857a?format=webp&width=800&height=1200',
    price: '9', cents: '98', tag: '4 ct', name: 'Starbucks Dark Roast Coffee, 4 ct', quantity: 2,
  },
  {
    id: '11',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F1691325df52f44e7a21734ca9ae15151?format=webp&width=800&height=1200',
    price: '3', cents: '48', tag: '12 oz', name: 'bettergoods Mac & Cheese, 12 oz', quantity: 1,
  },
  {
    id: '12',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F55aec88f3658458a885d94e858dcd7a6?format=webp&width=800&height=1200',
    price: '3', cents: '98', tag: '6 ct', name: 'bettergoods Cage Free Large Eggs, 6 ct', quantity: 1,
  },
];

// ─── NeedAnythingElse data ────────────────────────────────────────────────────

interface NeedAnythingCategoryItem {
  image: string;
  price: string;
  cents: string;
  tag: string;
}

interface NeedAnythingCategory {
  id: string;
  headline: string;
  bgColor: string;
  headlineColor: string;
  bgImage: string;
  items: NeedAnythingCategoryItem[];
}

const NEED_ANYTHING_CATEGORIES: NeedAnythingCategory[] = [
  {
    id: 'valentines',
    headline: 'Fun V-day treats for the whole class',
    bgColor: 'rgba(255, 210, 227, 0.8)',
    headlineColor: '#5C0A3E',
    bgImage: 'https://images.pexels.com/photos/4887162/pexels-photo-4887162.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    items: [
      { image: REPLENISH_ITEMS[8].image, price: '3', cents: '25', tag: '5 oz' },
      { image: REPLENISH_ITEMS[5].image, price: '3', cents: '25', tag: '5 oz' },
      { image: REPLENISH_ITEMS[10].image, price: '3', cents: '25', tag: '5 oz' },
    ],
  },
  {
    id: 'meals',
    headline: 'Enjoy quick and easy meals',
    bgColor: 'rgba(255, 232, 190, 0.8)',
    headlineColor: '#5C3D0A',
    bgImage: 'https://images.pexels.com/photos/36480176/pexels-photo-36480176.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    items: [
      { image: REPLENISH_ITEMS[10].image, price: '0', cents: '90', tag: '5 oz' },
      { image: REPLENISH_ITEMS[7].image, price: '1', cents: '46', tag: '5 oz' },
      { image: REPLENISH_ITEMS[6].image, price: '8', cents: '66', tag: '5 oz' },
    ],
  },
  {
    id: 'pet',
    headline: 'Spoil Luna with love & treats',
    bgColor: 'rgba(220, 200, 170, 0.8)',
    headlineColor: '#3D2A0A',
    bgImage: 'https://images.pexels.com/photos/20871530/pexels-photo-20871530.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    items: [
      { image: REPLENISH_ITEMS[9].image, price: '5', cents: '98', tag: '5 oz' },
      { image: REPLENISH_ITEMS[4].image, price: '7', cents: '65', tag: '5 oz' },
      { image: REPLENISH_ITEMS[3].image, price: '8', cents: '58', tag: '5 oz' },
    ],
  },
  {
    id: 'cleaning',
    headline: 'Start spring cleaning early',
    bgColor: 'rgba(190, 230, 205, 0.8)',
    headlineColor: '#0A3D1A',
    bgImage: 'https://images.pexels.com/photos/3854583/pexels-photo-3854583.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    items: [
      { image: REPLENISH_ITEMS[4].image, price: '9', cents: '30', tag: '5 oz' },
      { image: REPLENISH_ITEMS[3].image, price: '0', cents: '33', tag: '5 oz' },
      { image: REPLENISH_ITEMS[1].image, price: '6', cents: '24', tag: '5 oz' },
    ],
  },
  {
    id: 'birthday',
    headline: "Celebrate Ellie's 8th birthday on Feb 16",
    bgColor: 'rgba(255, 248, 180, 0.8)',
    headlineColor: '#3D3A0A',
    bgImage: 'https://images.pexels.com/photos/9405268/pexels-photo-9405268.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    items: [
      { image: REPLENISH_ITEMS[11].image, price: '6', cents: '91', tag: '5 oz' },
      { image: REPLENISH_ITEMS[8].image, price: '3', cents: '25', tag: '5 oz' },
      { image: REPLENISH_ITEMS[0].image, price: '3', cents: '25', tag: '5 oz' },
    ],
  },
];

type ReplenishScreen = 'loading' | 'overview' | 'edit' | 'needAnythingElse';
type FooterMode = 'default' | 'optin' | 'terms';

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

// ─── Shared inline footer cards ───────────────────────────────────────────────

interface InlineOptinCardProps {
  onYes: () => void;
  onNotNow: () => void;
}

function InlineOptinCard({ onYes, onNotNow }: InlineOptinCardProps) {
  return (
    <div className={styles.inlineFooterCard}>
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
  );
}

interface InlineTermsCardProps {
  onAgree: () => void;
  onNotNow: () => void;
}

function InlineTermsCard({ onAgree, onNotNow }: InlineTermsCardProps) {
  return (
    <div className={styles.inlineFooterCard}>
      <div className={styles.termsCard}>
        <div className={styles.termsTitle}>Review the terms and conditions</div>
        <div className={styles.termsBody}>
          By selecting &ldquo;I agree&rdquo;, you agree that your auto-reorder(s) will begin when
          you place your order and renew on a recurring basis at the chosen frequency on your
          scheduled day and time. We&apos;ll charge you the price then in effect, plus taxes. To
          avoid charges, pause in Auto-reorder 3 days before your delivery day. To pause, go to
          Account &gt; My items &gt; Auto-reorder &gt; Pause. If your payment method is ineligible,
          we&apos;ll charge any on file.
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
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.headerTitle}>Shop easily with items you buy often</div>
          <div className={styles.headerSubtitle}>
            Get it by <span>Friday, 4pm</span>
          </div>
        </div>
      </div>

      <div className={styles.screenContent}>
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

          <div className={styles.stepAnimationWrap}>
            <StepAnimation />
          </div>
        </div>

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
  onAgree: () => void;
}

function OverviewScreen({ items, onClose, onEdit, onAgree }: OverviewScreenProps) {
  const [footerMode, setFooterMode] = useState<FooterMode>('default');

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

          <div className={styles.totalRow}>
            <div className={styles.totalLeft}>
              <span className={styles.totalLabel}>Est. total</span>
              <span className={styles.totalCount}>({items.length} items)</span>
              <span className={styles.totalColon}>:</span>
            </div>
            <span className={styles.totalAmount}>${dollars}.{cents}</span>
          </div>
        </div>

        {footerMode === 'default' && (
          <div className={styles.footer}>
            <div className={styles.footerBar}>
              <Button variant="secondary" size="medium" onClick={onEdit}>
                Edit
              </Button>
              <Button variant="primary" size="medium" strokeOn onClick={() => setFooterMode('optin')}>
                Add to Friday delivery
              </Button>
            </div>
          </div>
        )}

        {footerMode === 'optin' && (
          <InlineOptinCard
            onYes={() => setFooterMode('terms')}
            onNotNow={onClose}
          />
        )}

        {footerMode === 'terms' && (
          <InlineTermsCard
            onAgree={onAgree}
            onNotNow={onClose}
          />
        )}
      </div>
    </div>
  );
}

// ─── Edit Screen ──────────────────────────────────────────────────────────────

interface EditScreenProps {
  items: ReplenishItem[];
  onClose: () => void;
  onSave: () => void;
  onAgree: () => void;
  onQuantityChange: (id: string, q: number) => void;
}

function EditScreen({ items, onClose, onSave, onAgree, onQuantityChange }: EditScreenProps) {
  const [footerMode, setFooterMode] = useState<FooterMode>('default');

  return (
    <div className={styles.section}>
      <ReplenishHeader onClose={onClose} />

      <div className={styles.screenContent}>
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

        {footerMode === 'default' && (
          <div className={styles.footer}>
            <div className={styles.footerBar}>
              <Button variant="secondary" size="medium" onClick={onSave}>
                Save
              </Button>
              <Button variant="primary" size="medium" onClick={() => setFooterMode('optin')}>
                Add to Friday delivery
              </Button>
            </div>
          </div>
        )}

        {footerMode === 'optin' && (
          <InlineOptinCard
            onYes={() => setFooterMode('terms')}
            onNotNow={onClose}
          />
        )}

        {footerMode === 'terms' && (
          <InlineTermsCard
            onAgree={onAgree}
            onNotNow={onClose}
          />
        )}
      </div>
    </div>
  );
}

// ─── Need Anything Else Screen ────────────────────────────────────────────────

interface NeedAnythingElseScreenProps {
  onClose: () => void;
}

function NeedAnythingElseMiniTile({ image, price, cents, tag }: NeedAnythingCategoryItem) {
  return (
    <div className={styles.naMiniTile}>
      <div className={styles.naMiniTileImageWrap}>
        <img src={image} alt="Product" className={styles.naMiniTileImage} />
        <button
          type="button"
          className={styles.naMiniTileAddBtn}
          aria-label="Add to cart"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M7.5 8.5V13H8.5V8.5H13V7.5H8.5V3H7.5V7.5H3V8.5H7.5Z" fill="currentColor" />
          </svg>
        </button>
      </div>
      <div className={styles.naMiniTilePrice}>
        <span className={styles.naMiniTileDollar}>$</span>
        <span className={styles.naMiniTilePriceNum}>{price}</span>
        <span className={styles.naMiniTileCents}>{cents}</span>
      </div>
      <div className={styles.naMiniTileTag}>{tag}</div>
    </div>
  );
}

function NeedAnythingElseScreen({ onClose }: NeedAnythingElseScreenProps) {
  return (
    <div className={styles.naSection}>
      {/* Header */}
      <div className={styles.naHeader}>
        <div className={styles.naHeaderTitle}>Need anything else?</div>
        <div className={styles.naHeaderActions}>
          <button type="button" className={styles.naIconBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M13.4762 12.6191L17.5 16.6429M8.57143 14.2857C11.7264 14.2857 14.2857 11.7264 14.2857 8.57143C14.2857 5.41649 11.7264 2.85714 8.57143 2.85714C5.41649 2.85714 2.85714 5.41649 2.85714 8.57143C2.85714 11.7264 5.41649 14.2857 8.57143 14.2857Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button type="button" className={styles.naIconBtn} onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M7.85355 8.72082L12 12.8673L12.7071 12.1602L8.56066 8.01371L12.7071 3.86726L12 3.16016L7.85355 7.3066L3.70711 3.16016L3 3.86726L7.14645 8.01371L3 12.1602L3.70711 12.8673L7.85355 8.72082Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable category rows */}
      <div className={styles.naCategoryList}>
        {NEED_ANYTHING_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={styles.naCategoryCard}
            style={{ backgroundColor: cat.bgColor }}
          >
            {/* Decorative background image */}
            <img
              src={cat.bgImage}
              alt=""
              aria-hidden="true"
              className={styles.naCategoryBgImage}
            />

            {/* Category headline + chevron */}
            <div className={styles.naCategoryTop}>
              <div
                className={styles.naCategoryHeadline}
                style={{ color: cat.headlineColor }}
              >
                {cat.headline}
              </div>
              <button
                type="button"
                className={styles.naCategoryChevron}
                aria-label={`See all ${cat.headline}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 3L10.5 8L6 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Mini product tiles */}
            <div className={styles.naMiniTileRow}>
              {cat.items.map((item, idx) => (
                <NeedAnythingElseMiniTile key={idx} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating footer */}
      <div className={styles.naFooter}>
        <div className={styles.naFooterBar}>
          <Button variant="secondary" size="medium">
            <span className={styles.naFooterBtnContent}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.375 5.25V18.75H8.625V5.25H6.375Z" fill="currentColor" />
                <path d="M15.375 5.25V18.75H17.625V5.25H15.375Z" fill="currentColor" />
              </svg>
              Pause delivery
            </span>
          </Button>
          <Button variant="secondary" size="medium" UNSAFE_className={styles.naFooterGetItNow}>
            <span className={styles.naFooterBtnContent}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6.56588 1.25193C6.6549 1.09614 6.82057 1 7 1H11C11.1772 1 11.3411 1.09375 11.4309 1.24644C11.5208 1.39912 11.5231 1.58796 11.4371 1.74282L9.34975 5.5H13C13.1935 5.5 13.3696 5.61163 13.4522 5.7866C13.5347 5.96158 13.509 6.1685 13.386 6.31785L6.38596 14.8178C6.22841 15.0092 5.95447 15.0562 5.74213 14.9284C5.52979 14.8005 5.44314 14.5365 5.53846 14.3077L7.75 9H3C2.82176 9 2.65701 8.90512 2.56754 8.75096C2.47808 8.5968 2.47745 8.40668 2.56588 8.25193L6.56588 1.25193Z" fill="currentColor" />
              </svg>
              <span className={styles.naFooterGetItNowLabel}>
                <span>Get it now</span>
                <span className={styles.naFooterSubLabel}>as soon as 37 mins</span>
              </span>
            </span>
          </Button>
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setScreen('loading');
      setIsExiting(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (screen !== 'loading') return;
    loadingTimerRef.current = setTimeout(() => {
      setScreen('overview');
    }, STEP_TOTAL_DURATION);
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, [screen]);

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
          onAgree={() => setScreen('needAnythingElse')}
        />
      )}

      {screen === 'edit' && (
        <EditScreen
          items={items}
          onClose={handleClose}
          onSave={() => setScreen('overview')}
          onAgree={() => setScreen('needAnythingElse')}
          onQuantityChange={handleQuantityChange}
        />
      )}

      {screen === 'needAnythingElse' && (
        <NeedAnythingElseScreen onClose={handleClose} />
      )}

      {platform === 'ios' && <div className={styles.homeIndicator} />}
      {platform === 'android' && <div className={styles.androidNavBar}><div className={styles.androidGestureBar} /></div>}
    </div>,
    document.body
  );
}
