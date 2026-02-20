import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import styles from "@/styles/responsive.module.css";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Divider } from "@/components/ui/Divider";
import { Tag } from "@/components/ui/Tag";
import { Alert } from "@/components/ui/Alert";
import Metric from "@/components/ui/Metric";
import { Select, SelectItem } from "@/components/ui/Select";
import DataTableExample from "@/components/examples/DataTableExample";
import { MastHead } from "@/components/ui/MastHead";
import { AppSidebar } from "@/components/ui/AppSidebar";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";

export default function Index() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const { t } = useTranslation();
  const { t: tp } = useTranslation('pages');

  return (
    <div className={styles.root}>
      <MastHead />

      <div className={styles.appRow}>
        <AppSidebar
          activeMenuItem={activeMenuItem}
          onMenuItemClick={setActiveMenuItem}
        />

        <main className={styles.main}>
          <div className={styles.pageContent}>
            <div className={styles.alertWrapper}>
              <Alert variant="info">
                {tp('index.alertMessage')}
              </Alert>
            </div>

            <h2 className={styles.pageTitle}>{tp('index.helloWorld')}</h2>

            <RecommendationsCards />

            <FilterBar />

            <MetricsRow />

            <Divider />

            {/* Section header — 8px hierarchy rule: title 24px above tabs/content, 16px below divider */}
            <SectionHeader title={tp('index.topPerformingByROAS')} />

            <div className={styles.tableCard}>
              <DataTableExample />
            </div>
          </div>

          <MartyFloatingPanel />
        </main>
      </div>
    </div>
  );
}

/* ─── Recommendations Card ─── */

function RecommendationCard({
  category,
  heading,
  body,
  cta,
}: {
  category: string;
  heading: string;
  body: string;
  cta: string;
}) {
  return (
    <Card UNSAFE_style={{ flex: "1 1 0" }}>
      <CardContent>
        <Tag color="blue" variant="tertiary" style={{ marginBottom: "12px" }}>
          {category}
        </Tag>
        <h3 className={styles.cardHeading}>{heading}</h3>
        <p className={styles.cardBody}>{body}</p>
        <Button variant="secondary" size="small">
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}

function RecommendationsCards() {
  const { t } = useTranslation('pages');
  return (
    <div className={styles.threeColGrid}>
      <RecommendationCard
        category={t('index.category')}
        heading={t('index.headingText')}
        body={t('index.bodyText')}
        cta={t('index.callToAction')}
      />
      <RecommendationCard
        category={t('index.category')}
        heading={t('index.headingText')}
        body={t('index.bodyText')}
        cta={t('index.callToAction')}
      />
      <RecommendationCard
        category={t('index.category')}
        heading={t('index.headingText')}
        body={t('index.bodyText')}
        cta={t('index.callToAction')}
      />
    </div>
  );
}

/* ─── Filter Bar ─── */

const DATE_RANGES = [
  { value: 'range-1', start: new Date(2025, 0, 1), end: new Date(2025, 0, 31) },
  { value: 'range-2', start: new Date(2025, 1, 1), end: new Date(2025, 1, 28) },
  { value: 'range-3', start: new Date(2025, 2, 1), end: new Date(2025, 2, 31) },
  { value: 'range-4', start: new Date(2025, 3, 1), end: new Date(2025, 3, 30) },
];

function formatDateRange(start: Date, end: Date, lng: string) {
  const fmt = new Intl.DateTimeFormat(lng, { month: 'short', day: 'numeric', year: 'numeric' });
  return `${fmt.format(start)} - ${fmt.format(end)}`;
}

function FilterBar() {
  const [daysWindow, setDaysWindow] = useState("14");
  const [dateRange, setDateRange] = useState("range-1");
  const { t, i18n } = useTranslation('pages');

  return (
    <div className={styles.filterBar}>
      <div className={styles.selectField}>
        <Select
          label={t('index.daysWindow')}
          value={daysWindow}
          onValueChange={setDaysWindow}
          size="large"
        >
          <SelectItem value="7">{t('index.days_7')}</SelectItem>
          <SelectItem value="14">{t('index.days_14')}</SelectItem>
          <SelectItem value="28">{t('index.days_28')}</SelectItem>
          <SelectItem value="30">{t('index.days_30')}</SelectItem>
        </Select>
      </div>
      <div className={styles.selectFieldWide}>
        <Select
          label={t('index.dateRange')}
          value={dateRange}
          onValueChange={setDateRange}
          size="large"
        >
          {DATE_RANGES.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {formatDateRange(r.start, r.end, i18n.resolvedLanguage || 'en')}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

/* ─── Section Header ─── */
/* 8px HIERARCHY RULE: Use multiples of 8px for spacing between content sections.
   - 24px (3×8) between section title and content below
   - 16px (2×8) between divider and section title
   - 32px (4×8) between major page sections */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h3 className={styles.sectionTitle}>{title}</h3>
    </div>
  );
}

/* ─── Metrics Row ─── */

function MetricsRow() {
  const { t } = useTranslation('pages');
  return (
    <Card UNSAFE_style={{ marginBottom: "24px" }}>
      <CardContent>
        <div className={styles.metricsGrid7}>
          <Metric title={t('index.impressions')} value="21,891,371" variant="positiveUp" textLabel="6%" showInfoIcon />
          <Metric title={t('index.eCPM')} value="$5.52" variant="negativeDown" textLabel="1%" showInfoIcon />
          <Metric title={t('index.spend')} value="$120,869" variant="neutral" textLabel="0%" showInfoIcon />
          <Metric title={t('index.totalROAS')} value="$3.13" variant="positiveUp" textLabel="1%" showInfoIcon />
          <Metric title={t('index.totalAttributedSales')} value="$377,588" variant="positiveUp" textLabel="3%" showInfoIcon />
          <Metric title={t('index.totalAttributedOrders')} value="30,666" variant="positiveUp" textLabel="4%" showInfoIcon />
          <Metric title={t('index.totalAttributedUnits')} value="21,891,371" variant="positiveUp" textLabel="2%" showInfoIcon />
        </div>
      </CardContent>
    </Card>
  );
}
