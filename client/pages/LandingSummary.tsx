import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

function getSellerCenterMenuItems(t: (key: string) => string): SidebarMenuItem[] {
  return [
    { id: 'home', label: t('nav.home'), Icon: Home, route: '/' },
    { id: 'catalog', label: t('nav.catalog'), Icon: ListBox, route: '/catalog' },
    { id: 'pricing', label: t('nav.pricing'), Icon: TagIcon },
    { id: 'orders', label: t('nav.orders'), Icon: Cart },
    { id: 'wfs', label: t('nav.wfs'), Icon: BoxSpark },
    { id: 'payments', label: t('nav.payments'), Icon: CreditCard },
    { id: 'performance', label: t('nav.performance'), Icon: Speedometer },
    { id: 'analytics', label: t('nav.analytics'), Icon: BarGraph },
    { id: 'growth', label: t('nav.growth'), Icon: Rocket },
    { id: 'advertising', label: t('nav.advertising'), Icon: TargetArrow },
    { id: 'apps', label: t('nav.apps'), Icon: Services },
  ];
}

export default function LandingSummary() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead currentSolution="Landing Summary" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          <div className={styles.pageInner}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <div className={styles.pageHeaderContainer}>
                <h1 className={styles.pageTitle}>{t('templates.landingSummary')}</h1>
                <div className={styles.titleActions}>
                  <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
                  <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
                  <Button variant="secondary" size="medium">{t('shared.buttonLabel')}</Button>
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
  const { t } = useTranslation();
  return (
    <div className={styles.primaryCard}>
      {/* Primary section header */}
      <div className={styles.primaryCardHeader}>
        <h2 className={styles.primarySectionTitle}>{t('shared.primarySection')}</h2>
        <Button variant="secondary" size="small">{t('shared.buttonLabel')}</Button>
      </div>

      {/* Secondary section */}
      <div className={styles.secondarySectionHeader}>
        <h3 className={styles.secondarySectionTitle}>{t('shared.secondarySection')}</h3>
        <LinkButton size="medium">{t('shared.linkButton')}</LinkButton>
      </div>

      {/* Tertiary section */}
      <div className={styles.tertiarySectionHeader}>
        <h4 className={styles.tertiarySectionTitle}>{t('shared.tertiarySection')}</h4>
      </div>

      {/* List items */}
      <div className={styles.listSection}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.listItem}>
            <span className={styles.listItemText}>{t('shared.listItemText')}</span>
            <span className={styles.listItemTrailing}>{t('shared.trailing')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Secondary List Card ─── */

function SecondaryListCard() {
  const { t } = useTranslation();
  return (
    <div className={styles.secondaryCard}>
      <div className={styles.secondaryCardHeader}>
        <h3 className={styles.secondaryCardTitle}>{t('shared.secondarySection')}</h3>
        <button className={styles.moreBtn} aria-label={t('shared.moreOptions')}>
          <MoreHorizontal style={{ width: 16, height: 16 }} />
        </button>
      </div>
      <div className={styles.secondaryListSection}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.secondaryListItem}>
            <span className={styles.secondaryListItemText}>{t('shared.listItemText')}</span>
            <span className={styles.secondaryListItemTrailing}>{t('shared.trailing')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Secondary Accordion Card ─── */

const accordionIds = Array.from({ length: 8 }, (_, i) => String(i));

function SecondaryAccordionCard() {
  const { t } = useTranslation();
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
        <h3 className={styles.secondaryCardTitle}>{t('shared.secondarySection')}</h3>
        <button className={styles.moreBtn} aria-label={t('shared.moreOptions')}>
          <MoreHorizontal style={{ width: 16, height: 16 }} />
        </button>
      </div>
      <div className={styles.accordionSection}>
        {accordionIds.map((id, idx) => {
          const isOpen = openItems.has(id);
          return (
            <div key={id} className={styles.accordionItem}>
              <button
                className={styles.accordionTrigger}
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
              >
                <span className={styles.accordionTitle}>{t('shared.accordionTitle')}</span>
                <span className={`${styles.accordionChevron}${isOpen ? ` ${styles.open}` : ''}`}>
                  <ChevronDown style={{ width: 16, height: 16 }} />
                </span>
              </button>
              {isOpen && (
                <div className={styles.accordionContent}>
                  Content for accordion item {idx + 1}
                </div>
              )}
              {idx < accordionIds.length - 1 && (
                <div className={styles.accordionDivider} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
