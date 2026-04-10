import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";
import Link from "next/link";

export default async function PatientHistory() {
  const authToken = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!authToken) {
    redirect("/login");
  }

  let user;
  try {
    user = verifyJwt(authToken);
  } catch {
    redirect("/login");
  }

  if (user.role !== "doctor") {
    redirect("/dashboard");
  }

  const response = await fetch("http://localhost:3000/api/records", { cache: "no-store" });
  const records = await response.json();

  return (
    <div className="page">
      <h2>All Patient Medical History</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="grid">
          {records.map((record) => (
            <div key={record._id || record.id} style={{ padding: '1rem', borderRadius: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Link href={`/record/${record._id || record.id}`}>
                <h3 style={{ cursor: 'pointer', color: '#2563eb' }}>{record.title}</h3>
              </Link>
              <p><strong>Patient:</strong> {record.patientId || "Unknown"}</p>
              <p><strong>Type:</strong> {record.type}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
              <p><strong>Date:</strong> {new Date(record.date || record.createdAt).toLocaleString()}</p>
              {record.fileData && (
                <div style={{ marginTop: '0.5rem' }}>
                  <a href={`/api/records/${record._id || record.id}/file`} target="_blank" rel="noopener noreferrer">
                    <button className="btn" style={{ marginRight: '0.5rem' }}>View File</button>
                  </a>
                  <a href={`/api/records/${record._id || record.id}/file`} download={record.fileName}>
                    <button className="btn">Download File</button>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
