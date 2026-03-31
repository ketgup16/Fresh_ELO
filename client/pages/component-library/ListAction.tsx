import React from 'react';
import { ListActionExample } from '@/components/examples/ListActionExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function ListActionPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.listCategory')}
      title={t('componentLibrary.navListAction')}
      description={t('componentLibrary.descListAction')}
    >
      <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
        <ListActionExample />
      </React.Suspense>
    </ComponentPageLayout>
  );
}
