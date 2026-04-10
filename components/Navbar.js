import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="page" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Link href="/">
        <button className="btn">Home</button>
      </Link>
      <Link href="/dashboard">
        <button className="btn">Dashboard</button>
      </Link>
      <Link href="/login">
        <button className="btn">Login</button>
      </Link>
    </nav>
  );
}
