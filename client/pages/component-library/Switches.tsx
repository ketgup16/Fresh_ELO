import React from 'react';
import SwitchExample from '@/components/examples/SwitchExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function SwitchesPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navSwitches')} description={t('componentLibrary.descSwitches')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <SwitchExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
