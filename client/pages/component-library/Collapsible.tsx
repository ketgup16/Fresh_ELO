import React from 'react';
import CollapsibleExample from '@/components/examples/CollapsibleExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function CollapsiblePage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navCollapsible')} description={t('componentLibrary.descCollapsible')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <CollapsibleExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
