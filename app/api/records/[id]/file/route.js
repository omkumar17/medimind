import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongodb";
import Record from "../../../../../models/Record";

export async function GET(request, { params }) {
  await connectToDatabase();

  const { id } = params;

  const record = await Record.findById(id);
  if (!record || !record.fileData) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  const headers = new Headers();
  headers.set('Content-Type', record.fileType);
  headers.set('Content-Disposition', `inline; filename="${record.fileName}"`);

  return new NextResponse(record.fileData, {
    status: 200,
    headers,
  });
}