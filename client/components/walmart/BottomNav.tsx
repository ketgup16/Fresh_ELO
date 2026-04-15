import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, StoreFill, Heart, HeartFill, Services, ServicesFill, UserCircle, UserCircleFill } from '@/components/icons';
import styles from './BottomNav.module.css';

type BottomTab = 'shop' | 'heart' | 'services' | 'user';

interface BottomNavProps {
  activeTab?: 'shop' | 'heart' | 'user';
  onTabChange?: (tab: 'shop' | 'heart' | 'user') => void;
  /** Renders in-flow (not fixed) for use inside a patterns/documentation page */
  contained?: boolean;
}

const NAV_PATHS: Record<BottomTab, string | undefined> = {
  shop: '/walmart',
  heart: undefined,
  services: undefined,
  user: undefined,
};

const TABS: { id: BottomTab; label: string }[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'heart', label: 'My Items' },
  { id: 'services', label: 'Services' },
  { id: 'user', label: 'Account' },
];

function TabIcon({ id, active }: { id: BottomTab; active: boolean }) {
  const cls = active ? styles.iconActive : styles.iconInactive;
  switch (id) {
    case 'shop':
      return active ? <StoreFill className={cls} /> : <Store className={cls} />;
    case 'heart':
      return active ? <HeartFill className={cls} /> : <Heart className={cls} />;
    case 'services':
      return active ? <ServicesFill className={cls} /> : <Services className={cls} />;
    case 'user':
      return active ? <UserCircleFill className={cls} /> : <UserCircle className={cls} />;
  }
}

export function BottomNav({ activeTab = 'shop', onTabChange, contained = false }: BottomNavProps) {
  const navigate = useNavigate();
  const [visualTab, setVisualTab] = useState<BottomTab>(activeTab);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setVisualTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (contained) return;
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
  }, [lastScrollY, contained]);

  const handleTabClick = (tab: BottomTab) => {
    setVisualTab(tab);
    // Map internal tab ids to the external 3-tab type for onTabChange
    if (tab === 'shop' || tab === 'heart' || tab === 'user') {
      onTabChange?.(tab);
    }
    const path = NAV_PATHS[tab];
    if (path) navigate(path);
  };

  const navEl = (
    <div className={[
      styles.nav,
      !contained && !isVisible ? styles.navHidden : '',
      contained ? styles.navContained : '',
    ].filter(Boolean).join(' ')}>
      <div className={styles.tabBar}>
        {TABS.map(({ id, label }) => {
          const isActive = visualTab === id;
          return (
            <button
              key={id}
              className={styles.tab}
              onClick={() => handleTabClick(id)}
              aria-label={label}
            >
              <div className={styles.iconWrap}>
                <TabIcon id={id} active={isActive} />
              </div>
              <span className={[styles.label, isActive ? styles.labelActive : styles.labelInactive].join(' ')}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS home indicator */}
      <div className={styles.homeIndicator}>
        <div className={styles.homeIndicatorPill} />
      </div>
    </div>
  );

  if (contained) {
    return (
      <div className={styles.containedWrapper}>
        <div className={styles.fadeOverlayContained} />
        {navEl}
      </div>
    );
  }

  return navEl;
}
