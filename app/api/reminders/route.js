import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Reminder from "../../../models/Reminder";

export async function POST(request) {
  await connectToDatabase();

  const body = await request.json();
  const newReminder = new Reminder({
    medicine: body.medicine,
    time: body.time,
    patientRegno: body.patientRegno,
  });

  await newReminder.save();

  return NextResponse.json({
    message: `Reminder set for ${body.medicine} at ${body.time}`,
    reminder: newReminder
  });
}

export async function GET(request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const patientRegno = searchParams.get("patientRegno");

  let reminders;
  if (patientRegno) {
    reminders = await Reminder.find({ patientRegno });
  } else {
    reminders = await Reminder.find({});
  }

  return NextResponse.json(reminders);
}
