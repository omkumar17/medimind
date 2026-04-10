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
      <h2>Medicine Reminder</h2>

      <input
        placeholder="Medicine name"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />

      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <button className="btn" onClick={addReminder}>
        Add Reminder
      </button>
    </div>
  );
}
