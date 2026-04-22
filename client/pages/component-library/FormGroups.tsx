import React from 'react';
import { FormGroupExample } from '@/components/examples/FormGroupExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function FormGroupsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navFormGroups')} description={t('componentLibrary.descFormGroups')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <FormGroupExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
