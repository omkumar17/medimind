import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";

export default function AdminDashboard() {
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

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <div className="grid">
        <Link href="/admin/reports">
          <button className="btn">View All Records & Prescriptions</button>
        </Link>
      </div>
    </div>
  );
}
