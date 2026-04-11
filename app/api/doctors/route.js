import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET(request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";
  const specialization = searchParams.get("specialization") || "";
  const hospital = searchParams.get("hospital") || "";

  const query = { role: "doctor" };

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (specialization) {
    query.specialization = { $regex: specialization, $options: "i" };
  }
  if (hospital) {
    query.hospital = { $regex: hospital, $options: "i" };
  }

  const doctors = await User.find(query).select('regno name specialization hospital phone address profileImage experience consultationFee');

  return NextResponse.json(doctors);
}
