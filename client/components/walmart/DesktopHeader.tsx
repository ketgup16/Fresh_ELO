import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Heart, X } from '@/components/icons';
import {
  SparkyLookingDown, CartIcon,
  FulfillmentShippingIcon, FulfillmentPickupIcon, FulfillmentDeliveryIcon,
  ReorderIcon, ListsIcon, PurchaseHistoryIcon,
} from '@/components/icons-custom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import styles from './DesktopHeader.module.css';

/* ── Shared flyout hook ── */
function useFlyout() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', esc); };
  }, [open]);

  return { open, setOpen, ref };
}

/* ── Delivery Flyout ── */
function DeliveryFlyout({
  selected,
  onSelect,
}: {
  selected: 'none' | 'shipping' | 'pickup' | 'delivery';
  onSelect: (v: 'shipping' | 'pickup' | 'delivery') => void;
}) {
  const { open, setOpen, ref } = useFlyout();

  const deliveryLabels: Record<string, string> = {
    none: 'Pickup or delivery?',
    shipping: 'Shipping',
    pickup: 'Pickup',
    delivery: 'Delivery',
  };

  const options = [
    { key: 'shipping' as const, label: 'Shipping', desc: '21 Los Altos Pl', Icon: FulfillmentShippingIcon },
    { key: 'pickup' as const, label: 'Pickup', desc: 'Mountain View Supercenter', Icon: FulfillmentPickupIcon },
    { key: 'delivery' as const, label: 'Delivery', desc: '21 Los Altos Pl', Icon: FulfillmentDeliveryIcon },
  ];

  return (
    <div ref={ref} className={styles.gicSection}>
      <button
        type="button"
        className={styles.gicButton}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <div className={styles.gicContent}>
          <div className={styles.gicIcon}><FulfillmentShippingIcon /></div>
          <div className={styles.gicText}>
            <div className={styles.gicLabel}>{deliveryLabels[selected]}</div>
            <div className={styles.gicSubtext}>
              <span>21 Los Altos Pl</span>
              <span className={styles.separator}>&#8226;</span>
              <span className={styles.ellipsis}>Mountain View Supercenter</span>
            </div>
          </div>
          <div className={styles.gicChevron}><ChevronDown /></div>
        </div>
      </button>

      {open && (
        <div className={styles.flyout} role="dialog" aria-label="Choose delivery method">
          <div className={styles.flyoutHeader}>
            <span className={styles.flyoutTitle}>How do you want your items?</span>
            <button className={styles.flyoutClose} onClick={() => setOpen(false)} aria-label="Close">
              <X className={styles.flyoutCloseIcon} />
            </button>
          </div>
          <div className={styles.deliveryOptions}>
            {options.map(({ key, label, desc, Icon }) => {
              const isActive = selected === key;
              return (
                <button
                  key={key}
                  className={`${styles.deliveryOption} ${isActive ? styles.deliveryOptionActive : ''}`}
                  onClick={() => { onSelect(key); setOpen(false); }}
                >
                  <div className={styles.deliveryOptionIcon}><Icon /></div>
                  <div className={styles.deliveryOptionLabel}>{label}</div>
                  <div className={styles.deliveryOptionDesc}>{desc}</div>
                </button>
              );
            })}
          </div>
          <div className={styles.flyoutFooter}>
            <span className={styles.flyoutFooterText}>Mountain View, CA 94022</span>
            <button className={styles.flyoutFooterLink}>Change</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── My Items Flyout ── */
function MyItemsFlyout() {
  const { open, setOpen, ref } = useFlyout();
  const navigate = useNavigate();

  const items = [
    { icon: <ReorderIcon width={24} height={24} />, label: 'Reorder', desc: 'Quickly reorder past items', path: '/walmart' },
    { icon: <ListsIcon width={24} height={24} />, label: 'Lists', desc: 'Create and manage lists', path: '/walmart' },
    { icon: <PurchaseHistoryIcon width={24} height={24} />, label: 'Purchase History', desc: 'View past orders', path: '/walmart/purchase-history' },
  ];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className={styles.navButton} onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="dialog">
        <div className={styles.navButtonContent}>
          <div className={styles.navButtonSubtext}>Reorder</div>
          <div className={styles.navButtonLabel}>My Items</div>
        </div>
      </button>

      {open && (
        <div className={styles.flyout} style={{ right: 0, left: 'auto', minWidth: '300px' }} role="dialog" aria-label="My Items">
          <div className={styles.flyoutHeader}>
            <span className={styles.flyoutTitle}>My Items</span>
            <button className={styles.flyoutClose} onClick={() => setOpen(false)} aria-label="Close">
              <X className={styles.flyoutCloseIcon} />
            </button>
          </div>
          <div className={styles.flyoutMenuList}>
            {items.map(({ icon, label, desc, path }) => (
              <button
                key={label}
                className={styles.flyoutMenuItem}
                onClick={() => { navigate(path); setOpen(false); }}
              >
                <div className={styles.flyoutMenuIcon}>{icon}</div>
                <div>
                  <div className={styles.flyoutMenuLabel}>{label}</div>
                  <div className={styles.flyoutMenuDesc}>{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Account Flyout ── */
function AccountFlyout() {
  const { open, setOpen, ref } = useFlyout();
  const navigate = useNavigate();

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className={styles.navButton} onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="dialog">
        <div className={styles.navButtonContent}>
          <div className={styles.navButtonSubtext}>Sign In</div>
          <div className={styles.navButtonLabel}>Account</div>
        </div>
      </button>

      {open && (
        <div className={styles.flyout} style={{ right: 0, left: 'auto', minWidth: '300px' }} role="dialog" aria-label="Account">
          <div className={styles.flyoutHeader}>
            <span className={styles.flyoutTitle}>Account</span>
            <button className={styles.flyoutClose} onClick={() => setOpen(false)} aria-label="Close">
              <X className={styles.flyoutCloseIcon} />
            </button>
          </div>
          <div className={styles.flyoutBody}>
            <Button variant="primary" isFullWidth>Sign In or create account</Button>
          </div>
          <div className={styles.flyoutMenuList}>
            {[
              { label: 'Purchase History', path: '/walmart/purchase-history' },
              { label: 'Walmart+', path: '/walmart' },
              { label: 'Wallet', path: '/walmart' },
              { label: 'Communications & Privacy', path: '/walmart' },
            ].map(({ label, path }) => (
              <button
                key={label}
                className={styles.flyoutMenuItem}
                onClick={() => { navigate(path); setOpen(false); }}
              >
                <div className={styles.flyoutMenuLabel}>{label}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Header ── */
export function DesktopHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/walmart'); }}
          className={styles.logo}
          aria-label="Walmart Homepage"
        >
          <img
            src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
            alt="Walmart"
            width="36"
            height="36"
            className={styles.logoImage}
          />
        </a>

        {/* Delivery selector */}
        <DeliveryFlyout selected={selectedDelivery} onSelect={setSelectedDelivery} />

        {/* Search */}
        <form
          className={styles.searchForm}
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/walmart/search?q=${encodeURIComponent(searchQuery.trim())}`);
            } else {
              navigate('/walmart/search');
            }
          }}
        >
          <div className={styles.searchInputWrap}>
            <div className={styles.sparkyWrap}><SparkyLookingDown /></div>
            <input
              className={styles.searchInput}
              type="search"
              name="q"
              placeholder="Search everything at Walmart online and in store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" className={styles.searchButton} aria-label="Search">
              <Search width={20} height={20} />
            </button>
          </div>
        </form>

        {/* Nav */}
        <nav aria-label="Account and Cart" className={styles.nav}>
          <ul className={styles.navList}>
            <li><MyItemsFlyout /></li>
            <li><AccountFlyout /></li>
            <li>
              <button className={styles.cartButton} onClick={() => navigate('/cart')} aria-label="Cart">
                <CartIcon count={0} price="$0.00" textColor="var(--ld-semantic-color-top-nav-text-on-fill)" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
