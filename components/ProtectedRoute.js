"use client";

export default function ProtectedRoute({ children }) {
  const user = null;

  if (!user) {
    return (
      <div className="page">
        <h2>Protected content</h2>
        <p>Please login to access this page.</p>
        <a href="/login">
          <button className="btn">Go to Login</button>
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
