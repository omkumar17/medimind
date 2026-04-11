import Link from 'next/link';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt ,AUTH_COOKIE_NAME} from '../lib/jwt';

const NAV_LINKS = ["Home", "About", "Services", "Departments", "Doctors", "Contact"];

const FEATURES = [
  // {
  //   title: "Book Appointments",
  //   desc: "Schedule consultations with specialists quickly and without any hassle.",
  //   icon: (
  //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2">
  //       <rect x="3" y="3" width="18" height="18" rx="3" />
  //       <path d="M8 12h8M12 8v8" />
  //     </svg>
  //   ),
  // },
  {
    title: "24/7 Health Monitoring",
    desc: "Track vitals, medications and health records any time, anywhere.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: "Expert Doctor Network",
    desc: "Access a verified network of experienced doctors across all specialities.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Home() {
   const authToken = cookies().get(AUTH_COOKIE_NAME)?.value;
  
    if (authToken) {
      redirect("/dashboard");
    }
  
   
  return (
    <>
      {/* Hero Section */}
      <section style={{
        position: "relative",
        minHeight: 440,
        display: "flex",
        alignItems: "center",
        padding: "4rem 2rem",
        overflow: "hidden",
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1400&q=85&fit=crop&crop=top')",
          backgroundSize: "cover",
          backgroundPosition: "20% 10%",
          zIndex: 0,
        }} />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(8,36,90,0.90) 38%, rgba(8,36,90,0.50) 65%, rgba(8,36,90,0.18) 100%)",
          zIndex: 1,
        }} />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 500 }}>
          <p style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}>
            Smart Health Assistant
          </p>
          <h1 style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: "-0.5px",
          }}>
            Welcome to MediMind
          </h1>
          <p style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.75,
            marginBottom: 32,
            maxWidth: 400,
          }}>
            Connecting you with trusted doctors and services for smarter, more compassionate daily healthcare.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/select-role" style={{
              background: "#1565c0",
              color: "#fff",
              padding: "11px 28px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-block",
              transition: "background 0.2s",
            }}>
              Login
            </Link>
            <Link href="/register" style={{
              background: "transparent",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.75)",
              padding: "10px 28px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
            }}>
              Register
            </Link>
            <Link href="/dashboard" style={{
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.4)",
              padding: "10px 28px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
              backdropFilter: "blur(4px)",
            }}>
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div style={{ background: "#e8f0fe", padding: "28px 2rem 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {/* Blue highlight card */}
          <div style={{
            background: "#1565c0",
            borderRadius: 14,
            padding: "1.75rem",
            color: "#fff",
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, lineHeight: 1.3 }}>
              Why Choose MediMind?
            </h3>
            <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.7, marginBottom: 24 }}>
              Trusted by thousands of patients for smart, reliable, and compassionate healthcare guidance every day.
            </p>
            {/* <Link href="/doctors" style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.65)",
              color: "#fff",
              padding: "9px 20px",
              borderRadius: 7,
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
            }}>
              Learn More →
            </Link> */}
          </div>

          {/* Feature cards */}
          {FEATURES.map((f) => (
            <div key={f.title} style={{
              background: "#fff",
              borderRadius: 14,
              padding: "1.5rem",
              border: "0.5px solid rgba(0,0,0,0.08)",
              transition: "box-shadow 0.2s",
            }}>
              <div style={{
                width: 40,
                height: 40,
                background: "#e8f0fe",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}>
                {f.icon}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 8 }}>
                {f.title}
              </h4>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

