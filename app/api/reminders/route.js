import { NextResponse } from "next/server";

export async function POST(request) {
  const { medicine, time } = await request.json();

  return NextResponse.json({
    message: `Reminder set for ${medicine} at ${time}`,
    reminder: { medicine, time },
  });
}
