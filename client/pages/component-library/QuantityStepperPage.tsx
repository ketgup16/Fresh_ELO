import React from 'react';
import { QuantityStepperExample } from '@/components/examples/QuantityStepperExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function QuantityStepperPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.components')}
      title={t('componentLibrary.navQuantityStepper')}
      description={t('componentLibrary.quantityStepperDesc')}
    >

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <QuantityStepperExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
