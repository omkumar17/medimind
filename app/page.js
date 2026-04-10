export default function Home() {
  return (
    <main className="main-page">
      <div className="grid" style={{ gap: '1.25rem' }}>
        <div>
          <h1 className="text-4xl font-bold mb-3">MediMind 💊</h1>
          <p className="note">Smart Health Assistant for daily care</p>
        </div>

        <div className="grid" style={{ gap: '1rem' }}>
          <a href="/select-role">
            <button className="btn">Login</button>
          </a>
          <a href="/register">
            <button className="btn">Register</button>
          </a>
          <a href="/dashboard">
            <button className="btn">Dashboard</button>
          </a>
        </div>
      </div>
    </main>
  );
}
