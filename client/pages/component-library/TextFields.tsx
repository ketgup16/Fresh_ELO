import React from 'react';
import { TextFieldExample } from '@/components/examples/TextFieldExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

const LabelExample = React.lazy(() => import('@/components/examples/LabelExample'));

export default function TextFieldsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navTextFields')} description={t('componentLibrary.textFieldsPageDesc')}>

      <div className={styles.pageGap}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Component Demo</h2>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <TextFieldExample />
            </React.Suspense>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('componentLibrary.labelsHeading')}</h2>
          <p className={styles.desc}>{t('componentLibrary.labelsDesc')}</p>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <LabelExample />
            </React.Suspense>
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
