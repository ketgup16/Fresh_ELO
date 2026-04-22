import React from 'react';
import NavigationMenuExample from '@/components/examples/NavigationMenuExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function NavigationMenuPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navNavigationMenu')} description={t('componentLibrary.descNavigationMenu')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <NavigationMenuExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
