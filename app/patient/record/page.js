"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        `/api/records?patientId=${encodeURIComponent(meData.user.email)}`
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
      <h2>My Medical Records</h2>

      {records.length === 0 ? (
        <p>No medical records available.</p>
      ) : (
        records.map((r) => (
          <div key={r._id} style={{ marginBottom: '1.25rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h4>{r.title}</h4>
            <p><strong>Type:</strong> {r.type}</p>
            <p><strong>Notes:</strong> {r.notes}</p>
            <p><strong>Date:</strong> {new Date(r.date || r.createdAt).toLocaleString()}</p>
            {r.fileData && (
              <div style={{ marginTop: '0.5rem' }}>
                <a href={`/api/records/${r._id}/file`} target="_blank" rel="noopener noreferrer">
                  <button className="btn" style={{ marginRight: '0.5rem' }}>View File</button>
                </a>
                <a href={`/api/records/${r._id}/file`} download={r.fileName}>
                  <button className="btn">Download File</button>
                </a>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

}
