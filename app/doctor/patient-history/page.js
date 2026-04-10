"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PatientHistory() {
  const router = useRouter();
  const [allRecords, setAllRecords] = useState([]);
  const [doctorEmail, setDoctorEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();

      if (!meData.user || meData.user.role !== "doctor") {
        router.push("/login");
        return;
      }

      setDoctorEmail(meData.user.email);

      const response = await fetch("/api/records");
      const records = await response.json();
      setAllRecords(records || []);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) {
    return <div className="page"><p>Loading...</p></div>;
  }

  return <PatientHistoryClient allRecords={allRecords} doctorEmail={doctorEmail} />;
}

function PatientHistoryClient({ allRecords, doctorEmail }) {
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  const handleSearch = () => {
    if (!searchEmail.trim()) {
      setFilteredRecords([]);
      return;
    }

    const sharedRecords = allRecords.filter(record =>
      record.patientId === searchEmail &&
      record.sharedWith &&
      record.sharedWith.includes(doctorEmail)
    );
    setFilteredRecords(sharedRecords);
  };

  return (
    <div className="page">
      <h2>Patient Medical Records</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Enter patient email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleSearch} className="btn">Search Shared Records</button>
      </div>

      {filteredRecords.length === 0 ? (
        <p>Enter patient email to view shared records.</p>
      ) : (
        <div className="grid">
          {filteredRecords.map((record) => (
            <div key={record._id || record.id} style={{ padding: '1rem', borderRadius: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Link href={`/record/${record._id || record.id}`}>
                <h3 style={{ cursor: 'pointer', color: '#2563eb' }}>{record.title}</h3>
              </Link>
              <p><strong>Patient:</strong> {record.patientId || "Unknown"}</p>
              <p><strong>Type:</strong> {record.type}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
              <p><strong>Date:</strong> {new Date(record.date || record.createdAt).toLocaleString()}</p>
              {record.fileData && (
                <div style={{ marginTop: '0.5rem' }}>
                  <a href={`/api/records/${record._id || record.id}/file`} target="_blank" rel="noopener noreferrer">
                    <button className="btn" style={{ marginRight: '0.5rem' }}>View File</button>
                  </a>
                  <a href={`/api/records/${record._id || record.id}/file`} download={record.fileName}>
                    <button className="btn">Download File</button>
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
