import React from 'react';
import AlertDialogExample from '@/components/examples/AlertDialogExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function AlertDialogPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navAlertDialog')} description={t('componentLibrary.descAlertDialog')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <AlertDialogExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
