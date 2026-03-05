import React, { useState, useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/Checkbox';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { PMOnboardingQuiz } from './PMOnboardingQuiz';

/* ── Helpers ── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px', borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '20px' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)', overflow: 'hidden',
    }}>
      <Accordion type="single" collapsible defaultValue={defaultOpen ? 'section' : ''}>
        <AccordionItem value="section" style={{ borderBottom: 'none' }}>
          <AccordionTrigger style={{ padding: '24px 32px', fontSize: '20px', fontWeight: 700 }}>
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ padding: '0 32px 32px' }}>{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function NumberedList({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{
            minWidth: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--ld-semantic-color-action-fill-primary)',
            color: 'var(--ld-semantic-color-text-inverse)',
            fontWeight: 700, fontSize: 16,
          }}>{i + 1}</span>
          <div style={{ paddingTop: 6 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ld-semantic-color-text)', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{item.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 2. Resources Card ── */

const RESOURCES = [
  { label: 'PRD Template', desc: 'Copy the structured PRD template to define your feature requirements', href: '#prd-template', external: false },
  { label: 'Builder Academy', desc: 'Video tutorials and guided learning paths', href: 'https://www.builder.io/c/docs', external: true },
  { label: 'Figma Lunch & Learns', desc: 'Workshop recordings and session notes', href: 'https://airtable.com/appEGZA2KCbx3A6IP/shr35BhsPf4bNULE1', external: true },
  { label: 'Component Library', desc: 'Browse all 50+ LD 3.5 components with live examples', href: '/component-library', external: false },
  { label: 'Component Sandbox', desc: 'Test any component interactively with live controls', href: '/component-library/component-tester', external: false },
];

function ResourcesCard() {
  return (
    <div style={{
      background: 'var(--ld-semantic-color-surface)',
      borderRadius: 8, borderTop: '4px solid var(--ld-semantic-color-border-brand)',
      boxShadow: 'var(--ld-semantic-elevation-100)', padding: 32,
    }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: 8 }}>Resources</h3>
      <p style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20, lineHeight: 1.6 }}>
        Key links to get oriented, write better PRDs, and build with the design system.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {RESOURCES.map(r => (
          <a key={r.label} href={r.href} target={r.external ? '_blank' : undefined}
            rel={r.external ? 'noopener noreferrer' : undefined}
            style={{
              display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px',
              borderRadius: 8, textDecoration: 'none', transition: 'background 120ms',
              background: 'var(--ld-semantic-color-fill-subtle)',
              border: '1px solid transparent',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ld-semantic-color-fill-brand-subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--ld-semantic-color-border-brand)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ld-semantic-color-fill-subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-link)', display: 'flex', alignItems: 'center', gap: 4 }}>
              {r.label}{r.external && <span style={{ fontSize: 11 }}>↗</span>}
            </span>
            <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>{r.desc}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── 5. PRD Template (conditional) ── */

interface PRDField {
  id: string;
  label: string;
  placeholder: string;
  isTextArea?: boolean;
}

const PRD_FIELDS: PRDField[] = [
  { id: 'name', label: 'Feature name', placeholder: 'e.g. Campaign Performance Dashboard' },
  { id: 'story', label: 'User story', placeholder: 'As a ___, I want to ___, so that ___' },
  { id: 'show', label: 'What to display', placeholder: 'e.g. Table of campaigns, KPI cards' },
  { id: 'fields', label: 'Data fields', placeholder: 'e.g. Campaign name, daily budget, ROAS, status' },
  { id: 'actions', label: 'Actions', placeholder: 'e.g. Sort, filter by status, export CSV' },
  { id: 'filters', label: 'Filters', placeholder: 'e.g. Date range, campaign type' },
  { id: 'volume', label: 'Data volume', placeholder: 'e.g. Up to 500 rows, paginated 20 per page' },
  { id: 'empty', label: 'Empty state', placeholder: 'e.g. "No campaigns found" with CTA button' },
  { id: 'outofscope', label: 'Out of scope', placeholder: 'e.g. No export, no inline editing' },
  { id: 'notes', label: 'Additional notes', placeholder: 'Any edge cases, constraints, or open questions', isTextArea: true },
];

function PRDTemplate() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const filled = Object.values(values).filter(v => v.trim().length > 0).length;
  const total = PRD_FIELDS.length;

  const handleCopy = useCallback(async () => {
    const text = PRD_FIELDS
      .map(f => `${f.label}:\n${values[f.id] ?? '(not filled)'}`)
      .join('\n\n');
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* silent */ }
  }, [values]);

  return (
    <div id="prd-template" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 9999, background: 'var(--ld-semantic-color-fill-subtle)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 9999, transition: 'width 300ms ease',
            background: filled === total ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)',
            width: `${(filled / total) * 100}%`,
          }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>
          {filled} / {total} filled
        </span>
      </div>

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {PRD_FIELDS.filter(f => !f.isTextArea).map(f => (
          <TextField
            key={f.id}
            label={f.label}
            size="small"
            value={values[f.id] ?? ''}
            placeholder={f.placeholder}
            onChange={e => setValues(prev => ({ ...prev, [f.id]: e.target.value }))}
          />
        ))}
      </div>
      {PRD_FIELDS.filter(f => f.isTextArea).map(f => (
        <TextArea
          key={f.id}
          label={f.label}
          size="small"
          value={values[f.id] ?? ''}
          placeholder={f.placeholder}
          onChange={e => setValues(prev => ({ ...prev, [f.id]: e.target.value }))}
        />
      ))}

      <div>
        <Button variant={copied ? 'secondary' : 'primary'} size="medium" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy PRD as prompt'}
        </Button>
      </div>
    </div>
  );
}

/* ── 6. Before You Prompt Checklist ── */

const BEFORE_PROMPT_ITEMS = [
  { label: 'Know what data you\'re showing', sub: 'Metrics, list, chart trend, or stats?' },
  { label: 'Know the user action', sub: 'Filter, drill down, export, apply, or read?' },
  { label: 'Have an empty state in mind', sub: 'What shows when there\'s no data?' },
  { label: 'Have a PRD or create one', sub: 'Use the PRD template below' },
];

function BeforeYouPromptChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const total = BEFORE_PROMPT_ITEMS.length;
  const doneCount = checked.size;
  const allDone = doneCount === total;

  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 9999, background: 'var(--ld-semantic-color-fill-subtle)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 9999, transition: 'width 300ms ease',
            background: allDone ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)',
            width: `${(doneCount / total) * 100}%`,
          }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>
          {doneCount} / {total}
        </span>
        {allDone && (
          <span style={{
            padding: '2px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700,
            background: 'var(--ld-semantic-color-fill-positive-subtle)',
            color: 'var(--ld-semantic-color-text-positive)',
            border: '1px solid var(--ld-semantic-color-border-positive)',
          }}>
            Ready to prompt!
          </span>
        )}
      </div>

      {BEFORE_PROMPT_ITEMS.map((item, i) => {
        const done = checked.has(i);
        return (
          <div key={i} onClick={() => toggle(i)} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
            borderRadius: 8, cursor: 'pointer',
            background: done ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
            border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`,
            transition: 'all 200ms ease',
          }}>
            <div style={{ paddingTop: 2 }}>
              <Checkbox checked={done} onCheckedChange={() => toggle(i)} aria-label={item.label} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: done ? 'var(--ld-semantic-color-text-subtle)' : 'var(--ld-semantic-color-text)', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.4 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', marginTop: 2 }}>{item.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── PM Quick-Start Prompts ── */

interface Prompt { label: string; full: string; }

const PM_PROMPT_CATEGORIES: { category: string; value: string; prompts: Prompt[] }[] = [
  {
    category: 'Dashboards',
    value: 'dashboards',
    prompts: [
      { label: 'Campaign performance dashboard', full: 'Create a campaign performance dashboard page with a page header, a row of 4 KPI metric cards (impressions, clicks, spend, CTR), a line chart showing 30-day trends, and a filterable DataTable with campaign rows. Use Card, DataTable, and semantic tokens throughout.' },
      { label: 'Executive summary view', full: 'Build an executive summary dashboard with a hero metric section (3 large KPI numbers with trend badges), a 2-column chart grid, and a ranked list with progress bars. All data should be mock data defined in a constant at the top of the file.' },
    ],
  },
  {
    category: 'Data Tables',
    value: 'tables',
    prompts: [
      { label: 'Filterable sortable table', full: 'Create a DataTable with sortable column headers, a filter toolbar (search field + status Select + date range), row selection checkboxes, status Tag badges, and pagination. Use the rounded prop since this is a standalone table.' },
      { label: 'Table with detail panel', full: 'Build a full-width DataTable where clicking a row opens a resizable Panel on the right side with row details. The panel should have a header, close button, and 3 sections of detail content using semantic tokens.' },
    ],
  },
  {
    category: 'Charts & Visualizations',
    value: 'charts',
    prompts: [
      { label: 'Line chart with time controls', full: 'Add a line chart using Recharts with a time range selector (7D / 30D / 90D as SegmentedControl), a chart title, a legend, and a summary row below the chart showing total, average, and peak values.' },
      { label: 'Bar chart comparison', full: 'Create a grouped bar chart comparing two metrics over the last 6 months. Include axis labels, a legend, and hover tooltips. Use ld-semantic chart color tokens for the bar colors.' },
    ],
  },
  {
    category: 'Metric Cards',
    value: 'metrics',
    prompts: [
      { label: 'KPI card grid', full: 'Create a responsive 4-column metric card grid (2 columns on tablet, 1 on mobile). Each card shows: a label, a large number, a percentage change with a green up or red down arrow Tag, and a small sparkline at the bottom.' },
      { label: 'Single metric highlight card', full: 'Build a hero metric card that takes the full width, shows a very large number (48px), a descriptive label, a trend badge, and a "View breakdown" Link below. Use Card with semantic tokens.' },
    ],
  },
  {
    category: 'Recommendations',
    value: 'recommendations',
    prompts: [
      { label: 'Recommendation list', full: 'Create a vertical list of recommendation cards. Each card has a title, a 2-line description, a confidence score badge (Tag), and two buttons: Apply (primary) and Dismiss (tertiary). Show a Snackbar confirmation when Apply is clicked.' },
      { label: 'Recommendation carousel', full: 'Build a horizontal scrolling carousel of recommendation cards with previous/next IconButtons. Each card shows an icon, title, description, potential impact metric, and an Apply button.' },
    ],
  },
  {
    category: 'Starting from Scratch',
    value: 'scratch',
    prompts: [
      { label: 'New data feature page', full: 'I am starting a new data feature page from scratch. Create the page shell with a page header (title + subtitle + action button), a filter row, a content area placeholder, and proper responsive behavior at 1024px, 768px, and 480px breakpoints.' },
      { label: 'Generate from PRD notes', full: 'Here are my rough requirements: [paste your notes here]. Based on these, create a data display page using LD 3.5 components. Choose the most appropriate components (DataTable, Card, Chart) for the data described.' },
    ],
  },
];

function PromptChip({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(prompt.full); setCopied(true); setTimeout(() => setCopied(false), 1500); }
    catch { /* silent */ }
  }, [prompt.full]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <button onClick={handleCopy} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
          backgroundColor: copied ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
          border: `1px solid ${copied ? 'var(--ld-semantic-color-border-positive)' : 'var(--ld-semantic-color-border-moderate)'}`,
          borderRadius: '9999px', fontSize: '13px', fontWeight: 500,
          color: copied ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-text)',
          cursor: 'pointer', fontFamily: 'var(--ld-semantic-font-family-sans)', lineHeight: '20px',
          transition: 'all 150ms ease', whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '12px', flexShrink: 0 }}>{copied ? '✓' : '⌘'}</span>
          {copied ? 'Copied!' : prompt.label}
        </button>
        <button onClick={() => setShowFull(!showFull)} style={{
          background: 'none', border: 'none', padding: '2px', cursor: 'pointer',
          color: 'var(--ld-semantic-color-text-subtle)', fontSize: '11px',
          fontFamily: 'var(--ld-semantic-font-family-sans)', lineHeight: 1, opacity: 0.6,
        }}>
          {showFull ? '▲' : '▼'}
        </button>
      </div>
      {showFull && (
        <div style={{
          marginTop: '6px', marginLeft: '8px', padding: '10px 14px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '6px',
          borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
          fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', fontStyle: 'italic',
        }}>
          &ldquo;{prompt.full}&rdquo;
        </div>
      )}
    </div>
  );
}

/* ── Main ── */

export function GettingStartedProductManager() {
  const [hasPRD, setHasPRD] = useState<string | undefined>(undefined);

  const showPRDTemplate = hasPRD === 'no' || hasPRD === 'rough';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* 1. Intro Banner */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px', borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '8px' }}>
          For Product Managers
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
          Write better feature requirements by referencing the design system directly. When you name specific
          LD 3.5 components in your PRD, designers and developers move faster with fewer misunderstandings.
          Use the quiz below to generate an AI prompt tailored to your data feature &mdash; or jump straight to the PRD template.
        </p>
      </div>

      {/* 2. Resources Card */}
      <ResourcesCard />

      {/* 4. Onboarding Quiz */}
      <PMOnboardingQuiz onComplete={setHasPRD} />

      {/* 5. Conditional PRD Template */}
      {showPRDTemplate && (
        <SectionCard title={hasPRD === 'rough' ? 'Formalize Your PRD' : 'Create Your PRD'}>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 24 }}>
            {hasPRD === 'rough'
              ? 'You have rough notes — fill in the fields below to turn them into a structured PRD you can paste directly into the AI agent.'
              : "You don't have a PRD yet. Fill in as many fields as you can — even partial answers help the AI generate a better feature."}
          </p>
          <PRDTemplate />
        </SectionCard>
      )}

      {/* 6. Before You Prompt Checklist */}
      <SectionCard title="Before You Prompt">
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20 }}>
          Check these off before pasting your prompt into the AI agent.
        </p>
        <BeforeYouPromptChecklist />
      </SectionCard>

      {/* 7. How It Works */}
      <SectionCard title="How It Works">
        <NumberedList items={[
          { label: 'You describe the feature', detail: 'Via the quiz, PRD template, or plain language — the more specific, the better.' },
          { label: 'The agent analyzes requirements', detail: 'Maps your requirements to LD 3.5 components, checks rule compliance, and flags conflicts.' },
          { label: 'The agent builds the feature', detail: 'Generates production-ready code using semantic tokens, correct components, and accessibility built in.' },
          { label: 'You review and iterate', detail: 'Changes appear in the live preview. Describe adjustments in plain language and the agent updates the code.' },
        ]} />
      </SectionCard>

      {/* 9. Quick-Start Prompts — collapsed */}
      <CollapsibleSection title="Quick-Start Prompts">
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20 }}>
          Click any chip to copy the full prompt. Use the arrow to preview before copying.
        </p>
        <Accordion type="multiple" defaultValue={['dashboards']}>
          {PM_PROMPT_CATEGORIES.map(({ category, value, prompts }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flexDirection: 'column' }}>
                  {prompts.map(prompt => <PromptChip key={prompt.label} prompt={prompt} />)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleSection>

      {/* 10. Tips — collapsed */}
      <CollapsibleSection title="Tips for Better Results">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Name components explicitly', bad: 'Show a popup', good: 'Show a Dialog component with a title, description, Cancel (secondary) and Confirm (primary) buttons' },
            { title: 'Specify states — not just the happy path', bad: 'Show the data', good: 'Show a Skeleton while loading, the DataTable when data arrives, and a ContentMessage ("No results found") when the list is empty' },
            { title: 'Reference breakpoints', bad: 'Make it mobile friendly', good: 'Stack the 3 metric cards to 1 column below 768px, hide the secondary chart below 480px' },
            { title: 'Name the user action', bad: 'Add filtering', good: 'Add a FilterChip row (Status, Date range, Type). Clicking a chip filters the DataTable in real time without a submit button' },
          ].map(tip => (
            <div key={tip.title} style={{ padding: '16px 20px', borderRadius: 8, background: 'var(--ld-semantic-color-fill-subtle)' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-text)', marginBottom: 10 }}>{tip.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✗</span>
                  <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', fontStyle: 'italic', lineHeight: 1.5 }}>Instead of: &ldquo;{tip.bad}&rdquo;</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-positive)', fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text)', lineHeight: 1.5 }}>Say: &ldquo;{tip.good}&rdquo;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 11. What the Agent Knows — collapsed */}
      <CollapsibleSection title="What the Agent Knows">
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20 }}>
          The AI agent has full knowledge of all of these — you can reference any of them by name in your prompt.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { label: '50+ LD 3.5 Components', desc: 'Buttons, forms, tables, charts, modals, and more' },
            { label: '303+ Icons', desc: 'Full icon library at /component-library/icons' },
            { label: '624+ Design Tokens', desc: 'Semantic colors, spacing, typography, elevation' },
            { label: '8 Chart Color Tokens', desc: 'ld-semantic-color-data-chart-* series' },
            { label: 'Recharts Library', desc: 'Line, bar, area, pie charts out of the box' },
            { label: '16+ Enforcement Rules', desc: 'Token compliance, component rules, a11y patterns' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '16px', borderRadius: 8, background: 'var(--ld-semantic-color-fill-subtle)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-text)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 12. FAQ — collapsed */}
      <CollapsibleSection title="Frequently Asked Questions">
        <Accordion type="multiple">
          {[
            { q: 'Do I need to know React or code?', a: 'No. You describe what you want in plain English. The AI agent handles all the code — components, tokens, accessibility, and responsive behavior. Your job is to write clear requirements.' },
            { q: 'Can I iterate after it\'s built?', a: 'Yes. Describe the change you want ("make the table sortable", "add a status filter") and the agent updates the code immediately in the live preview.' },
            { q: 'What if I disagree with what the agent built?', a: 'Be specific about what to change. Instead of "that\'s wrong", say "change the metric card to show a line chart instead of the number" — the more precise the feedback, the better the result.' },
            { q: 'How do I see my changes?', a: 'Changes appear in the live preview panel in real time. You can also open the preview in a full browser window using the Open Preview button.' },
            { q: 'How do I share my work?', a: 'Push your changes using the Push button in the top-right corner to send them to the git remote. You can also deploy to Netlify or Vercel via the MCP integrations.' },
            { q: 'What if the component I described doesn\'t exist?', a: 'The agent will use the closest available LD 3.5 component and note the substitution. If a truly custom component is needed, it will build one following the WCP component creation rules.' },
          ].map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger style={{ fontSize: 15, fontWeight: 600, textAlign: 'left' }}>{q}</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ld-semantic-color-text-subtle)', margin: 0, paddingBottom: 4 }}>{a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleSection>

    </div>
  );
}
