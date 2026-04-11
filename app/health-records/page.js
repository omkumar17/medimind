"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HealthRecords() {

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const router = useRouter();


  useEffect(() => {

    async function load() {

      const meRes =
        await fetch("/api/auth/me");

      const meData =
        await meRes.json();


      if (
        !meData.user ||
        meData.user.role !== "patient"
      ) {

        router.push("/");

        return;

      }


      const recordsRes =
        await fetch(
          `/api/records?patientRegno=${
            encodeURIComponent(
              meData.user.regno
            )
          }`
        );


      const recordsData =
        await recordsRes.json();


      setRecords(
        recordsData || []
      );

      setLoading(false);

    }

    load();

  }, [router]);


  if (loading) {

    return (

      <div className="page">

        <p>Loading...</p>

      </div>

    );

  }


  return (

    <div className="page">


{/* HERO */}

<div className="hero-section">

<div className="hero-content">

<h1
style={{
fontSize:"2.2rem",
marginBottom:"1rem"
}}
>

Health Records

</h1>


<p
style={{
fontSize:"1.1rem",
lineHeight:"1.6"
}}
>

Securely access and manage
all your medical documents.

</p>


</div>

</div>



{/* Upload button */}

<div
style={{
marginBottom:"2rem",
textAlign:"center"
}}
>

<Link

href="/upload-record"

className="btn"

style={{
display:"inline-block",
fontSize:"1.05rem",
padding:"1rem 2rem"
}}

>

➕ Upload New Record

</Link>

</div>



{/* Empty state */}

{records.length === 0 ? (

<div

className="card"

style={{

textAlign:"center",

padding:"4rem 2rem",

maxWidth:"500px",

margin:"0 auto"

}}

>

<div

className="icon-circle"

style={{

fontSize:"4rem",

marginBottom:"1.5rem"

}}

>

📂

</div>


<h3
style={{
color:"#666",
marginBottom:"1rem"
}}
>

No records yet

</h3>


<p
style={{
color:"#999",
marginBottom:"2rem"
}}
>

Your medical records
will appear here.

</p>


<Link
href="/upload-record"
className="btn"
>

Upload First Record

</Link>

</div>

) : (


<>

<h2

style={{

color:"#1565c0",

fontSize:"1.5rem",

marginBottom:"1.5rem"

}}

>

Your Records ({records.length})

</h2>



<div className="grid">

{records.map((rec)=>(

<div
key={rec.id}
className="card"
>

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"flex-start",

marginBottom:"1rem"

}}

>

<div>

<h4

style={{

margin:"0 0 0.25rem",

fontSize:"1.2rem"

}}

>

{rec.title}

</h4>


<p

style={{

margin:0,

color:"#666",

fontSize:"0.95rem"

}}

>

{rec.type}

</p>

</div>



<div

className="icon-circle"

style={{

fontSize:"1.2rem",

width:"36px",

height:"36px",

minWidth:"36px"

}}

>

📄

</div>

</div>



<div

style={{

borderTop:

"1px solid #e0e0e0",

paddingTop:"1rem"

}}

>

<Link

href={`/record/${rec.id}`}

className="btn"

style={{

padding:"0.6rem 1.2rem",

fontSize:"0.9rem",

marginRight:"0.5rem"

}}

>

👁️ View

</Link>

</div>


</div>

))}

</div>


</>

)}

</div>

);

}