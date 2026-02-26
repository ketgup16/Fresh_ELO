import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Gear, SignOut, User } from '@/components/icons';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { WalmartPlusLogoIcon } from '@/components/icons-custom';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { Divider } from '@/components/ui/Divider';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
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

function NavItemContent({ item }: { item: NavItem }) {
  return (
    <span className={styles.navItemInner}>
      {item.dot && <Badge variant="error" size="small" aria-label="2 new messages" />}
      <span className={styles.navItemLabel}>{item.label}</span>
      {item.badge && <Tag variant="primary" color="warning">{item.badge}</Tag>}
    </span>
  );
}

interface NavSectionProps {
  title: string;
  items: NavItem[];
  currentPath: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

function NavSection({ title, items, currentPath, onNavigate }: NavSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
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
    </div>
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
          <span className={styles.greeting}>Hi, Amy</span>
        </div>
        <p className={styles.memberSince}>Member since 2023</p>
      </div>

      {/* Account Section (collapsible) */}
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
        </CollapsibleContent>
      </Collapsible>

      <Divider />

      <NavSection title="My items" items={myItemsItems} currentPath={location.pathname} onNavigate={handleNav} />

      <Divider />

      <NavSection title="My profile" items={myProfileItems} currentPath={location.pathname} onNavigate={handleNav} />

      <Divider />

      <NavSection title="Other accounts" items={otherAccountsItems} currentPath={location.pathname} onNavigate={handleNav} />

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
