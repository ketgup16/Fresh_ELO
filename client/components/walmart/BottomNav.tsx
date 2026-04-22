import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BulletList, Calendar, Users } from '@/components/icons';
import { SquigglyAgent } from '@/components/agents/SquigglyAgent';
import styles from './BottomNav.module.css';

type BottomTab = 'for-you' | 'todays-plan' | 'your-team';

interface BottomNavProps {
  activeTab?: BottomTab;
  onTabChange?: (tab: BottomTab) => void;
  /** Renders in-flow (not fixed) for use inside a patterns/documentation page */
  contained?: boolean;
  /** Show the Squiggly AI agent button above the nav bar */
  showSquiggly?: boolean;
  onSquigglyClick?: () => void;
}

const NAV_PATHS: Record<BottomTab, string | undefined> = {
  'for-you': '/',
  'todays-plan': undefined,
  'your-team': undefined,
};

const TABS: { id: BottomTab; label: string }[] = [
  { id: 'for-you', label: 'For you' },
  { id: 'todays-plan', label: "Today's Plan" },
  { id: 'your-team', label: 'Your team' },
];

function TabIcon({ id, active }: { id: BottomTab; active: boolean }) {
  const cls = active ? styles.iconActive : styles.iconInactive;
  switch (id) {
    case 'for-you':
      return <BulletList className={cls} />;
    case 'todays-plan':
      return <Calendar className={cls} />;
    case 'your-team':
      return <Users className={cls} />;
  }
}

export function BottomNav({
  activeTab = 'for-you',
  onTabChange,
  contained = false,
  showSquiggly = true,
  onSquigglyClick,
}: BottomNavProps) {
  const navigate = useNavigate();
  const [visualTab, setVisualTab] = useState<BottomTab>(activeTab);
  const isVisible = true;

  useEffect(() => {
    setVisualTab(activeTab);
  }, [activeTab]);


  const handleTabClick = (tab: BottomTab) => {
    setVisualTab(tab);
    onTabChange?.(tab);
    const path = NAV_PATHS[tab];
    if (path) navigate(path);
  };

  const navEl = (
    <div className={[
      styles.nav,
      !contained && !isVisible ? styles.navHidden : '',
      contained ? styles.navContained : '',
    ].filter(Boolean).join(' ')}>
      {/* Squiggly AI agent floats above the nav bar */}
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
