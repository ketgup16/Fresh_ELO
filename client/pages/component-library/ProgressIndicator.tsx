import React from 'react';
import { ProgressIndicatorExample } from '@/components/examples/ProgressIndicatorExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';

export default function ProgressIndicatorPage() {
  return (
    <ComponentPageLayout
      section="Components"
      title="Progress Indicator"
      description="Displays deterministic progress with a filled bar. Supports info, success, warning, and error variants."
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Demo</h2>
        <div className={styles.demoFrame}>
          <ProgressIndicatorExample />
        </div>
      </div>
    </ComponentPageLayout>
  );
}
