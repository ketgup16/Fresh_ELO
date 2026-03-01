import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Heart, User } from '@/components/icons';
import { SparkyAnimation } from '@/components/icons-custom';
import styles from './BottomNav.module.css';

interface BottomNavProps {
  activeTab?: 'shop' | 'heart' | 'user';
  onTabChange?: (tab: 'shop' | 'heart' | 'user') => void;
  /** Renders in-flow (not fixed) for use inside a patterns/documentation page */
  contained?: boolean;
}

const TAB_X: Record<string, string> = {
  shop: '-72px',
  heart: '0px',
  user: '72px',
};

const NAV_PATHS: Record<string, string | undefined> = {
  shop: '/walmart',
  heart: undefined,
  user: '/walmart/purchase-history',
};

export function BottomNav({ activeTab = 'shop', onTabChange, contained = false }: BottomNavProps) {
  const navigate = useNavigate();
  // Visual tab drives the indicator position — decoupled from prop so we can
  // animate first, then trigger the page navigation after the slide completes.
  const [visualTab, setVisualTab] = useState<'shop' | 'heart' | 'user'>(activeTab);
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep visualTab in sync if parent changes activeTab (e.g. on initial mount of a new page).
  useEffect(() => {
    setVisualTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setIsVisible(true);
      } else if (y > lastScrollY && y > 100) {
        setIsVisible(false);
      } else if (y < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleTabClick = (tab: 'shop' | 'heart' | 'user') => {
    if (tab === visualTab) return;

    // Clear any in-flight navigation/movement timers
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);

    // Move indicator immediately — CSS transition handles the slide
    setVisualTab(tab);
    setIsMoving(true);
    onTabChange?.(tab);

    // Clear the "moving" state once the spring has settled (~400ms)
    moveTimerRef.current = setTimeout(() => setIsMoving(false), 400);

    // Navigate only after the slide animation plays (~320ms)
    const path = NAV_PATHS[tab];
    if (path) {
      navTimerRef.current = setTimeout(() => navigate(path), 320);
    }
  };

  const indicatorX = TAB_X[visualTab];

  return (
    <>
      {!contained && <div className={`${styles.fadeOverlay} ${!isVisible ? styles.fadeOverlayHidden : ''}`} />}
      <div className={[
        styles.nav,
        !contained && !isVisible ? styles.navHidden : '',
        contained ? styles.navContained : '',
      ].filter(Boolean).join(' ')}>
        <div className={styles.navInner}>
          <div className={styles.tabBar}>
            <div
              className={`${styles.indicator} ${isMoving ? styles.indicatorMoving : ''}`}
              style={{ transform: `translateX(${indicatorX})` }}
            />

            <button
              className={styles.tab}
              onClick={() => handleTabClick('shop')}
              aria-label="Shop"
            >
              <Store
                className={`${styles.tabIcon} ${visualTab === 'shop' ? styles.tabIconActive : styles.tabIconInactive}`}
              />
            </button>

            <button
              className={styles.tab}
              onClick={() => handleTabClick('heart')}
              aria-label="My Items"
            >
              <Heart
                className={`${styles.tabIcon} ${visualTab === 'heart' ? styles.tabIconActive : styles.tabIconInactive}`}
              />
            </button>

            <button
              className={styles.tab}
              onClick={() => handleTabClick('user')}
              aria-label="Account"
            >
              <User
                className={`${styles.tabIcon} ${visualTab === 'user' ? styles.tabIconActive : styles.tabIconInactive}`}
              />
            </button>
          </div>

          <button className={styles.sparkyButton} aria-label="Ask Sparky">
            <div className={styles.sparkyIcon}>
              <SparkyAnimation />
            </div>
          </button>
        </div>

        <div className={styles.homeIndicator} />
      </div>
    </>
  );
}
