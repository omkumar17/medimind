"use client";

import { useEffect, useState } from "react";

export default function HealthRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("/api/records")
      .then((res) => res.json())
      .then((data) => setRecords(data || []));
  }, []);

  return (
    <div className="page">
      <h1>Health Records</h1>

      <a href="/upload-record">
        <button className="btn">Upload Record</button>
      </a>

      <ul>
        {records.length === 0 ? (
          <p>No records found yet.</p>
        ) : (
          records.map((rec) => (
            <li key={rec.id} style={{ marginBottom: '1rem' }}>
              <h3>{rec.title}</h3>
              <p>{rec.type}</p>
              <a href={`/record/${rec.id}`}>
                <button className="btn">View</button>
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
