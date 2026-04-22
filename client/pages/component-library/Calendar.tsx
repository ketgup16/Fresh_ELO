import React from 'react';
import CalendarExample from '@/components/examples/CalendarExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function CalendarPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navDatePickerCalendar')} description={t('componentLibrary.descCalendar')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <CalendarExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
