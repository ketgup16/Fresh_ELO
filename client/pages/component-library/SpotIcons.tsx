import React from 'react';
import { SpotIconExample } from '@/components/examples/SpotIconExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function SpotIconsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navSpotIcons')} description={t('componentLibrary.descSpotIcons')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <SpotIconExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
