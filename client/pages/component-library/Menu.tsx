import React from 'react';
import { MenuExample } from '@/components/examples/MenuExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function MenuPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navMenu')} description={t('componentLibrary.descMenu')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <MenuExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
