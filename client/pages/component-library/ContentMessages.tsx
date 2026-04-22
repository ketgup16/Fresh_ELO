import React from 'react';
import { ContentMessageExample } from '@/components/examples/ContentMessageExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function ContentMessagesPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navContentMessages')} description={t('componentLibrary.descContentMessages')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <ContentMessageExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
