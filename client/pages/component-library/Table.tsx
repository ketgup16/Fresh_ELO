import React from 'react';
import DataTableExample from '@/components/examples/DataTableExample';
import DataTableSubComponentsExample from '@/components/examples/DataTableSubComponentsExample';
import DataTableMobileExample from '@/components/examples/DataTableMobileExample';
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

        {/* Mobile / compact variant */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Mobile Variant</h2>
          <p className={styles.desc}>
            Add the <code>compact</code> prop to <code>DataTable</code> to reduce cell padding from 16px to 8px,
            making rows more touch-friendly at narrow viewport widths. All sub-components (header, text cells,
            checkbox cells, action cells) automatically inherit the compact spacing — no extra configuration needed.
          </p>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <DataTableMobileExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
