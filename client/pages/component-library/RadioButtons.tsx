import React from 'react';
import { RadioExample } from '@/components/examples/RadioExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function RadioButtonsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navRadioButtons')} description={t('componentLibrary.descRadioButtons')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <RadioExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
