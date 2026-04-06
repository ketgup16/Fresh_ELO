import React from 'react';
import { ListTeamExample } from '@/components/examples/ListTeamExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import styles from './ListTeam.module.css';

export default function ListTeamPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListTeam')}
      description={t('componentLibrary.descListTeam')}
    >
      <div className={styles.exampleWrapper}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ListTeamExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
