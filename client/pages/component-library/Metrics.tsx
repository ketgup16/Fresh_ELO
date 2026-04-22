import React from 'react';
import { MetricExample } from '@/components/examples/MetricExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function MetricsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navMetrics')} description={t('componentLibrary.descMetrics')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <MetricExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
