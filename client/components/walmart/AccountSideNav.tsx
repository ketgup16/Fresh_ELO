import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Gear, SignOut, User } from '@/components/icons';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { WalmartPlusLogoIcon } from '@/components/icons-custom';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { Divider } from '@/components/ui/Divider';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Tag } from '@/components/ui/Tag';
import styles from './AccountSideNav.module.css';

interface NavItem {
  label: string;
  path: string;
  tag?: string;
  tagColor?: 'warning' | 'info';
}

const accountItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Purchase history', path: '/walmart/purchase-history' },
  { label: 'Walmart+', path: '/walmart-plus' },
  { label: 'My savings', path: '/savings' },
  { label: 'Walmart Cash', path: '/walmart-cash' },
  { label: 'Messages', path: '/messages' },
];

const myItemsItems: NavItem[] = [
  { label: 'Reorder', path: '/reorder' },
  { label: 'Shop With Friends', path: '/shop-with-friends', tag: 'New', tagColor: 'warning' },
  { label: 'Lists', path: '/lists' },
  { label: 'Subscriptions', path: '/subscriptions' },
  { label: 'Registry', path: '/registry' },
  { label: 'Protection plans', path: '/protection-plans' },
];

const myProfileItems: NavItem[] = [
  { label: 'Reviews', path: '/reviews', tag: '6 items to review', tagColor: 'warning' },
  { label: 'Pets', path: '/pets' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Recipes', path: '/recipes' },
];

const otherAccountsItems: NavItem[] = [
  { label: 'Pharmacy', path: '/pharmacy' },
  { label: 'Photos', path: '/photos' },
  { label: 'eBooks', path: '/ebooks' },
];

function NavItemContent({ item }: { item: NavItem }) {
  return (
    <span className={styles.navItemInner}>
      <span className={styles.navItemLabel}>{item.label}</span>
      {item.tag && <Tag variant="primary" color={item.tagColor ?? 'warning'}>{item.tag}</Tag>}
    </span>
  );
}

interface NavGroupProps {
  title: string;
  items: NavItem[];
  currentPath: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

function NavGroup({ title, items, currentPath, onNavigate }: NavGroupProps) {
  return (
    <>
      <div className={styles.groupTitle}>{title}</div>
      <SideNavigation aria-label={title}>
        {items.map((item) => (
          <SideNavigationItem
            key={item.path}
            href={item.path}
            isCurrent={currentPath === item.path}
            onClick={(e) => onNavigate(e, item.path)}
          >
            <NavItemContent item={item} />
          </SideNavigationItem>
        ))}
      </SideNavigation>
    </>
  );
}

export function AccountSideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <aside className={styles.nav} aria-label="Account navigation">
      {/* User Header */}
      <div className={styles.userHeader}>
        <div className={styles.userHeaderTop}>
          <WalmartPlusLogoIcon width={32} height={24} aria-hidden="true" />
          <span className={styles.greeting}>Hi, Mi</span>
        </div>
        <p className={styles.memberSince}>Member since 2023</p>
      </div>

      {/* Account Section (collapsible) — contains all nav groups */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className={styles.collapsibleHeader}>
          <div className={styles.collapsibleHeaderLeft}>
            <SpotIcon icon={<User />} size="small" color="brand" />
            <span className={styles.sectionTitleText}>Account</span>
          </div>
          <span className={styles.chevronIcon}>
            <ChevronDown width={16} height={16} />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* Account links */}
          <SideNavigation aria-label="Account">
            {accountItems.map((item) => (
              <SideNavigationItem
                key={item.path}
                href={item.path}
                isCurrent={location.pathname === item.path}
                onClick={(e) => handleNav(e, item.path)}
              >
                <NavItemContent item={item} />
              </SideNavigationItem>
            ))}
          </SideNavigation>

          {/* My items */}
          <NavGroup title="My items" items={myItemsItems} currentPath={location.pathname} onNavigate={handleNav} />

          {/* My profile */}
          <NavGroup title="My profile" items={myProfileItems} currentPath={location.pathname} onNavigate={handleNav} />

          {/* Other accounts */}
          <NavGroup title="Other accounts" items={otherAccountsItems} currentPath={location.pathname} onNavigate={handleNav} />
        </CollapsibleContent>
      </Collapsible>

      <Divider />

      {/* Settings (collapsible) */}
      <Collapsible>
        <CollapsibleTrigger className={styles.collapsibleHeader}>
          <div className={styles.collapsibleHeaderLeft}>
            <SpotIcon icon={<Gear />} size="small" color="brand" />
            <span className={styles.settingsLabel}>Settings</span>
          </div>
          <span className={styles.chevronIcon}>
            <ChevronDown width={16} height={16} />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SideNavigation aria-label="Settings">
            <SideNavigationItem href="/settings/account" onClick={(e) => handleNav(e, '/settings/account')}>
              Account settings
            </SideNavigationItem>
            <SideNavigationItem href="/settings/notifications" onClick={(e) => handleNav(e, '/settings/notifications')}>
              Notifications
            </SideNavigationItem>
          </SideNavigation>
        </CollapsibleContent>
      </Collapsible>

      <Divider />

      {/* Sign Out */}
      <div className={styles.section}>
        <button className={styles.signOutRow} onClick={() => navigate('/sign-out')}>
          <SpotIcon icon={<SignOut />} size="small" color="brand" />
          <span className={styles.signOutLabel}>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
