import { NextResponse } from "next/server";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../../lib/jwt";
import connectToDatabase from "../../../../lib/mongodb";
import Record from "../../../../models/Record";
import Prescription from "../../../../models/Prescription";

export async function GET(request) {
  await connectToDatabase();

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let doctorEmail;
  try {
    const payload = verifyJwt(token);
    if (payload.role !== "doctor") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    doctorEmail = payload.email;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const patientEmail = searchParams.get("email");

  if (!patientEmail) {
    return NextResponse.json({ message: "Patient email required" }, { status: 400 });
  }

  // Get records shared with this doctor
  const sharedRecords = await Record.find({
    patientId: patientEmail,
    sharedWith: doctorEmail
  });

  // Get prescriptions by this doctor for this patient OR prescriptions shared with this doctor
  const prescriptions = await Prescription.find({
    patientId: patientEmail,
    $or: [
      { doctorId: doctorEmail },
      { sharedWith: doctorEmail }
    ]
  });

  console.log('Doctor patient data:', {
    doctorEmail,
    patientEmail,
    sharedRecordsCount: sharedRecords.length,
    prescriptionsCount: prescriptions.length,
    prescriptions: prescriptions.map(p => ({ id: p._id, doctorId: p.doctorId, sharedWith: p.sharedWith }))
  });

  return NextResponse.json({
    patientEmail,
    records: sharedRecords.map(r => r.toObject()),
    prescriptions: prescriptions.map(p => p.toObject())
  });
}