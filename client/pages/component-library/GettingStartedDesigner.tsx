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
          existing Builder.io project. No coding experience required &mdash; just follow the steps
          below and the kit handles the rest.
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
