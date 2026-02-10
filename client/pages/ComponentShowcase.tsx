import * as React from 'react';

/**
 * Component Showcase Page
 * Single page displaying all available components from the project
 */
export default function ComponentShowcase() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '32px',
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            color: '#2E2F32',
            marginBottom: '8px'
          }}>
            Living Design 3.5 Components
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#74767c'
          }}>
            Complete component library reference
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '32px',
      }}>
        
        {/* Test Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px',
          padding: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#2E2F32',
            marginBottom: '16px',
          }}>
            Component Showcase Loading...
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#74767c',
            marginBottom: '16px'
          }}>
            If you see this, the page is loading correctly. Components will be added back incrementally.
          </p>
          
          {/* Basic HTML button to test */}
          <button style={{
            backgroundColor: '#0071DC',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Everyday Sans UI, sans-serif'
          }}>
            Test Button (HTML)
          </button>
        </div>

      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '32px',
        marginTop: '48px',
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#74767c',
            margin: 0
          }}>
            Living Design 3.5 Component Library
          </p>
        </div>
      </div>
    </div>
  );
}
