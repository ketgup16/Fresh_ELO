import React from 'react';
import DateRangePickerExample from '@/components/examples/DateRangePickerExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function DateRangePickerPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navDateRangePicker')} description={t('componentLibrary.descDatePickers')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <DateRangePickerExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
