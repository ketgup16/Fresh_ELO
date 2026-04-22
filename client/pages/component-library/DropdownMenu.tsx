import React from 'react';
import DropdownMenuExample from '@/components/examples/DropdownMenuExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function DropdownMenuPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navDropdownMenu')} description={t('componentLibrary.descDropdownMenu')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <DropdownMenuExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
