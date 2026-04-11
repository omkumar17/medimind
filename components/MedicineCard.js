export default function MedicineCard({ name }) {
  return (
    <div className="card">
      <div className="icon-circle" style={{ fontSize: '18px' }}>
        💊
      </div>
      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#111' }}>{name}</h4>
      <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>Prescription medicine</p>
      <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', width: '100%' }}>View Details</button>
    </div>
  );
}
