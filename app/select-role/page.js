import Link from "next/link";

// import Link from "next/link";

export default function SelectRole() {
  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Welcome to MediMind</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '500px' }}>
            Choose your role to access personalized healthcare services and medical records.
          </p>
        </div>
      </div>
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#1565c0', fontSize: '1.8rem', textAlign: 'center', marginBottom: '2.5rem' }}>
          Select Role
        </h2>
        
        <div className="grid">
          <Link href="/login?role=doctor" className="card" style={{ textDecoration: 'none', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div className="icon-circle" style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍⚕️</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>Doctor</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>Access patient records and manage consultations</p>
          </Link>
          
          <Link href="/login?role=patient" className="card" style={{ textDecoration: 'none', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div className="icon-circle" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🩺</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>Patient</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>View prescriptions, records and book appointments</p>
          </Link>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/login" style={{ color: '#1565c0', textDecoration: 'none', fontWeight: '500' }}>
            Already have account? Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
