import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Home, Gear, SignOut } from '@/components/icons';
import { WalmartPlusLogoIcon, WalmartCashLogoIcon, ReorderIcon, ListsIcon } from '@/components/icons-custom';
import styles from './AccountSideNav.module.css';

interface NavItem {
  label: string;
  path: string;
  badge?: string;
  dot?: boolean;
}

const accountItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Purchase history', path: '/walmart/purchase-history' },
  { label: 'Walmart+', path: '/walmart-plus' },
  { label: 'My savings', path: '/savings' },
  { label: 'Walmart Cash', path: '/walmart-cash' },
  { label: 'Messages (2 new)', path: '/messages', dot: true },
];

const myItemsItems: NavItem[] = [
  { label: 'Reorder', path: '/reorder' },
  { label: 'Lists', path: '/lists' },
  { label: 'Registry', path: '/registry' },
];

const myProfileItems: NavItem[] = [
  { label: 'Fashion', path: '/fashion', badge: 'NEW' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Pets', path: '/pets' },
  { label: 'Giving & impact', path: '/giving' },
];

const otherAccountsItems: NavItem[] = [
  { label: 'Pharmacy', path: '/pharmacy' },
  { label: 'Photos', path: '/photos' },
  { label: 'eBooks', path: '/ebooks' },
];

interface SectionProps {
  title: string;
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

function NavSection({ title, items, currentPath, onNavigate }: SectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      <ul className={styles.sectionList}>
        {items.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <li key={item.path}>
              <button
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => onNavigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.dot && <span className={styles.redDot} aria-hidden="true" />}
                <span className={styles.navItemLabel}>{item.label}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AccountSideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountExpanded, setAccountExpanded] = useState(true);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const handleNav = (path: string) => navigate(path);

  return (
    <nav className={styles.nav} aria-label="Account navigation">
      {/* User Header */}
      <div className={styles.userHeader}>
        <div className={styles.userHeaderTop}>
          <WalmartPlusLogoIcon width={32} height={24} aria-hidden="true" />
          <span className={styles.greeting}>Hi, Amy</span>
        </div>
        <p className={styles.memberSince}>Member since 2023</p>
      </div>

      {/* Account Section (collapsible) */}
      <div className={styles.section}>
        <button
          className={styles.collapsibleHeader}
          onClick={() => setAccountExpanded((v) => !v)}
          aria-expanded={accountExpanded}
        >
          <div className={styles.collapsibleHeaderLeft}>
            <User />
            <span className={styles.sectionTitleText}>Account</span>
          </div>
          {accountExpanded ? <ChevronUp width={16} height={16} /> : <ChevronDown width={16} height={16} />}
        </button>
        {accountExpanded && (
          <ul className={styles.sectionList}>
            {accountItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <button
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                    onClick={() => handleNav(item.path)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.dot && <span className={styles.redDot} aria-hidden="true" />}
                    <span className={styles.navItemLabel}>{item.label}</span>
                    {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className={styles.divider} />

      <NavSection title="My items" items={myItemsItems} currentPath={location.pathname} onNavigate={handleNav} />

      <div className={styles.divider} />

      <NavSection title="My profile" items={myProfileItems} currentPath={location.pathname} onNavigate={handleNav} />

      <div className={styles.divider} />

      <NavSection title="Other accounts" items={otherAccountsItems} currentPath={location.pathname} onNavigate={handleNav} />

      <div className={styles.divider} />

      {/* Settings (collapsible) */}
      <div className={styles.section}>
        <button
          className={styles.settingsRow}
          onClick={() => setSettingsExpanded((v) => !v)}
          aria-expanded={settingsExpanded}
        >
          <div className={styles.collapsibleHeaderLeft}>
            <Gear width={20} height={20} aria-hidden="true" />
            <span className={styles.settingsLabel}>Settings</span>
          </div>
          {settingsExpanded ? <ChevronUp width={16} height={16} /> : <ChevronDown width={16} height={16} />}
        </button>
      </div>

      <div className={styles.divider} />

      {/* Sign Out */}
      <div className={styles.section}>
        <button className={styles.signOutRow} onClick={() => handleNav('/sign-out')}>
          <SignOut width={20} height={20} aria-hidden="true" />
          <span className={styles.signOutLabel}>Sign out</span>
        </button>
      </div>
    </nav>
  );
}

// Inline User icon to avoid import issue
function User() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="currentColor" d="M16 4a6 6 0 1 1 0 12A6 6 0 0 1 16 4Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 12c6.075 0 11 3.134 11 7v1H5v-1c0-3.866 4.925-7 11-7Z"/>
    </svg>
  );
}
