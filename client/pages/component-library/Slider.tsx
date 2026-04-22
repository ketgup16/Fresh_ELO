import React from 'react';
import SliderExample from '@/components/examples/SliderExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function SliderPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navSlider')} description={t('componentLibrary.descSlider')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <SliderExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
