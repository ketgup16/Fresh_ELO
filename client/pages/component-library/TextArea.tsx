import React from 'react';
import TextareaExample from '@/components/examples/TextareaExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function TextAreaPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navTextArea')} description={t('componentLibrary.descTextArea')}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <TextareaExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
