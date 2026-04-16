import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { IntelligentRecommendationExample } from '@/components/examples/IntelligentRecommendationExample';
import { useTranslation } from 'react-i18next';

export default function IntelligentRecommendationPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navIntelligentRecommendation')}
      description={t('componentLibrary.descIntelligentRecommendation')}
    >
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <IntelligentRecommendationExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
