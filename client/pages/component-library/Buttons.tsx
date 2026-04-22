import React from 'react';
import { ButtonExample } from '@/components/examples/ButtonExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function ButtonsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navButtons')} description={t('componentLibrary.buttonsPageDesc')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <ButtonExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
