import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../lib/jwt";

export default function Dashboard() {
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

  if (user.role === "doctor") {
    redirect("/doctor/dashboard");
  }

  if (user.role === "admin") {
    redirect("/admin/dashboard");
  }

  redirect("/patient/dashboard");
}
