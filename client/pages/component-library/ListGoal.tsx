import React from 'react';
import { ListGoalExample } from '@/components/examples/ListGoalExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import styles from './ListGoal.module.css';

export default function ListGoalPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListGoal')}
      description={t('componentLibrary.descListGoal')}
    >
      <div className={styles.exampleWrapper}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ListGoalExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
