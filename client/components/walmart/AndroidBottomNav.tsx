import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, StoreFill, Heart, HeartFill, Services, ServicesFill, User, UserCircleFill } from '@/components/icons';
import { SparkyAnimation } from '@/components/icons-custom';
import styles from './AndroidBottomNav.module.css';

type AndroidTab = 'shop' | 'heart' | 'search' | 'services' | 'account';

interface AndroidBottomNavProps {
  activeTab?: AndroidTab;
  onTabChange?: (tab: AndroidTab) => void;
  contained?: boolean;
}

const NAV_PATHS: Record<AndroidTab, string | undefined> = {
  shop: '/walmart',
  heart: undefined,
  search: undefined,
  services: undefined,
  account: '/walmart/purchase-history',
};

const TABS: { id: AndroidTab; label: string }[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'heart', label: 'My Items' },
  { id: 'search', label: 'Ask Sparky' },
  { id: 'services', label: 'Services' },
  { id: 'account', label: 'Account' },
];

function TabIcon({ id, active }: { id: AndroidTab; active: boolean }) {
  const cls = active ? styles.iconActive : styles.iconInactive;
  switch (id) {
    case 'shop':
      return active ? <StoreFill className={cls} /> : <Store className={cls} />;
    case 'heart':
      return active ? <HeartFill className={cls} /> : <Heart className={cls} />;
    case 'search':
      return (
        <div className={styles.sparkyWrap}>
          <SparkyAnimation />
        </div>
      );
    case 'services':
      return active ? <ServicesFill className={cls} /> : <Services className={cls} />;
    case 'account':
      return active ? <UserCircleFill className={cls} /> : <User className={cls} />;
  }
}

export function AndroidBottomNav({ activeTab = 'shop', onTabChange, contained = false }: AndroidBottomNavProps) {
  const navigate = useNavigate();
  const [visualTab, setVisualTab] = useState<AndroidTab>(activeTab);
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

  const handleTabClick = (tab: AndroidTab) => {
    setVisualTab(tab);
    onTabChange?.(tab);
    const path = NAV_PATHS[tab];
    if (path) navigate(path);
  };

  return (
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
              className={[styles.tab, isActive ? styles.tabActive : ''].filter(Boolean).join(' ')}
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

      {/* Android gesture bar */}
      <div className={styles.gestureBar}>
        <div className={styles.gestureBarPill} />
      </div>
    </div>
  );
}
