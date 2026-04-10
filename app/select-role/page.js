import Link from "next/link";

export default function SelectRole() {
  return (
    <div className="page">
      <h2>Sign in as</h2>
      <div className="grid" style={{ gap: '1rem', marginTop: '1.5rem' }}>
        <Link href="/login?role=doctor">
          <button className="btn">Doctor Login</button>
        </Link>
        <Link href="/login?role=patient">
          <button className="btn">Patient Login</button>
        </Link>
      </div>
    </div>
  );
}
