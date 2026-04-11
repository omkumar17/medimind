"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useParams } from 'next/navigation';

export default function DoctorPatientPage() {
  const [user, setUser] = useState(null);
  const params = useParams();
  const patientRegno = params.regno;

  useEffect(() => {
    fetch(`/api/doctor/patient-data?patientRegno=${encodeURIComponent(patientRegno)}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, [patientRegno]);

  return (
    <ProtectedRoute allowedRole="doctor">
      <div className="page">
        <h1>Patient {patientRegno}</h1>
        {/* Records, prescriptions from data.records, data.prescriptions */}
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </ProtectedRoute>
  );
}

