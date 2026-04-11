"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CreatePrescription() {

  const searchParams =
    useSearchParams();

  const patientEmail =
    searchParams.get("patient");

  const [data, setData] =
    useState({

      patientId:
        patientEmail || "",

      symptoms: "",

      diagnosis: "",

      medicines: [
        {
          name: "",
          dosage: "",
          duration: ""
        }
      ],

      advice: ""

    });


  useEffect(() => {

    if (patientEmail) {

      setData(prev => ({

        ...prev,

        patientId:
          patientEmail

      }));

    }

  }, [patientEmail]);


  function updateMedicine(index, field, value) {

    const updated =
      [...data.medicines];

    updated[index][field] =
      value;

    setData({

      ...data,

      medicines: updated

    });

  }


  function addMedicine() {

    setData({

      ...data,

      medicines: [

        ...data.medicines,

        {
          name: "",
          dosage: "",
          duration: ""
        }

      ]

    });

  }


  function removeMedicine(index) {

    const updated =
      data.medicines.filter(

        (_, i) =>
          i !== index

      );

    setData({

      ...data,

      medicines: updated

    });

  }


  async function submit() {

    const res =
      await fetch(
        "/api/prescription",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(data)

        }
      );


    if (res.ok) {

      alert(
        "Prescription saved"
      );

      setData({

        patientId:
          data.patientId,

        symptoms: "",

        diagnosis: "",

        medicines: [
          {
            name: "",
            dosage: "",
            duration: ""
          }
        ],

        advice: ""

      });

    } else {

      alert(
        "Failed to save"
      );

    }

  }


  return (

    <div
      style={{
        marginTop: "20px"
      }}

      className="page max-w-3xl mx-auto flex items-center"
    >


      <h2
        style={{
          textAlign: "center"
        }}
        className="text-2xl font-semibold mb-6"
      >

        Create Prescription

      </h2>



      <div
        className="bg-white border rounded-xl p-6 shadow-sm space-y-5"
      >


        <input

          value={data.patientId}

          readOnly={!!patientEmail}

          onChange={(e) =>

            setData({

              ...data,

              patientId:
                e.target.value

            })

          }

        />


        <textarea

          value={data.symptoms}

          placeholder="Symptoms"

          onChange={(e) =>

            setData({

              ...data,

              symptoms:
                e.target.value

            })

          }

        />


        <textarea

          value={data.diagnosis}

          placeholder="Diagnosis"

          onChange={(e) =>

            setData({

              ...data,

              diagnosis:
                e.target.value

            })

          }

        />


        {data.medicines.map((m, index) => (

          <div key={index}>

            <input

              placeholder="Medicine"

              value={m.name}

              onChange={(e) =>

                updateMedicine(
                  index,
                  "name",
                  e.target.value
                )

              }

            />


            <input

              placeholder="Dosage"

              value={m.dosage}

              onChange={(e) =>

                updateMedicine(
                  index,
                  "dosage",
                  e.target.value
                )

              }

            />


            <input

              placeholder="Duration"

              value={m.duration}

              onChange={(e) =>

                updateMedicine(
                  index,
                  "duration",
                  e.target.value
                )

              }

            />


            {data.medicines.length > 1 && (

              <button
                type="button"
                onClick={() =>
                  removeMedicine(index)
                }
              >

                ❌

              </button>

            )}

          </div>

        ))}


        <button
          type="button"
          onClick={addMedicine}
        >

          + Add Medicine

        </button>


        <textarea

          value={data.advice}

          placeholder="Advice"

          onChange={(e) =>

            setData({

              ...data,

              advice:
                e.target.value

            })

          }

        />


        <button
          onClick={submit}
        >

          Save Prescription

        </button>


      </div>


    </div>

  );

}