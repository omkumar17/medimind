import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";

export default function PatientDashboard() {
  const authToken = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!authToken) {
    redirect("/login");
  }

  let user;
  try {
    user = verifyJwt(authToken);
  } catch {
    redirect("/login");
  }

  if (user.role !== "patient") {
    redirect("/dashboard");
  }

  return (
    <div className="page">
      <div className="hero-section" style={{ marginBottom: 0 }}>
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '700' }}>Welcome Back!</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>Manage your health journey with personalized insights and quick access to your medical information.</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
        {/* <div className="grid">
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>5</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Records</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💊</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>3</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Active Prescriptions</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👨‍⚕️</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>2</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Recent Visits</p>
          </div>
        </div> */}
        
        <h2 style={{ color: '#1565c0', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>Quick Actions</h2>
        <div className="grid">
          {/* <Link href="/patient/doctor-visit-summary" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">📋</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Doctor Visit Summary</h3>
            <p style={{ margin: 0, color: '#666' }}>View your consultation history</p>
          </Link> */}
          <Link href="/patient/record" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">📁</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Medical Records</h3>
            <p style={{ margin: 0, color: '#666' }}>Access all your health documents</p>
          </Link>
          <Link href="/patient/prescriptions" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">💊</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Prescriptions</h3>
            <p style={{ margin: 0, color: '#666' }}>Current medications & refills</p>
          </Link>
          <Link href="/patient/share-records" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">📤</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Share Records</h3>
            <p style={{ margin: 0, color: '#666' }}>Share with your doctor</p>
          </Link>
          <Link href="/upload-record" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">📎</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Upload Document</h3>
            <p style={{ margin: 0, color: '#666' }}>Add new medical reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
