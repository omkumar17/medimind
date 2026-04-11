'use client';


import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header(){

const pathname = usePathname();

const [menuOpen,setMenuOpen] = useState(false);

const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);



/* get logged in user */

useEffect(()=>{

const fetchUser = async()=>{

try{

const res =
await fetch("/api/auth/me");

const data =
await res.json();

setUser(data.user);

}catch{}

finally{

setLoading(false);

}

};

fetchUser();

},[]);



/* active menu logic */

function isActive(path){

/* dashboard works for all roles */

if(path === "/dashboard"){

return pathname.includes("/dashboard");

}

/* records nested pages */

if(path === "/health-records"){

return pathname.startsWith("/health-records");

}

return pathname === path;

}



/* logout */

async function logout(){

await fetch(
"/api/auth/logout",
{ method:"GET" }
);

window.location.href="/";

}



return(

<>

<nav className="navbar">


<div className="logo">

MediMind 💊

</div>



<ul className="nav-links">

<li>

<Link
href="/"
className={isActive("/")?"active":""}
>

Home

</Link>

</li>



<li>

<Link
href="/doctors"
className={isActive("/doctors")?"active":""}
>

Doctors

</Link>

</li>



{/* <li>

<Link
href="/medicines"
className={isActive("/medicines")?"active":""}
>

Medicines

</Link>

</li> */}



<li>

<Link
href="/dashboard"
className={isActive("/dashboard")?"active":""}
>

Dashboard

</Link>

</li>



<li>

<Link
href="/health-records"
className={isActive("/health-records")?"active":""}
>

Records

</Link>

</li>



{/* <li>

<Link
href="/contact"
className={isActive("/contact")?"active":""}
>

Contact

</Link>

</li> */}

</ul>



<div className="user-area">

{loading ? (

<span style={{width:70}} />

) : user ? (

<>

<span className="regno">

{user.regno}

</span>


<button
className="logout-btn"
onClick={logout}
>

Logout

</button>

</>

) : (

<Link href="/select-role">

<button className="login-btn">

Login

</button>

</Link>

)}

</div>



<div
className="hamburger"
onClick={()=>setMenuOpen(!menuOpen)}
>

☰

</div>


</nav>



{menuOpen && (

<div className="mobile-overlay">

<div className="mobile-menu">


<Link
href="/"
onClick={()=>setMenuOpen(false)}
className={isActive("/")?"active":""}
>

Home

</Link>



<Link
href="/doctors"
onClick={()=>setMenuOpen(false)}
className={isActive("/doctors")?"active":""}
>

Doctors

</Link>



{/* <Link
href="/medicines"
onClick={()=>setMenuOpen(false)}
className={isActive("/medicines")?"active":""}
>

Medicines

</Link> */}



<Link
href="/dashboard"
onClick={()=>setMenuOpen(false)}
className={isActive("/dashboard")?"active":""}
>

Dashboard

</Link>



<Link
href="/health-records"
onClick={()=>setMenuOpen(false)}
className={isActive("/health-records")?"active":""}
>

Records

</Link>



{/* <Link
href="/contact"
onClick={()=>setMenuOpen(false)}
className={isActive("/contact")?"active":""}
>

Contact

</Link> */}



{user ? (

<button
className="logout-btn"
onClick={logout}
>

Logout

</button>

) : (

<Link href="/select-role">

<button className="login-btn">

Login

</button>

</Link>

)}


</div>

</div>

)}

</>

);

}