import React from 'react';
import { FilterChipExample } from '@/components/examples/FilterChipExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function FilterChipsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navFilterChips')} description={t('componentLibrary.descFilterChips')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <FilterChipExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
