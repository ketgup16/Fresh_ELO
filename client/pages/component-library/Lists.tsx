import React from 'react';
import { ListExample } from '@/components/examples/ListExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function ListsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navLists')} description={t('componentLibrary.descLists')}>

      <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
        <ListExample />
      </React.Suspense>
    </ComponentPageLayout>
  );
}
