import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Booking from "../../../models/Booking";
import { verifyJwt, AUTH_COOKIE_NAME } from "../../../lib/jwt";
import { cookies } from "next/headers";

export async function POST(request) {
  await connectToDatabase();

  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let userRegno;
  try {
    const payload = verifyJwt(token);
    userRegno = payload.regno;
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const body = await request.json();
  const { doctorRegno, appointmentDate, timeSlot, notes } = body;

  const newBooking = new Booking({
    patientRegno: userRegno,
    doctorRegno,
    appointmentDate,
    timeSlot,
    notes
  });

  await newBooking.save();

  return NextResponse.json({ message: "Booking created", booking: newBooking });
}

export async function GET(request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const regno = searchParams.get("regno"); // patient or doctor

  const bookings = await Booking.find(regno ? { $or: [{patientRegno: regno}, {doctorRegno: regno}] } : {});
  return NextResponse.json(bookings);
}
