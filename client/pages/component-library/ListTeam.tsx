import React from 'react';
import { ListTeamExample } from '@/components/examples/ListTeamExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import styles from '@/components/examples/ExamplePage.module.css';

export default function ListTeamPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListTeam')}
      description={t('componentLibrary.descListTeam')}
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <ListTeamExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
