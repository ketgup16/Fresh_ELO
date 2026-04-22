import React from 'react';
import { SnackbarExample } from '@/components/examples/SnackbarExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function SnackbarsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navSnackbars')} description={t('componentLibrary.descSnackbars')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <SnackbarExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
