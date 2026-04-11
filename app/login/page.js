"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
body: JSON.stringify({ identifier: email, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Login successful");
      router.push("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  }

  return (
    <div className="page ">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0' }}>{role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Welcome Back"}</h1>
          {/* <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            {role ? `Sign in to your ${role} account` : "Access your medical records and services"}
            {role ? <span className="note" style={{ display: 'block', marginTop: '0.5rem' }}>Signing in as {role}</span> : null}
          </p> */}
        </div>
      </div>
      
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem', justifyContent: 'center' }}>
            <div style={{ fontSize: '2rem' }}>🔐</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#1565c0' }}>Secure Login</h3>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
<label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Email or Registration No</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>

          <button className="btn" onClick={handleLogin} style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
            Sign In
          </button>

          {/* <div style={{ textAlign: 'center', margin: '2rem 0 1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
            <a href="/api/auth/google" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#1565c0', textDecoration: 'none', fontWeight: '500', padding: '0.75rem 1.5rem', border: '1px solid #e8f0fe', borderRadius: '0.5rem', background: '#f8fbff', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '1.2rem' }}>🌐</div>
              Continue with Google
            </a>
          </div> */}

          <p style={{ textAlign: 'center', color: '#666', marginTop: '1.5rem' }}>
            Don't have an account? <Link href="/register" style={{ color: '#1565c0', fontWeight: '500', textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
