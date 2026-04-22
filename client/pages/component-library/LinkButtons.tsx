import React from 'react';
import { LinkButtonExample } from '@/components/examples/LinkButtonExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function LinkButtonsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navLinkButtons')} description={t('componentLibrary.descLinkButtons')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <LinkButtonExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
