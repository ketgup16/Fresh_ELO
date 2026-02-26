import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, ChevronDown } from '@/components/icons';
import {
  SparkyLookingDown, CartIcon,
  FulfillmentShippingIcon, CloseIcon as X,
} from '@/components/icons-custom';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { DesktopGICDropdown } from './DesktopGICDropdown';
import { DesktopSearchTypeahead } from './DesktopSearchTypeahead';
import { ReorderDropdown } from './ReorderDropdown';
import { AccountDropdown } from './AccountDropdown';
import { defaultRecentSearches } from './searchData';
import styles from './DesktopHeader.module.css';

export function DesktopHeader() {
  const navigate = useNavigate();
  const [showGIC, setShowGIC] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTypeahead, setShowTypeahead] = useState(false);
  const [recentSearches, setRecentSearches] = useState(defaultRecentSearches);
  const searchFormRef = useRef<HTMLDivElement>(null);

  const closeTypeahead = useCallback(() => {
    setShowTypeahead(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTypeahead();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeTypeahead]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Walmart Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/walmart');
          }}
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

        {/* Location/Delivery Selector */}
        <section className={styles.gicSection}>
          <button
            type="button"
            className={styles.gicButton}
            onClick={() => setShowGIC(!showGIC)}
          >
            <div className={styles.gicContent}>
              <div className={styles.gicIcon}>
                {selectedDeliveryOption === 'none' && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                    alt="Global Intent"
                    width="40"
                    height="40"
                  />
                )}
                {selectedDeliveryOption === 'delivery' && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff8af2f0cfbbf459b862fcbd867dac70d"
                    alt="Delivery"
                  />
                )}
                {selectedDeliveryOption === 'pickup' && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff91b889ffddd4a669bd5f5ed913c38df"
                    alt="Pickup"
                  />
                )}
                {selectedDeliveryOption === 'shipping' && (
                  <FulfillmentShippingIcon />
                )}
              </div>
              <div className={styles.gicText}>
                <div className={styles.gicLabel}>
                  {selectedDeliveryOption === 'none' && 'Pickup or delivery?'}
                  {selectedDeliveryOption === 'shipping' && 'Shipping'}
                  {selectedDeliveryOption === 'pickup' && 'Pickup'}
                  {selectedDeliveryOption === 'delivery' && 'Delivery'}
                </div>
                <div className={styles.gicSubtext}>
                  {selectedDeliveryOption === 'none' ? (
                    <>
                      <span>21 Los Altos Pl</span>
                      <span className={styles.separator}>•</span>
                      <span className={styles.ellipsis}>Mountain View Supercenter</span>
                    </>
                  ) : selectedDeliveryOption === 'pickup' ? (
                    <span className={styles.ellipsis}>Carrollton Supercenter</span>
                  ) : (
                    <span>3471 Park Ln</span>
                  )}
                </div>
              </div>
              <div className={styles.gicChevron}>
                <ChevronDown />
              </div>
            </div>
          </button>
          <DesktopGICDropdown
            isOpen={showGIC}
            onClose={() => setShowGIC(false)}
            selectedOption={selectedDeliveryOption}
            onSelectOption={setSelectedDeliveryOption}
          />
        </section>

        {/* Search Form */}
        <div
          ref={searchFormRef}
          className={styles.searchFormWrap}
          style={showTypeahead ? {
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'var(--ld-semantic-color-action-focus-outline, #0053E2)',
            borderBottomWidth: 0,
            backgroundColor: 'white',
            padding: '1px',
          } : undefined}
        >
          <form
            action="/walmart/search"
            autoComplete="off"
            role="search"
            aria-label="Walmart Site-Wide"
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/walmart/loading?q=${encodeURIComponent(searchQuery.trim())}`);
              } else {
                navigate('/walmart/search');
              }
              closeTypeahead();
            }}
          >
            <div className={`${styles.searchInputWrap} ${showTypeahead ? styles.searchInputWrapActive : ''}`}>
              <div className={styles.sparkyWrap}><SparkyLookingDown /></div>
              <input
                aria-label="Search"
                name="q"
                placeholder="Search everything at Walmart online and in store"
                type="search"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowTypeahead(true)}
                className={styles.searchInput}
              />
              <div className={styles.searchActions}>
                {searchQuery ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                    className={styles.clearButton}
                  >
                    <X className="w-4 h-4" style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
                  </button>
                ) : (
                  <button
                    aria-label="Search"
                    type="button"
                    onClick={() => setShowTypeahead(true)}
                    className={styles.searchButton}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </form>
          {showTypeahead && (
            <DesktopSearchTypeahead
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
              onClose={closeTypeahead}
            />
          )}
        </div>

        {/* Scrim overlay */}
        {showTypeahead && createPortal(
          <div
            className="fixed inset-0 bg-black/40 z-[99]"
            onClick={closeTypeahead}
          />,
          document.body
        )}

        {/* Navigation */}
        <nav aria-label="Account and Cart" className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.reorderItem}>
              <ReorderDropdown />
            </li>
            <li className={styles.accountItem}>
              <AccountDropdown userName="Hi, Mi H" />
            </li>
            <li className={styles.cartItem}>
              <button
                type="button"
                aria-label="Cart contains 1 item Total Amount $5.00"
                className={styles.cartButton}
                onClick={() => navigate('/cart')}
              >
                <CartIcon count={1} price="$5.00" textColor="var(--ld-semantic-color-top-nav-text-on-fill)" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
