import Link from "next/link";
import { cookies } from "next/headers";
import { verifyJwt, AUTH_COOKIE_NAME } from "../lib/jwt";

export default function Header() {
  const authToken = cookies().get(AUTH_COOKIE_NAME)?.value;
  let user = null;

  if (authToken) {
    try {
      user = verifyJwt(authToken);
    } catch (error) {
      user = null;
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/">
          <span className="brand">MediMind</span>
        </Link>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span>
              {user.role?.toUpperCase() || "User"}: {user.email}
            </span>
            <nav className="nav-links">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/api/auth/logout">Logout</Link>
            </nav>
          </>
        ) : (
          <nav className="nav-links">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
