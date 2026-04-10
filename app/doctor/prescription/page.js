"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorPrescription() {
  const router = useRouter();
  const [patientEmail, setPatientEmail] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!patientEmail.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/doctor/patient-data?email=${encodeURIComponent(patientEmail)}`);
      const data = await res.json();

      if (res.ok) {
        setPatientData(data);
      } else {
        alert(data.message || "Unable to access patient data");
        setPatientData(null);
      }
    } catch (error) {
      alert("Error fetching patient data");
      setPatientData(null);
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2>View Patient Records & Prescriptions</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Enter patient email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleSearch} disabled={loading} className="btn">
          {loading ? "Searching..." : "Search Patient"}
        </button>
      </div>

      {patientData && (
        <div>
          <h3>Patient: {patientData.patientEmail}</h3>

          <h4>Medical Records</h4>
          {patientData.records.length === 0 ? (
            <p>No accessible records</p>
          ) : (
            <div className="grid">
              {patientData.records.map((record) => (
                <div key={record._id} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
                  <Link href={`/record/${record._id}`}>
                    <h4 style={{ cursor: 'pointer', color: '#2563eb' }}>{record.title}</h4>
                  </Link>
                  <p><strong>Type:</strong> {record.type}</p>
                  <p><strong>Notes:</strong> {record.notes}</p>
                  <p><strong>Date:</strong> {new Date(record.date).toLocaleString()}</p>
                  {record.fileData && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <a href={`/api/records/${record._id}/file`} target="_blank" rel="noopener noreferrer">
                        <button className="btn" style={{ marginRight: '0.5rem' }}>View File</button>
                      </a>
                      <a href={`/api/records/${record._id}/file`} download={record.fileName}>
                        <button className="btn">Download File</button>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <h4>Prescriptions</h4>
          {patientData.prescriptions.length === 0 ? (
            <p>No prescriptions</p>
          ) : (
            <div className="grid">
              {patientData.prescriptions.map((p) => (
                <div key={p._id} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
                  <h4>Prescription by Dr. {p.doctorId}</h4>
                  <p><strong>Symptoms:</strong> {p.symptoms}</p>
                  <p><strong>Diagnosis:</strong> {p.diagnosis}</p>
                  <p><strong>Medicines:</strong></p>
                  <ul>
                    {p.medicines.map((m, idx) => (
                      <li key={idx}>{m.name} - {m.dosage} for {m.duration}</li>
                    ))}
                  </ul>
                  <p><strong>Advice:</strong> {p.advice}</p>
                  <p><strong>Date:</strong> {new Date(p.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <Link href={`/doctor/create-prescription?patient=${encodeURIComponent(patientData.patientEmail)}`}>
              <button className="btn">Create New Prescription</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
