export default function Doctors() {
  const doctors = [
    {
      name: "Practo",
      link: "https://www.practo.com",
    },
    {
      name: "Apollo 24|7",
      link: "https://www.apollo247.com",
    },
    {
      name: "Tata 1mg",
      link: "https://www.1mg.com",
    },
    {
      name: "MFine",
      link: "https://www.mfine.co",
    },
  ];

  return (
    <div className="page">
      <h2>Online Doctors</h2>

      <div className="grid">
        {doctors.map((doc, index) => (
          <a href={doc.link} target="_blank" rel="noreferrer" key={index}>
            <button className="btn">Consult on {doc.name}</button>
          </a>
        ))}
      </div>
    </div>
  );
}
