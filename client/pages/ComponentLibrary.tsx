import * as React from 'react';

/**
 * Component Library Page
 * Complete showcase of all components in the project
 */
export default function ComponentLibrary() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0071DC', padding: '40px' }}>
      <h1 style={{ fontSize: '48px', color: 'white', fontWeight: 700 }}>
        COMPONENT LIBRARY PAGE - ROUTE TEST
      </h1>
      <p style={{ fontSize: '24px', color: 'white', marginTop: '20px' }}>
        If you see this blue page, the routing is working correctly.
      </p>
      <p style={{ fontSize: '18px', color: 'white', marginTop: '20px' }}>
        URL: /component-library
      </p>
    </div>
  );
}
