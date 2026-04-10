import { NextResponse } from "next/server";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";
import connectToDatabase from "../../../lib/mongodb";
import Record from "../../../models/Record";
import Prescription from "../../../models/Prescription";
import mongoose from "mongoose";

export async function POST(request) {
  await connectToDatabase();

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let currentUser;
  try {
    const payload = verifyJwt(token);
    // Assume current user is patient
    currentUser = payload;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { doctorEmail, recordIds, prescriptionIds } = await request.json();

  console.log('Sharing request:', { doctorEmail, recordIds, prescriptionIds, patientEmail: currentUser.email });

  // Update records to add doctor to sharedWith
  if (recordIds && recordIds.length > 0) {
    const objectIds = recordIds.map(id => new mongoose.Types.ObjectId(id));
    const result = await Record.updateMany(
      { _id: { $in: objectIds }, patientId: currentUser.email },
      { $addToSet: { sharedWith: doctorEmail } }
    );
    console.log('Records update result:', result);
  }

  // Update prescriptions to add doctor to sharedWith
  if (prescriptionIds && prescriptionIds.length > 0) {
    const objectIds = prescriptionIds.map(id => new mongoose.Types.ObjectId(id));
    const result = await Prescription.updateMany(
      { _id: { $in: objectIds }, patientId: currentUser.email },
      { $addToSet: { sharedWith: doctorEmail } }
    );
    console.log('Prescriptions update result:', result);
  }

  return NextResponse.json({ message: "Items shared successfully" });
}