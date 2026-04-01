import React from 'react';
import { ListAssociateExample } from '@/components/examples/ListAssociateExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import styles from './ListAssociate.module.css';

export default function ListAssociatePage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListAssociate')}
      description={t('componentLibrary.descListAssociate')}
    >
      <div className={styles.exampleWrapper}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ListAssociateExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
