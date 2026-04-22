import React from 'react';
import ChartExample from '@/components/examples/ChartExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function ChartPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navChart')} description={t('componentLibrary.descChart')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <ChartExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
