"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("patient");
  const [bloodGroup, setBloodGroup] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospital, setHospital] = useState("");
  const [experience, setExperience] = useState("");
  const [consultationFee, setConsultationFee] = useState(""); 

  async function sendOtp() {
    const profileData = {
      name,
      email,
      phone,
      address,
      role,
      ...(role === 'patient' && { bloodGroup }),
      ...(role === 'doctor' && { specialization, hospital, experience: Number(experience), consultationFee: Number(consultationFee) }),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "OTP sent");
      router.push("/verify-otp");
    } else {
      alert(data.message || "Failed to send OTP");
    }
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Create Account</h1>
          
        </div>
      </div>
      
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="icon-circle" style={{ fontSize: '2.5rem', margin: '0 auto 1rem', width: '80px', height: '80px' }}>👤</div>
            <h3 style={{ margin: '0 0 0.25rem', color: '#1565c0', fontSize: '1.4rem' }}>Get Started</h3>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Phone</label>
            <input
              type="tel"
              placeholder="+1 234 567 8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Address</label>
            <textarea
              placeholder="123 Health St, Medical City"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              style={{ fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ fontSize: '1rem', width: '100%', padding: '0.75rem' }}
            >
              <option value="patient">Patient</option>
              
            </select>
          </div>

          {role === 'patient' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Blood Group</label>
              <input
                type="text"
                placeholder="A+"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                style={{ fontSize: '1rem' }}
              />
            </div>
          )}

          {role === 'doctor' && (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Specialization</label>
                <input
                  type="text"
                  placeholder="Cardiology"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  style={{ fontSize: '1rem' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Hospital</label>
                <input
                  type="text"
                  placeholder="Apollo Hospital"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  style={{ fontSize: '1rem' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Experience (years)</label>
                <input
                  type="number"
                  placeholder="5"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  style={{ fontSize: '1rem' }}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Consultation Fee</label>
                <input
                  type="number"
                  placeholder="500"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  style={{ fontSize: '1rem' }}
                />
              </div>
            </>
          )}

          <button className="btn" onClick={sendOtp} style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
            📧 Send Verification Code
          </button>

          <p style={{ textAlign: 'center', color: '#666', marginTop: '1.5rem' }}>
            Already have an account? <Link href="/login" style={{ color: '#1565c0', fontWeight: '500', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
