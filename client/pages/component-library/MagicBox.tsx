import React from 'react';
import { MagicBoxExample } from '@/components/examples/MagicBoxExample';
import { StepAnimationExample } from '@/components/examples/StepAnimationExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function MagicBoxPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navMagicBox')} description={t('componentLibrary.descMagicBox')}>

      <div className={styles.pageGap}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Component Demo</h2>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <MagicBoxExample />
            </React.Suspense>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Step Animation</h2>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <StepAnimationExample />
            </React.Suspense>
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
