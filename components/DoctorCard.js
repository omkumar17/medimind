export default function DoctorCard({ doctor, userName }) {
  return (
    <div className="card">
      <div className="icon-circle" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        👨‍⚕️
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: '#111' }}>
        {doctor.name}
      </h3>
      <p style={{ margin: '0 0 0.25rem', color: '#1565c0', fontWeight: '600' }}>
        {doctor.specialization}
      </p>
      <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.95rem' }}>
        {doctor.hospital}
      </p>
      {doctor.experience && (
        <p style={{ margin: '0 0 0.25rem', color: '#666' }}>
          {doctor.experience} yrs experience
        </p>
      )}
      <p style={{ margin: '0 0 1rem', fontWeight: '600', color: '#10b981', fontSize: '1.1rem' }}>
        ₹{doctor.consultationFee}/consult
      </p>
      {doctor.phone && (
        <p style={{ margin: '0 0 1rem', fontSize: '0.95rem' }}>
          📞 {doctor.phone}
        </p>
      )}
      {/* <a href={`/doctors/${doctor.regno}`} className="btn" style={{ width: '100%', padding: '0.75rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
        Book Appointment for {userName || 'yourself'}
      </a> */}
    </div>
  );
}

