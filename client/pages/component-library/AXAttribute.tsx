import React from 'react';
import AXAttributeExample from '@/components/examples/AXAttributeExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function AXAttributePage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navAXAttribute')}
      description={t('componentLibrary.descAXAttribute')}
    >
      <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
        <AXAttributeExample />
      </React.Suspense>
    </ComponentPageLayout>
  );
}
