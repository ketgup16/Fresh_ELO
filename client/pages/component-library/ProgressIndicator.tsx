import React from 'react';
import { ProgressIndicatorExample } from '@/components/examples/ProgressIndicatorExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';

export default function ProgressIndicatorPage() {
  return (
    <ComponentPageLayout
      section="Components"
      title="Progress Indicator"
      description="Displays deterministic progress with a filled bar. Supports info, success, warning, and error variants."
    >
      <ProgressIndicatorExample />
    </ComponentPageLayout>
  );
}
