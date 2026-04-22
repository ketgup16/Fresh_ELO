import React from 'react';
import { BreadcrumbExample } from '@/components/examples/BreadcrumbExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function BreadcrumbsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navBreadcrumbs')} description={t('componentLibrary.descBreadcrumbs')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <BreadcrumbExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
