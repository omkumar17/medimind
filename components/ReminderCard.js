export default function ReminderCard({ medicine, time }) {
  return (
    <div className="card">
      <div className="icon-circle" style={{ fontSize: '20px', background: 'linear-gradient(135deg, #e8f0fe, #bbdefb)' }}>
        ⏰
      </div>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#111' }}>{medicine}</h4>
      <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#1565c0', fontWeight: '600' }}>Next dose: <span style={{ background: '#e8f0fe', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.95rem' }}>{time}</span></p>
      <button className="btn" style={{ width: '100%' }}>Mark as Taken</button>
    </div>
  );
}
