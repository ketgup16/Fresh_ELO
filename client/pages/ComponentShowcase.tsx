/**
 * Component Showcase Page - MINIMAL TEST VERSION
 */
export default function ComponentShowcase() {
  console.log('🎨 ComponentShowcase is RENDERING!');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0071DC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '64px', 
          fontWeight: 700, 
          marginBottom: '24px'
        }}>
          ✅ COMPONENT SHOWCASE
        </h1>
        <p style={{ fontSize: '32px', marginBottom: '16px' }}>
          Route is working correctly!
        </p>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>
          Path: /components
        </p>
      </div>
    </div>
  );
}
