import React from 'react';
import ScrollAreaExample from '@/components/examples/ScrollAreaExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function ScrollAreaPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navScrollArea')} description={t('componentLibrary.descScrollArea')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <ScrollAreaExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
