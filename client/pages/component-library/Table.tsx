import React from 'react';
import DataTableExample from '@/components/examples/DataTableExample';
import DataTableSubComponentsExample from '@/components/examples/DataTableSubComponentsExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function TablePage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.sharedSection')}
      title={t('componentLibrary.navTable')}
      description={t('componentLibrary.descTable')}
    >

      <div className={styles.pageGap}>
        {/* Full interactive example */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Full Example</h2>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <DataTableExample />
            </React.Suspense>
          </div>
        </div>

        {/* Sub-component showcase */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Sub-Components</h2>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <DataTableSubComponentsExample />
            </React.Suspense>
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
