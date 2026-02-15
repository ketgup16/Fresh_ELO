import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function ThemesPage() {
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          Themes
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px',
          marginBottom: '32px'
        }}>
          Switch between different brand themes to see how components adapt to different design tokens
          and color palettes. Each theme provides a complete set of semantic tokens for a consistent experience.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        border: '1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)',
        maxWidth: '600px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          Select Theme
        </h2>
        
        <ThemeSwitcher />

        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-info-subtle, #F0F7FF)',
          borderRadius: '6px',
          borderLeft: '4px solid var(--ld-semantic-color-border-info, #0071DC)'
        }}>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.5',
            color: 'var(--ld-semantic-color-text)',
            margin: 0
          }}>
            <strong>Note:</strong> Theme changes are applied globally across all component examples.
            Design tokens automatically update to match the selected theme's color palette and styling.
          </p>
        </div>
      </div>

      {/* Theme Information */}
      <div style={{ marginTop: '48px', maxWidth: '800px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '16px'
        }}>
          About Themes
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '24px',
        }}>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              What are themes?
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            }}>
              Themes are complete sets of design tokens (colors, typography, spacing) that define
              the visual appearance of the component library. Each theme represents a different
              brand or product within the Walmart ecosystem.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              How do themes work?
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'var(--ld-semantic-color-text-secondary, #74767C)',
            }}>
              All components use semantic design tokens (CSS custom properties) instead of hard-coded
              values. When you switch themes, these token values update globally, causing all components
              to instantly adapt to the new theme's colors and styles.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              Using themes in your code
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'var(--ld-semantic-color-text-secondary, #74767C)',
              marginBottom: '12px'
            }}>
              Always use semantic tokens in your components. Never hard-code colors or values:
            </p>
            <div style={{
              backgroundColor: 'var(--ld-primitive-color-gray-5)',
              padding: '16px',
              borderRadius: '6px',
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '14px',
            }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#22863a' }}>/* ✅ CORRECT - Uses semantic tokens */</span><br />
                <span>background: <span style={{ color: '#005cc5' }}>var(--ld-semantic-color-action-fill-primary)</span>;</span>
              </div>
              <div>
                <span style={{ color: '#d73a49' }}>/* ❌ WRONG - Hard-coded color */</span><br />
                <span>background: <span style={{ color: '#d73a49' }}>#0071DC</span>;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
