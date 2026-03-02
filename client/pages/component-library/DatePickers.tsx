import React from 'react';
import { DatePickerExample } from '@/components/examples/DatePickerExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function DatePickersPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navDatePickers')} description={t('componentLibrary.descDatePickers')}>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <DatePickerExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
