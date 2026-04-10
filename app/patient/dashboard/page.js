import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";

export default function PatientDashboard() {
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

  if (user.role !== "patient") {
    redirect("/dashboard");
  }

  return (
    <div className="page">
      <h1>Patient Dashboard</h1>
      <div className="grid">
        <Link href="/patient/record">
          <button className="btn">View Medical Records</button>
        </Link>
        <Link href="/patient/prescriptions">
          <button className="btn">View Prescriptions</button>
        </Link>
        <Link href="/upload-record">
          <button className="btn">Upload Medical Document</button>
        </Link>
      </div>
    </div>
  );
}
