import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { IntelligentInsightExample } from '@/components/examples/IntelligentInsightExample';
import { useTranslation } from 'react-i18next';
import styles from './IntelligentInsight.module.css';

export default function IntelligentInsightPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navIntelligentInsight')}
      description={t('componentLibrary.descIntelligentInsight')}
    >
      <div className={styles.demoWrapper}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <IntelligentInsightExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
