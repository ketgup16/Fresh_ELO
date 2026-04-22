import React from 'react';
import ContextMenuExample from '@/components/examples/ContextMenuExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function ContextMenuPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navContextMenu')} description={t('componentLibrary.descContextMenu')}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <ContextMenuExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
