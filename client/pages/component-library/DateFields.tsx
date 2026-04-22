import React from 'react';
import { DateFieldExample } from '@/components/examples/DateFieldExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function DateFieldsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navDateFields')} description={t('componentLibrary.descDateFields')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <DateFieldExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
