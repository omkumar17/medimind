"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PatientRecords() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();

      if (!meData.user || meData.user.role !== "patient") {
        router.push("/login");
        return;
      }

      const recordsRes = await fetch(
        `/api/records?patientId=${encodeURIComponent(meData.user.regno)}`
      );
      const recordsData = await recordsRes.json();
      setRecords(recordsData || []);
      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return <div className="page"><p>Loading patient history...</p></div>;
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Medical Records</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>View and download your complete medical history and documents.</p>
        </div>
      </div>
      
      {records.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '3rem auto' }}>
          <div className="icon-circle" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📋</div>
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>No records available</h3>
          <p style={{ color: '#999', marginBottom: '2rem' }}>Medical records will be listed here once uploaded.</p>
          <Link href="/health-records" className="btn">Upload Record</Link>
        </div>
      ) : (
        <div className="grid record-parent">
          {records.map((r) => (
            <div key={r._id} className="card record ">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem',textAlign: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.2rem' ,textAlign: 'center'}}>{r.title}</h4>
                  <span style={{ background: '#e8f0fe', color: '#1565c0', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '500' }}>
                    {r.type}
                  </span>
                </div>
                <div className="icon-circle" style={{ fontSize: '1.1rem', width: '36px', height: '36px' }}>📄</div>
              </div>
              
              {r.notes && (
                <div style={{ marginBottom: '1rem', textAlign:"center"}}>
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Notes</div>
                  <p style={{ margin: 0, lineHeight: '1.5', color: '#555' }}>{r.notes}</p>
                </div>
              )}
              
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
                <strong>Date:</strong> {new Date(r.date || r.createdAt).toLocaleString()}
              </p>
              
              {r.fileData && (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href={`/api/records/${r._id}/file`} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', flex: 1, minWidth: '120px', textAlign: 'center' }}>
                    👁️ View
                  </a>
                  <a href={`/api/records/${r._id}/file`} download={r.fileName} className="btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', flex: 1, minWidth: '120px', textAlign: 'center', background: '#1976d2' }}>
                    💾 Download
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
