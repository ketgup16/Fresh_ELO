import React from 'react';
import AXAvatarExample from '@/components/examples/AXAvatarExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function AXAvatarPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.wcpComponents')} title={t('componentLibrary.navAXAvatar')} description={t('componentLibrary.descAXAvatar')}>
      <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
        <AXAvatarExample />
      </React.Suspense>
    </ComponentPageLayout>
  );
}
