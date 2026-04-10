import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Record from "../../../models/Record";

export async function POST(request) {
  await connectToDatabase();

  const contentType = request.headers.get("content-type") || "";
  let title = "";
  let type = "";
  let notes = "";
  let patientId = "";
  let fileName = null;
  let fileType = null;
  let fileData = null;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    title = formData.get("title")?.toString() || "";
    type = formData.get("type")?.toString() || "";
    notes = formData.get("notes")?.toString() || "";
    patientId = formData.get("patientId")?.toString() || "";
    const file = formData.get("file");

    if (file && file instanceof File && file.size > 0) {
      fileName = file.name;
      fileType = file.type;
      const arrayBuffer = await file.arrayBuffer();
      fileData = Buffer.from(arrayBuffer);
    }
  } else {
    const body = await request.json();
    title = body.title;
    type = body.type;
    notes = body.notes;
    patientId = body.patientId || "";
  }

  const newRecord = new Record({
    title,
    type,
    notes,
    patientId,
    fileName,
    fileType,
    fileData,
  });

  await newRecord.save();

  return NextResponse.json({ message: "stored", record: newRecord });
}

export async function GET(request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const record = await Record.findById(id);
    if (!record) {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }
    const recordObj = record.toObject();
    return NextResponse.json(recordObj);
  }

  const patientId = searchParams.get("patientId");
  if (patientId) {
    const records = await Record.find({ patientId });
    const recordsWithUrl = records.map(r => {
      const obj = r.toObject();
      return obj;
    });
    return NextResponse.json(recordsWithUrl);
  }

  const records = await Record.find({});
  const allRecordsWithUrl = records.map(r => {
    const obj = r.toObject();
    return obj;
  });
  return NextResponse.json(allRecordsWithUrl);
}
