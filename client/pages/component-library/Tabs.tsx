import React from 'react';
import { TabExample } from '@/components/examples/TabExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import styles from '@/components/examples/ExamplePage.module.css';
import { useTranslation } from 'react-i18next';

/**
 * Tab Navigation Component Library Page
 * 
 * Displays the LD 3.5 Tab Navigation component with comprehensive examples
 * showing all variants, states, and usage patterns.
 */
export default function TabsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navTabNavigation')} description={t('componentLibrary.descTabNavigation')}>
      
      <div className={styles.pageGap}>
        {/* Examples section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Component Demo</h2>
          <p className={styles.desc}>
            <strong>{t('componentLibrary.ldDocumentation')}</strong>{' '}
            <a
              href="https://digitaltoolkit.livingdesign.walmart.com/components/tab-navigation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('componentLibrary.navTabNavigation')}
            </a>
          </p>
          <div className={styles.demoFrame}>
            <React.Suspense fallback={<div>{t('componentLibrary.loadingExamples')}</div>}>
              <TabExample />
            </React.Suspense>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('componentLibrary.usageGuidelines')}</h2>
        
        <div style={{
          display: 'grid',
          gap: '24px',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              {t('componentLibrary.whenToUse')}
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>{t('componentLibrary.tabsWhenToUse1')}</li>
              <li>{t('componentLibrary.tabsWhenToUse2')}</li>
              <li>{t('componentLibrary.tabsWhenToUse3')}</li>
              <li>{t('componentLibrary.tabsWhenToUse4')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              {t('componentLibrary.bestPractices')}
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>{t('componentLibrary.tabsBest1')}</li>
              <li>{t('componentLibrary.tabsBest2')}</li>
              <li>{t('componentLibrary.tabsBest3')}</li>
              <li>{t('componentLibrary.tabsBest4')}</li>
              <li>{t('componentLibrary.tabsBest5')}</li>
              <li>{t('componentLibrary.tabsBest6')}</li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-heading-small-size-b-l, 20px)',
              fontWeight: 'var(--ld-semantic-font-heading-small-weight-default, 700)',
              marginBottom: '8px',
              color: 'var(--ld-semantic-color-text)',
            }}>
              {t('componentLibrary.accessibility')}
            </h3>
            <ul style={{
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: 'var(--ld-semantic-font-body-medium-size)',
              lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
              color: 'var(--ld-semantic-color-text)',
              paddingLeft: '24px',
            }}>
              <li>{t('componentLibrary.tabsA11y1')}</li>
              <li>{t('componentLibrary.tabsA11y2')}</li>
              <li>{t('componentLibrary.tabsA11y3')}</li>
              <li>{t('componentLibrary.tabsA11y4')}</li>
              <li>{t('componentLibrary.tabsA11y5')}</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
