"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientPrescriptions() {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();

      if (!meData.user || meData.user.role !== "patient") {
        router.push("/login");
        return;
      }

      const prescriptionsRes = await fetch(
`/api/prescription?patientRegno=${encodeURIComponent(meData.user.regno)}`
      );
      const prescriptionsData = await prescriptionsRes.json();
      setPrescriptions(prescriptionsData || []);
      setLoading(false);
      
    }
    

    load();
  }, [router]);

  

  if (loading) {
    return <div className="page"><p>Loading prescriptions...</p></div>;
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>My Prescriptions</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Access your medication history and important doctor instructions.</p>
        </div>
      </div>
      
      {prescriptions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '3rem auto' }}>
          <div className="icon-circle" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>💊</div>
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>No prescriptions yet</h3>
          <p style={{ color: '#999', marginBottom: '2rem' }}>Your prescriptions will appear here after doctor consultations.</p>
        </div>
      ) : (
        <div className="grid">
          {prescriptions.map((p) => (
            <div key={p._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Dr. {p.doctorId}</h4>
                  <p style={{ margin: '0 0 0.25rem', color: '#1565c0', fontWeight: '600' }}>{p.diagnosis || 'General Consultation'}</p>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{new Date(p.date).toLocaleDateString()}</p>
                </div>
                <div className="icon-circle" style={{ fontSize: '1.2rem' }}>📋</div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Symptoms</div>
                <p style={{ margin: '0 0 1rem 0', lineHeight: '1.5' }}>{p.symptoms}</p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Medicines</div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {p.medicines.map((m, idx) => (
                    <div key={idx} style={{ padding: '0.75rem', background: '#f8fbff', borderRadius: '0.5rem', borderLeft: '3px solid #1565c0' }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{m.name}</div>
                      <span style={{ color: '#666', fontSize: '0.9rem' }}>{m.dosage} • {m.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {p.advice && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Doctor Advice</div>
                  <p style={{ margin: 0, color: '#555', lineHeight: '1.5', padding: '1rem', background: '#e8f0fe', borderRadius: '0.5rem' }}>{p.advice}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}