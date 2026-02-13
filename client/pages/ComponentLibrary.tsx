import { useEffect } from 'react';

export default function ComponentLibrary() {
  useEffect(() => {
    console.log('=== ComponentLibrary is rendering ===');
  }, []);

  return (
    <div style={{
      backgroundColor: '#FF0000',
      color: '#FFFFFF',
      minHeight: '100vh',
      padding: '40px',
      fontSize: '32px',
      fontWeight: 'bold'
    }}>
      <h1 style={{ fontSize: '64px', marginBottom: '20px' }}>🎨 COMPONENT LIBRARY PAGE 🎨</h1>
      <p>This page should have a RED background.</p>
      <p>If you see this, the routing is working!</p>
      <p>Current URL: {window.location.pathname}</p>
    </div>
  );
}
