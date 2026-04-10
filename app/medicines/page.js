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
      <h2>Medicine Alternatives</h2>

      <input
        placeholder="Enter medicine name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn" onClick={searchMedicine}>
        Search
      </button>

      <ul>
        {result.map((med, index) => (
          <li key={index}>{med}</li>
        ))}
      </ul>
    </div>
  );
}
