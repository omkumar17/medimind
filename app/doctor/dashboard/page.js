import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";

export default function DoctorDashboard() {
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

  if (user.role !== "doctor") {
    redirect("/dashboard");
  }

  return (
    <div className="page">
      <div className="hero-section" style={{ marginBottom: 0 }}>
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '700' }}>Doctor Dashboard</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>Manage patient care and access medical histories efficiently.</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
        {/* <div className="grid">
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>127</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Patients</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>23</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Pending Reviews</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>89%</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Patient Satisfaction</p>
          </div>
        </div> */}
        
        <h2 style={{ color: '#1565c0', fontSize: '1.5rem', margin: '0rem 0 1rem' }}>Quick Actions</h2>
        <div className="grid">
          <Link href="/doctor/prescription" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">📋</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Patient Records</h3>
            <p style={{ margin: 0, color: '#666' }}>View patient medical history</p>
          </Link>
          <Link href="/doctor/patient-history" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">📁</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Medical Records</h3>
            <p style={{ margin: 0, color: '#666' }}>Comprehensive patient documents</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
