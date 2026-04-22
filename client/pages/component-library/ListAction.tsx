import React from 'react';
import { ListActionExample } from '@/components/examples/ListActionExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function ListActionPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListAction')}
      description={t('componentLibrary.descListAction')}
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <ListActionExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
