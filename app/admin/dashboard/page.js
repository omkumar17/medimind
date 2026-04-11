import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";

export default function AdminDashboard() {
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

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="page">
      <div className="hero-section" style={{ marginBottom: 0 }}>
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '700' }}>Admin Dashboard</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>System overview and administrative controls for MediMind platform.</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="grid">
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>847</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Total Users</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>2,341</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Records</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>99.8%</div>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Uptime</p>
          </div>
        </div>
        
        <h2 style={{ color: '#1565c0', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>Administrative Tools</h2>
        <div className="grid">
          <Link href="/admin/reports" className="card" style={{ textDecoration: 'none' }}>
            <div className="icon-circle">📈</div>
            <h3 style={{ margin: '0 0 0.5rem' }}>Reports & Analytics</h3>
            <p style={{ margin: 0, color: '#666' }}>View all records & prescriptions overview</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
