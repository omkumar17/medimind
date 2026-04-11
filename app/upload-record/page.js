"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadRecord() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Prescription");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.regno) {
          setPatientId(data.user.regno);
        }
      });
  }, []);

  async function upload() {
    if (!patientId) {
      alert("Please login as a patient to upload a record.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("notes", notes);
    formData.append("patientRegno", patientId);
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch("/api/records", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Record saved");
      router.push("/patient/record");
    } else {
      alert("Failed to save record");
    }
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Upload Medical Record</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Add new medical documents to your secure health library.</p>
        </div>
      </div>
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
            <div className="icon-circle" style={{ fontSize: '2.5rem' }}>📎</div>
            <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#1565c0' }}>New Record</h3>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#333', fontSize: '1rem' }}>Record Title</label>
            <input
              placeholder="e.g., Blood Test Report - March 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#333', fontSize: '1rem' }}>Document Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={{ fontSize: '1rem', padding: '1rem' }}>
              <option>Prescription</option>
              <option>Lab Report</option>
              <option>Diagnosis Report</option>
              <option>Medication List</option>
              <option>X-Ray/MRI</option>
              <option>Vaccination Record</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#333', fontSize: '1rem' }}>Upload File</label>
            <input
              type="file"
              accept="application/pdf,image/*,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ fontSize: '1rem', padding: '0.75rem' }}
            />
            <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>PDF, Images, Word documents supported (Max 10MB)</p>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#333', fontSize: '1rem' }}>Doctor Notes (Optional)</label>
            <textarea
              placeholder="Additional notes or doctor comments..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              style={{ fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          <button className="btn" onClick={upload} style={{ width: '100%', fontSize: '1.15rem', padding: '1.2rem' }}>
            💾 Save to Health Library
          </button>
        </div>
      </div>
    </div>
  );
}
