import { useState, useEffect } from 'react';
import { Store, Heart, User } from '@/components/icons';
import { SparkyAnimation } from '@/components/icons-custom';
import styles from './BottomNav.module.css';

interface BottomNavProps {
  activeTab?: 'shop' | 'heart' | 'user';
  onTabChange?: (tab: 'shop' | 'heart' | 'user') => void;
}

export function BottomNav({ activeTab = 'shop', onTabChange }: BottomNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const indicatorX = activeTab === 'shop' ? '-72px' : activeTab === 'heart' ? '0px' : '72px';

  return (
    <>
      <div className={`${styles.fadeOverlay} ${!isVisible ? styles.fadeOverlayHidden : ''}`} />
      <div className={`${styles.nav} ${!isVisible ? styles.navHidden : ''}`}>
        <div className={styles.navInner}>
          <div className={styles.tabBar}>
            <div className={styles.indicator} style={{ transform: `translateX(${indicatorX})` }} />

            <button
              className={styles.tab}
              onClick={() => onTabChange?.('shop')}
              aria-label="Shop"
            >
              <Store
                className={`${styles.tabIcon} ${activeTab === 'shop' ? styles.tabIconActive : styles.tabIconInactive}`}
              />
            </button>

            <button
              className={styles.tab}
              onClick={() => onTabChange?.('heart')}
              aria-label="My Items"
            >
              <Heart
                className={`${styles.tabIcon} ${activeTab === 'heart' ? styles.tabIconActive : styles.tabIconInactive}`}
              />
            </button>

            <button
              className={styles.tab}
              onClick={() => onTabChange?.('user')}
              aria-label="Account"
            >
              <User
                className={`${styles.tabIcon} ${activeTab === 'user' ? styles.tabIconActive : styles.tabIconInactive}`}
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
