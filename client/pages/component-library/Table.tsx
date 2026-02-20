import React from 'react';
import DataTableExample from '@/components/examples/DataTableExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

export default function TablePage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navTable')} description={t('componentLibrary.descTable')} />
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)', overflow: 'hidden', border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)' }}>
        <React.Suspense fallback={<div style={{ padding: '32px' }}>{t('componentLibrary.loading')}</div>}>
          <DataTableExample />
        </React.Suspense>
      </div>
    </div>
  );
}
