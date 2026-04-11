"use client";

import { useState } from "react";

export default function Reminder() {
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");

  async function addReminder() {
    const res = await fetch("/api/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ medicine, time }),
    });

    const data = await res.json();
    alert(data.message || "Reminder added");
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Medicine Reminders</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Never miss a dose. Set up smart reminders for all your medications.</p>
        </div>
      </div>
      
      <div style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ color: '#1565c0', marginBottom: '2rem', textAlign: 'center' }}>Set New Reminder</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Medicine Name</label>
            <input
              placeholder="e.g., Paracetamol 500mg"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Reminder Time</label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>
          
          <button className="btn" onClick={addReminder} style={{ width: '100%', fontSize: '1.1rem' }}>
            ➕ Add Reminder
          </button>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
        <p>Your active reminders will appear here as cards.</p>
      </div>
    </div>
  );
}
