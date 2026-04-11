"use client";

import { useState } from "react";
import Link from "next/link";

export default function DoctorPrescription() {

  const [patientEmail, setPatientEmail] = useState("");

  const [patientData, setPatientData] = useState(null);

  const [loading, setLoading] = useState(false);



  async function handleSearch() {

    if (!patientEmail.trim()) return;

    setLoading(true);

    try {

      const res =
        await fetch(
          `/api/doctor/patient-data?regno=${encodeURIComponent(patientEmail)}`
        );

      const data =
        await res.json();

      if (res.ok) {

        setPatientData(data);

      } else {

        alert(data.message);

        setPatientData(null);

      }

    } catch {

      alert("Error fetching patient");

    }

    setLoading(false);

  }
  console.log("Patient data:", patientData);


  return (

    <div className="page" style={{

      maxWidth: "1100px",

      margin: "30px auto",

      padding: "20px"

    }}>


      {/* HEADER */}

      <h2 style={{

        textAlign: "center",

        marginBottom: "25px",

        color: "#1565c0",

        fontWeight: "600"

      }}>

        Patient Medical History

      </h2>



      {/* SEARCH */}

      <div style={{

        display: "flex",

        flexWrap: "wrap",

        justifyContent: "center",

        gap: "10px",

        marginBottom: "30px"

      }}>

        <input

          type="text"

          placeholder="Enter Patient Registration ID"

          value={patientEmail}

          onChange={(e) => setPatientEmail(e.target.value)}

          style={{

            minWidth: "260px",

            padding: "10px 14px",

            borderRadius: "8px",

            border: "1px solid #ccc"

          }}

        />



        <button

          onClick={handleSearch}

          disabled={loading}

          className="btn"

        >

          {loading ? "Searching..." : "Search"}

        </button>

      </div>



      {patientData && (

        <>


          {/* PATIENT INFO */}

          <div style={{

            background: "#f4f8ff",

            padding: "15px",

            borderRadius: "10px",

            marginBottom: "30px",

            textAlign: "center",

            border: "1px solid #e3edff"

          }}>

            <h3 style={{ margin: 0, color: "#1565c0" }}>

              Patient ID: {patientData.patientEmail}

            </h3>

          </div>



          {/* RECORDS */}

          <section style={{ marginBottom: "40px" }}>

            <h3 style={{

              marginBottom: "15px",

              textAlign: "center"

            }}>

              Medical Records

            </h3>



            {patientData.records.length === 0 ? (

              <p style={{

                textAlign: "center",

                color: "#777"

              }}>

                No accessible records

              </p>

            ) : (

              <div style={{

                display: "grid",

                gridTemplateColumns:

                  "repeat(auto-fit,minmax(300px,1fr))",

                gap: "18px"

              }}>


                {patientData.records.map(record => (

                  <div

                    key={record._id}

                    style={{

                      background: "#fff",

                      border: "1px solid #eee",

                      borderRadius: "12px",

                      padding: "18px",

                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

                    }}

                  >


                    <Link href={`/record/${record._id}`}>

                      <h4 style={{

                        color: "#1565c0",

                        marginBottom: "6px",

                        cursor: "pointer"

                      }}>

                        {record.title}

                      </h4>

                    </Link>



                    <p style={{ fontSize: "14px" }}>

                      <b>Type:</b> {record.type}

                    </p>



                    <p style={{ fontSize: "14px" }}>

                      <b>Notes:</b> {record.notes}

                    </p>



                    <p style={{

                      fontSize: "12px",

                      color: "#666",

                      marginBottom: "12px"

                    }}>

                      {new Date(record.date).toLocaleDateString()}

                    </p>



                    {record.fileData && (

                      <div style={{

                        display: "flex",

                        gap: "8px"

                      }}>


                        <a

                          href={`/api/records/${record._id}/file`}

                          target="_blank"

                        >

                          <button style={{

                            padding: "6px 12px",

                            borderRadius: "6px",

                            border: "1px solid #ddd",

                            background: "#f5f5f5"

                          }}>

                            View

                          </button>

                        </a>



                        <a

                          href={`/api/records/${record._id}/file`}

                          download={record.fileName}

                        >

                          <button style={{

                            padding: "6px 12px",

                            borderRadius: "6px",

                            background: "#1565c0",

                            color: "#fff",

                            border: "none"

                          }}>

                            Download

                          </button>

                        </a>


                      </div>

                    )}



                  </div>

                ))}



              </div>

            )}

          </section>



          {/* PRESCRIPTIONS */}

          <section style={{ marginBottom: "40px" }}>

            <h3 style={{

              marginBottom: "15px",

              textAlign: "center"

            }}>

              Prescriptions

            </h3>



            {patientData.prescriptions.length === 0 ? (

              <p style={{

                textAlign: "center",

                color: "#777"

              }}>

                No prescriptions available

              </p>

            ) : (

              <div style={{

                display: "grid",

                gridTemplateColumns:

                  "repeat(auto-fit,minmax(300px,1fr))",

                gap: "18px"

              }}>


                {patientData.prescriptions.map(p => (

                  <div

                    key={p._id}

                    style={{

                      background: "#fff",

                      border: "1px solid #eee",

                      borderRadius: "12px",

                      padding: "18px",

                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"

                    }}

                  >


                    <h4 style={{

                      color: "#1565c0",

                      marginBottom: "8px"

                    }}>

                      Dr. {p.name}

                    </h4>



                    <p style={{ fontSize: "14px" }}>

                      <b>Symptoms:</b> {p.symptoms}

                    </p>



                    <p style={{ fontSize: "14px" }}>

                      <b>Diagnosis:</b> {p.diagnosis}

                    </p>



                    <div style={{ margin: "8px 0" }}>

                      <b>Medicines:</b>


                      <ul style={{

                        marginTop: "4px",

                        paddingLeft: "18px"

                      }}>

                        {p.medicines.map((m, i) => (

                          <li key={i}>

                            {m.name} ({m.dosage}, {m.duration})

                          </li>

                        ))}

                      </ul>

                    </div>



                    <p style={{ fontSize: "14px" }}>

                      <b>Advice:</b> {p.advice}

                    </p>



                    <p style={{

                      fontSize: "12px",

                      color: "#666"

                    }}>

                      {new Date(p.date).toLocaleDateString()}

                    </p>


                  </div>

                ))}



              </div>

            )}

          </section>



          {/* BUTTON */}

          <div style={{

            textAlign: "center",

            marginTop: "30px"

          }}>

            <Link

              href={`/doctor/create-prescription?patient=${encodeURIComponent(patientData.patientRegno)}`}

            >

              <button className="btn">

                Create Prescription

              </button>

            </Link>

          </div>



        </>

      )}



    </div>

  );

}