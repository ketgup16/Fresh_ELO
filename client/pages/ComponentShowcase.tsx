/**
 * Component Showcase Page
 * Single page displaying all available components from the project
 */
export default function ComponentShowcase() {
  console.log('🎨🎨🎨 ComponentShowcase IS RENDERING! 🎨🎨🎨');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0071DC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '40px',
      color: 'white'
    }}>
      <h1 style={{ 
        fontSize: '72px', 
        fontWeight: 700, 
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        ✅ COMPONENT SHOWCASE
      </h1>
      <p style={{ 
        fontSize: '32px', 
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        The /components route is working!
      </p>
      <p style={{ 
        fontSize: '24px', 
        textAlign: 'center',
        opacity: 0.9
      }}>
        If you see this page with a bright blue background,
        the routing is configured correctly.
      </p>
      <div style={{
        marginTop: '48px',
        padding: '24px',
        backgroundColor: 'white',
        color: '#0071DC',
        borderRadius: '12px',
        fontSize: '20px',
        fontWeight: 600
      }}>
        Path: /components
      </div>
    </div>
  );
}
