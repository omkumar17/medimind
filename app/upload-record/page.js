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
        if (data.user?.email) {
          setPatientId(data.user.email);
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
    formData.append("patientId", patientId);
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
      <h2>Upload Medical Record</h2>

      <input
        placeholder="Record title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Prescription</option>
        <option>Lab Report</option>
        <option>Diagnosis</option>
        <option>Medication</option>
      </select>

      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <textarea
        placeholder="Doctor notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className="btn" onClick={upload}>
        Save Record
      </button>
    </div>
  );
}
