export default function TestRoutingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#00FF00',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: 'black',
      fontFamily: 'sans-serif',
      padding: '40px'
    }}>
      <h1 style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '24px' }}>
        🟢 TEST ROUTING PAGE 🟢
      </h1>
      <p style={{ fontSize: '32px', marginBottom: '16px' }}>
        If you see this GREEN page, routing is working!
      </p>
      <p style={{ fontSize: '24px', backgroundColor: 'white', padding: '16px', borderRadius: '8px' }}>
        Route: /test-routing-works
      </p>
    </div>
  );
}
