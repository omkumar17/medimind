export default function ReminderCard({ medicine, time }) {
  return (
    <div className="page" style={{ padding: '1rem' }}>
      <h3>{medicine}</h3>
      <p>Time: {time}</p>
    </div>
  );
}
