export default function DoctorCard({ doctor }) {
  return (
    <a href={doctor.link} target="_blank" rel="noreferrer">
      <button className="btn" style={{ width: '100%' }}>
        Consult on {doctor.name}
      </button>
    </a>
  );
}
