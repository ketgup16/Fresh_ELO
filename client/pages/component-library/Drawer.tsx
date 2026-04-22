import React from 'react';
import DrawerExample from '@/components/examples/DrawerExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

export default function DrawerPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navBottomSheet')} description={t('componentLibrary.descBottomSheet')}>
      <div className={styles.pageGap}>
        <div className={styles.guidelineCard} style={{ borderLeft: '4px solid var(--ld-semantic-color-feedback-warning-border)' }}>
          <p className={styles.desc}>
            <strong>{t('componentLibrary.componentReplaced')}</strong>{' '}
            <span dangerouslySetInnerHTML={{ __html: t('componentLibrary.drawerReplacedDesc') }} />
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Component Demo</h2>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
              <DrawerExample />
            </React.Suspense>
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
