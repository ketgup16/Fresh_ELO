import React, { useState } from 'react';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
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
  MoreHorizontal,
  ChevronDown,
} from '@/components/icons';
import styles from '@/styles/landingSummary.module.css';

const menuItems: SidebarMenuItem[] = [
  { id: 'home', label: 'Home', Icon: Home, route: '/' },
  { id: 'catalog', label: 'Catalog', Icon: ListBox, route: '/catalog' },
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

export default function LandingSummary() {
  return (
    <div className={styles.root}>
      <MastHead currentSolution="Landing Summary" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={menuItems} />

        <main className={styles.main}>
          <div className={styles.pageInner}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <div className={styles.pageHeaderContainer}>
                <h1 className={styles.pageTitle}>Landing summary</h1>
                <div className={styles.titleActions}>
                  <LinkButton size="medium">Button label</LinkButton>
                  <LinkButton size="medium">Button label</LinkButton>
                  <Button variant="secondary" size="medium">Button label</Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={styles.contentArea}>
              <div className={styles.contentContainer}>
                {/* Primary column */}
                <div className={styles.primaryColumn}>
                  <PrimaryCard />
                </div>

                {/* Secondary column */}
                <div className={styles.secondaryColumn}>
                  <SecondaryListCard />
                  <SecondaryAccordionCard />
                  <div className={styles.placeholderCard} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── Primary Card ─── */

function PrimaryCard() {
  return (
    <div className={styles.primaryCard}>
      {/* Primary section header */}
      <div className={styles.primaryCardHeader}>
        <h2 className={styles.primarySectionTitle}>Primary section</h2>
        <Button variant="secondary" size="small">Button label</Button>
      </div>

      {/* Secondary section */}
      <div className={styles.secondarySectionHeader}>
        <h3 className={styles.secondarySectionTitle}>Secondary section</h3>
        <LinkButton size="medium">Link button</LinkButton>
      </div>

      {/* Tertiary section */}
      <div className={styles.tertiarySectionHeader}>
        <h4 className={styles.tertiarySectionTitle}>Tertiary section</h4>
      </div>

      {/* List items */}
      <div className={styles.listSection}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.listItem}>
            <span className={styles.listItemText}>List item text</span>
            <span className={styles.listItemTrailing}>Trailing</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Secondary List Card ─── */

function SecondaryListCard() {
  return (
    <div className={styles.secondaryCard}>
      <div className={styles.secondaryCardHeader}>
        <h3 className={styles.secondaryCardTitle}>Secondary section</h3>
        <button className={styles.moreBtn} aria-label="More options">
          <MoreHorizontal style={{ width: 16, height: 16 }} />
        </button>
      </div>
      <div className={styles.secondaryListSection}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.secondaryListItem}>
            <span className={styles.secondaryListItemText}>List item text</span>
            <span className={styles.secondaryListItemTrailing}>Trailing</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Secondary Accordion Card ─── */

const accordionItems = Array.from({ length: 8 }, (_, i) => ({
  id: String(i),
  title: 'Accordion title',
}));

function SecondaryAccordionCard() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.secondaryCard}>
      <div className={styles.secondaryCardHeader}>
        <h3 className={styles.secondaryCardTitle}>Secondary section</h3>
        <button className={styles.moreBtn} aria-label="More options">
          <MoreHorizontal style={{ width: 16, height: 16 }} />
        </button>
      </div>
      <div className={styles.accordionSection}>
        {accordionItems.map((item, idx) => {
          const isOpen = openItems.has(item.id);
          return (
            <div key={item.id} className={styles.accordionItem}>
              <button
                className={styles.accordionTrigger}
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
              >
                <span className={styles.accordionTitle}>{item.title}</span>
                <span className={`${styles.accordionChevron}${isOpen ? ` ${styles.open}` : ''}`}>
                  <ChevronDown style={{ width: 16, height: 16 }} />
                </span>
              </button>
              {isOpen && (
                <div className={styles.accordionContent}>
                  Content for accordion item {idx + 1}
                </div>
              )}
              {idx < accordionItems.length - 1 && (
                <div className={styles.accordionDivider} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
