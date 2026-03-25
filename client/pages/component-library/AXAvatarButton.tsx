import React from 'react';
import AXAvatarButtonExample from '@/components/examples/AXAvatarButtonExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function AXAvatarButtonPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.wcpComponents')}
      title={t('componentLibrary.navAXAvatarButton')}
      description={t('componentLibrary.descAXAvatarButton')}
    >
      <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
        <AXAvatarButtonExample />
      </React.Suspense>
    </ComponentPageLayout>
  );
}
