import React from 'react';
import { CardHeaderExample } from '@/components/examples/CardHeaderExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function CardsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navCards')} description={t('componentLibrary.descCards')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <CardHeaderExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
