import React from 'react';
import { useTranslation } from 'react-i18next';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
const IconButtonExample = React.lazy(() => import('@/components/examples/IconButtonExample'));

export default function IconButtonsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navIconButtons')} description={t('componentLibrary.descIconButtons')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <IconButtonExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
