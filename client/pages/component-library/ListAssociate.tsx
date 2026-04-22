import React from 'react';
import { ListAssociateExample } from '@/components/examples/ListAssociateExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import styles from './ListAssociate.module.css';
import pageStyles from '@/components/examples/ExamplePage.module.css';

export default function ListAssociatePage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListAssociate')}
      description={t('componentLibrary.descListAssociate')}
    >
      <div className={pageStyles.section}>
        <h2 className={pageStyles.sectionTitle}>Component Demo</h2>
        <div className={pageStyles.demoFrame}>
          <div className={styles.exampleWrapper}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <ListAssociateExample />
            </React.Suspense>
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
