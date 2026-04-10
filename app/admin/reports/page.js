import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";

export default async function AdminReports() {
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

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  const [recordsRes, prescriptionsRes] = await Promise.all([
    fetch("http://localhost:3000/api/records", { cache: "no-store" }),
    fetch("http://localhost:3000/api/prescription", { cache: "no-store" }),
  ]);

  const records = await recordsRes.json();
  const prescriptions = await prescriptionsRes.json();

  return (
    <div className="page">
      <h2>Admin Reports</h2>
      <div style={{ marginBottom: '2rem' }}>
        <h3>All Medical Records</h3>
        {records.length === 0 ? (
          <p>No records available.</p>
        ) : (
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                {record.title} — {record.patientId || "Unknown"} — {record.type}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>All Prescriptions</h3>
        {prescriptions.length === 0 ? (
          <p>No prescriptions found.</p>
        ) : (
          <ul>
            {prescriptions.map((prescription) => (
              <li key={prescription.id}>
                Patient {prescription.patientId} — {prescription.diagnosis}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
