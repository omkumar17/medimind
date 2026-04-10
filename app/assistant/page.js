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
      <h2>AI Health Assistant</h2>

      <input
        placeholder="Enter symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button className="btn" onClick={askAI}>
        Get Advice
      </button>

      {response ? <p style={{ marginTop: '1rem' }}>{response}</p> : null}
    </div>
  );
}
