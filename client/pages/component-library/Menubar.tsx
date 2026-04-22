import React from 'react';
import MenubarExample from '@/components/examples/MenubarExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function MenubarPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navMenubar')} description={t('componentLibrary.descMenubar')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <MenubarExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
