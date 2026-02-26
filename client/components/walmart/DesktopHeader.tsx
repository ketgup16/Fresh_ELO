import { useState, useRef, useCallback, useEffect } from 'react';
import { Search, ChevronDown } from '@/components/icons';
import { SparkyLookingDown, CartIcon, FulfillmentShippingIcon } from '@/components/icons-custom';
import { CloseIcon } from '@/components/icons-custom';
import { useNavigate } from 'react-router-dom';
import styles from './DesktopHeader.module.css';

export function DesktopHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');

  const deliveryLabels: Record<string, string> = {
    none: 'Pickup or delivery?',
    shipping: 'Shipping',
    pickup: 'Pickup',
    delivery: 'Delivery',
  };

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
        <section className={styles.gicSection}>
          <button type="button" className={styles.gicButton}>
            <div className={styles.gicContent}>
              <div className={styles.gicIcon}>
                <FulfillmentShippingIcon />
              </div>
              <div className={styles.gicText}>
                <div className={styles.gicLabel}>{deliveryLabels[selectedDelivery]}</div>
                <div className={styles.gicSubtext}>
                  <span>21 Los Altos Pl</span>
                  <span className={styles.separator}>&#8226;</span>
                  <span className={styles.ellipsis}>Mountain View Supercenter</span>
                </div>
              </div>
              <div className={styles.gicChevron}>
                <ChevronDown />
              </div>
            </div>
          </button>
        </section>

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
            <div className={styles.sparkyWrap}>
              <SparkyLookingDown />
            </div>
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
            <li>
              <button className={styles.navButton}>
                <div className={styles.navButtonContent}>
                  <div className={styles.navButtonSubtext}>Reorder</div>
                  <div className={styles.navButtonLabel}>My Items</div>
                </div>
              </button>
            </li>
            <li>
              <button className={styles.navButton}>
                <div className={styles.navButtonContent}>
                  <div className={styles.navButtonSubtext}>Sign In</div>
                  <div className={styles.navButtonLabel}>Account</div>
                </div>
              </button>
            </li>
            <li>
              <button className={styles.cartButton} onClick={() => navigate('/cart')} aria-label="Cart">
                <CartIcon count={0} price="$0.00" textColor="var(--ld-semantic-color-topnav-text)" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
