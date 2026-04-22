import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Barcode, Chat, ChevronLeft, Grid, Menu, Placeholder, Search } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { CameraModal } from '@/components/walmart/CameraModal';
import { MobileMenuPanel } from '@/components/walmart/MobileMenuPanel';
import { SearchTypeaheadModal } from '@/pages/walmart/index/SearchTypeaheadModal';
import { AXSearchField } from '@/components/walmart/AXSearchField';
import { AXAvatarButton, type AXAvatarIndicatorType, type AXAvatarClockState } from '@/components/walmart/AXAvatarButton';
import { AvatarFallback } from '@/components/walmart/AXAvatar';
import { LinkButton } from '@/components/ui/LinkButton';
import { useNavigate } from 'react-router-dom';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import styles from './MobileTopNav.module.css';

const mobileSecondaryLinks = [
  { label: 'Get it Fast', path: '/get-it-fast' },
  { label: 'Rollbacks & More', path: '/rollbacks' },
  { label: 'Easter', path: '/easter' },
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
  /** Icon node rendered inside action button 1/2/3. Defaults to Placeholder icon. */
  action1Icon?: React.ReactNode;
  action2Icon?: React.ReactNode;
  action3Icon?: React.ReactNode;
  /** Icon node rendered inside the leading menu button. Defaults to Menu icon. */
  menuIcon?: React.ReactNode;
  /** Show an AX Avatar Button as the rightmost trailing element in the native header. @default false */
  showNativeAvatarButton?: boolean;
  /** OS platform — iOS centers the title/subtitle; Android keeps them left-aligned. @default 'ios' */
  nativeOSPlatform?: 'ios' | 'android';
  /** Show a 4th trailing action icon button (tablet only). @default false */
  showNativeAction4?: boolean;
  /** Icon node rendered inside action button 4. Defaults to Placeholder icon. */
  action4Icon?: React.ReactNode;
  /** Whether this is being rendered in the tablet layout. Controls whether iOS centering is applied. @default false */
  isTabletLayout?: boolean;
  /** Initials rendered inside the AX Avatar fallback. @default 'SC' */
  avatarInitials?: string;
  /** Indicator overlay on the avatar. @default 'clock' */
  avatarIndicator?: AXAvatarIndicatorType;
  /** Clock indicator state (only used when avatarIndicator='clock'). @default 'active' */
  avatarClockState?: AXAvatarClockState;
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
  showNativeSearchBar = false,
  action1Icon = <Chat />,
  action2Icon = <Placeholder />,
  action3Icon = <Placeholder />,
  menuIcon = <Menu />,
  showNativeAvatarButton = true,
  nativeOSPlatform = 'ios',
  showNativeAction4 = false,
  action4Icon = <Placeholder />,
  isTabletLayout = false,
  avatarInitials = 'SC',
  avatarIndicator = 'clock',
  avatarClockState = 'active',
}: MobileTopNavProps) {
  const navigate = useNavigate();
  const { platform } = useLayoutSettings();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [nativeSearchValue, setNativeSearchValue] = useState('');
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const menuPortalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAvatarMenu) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inButton = buttonWrapperRef.current?.contains(target);
      const inMenu = menuPortalRef.current?.contains(target);
      if (!inButton && !inMenu) {
        setShowAvatarMenu(false);
        setMenuPos(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showAvatarMenu]);

  // Keep menu anchored to button while scrolling or resizing
  useEffect(() => {
    if (!showAvatarMenu) return;
    const updatePos = () => {
      const rect = buttonWrapperRef.current?.getBoundingClientRect();
      if (rect) {
        setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
      }
    };
    // true = capture phase catches scroll on any ancestor (including the phone frame)
    window.addEventListener('scroll', updatePos, true);
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('scroll', updatePos, true);
      window.removeEventListener('resize', updatePos);
    };
  }, [showAvatarMenu]);

  const handleAvatarClick = useCallback(() => {
    if (showAvatarMenu) {
      setShowAvatarMenu(false);
      setMenuPos(null);
    } else {
      const rect = buttonWrapperRef.current?.getBoundingClientRect();
      if (rect) {
        setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
      }
      setShowAvatarMenu(true);
    }
  }, [showAvatarMenu]);
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
            {/* Status bar — iOS: time | dynamic island | icons; Android: time left | icons right */}
            <div className={`${styles.nativeStatusBar} ${nativeOSPlatform === 'android' ? styles.nativeStatusBarAndroid : ''}`}>
              <span className={`${styles.nativeStatusTime} ${nativeOSPlatform === 'android' ? styles.nativeStatusTimeAndroid : ''}`}>9:41</span>
              {nativeOSPlatform !== 'android' && <div className={styles.nativeDynamicIsland} />}
              <div className={styles.nativeStatusIcons}>
                {nativeOSPlatform === 'android' ? (
                  <>
                    {/* Android: 5G label */}
                    <span className={styles.androidNetworkLabel}>5G</span>
                    {/* Android WiFi — Material style */}
                    <svg width="16" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M1 9l2 2c5.1-5.1 13.9-5.1 19 0l2-2C16.9 2.9 7.1 2.9 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4 2 2a7.074 7.074 0 0 1 10 0l2-2C15.1 9.1 8.9 9.1 5 13z"/>
                    </svg>
                    {/* Android Battery — Material style with nub */}
                    <svg width="14" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                    </svg>
                  </>
                ) : (
                  <>
                    {/* iOS Cellular signal */}
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="white" aria-hidden="true">
                      <rect x="0" y="7" width="3" height="5" rx="0.8" />
                      <rect x="4.5" y="5" width="3" height="7" rx="0.8" />
                      <rect x="9" y="2.5" width="3" height="9.5" rx="0.8" />
                      <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                    </svg>
                    {/* iOS Wi-Fi */}
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                      <path d="M8 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="white"/>
                      <path d="M3.3 5.8A6.7 6.7 0 0 1 8 3.8c1.8 0 3.5.74 4.7 1.98l1.15-1.15A8.35 8.35 0 0 0 8 2.2c-2.3 0-4.38.94-5.88 2.44L3.3 5.8z" fill="white"/>
                      <path d="M.7 3.1A10.5 10.5 0 0 1 8 .5c2.9 0 5.53 1.17 7.45 3.07L16.6 2.4A12.1 12.1 0 0 0 8-.1C4.58-.1 1.5 1.28-.55 3.52L.7 3.1z" fill="white" fillOpacity="0.5"/>
                    </svg>
                    {/* iOS Battery */}
                    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>
                      <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="white"/>
                      <path d="M23 4v4c.83-.5 1.5-1.1 1.5-2s-.67-1.5-1.5-2z" fill="white" fillOpacity="0.4"/>
                    </svg>
                  </>
                )}
              </div>
            </div>

            {/* Row 1: Header — menu | title+subtitle | action buttons */}
            <div className={styles.nativeHeader}>
              <IconButton
                variant="white"
                size="medium"
                aria-label="Menu"
                onClick={() => setShowMenuPanel(true)}
              >
                {menuIcon}
              </IconButton>

              <div className={isTabletLayout && nativeOSPlatform === 'ios' ? styles.nativeTitleAreaCentered : styles.nativeTitleArea}>
                <span className={styles.nativeTitleText}>{nativeTitle}</span>
                {showNativeSubtitle && (
                  <span className={styles.nativeSubtitleText}>{nativeSubtitle}</span>
                )}
              </div>

              <div className={styles.nativeActions}>
                {showNativeAction1 && (
                  <IconButton variant="white" size="medium" aria-label="Action 1">
                    {action1Icon}
                  </IconButton>
                )}
                {showNativeAction2 && (
                  <IconButton variant="white" size="medium" aria-label="Action 2">
                    {action2Icon}
                  </IconButton>
                )}
                {showNativeAction3 && (
                  <IconButton variant="white" size="medium" aria-label="Action 3">
                    {action3Icon}
                  </IconButton>
                )}
                {showNativeAction4 && (
                  <IconButton variant="white" size="medium" aria-label="Action 4">
                    {action4Icon}
                  </IconButton>
                )}
                {showNativeAvatarButton && (
                  <div ref={buttonWrapperRef} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <AXAvatarButton
                      size="small"
                      indicator={avatarIndicator}
                      clockState={avatarClockState}
                      aria-label="Account"
                      onClick={handleAvatarClick}
                    >
                      <AvatarFallback style={{
                        fontFamily: 'var(--ld-semantic-font-body-small-family)',
                        fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
                        fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)',
                        lineHeight: 'var(--ld-semantic-font-body-small-line-height, 1.25rem)',
                      }}>
                        {avatarInitials}
                      </AvatarFallback>
                    </AXAvatarButton>
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: AX Search Bar */}
            {showNativeSearchBar && <div className={styles.nativeSearchRow}>
              <AXSearchField
                value={nativeSearchValue}
                onChange={setNativeSearchValue}
                onBarcodeClick={() => setShowCameraModal(true)}
                showMic={false}
                size="small"
                cornerStyle="rounded"
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

            </div>
          </div>
        )}

      </div>

      {showNativeAvatarButton && showAvatarMenu && menuPos && ReactDOM.createPortal(
        <div
          ref={menuPortalRef}
          style={{
            position: 'fixed',
            top: menuPos.top,
            right: menuPos.right,
            zIndex: 9999,
            width: '280px',
            backgroundColor: 'var(--ld-semantic-color-surface-overlay, #fff)',
            borderRadius: 'var(--ld-primitive-scale-borderRadius-50, 4px)',
            boxShadow: '0 -1px 4px 0 rgba(0,0,0,0.10), 0 5px 10px 3px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Header: avatar + name + sign out */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '20px 16px 16px', backgroundColor: 'var(--ld-semantic-color-fill-transparent, transparent)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #114AB6)', fontFamily: 'var(--ld-semantic-font-heading-small-family)', fontSize: 'var(--ld-semantic-font-heading-small-size, 1.125rem)', fontWeight: 700, lineHeight: 1 }}>WM</span>
            </div>
            <span style={{ fontFamily: 'var(--ld-semantic-font-body-small-family)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-onfill-transparent, #2e2f32)' }}>Walmart Associate</span>
            <LinkButton size="small" onClick={() => { setShowAvatarMenu(false); setMenuPos(null); }}>Sign out</LinkButton>
          </div>

          {/* Club Info row */}
          <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
          <div style={{ display: 'flex', padding: '16px', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 0 0' }}>
              {/* Location icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6.83C3.024 5.527 3.563 4.287 4.501 3.381C5.438 2.476 6.697 1.979 8 2.001C9.303 1.979 10.562 2.476 11.499 3.381C12.437 4.287 12.976 5.527 13 6.831C12.843 8.372 12.162 9.812 11.07 10.911C10.145 11.959 9.143 12.935 8.07 13.831L8 13.891L7.93 13.831C6.857 12.935 5.855 11.959 4.93 10.911C3.838 9.812 3.157 8.372 3 6.831ZM8 1.001C6.432.979 4.919 1.581 3.794 2.674C2.669 3.767 2.024 5.262 2 6.831C2 10.011 5.5 13.041 7.27 14.581L7.56 14.841C7.684 14.943 7.839 14.999 8 15.001C8.161 14.999 8.316 14.943 8.44 14.841L8.73 14.581C10.5 13.001 14 10.001 14 6.831C13.976 5.262 13.331 3.767 12.206 2.674C11.081 1.581 9.568.979 8 1.001ZM6.5 7.001C6.5 6.603 6.658 6.221 6.939 5.940C7.221 5.659 7.602 5.501 8 5.501V4.501C7.337 4.501 6.701 4.764 6.232 5.233C5.763 5.702 5.5 6.338 5.5 7.001C5.5 7.664 5.763 8.299 6.232 8.768C6.701 9.237 7.337 9.501 8 9.501C8.663 9.501 9.299 9.237 9.768 8.768C10.237 8.299 10.5 7.664 10.5 7.001H9.5C9.5 7.398 9.342 7.780 9.061 8.061C8.779 8.343 8.398 8.501 8 8.501C7.602 8.501 7.221 8.343 6.939 8.061C6.658 7.780 6.5 7.398 6.5 7.001Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '1 0 0' }}>
                <span style={{ fontFamily: 'var(--ld-semantic-font-body-small-family)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-subtlest, #74767C)' }}>Club #0001</span>
                <span style={{ fontFamily: 'var(--ld-semantic-font-body-small-family)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-onfill-transparent, #2e2f32)' }}>Member Services</span>
              </div>
            </div>
            <LinkButton size="small" onClick={() => { setShowAvatarMenu(false); setMenuPos(null); }}>Change</LinkButton>
          </div>

          {/* Report Issues row */}
          <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
          <div style={{ display: 'flex', padding: '16px', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 0 0' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M14 14V2H1V1H15V15H1V2H2V14H14Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <span style={{ fontFamily: 'var(--ld-semantic-font-body-small-family)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-onfill-transparent, #2e2f32)' }}>Report issues or leave feedback</span>
            </div>
          </div>

          {/* See What's New row */}
          <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
          <div style={{ display: 'flex', padding: '16px', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 0 0' }}>
              {/* Wrench icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M8.248 2.292C7.37 3.275 7.064 4.623 7.399 5.869L7.427 5.962L1.147 12.241C0.951 12.436 0.951 12.753 1.147 12.948L3.052 14.853L3.122 14.911C3.316 15.046 3.586 15.027 3.759 14.853L10.042 8.572L10.136 8.600C11.449 8.950 12.876 8.589 13.867 7.598C14.942 6.524 15.277 4.937 14.764 3.535L14.726 3.454C14.566 3.178 14.178 3.116 13.941 3.353L12.438 4.852L11.380 4.620L11.148 3.563L12.653 2.061C12.911 1.804 12.815 1.365 12.473 1.239C11.068 0.721 9.477 1.055 8.400 2.132L8.248 2.292Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <span style={{ fontFamily: 'var(--ld-semantic-font-body-small-family)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-onfill-transparent, #2e2f32)', flex: 1 }}>See what's new</span>
            </div>
            <span style={{ fontFamily: 'var(--ld-semantic-font-body-small-family)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-subtlest, #74767C)', textAlign: 'right' }}>v 3.5.1</span>
          </div>

          {/* Supervisor Sign In row */}
          <div style={{ height: '1px', backgroundColor: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />
          <div style={{ display: 'flex', padding: '16px', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 0 0' }}>
              {/* Admin icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M8 9.333C8.368 9.333 8.666 9.035 8.666 8.667C8.666 8.299 8.368 8 8 8C7.632 8 7.333 8.299 7.333 8.667C7.333 9.035 7.632 9.333 8 9.333Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.949 6.113L8 0.583L5.05 6.113L1.232 4.204L2.002 13.049C2.018 13.263 2.136 13.465 2.336 13.579C2.391 13.611 2.449 13.642 2.508 13.672C3.438 14.258 5.547 14.667 8 14.667C10.453 14.667 12.563 14.258 13.493 13.672C13.551 13.642 13.608 13.611 13.664 13.579C13.864 13.464 13.983 13.262 13.998 13.048L14.767 4.204L10.949 6.113ZM12.752 11.983L13.232 6.462L10.384 7.887L8 3.417L5.616 7.887L2.767 6.462L3.247 11.983C4.344 11.588 6.065 11.333 8 11.333C9.934 11.333 11.655 11.588 12.752 11.983ZM12.577 12.628C11.500 13.078 9.794 13.333 8 13.333C6.205 13.333 4.499 13.078 3.423 12.628C3.573 12.572 3.744 12.517 3.936 12.464C4.948 12.183 6.386 12 8 12C9.614 12 11.051 12.183 12.064 12.464C12.255 12.517 12.426 12.572 12.577 12.628Z" fill="var(--ld-semantic-color-text-subtlest, #74767C)"/>
              </svg>
              <span style={{ fontFamily: 'var(--ld-semantic-font-body-small-family)', fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)', color: 'var(--ld-semantic-color-text-onfill-transparent, #2e2f32)' }}>Supervisor sign in</span>
            </div>
          </div>
        </div>,
        document.body
      )}

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
