import React from 'react';
import SelectExample from '@/components/examples/SelectExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import styles from './Select.module.css';

export default function SelectPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.components')}
      title={t('componentLibrary.navSelect')}
      description={t('componentLibrary.descSelect')}
    >
      <div className={styles.demoCard}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <SelectExample />
        </React.Suspense>
      </div>

      <div className={styles.guidelines}>
        <h2 className={styles.guidelinesTitle}>
          {t('componentLibrary.usageGuidelines')}
        </h2>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>{t('componentLibrary.whenToUse')}</h3>
          <ul className={styles.list}>
            <li>{t('componentLibrary.selectWhenToUse1')}</li>
            <li>{t('componentLibrary.selectWhenToUse2')}</li>
            <li>{t('componentLibrary.selectWhenToUse3')}</li>
            <li>{t('componentLibrary.selectWhenToUse4')}</li>
          </ul>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>{t('componentLibrary.whenNotToUse')}</h3>
          <ul className={styles.list}>
            <li>{t('componentLibrary.selectWhenNotToUse1')}</li>
            <li>{t('componentLibrary.selectWhenNotToUse2')}</li>
            <li>{t('componentLibrary.selectWhenNotToUse3')}</li>
          </ul>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>{t('componentLibrary.accessibility')}</h3>
          <ul className={styles.list}>
            <li>{t('componentLibrary.selectA11y1')}</li>
            <li>{t('componentLibrary.selectA11y2')}</li>
            <li>{t('componentLibrary.selectA11y3')}</li>
            <li>{t('componentLibrary.selectA11y4')}</li>
          </ul>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>{t('componentLibrary.bestPractices')}</h3>
          <ul className={styles.list}>
            <li>{t('componentLibrary.selectBest1')}</li>
            <li>{t('componentLibrary.selectBest2')}</li>
            <li>{t('componentLibrary.selectBest3')}</li>
            <li>{t('componentLibrary.selectBest4')}</li>
            <li>{t('componentLibrary.selectBest5')}</li>
            <li>{t('componentLibrary.selectBest6')}</li>
            <li>{t('componentLibrary.selectBest7')}</li>
          </ul>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
