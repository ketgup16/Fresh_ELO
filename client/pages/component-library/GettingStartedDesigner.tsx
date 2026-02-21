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

function StepItem({ num, title, detail }: { num: number; title: string; detail: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '20px',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      borderRadius: '8px',
    }}>
      <div style={{
        minWidth: '36px',
        height: '36px',
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '16px',
        color: 'var(--ld-semantic-color-text-brand-bold)',
      }}>
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px', color: 'var(--ld-semantic-color-text)' }}>
          {title}
        </div>
        <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
          {detail}
        </div>
      </div>
    </div>
  );
}

function PromptCategory({ title, prompts }: { title: string; prompts: string[] }) {
  return (
    <div>
      <div style={{
        fontWeight: 700,
        fontSize: '15px',
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {prompts.map((prompt, i) => (
          <div key={i} style={{
            padding: '14px 16px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'var(--ld-semantic-color-text)',
            fontStyle: 'italic',
            cursor: 'default',
          }}>
            &ldquo;{prompt}&rdquo;
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeSnippet({ children }: { children: string }) {
  return (
    <code style={{
      fontFamily: 'var(--ld-semantic-font-family-mono)',
      fontSize: '13px',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      padding: '2px 6px',
      borderRadius: '4px',
    }}>
      {children}
    </code>
  );
}

export function GettingStartedDesigner() {
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
          For Designers
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0,
        }}>
          This guide walks you through dropping the Living Design 3.5 Portable Kit into a new or
          existing project &mdash; whether you're using Builder.io, Cursor, Figma Make, or any other
          tool. No coding experience required &mdash; just follow the steps below and the kit handles the rest.
        </p>
      </div>

      {/* What You Get */}
      <SectionCard title="What You Get">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
        }}>
          {[
            { label: '50+ Components', desc: 'Buttons, forms, cards, modals, tabs, and more — all pre-built and accessible' },
            { label: '600+ Design Tokens', desc: 'Colors, spacing, typography, and elevation — no hard-coded values needed' },
            { label: 'Multi-Theme Support', desc: 'Switch between brand themes (Walmart, Sam\'s Club, etc.) with one click' },
            { label: '3 Languages', desc: 'English, Spanish, and French translations built in for every UI string' },
            { label: 'WCAG 2.1 AA', desc: 'Focus rings, keyboard navigation, ARIA labels, and contrast ratios baked in' },
            { label: 'Component Sandbox', desc: 'Test any component interactively with live property controls' },
          ].map((item) => (
            <div key={item.label} style={{
              padding: '16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
            }}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--ld-semantic-color-text-subtle)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Step by Step */}
      <SectionCard title="Step-by-Step Setup">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <StepItem
            num={1}
            title="Create a new project in Builder.io"
            detail="Start a new project from the Builder.io dashboard, or open an existing project you want to add the kit to."
          />
          <StepItem
            num={2}
            title="Drop in the Portable Kit files"
            detail={<>Copy the entire kit into your project. The key folders are <CodeSnippet>client/components/ui/</CodeSnippet> (all the components), <CodeSnippet>client/styles/themes/</CodeSnippet> (theme tokens), and <CodeSnippet>guidelines/</CodeSnippet> (documentation).</>}
          />
          <StepItem
            num={3}
            title="Install dependencies"
            detail={<>Open the terminal in Builder.io and run <code style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '13px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
            }}>pnpm install</code> &mdash; this pulls in all required packages automatically.</>}
          />
          <StepItem
            num={4}
            title="Start the dev server"
            detail={<>Run <code style={{
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '13px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid var(--ld-semantic-color-border-moderate)',
            }}>pnpm dev</code> to start the app. You'll see a live preview in the Builder.io iframe immediately.</>}
          />
          <StepItem
            num={5}
            title="Browse the Component Library"
            detail="Navigate to /component-library in the preview to see every available component with live examples, code snippets, and property controls."
          />
          <StepItem
            num={6}
            title="Use components in your pages"
            detail={<>When building new pages, reference the components you see in the library. For example, use <CodeSnippet>{'<Button variant="primary">'}</CodeSnippet> instead of creating custom buttons. The AI agent knows all the components and will use them automatically.</>}
          />
        </div>
      </SectionCard>

      {/* Key Concepts for Designers */}
      <SectionCard title="Key Concepts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
              Design Tokens
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
              Instead of picking colors manually, the kit uses <strong>design tokens</strong> — named
              values like "primary action color" or "subtle text". When you switch themes, all colors
              update automatically. You never need to manually change hex values.
            </div>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
              Component Variants
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
              Components come with built-in variants (e.g., primary/secondary/tertiary buttons,
              info/success/error alerts). Instead of styling from scratch, you pick the variant
              that matches your intent and the component handles the colors, spacing, and
              interactions.
            </div>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
              Figma to Code
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
              Use the <strong>Builder.io Figma plugin</strong> to import designs. The AI agent will
              automatically map Figma elements to the correct library components, replace colors
              with tokens, and add accessibility features. Always review the output to confirm
              the right components were used.
            </div>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
              Accessibility is Automatic
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
              Every component ships with keyboard navigation, focus indicators, screen reader
              support, and proper color contrast. You do not need to add these manually — they
              are built into the components themselves.
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Using Outside Builder.io */}
      <SectionCard title="Using Outside Builder.io & Fusion">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          This kit is fully portable. You can download the code and use it in any environment
          that supports React. Here are the most common external workflows:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Cursor */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
              Cursor (AI Code Editor)
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
              Download the project and open it in Cursor. The AI will be able to read the
              component library and generate code that uses the design system correctly.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Download the project as a zip and extract it to a local folder',
                'Open the folder in Cursor',
                'Run pnpm install in the terminal to install dependencies',
                'Run pnpm dev to start the dev server and preview in your browser',
                'Point Cursor\'s AI at the guidelines/ folder — add it to your .cursorrules or project context so the AI knows the design system rules',
                'Copy the contents of design-system-docs/AGENTS.md into your .cursorrules file for component reference',
                'When prompting, reference component names (e.g., "use a Button with variant primary") and the AI will use the correct imports',
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '10px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--ld-semantic-color-text-subtle)',
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    minWidth: '22px',
                    height: '22px',
                    backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'var(--ld-semantic-color-text-brand-bold)',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Figma Make */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
              Figma Make (Figma-to-Code)
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
              Export designs from Figma and use this kit as the target component library.
              Figma Make can generate code that maps to the existing LD 3.5 components.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Download the project and open it in your code editor of choice',
                'In Figma, use the Make plugin or export your designs as code',
                'Map Figma component names to the kit components (e.g., Figma "[LD 3.5] Button" maps to the Button component in client/components/ui/Button.tsx)',
                'Replace any hard-coded colors in the generated code with semantic tokens (var(--ld-semantic-color-*))',
                'Replace raw HTML elements (<button>, <input>) with kit components (<Button>, <TextField>)',
                'Verify all interactive states (hover, focus, disabled) are handled — the kit components include these automatically',
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '10px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--ld-semantic-color-text-subtle)',
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    minWidth: '22px',
                    height: '22px',
                    backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'var(--ld-semantic-color-text-brand-bold)',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Any Editor */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
              Any Code Editor (VS Code, WebStorm, etc.)
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
              The kit is a standard React + Vite project. Download it, run <code style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                backgroundColor: 'var(--ld-semantic-color-surface)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--ld-semantic-color-border-moderate)',
              }}>pnpm install</code> and <code style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                backgroundColor: 'var(--ld-semantic-color-surface)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--ld-semantic-color-border-moderate)',
              }}>pnpm dev</code>, and start building.
              All components, tokens, icons, and translations work identically regardless of your editor.
              Reference the <code style={{
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                fontSize: '13px',
                backgroundColor: 'var(--ld-semantic-color-surface)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--ld-semantic-color-border-moderate)',
              }}>guidelines/</code> folder for component documentation and design system rules.
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Key Files for External Use */}
      <SectionCard title="Key Files to Know (For Any Tool)">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Regardless of which tool you use, these are the important locations in the project:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { path: 'client/components/ui/', desc: 'All 50+ pre-built components (Button, TextField, Card, Modal, etc.)' },
            { path: 'client/styles/themes/', desc: 'Theme files — switch brands by swapping the active theme CSS' },
            { path: 'client/components/icons/', desc: '300+ icons ready to import and use' },
            { path: 'guidelines/', desc: 'Design system rules, component docs, and enforcement rules' },
            { path: 'design-system-docs/AGENTS.md', desc: 'AI agent reference — paste into .cursorrules or AI system prompts' },
            { path: 'client/locales/', desc: 'Translation files for English, Spanish, and French' },
            { path: 'public/fonts/', desc: 'Brand fonts (Everyday Sans) — must be included for correct rendering' },
          ].map((item) => (
            <div key={item.path} style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
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

      {/* Example Prompts */}
      <SectionCard title="Example Prompts for Designers">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          Copy and paste these prompts into the chat to quickly generate pages, components, and design changes.
          Customize the details to match your specific needs.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <PromptCategory
            title="Generate New Pages"
            prompts={[
              'Create a new dashboard page with a page header titled "Campaign Overview", a row of 4 metric cards showing impressions, clicks, spend, and CTR, and a data table below with campaign data.',
              'Build a settings page with a sidebar navigation for General, Notifications, and Security sections. Each section should have form fields using TextField and Select components inside Cards.',
              'Create a product detail page with breadcrumbs, a two-column layout (image gallery on left, product info on right), a tabbed section for Description/Reviews/Specs, and a sticky add-to-cart bar at the bottom.',
              'Design a landing page with a hero section, a 3-column feature grid using Cards, a testimonial carousel, and a CTA section with a primary Button.',
            ]}
          />
          <PromptCategory
            title="Create New Components"
            prompts={[
              'Create a stat card component that shows a metric label, a large number value, a percentage change badge (positive green or negative red using Tag), and a small sparkline area. Use Card, Heading, and Tag from the design system.',
              'Build a user profile header component with an avatar circle, user name heading, role tag, and action buttons (Edit Profile, Settings) in a ButtonGroup. Make it responsive.',
              'Create a notification item component with a leading icon, title, description, timestamp, and an unread indicator dot. Use ListItem patterns and semantic tokens for the styling.',
              'Build a file upload dropzone component with a dashed border, upload icon, instructional text, and a secondary Button. Show a progress bar state and a completed state with a file name and remove IconButton.',
            ]}
          />
          <PromptCategory
            title="Theming & Styling"
            prompts={[
              'Switch the current theme to Sam\'s Club and verify all components render correctly with the new brand colors.',
              'Create a new custom theme called "Holiday" with a red primary action color, green accents, and warm neutrals. Apply it to the theme switcher so I can preview it.',
              'Update the current page to use dark mode tokens. Make sure all text, backgrounds, borders, and cards adapt properly.',
              'Audit the current page for any hard-coded colors or font sizes and replace them with the correct LD semantic tokens.',
            ]}
          />
          <PromptCategory
            title="Edit & Refine Existing Designs"
            prompts={[
              'Change the page header to include breadcrumbs, a subtitle description, and move the action buttons into a dropdown menu using the Menu component.',
              'Replace the current plain list with an interactive data table that has sortable columns, row selection checkboxes, status tags, pagination, and a search toolbar.',
              'Add a side panel that slides in from the right when a table row is clicked. It should show item details using a Card with CardHeader and CardContent, and have a close IconButton.',
              'Make the cards on this page responsive. On desktop show 3 columns, tablet show 2 columns, and mobile show 1 column. Add proper spacing using semantic tokens.',
              'Add form validation to the current form. Show error states on required fields with helper text when the user clicks submit without filling them in.',
              'Add an empty state to the data table with an illustration area, a heading saying "No results found", a description, and a primary action Button to reset filters.',
            ]}
          />
          <PromptCategory
            title="Accessibility & Polish"
            prompts={[
              'Review the current page for accessibility issues. Make sure all interactive elements have proper aria-labels, focus states are visible, and color contrast meets WCAG 2.1 AA.',
              'Add keyboard navigation support to the card grid so users can tab between cards and press Enter to select them.',
              'Add loading skeleton states to all the cards and the data table on this page so content doesn\'t flash in.',
              'Add proper focus management to the modal dialog. Focus should trap inside the modal when open and return to the trigger button when closed.',
            ]}
          />
        </div>
      </SectionCard>

      {/* Tips */}
      <SectionCard title="Tips for Designers">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Browse the Component Library (/component-library) to see what\'s available before asking for custom UI',
            'Use the Component Sandbox to test different variants, sizes, and states interactively',
            'Check the Themes & Tokens page to see how colors and spacing work across brands',
            'When describing UI to the AI agent, reference component names (e.g., "use a Card with a primary Button")',
            'If something doesn\'t look right, check if the correct variant is being used before asking for custom styling',
            'All text should support translation — avoid baking text into images or SVGs',
          ].map((tip, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start',
            }}>
              <span style={{
                color: 'var(--ld-semantic-color-text-positive)',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '1px',
              }}>&#10003;</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
