import { useState, useRef, useCallback } from 'react';
import { Barcode, ChevronDown, ChevronLeft, ChevronUp, Grid, Menu, Placeholder, Search } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { CartIcon, LocationIcon, StoreIcon } from '@/components/icons-custom';
import { CameraModal } from '@/components/walmart/CameraModal';
import { MobileMenuPanel } from '@/components/walmart/MobileMenuPanel';
import { DepartmentsDropdown } from '@/components/walmart/DepartmentsDropdown';
import { ServicesDropdown } from '@/components/walmart/ServicesDropdown';
import { MoreLinksDropdown } from '@/components/walmart/MoreLinksDropdown';
import { SubNavButton } from '@/components/walmart/SubNavButton';
import { SearchTypeaheadModal } from '@/pages/walmart/index/SearchTypeaheadModal';
import { AXSearchBar } from '@/components/walmart/AXSearchBar';
import { useNavigate } from 'react-router-dom';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import { useCart } from '@/contexts/CartContext';
import styles from './MobileTopNav.module.css';

const mobileSecondaryLinks = [
  { label: 'Get it Fast', path: '/get-it-fast' },
  { label: 'Rollbacks & More', path: '/rollbacks' },
  { label: 'Easter', path: '/easter' },
  { label: 'Pharmacy', path: '/pharmacy' },
  { label: 'New Arrivals', path: '/new-arrivals' },
  { label: 'Dinner Made Easy', path: '/dinner-made-easy' },
  { label: 'Walmart+', path: '/walmart-plus' },
];

export type MobileTopNavVariant = 'blue' | 'white';

interface MobileTopNavProps {
  showHomeExtras?: boolean;
  variant?: MobileTopNavVariant;
  pageTitle?: string;
  /** Override the @media (min-width:1024px) display:none — use in docs/demos. */
  forceVisible?: boolean;
  /** Force native app layout regardless of platform context — use in docs/demos. */
  forceNative?: boolean;
  /** Title text shown in native header next to menu button. */
  nativeTitle?: string;
  /** Subtitle shown below title in native header. */
  nativeSubtitle?: string;
  /** Whether to show the subtitle. @default false */
  showNativeSubtitle?: boolean;
  /** Show/hide each of the 3 trailing action icon buttons. Action 1 defaults to true, Actions 2 & 3 default to false. */
  showNativeAction1?: boolean;
  showNativeAction2?: boolean;
  showNativeAction3?: boolean;
  /** Show/hide the AX Search Bar row. @default true */
  showNativeSearchBar?: boolean;
}

export function MobileTopNav({
  showHomeExtras = false,
  variant = 'blue',
  pageTitle,
  forceVisible = false,
  forceNative = false,
  nativeTitle = 'Page Title',
  nativeSubtitle = 'Subtitle',
  showNativeSubtitle = false,
  showNativeAction1 = true,
  showNativeAction2 = false,
  showNativeAction3 = false,
  showNativeSearchBar = true,
}: MobileTopNavProps) {
  const navigate = useNavigate();
  const { platform } = useLayoutSettings();
  const { cartCount, cartPrice } = useCart();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [nativeSearchValue, setNativeSearchValue] = useState('');
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');
  const [showMenuPanel, setShowMenuPanel] = useState(false);

  // Drag-to-scroll for subNav
  const subNavRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, hasDragged: false });

  const onSubNavMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = subNavRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, hasDragged: false };
    el.style.cursor = 'grabbing';
  }, []);

  const onSubNavMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = subNavRef.current;
    if (!el || !dragState.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 4) dragState.current.hasDragged = true;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  }, []);

  const onSubNavMouseUp = useCallback(() => {
    const el = subNavRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = '';
  }, []);

  const onSubNavClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Cancel click if the user dragged more than 4px
    if (dragState.current.hasDragged) e.stopPropagation();
  }, []);

  const isBlue = variant === 'blue';
  const isNative = forceNative || platform === 'ios' || platform === 'android';
  const iconVariant = isBlue ? 'white' : undefined;
  const textColor = isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)';

  // L3 page: show title + back chevron, no search bar
  if (pageTitle) {
    return (
      <>
        <div className={styles.root} style={forceVisible ? { display: 'block' } : undefined}>
          <div className={[styles.l3Bar, isBlue ? styles.l3BarBlue : ''].filter(Boolean).join(' ')}>
            <div className={styles.l3Row}>
              <button
                className={styles.l3BackButton}
                style={{ color: isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)' }}
                aria-label="Go back"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className={styles.l3BackIcon} />
              </button>
              <h1 className={styles.l3Title} style={{ color: isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)' }}>{pageTitle}</h1>
              <CartIcon count={cartCount} price={cartPrice} textColor={isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)'} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`${styles.root} ${isNative && isBlue && showHomeExtras ? styles.rootNativeBlue : ''}`} style={forceVisible ? { display: 'block' } : undefined}>
        {/* === NATIVE HOME LAYOUT === */}
        {isNative && isBlue && showHomeExtras ? (
          <div className={styles.nativeHomeContainer}>
            {/* iOS Status bar: time | dynamic island | status icons */}
            <div className={styles.nativeStatusBar}>
              <span className={styles.nativeStatusTime}>9:41</span>
              <div className={styles.nativeDynamicIsland} />
              <div className={styles.nativeStatusIcons}>
                {/* Cellular signal */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="white" aria-hidden="true">
                  <rect x="0" y="7" width="3" height="5" rx="0.8" />
                  <rect x="4.5" y="5" width="3" height="7" rx="0.8" />
                  <rect x="9" y="2.5" width="3" height="9.5" rx="0.8" />
                  <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                </svg>
                {/* Wi-Fi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M8 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="white"/>
                  <path d="M3.3 5.8A6.7 6.7 0 0 1 8 3.8c1.8 0 3.5.74 4.7 1.98l1.15-1.15A8.35 8.35 0 0 0 8 2.2c-2.3 0-4.38.94-5.88 2.44L3.3 5.8z" fill="white"/>
                  <path d="M.7 3.1A10.5 10.5 0 0 1 8 .5c2.9 0 5.53 1.17 7.45 3.07L16.6 2.4A12.1 12.1 0 0 0 8-.1C4.58-.1 1.5 1.28-.55 3.52L.7 3.1z" fill="white" fillOpacity="0.5"/>
                </svg>
                {/* Battery */}
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>
                  <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="white"/>
                  <path d="M23 4v4c.83-.5 1.5-1.1 1.5-2s-.67-1.5-1.5-2z" fill="white" fillOpacity="0.4"/>
                </svg>
              </div>
            </div>

            {/* Row 1: Header — menu | title+subtitle | action buttons */}
            <div className={styles.nativeHeader}>
              <IconButton
                variant="ghost"
                size="medium"
                aria-label="Menu"
                onClick={() => setShowMenuPanel(true)}
                UNSAFE_style={{ color: 'white' }}
              >
                <Menu />
              </IconButton>

              <div className={styles.nativeTitleArea}>
                <span className={styles.nativeTitleText}>{nativeTitle}</span>
                {showNativeSubtitle && (
                  <span className={styles.nativeSubtitleText}>{nativeSubtitle}</span>
                )}
              </div>

              <div className={styles.nativeActions}>
                {showNativeAction1 && (
                  <IconButton variant="ghost" size="medium" aria-label="Action 1" UNSAFE_style={{ color: 'white' }}>
                    <Placeholder />
                  </IconButton>
                )}
                {showNativeAction2 && (
                  <IconButton variant="ghost" size="medium" aria-label="Action 2" UNSAFE_style={{ color: 'white' }}>
                    <Placeholder />
                  </IconButton>
                )}
                {showNativeAction3 && (
                  <IconButton variant="ghost" size="medium" aria-label="Action 3" UNSAFE_style={{ color: 'white' }}>
                    <Placeholder />
                  </IconButton>
                )}
              </div>
            </div>

            {/* Row 2: AX Search Bar */}
            {showNativeSearchBar && <div className={styles.nativeSearchRow}>
              <AXSearchBar
                value={nativeSearchValue}
                onChange={setNativeSearchValue}
                onBarcodeClick={() => setShowCameraModal(true)}
                showMic={false}
              />
            </div>}
          </div>
        ) : (
          /* === STANDARD TOP BAR (mweb home / non-home / native non-home) === */
          <div className={`${styles.topBar} ${isBlue ? styles.topBarBlue : styles.topBarWhite}`}>
            <div className={styles.topBarRow}>
              {isBlue && !isNative ? (
                <button className="text-white flex-shrink-0" aria-label="Menu" onClick={() => setShowMenuPanel(true)}>
                  <Menu className="w-6 h-6" />
                </button>
              ) : (
                <button
                  className={`flex-shrink-0 ${styles.backButton}`}
                  style={{ color: isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)' }}
                  aria-label="Go back"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft className={isNative ? styles.nativeBackIcon : 'w-6 h-6'} />
                </button>
              )}

              {isBlue && !isNative && (
                <a href="/walmart" className={styles.logoLink} aria-label="Walmart Homepage">
                  <img
                    src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
                    alt="Walmart"
                    className={styles.logoImg}
                  />
                </a>
              )}

              <div
                className={`${styles.searchPill} ${isBlue ? styles.searchPillBlue : styles.searchPillWhite} ${isNative ? styles.searchPillNative : ''}`}
                onClick={() => setShowSearchModal(true)}
              >
                {isNative && (
                  <Search className={styles.nativeSearchIcon} />
                )}
                <span className={styles.searchPillText}>
                  Search Walmart
                </span>
                <div className={styles.searchPillIcons}>
                  {isNative ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowCameraModal(true); }}
                      className={styles.nativeBarcodeBtn}
                      aria-label="Scan barcode"
                    >
                      <Barcode className={styles.nativeBarcodeIcon} />
                    </button>
                  ) : isBlue ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowSearchModal(true); }}
                      className={styles.searchButton}
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowCameraModal(true); }}
                        className={styles.searchPillIconBtn}
                        aria-label="Camera search"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                          <path d="M2 8.5c0-.828.672-1.5 1.5-1.5h2.586a1 1 0 00.707-.293l1.414-1.414A1 1 0 018.914 5h6.172a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H20.5c.828 0 1.5.672 1.5 1.5v10c0 .828-.672 1.5-1.5 1.5h-17c-.828 0-1.5-.672-1.5-1.5v-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowSearchModal(true); }}
                        className={styles.searchPillIconBtn}
                        aria-label="Voice search"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <CartIcon count={cartCount} price={cartPrice} textColor={textColor} />
            </div>
          </div>
        )}

        {/* Pickup or Delivery Banner — homepage only */}
        {showHomeExtras && (
          <div className={`${styles.deliveryBanner} ${isBlue ? styles.deliveryBannerBlue : styles.deliveryBannerWhite}`}>
            {!showDeliveryOptions && (
              <button
                onClick={() => setShowDeliveryOptions(true)}
                className={styles.deliveryButton}
              >
                <div className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                    alt="Global Intent"
                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                  />
                  <span className="text-[14px] font-semibold" style={{ color: textColor }}>
                    {selectedDeliveryOption === 'none' && 'How do you want your items?'}
                    {selectedDeliveryOption === 'delivery' && 'Delivery | 1213 E Trinity Mills Rd'}
                    {selectedDeliveryOption === 'pickup' && 'Pickup | Carrollton Supercenter'}
                    {selectedDeliveryOption === 'shipping' && 'Shipping | 1213 E Trinity Mills Rd'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" style={{ color: textColor }} />
              </button>
            )}

            {showDeliveryOptions && (
              <div className="py-2 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold" style={{ color: textColor }}>How do you want your items?</span>
                  <button
                    onClick={() => setShowDeliveryOptions(false)}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <ChevronUp className="w-4 h-4" style={{ color: textColor }} />
                  </button>
                </div>

                <div className="flex justify-center gap-6">
                  {([
                    { key: 'shipping', label: 'Shipping', icon: '/illustrations/mono-small/fulfillment-shipping.svg' },
                    { key: 'pickup',   label: 'Pickup',   icon: '/illustrations/mono-small/fulfillment-pickup.svg' },
                    { key: 'delivery', label: 'Delivery', icon: '/illustrations/mono-small/fulfillment-delivery.svg' },
                  ] as const).map((method) => (
                    <button
                      key={method.key}
                      className="flex flex-col items-center gap-2"
                      onClick={() => { setSelectedDeliveryOption(method.key); setShowDeliveryOptions(false); }}
                    >
                      <div className={`w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center ${selectedDeliveryOption === method.key ? 'ring-2 ring-white/80' : ''}`}>
                        <img src={method.icon} alt={method.label} className="w-10 h-10 object-contain" />
                      </div>
                      <span className="text-[14px] font-extrabold leading-[17px] text-center" style={{ color: textColor }}>{method.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                    <LocationIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left text-foreground text-[12px] leading-[16px]">
                      1213 E Trinity Mills Rd, Dallas, TX 75220
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                    <StoreIcon className="w-4 h-4 flex-shrink-0 self-start mt-0.5" />
                    <div className="flex-1 text-left flex flex-col gap-1">
                      <span className="text-foreground text-[12px] font-semibold leading-[16px]">Carrollton Supercenter</span>
                      <span className="text-foreground text-[12px] leading-[16px]">1213 E Trinity Mills Rd, Dallas, TX 75220</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {showSearchModal && (
        <SearchTypeaheadModal
          onClose={() => setShowSearchModal(false)}
          onCameraClick={() => { setShowSearchModal(false); setShowCameraModal(true); }}
        />
      )}

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
      />

      <MobileMenuPanel
        isOpen={showMenuPanel}
        onClose={() => setShowMenuPanel(false)}
      />

    </>
  );
}
