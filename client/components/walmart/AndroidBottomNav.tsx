import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BulletList, Calendar, UsersFill } from '@/components/icons';
import { SquigglyAgent } from '@/components/agents/SquigglyAgent';
import styles from './AndroidBottomNav.module.css';

type AndroidTab = 'for-you' | 'todays-plan' | 'your-team';

interface AndroidBottomNavProps {
  activeTab?: AndroidTab;
  onTabChange?: (tab: AndroidTab) => void;
  contained?: boolean;
  /** Show the Squiggly AI agent button above the nav bar */
  showSquiggly?: boolean;
  onSquigglyClick?: () => void;
}

const NAV_PATHS: Record<AndroidTab, string | undefined> = {
  'for-you': '/',
  'todays-plan': undefined,
  'your-team': undefined,
};

const TABS: { id: AndroidTab; label: string }[] = [
  { id: 'for-you', label: 'For you' },
  { id: 'todays-plan', label: "Today's Plan" },
  { id: 'your-team', label: 'Your team' },
];

function TabIcon({ id, active }: { id: AndroidTab; active: boolean }) {
  const cls = active ? styles.iconActive : styles.iconInactive;
  switch (id) {
    case 'for-you':
      return <BulletList className={cls} />;
    case 'todays-plan':
      return <Calendar className={cls} />;
    case 'your-team':
      return <UsersFill className={cls} />;
  }
}

export function AndroidBottomNav({
  activeTab = 'for-you',
  onTabChange,
  contained = false,
  showSquiggly = true,
  onSquigglyClick,
}: AndroidBottomNavProps) {
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
      {/* Squiggly AI agent floats above the right side of the nav bar */}
      {showSquiggly && (
        <div className={styles.squigglyWrap}>
          <SquigglyAgent
            animation="emotes"
            size={56}
            loop
            autoplay
            onClick={onSquigglyClick}
          />
        </div>
      )}

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
