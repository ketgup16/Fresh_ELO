import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { IntelligentInsightExample } from '@/components/examples/IntelligentInsightExample';
import { useTranslation } from 'react-i18next';
import exStyles from '@/components/examples/ExamplePage.module.css';

export default function IntelligentInsightPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navIntelligentInsight')}
      description={t('componentLibrary.descIntelligentInsight')}
    >
      <div className={exStyles.section}>
        <h2 className={exStyles.sectionTitle}>Component Demo</h2>
        <div className={exStyles.demoFrame}>
          <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
            <IntelligentInsightExample />
          </React.Suspense>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
