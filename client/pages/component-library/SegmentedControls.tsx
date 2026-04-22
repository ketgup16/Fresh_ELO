import React from 'react';
import { SegmentedControlExample } from '@/components/examples/SegmentedControlExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function SegmentedControlsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.components')}
      title={t('componentLibrary.navSegmentedControl')}
      description="A linear set of 2–5 mutually exclusive segments, each functioning as a button. Used to filter content or switch between related views."
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <SegmentedControlExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
