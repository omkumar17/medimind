"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CreatePrescription() {
  const searchParams = useSearchParams();
  const patientEmail = searchParams.get("patient");

  const [data, setData] = useState({
    patientId: patientEmail || "",
    symptoms: "",
    diagnosis: "",
    medicines: [{ name: "", dosage: "", duration: "" }],
    advice: "",
  });

  useEffect(() => {
    if (patientEmail) {
      setData(prev => ({ ...prev, patientId: patientEmail }));
    }
  }, [patientEmail]);

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
      // Reset form but keep patient
      setData({
        patientId: data.patientId,
        symptoms: "",
        diagnosis: "",
        medicines: [{ name: "", dosage: "", duration: "" }],
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
        placeholder="Patient Email"
        onChange={(e) =>
          setData({
            ...data,
            patientId: e.target.value,
          })
        }
        readOnly={!!patientEmail}
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

      <div style={{ marginBottom: '1rem' }}>
        <h3>Medicines</h3>
        {data.medicines.map((medicine, index) => (
          <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
            <input
              value={medicine.name}
              placeholder="Medicine name"
              onChange={(e) => {
                const newMedicines = [...data.medicines];
                newMedicines[index].name = e.target.value;
                setData({ ...data, medicines: newMedicines });
              }}
              style={{ flex: 1 }}
            />
            <input
              value={medicine.dosage}
              placeholder="Dosage"
              onChange={(e) => {
                const newMedicines = [...data.medicines];
                newMedicines[index].dosage = e.target.value;
                setData({ ...data, medicines: newMedicines });
              }}
              style={{ flex: 1 }}
            />
            <input
              value={medicine.duration}
              placeholder="Duration"
              onChange={(e) => {
                const newMedicines = [...data.medicines];
                newMedicines[index].duration = e.target.value;
                setData({ ...data, medicines: newMedicines });
              }}
              style={{ flex: 1 }}
            />
            {data.medicines.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newMedicines = data.medicines.filter((_, i) => i !== index);
                  setData({ ...data, medicines: newMedicines });
                }}
                style={{ background: '#dc3545', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setData({
              ...data,
              medicines: [...data.medicines, { name: "", dosage: "", duration: "" }]
            });
          }}
          style={{ background: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}
        >
          Add More Medicine
        </button>
      </div>

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