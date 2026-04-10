"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function DoctorVisitSummary() {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();

      if (!meData.user || meData.user.role !== "patient") {
        router.push("/login");
        return;
      }

      const patientEmail = meData.user.email;

      // Fetch prescriptions (doctor visits)
      const prescriptionsRes = await fetch(
        `/api/prescription?patientId=${encodeURIComponent(patientEmail)}`
      );
      const prescriptionsData = await prescriptionsRes.json();
      setPrescriptions(prescriptionsData || []);

      // Fetch medical records
      const recordsRes = await fetch(
        `/api/records?patientId=${encodeURIComponent(patientEmail)}`
      );
      const recordsData = await recordsRes.json();
      setRecords(recordsData || []);

      setLoading(false);
    }

    load();
  }, [router]);

  const handleViewDetails = (prescription) => {
    setSelectedVisit(prescription);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVisit(null);
  };

  const getRecordsForVisit = (visitDate) => {
    // Get records within 7 days of the visit date
    const visitTime = new Date(visitDate).getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    return records.filter((record) => {
      const recordTime = new Date(record.date || record.createdAt).getTime();
      return Math.abs(recordTime - visitTime) <= sevenDaysMs;
    });
  };

  if (loading) {
    return <div className="page"><p>Loading doctor visits...</p></div>;
  }

  return (
    <div className="page">
      <h1>Doctor Visit Summary</h1>

      {prescriptions.length === 0 ? (
        <p>No doctor visits available.</p>
      ) : (
        <div>
          <h2>Your Doctor Visits</h2>
          <div className={styles.summaryContainer}>
            {prescriptions.map((prescription) => (
              <div key={prescription._id} className={styles.visitCard}>
                <div className={styles.visitInfo}>
                  <h3>Dr. {prescription.doctorId}</h3>
                  <p><strong>Date:</strong> {new Date(prescription.date).toLocaleDateString()}</p>
                  <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
                  <p><strong>Symptoms:</strong> {prescription.symptoms}</p>
                </div>
                <button
                  className="btn"
                  onClick={() => handleViewDetails(prescription)}
                >
                  View Details & Records
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for showing details */}
      {showModal && selectedVisit && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Doctor Visit Details - Dr. {selectedVisit.doctorId}</h2>
              <button
                className={styles.closeButton}
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalContent}>
              {/* Visit Details */}
              <div className={styles.section}>
                <h3>Visit Information</h3>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <td><strong>Date:</strong></td>
                      <td>{new Date(selectedVisit.date).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td><strong>Doctor:</strong></td>
                      <td>Dr. {selectedVisit.doctorId}</td>
                    </tr>
                    <tr>
                      <td><strong>Symptoms:</strong></td>
                      <td>{selectedVisit.symptoms}</td>
                    </tr>
                    <tr>
                      <td><strong>Diagnosis:</strong></td>
                      <td>{selectedVisit.diagnosis}</td>
                    </tr>
                    <tr>
                      <td><strong>Advice:</strong></td>
                      <td>{selectedVisit.advice || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Prescribed Medicines Table */}
              <div className={styles.section}>
                <h3>Prescribed Medicines</h3>
                {selectedVisit.medicines && selectedVisit.medicines.length > 0 ? (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Medicine Name</th>
                        <th>Dosage</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedVisit.medicines.map((medicine, idx) => (
                        <tr key={idx}>
                          <td>{medicine.name}</td>
                          <td>{medicine.dosage}</td>
                          <td>{medicine.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No medicines prescribed.</p>
                )}
              </div>

              {/* Medical Records Related to This Visit */}
              <div className={styles.section}>
                <h3>Related Medical Records</h3>
                {getRecordsForVisit(selectedVisit.date).length > 0 ? (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Record Title</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getRecordsForVisit(selectedVisit.date).map((record) => (
                        <tr key={record._id}>
                          <td>{record.title}</td>
                          <td>{record.type}</td>
                          <td>{new Date(record.date || record.createdAt).toLocaleDateString()}</td>
                          <td>{record.notes || "N/A"}</td>
                          <td>
                            {record.fileData && (
                              <a
                                href={`/api/records/${record._id}/file`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button className="btn" style={{ fontSize: '0.875rem', padding: '0.5rem' }}>
                                  View
                                </button>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No medical records found near this visit date.</p>
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
