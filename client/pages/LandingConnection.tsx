import React from 'react';
import { useTranslation } from 'react-i18next';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
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
  Image as ImageIcon,
} from '@/components/icons';
import styles from '@/styles/landingConnection.module.css';

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

const sections = [
  { id: '1', title: 'Primary section' },
  { id: '2', title: 'Primary section' },
  { id: '3', title: 'Primary section' },
];

export default function LandingConnection() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead currentSolution="Landing Connection" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          <div className={styles.pageContent}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Landing connection</h1>
              <p className={styles.pageSubtitle}>Supporting text...</p>
            </div>

            {/* Sections */}
            {sections.map((section) => (
              <LandingSection key={section.id} title={section.title} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── Landing Section ─── */

function LandingSection({ title }: { title: string }) {
  return (
    <section className={styles.section}>
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <LinkButton size="medium">Link button</LinkButton>
      </div>

      {/* 3-column card grid */}
      <div className={styles.cardGrid}>
        <LandingCard />
        <LandingCard />
        <LandingCard />
      </div>
    </section>
  );
}

/* ─── Landing Card ─── */

function LandingCard() {
  return (
    <div className={styles.card}>
      {/* Card image area */}
      <div className={styles.cardImageArea}>
        <ImagePlaceholder />
        <Tag variant="tertiary" color="gray" leading={<ImageIcon style={{ width: 16, height: 16 }} />} className={styles.cardLabelBadge}>Label</Tag>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>Title</h3>
        <p className={styles.cardDescription}>
          Include a short description here that speaks to the value prop of the card. Character limit of 120.{' '}
          <a href="#" className={styles.cardLearnMore}>Learn more</a>
        </p>
      </div>

      {/* Card footer */}
      <div className={styles.cardFooter}>
        <div className={styles.cardDivider} />
        <div className={styles.cardActions}>
          <LinkButton size="medium">Button label</LinkButton>
          <Button variant="secondary" size="small">Button label</Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Image Placeholder ─── */

function ImagePlaceholder() {
  return (
    <div className={styles.imagePlaceholder}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="28" height="28" rx="2" stroke="#BABBBE" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="3" stroke="#BABBBE" strokeWidth="1.5" />
        <path
          d="M2 22l7-7 5 5 4-4 8 8"
          stroke="#BABBBE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
