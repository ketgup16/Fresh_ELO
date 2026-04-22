import React from 'react';
import { SpinnerExample } from '@/components/examples/SpinnerExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function SpinnersPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navSpinners')} description={t('componentLibrary.descSpinners')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <SpinnerExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
