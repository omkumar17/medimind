"use client";

import { useState } from "react";

export default function Assistant() {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");

  async function askAI() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms }),
    });

    const data = await res.json();
    setResponse(data.reply || "No response yet.");
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>AI Health Assistant</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Get instant medical advice based on your symptoms. Always consult a doctor for diagnosis.</p>
        </div>
      </div>
      
      <div style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
            <div className="icon-circle" style={{ fontSize: '2.5rem' }}>🤖</div>
            <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#1565c0' }}>MediMind AI</h3>
          </div>
          
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '1.1rem', zIndex: 2 }}>🤕</div>
            <input
              style={{ paddingLeft: '3rem', fontSize: '1.05rem' }}
              placeholder="Describe your symptoms (e.g., headache, fever, cough...)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          
          <button className="btn" onClick={askAI} style={{ width: '100%', fontSize: '1.1rem', padding: '1.1rem' }}>
            ✨ Get AI Advice
          </button>
        </div>
      </div>
      
      {response && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="icon-circle" style={{ width: '48px', height: '48px', fontSize: '1.5rem', background: 'linear-gradient(135deg, #1976d2, #42a5f5)' }}>🤖</div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem', color: '#1565c0' }}>AI Assistant</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Generated response</p>
              </div>
            </div>
            <div style={{ lineHeight: '1.7', color: '#333', fontSize: '1.05rem' }}>
              {response}
            </div>
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
              ⚠️ This is AI-generated advice. Please consult a doctor for proper diagnosis and treatment.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
