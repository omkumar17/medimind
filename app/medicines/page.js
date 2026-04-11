"use client";

import { useState } from "react";

export default function Medicines() {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);

  async function searchMedicine() {
    const res = await fetch("/api/medicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setResult(data.alternatives || []);
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Medicine Alternatives</h1>
          </div>
      </div>
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 12px 30px rgba(21,101,192,0.12)', marginBottom: '2rem' }}>
          <h2 style={{ color: '#1565c0', marginBottom: '1.5rem', textAlign: 'center' }}>Search Medicine</h2>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <input
              className="note"
              style={{ flex: 1, minWidth: '250px' }}
              placeholder="Enter medicine name (e.g., Paracetamol)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn" onClick={searchMedicine} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              🔍 Search
            </button>
          </div>
        </div>
      </div>
      
      {result.length > 0 && (
        <>
          <h2 style={{ color: '#1565c0', fontSize: '1.5rem', margin: '2rem 0 1.5rem', textAlign: 'center' }}>
            Alternatives Found ({result.length})
          </h2>
          <div className="grid">
            {result.map((med, index) => (
              <MedicineCard key={index} name={med} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
