"use client";

export default function SymptomForm({ symptoms, onSymptomsChange, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="grid">
      <input
        placeholder="Enter symptoms"
        value={symptoms}
        onChange={(e) => onSymptomsChange(e.target.value)}
      />
      <button className="btn" type="submit">Get Advice</button>
    </form>
  );
}
