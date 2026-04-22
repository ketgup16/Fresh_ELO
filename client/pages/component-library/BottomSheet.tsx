import React from 'react';
import { useTranslation } from 'react-i18next';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';

const BottomSheetExample = React.lazy(() => import('../../components/examples/BottomSheetExample'));

export default function BottomSheetPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navBottomSheet')} description={t('componentLibrary.descBottomSheet')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <BottomSheetExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
