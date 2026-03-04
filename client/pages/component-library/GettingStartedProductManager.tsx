import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './GettingStartedProductManager.module.css';

// ─── Data ───────────────────────────────────────────────────────────────────

const COMPONENT_BY_USE_CASE = [
  {
    category: 'User Input',
    components: ['Button', 'TextField', 'TextArea', 'Select', 'Checkbox', 'Radio', 'Switch', 'QuantityStepper', 'DatePicker', 'FilterChips'],
  },
  {
    category: 'Navigation',
    components: ['Tabs', 'Breadcrumbs', 'Links', 'LinkButtons', 'Menu', 'SideNavigation', 'BottomNav', 'TopNav'],
  },
  {
    category: 'Feedback & Status',
    components: ['Alert', 'Snackbar', 'Spinner', 'ProgressIndicator', 'ProgressTracker', 'Skeleton', 'ContentMessage', 'Nudge'],
  },
  {
    category: 'Data Display',
    components: ['DataTable', 'Cards', 'Badges', 'Tags', 'Metrics', 'Lists', 'Rating', 'Chips'],
  },
  {
    category: 'Overlays & Containers',
    components: ['Dialog / Modal', 'BottomSheet', 'Popover', 'Callout', 'Panel', 'Accordion'],
  },
  {
    category: 'Commerce',
    components: ['ItemTile', 'HeartView', 'WCPFlag', 'TimerView', 'QueueBanner', 'FloatingButton'],
  },
];

const PRD_SECTIONS = [
  {
    title: 'Feature Overview',
    description: 'One paragraph describing what the feature does and why it matters to the user.',
    example: 'Allow users to compare up to 4 products side-by-side on the search results page, helping them make faster purchase decisions.',
  },
  {
    title: 'User Stories',
    description: 'List user stories in "As a [role], I want [action], so that [benefit]" format.',
    example: 'As a shopper, I want to add items to a comparison tray from the product tile, so that I can compare prices and features without leaving the results page.',
  },
  {
    title: 'UI Components Required',
    description: 'Reference specific LD 3.5 or WCP components by name. Browse the Overview page for the full list.',
    example: 'Comparison tray: BottomSheet with Button (secondary) for each item slot. Product tile: add Checkbox overlay. Comparison view: DataTable with product images in header row.',
  },
  {
    title: 'States & Interactions',
    description: 'Describe every state the UI can be in: empty, loading, populated, error, edge cases.',
    example: 'Empty tray (0 items): hidden. 1 item: tray visible with "Add more to compare" prompt. 2-4 items: show "Compare" Button (primary). 4 items: disable add action, show Snackbar "Maximum 4 items".',
  },
  {
    title: 'Responsive Behavior',
    description: 'Describe how the feature adapts at standard breakpoints (1024px, 768px, 480px).',
    example: 'Desktop (>1024px): side-by-side DataTable. Tablet (768-1024px): 2-column stack. Mobile (<768px): swipeable carousel of product cards.',
  },
  {
    title: 'Acceptance Criteria',
    description: 'Measurable conditions that must be true for the feature to be considered done.',
    example: '1. User can add/remove items from comparison tray. 2. Tray persists across page navigation. 3. "Compare" button disabled until 2+ items selected. 4. Comparison view shows price, rating, key specs.',
  },
];

const WORKFLOW_STEPS = [
  {
    step: 'Write PRD',
    role: 'Product Manager',
    detail: 'Define the feature using the template below. Reference component names from the Overview page.',
  },
  {
    step: 'Design Review',
    role: 'Designer',
    detail: 'Designer maps PRD requirements to Figma using LD 3.5 components. Validates component availability.',
  },
  {
    step: 'Dev Handoff',
    role: 'Developer / AI Agent',
    detail: 'Developer or AI agent implements using existing components from client/components/ui/. No custom UI needed for referenced components.',
  },
  {
    step: 'QA Checklist',
    role: 'Everyone',
    detail: 'Verify: correct components used, responsive breakpoints work, theme compliance passes, accessibility checked.',
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button className={styles.copyBtn} onClick={copy}>
      {copied ? 'Copied!' : 'Copy template'}
    </button>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────

export function GettingStartedProductManager() {
  const templateText = PRD_SECTIONS.map(s => `## ${s.title}\n${s.description}\n\nExample:\n${s.example}`).join('\n\n---\n\n');

  return (
    <div className={styles.root}>
      {/* Intro */}
      <div className={styles.introBanner}>
        <h3 className={styles.introTitle}>For Product Managers</h3>
        <p className={styles.introText}>
          Write better PRDs by referencing the design system directly. When you name specific
          components in your requirements, designers and developers can move faster with
          fewer misunderstandings.
        </p>
      </div>

      {/* Workflow */}
      <SectionHeader title="Workflow: PRD to Production" subtitle="How a feature moves from requirement to shipped UI." />
      <div className={styles.workflowGrid}>
        {WORKFLOW_STEPS.map((step, i) => (
          <div key={i} className={styles.workflowCard}>
            <div className={styles.workflowStep}>{i + 1}</div>
            <div>
              <div className={styles.workflowTitle}>{step.step}</div>
              <div className={styles.workflowRole}>{step.role}</div>
              <div className={styles.workflowDetail}>{step.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Component quick reference */}
      <SectionHeader title="Component Quick Reference" subtitle="Available components grouped by use case. Use these names in your PRD." />
      <div className={styles.useCaseGrid}>
        {COMPONENT_BY_USE_CASE.map(group => (
          <div key={group.category} className={styles.useCaseCard}>
            <div className={styles.useCaseCategory}>{group.category}</div>
            <div className={styles.useCaseChips}>
              {group.components.map(c => (
                <span key={c} className={styles.useCaseChip}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.browseLink}>
        <Link to="/component-library">Browse all components in the Overview →</Link>
      </div>

      {/* PRD Template */}
      <SectionHeader title="PRD Template" subtitle="Copy this template as a starting point for any UI feature PRD." />
      <div className={styles.templateWrapper}>
        <div className={styles.templateHeader}>
          <span className={styles.templateLabel}>SKILL PRD Template</span>
          <CopyButton text={templateText} />
        </div>
        <div className={styles.templateBody}>
          {PRD_SECTIONS.map((section, i) => (
            <div key={i} className={styles.templateSection}>
              <div className={styles.templateSectionTitle}>{section.title}</div>
              <div className={styles.templateSectionDesc}>{section.description}</div>
              <div className={styles.templateSectionExample}>
                <span className={styles.exampleLabel}>Example:</span> {section.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <SectionHeader title="Tips for Writing Component-Aware PRDs" />
      <div className={styles.tipsList}>
        {[
          'Name components explicitly — "use a Dialog" instead of "show a popup"',
          'Specify variants — "Button (primary, large)" instead of just "a button"',
          'Define states — empty, loading, error, populated, disabled',
          'Reference breakpoints — 1024px (tablet), 768px (small tablet), 480px (phone)',
          'Link to component library pages when possible for visual reference',
          'Use the Assets page to reference specific illustrations or icons by name',
        ].map((tip, i) => (
          <div key={i} className={styles.tipItem}>
            <span className={styles.tipNumber}>{i + 1}</span>
            <span className={styles.tipText}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
