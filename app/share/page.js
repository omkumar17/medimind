"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Share() {
  const params = useSearchParams();
  const id = params.get("id");
  const [link, setLink] = useState("");

  async function generate() {
    const res = await fetch("/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setLink(data.link);
  }

  return (
    <div className="page">
      <h2>Share Record</h2>
      <button className="btn" onClick={generate}>
        Generate secure link
      </button>
      {link ? <p style={{ marginTop: '1rem' }}>{link}</p> : null}
    </div>
  );
}
