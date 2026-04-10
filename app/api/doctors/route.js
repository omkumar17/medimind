import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET(request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const hospital = searchParams.get("hospital");

  if (!hospital) {
    return NextResponse.json([]);
  }

  const doctors = await User.find({
    role: "doctor",
    hospital: { $regex: hospital, $options: "i" } // Case insensitive search
  });

  return NextResponse.json(doctors.map(doc => ({ email: doc.email, hospital: doc.hospital })));
}