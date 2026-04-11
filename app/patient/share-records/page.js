"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShareRecords(){

const router =
useRouter();

const [hospital,setHospital] =
useState("");

const [doctors,setDoctors] =
useState([]);

const [selectedDoctor,setSelectedDoctor] =
useState("");

const [records,setRecords] =
useState([]);

const [prescriptions,setPrescriptions] =
useState([]);

const [selectedItems,setSelectedItems] =
useState([]);

const [loading,setLoading] =
useState(false);



/* LOAD USER DATA */

useEffect(()=>{

async function loadData(){

const meRes =
await fetch("/api/auth/me");

const meData =
await meRes.json();


if(!meData.user ||
meData.user.role !== "patient"){

router.push("/login");

return;

}


const recordsRes =
await fetch(

`/api/records?patientId=${encodeURIComponent(

meData.user.regno

)}`

);

const recordsData =
await recordsRes.json();


setRecords(recordsData || []);



const prescriptionRes =
await fetch(

`/api/prescription?patientId=${encodeURIComponent(

meData.user.regno

)}`

);

const prescriptionData =
await prescriptionRes.json();


setPrescriptions(

prescriptionData || []

);

}


loadData();

},[router]);



/* SEARCH DOCTOR */

async function handleHospitalSearch(){

if(!hospital.trim())
return;


const res =
await fetch(

`/api/doctors?hospital=${encodeURIComponent(

hospital

)}`

);

const data =
await res.json();


setDoctors(data || []);

}



/* SELECT ITEMS */

function toggleItem(type,id){

const key =
`${type}-${id}`;


setSelectedItems(prev=>

prev.includes(key)

? prev.filter(i=>i!==key)

: [...prev,key]

);

}



/* SHARE */

async function handleShare(){

if(!selectedDoctor ||
selectedItems.length===0)
return;


setLoading(true);


const recordIds =
selectedItems

.filter(i=>
i.startsWith("record-"))

.map(i=>
i.replace("record-",""));


const prescriptionIds =
selectedItems

.filter(i=>
i.startsWith("prescription-"))

.map(i=>
i.replace("prescription-",""));


const res =
await fetch(

"/api/share-records",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify({

doctorRegno:
selectedDoctor,

recordIds,

prescriptionIds

})

}

);


setLoading(false);


if(res.ok){

alert(
"Shared successfully"
);

router.push(
"/patient/dashboard"
);

}else{

alert(
"Failed to share"
);

}

}



/* UI */

return(

<div style={{

maxWidth:"1000px",

margin:"30px auto",

padding:"20px",

display:"flex",

flexDirection:"column",

gap:"20px"

}}>


{/* HEADER */}

<div style={{

background:"#f4f8ff",

padding:"20px",

borderRadius:"12px",

border:"1px solid #e3edff",

textAlign:"center"

}}>

<h2 style={{

margin:"0 0 6px 0",

color:"#1565c0"

}}>

Share Medical Records

</h2>


<p style={{

margin:0,

color:"#555"

}}>

Select records to share with doctor

</p>

</div>



{/* SEARCH */}

<div style={{

display:"flex",

flexWrap:"wrap",

gap:"10px",

background:"#fff",

padding:"15px",

borderRadius:"10px",

border:"1px solid #eee"

}}>

<input

placeholder="Enter hospital name"

value={hospital}

onChange={

e=>setHospital(
e.target.value
)

}

style={{

flex:"1",

minWidth:"200px",

padding:"8px"

}}

/>


<button
onClick={
handleHospitalSearch
}
className="btn"
>

Search Doctors

</button>

</div>



{/* DOCTORS */}

{doctors.length>0 && (

<div style={{

background:"#fff",

padding:"15px",

borderRadius:"10px",

border:"1px solid #eee"

}}>

<h3>

Select Doctor

</h3>


<select

value={
selectedDoctor
}

onChange={

e=>

setSelectedDoctor(
e.target.value
)

}

style={{

width:"100%",

padding:"8px"

}}

>

<option value="">

Choose doctor

</option>


{doctors.map(doc=>(

<option

key={
doc.regno
}

value={
doc.regno
}

>

{doc.name}

</option>

))}


</select>

</div>

)}



{/* RECORDS */}

{records.length>0 && (

<div style={{

background:"#fff",

padding:"18px",

borderRadius:"12px",

border:"1px solid #eee"

}}>

<h3>

Medical Records

</h3>


{records.map(r=>(

<label
key={r._id}

style={{

display:"flex",

alignItems:"center",

gap:"10px",

padding:"8px",

borderBottom:
"1px solid #f1f1f1"

}}

>

<input

type="checkbox"

checked={

selectedItems.includes(

`record-${r._id}`

)

}

onChange={()=>

toggleItem(

"record",

r._id

)

}

/>


<span>

{r.title}

</span>


</label>

))}


</div>

)}



{/* PRESCRIPTIONS */}

{prescriptions.length>0 && (

<div style={{

background:"#fff",

padding:"18px",

borderRadius:"12px",

border:"1px solid #eee"

}}>

<h3>

Prescriptions

</h3>


{prescriptions.map(p=>(

<label
key={p._id}

style={{

display:"flex",

alignItems:"center",

gap:"10px",

padding:"8px",

borderBottom:
"1px solid #f1f1f1"

}}

>

<input

type="checkbox"

checked={

selectedItems.includes(

`prescription-${p._id}`

)

}

onChange={()=>

toggleItem(

"prescription",

p._id

)

}

/>


<span>

Dr. {p.doctorId}

</span>


</label>

))}


</div>

)}



{/* BUTTON */}

<button

onClick={
handleShare
}

disabled={

!selectedDoctor ||

selectedItems.length===0 ||

loading

}

className="btn"

style={{

alignSelf:"center",

minWidth:"200px"

}}

>

{

loading

? "Sharing..."

: "Share Selected Items"

}

</button>



</div>

);

}