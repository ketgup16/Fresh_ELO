/**
 * Component Showcase Page - MINIMAL TEST VERSION
 */
export default function ComponentShowcase() {
  console.log('🎨 ComponentShowcase is RENDERING!');
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FF0000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '96px',
          fontWeight: 700,
          marginBottom: '24px',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          🎨 COMPONENT SHOWCASE PAGE 🎨
        </h1>
        <p style={{ fontSize: '48px', marginBottom: '16px', fontWeight: 700 }}>
          ✅ THIS IS A SEPARATE PAGE! ✅
        </p>
        <p style={{ fontSize: '32px', marginBottom: '24px' }}>
          If you see RED, the routing is working!
        </p>
        <p style={{ fontSize: '24px', opacity: 0.9, backgroundColor: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
          Try: /component-showcase-library OR /components
        </p>
      </div>
    </div>
  );
}
