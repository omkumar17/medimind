"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Record() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetch(`/api/records?id=${id}`)
      .then((res) => res.json())
      .then((data) => setRecord(data));
  }, [id]);

  if (!record) return <p>loading...</p>;

  return (
    <div className="page">
      <h2>{record.title}</h2>
      <p>{record.type}</p>
      <p>{record.notes}</p>
      {record.fileData ? (
        <div>
          <a href={`/api/records/${id}/file`} target="_blank" rel="noopener noreferrer">
            <button className="btn" style={{ marginRight: '0.5rem' }}>View File</button>
          </a>
          <a href={`/api/records/${id}/file`} download={record.fileName}>
            <button className="btn">Download File</button>
          </a>
        </div>
      ) : null}

      <a href={`/share?id=${record.id}`}>
        <button className="btn">Share with doctor</button>
      </a>
    </div>
  );
}
