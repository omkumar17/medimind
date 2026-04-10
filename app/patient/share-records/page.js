"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShareRecords() {
  const router = useRouter();
  const [hospital, setHospital] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load patient's records
    async function loadRecords() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user || meData.user.role !== "patient") {
        router.push("/login");
        return;
      }

      const recordsRes = await fetch(`/api/records?patientId=${encodeURIComponent(meData.user.email)}`);
      const recordsData = await recordsRes.json();
      setRecords(recordsData || []);

      const prescriptionsRes = await fetch(`/api/prescription?patientId=${encodeURIComponent(meData.user.email)}`);
      const prescriptionsData = await prescriptionsRes.json();
      setPrescriptions(prescriptionsData || []);
    }
    loadRecords();
  }, [router]);

  const handleHospitalSearch = async () => {
    if (!hospital.trim()) return;
    const res = await fetch(`/api/doctors?hospital=${encodeURIComponent(hospital)}`);
    const data = await res.json();
    setDoctors(data || []);
  };

  const handleShare = async () => {
    if (!selectedDoctor || selectedItems.length === 0) return;
    setLoading(true);

    const recordsToShare = selectedItems
      .filter(key => key.startsWith('record-'))
      .map(key => key.replace('record-', ''));

    const prescriptionsToShare = selectedItems
      .filter(key => key.startsWith('prescription-'))
      .map(key => key.replace('prescription-', ''));

    const res = await fetch("/api/share-records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorEmail: selectedDoctor,
        recordIds: recordsToShare,
        prescriptionIds: prescriptionsToShare,
      }),
    });

    if (res.ok) {
      alert("Items shared successfully!");
      router.push("/patient/dashboard");
    } else {
      alert("Failed to share items");
    }
    setLoading(false);
  };

  const toggleItem = (type, id) => {
    const itemKey = `${type}-${id}`;
    setSelectedItems(prev =>
      prev.includes(itemKey)
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  return (
    <div className="page">
      <h2>Share Medical Records</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter hospital name"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleHospitalSearch} className="btn">Search Doctors</button>
      </div>

      {doctors.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <h3>Select Doctor:</h3>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">Choose a doctor</option>
            {doctors.map((doc) => (
              <option key={doc.email} value={doc.email}>{doc.email}</option>
            ))}
          </select>
        </div>
      )}

      {records.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <h3>Select Medical Records to Share:</h3>
          {records.map((record) => (
            <div key={record._id}>
              <input
                type="checkbox"
                id={`record-${record._id}`}
                checked={selectedItems.includes(`record-${record._id}`)}
                onChange={() => toggleItem('record', record._id)}
              />
              <label htmlFor={`record-${record._id}`}>{record.title} - {record.type}</label>
            </div>
          ))}
        </div>
      )}

      {prescriptions.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <h3>Select Prescriptions to Share:</h3>
          {prescriptions.map((p) => (
            <div key={p._id}>
              <input
                type="checkbox"
                id={`prescription-${p._id}`}
                checked={selectedItems.includes(`prescription-${p._id}`)}
                onChange={() => toggleItem('prescription', p._id)}
              />
              <label htmlFor={`prescription-${p._id}`}>Prescription by Dr. {p.doctorId} - {new Date(p.date).toLocaleDateString()}</label>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleShare}
        disabled={!selectedDoctor || selectedItems.length === 0 || loading}
        className="btn"
      >
        {loading ? "Sharing..." : "Share Selected Items"}
      </button>
    </div>
  );
}