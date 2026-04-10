import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";

export default function DoctorDashboard() {
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

  return (
    <div className="page">
      <h1>Doctor Dashboard</h1>
      <div className="grid">
        <Link href="/doctor/prescription">
          <button className="btn">Create Prescription</button>
        </Link>
        <Link href="/doctor/patient-history">
          <button className="btn">View Medical Records</button>
        </Link>
      </div>
    </div>
  );
}
