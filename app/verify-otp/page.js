"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  async function verify() {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Account verified");
      router.push("/dashboard");
    } else {
      alert(data.message || "OTP verification failed");
    }
  }

  return (
    <div className="page">
      <h2>Email Verification</h2>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="btn" onClick={verify}>
        Verify
      </button>
    </div>
  );
}
