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

  let doctorRegno;
  try {
    const payload = verifyJwt(token);
    if (payload.role !== "doctor") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    doctorRegno = payload.regno;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const patientRegno = searchParams.get("regno");

  if (!patientRegno) {
    return NextResponse.json({ message: "Patient regno required" }, { status: 400 });
  }

  // Get records shared with this doctor
  const sharedRecords = await Record.find({
    patientRegno,
    sharedWithRegnos: doctorRegno
  });

  // Get prescriptions by this doctor for this patient OR prescriptions shared with this doctor
  const prescriptions = await Prescription.find({
    patientRegno,
    $or: [
      { doctorRegno: doctorRegno },
      { sharedWithRegnos: doctorRegno }
    ]
  });

  console.log('Doctor patient data:', {
    doctorRegno,
    patientRegno,
    sharedRecordsCount: sharedRecords.length,
    prescriptionsCount: prescriptions.length,
    prescriptions: prescriptions.map(p => ({ id: p._id, doctorRegno: p.doctorRegno, sharedWithRegnos: p.sharedWithRegnos }))
  });

  return NextResponse.json({
    patientRegno,
    doctorRegno,
    records: sharedRecords.map(r => r.toObject()),
    prescriptions: prescriptions.map(p => p.toObject())
  });
}
