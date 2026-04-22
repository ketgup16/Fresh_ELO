import React from 'react';
import { CheckboxExample } from '@/components/examples/CheckboxExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function CheckboxesPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navCheckboxes')} description={t('componentLibrary.descCheckboxes')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <CheckboxExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
