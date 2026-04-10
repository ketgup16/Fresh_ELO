import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { IntelligentInsightExample } from '@/components/examples/IntelligentInsightExample';
import { useTranslation } from 'react-i18next';

export default function IntelligentInsightPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navIntelligentInsight')}
      description={t('componentLibrary.descIntelligentInsight')}
    >
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <IntelligentInsightExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
