import React from 'react';
import SkeletonExample from '@/components/examples/SkeletonExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function SkeletonPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navSkeleton')} description={t('componentLibrary.descSkeleton')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <SkeletonExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
