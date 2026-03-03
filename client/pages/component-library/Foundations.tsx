import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { ThemesContentWrapper } from './Themes';
import { DesignTokensContent } from './DesignTokens';

export default function FoundationsPage() {
  return (
    <ComponentPageLayout
      section="Getting Started"
      title="Foundations"
      description="Theme switching, live token explorer, and the full project token reference — all in one place."
    >
      <Tabs defaultValue="themes">
        <TabList>
          <Tab value="themes">Themes &amp; Tokens</Tab>
          <Tab value="project-tokens">Project Token Usage</Tab>
        </TabList>

        <TabPanel value="themes">
          <ThemesContentWrapper />
        </TabPanel>

        <TabPanel value="project-tokens">
          <DesignTokensContent />
        </TabPanel>
      </Tabs>
    </ComponentPageLayout>
  );
}
