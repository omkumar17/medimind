"use client";

import { useState } from "react";

export default function Prescription() {
  const [data, setData] = useState({
    patientId: "",
    symptoms: "",
    diagnosis: "",
    medicine: "",
    dosage: "",
    duration: "",
    advice: "",
  });

  async function submit() {
    const res = await fetch("/api/prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Prescription saved");
      setData({
        patientId: "",
        symptoms: "",
        diagnosis: "",
        medicine: "",
        dosage: "",
        duration: "",
        advice: "",
      });
    } else {
      alert("Failed to save prescription");
    }
  }

  return (
    <div className="page">
      <h2>Create Prescription</h2>

      <input
        value={data.patientId}
        placeholder="Patient ID"
        onChange={(e) =>
          setData({
            ...data,
            patientId: e.target.value,
          })
        }
      />

      <textarea
        value={data.symptoms}
        placeholder="Symptoms"
        onChange={(e) =>
          setData({
            ...data,
            symptoms: e.target.value,
          })
        }
      />

      <textarea
        value={data.diagnosis}
        placeholder="Diagnosis"
        onChange={(e) =>
          setData({
            ...data,
            diagnosis: e.target.value,
          })
        }
      />

      <input
        value={data.medicine}
        placeholder="Medicine name"
        onChange={(e) =>
          setData({
            ...data,
            medicine: e.target.value,
          })
        }
      />

      <input
        value={data.dosage}
        placeholder="Dosage"
        onChange={(e) =>
          setData({
            ...data,
            dosage: e.target.value,
          })
        }
      />

      <input
        value={data.duration}
        placeholder="Duration"
        onChange={(e) =>
          setData({
            ...data,
            duration: e.target.value,
          })
        }
      />

      <textarea
        value={data.advice}
        placeholder="Advice"
        onChange={(e) =>
          setData({
            ...data,
            advice: e.target.value,
          })
        }
      />

      <button className="btn" onClick={submit}>
        Save Prescription
      </button>
    </div>
  );
}
