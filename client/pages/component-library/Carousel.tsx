import React from 'react';
import CarouselExample from '@/components/examples/CarouselExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function CarouselPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navCarousel')} description={t('componentLibrary.descCarousel')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <CarouselExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
