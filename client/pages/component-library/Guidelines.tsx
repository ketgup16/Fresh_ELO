import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import { GuidelinesDocIndex } from './GuidelinesDocIndex';
import { OverviewTab } from './guidelines-tabs/OverviewTab';
import { PrinciplesTab } from './guidelines-tabs/PrinciplesTab';
import { ComponentUsageTab } from './guidelines-tabs/ComponentUsageTab';
import { AccessibilityTab } from './guidelines-tabs/AccessibilityTab';
import { CodeStandardsTab } from './guidelines-tabs/CodeStandardsTab';
import { TokenUsageTab } from './guidelines-tabs/TokenUsageTab';
import { AgentRulesTab } from './guidelines-tabs/AgentRulesTab';

export default function GuidelinesPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.gettingStarted')} title={t('componentLibrary.guidelinesTitle')} description={t('componentLibrary.guidelinesDesc')}>

      <Tabs defaultValue="overview">
        <TabList>
          <Tab value="overview">{t('componentLibrary.tabOverview')}</Tab>
          <Tab value="principles">{t('componentLibrary.tabDesignPrinciples')}</Tab>
          <Tab value="components">{t('componentLibrary.tabComponentUsage')}</Tab>
          <Tab value="accessibility">{t('componentLibrary.tabAccessibility')}</Tab>
          <Tab value="code">{t('componentLibrary.tabCodeStandards')}</Tab>
          <Tab value="tokens">{t('componentLibrary.tabTokenUsage')}</Tab>
          <Tab value="agent">{t('componentLibrary.tabAgentRules')}</Tab>
          <Tab value="docs">{t('componentLibrary.tabDocIndex')}</Tab>
        </TabList>

        <TabPanel value="overview"><OverviewTab /></TabPanel>
        <TabPanel value="principles"><PrinciplesTab /></TabPanel>
        <TabPanel value="components"><ComponentUsageTab /></TabPanel>
        <TabPanel value="accessibility"><AccessibilityTab /></TabPanel>
        <TabPanel value="code"><CodeStandardsTab /></TabPanel>
        <TabPanel value="tokens"><TokenUsageTab /></TabPanel>
        <TabPanel value="agent"><AgentRulesTab /></TabPanel>
        <TabPanel value="docs"><GuidelinesDocIndex /></TabPanel>
      </Tabs>
    </ComponentPageLayout>
  );
}
