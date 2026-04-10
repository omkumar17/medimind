"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
      body: JSON.stringify({ email, password, role }),
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
    <div className="page">
      <h2>{role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}</h2>
      {role ? <p className="note">Signing in as {role}</p> : null}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn" onClick={handleLogin}>
        Login
      </button>

      <hr style={{ margin: '1.5rem 0' }} />

      <a href="/api/auth/google">
        <button className="btn">Login with Google</button>
      </a>

      <p className="note" style={{ marginTop: '1rem' }}>
        <a href="/register">Create account</a>
      </p>
    </div>
  );
}
