import styles from '@/styles/responsive.module.css';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import { CatalogHero } from '@/features/catalog/CatalogHero';
import { CatalogTodoList } from '@/features/catalog/CatalogTodoList';
import {
  Home,
  ListBox,
  Tag as TagIcon,
  Cart,
  BoxSpark,
  CreditCard,
  Speedometer,
  BarGraph,
  Rocket,
  TargetArrow,
  Services,
} from '@/components/icons';

/**
 * Catalog page sidebar menu items — Seller Center navigation.
 * Each page defines its own menu items relevant to that page's context.
 */
const catalogMenuItems: SidebarMenuItem[] = [
  { id: 'home', label: 'Home', Icon: Home, route: '/' },
  {
    id: 'catalog',
    label: 'Catalog',
    Icon: ListBox,
    route: '/catalog',
    submenuItems: [
      { id: 'catalog-sub1', label: 'Sub page', route: '/catalog' },
      { id: 'catalog-sub2', label: 'Sub page' },
      { id: 'catalog-sub3', label: 'Sub page' },
    ],
  },
  { id: 'pricing', label: 'Pricing', Icon: TagIcon },
  { id: 'orders', label: 'Orders', Icon: Cart },
  { id: 'wfs', label: 'WFS', Icon: BoxSpark },
  { id: 'payments', label: 'Payments', Icon: CreditCard },
  { id: 'performance', label: 'Performance', Icon: Speedometer },
  { id: 'analytics', label: 'Analytics', Icon: BarGraph },
  { id: 'growth', label: 'Growth & Experiments', Icon: Rocket },
  { id: 'advertising', label: 'Advertising', Icon: TargetArrow },
  { id: 'apps', label: 'Apps', Icon: Services },
];

export default function Catalog() {
  return (
    <div className={styles.root}>
      <MastHead />

      <div className={styles.appRow}>
        <AppSidebar menuItems={catalogMenuItems} />

        <main className={styles.main}>
          {/* Branded background bar */}
          <div className={styles.catalogBrandBar} />

          {/* Centered page content */}
          <div className={styles.catalogPageInner}>
            {/* Page header — overlaps the branded bar */}
            <div className={styles.catalogHeader}>
              <h1 className={styles.pageTitle}>Catalog</h1>
            </div>

            {/* Page content — fills available width */}
            <div className={styles.catalogContent}>
              <div className={styles.catalogCard}>
                <CatalogHero />
                <CatalogTodoList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
