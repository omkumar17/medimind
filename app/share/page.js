"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Share() {
  const params = useSearchParams();
  const id = params.get("id");
  const [link, setLink] = useState("");

  async function generate() {
    const res = await fetch("/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setLink(data.link);
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Share Record Securely</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Generate time-limited secure links to share medical records with doctors or family.</p>
        </div>
      </div>
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
          <div className="icon-circle" style={{ fontSize: '3rem', margin: '0 auto 2rem', width: '100px', height: '100px' }}>🔗</div>
          <h2 style={{ color: '#1565c0', marginBottom: '1rem' }}>Generate Share Link</h2>
          <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            Record ID from URL: <strong style={{ background: '#e8f0fe', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>{id || 'No ID'}</strong>
          </p>
          
          <button className="btn" onClick={generate} style={{ width: '100%', fontSize: '1.15rem', padding: '1.2rem' }}>
            🔐 Generate Secure Link
          </button>
          
          {link && (
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#f0f8ff', borderRadius: '1rem', border: '2px solid #e3f2fd' }}>
              <div style={{ fontWeight: '600', color: '#1565c0', marginBottom: '1rem', fontSize: '1.1rem' }}>✅ Share Link Generated</div>
              <div style={{ wordBreak: 'break-all', background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e0e0e0', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {link}
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn" style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem' }} onClick={() => navigator.clipboard.writeText(link)}>
                  📋 Copy Link
                </button>
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem', background: '#1976d2' }}>
                  🔗 Open Link
                </a>
              </div>
              <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '1.5rem' }}>
                Link expires in 7 days and can only be accessed once.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
