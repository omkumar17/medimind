"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientPrescriptions() {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();

      if (!meData.user || meData.user.role !== "patient") {
        router.push("/login");
        return;
      }

      const prescriptionsRes = await fetch(
        `/api/prescription?patientId=${encodeURIComponent(meData.user.email)}`
      );
      const prescriptionsData = await prescriptionsRes.json();
      setPrescriptions(prescriptionsData || []);
      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return <div className="page"><p>Loading prescriptions...</p></div>;
  }

  return (
    <div className="page">
      <h2>My Prescriptions</h2>

      {prescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        prescriptions.map((p) => (
          <div key={p._id} style={{ marginBottom: '1.25rem', border: '1px solid #ccc', padding: '1rem' }}>
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
        ))
      )}
    </div>
  );
}