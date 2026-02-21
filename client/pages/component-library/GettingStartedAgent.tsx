import React from 'react';

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '20px',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div style={{
      fontFamily: 'var(--ld-semantic-font-family-mono)',
      fontSize: '13px',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      padding: '16px 20px',
      borderRadius: '6px',
      lineHeight: 1.8,
      whiteSpace: 'pre-wrap',
      color: 'var(--ld-semantic-color-text)',
      overflowX: 'auto',
    }}>
      {children}
    </div>
  );
}

export function GettingStartedAgent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Intro */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px',
        borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          For AI Agents (Builder.io Fusion)
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0,
        }}>
          This guide covers how AI agents should interact with the Living Design 3.5 Portable Kit
          when generating or modifying code. Agents must follow these rules to produce output that
          is indistinguishable from hand-crafted, library-compliant code.
        </p>
      </div>

      {/* First-Run Setup: Template Pages */}
      <SectionCard title="First-Run Setup: Template Pages">
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--ld-semantic-color-fill-warning-subtle)',
          borderRadius: '8px',
          borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
          marginBottom: '16px',
        }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
            Required: Ask before installing
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
            When setting up this package in a new or existing project, the agent <strong>must ask the user</strong> whether
            they want to keep the template application pages. These are demo pages that showcase how to build
            with the kit — they are not part of the design system itself. If the user says no, delete them.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Template pages to remove (if user declines)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { file: 'client/pages/Index.tsx', route: '/' },
                { file: 'client/pages/Catalog.tsx', route: '/catalog' },
                { file: 'client/pages/PageTemplate.tsx', route: '/page-template' },
                { file: 'client/pages/LandingConnection.tsx', route: '/landing-connection' },
                { file: 'client/pages/LandingSummary.tsx', route: '/landing-summary' },
                { file: 'client/pages/DetailItem.tsx', route: '/detail-item' },
                { file: 'client/pages/landing-summary/', route: '(supporting components)' },
              ].map((item) => (
                <div key={item.file} style={{
                  display: 'grid',
                  gridTemplateColumns: '340px 1fr',
                  gap: '12px',
                  padding: '8px 14px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  alignItems: 'center',
                }}>
                  <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', color: 'var(--ld-semantic-color-text)' }}>
                    {item.file}
                  </code>
                  <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.route}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              After deleting template pages, the agent must also
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Remove the corresponding route entries from client/App.tsx',
                'Remove any lazy imports for the deleted pages in App.tsx',
                'Update the home route (/) to point to /component-library or the user\'s preferred landing page',
                'Delete the client/pages/landing-summary/ folder and all its supporting components',
                'Keep the NotFound page (client/pages/NotFound.tsx) — it is still needed for 404 handling',
                'Keep all Component Library pages under client/pages/component-library/ — these are part of the design system',
                'Verify the dev server still runs without errors after deletion',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-brand-bold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Pre-Implementation Checklist */}
      <SectionCard title="Pre-Implementation Checklist">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Before writing any JSX, the agent must complete every step:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { step: 'Search the component inventory', detail: 'Scan client/components/ui/ for an existing Living Design 3.5 component. Check guidelines/ for documentation.' },
            { step: 'Read the component docs', detail: 'Open the matching .md file to understand available props, variants, sizes, and states. Never guess the API.' },
            { step: 'Compose before creating', detail: 'If no single component matches, compose existing components together. Do not create a new component when composition works.' },
            { step: 'Resolve all values to tokens', detail: 'Every color, spacing, border-radius, elevation, and font must use a var(--ld-semantic-*) token. Zero hard-coded values.' },
            { step: 'Include all interactive states', detail: 'Hover, focus, active, and disabled states must use the appropriate token variants (-hovered, -pressed, -disabled).' },
            { step: 'Output accessible markup', detail: 'Semantic HTML, ARIA attributes, keyboard handlers, and focus management. WCAG 2.1 AA compliance is mandatory.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
            }}>
              <div style={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-brand-bold)',
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Key File Locations */}
      <SectionCard title="Key File Locations">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { path: 'client/components/ui/', desc: 'All LD 3.5 components (Button.tsx, TextField.tsx, Tag.tsx, etc.)' },
            { path: 'client/components/ui/*.module.css', desc: 'Component CSS modules using semantic tokens' },
            { path: 'client/components/icons/', desc: 'Icon library (303 icons, 20x20 viewBox, currentColor)' },
            { path: 'client/components/icons-custom/', desc: 'Custom project-specific icons' },
            { path: 'client/styles/semantic.css', desc: 'All semantic tokens (648 lines)' },
            { path: 'client/styles/primitive.css', desc: 'Primitive tokens (364 lines)' },
            { path: 'client/styles/themes/', desc: 'Brand theme overrides (walmart, sams-club, etc.)' },
            { path: 'client/locales/en/common.json', desc: 'English translation strings' },
            { path: 'client/locales/es/common.json', desc: 'Spanish translation strings' },
            { path: 'client/locales/fr/common.json', desc: 'French translation strings' },
            { path: 'guidelines/', desc: 'Design system rules and component documentation' },
            { path: 'guidelines/rules/', desc: 'Enforcement rules (tokens, icons, components, layout)' },
            { path: 'client/App.tsx', desc: 'Route registration for all pages' },
          ].map((item) => (
            <div key={item.path} style={{
              display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: '16px',
              padding: '10px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              alignItems: 'center',
            }}>
              <code style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                color: 'var(--ld-semantic-color-text)',
              }}>
                {item.path}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Import Conventions */}
      <SectionCard title="Import Conventions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
              Living Design 3.5 Components (Uppercase filenames)
            </div>
            <CodeBlock>{`import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { TextField } from '@/components/ui/TextField';
import { Tag } from '@/components/ui/tag';
import { PageHeader } from '@/components/ui/PageHeader';`}</CodeBlock>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
              Shadcn/Radix Components (Lowercase filenames)
            </div>
            <CodeBlock>{`import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectContent } from '@/components/ui/select';`}</CodeBlock>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
              Icons
            </div>
            <CodeBlock>{`import { Check, ChevronDown, Search } from '@/components/icons';
// Custom icons go in icons-custom/, never in icons/`}</CodeBlock>
          </div>
        </div>
      </SectionCard>

      {/* Strict Prohibitions */}
      <SectionCard title="What Agents Must Never Do">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Hard-code hex colors, pixel values, or font families — always use semantic tokens',
            'Create custom buttons, inputs, or form controls when a library component exists',
            'Use inline SVGs or external icon libraries (react-icons, heroicons) — use project icon library',
            'Use emojis in UI — use icons from the icon library instead',
            'Override component styles with className or inline style overrides on LD components',
            'Use placeholder images from external services (unsplash, picsum, placeholder.com)',
            'Skip interactive states (hover, focus, active, disabled) on interactive elements',
            'Create new components without following the full creation process (TSX, CSS module, example, guideline doc, route)',
            'Write user-facing strings directly — all strings must use i18n translation keys',
            'Invent new breakpoints — use standard 1024px, 768px, 480px only',
          ].map((rule, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-negative-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start',
            }}>
              <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0 }}>x</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Token Usage */}
      <SectionCard title="Token Usage Pattern">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{
              fontWeight: 700,
              marginBottom: '8px',
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-positive)',
            }}>
              Correct — Semantic tokens with fallbacks
            </div>
            <CodeBlock>{`background: var(--ld-semantic-color-action-fill-primary, #0071DC);
color: var(--ld-semantic-color-text, #2E2F32);
border: 1px solid var(--ld-semantic-color-border-strong, #74767C);
box-shadow: var(--ld-semantic-elevation-100);
font-family: var(--ld-semantic-font-family-sans);`}</CodeBlock>
          </div>
          <div>
            <div style={{
              fontWeight: 700,
              marginBottom: '8px',
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-negative)',
            }}>
              Wrong — Hard-coded values
            </div>
            <CodeBlock>{`background: #0071DC;
color: #2E2F32;
border: 1px solid #74767C;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
font-family: Arial, sans-serif;`}</CodeBlock>
          </div>
        </div>
      </SectionCard>

      {/* New Component Checklist */}
      <SectionCard title="New Component Creation Checklist">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Only create a new component when no existing component or composition can solve the need.
          If creation is justified, complete every step:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '10px',
        }}>
          {[
            'Confirm no existing component fits (search + document why)',
            'Create component: client/components/ui/ComponentName.tsx',
            'Create CSS module: client/components/ui/ComponentName.module.css',
            'Use only semantic tokens in all styles',
            'Include all variants, sizes, and states from spec',
            'Create example: client/components/examples/ComponentNameExample.tsx',
            'Create guideline: guidelines/components/ComponentName.md',
            'Add page: client/pages/component-library/ComponentName.tsx',
            'Register route in App.tsx and add to Overview',
            'Register in Component Sandbox for interactive testing',
            'Add translation keys for all 3 locales (en, es, fr)',
            'Update GuidelinesDocIndex.tsx with the new doc entry',
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '10px',
              padding: '10px 14px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start',
            }}>
              <span style={{
                minWidth: '18px',
                height: '18px',
                border: '2px solid var(--ld-semantic-color-border-strong)',
                borderRadius: '4px',
                flexShrink: 0,
                marginTop: '1px',
              }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Figma-to-Code Workflow */}
      <SectionCard title="Figma-to-Code Workflow">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          When processing Figma imports via the Builder.io plugin, post-process through these validation gates:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { label: 'Check .figmaignore', detail: 'Before importing, verify the .figmaignore file exists in the project root. This file excludes binary fonts, images, build output, lockfiles, and server code that cause parsing errors in Figma Make. If the file is missing, create it.' },
            { label: 'Component Mapping', detail: 'Replace raw HTML elements with library components. A Figma "button" must become <Button variant="..." size="...">.' },
            { label: 'Token Resolution', detail: 'Map all Figma color, spacing, and typography values to the nearest semantic token. Flag any that don\'t have an exact match.' },
            { label: 'Icon Substitution', detail: 'Replace inline SVGs with matching icons from client/components/icons/. Create new ones in icons-custom/ if needed.' },
            { label: 'State Completeness', detail: 'Figma frames often show only default state. Add hover, focus, active, and disabled states using token variants.' },
            { label: 'Accessibility Audit', detail: 'Add ARIA labels, roles, and keyboard handlers that Figma designs don\'t encode.' },
          ].map((gate, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
              marginLeft: '16px',
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {gate.label}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {gate.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Existing Project Integration */}
      <SectionCard title="Existing Project Integration">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          When the kit is added to a project that already has UI components, icons, or styles,
          the agent must audit the existing codebase and create a migration plan. This is not optional.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Step 1: Component Audit */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Step 1: Component Audit — Find & Replace
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Scan the entire project for UI components that have an equivalent in the Component Library.
              Replace them directly — do not keep both versions.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Search for custom buttons, inputs, selects, modals, tags, cards, and alerts',
                'Check for third-party UI libraries (MUI, Chakra, Ant Design, etc.) that overlap with LD 3.5 components',
                'Map each existing component to its LD 3.5 equivalent (e.g., custom <PrimaryButton> → <Button variant="primary">)',
                'Replace all usages across the project — update imports, props, and any wrapper logic',
                'Delete the old component files after all references are updated',
                'Run the dev server to verify nothing is broken after each replacement',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-brand-bold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Token & Style Migration */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Step 2: Token & Style Migration Plan
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              For components that are unique to the project (no LD 3.5 equivalent), create a migration plan
              to update them to use the library&rsquo;s tokens, text styles, icons, and theming.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Identify all components that don\'t have a direct LD 3.5 match',
                'Replace hard-coded colors with var(--ld-semantic-color-*) tokens',
                'Replace hard-coded font families, sizes, and weights with var(--ld-semantic-font-*) tokens',
                'Replace hard-coded spacing and border-radius with var(--ld-semantic-spacing-*) and var(--ld-primitive-scale-borderradius-*) tokens',
                'Replace hard-coded elevation/shadows with var(--ld-semantic-elevation-*) tokens',
                'Ensure all components respond to theme switching (Walmart, Sam\'s Club, dark mode)',
                'Add CSS modules (.module.css) if the component uses global CSS or inline styles',
                'Install any missing dependencies that the token system or theme switching requires',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-warning)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Icon Deduplication */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-accent-purple)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Step 3: Icon Deduplication Plan
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Duplicate icons waste bundle size and cause visual inconsistency. The agent must merge all icons
              into the project&rsquo;s icon library.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Scan for inline SVGs, imported SVG files, and third-party icon libraries (react-icons, heroicons, lucide, etc.)',
                'For each icon found, check if an equivalent exists in client/components/icons/',
                'If a match exists: replace the usage with the library icon import and delete the duplicate',
                'If no match exists: move the SVG into client/components/icons-custom/ following the project\'s icon format (20x20 viewBox, currentColor fill)',
                'Remove any third-party icon library dependencies from package.json after all icons are migrated',
                'Update the icon index file so all new custom icons are importable from @/components/icons-custom',
                'Verify icon sizes and colors render correctly via semantic tokens (not hard-coded fills)',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-accent-purple)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Migration Plan Output */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-info)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Migration Plan Output
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              After completing the audit, the agent must produce a migration plan that includes:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'A list of all components that will be replaced with their LD 3.5 equivalents',
                'A list of unique components that need token migration (with the specific tokens to apply)',
                'A list of duplicate icons with their replacement mappings',
                'Any dependencies to install or remove',
                'An execution order that avoids breaking the app (replace one component at a time, verify, continue)',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-info)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Package Version Upgrade */}
      <SectionCard title="Package Version Upgrade">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          When a project already has an older version of the Living Design 3.5 Portable Kit,
          the agent must not overwrite blindly. It must review what exists, compare against
          the latest version, and produce a merge plan.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Phase 1: Inventory */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 1: Inventory What Exists
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Before touching any files, catalog the current state of the installed package.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'List all components in client/components/ui/ and record which ones exist',
                'List all icons in client/components/icons/ and client/components/icons-custom/',
                'Record the current token files: semantic.css, primitive.css, and any theme overrides in client/styles/themes/',
                'Check for local modifications — components or tokens the team has customized beyond the kit defaults',
                'Note any components the project added that are not part of the kit (project-specific components)',
                'Record the current guidelines/ and rules/ files and their contents',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-brand-bold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2: Diff */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 2: Compare Against Latest Version
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Diff the existing package files against the latest version to identify what changed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Identify new components added in the latest version that the project does not have yet',
                'Identify components that were updated — new props, variants, bug fixes, or accessibility improvements',
                'Identify new or updated design tokens (new colors, spacing values, elevation levels)',
                'Identify new or updated icons in the icon library',
                'Identify changes to theme files that affect theming behavior',
                'Identify updated guidelines or rules files',
                'Flag any breaking changes — renamed props, removed components, changed token names',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-warning)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 3: Handle Conflicts */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-negative)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 3: Handle Local Modifications & Conflicts
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              If the team has customized any kit files, those changes must be preserved or reconciled.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'If a component was locally modified AND updated in the new version — flag it as a conflict',
                'For conflicts: apply the new version first, then re-apply the local customizations on top',
                'If local customizations conflict with new behavior, document both versions and ask for a decision',
                'Never silently overwrite a file that has local changes — always flag and resolve explicitly',
                'Project-specific components (not part of the kit) should not be touched during the upgrade',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 4: Execute Merge */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-positive)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Phase 4: Execute the Merge
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Apply updates in a safe order, verifying after each step.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Update token files first (semantic.css, primitive.css) — these have no dependencies',
                'Update theme files next — verify theme switching still works',
                'Update existing components one at a time — verify the dev server after each',
                'Add new components that did not exist before — register routes and update the overview page',
                'Update the icon library — add new icons, update changed icons, keep custom icons untouched',
                'Update guidelines/ and rules/ files to match the latest documentation',
                'Run a full build to catch any TypeScript or import errors',
                'Verify all pages render correctly with the updated components',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-positive)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade Plan Output */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ld-semantic-color-border-info)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
              Upgrade Plan Output
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
              Before executing, the agent must present the upgrade plan for review:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Summary: number of components to update, add, or skip',
                'List of updated components with a brief description of what changed',
                'List of new components being added',
                'List of token changes (new tokens, renamed tokens, removed tokens)',
                'List of conflicts requiring manual decision',
                'Dependencies to install or update',
                'Execution order with verification checkpoints',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-info)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Enforcement Rules Reference */}
      <SectionCard title="Enforcement Rules Reference">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Agents must read and follow these rule files. They are located in <code style={{
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            fontSize: '13px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            padding: '2px 6px',
            borderRadius: '4px',
          }}>guidelines/rules/</code>:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { file: 'RULE_DesignSystemEnforcement.md', desc: 'Tokens, icons, and component usage' },
            { file: 'RULE_DesignTokenEnforcement.md', desc: 'Semantic tokens are mandatory' },
            { file: 'RULE_TokenUsageEnforcement.md', desc: 'No hardcoded values allowed' },
            { file: 'RULE_CreateNewComponent.md', desc: 'Full component creation process' },
            { file: 'RULE_ComponentPropertyTester.md', desc: 'All components must be in sandbox' },
            { file: 'RULE_IconUsage.md', desc: 'Icon library rules and deduplication' },
            { file: 'RULE_NoEmojisUseIcons.md', desc: 'No emojis or random images' },
            { file: 'RULE_ResponsiveLayout.md', desc: 'Page structure and breakpoints' },
            { file: 'RULE_GuidelinesPageSync.md', desc: 'Keep Guidelines page in sync with docs' },
            { file: 'RULE_DevServerHealthCheck.md', desc: 'Verify dev server after changes' },
          ].map((rule) => (
            <div key={rule.file} style={{
              display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: '16px',
              padding: '10px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              alignItems: 'center',
            }}>
              <code style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '12px',
                color: 'var(--ld-semantic-color-text)',
              }}>
                {rule.file}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{rule.desc}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
